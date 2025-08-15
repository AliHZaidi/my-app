'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import glossaryMarkdown from './glossary/glossary.md?raw'
import { marked } from 'marked'

interface GlossaryTerm {
  term: string
  definition: string
  letter: string
}

function parseGlossary(md: string): GlossaryTerm[] {
  const lines = md.split('\n')
  let currentLetter = ''
  let currentTerm = ''
  let collectingDef = false
  let defLines: string[] = []
  const terms: GlossaryTerm[] = []

  for (let line of lines) {
    // Letter section
    const letterMatch = line.match(/^##\s+\*\*(\w)\*\*/)
    if (letterMatch) {
      currentLetter = letterMatch[1]
      continue
    }
    // Term
    const termMatch = line.match(/^###\s+\*\*(.+?)\*\*/)
    if (termMatch) {
      if (currentTerm && defLines.length) {
        terms.push({
          term: currentTerm,
          definition: defLines.join(' ').trim(),
          letter: currentLetter,
        })
      }
      currentTerm = termMatch[1]
      defLines = []
      collectingDef = true
      continue
    }
    // Definition lines
    if (collectingDef) {
      if (line.trim() === '' || line.startsWith('---')) {
        // End of definition
        if (currentTerm && defLines.length) {
          terms.push({
            term: currentTerm,
            definition: defLines.join(' ').trim(),
            letter: currentLetter,
          })
        }
        currentTerm = ''
        defLines = []
        collectingDef = false
      } else {
        defLines.push(line.trim())
      }
    }
  }
  // Push last term
  if (currentTerm && defLines.length) {
    terms.push({
      term: currentTerm,
      definition: defLines.join(' ').trim(),
      letter: currentLetter,
    })
  }
  return terms
}

export default function Glossary() {
  const [search, setSearch] = useState('')
  const allTerms = useMemo(() => parseGlossary(glossaryMarkdown), [])
  const filteredTerms = useMemo(() => {
    if (!search.trim()) return allTerms
    const s = search.toLowerCase()
    return allTerms.filter(
      t =>
        t.term.toLowerCase().includes(s) ||
        t.definition.toLowerCase().includes(s)
    )
  }, [search, allTerms])

  // Group by letter
  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {}
    for (const t of filteredTerms) {
      if (!map[t.letter]) map[t.letter] = []
      map[t.letter].push(t)
    }
    return map
  }, [filteredTerms])

  return (
    <div className="min-h-screen p-8">
      <nav className="mb-8">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </Link>
      </nav>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">IEP & Special Education Glossary</h1>
        <input
          type="text"
          placeholder="Search for a term or definition..."
          className="w-full p-4 mb-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {Object.keys(grouped).length === 0 && (
          <p className="text-gray-500">No terms found.</p>
        )}
        <div className="space-y-10">
          {Object.entries(grouped).sort().map(([letter, terms]) => (
            <section key={letter}>
              <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">{letter}</h2>
              <div className="space-y-6">
                {terms.map(term => (
                  <div key={term.term} className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">{term.term}</h3>
                    <div
                      className="text-gray-700 dark:text-gray-200"
                      dangerouslySetInnerHTML={{ __html: marked.parseInline(term.definition) }}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}