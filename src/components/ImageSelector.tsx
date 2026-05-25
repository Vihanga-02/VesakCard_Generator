'use client'
import { useRef } from 'react'
import { DEFAULT_VESAK_IMAGES } from '@/lib/data'

interface ImageSelectorProps {
  selectedImageId: string
  customImage: string | null
  onSelectImage: (id: string, src: string) => void
  onUploadImage: (dataUrl: string) => void
  labelSelect: string
  labelUpload: string
  uploadSizeHint: string
}

export default function ImageSelector({
  selectedImageId,
  customImage,
  onSelectImage,
  onUploadImage,
  labelSelect,
  labelUpload,
  uploadSizeHint,
}: ImageSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      onUploadImage(result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      {/* Preset images grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {DEFAULT_VESAK_IMAGES.map((img) => (
          <button
            key={img.id}
            onClick={() => onSelectImage(img.id, img.src)}
            className={`relative aspect-3/4 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 group ${
              selectedImageId === img.id && !customImage
                ? 'border-vesak-gold image-selected'
                : 'border-transparent hover:border-vesak-gold/50'
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="absolute bottom-1 left-0 right-0 text-center text-[9px] text-vesak-cream font-body">{img.label}</p>
            </div>
            {selectedImageId === img.id && !customImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-vesak-gold/90 flex items-center justify-center">
                  <svg className="w-4 h-4 text-vesak-darkest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Upload custom image */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`w-full py-3 px-4 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 group ${
            customImage
              ? 'border-vesak-gold bg-vesak-gold/10'
              : 'border-vesak-gold/30 hover:border-vesak-gold/60 hover:bg-vesak-gold/5'
          }`}
        >
          {customImage ? (
            <>
              <img src={customImage} alt="Custom" className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-vesak-gold text-sm font-body">Custom image selected ✓</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6 text-vesak-gold/60 group-hover:text-vesak-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-vesak-cream/50 text-sm font-body group-hover:text-vesak-cream/70 transition-colors text-center">
                {labelUpload}{' '}
                <span className="text-[10px] text-vesak-cream/35 font-body">{uploadSizeHint}</span>
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
