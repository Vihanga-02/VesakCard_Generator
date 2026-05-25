'use client'
import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  color: string
  rotation: number
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const colors = ['#e8536a', '#f4a0b0', '#f5c842', '#d4a017', '#f97316']
    const newPetals = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            animation: `petalFall ${petal.duration}s ${petal.delay}s linear infinite`,
          }}
        >
          {/* Lotus petal shape */}
          <svg
            width={petal.size * 2}
            height={petal.size * 3}
            viewBox="0 0 20 30"
            style={{ transform: `rotate(${petal.rotation}deg)`, opacity: 0.7 }}
          >
            <path
              d="M10,0 Q18,8 10,20 Q2,8 10,0 Z"
              fill={petal.color}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
