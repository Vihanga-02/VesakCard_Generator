'use client'
import { POEMS, Poem, Language } from '@/lib/data'

interface PoemSelectorProps {
  selectedPoemId: string | null
  customPoem: string
  onSelectPoem: (poem: Poem) => void
  onCustomPoem: (text: string) => void
  language: Language
  labelSelect: string
  labelCustom: string
  placeholderCustom: string
}

export default function PoemSelector({
  selectedPoemId,
  customPoem,
  onSelectPoem,
  onCustomPoem,
  language,
  labelSelect,
  labelCustom,
  placeholderCustom,
}: PoemSelectorProps) {
  const isCustomMode = selectedPoemId === 'custom'

  return (
    <div className="space-y-3">
      {/* Preset poems */}
      <div className="space-y-2">
        {POEMS.map((poem) => (
          <button
            key={poem.id}
            onClick={() => onSelectPoem(poem)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
              selectedPoemId === poem.id && !isCustomMode
                ? 'border-vesak-gold bg-vesak-gold/10 shadow-lg shadow-vesak-gold/10'
                : 'border-vesak-gold/20 hover:border-vesak-gold/50 hover:bg-vesak-gold/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                selectedPoemId === poem.id && !isCustomMode
                  ? 'border-vesak-gold bg-vesak-gold'
                  : 'border-vesak-gold/40'
              }`}>
                {selectedPoemId === poem.id && !isCustomMode && (
                  <div className="w-2 h-2 rounded-full bg-vesak-darkest"/>
                )}
              </div>
              <div>
                <p className={`text-xs font-display tracking-wide ${
                  language === 'si' ? 'font-sinhala' : ''
                } ${selectedPoemId === poem.id ? 'text-vesak-gold' : 'text-vesak-cream/70'}`}>
                  {language === 'si' ? poem.titleSi : poem.titleEn}
                </p>
                <p className={`text-xs mt-1 text-vesak-cream/40 line-clamp-1 ${language === 'si' ? 'font-sinhala' : 'font-body italic'}`}>
                  {language === 'si' ? poem.textSi[0] : poem.textEn[0]}
                </p>
              </div>
            </div>
          </button>
        ))}

        {/* Custom poem option */}
        <button
          onClick={() => onSelectPoem({ id: 'custom', titleSi: '', titleEn: '', textSi: [], textEn: [] })}
          className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
            isCustomMode
              ? 'border-vesak-lotus bg-vesak-lotus/10'
              : 'border-vesak-gold/20 hover:border-vesak-gold/50 hover:bg-vesak-gold/5'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
              isCustomMode ? 'border-vesak-lotus bg-vesak-lotus' : 'border-vesak-gold/40'
            }`}>
              {isCustomMode && <div className="w-2 h-2 rounded-full bg-white"/>}
            </div>
            <span className={`text-xs ${isCustomMode ? 'text-vesak-lotus' : 'text-vesak-cream/70'}`}>
              ✏️ {labelCustom}
            </span>
          </div>
        </button>
      </div>

      {/* Custom poem textarea */}
      {isCustomMode && (
        <textarea
          value={customPoem}
          onChange={(e) => onCustomPoem(e.target.value)}
          placeholder={placeholderCustom}
          rows={5}
          className={`w-full vesak-textarea rounded-xl px-4 py-3 text-sm ${
            language === 'si' ? 'font-sinhala' : 'font-body italic'
          }`}
        />
      )}
    </div>
  )
}
