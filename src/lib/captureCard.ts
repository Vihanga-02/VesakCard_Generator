import { vesak } from '@/lib/vesakColors'

/** Capture #vesak-card-preview as PNG (Tailwind v4 color-mix is incompatible with html2canvas). */
export async function captureVesakCard(): Promise<void> {
  const el = document.getElementById('vesak-card-preview')
  if (!el) return

  const html2canvas = (await import('html2canvas-pro')).default

  const canvas = await html2canvas(el, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: vesak.darkest,
    logging: false,
    onclone: (doc) => {
      const clone = doc.getElementById('vesak-card-preview')
      if (!clone) return
      // Inline computed colors so parsers never see color-mix(in oklab, …) from Tailwind
      const nodes = [clone, ...clone.querySelectorAll<HTMLElement>('*')]
      const view = doc.defaultView
      if (!view) return
      for (const node of nodes) {
        const computed = view.getComputedStyle(node)
        node.style.color = computed.color
        node.style.backgroundColor = computed.backgroundColor
        node.style.borderColor = computed.borderColor
        node.style.borderTopColor = computed.borderTopColor
        node.style.borderRightColor = computed.borderRightColor
        node.style.borderBottomColor = computed.borderBottomColor
        node.style.borderLeftColor = computed.borderLeftColor
        node.style.outlineColor = computed.outlineColor
      }
    },
  })

  const link = document.createElement('a')
  link.download = `vesak-card-${Date.now()}.png`
  link.href = canvas.toDataURL('image/png', 1.0)
  link.click()
}
