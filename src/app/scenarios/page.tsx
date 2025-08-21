'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { customScenarios } from '@/data/CustomScenarios'

const scenarios = Object.values(customScenarios)
const tags = Array.from(new Set(scenarios.map(s => s.category))).filter((tag): tag is string => typeof tag === 'string')
const SCENARIOS_PER_PAGE = 6

export default function Scenarios() {
    //const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [showSuggestModal, setShowSuggestModal] = useState(false)
    const [suggestText, setSuggestText] = useState('')
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [completedScenarios, setCompletedScenarios] = useState<string[]>([])

    const [showPersonalizeModal, setShowPersonalizeModal] = useState(false)
    const [personalDetails, setPersonalDetails] = useState({
        grade: '',
        disability: '',
        strengths: '',
        needs: ''
    })
    const [savedPersonalDetails, setSavedPersonalDetails] = useState(false)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const completed = JSON.parse(localStorage.getItem("completedScenarios") || "[]")
            setCompletedScenarios(completed)
        }
    }, [])

    // For custom scenarios, use title as tag for filtering (or add a tag field to CustomScenarios if needed)
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
                <button
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setShowPersonalizeModal(true)}
                >
                    Personalize These Scenarios
                </button>
            </nav>

            {showPersonalizeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 shadow-2xl border border-green-400 max-w-xl w-full relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl"
                            onClick={() => setShowPersonalizeModal(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold text-green-700 mb-4">Personalize Scenarios</h2>
                        {savedPersonalDetails ? (
                            <div className="text-green-700 text-lg mb-4">Your details have been saved! Scenarios will be personalized for your child.</div>
                        ) : (
                            <form
                                onSubmit={e => {
                                    e.preventDefault()
                                    setSavedPersonalDetails(true)
                                    setShowPersonalizeModal(false)
                                    // Optionally, save to localStorage or context for use in scenarios
                                    localStorage.setItem('personalDetails', JSON.stringify(personalDetails))
                                }}
                            >
                                <label className="block mb-2 font-semibold text-lg">Grade</label>
                                <input
                                    className="w-full p-3 border rounded mb-4 text-lg"
                                    value={personalDetails.grade}
                                    onChange={e => setPersonalDetails({ ...personalDetails, grade: e.target.value })}
                                    placeholder="Grade"
                                />
                                <label className="block mb-2 font-semibold text-lg">Disability/Diagnosis</label>
                                <input
                                    className="w-full p-3 border rounded mb-4 text-lg"
                                    value={personalDetails.disability}
                                    onChange={e => setPersonalDetails({ ...personalDetails, disability: e.target.value })}
                                    placeholder="Disability or diagnosis"
                                />
                                <label className="block mb-2 font-semibold text-lg">Strengths</label>
                                <input
                                    className="w-full p-3 border rounded mb-4 text-lg"
                                    value={personalDetails.strengths}
                                    onChange={e => setPersonalDetails({ ...personalDetails, strengths: e.target.value })}
                                    placeholder="Strengths"
                                />
                                <label className="block mb-2 font-semibold text-lg">Needs/Concerns</label>
                                <input
                                    className="w-full p-3 border rounded mb-4 text-lg"
                                    value={personalDetails.needs}
                                    onChange={e => setPersonalDetails({ ...personalDetails, needs: e.target.value })}
                                    placeholder="Needs or concerns"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                                >
                                    Save Details
                                </button>
                            </form>
                                             )}
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Practice Scenarios</h1>
                <p className="text-2xl mb-8 text-gray-600 dark:text-gray-300">
                    Select a scenario to practice handling common IEP meeting situations
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
                                    <span className={`
                    px-2 py-1 rounded text-sm
                    ${scenario.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                    ${scenario.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                    ${scenario.difficulty === 'Advanced' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                  `}>
                                        {scenario.difficulty}
                                    </span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
                                    <h2 className="text-xl font-semibold mb-4">Background:</h2>
                                    <p className="text-lg">{scenario.background}</p>
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <Link
                                        href={`/scenarios/${scenario.id}`}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                                    >
                                        Advanced Rehearsal
                                    </Link>
                                    <Link
                                        href={`/scenarios/simple?id=${scenario.id}`}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-center"
                                    >
                                        Simplified Rehearsal
                                    </Link>
                                </div>
                            </div>
                            {completedScenarios.includes(scenario.id) && (
                                <span className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                                    Completed
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