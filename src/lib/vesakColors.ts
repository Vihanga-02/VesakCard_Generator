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

/** Light (cream/parchment) theme hex palette. */
export const vesakLight = {
  bg1: '#ede0c0',
  bg2: '#f5e6c8',
  bg3: '#fdf0d5',
  navy: '#1a2e4a',
  brown: '#5c3d0a',
  maroon: '#7a1f1f',
  amber: '#9c590a',
  warmGold: '#c47a0a',
} as const

export function vesakRgb(hex: keyof typeof vesak | string, alpha: number): string {
  const h = hex.startsWith('#') ? hex : vesak[hex as keyof typeof vesak]
  const r = parseInt(h.slice(1, 3), 16)
  const g = parseInt(h.slice(3, 5), 16)
  const b = parseInt(h.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function lightRgb(hex: keyof typeof vesakLight, alpha: number): string {
  const h = vesakLight[hex]
  const r = parseInt(h.slice(1, 3), 16)
  const g = parseInt(h.slice(3, 5), 16)
  const b = parseInt(h.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
