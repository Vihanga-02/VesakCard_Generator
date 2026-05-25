'use client'
import { useState } from 'react'

interface DownloadButtonProps {
  label: string
  onDownload: () => Promise<void>
}

export default function DownloadButton({ label, onDownload }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    setDone(false)
    try {
      await onDownload()
      setDone(true)
      setTimeout(() => setDone(false), 2500)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`vesak-btn w-full py-4 px-6 rounded-2xl text-sm font-display tracking-wider flex items-center justify-center gap-3 transition-all duration-300 download-pulse ${
        isLoading ? 'opacity-70' : ''
      } ${done ? 'done' : ''}`}
    >
      {isLoading ? (
        <>
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span>Creating your card...</span>
        </>
      ) : done ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Downloaded!</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  )
}
