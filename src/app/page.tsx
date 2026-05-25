'use client'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Language, Poem, POEMS, UI_TEXT, DEFAULT_VESAK_IMAGES } from '@/lib/data'
import LanguageToggle from '@/components/LanguageToggle'
import ImageSelector from '@/components/ImageSelector'
import PoemSelector from '@/components/PoemSelector'
import CardPreview from '@/components/CardPreview'
import DownloadButton from '@/components/DownloadButton'
import { captureVesakCard } from '@/lib/captureCard'

const FloatingPetals = dynamic(() => import('@/components/FloatingPetals'), { ssr: false })
const StarField = dynamic(() => import('@/components/StarField'), { ssr: false })

export default function Home() {
  const [language, setLanguage] = useState<Language>('si')
  const [selectedImageId, setSelectedImageId] = useState(DEFAULT_VESAK_IMAGES[0].id)
  const [selectedImageSrc, setSelectedImageSrc] = useState(DEFAULT_VESAK_IMAGES[0].src)
  const [customImage, setCustomImage] = useState<string | null>(null)
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(POEMS[0])
  const [customPoemText, setCustomPoemText] = useState('')
  const [fromName, setFromName] = useState('')
  const [toName, setToName] = useState('')

  const t = UI_TEXT[language]
  const currentImageSrc = customImage || selectedImageSrc

  const handleSelectImage = (id: string, src: string) => {
    setSelectedImageId(id)
    setSelectedImageSrc(src)
    setCustomImage(null)
  }

  const handleUploadImage = (dataUrl: string) => {
    setCustomImage(dataUrl)
    setSelectedImageId('custom')
  }

  const handleSelectPoem = (poem: Poem) => {
    setSelectedPoem(poem)
  }

  const handleDownload = useCallback(async () => {
    await captureVesakCard()
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: 'radial-gradient(ellipse at top, #2d1f4e 0%, #1e1535 30%, #0a0612 70%)' }}>
      <StarField />
      <FloatingPetals />

      {/* Hero Header */}
      <header className="relative z-10 text-center pt-10 pb-6 px-4">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[100px] bg-linear-to-r from-transparent to-vesak-gold/50" />
          <span className="text-vesak-gold text-xl lotus-bloom">🪷</span>
          <div className="h-px flex-1 max-w-[100px] bg-linear-to-l from-transparent to-vesak-gold/50" />
        </div>

        <p className="section-label mb-2">{t.tagline}</p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-display leading-none mb-1">
          <span className="gold-shimmer block">{t.title}</span>
          <span className="gold-shimmer block text-3xl sm:text-4xl md:text-5xl mt-1">{t.subtitle}</span>
        </h1>

        {/* Language toggle */}
        <div className="flex justify-center mt-6">
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px flex-1 max-w-[120px] bg-linear-to-r from-transparent to-vesak-gold/30" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-vesak-gold/50 star-particle" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-linear-to-l from-transparent to-vesak-gold/30" />
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">

          {/* LEFT PANEL - Controls */}
          <div className="space-y-5">

            {/* Step 1: Image */}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-vesak-gold/20 border border-vesak-gold/40 flex items-center justify-center shrink-0">
                  <span className="text-vesak-gold text-xs font-display">1</span>
                </div>
                <div>
                  <p className="section-label">{t.step1}</p>
                </div>
              </div>
              <ImageSelector
                selectedImageId={selectedImageId}
                customImage={customImage}
                onSelectImage={handleSelectImage}
                onUploadImage={handleUploadImage}
                labelSelect={t.selectImage}
                labelUpload={t.uploadLabel}
                uploadSizeHint={t.uploadSizeHint}
              />
            </div>

            {/* Step 2: Poem */}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-vesak-gold/20 border border-vesak-gold/40 flex items-center justify-center shrink-0">
                  <span className="text-vesak-gold text-xs font-display">2</span>
                </div>
                <div>
                  <p className="section-label">{t.step2}</p>
                </div>
              </div>
              <PoemSelector
                selectedPoemId={selectedPoem?.id ?? null}
                customPoem={customPoemText}
                onSelectPoem={handleSelectPoem}
                onCustomPoem={setCustomPoemText}
                language={language}
                labelSelect={t.selectPoem}
                labelCustom={t.customPoem}
                placeholderCustom={t.customPoemPlaceholder}
              />
            </div>

            {/* Steps 3 & 4: From & To */}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* From */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-vesak-gold/20 border border-vesak-gold/40 flex items-center justify-center shrink-0">
                      <span className="text-vesak-gold text-xs font-display">3</span>
                    </div>
                    <p className="section-label">{t.step3}</p>
                  </div>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder={t.fromPlaceholder}
                    className={`vesak-input w-full rounded-xl px-4 py-3 text-sm ${language === 'si' ? 'font-sinhala' : 'font-body'}`}
                  />
                </div>

                {/* To */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-vesak-gold/20 border border-vesak-gold/40 flex items-center justify-center shrink-0">
                      <span className="text-vesak-gold text-xs font-display">4</span>
                    </div>
                    <p className="section-label">{t.step4}</p>
                  </div>
                  <input
                    type="text"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    placeholder={t.toPlaceholder}
                    className={`vesak-input w-full rounded-xl px-4 py-3 text-sm ${language === 'si' ? 'font-sinhala' : 'font-body'}`}
                  />
                </div>
              </div>
            </div>

            {/* Download button - mobile only */}
            <div className="lg:hidden">
              <DownloadButton label={t.downloadBtn} onDownload={handleDownload} />
            </div>
          </div>

          {/* RIGHT PANEL - Preview */}
          <div className="space-y-5">
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-vesak-lotus animate-pulse" />
                <p className="section-label">{t.preview}</p>
              </div>

              {/* Card Preview */}
              <CardPreview
                imageSrc={currentImageSrc}
                poem={selectedPoem}
                customPoem={customPoemText}
                fromName={fromName}
                toName={toName}
                language={language}
                fromLabel={t.fromLabel}
                toLabel={t.toLabel}
                happyVesak={t.happyVesak}
              />

              {/* Decorative below preview */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-linear-to-r from-transparent to-vesak-gold/20" />
                <span className="text-vesak-gold/30 text-xs">✦</span>
                <div className="h-px flex-1 bg-linear-to-l from-transparent to-vesak-gold/20" />
              </div>
            </div>

            {/* Download button - desktop */}
            <div className="hidden lg:block">
              <DownloadButton label={t.downloadBtn} onDownload={handleDownload} />
            </div>

            {/* Info card */}
            <div className="glass-card rounded-2xl p-5 border border-vesak-gold/10">
              <div className="flex gap-3">
                <div className="text-vesak-gold/60 text-xl">☸️</div>
                <div>
                  <p className="text-vesak-gold/70 text-xs font-display tracking-wide mb-1">
                    {language === 'si' ? 'Download කිරීම ගැන' : 'About Download'}
                  </p>
                  <p className="text-vesak-cream/45 text-xs font-body leading-relaxed">
                    {language === 'si'
                      ? 'ඔබේ Vesak card PNG ආකෘතියෙන් Download වනු ඇත. එය WhatsApp, Facebook හෝ print කිරීමට භාවිතා කළ හැකිය.'
                      : 'Your Vesak card will download as a high-quality PNG. Perfect for WhatsApp, Facebook, or printing.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-4 border-t border-vesak-gold/10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-12 bg-linear-to-r from-transparent to-vesak-gold/30" />
          <span className="text-vesak-gold/50 text-sm">🪷</span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-vesak-gold/30" />
        </div>
        <p className="text-vesak-cream/30 text-xs font-body">
          {language === 'si'
            ? 'සියළු දෙනා සැපවත් වේවා · May all beings be happy'
            : 'May all beings be happy · සියළු දෙනා සැපවත් වේවා'}
        </p>
        <p className="text-vesak-cream/25 text-[10px] font-body mt-3 tracking-wide">
          © {new Date().getFullYear()} Vihanga Edirisinghe. All Rights Reserved.
        </p>
      </footer>
    </main>
  )
}
