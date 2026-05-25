'use client'
import { Language } from '@/lib/data'

interface LanguageToggleProps {
  language: Language
  onChange: (lang: Language) => void
}

export default function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="lang-toggle">
      <button
        onClick={() => onChange('si')}
        className={`lang-toggle-option ${language === 'si' ? 'active' : ''}`}
      >
        සිංහල
      </button>
      <button
        onClick={() => onChange('en')}
        className={`lang-toggle-option ${language === 'en' ? 'active' : ''}`}
      >
        English
      </button>
    </div>
  )
}
