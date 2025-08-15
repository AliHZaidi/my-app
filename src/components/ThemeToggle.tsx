'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 p-3 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <span className="text-xl">🌞</span>
      ) : (
        <span className="text-xl">🌙</span>
      )}
    </button>
  )
}