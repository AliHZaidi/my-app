'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { customScenarios } from '@/data/CustomScenarios'

const scenarios = Object.values(customScenarios)
const SCENARIOS_PER_PAGE = 6

const difficultyExplanations: Record<string, string> = {
  Easy: "Easy scenarios involve straightforward situations and basic advocacy skills.",
  Moderate: "Moderate scenarios include some complexity and require more nuanced responses.",
  Advanced: "Advanced scenarios present challenging situations that require strong advocacy and problem-solving."
}

const rehearsalExplanations = {
  advanced: "Advanced Rehearsal simulates a realistic, interactive meeting with dynamic responses and feedback.",
  simplified: "Simplified Rehearsal guides you through a series of multiple-choice questions with instant feedback."
}

export default function Scenarios() {
    const [page, setPage] = useState(1)
    const [showSuggestModal, setShowSuggestModal] = useState(false)
    const [suggestText, setSuggestText] = useState('')
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [completedScenarios, setCompletedScenarios] = useState<string[]>([])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const completed = JSON.parse(localStorage.getItem("completedScenarios") || "[]")
            setCompletedScenarios(completed)
        }
    }, [])

    const filteredScenarios = scenarios

    const totalPages = Math.ceil(filteredScenarios.length / SCENARIOS_PER_PAGE)
    const paginatedScenarios = filteredScenarios.slice(
        (page - 1) * SCENARIOS_PER_PAGE,
        page * SCENARIOS_PER_PAGE
    )

    const handleSendSuggestion = async () => {
        setSending(true)
        await fetch('/api/suggestScenario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ suggestion: suggestText }),
        })
        setSending(false)
        setSent(true)
        setSuggestText('')
    }

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

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Practice Scenarios</h1>
                <p className="text-2xl mb-8 text-gray-600 dark:text-gray-300">
                    Select a scenario to practice handling common IEP meeting situations. Hover over the difficulty level or rehearsal type for more information.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedScenarios.map((scenario) => (
                        <div key={scenario.id} className="relative">
                            <div className="p-6 rounded-lg border-2 border-blue-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex flex-col h-full">
                                <h2 className="text-xl font-semibold mb-2">{scenario.title}</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                                    {scenario.description}
                                </p>
                                <div className="flex items-center gap-2 mb-2">
                                  <span
                                    className={`
                                      px-2 py-1 rounded text-sm relative group
                                      ${scenario.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                                      ${scenario.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                                      ${scenario.difficulty === 'Advanced' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                                    `}
                                    tabIndex={0}
                                  >
                                    {scenario.difficulty}
                                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 hidden group-hover:block group-focus:block bg-gray-800 text-white text-base rounded px-4 py-3 shadow-lg whitespace-nowrap font-semibold">
                                      {difficultyExplanations[scenario.difficulty]}
                                    </span>
                                  </span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
                                    <h2 className="text-xl font-semibold mb-4">Background:</h2>
                                    <p className="text-lg">{scenario.background}</p>
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <Link
                                        href={`/scenarios/${scenario.id}`}
                                        className="flex-1 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition text-center relative group"
                                        tabIndex={0}
                                    >
                                        Advanced Rehearsal
                                        <span className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 hidden group-hover:block group-focus:block bg-gray-800 text-white text-base rounded px-4 py-3 shadow-lg whitespace-nowrap font-semibold">
                                          {rehearsalExplanations.advanced}
                                        </span>
                                    </Link>
                                    <Link
                                        href={`/scenarios/simple?id=${scenario.id}`}
                                        className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-400 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition text-center relative group"
                                        tabIndex={0}
                                    >
                                        Simplified Rehearsal
                                        <span className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 hidden group-hover:block group-focus:block bg-gray-800 text-white text-base rounded px-4 py-3 shadow-lg whitespace-nowrap font-semibold">
                                          {rehearsalExplanations.simplified}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            {completedScenarios.includes(scenario.id) && (
                              <span
                                className="absolute top-4 right-4 text-green-600 bg-transparent cursor-default group"
                                title="Completed"
                                tabIndex={0}
                              >
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden group-hover:block group-focus:block bg-gray-800 text-white text-base rounded px-4 py-2 shadow-lg whitespace-nowrap font-semibold">
                                  Completed
                                </span>
                              </span>
                            )}
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="font-semibold">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Suggest Scenario Button */}
            <button
                className="absolute top-8 right-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                onClick={() => setShowSuggestModal(true)}
            >
                Suggest a Scenario
            </button>

            {/* Suggest Scenario Modal */}
            {showSuggestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 shadow-2xl border border-blue-400 max-w-xl w-full relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl"
                            onClick={() => {
                                setShowSuggestModal(false)
                                setSent(false)
                                setSuggestText('')
                            }}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">Suggest a New Scenario</h2>
                        {sent ? (
                            <div className="text-green-700 text-lg mb-4">Thank you! Your suggestion has been sent to our team.</div>
                        ) : (
                            <>
                                <label className="block mb-2 font-semibold text-lg" htmlFor="scenario-suggestion">
                                    Describe your scenario:
                                </label>
                                <textarea
                                    id="scenario-suggestion"
                                    className="w-full p-3 border rounded mb-4 text-lg"
                                    rows={5}
                                    value={suggestText}
                                    onChange={e => setSuggestText(e.target.value)}
                                    placeholder="Describe a situation you want to practice..."
                                    disabled={sending}
                                />
                                <div className="flex gap-4">
                                    <button
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                        onClick={handleSendSuggestion}
                                        disabled={sending || !suggestText.trim()}
                                    >
                                        {sending ? 'Sending...' : 'Send to Team'}
                                    </button>
                                    <button
                                        className="px-6 py-3 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400 transition"
                                        onClick={() => {
                                            setShowSuggestModal(false)
                                            setSent(false)
                                            setSuggestText('')
                                        }}
                                        disabled={sending}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}