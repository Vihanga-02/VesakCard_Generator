'use client'
import { CardTheme, Language, Poem } from '@/lib/data'
import { lightRgb, vesak, vesakRgb } from '@/lib/vesakColors'

interface CardPreviewProps {
  imageSrc: string
  poem: Poem | null
  customPoem: string
  fromName: string
  toName: string
  language: Language
  theme: CardTheme
  fromLabel: string
  toLabel: string
  happyVesak: string
  stampText: string
}

const fontSi = 'Noto Serif Sinhala, serif'
const fontEnDisplay = 'Cinzel Decorative, serif'
const fontEnBody = 'Cormorant Garamond, serif'
const fontEnSerif = 'Playfair Display, serif'

function getTokens(theme: CardTheme) {
  if (theme === 'light') {
    return {
      bgGradient: 'linear-gradient(135deg, #ede0c0 0%, #f5e6c8 50%, #fdf0d5 100%)',
      borderOuter: lightRgb('amber', 0.35),
      borderInner: lightRgb('amber', 0.18),
      cornerBorder: lightRgb('amber', 0.6),
      imgBottomBg: 'linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.36), transparent)',
      happyVesakColor: '#f5d040',
      stampBg: lightRgb('amber', 0.09),
      stampBorder: lightRgb('amber', 0.38),
      stampIconColor: lightRgb('amber', 0.6),
      stampLabelColor: lightRgb('brown', 0.45),
      toLabelColor: lightRgb('navy', 0.6),
      toNameColor: lightRgb('navy', 0.82),
      dividerColor: lightRgb('amber', 0.38),
      dividerDot: lightRgb('maroon', 0.45),
      dividerSmall: lightRgb('amber', 0.28),
      dividerDotSmall: lightRgb('maroon', 0.35),
      poemTitleColor: lightRgb('maroon', 0.85),
      poemTextColor: lightRgb('navy', 0.85),
      fromLabelColor: lightRgb('navy', 0.55),
      fromNameColor: lightRgb('navy', 0.82),
      decorLotus: lightRgb('maroon', 0.06),
    }
  }
  return {
    bgGradient: `linear-gradient(135deg, ${vesak.darkest} 0%, ${vesak.mid} 50%, ${vesak.dark} 100%)`,
    borderOuter: vesakRgb('gold', 0.25),
    borderInner: vesakRgb('gold', 0.1),
    cornerBorder: vesakRgb('gold', 0.6),
    imgBottomBg: 'linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.36), transparent)',
    happyVesakColor: vesak.gold,
    stampBg: vesakRgb('gold', 0.05),
    stampBorder: vesakRgb('gold', 0.3),
    stampIconColor: vesakRgb('gold', 0.4),
    stampLabelColor: vesakRgb('gold', 0.3),
    toLabelColor: vesakRgb('gold', 0.5),
    toNameColor: vesakRgb('cream', 0.7),
    dividerColor: vesakRgb('gold', 0.3),
    dividerDot: vesakRgb('gold', 0.4),
    dividerSmall: vesakRgb('gold', 0.2),
    dividerDotSmall: vesakRgb('gold', 0.3),
    poemTitleColor: vesakRgb('gold', 0.7),
    poemTextColor: vesakRgb('cream', 0.85),
    fromLabelColor: vesakRgb('gold', 0.4),
    fromNameColor: vesakRgb('cream', 0.7),
    decorLotus: vesakRgb('lotus', 0.05),
  }
}

