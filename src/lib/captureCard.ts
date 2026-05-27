import { CardTheme } from '@/lib/data'
import { vesak } from '@/lib/vesakColors'

const ANCESTOR_PROPS = [
  'background',
  'background-color',
  'backdrop-filter',
  '-webkit-backdrop-filter',
  'box-shadow',
] as const

function isTransparentColor(color: string): boolean {
  if (!color || color === 'transparent') return true
  const m = color.match(/rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)/)
  return m !== null && parseFloat(m[1]) === 0
}

/** Lock image panel to full card height so html2canvas never leaves a cream gap. */
function syncImagePanelForCapture(clone: HTMLElement, orig: HTMLElement) {
  const cardH = Math.ceil(orig.getBoundingClientRect().height)
  const cardW = Math.ceil(orig.getBoundingClientRect().width)
  const panelW = Math.ceil(cardW * 0.45)

  clone.style.width = `${cardW}px`
  clone.style.height = `${cardH}px`
  clone.style.aspectRatio = 'auto'

  const leftClone = clone.querySelector<HTMLElement>('[data-vesak-image-panel]')
  if (!leftClone) return

  leftClone.style.top = '0'
  leftClone.style.left = '0'
  leftClone.style.bottom = '0'
  leftClone.style.width = `${panelW}px`
  leftClone.style.height = `${cardH}px`
  leftClone.style.backgroundColor = vesak.darkest

  const img = leftClone.querySelector<HTMLImageElement>('img')
  if (!img) return

  const bleed = 4
  img.style.position = 'absolute'
  img.style.top = `-${bleed}px`
  img.style.left = `-${bleed}px`
  img.style.width = `${panelW + bleed * 2}px`
  img.style.height = `${cardH + bleed * 2}px`
  img.style.maxWidth = 'none'
  img.style.objectFit = 'cover'
  img.style.objectPosition = 'center bottom'
  img.style.display = 'block'
}

/** Capture #vesak-card-preview as PNG matching on-screen preview. */
export async function captureVesakCard(theme: CardTheme = 'dark'): Promise<void> {
  const original = document.getElementById('vesak-card-preview')
  if (!original) return

  const html2canvas = (await import('html2canvas-pro')).default
  const canvasBg = theme === 'light' ? '#fdf0d5' : vesak.darkest

  const cardBackup = {
    boxShadow: original.style.boxShadow,
    filter: original.style.filter,
  }
  original.style.boxShadow = 'none'
  original.style.filter = 'none'

  const backups: Array<{ el: HTMLElement; values: string[] }> = []
  let ancestor: HTMLElement | null = original.parentElement
  while (ancestor && ancestor !== document.body) {
    const values = ANCESTOR_PROPS.map((p) => ancestor!.style.getPropertyValue(p))
    backups.push({ el: ancestor, values })
    ANCESTOR_PROPS.forEach((p) => {
      if (p === 'background' || p === 'background-color') {
        ancestor!.style.setProperty(p, 'transparent', 'important')
      } else {
        ancestor!.style.setProperty(p, 'none', 'important')
      }
    })
    ancestor = ancestor.parentElement
  }

  try {
    const canvas = await html2canvas(original, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      onclone: (doc) => {
        const clone = doc.getElementById('vesak-card-preview')
        const orig = document.getElementById('vesak-card-preview')
        if (!clone || !orig) return

        clone.style.boxShadow = 'none'
        clone.style.filter = 'none'

        if (orig.style.background) {
          clone.style.background = orig.style.background
        }

        syncImagePanelForCapture(clone, orig)

        const origNodes = [orig, ...orig.querySelectorAll<HTMLElement>('*')]
        const cloneNodes = [clone, ...clone.querySelectorAll<HTMLElement>('*')]

        for (let i = 0; i < origNodes.length; i++) {
          const oEl = origNodes[i]
          const cEl = cloneNodes[i]
          if (!cEl || oEl.tagName !== cEl.tagName) continue
          if (oEl.tagName === 'IMG') continue
          if (oEl.hasAttribute('data-vesak-image-panel')) continue
          if (oEl.tagName === 'SVG') continue

          const cs = window.getComputedStyle(oEl)

          cEl.style.color = cs.color
          cEl.style.borderColor = cs.borderColor
          cEl.style.borderTopColor = cs.borderTopColor
          cEl.style.borderRightColor = cs.borderRightColor
          cEl.style.borderBottomColor = cs.borderBottomColor
          cEl.style.borderLeftColor = cs.borderLeftColor

          if (oEl.style.background) {
            cEl.style.background = oEl.style.background
          } else if (cs.backgroundImage && cs.backgroundImage !== 'none') {
            cEl.style.backgroundImage = cs.backgroundImage
            cEl.style.backgroundSize = cs.backgroundSize
            cEl.style.backgroundPosition = cs.backgroundPosition
            cEl.style.backgroundRepeat = cs.backgroundRepeat
            if (!isTransparentColor(cs.backgroundColor)) {
              cEl.style.backgroundColor = cs.backgroundColor
            }
          } else if (!isTransparentColor(cs.backgroundColor)) {
            cEl.style.backgroundColor = cs.backgroundColor
          }
        }
      },
    })

    const out = document.createElement('canvas')
    out.width = canvas.width
    out.height = canvas.height
    const ctx = out.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = canvasBg
    ctx.fillRect(0, 0, out.width, out.height)
    ctx.drawImage(canvas, 0, 0)

    const link = document.createElement('a')
    link.download = `vesak-card-${Date.now()}.png`
    link.href = out.toDataURL('image/png', 1.0)
    link.click()
  } finally {
    if (cardBackup.boxShadow) {
      original.style.boxShadow = cardBackup.boxShadow
    } else {
      original.style.removeProperty('box-shadow')
    }
    if (cardBackup.filter) {
      original.style.filter = cardBackup.filter
    } else {
      original.style.removeProperty('filter')
    }

    for (const { el, values } of backups) {
      ANCESTOR_PROPS.forEach((p, i) => {
        if (values[i]) {
          el.style.setProperty(p, values[i])
        } else {
          el.style.removeProperty(p)
        }
      })
    }
  }
}
