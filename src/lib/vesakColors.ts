/** Hex palette — safe for html2canvas (no oklab/color-mix). */
export const vesak = {
  darkest: '#0a0612',
  dark: '#120d1f',
  mid: '#1e1535',
  purple: '#2d1f4e',
  gold: '#d4a017',
  cream: '#fdf6e3',
  lotus: '#e8536a',
} as const

export function vesakRgb(hex: keyof typeof vesak | string, alpha: number): string {
  const h = hex.startsWith('#') ? hex : vesak[hex as keyof typeof vesak]
  const r = parseInt(h.slice(1, 3), 16)
  const g = parseInt(h.slice(3, 5), 16)
  const b = parseInt(h.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
