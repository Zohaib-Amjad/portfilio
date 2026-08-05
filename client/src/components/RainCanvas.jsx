import { useEffect, useRef } from 'react'
import { portraitOutline, portraitOutlineHover } from '../data/portraitSilhouette'

// Solid UI surfaces and text use different collision geometry.
const BOX_SURFACE_SELECTOR = [
  '[data-rain-surface]',
  '.panel',
  '.project-card',
  '.code-window',
  '.button-primary',
  '.button-secondary',
  'img:not([data-rain-ignore])',
].join(',')

const TEXT_SURFACE_SELECTOR = 'h1, h2, h3, p'
const PORTRAIT_SURFACE_SELECTOR = '[data-rain-portrait]'

const GRAVITY = 260
const DRIFT = -0.16

const sampleOutline = (outline, normalizedX) => {
  if (normalizedX <= outline[0][0] || normalizedX >= outline[outline.length - 1][0]) return null

  for (let index = 1; index < outline.length; index += 1) {
    const [x0, y0] = outline[index - 1]
    const [x1, y1] = outline[index]
    if (normalizedX > x1) continue
    const amount = (normalizedX - x0) / (x1 - x0)
    return y0 + (y1 - y0) * amount
  }

  return null
}

export default function RainCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const metricContext = document.createElement('canvas').getContext('2d')

    let width = 0
    let height = 0
    let drops = []
    let splashes = []
    let surfaces = []
    let textSurfaces = []
    let boxElements = []
    let textElements = []
    let portraitElements = []
    let isLight = document.documentElement.classList.contains('light')
    let frame = 0
    let last = performance.now()
    let lastMeasurement = 0

    const palette = () =>
      isLight
        ? { drop: '62, 130, 84', splash: '45, 112, 72' }
        : { drop: '205, 229, 235', splash: '182, 211, 221' }

    const collectElements = () => {
      boxElements = Array.from(document.querySelectorAll(BOX_SURFACE_SELECTOR))
      textElements = Array.from(document.querySelectorAll(TEXT_SURFACE_SELECTOR))
      portraitElements = Array.from(document.querySelectorAll(PORTRAIT_SURFACE_SELECTOR))
    }

    const getGlyphRects = (element) => {
      const rects = []
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)

      let node = walker.nextNode()
      while (node) {
        const text = node.textContent
        const style = window.getComputedStyle(node.parentElement || element)
        const fontSize = Number.parseFloat(style.fontSize) || 16
        metricContext.font = [
          style.fontStyle,
          style.fontVariant,
          style.fontWeight,
          style.fontSize,
          style.fontFamily,
        ].join(' ')

        let offset = 0
        for (const character of Array.from(text)) {
          const length = character.length

          if (character.trim()) {
            const range = document.createRange()
            range.setStart(node, offset)
            range.setEnd(node, offset + length)
            const rect = range.getBoundingClientRect()

            if (rect.width >= 1 && rect.height >= 2) {
              const metrics = metricContext.measureText(character)
              const leading = Math.max(0, (rect.height - fontSize) / 2)
              const baseline = rect.top + leading + fontSize * 0.82
              const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.65

              rects.push({
                kind: 'text',
                left: rect.left,
                right: rect.right,
                top: Math.max(rect.top, baseline - ascent),
                bottom: rect.bottom,
              })
            }
          }

          offset += length
        }

        node = walker.nextNode()
      }

      return rects
    }

    // Rects are viewport-relative, so they are refreshed while the page scrolls.
    const measureSurfaces = () => {
      const boxes = []

      for (const element of boxElements) {
        const rect = element.getBoundingClientRect()
        if (rect.width < 24 || rect.bottom < 0 || rect.top > height) continue
        boxes.push({
          kind: 'box',
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
        })
      }

      for (const element of portraitElements) {
        const rect = element.getBoundingClientRect()
        if (rect.width < 24 || rect.bottom < 0 || rect.top > height) continue
        boxes.push({
          kind: 'portrait',
          element,
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
          naturalWidth: element.naturalWidth || 1122,
          naturalHeight: element.naturalHeight || 1402,
        })
      }

      textSurfaces = textElements
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          return rect.bottom >= -40 && rect.top <= height + 40
        })
        .flatMap(getGlyphRects)
        .filter((surface) => surface.bottom >= 0 && surface.top <= height)
      surfaces = [...boxes, ...textSurfaces]
    }

    const getPortraitImpact = (surface, viewportX) => {
      // object-fit: cover + object-position: top
      const scale = Math.max(
        surface.width / surface.naturalWidth,
        surface.height / surface.naturalHeight,
      )
      const renderedWidth = surface.naturalWidth * scale
      const renderedHeight = surface.naturalHeight * scale
      const offsetX = (surface.width - renderedWidth) / 2
      const normalizedX = (viewportX - surface.left - offsetX) / renderedWidth

      if (normalizedX < 0 || normalizedX > 1) return null

      const isHovered = surface.element.closest('.group')?.matches(':hover') ?? false
      const normalizedY = sampleOutline(isHovered ? portraitOutlineHover : portraitOutline, normalizedX)
      if (normalizedY === null) return null

      return surface.top + normalizedY * renderedHeight
    }

    const createDrop = (seeded = false) => ({
      x: Math.random() * (width + 160) - 80,
      y: seeded ? Math.random() * height : -Math.random() * height * 0.5 - 24,
      length: 9 + Math.random() * 15,
      speed: 380 + Math.random() * 420,
      alpha: 0.16 + Math.random() * 0.38,
      thickness: Math.random() < 0.25 ? 1.4 : 1,
    })

    const addSplash = (x, y) => {
      if (splashes.length > 70) return

      const particles = []
      const count = 3 + Math.floor(Math.random() * 3)
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 95,
          vy: -(40 + Math.random() * 85),
        })
      }

      splashes.push({ x, y, life: 0, duration: 0.32 + Math.random() * 0.16, particles })
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const target = Math.round(Math.min(190, (width * height) / 9000))
      drops = Array.from({ length: target }, () => createDrop(true))
      collectElements()
    }

    const render = (now) => {
      const delta = Math.min((now - last) / 1000, 0.05)
      last = now

      if (now - lastMeasurement > 120) {
        measureSurfaces()
        lastMeasurement = now
      }
      context.clearRect(0, 0, width, height)

      const colors = palette()
      context.lineCap = 'round'

      for (const drop of drops) {
        const previousTip = drop.y + drop.length
        drop.y += drop.speed * delta
        drop.x += drop.speed * DRIFT * delta
        const tip = drop.y + drop.length

        // The topmost surface crossed during this step is the one that gets hit.
        let impact = null
        for (const surface of surfaces) {
          if (drop.x < surface.left || drop.x > surface.right) continue
          const surfaceTop =
            surface.kind === 'portrait'
              ? getPortraitImpact(surface, drop.x)
              : surface.top
          if (surfaceTop === null) continue
          if (previousTip > surfaceTop || tip < surfaceTop) continue

          // If text exists inside a panel at this x-coordinate, let the drop
          // pass through the panel's top edge and land on the text itself.
          if (
            surface.kind === 'box' &&
            textSurfaces.some(
              (text) =>
                drop.x >= text.left &&
                drop.x <= text.right &&
                text.top > surface.top &&
                text.top < surface.bottom,
            )
          ) {
            continue
          }

          if (impact === null || surfaceTop < impact) impact = surfaceTop
        }

        if (impact !== null) {
          addSplash(drop.x, impact)
          Object.assign(drop, createDrop())
          continue
        }

        if (drop.y > height) {
          Object.assign(drop, createDrop())
          continue
        }

        context.strokeStyle = `rgba(${colors.drop}, ${drop.alpha})`
        context.lineWidth = drop.thickness
        context.beginPath()
        context.moveTo(drop.x, drop.y)
        context.lineTo(drop.x + drop.length * DRIFT, drop.y + drop.length)
        context.stroke()
      }

      for (let index = splashes.length - 1; index >= 0; index -= 1) {
        const splash = splashes[index]
        splash.life += delta

        const progress = splash.life / splash.duration
        if (progress >= 1) {
          splashes.splice(index, 1)
          continue
        }

        const fade = 1 - progress

        context.strokeStyle = `rgba(${colors.splash}, ${0.3 * fade})`
        context.lineWidth = 1
        context.beginPath()
        context.arc(splash.x, splash.y, 1 + progress * 7, Math.PI, Math.PI * 2)
        context.stroke()

        context.fillStyle = `rgba(${colors.splash}, ${0.45 * fade})`
        for (const particle of splash.particles) {
          particle.vy += GRAVITY * delta
          particle.x += particle.vx * delta
          particle.y += particle.vy * delta
          context.fillRect(particle.x, particle.y, 1.4, 1.4)
        }
      }

      frame = requestAnimationFrame(render)
    }

    const themeObserver = new MutationObserver(() => {
      isLight = document.documentElement.classList.contains('light')
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Sections animate in as they scroll into view, so the list is refreshed periodically.
    const refresh = window.setInterval(collectElements, 1500)

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.clearInterval(refresh)
      window.removeEventListener('resize', resize)
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="rain-canvas" aria-hidden="true" />
}