export default function CardPreview({
  imageSrc,
  poem,
  customPoem,
  fromName,
  toName,
  language,
  theme,
  fromLabel,
  toLabel,
  happyVesak,
  stampText,
}: CardPreviewProps) {
  const tk = getTokens(theme)

  const isCustomPoem = poem?.id === 'custom'
  const poemLines = isCustomPoem
    ? customPoem.split('\n').filter(Boolean)
    : language === 'si'
    ? poem?.textSi ?? []
    : poem?.textEn ?? []

  const poemTitle = isCustomPoem
    ? ''
    : language === 'si'
    ? poem?.titleSi ?? ''
    : poem?.titleEn ?? ''

  const labelFont = language === 'si' ? fontSi : fontEnDisplay
  const poemSizeClass =
    poemLines.length > 4
      ? 'text-[clamp(0.46rem,2.3cqw,0.54rem)] sm:text-[clamp(0.55rem,2.6cqw,0.65rem)]'
      : 'text-[clamp(0.5rem,2.5cqw,0.58rem)] sm:text-[clamp(0.55rem,2.9cqw,0.7rem)]'

  return (
    <div
      id="vesak-card-preview"
      className="@container relative w-full aspect-3/2 rounded-none overflow-hidden card-shadow"
      style={{ background: tk.bgGradient }}
    >
      {/* Decorative borders */}
      <div
        className="absolute inset-1.5 sm:inset-2 rounded-none border pointer-events-none z-10"
        style={{ borderColor: tk.borderOuter }}
      />
      <div
        className="absolute inset-2 sm:inset-3 rounded-none border pointer-events-none z-10"
        style={{ borderColor: tk.borderInner }}
      />

      {/* Corner ornaments — explicit divs so Tailwind JIT sees every class literal */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 pointer-events-none">
        <div className="w-6 h-6 border-t-2 border-l-2" style={{ borderColor: tk.cornerBorder }} />
      </div>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 pointer-events-none">
        <div className="w-6 h-6 border-t-2 border-r-2" style={{ borderColor: tk.cornerBorder }} />
      </div>
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
        <div className="w-6 h-6 border-b-2 border-l-2" style={{ borderColor: tk.cornerBorder }} />
      </div>
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-10 pointer-events-none">
        <div className="w-6 h-6 border-b-2 border-r-2" style={{ borderColor: tk.cornerBorder }} />
      </div>

      <div className="absolute inset-0 h-full w-full">
        {/* Left — image; dark underlay + bleed hides cream gap on mobile/capture */}
        <div
          data-vesak-image-panel
          className="absolute top-0 left-0 bottom-0 w-[45%] overflow-hidden"
          style={{ backgroundColor: vesak.darkest }}
        >
          <img
            src={imageSrc}
            alt="Vesak card image"
            className="absolute object-cover"
            style={{
              top: -3,
              left: -3,
              width: 'calc(100% + 6px)',
              height: 'calc(100% + 6px)',
              maxWidth: 'none',
              objectPosition: 'center bottom',
              display: 'block',
            }}
          />
          <div
            className="absolute left-0 right-0 px-2 py-0.5 sm:px-3 sm:py-1 text-center bottom-[0.85rem] sm:bottom-[1.30rem]"
            style={{ background: tk.imgBottomBg }}
          >
            <p
              className="text-[10px] sm:text-sm tracking-wider"
              style={{
                color: tk.happyVesakColor,
                fontFamily: language === 'si' ? fontSi : fontEnDisplay,
              }}
            >
              {happyVesak}
            </p>
          </div>
        </div>

        {/* Right — text */}
        <div className="absolute inset-y-0 right-0 left-[45%] flex flex-col min-h-0 p-2.5 sm:p-6 gap-0.5 sm:gap-0">

          {/* Stamp */}
          <div className="absolute top-2 right-2 sm:top-5 sm:right-5 z-10 pointer-events-none">
            <div
              className="w-8 h-[2.75rem] sm:w-14 sm:h-[4.75rem] border rounded flex items-center justify-center"
              style={{
                background: tk.stampBg,
                borderColor: tk.stampBorder,
                borderStyle: 'dashed',
              }}
            >
              <div className="text-center px-0.5">
                <div className="text-[7px] sm:text-[9px]" style={{ color: tk.stampIconColor }}>
                  🪷
                </div>
                <div
                  className="text-[6px] sm:text-[7px] mt-0.5"
                  style={{ color: tk.stampLabelColor, fontFamily: fontEnBody }}
                >
                  Vesak
                </div>
                <div
                  className="text-[5px] sm:text-[6px] mt-0.5 leading-tight"
                  style={{
                    color: tk.stampLabelColor,
                    fontFamily: language === 'si' ? fontSi : fontEnBody,
                  }}
                >
                  {stampText}
                </div>
              </div>
            </div>
          </div>

          {/* To */}
          <div className="shrink-0 mb-0.5 sm:mb-2 pr-9 sm:pr-0">
            <p
              className="text-[8px] sm:text-[9px] uppercase tracking-widest mb-0.5"
              style={{ color: tk.toLabelColor, fontFamily: labelFont }}
            >
              {toLabel}
            </p>
            <p
              className="text-[11px] sm:text-sm leading-tight"
              style={{
                color: tk.toNameColor,
                fontFamily: language === 'si' ? fontSi : fontEnSerif,
                fontStyle: 'italic',
              }}
            >
              {toName || '..............'}
            </p>
          </div>

          {/* Divider */}
          <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 my-0.5 sm:my-2">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${tk.dividerColor})` }} />
            <div className="text-[10px]" style={{ color: tk.dividerDot }}>❋</div>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${tk.dividerColor})` }} />
          </div>

          {poemTitle && (
            <p
              className="shrink-0 text-[8px] sm:text-xs mb-0.5 sm:mb-1 tracking-wide"
              style={{
                color: tk.poemTitleColor,
                fontFamily: language === 'si' ? fontSi : fontEnDisplay,
              }}
            >
              {poemTitle}
            </p>
          )}

          <div className="flex-1 min-h-0 flex flex-col justify-start overflow-hidden pt-0 sm:pt-1">
            {poemLines.map((line, i) => (
              <p
                key={i}
                className={`leading-snug sm:leading-relaxed ${poemSizeClass}`}
                style={{
                  color: tk.poemTextColor,
                  fontFamily: language === 'si' ? fontSi : fontEnBody,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 my-0.5 sm:my-2">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${tk.dividerSmall})` }} />
            <div className="text-[8px]" style={{ color: tk.dividerDotSmall }}>✦</div>
          </div>

          {/* From */}
          <div className="shrink-0 text-right pr-1">
            <p
              className="text-[8px] uppercase tracking-widest"
              style={{ color: tk.fromLabelColor, fontFamily: labelFont }}
            >
              {fromLabel}
            </p>
            <p
              className="text-[11px] sm:text-sm leading-tight"
              style={{
                color: tk.fromNameColor,
                fontFamily: language === 'si' ? fontSi : fontEnSerif,
                fontStyle: 'italic',
              }}
            >
              {fromName || '..............'}
            </p>
          </div>

          {/* Decorative lotus watermark */}
          <div
            className="absolute bottom-3 right-8 sm:bottom-6 sm:right-16 text-3xl sm:text-6xl pointer-events-none select-none"
            style={{ color: tk.decorLotus }}
          >
            🪷
          </div>
        </div>
      </div>
    </div>
  )
}
