/** Next.js static imports are objects `{ src, width, height }`; Vite returned a string. */
export function assetUrl(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value.src || ''
}
