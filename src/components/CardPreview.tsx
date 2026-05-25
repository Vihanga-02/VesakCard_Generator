'use client'
import { Language, Poem } from '@/lib/data'
import { vesak, vesakRgb } from '@/lib/vesakColors'

interface CardPreviewProps {
  imageSrc: string
  poem: Poem | null
  customPoem: string
  fromName: string
  toName: string
  language: Language
  fromLabel: string
  toLabel: string
  happyVesak: string
}

const fontSi = 'Noto Serif Sinhala, serif'
const fontEnDisplay = 'Cinzel Decorative, serif'
const fontEnBody = 'Cormorant Garamond, serif'
const fontEnSerif = 'Playfair Display, serif'

export default function CardPreview({
  imageSrc,
  poem,
  customPoem,
  fromName,
  toName,
  language,
  fromLabel,
  toLabel,
  happyVesak,
}: CardPreviewProps) {
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
      className="@container relative w-full aspect-3/2 rounded-2xl overflow-hidden card-shadow"
      style={{
        background: `linear-gradient(135deg, ${vesak.darkest} 0%, ${vesak.mid} 50%, ${vesak.dark} 100%)`,
      }}
    >
      {/* Decorative border */}
      <div
        className="absolute inset-1.5 sm:inset-2 rounded-xl border pointer-events-none z-10"
        style={{ borderColor: vesakRgb('gold', 0.25) }}
      />
      <div
        className="absolute inset-2 sm:inset-3 rounded-xl border pointer-events-none z-10"
        style={{ borderColor: vesakRgb('gold', 0.1) }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 pointer-events-none">
        <div
          className="w-6 h-6 border-t-2 border-l-2 rounded-tl-sm"
          style={{ borderColor: vesakRgb('gold', 0.6) }}
        />
      </div>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 pointer-events-none">
        <div
          className="w-6 h-6 border-t-2 border-r-2 rounded-tr-sm"
          style={{ borderColor: vesakRgb('gold', 0.6) }}
        />
      </div>
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
        <div
          className="w-6 h-6 border-b-2 border-l-2 rounded-bl-sm"
          style={{ borderColor: vesakRgb('gold', 0.6) }}
        />
      </div>
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-10 pointer-events-none">
        <div
          className="w-6 h-6 border-b-2 border-r-2 rounded-br-sm"
          style={{ borderColor: vesakRgb('gold', 0.6) }}
        />
      </div>

      <div className="absolute inset-0 flex min-h-0">
        {/* Left - Image side */}
        <div className="w-[45%] relative overflow-hidden shrink-0">
          <img
            src={imageSrc}
            alt="Vesak card image"
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, transparent, transparent, ${vesakRgb('darkest', 0.8)})`,
            }}
          />
          <div
            className="absolute left-0 right-0 px-2 py-0.5 sm:px-3 sm:py-1 text-center bottom-[0.85rem] sm:bottom-[1.30rem]"
            style={{
              background: `linear-gradient(to top, ${vesakRgb('purple', 0.80)}, ${vesakRgb('mid', 0.70)}, transparent)`,
            }}
          >
            <p
              className="text-[10px] sm:text-sm tracking-wider"
              style={{
                color: vesak.gold,
                fontFamily: language === 'si' ? fontSi : fontEnDisplay,
              }}
            >
              {happyVesak}
            </p>
          </div>
        </div>

        {/* Right - Text side */}
        <div className="flex-1 flex flex-col min-h-0 p-2.5 sm:p-6 relative gap-0.5 sm:gap-0">
          <div className="absolute top-2 right-2 sm:top-5 sm:right-5 z-10 pointer-events-none">
            <div
              className="w-9 h-11 sm:w-16 sm:h-20 border rounded flex items-center justify-center"
              style={{
                background: vesakRgb('gold', 0.05),
                borderColor: vesakRgb('gold', 0.3),
                borderStyle: 'dashed',
              }}
            >
              <div className="text-center">
                <div className="text-[8px] sm:text-[10px]" style={{ color: vesakRgb('gold', 0.4) }}>
                  🪷
                </div>
                <div
                  className="text-[7px] sm:text-[8px] mt-0.5"
                  style={{ color: vesakRgb('gold', 0.3), fontFamily: fontEnBody }}
                >
                  Vesak
                </div>
              </div>
            </div>
          </div>

            <div className="shrink-0 mb-0.5 sm:mb-2 pr-10 sm:pr-0">
              <p
                className="text-[8px] sm:text-[9px] uppercase tracking-widest mb-0.5"
                style={{ color: vesakRgb('gold', 0.5), fontFamily: labelFont }}
              >
                {toLabel}
              </p>
              <p
                className="text-[11px] sm:text-sm leading-tight"
                style={{
                  color: vesakRgb('cream', 0.7),
                  fontFamily: language === 'si' ? fontSi : fontEnSerif,
                  fontStyle: 'italic',
                }}
              >
                {toName || '..............'}
              </p>
            </div>

          <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 my-0.5 sm:my-2">
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${vesakRgb('gold', 0.3)})` }}
            />
            <div className="text-[10px]" style={{ color: vesakRgb('gold', 0.4) }}>
              ❋
            </div>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to left, transparent, ${vesakRgb('gold', 0.3)})` }}
            />
          </div>

          {poemTitle && (
            <p
              className="shrink-0 text-[8px] sm:text-xs mb-0.5 sm:mb-1 tracking-wide"
              style={{
                color: vesakRgb('gold', 0.7),
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
                  color: vesakRgb('cream', 0.85),
                  fontFamily: language === 'si' ? fontSi : fontEnBody,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 my-0.5 sm:my-2">
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${vesakRgb('gold', 0.2)})` }}
            />
            <div className="text-[8px]" style={{ color: vesakRgb('gold', 0.3) }}>
              ✦
            </div>
          </div>

          <div className="shrink-0 text-right pr-1">
            <p
              className="text-[8px] uppercase tracking-widest"
              style={{ color: vesakRgb('gold', 0.4), fontFamily: labelFont }}
            >
              {fromLabel}
            </p>
            <p
              className="text-[11px] sm:text-sm leading-tight"
              style={{
                color: vesakRgb('cream', 0.7),
                fontFamily: language === 'si' ? fontSi : fontEnSerif,
                fontStyle: 'italic',
              }}
            >
              {fromName || '..............'}
            </p>
          </div>

          <div
            className="absolute bottom-3 right-8 sm:bottom-6 sm:right-16 text-3xl sm:text-6xl pointer-events-none select-none"
            style={{ color: vesakRgb('lotus', 0.05) }}
          >
            🪷
          </div>
        </div>
      </div>
    </div>
  )
}
