import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const createNoiseBuffer = (context, duration) => {
  const frameCount = Math.ceil(context.sampleRate * duration)
  const buffer = context.createBuffer(1, frameCount, context.sampleRate)
  const channel = buffer.getChannelData(0)

  for (let index = 0; index < frameCount; index += 1) {
    channel[index] = Math.random() * 2 - 1
  }

  return buffer
}

const createThunderBuffer = (context) => {
  const duration = 5.6
  const frameCount = Math.ceil(context.sampleRate * duration)
  const buffer = context.createBuffer(2, frameCount, context.sampleRate)

  for (let channelIndex = 0; channelIndex < 2; channelIndex += 1) {
    const channel = buffer.getChannelData(channelIndex)
    let brownNoise = 0

    for (let index = 0; index < frameCount; index += 1) {
      const time = index / context.sampleRate
      const whiteNoise = Math.random() * 2 - 1
      brownNoise = (brownNoise + whiteNoise * 0.025) / 1.025

      const initialCrack = Math.exp(-time * 22) * 0.72
      const mainBody = Math.exp(-Math.max(0, time - 0.05) * 0.66)
      const firstRoll =
        time > 0.62 ? Math.exp(-(time - 0.62) * 1.15) * 0.48 : 0
      const secondRoll =
        time > 1.48 ? Math.exp(-(time - 1.48) * 0.82) * 0.3 : 0
      const rollingPulse =
        0.72 +
        Math.sin(time * Math.PI * 2 * 1.35 + channelIndex * 0.4) * 0.17 +
        Math.sin(time * Math.PI * 2 * 0.47) * 0.11
      const lowRumble =
        Math.sin(time * Math.PI * 2 * (38 - time * 1.8)) *
        Math.exp(-time * 0.7) *
        0.055

      const crack = whiteNoise * initialCrack
      const body =
        brownNoise *
        4.2 *
        (mainBody * rollingPulse + firstRoll + secondRoll)
      const fadeIn = Math.min(1, time * 90)
      const fadeOut = Math.min(1, (duration - time) * 1.8)

      channel[index] = Math.max(
        -1,
        Math.min(1, (crack + body + lowRumble) * fadeIn * fadeOut),
      )
    }
  }

  return buffer
}

const WeatherAudio = forwardRef(function WeatherAudio(_, ref) {
  const engineRef = useRef(null)
  const enabledRef = useRef(false)
  const volumeRef = useRef(0.65)

  // Uses the same viewport formula as RainCanvas's visible drop count.
  const getRainVolume = () => {
    const dropCount = Math.round(
      Math.min(190, (window.innerWidth * window.innerHeight) / 9000),
    )
    const intensity = dropCount / 190
    return 0.012 + intensity * 0.025
  }

  const playThunder = () => {
    const engine = engineRef.current
    if (!engine || !enabledRef.current) return

    const { context, master } = engine
    const now = context.currentTime

    const source = context.createBufferSource()
    const filter = context.createBiquadFilter()
    const compressor = context.createDynamicsCompressor()
    const thunderGain = context.createGain()

    source.buffer = createThunderBuffer(context)
    filter.type = 'lowpass'
    filter.Q.value = 0.55
    filter.frequency.setValueAtTime(2600, now)
    filter.frequency.exponentialRampToValueAtTime(330, now + 5.2)

    compressor.threshold.value = -18
    compressor.knee.value = 18
    compressor.ratio.value = 4
    compressor.attack.value = 0.004
    compressor.release.value = 0.65

    thunderGain.gain.setValueAtTime(0.78, now)
    thunderGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5)

    source
      .connect(filter)
      .connect(compressor)
      .connect(thunderGain)
      .connect(master)
    source.start(now)
    source.stop(now + 5.6)
  }

  const createEngine = () => {
    if (engineRef.current) return engineRef.current

    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return null

    const context = new AudioContext()
    const master = context.createGain()
    const rainGain = context.createGain()
    const rainFilter = context.createBiquadFilter()
    const rain = context.createBufferSource()

    master.gain.value = 0.0001
    rainGain.gain.value = getRainVolume()
    rainFilter.type = 'bandpass'
    rainFilter.frequency.value = 3400
    rainFilter.Q.value = 0.55
    rain.buffer = createNoiseBuffer(context, 2.5)
    rain.loop = true

    rain.connect(rainFilter).connect(rainGain).connect(master)
    master.connect(context.destination)
    rain.start()

    engineRef.current = { context, master, rain, rainGain }
    return engineRef.current
  }

  useImperativeHandle(ref, () => ({
    async enable() {
      const engine = createEngine()
      if (!engine) return false

      enabledRef.current = true
      await engine.context.resume()
      const now = engine.context.currentTime
      engine.master.gain.cancelScheduledValues(now)
      engine.master.gain.setValueAtTime(Math.max(engine.master.gain.value, 0.0001), now)
      engine.master.gain.exponentialRampToValueAtTime(volumeRef.current, now + 0.45)
      return true
    },
    disable() {
      enabledRef.current = false

      const engine = engineRef.current
      if (!engine) return
      const now = engine.context.currentTime
      engine.master.gain.cancelScheduledValues(now)
      engine.master.gain.setValueAtTime(Math.max(engine.master.gain.value, 0.0001), now)
      engine.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.25)
    },
    setVolume(value) {
      volumeRef.current = Math.max(0.01, Math.min(1, value))

      const engine = engineRef.current
      if (!engine || !enabledRef.current) return
      engine.master.gain.setTargetAtTime(
        volumeRef.current,
        engine.context.currentTime,
        0.08,
      )
    },
  }))

  useEffect(() => {
    const onThunder = () => playThunder()
    const onResize = () => {
      const engine = engineRef.current
      if (!engine) return
      engine.rainGain.gain.setTargetAtTime(
        getRainVolume(),
        engine.context.currentTime,
        0.3,
      )
    }

    window.addEventListener('weather-thunder', onThunder)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('weather-thunder', onThunder)
      window.removeEventListener('resize', onResize)
      const engine = engineRef.current
      if (engine) engine.context.close()
    }
  }, [])

  return null
})

export default WeatherAudio
