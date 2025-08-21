'use client'

import Link from 'next/link'
import { use, useEffect, useRef, useState } from 'react'
import { customScenarios } from '@/data/CustomScenarios'

interface ScenarioPageProps {
  params: Promise<{ id: string }>
}

export default function ScenarioPage({ params }: ScenarioPageProps) {
  const { id } = use(params)
  const scenario = customScenarios[id]
  const [customHistory, setCustomHistory] = useState<{ user: string; school: string; irpType: string; animating?: boolean }[]>([])
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<{ type: string; text: string; likelySchoolResponse?: string; textExplanation?: string }[]>([])
  const [selectedIRP, setSelectedIRP] = useState<'interests' | 'rights' | 'power' | null>(null)
  const [simulationEnded, setSimulationEnded] = useState(false)
  const [initialSelected, setInitialSelected] = useState(false)
  const [animatedSchoolText, setAnimatedSchoolText] = useState<string>('')
  const [hoveredExplanation, setHoveredExplanation] = useState<number | null>(null)
  const [loadingBubbles, setLoadingBubbles] = useState<number | null>(null)
  const [outcomeScores, setOutcomeScores] = useState<{ outcome: string, score: number, explanation: string }[]>(
    scenario?.potentialOutcomes
      ? scenario.potentialOutcomes.map(outcome => ({
          outcome,
          score: 0,
          explanation: "No progress yet."
        }))
      : []
  )
  const [scoringLoading, setScoringLoading] = useState(false)
  const [pendingOutcomeScores, setPendingOutcomeScores] = useState<{ outcome: string, score: number, explanation: string }[] | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [showLikelyOutcomePopup, setShowLikelyOutcomePopup] = useState(false)
  const [likelyOutcome, setLikelyOutcome] = useState<{ outcome: string, score: number, explanation: string } | null>(null)
  //const [qualtricsCode, setQualtricsCode] = useState<string | null>(null)
  const animationTimeout = useRef<NodeJS.Timeout | null>(null)

  // Animate school response word by word
  const animateSchoolResponse = (fullText: string, idx: number) => {
    setAnimatedSchoolText('')
    const words = fullText.split(' ')
    let current = ''
    let i = 0

    const showNextWord = () => {
      if (i < words.length) {
        current = current ? `${current} ${words[i]}` : words[i]
        setAnimatedSchoolText(current)
        i++
        // Slower animation: 140ms per word instead of 60ms
        animationTimeout.current = setTimeout(showNextWord, 140)
      } else {
        setCustomHistory(prev => {
          const updated = [...prev]
          updated[idx] = { ...updated[idx], school: fullText, animating: false }
          return updated
        })
        setAnimatedSchoolText('')
      }
    }

    showNextWord()
  }

  useEffect(() => {
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current)
    }
  }, [])

  // Generate a summary of IRP types used
  const getIRPStats = () => {
    console.log(selectedIRP)
    const counts = { interests: 0, rights: 0, power: 0 }
    customHistory.forEach(turn => {
      if (turn.irpType && counts.hasOwnProperty(turn.irpType)) {
        counts[turn.irpType as keyof typeof counts]++
      }
    })
    const total = counts.interests + counts.rights + counts.power
    return {
      ...counts,
      total,
      interestsPct: total ? Math.round((counts.interests / total) * 100) : 0,
      rightsPct: total ? Math.round((counts.rights / total) * 100) : 0,
      powerPct: total ? Math.round((counts.power / total) * 100) : 0,
    }
  }

  // Generate feedback based on response styles and outcome
  const getPerformanceFeedback = () => {
    const stats = getIRPStats()
    let feedback = ""
    if (stats.interestsPct >= 50) {
      feedback += "You often used collaborative responses, focusing on working together and finding common ground with the school team. "
    }
    if (stats.rightsPct >= 30) {
      feedback += "You made sure to reference your rights and request documentation or clarification when needed, which helps ensure your child's needs are protected. "
    }
    if (stats.powerPct >= 30) {
      feedback += "You used assertive responses to clearly state your position and push for specific outcomes. This can be effective, but may also increase tension in some situations. "
    }
    if (!feedback) {
      feedback = "Try to use a mix of approaches—collaboration, asking for your rights, and assertiveness—depending on the situation."
    }
    return feedback
  }

  // Suggest next steps based on scenario
  const getNextSteps = () => {
    if (scenario.id === 'custom-disagreement') {
      return [
        "Review your child's progress data and documentation.",
        "Request a follow-up meeting if you still have concerns.",
        "Consider bringing an advocate or support person to future meetings.",
        "Document all communications and decisions."
      ]
    }
    if (scenario.id === 'custom-request-data') {
      return [
        "Request copies of all relevant data and assessments.",
        "Schedule a meeting to review the data together.",
        "Clarify how data will be used to make decisions about services."
      ]
    }
    // Add more scenario-specific next steps as needed
    return [
      "Reflect on what strategies worked best.",
      "Prepare questions or requests for your next meeting.",
      "Reach out to a local parent support group or advocate if needed."
    ]
  }

  // When simulation ends, generate a code for Qualtrics
  const handleEndSimulation = () => {
    setSimulationEnded(true)
    // Mark scenario as completed in localStorage
    if (typeof window !== "undefined") {
      const completed = JSON.parse(localStorage.getItem("completedScenarios") || "[]")
      if (!completed.includes(id)) {
        completed.push(id)
        localStorage.setItem("completedScenarios", JSON.stringify(completed))
      }
    }
    // Generate a simple 6-digit code
    //const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    //setQualtricsCode(code)
    logSimulation()
  }

  // Fetch school response and IRP options from API
  const fetchSchoolResponseAndOptions = async (
    parentText: string,
    irpType: string,
    initial = false,
    plannedSchoolResponse?: string,
    textExplanation?: string
  ) => {
    setLoading(true)
    // Clear previous options immediately so old responses disappear
    setOptions([])

    try {
      if (plannedSchoolResponse) {
        console.log(textExplanation)
        const idx = customHistory.length
        setCustomHistory(prev => [
          ...prev,
          { user: parentText, school: '', irpType, animating: true }
        ])
        animateSchoolResponse(plannedSchoolResponse, idx)
      } else {
        // Show "Thinking..." while waiting for API
        setCustomHistory(prev => [
          ...prev,
          { user: parentText, school: 'Thinking...', irpType, animating: false }
        ])
      }

      const lastSchoolResponse =
        customHistory.length > 0
    ? customHistory[customHistory.length - 1].school
    : scenario.initialSchoolLine;

      const res = await fetch('/api/generateSchoolResponseAndOptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioBackground: scenario.background,
          schoolLine: lastSchoolResponse,
          parentHistory: initial
            ? [{ user: parentText, school: '', irpType }]
            : [...customHistory, { user: parentText, school: '', irpType }],
          irpType
        })
      })
      const data = await res.json()
      setOptions(data.options)
      // If not animating, update school response instantly
      if (!plannedSchoolResponse) {
        setCustomHistory(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            school: data.schoolResponse
          }
          return updated
        })
      }
    } catch (err) {
      setOptions([])
      setCustomHistory(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          school: 'Error generating response. Please try again.'
        }
        return updated
      })
      console.error('Error fetching school response:', err)
    }
    setLoading(false)
    setSelectedIRP(null)
  }


  // Undo last message
  const handleUndo = () => {
    if (customHistory.length === 0 || loading) return
    setCustomHistory(prev => prev.slice(0, -1))
    setOptions([])
    setInitialSelected(customHistory.length - 1 > 0)
  }

  // Handler for clicking a user bubble
  const handleUserBubbleClick = (idx: number) => {
    // Show loading in all three bubbles for this turn
    setLoadingBubbles(idx)
    // Optionally, you could trigger a fetch or other logic here
  }

  // Custom phase chat bubbles
  const customChatBubbles: React.ReactNode[] = []
  for (let i = 0; i < customHistory.length; i++) {
    // User bubble
    customChatBubbles.push(
      <div
        key={`custom-user-${i}`}
        className="flex justify-end mb-2 cursor-pointer"
        onClick={() => handleUserBubbleClick(i)}
      >
        <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl max-w-xl text-lg">
          {customHistory[i].user}
        </div>
      </div>
    )
    // School bubble
    customChatBubbles.push(
      <div key={`custom-school-${i}`} className="flex mb-6">
        <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-2xl max-w-xl min-h-[2.5em] flex items-center gap-2 text-lg">
          <span className="font-bold text-blue-700">School:</span>{' '}
          {customHistory[i].animating
            ? (
                <>
                  {animatedSchoolText}
                  <span className="ml-2 animate-pulse text-xs text-blue-700"></span>
                </>
              )
            : loadingBubbles === i
              ? (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="animate-pulse bg-blue-100 dark:bg-blue-900 text-blue-700 rounded px-3 py-2 my-1">Loading response 1...</div>
                    <div className="animate-pulse bg-blue-100 dark:bg-blue-900 text-blue-700 rounded px-3 py-2 my-1">Loading response 2...</div>
                    <div className="animate-pulse bg-blue-100 dark:bg-blue-900 text-blue-700 rounded px-3 py-2 my-1">Loading response 3...</div>
                  </div>
                )
              : customHistory[i].school}
        </div>
      </div>
    )
  }

  // Initial options box (always visible)
  const initialOptionsBox = (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col gap-8 mb-6">
      <h3 className="font-semibold mb-6 text-2xl">Choose your response</h3>
      <div className="flex flex-col gap-6">
        {(initialSelected ? options : scenario.initialOptions).map((option, idx) => (
          <div key={option.type} className="relative flex items-center group">
            <button
              onClick={() =>
                initialSelected
                  ? handleOptionSelect(option)
                  : handleInitialOptionSelect(option)
              }
              className={`flex-1 px-6 py-4 rounded-2xl text-left transition-colors shadow bg-gray-200 dark:bg-gray-800 text-lg text-gray-900 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900`}
              disabled={loading}
            >
              {option.text}
            </button>
            {option.textExplanation && (
              <span
                className="ml-3 cursor-pointer text-blue-600 hover:text-blue-900"
                onMouseEnter={() => setHoveredExplanation(idx)}
                onMouseLeave={() => setHoveredExplanation(null)}
                tabIndex={0}
                onFocus={() => setHoveredExplanation(idx)}
                onBlur={() => setHoveredExplanation(null)}
                aria-label="Show explanation"
              >
                <svg width="24" height="24" fill="currentColor" className="inline" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <text x="10" y="15" textAnchor="middle" fontSize="14" fill="currentColor" fontFamily="Arial">i</text>
                </svg>
              </span>
            )}
            {hoveredExplanation === idx && option.textExplanation && (
              <div className="absolute left-1/2 top-full z-10 mt-3 w-80 -translate-x-1/2 rounded bg-white dark:bg-gray-800 p-4 text-base text-gray-900 dark:text-gray-100 shadow-lg border border-gray-300 dark:border-gray-700">
                {option.textExplanation}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center mt-6">
            <span className="animate-pulse text-lg text-blue-700 bg-blue-100 dark:bg-blue-900 px-4 py-3 rounded">
              Loading next responses...
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-colors shadow disabled:opacity-50 text-lg"
          onClick={handleUndo}
          disabled={loading || customHistory.length === 0}
        >
          Undo Last Message
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors shadow text-lg"
          onClick={handleEndSimulation}
        >
          End Simulation
        </button>
      </div>
    </div>
  )

  // Helper to get the last parent/school exchange
  const getLastExchange = () => {
    if (customHistory.length === 0) return { user: '', school: '' }
    const last = customHistory[customHistory.length - 1]
    return { user: last.user, school: last.school }
  }

  // Scoring outcomes based on user selections
  const fetchScores = async () => {
    if (!scenario.potentialOutcomes || customHistory.length === 0) return
    setScoringLoading(true)
    setPendingOutcomeScores(outcomeScores)
    try {
      const res = await fetch('/api/scoreOutcomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previousScores: outcomeScores.length > 0
            ? outcomeScores.map(({ outcome, score, explanation }) => ({ outcome, score, explanation }))
            : (scenario.potentialOutcomes ?? []).map(outcome => ({
                outcome,
                score: 0,
                explanation: "No progress yet."
              })),
          potentialOutcomes: scenario.potentialOutcomes,
          lastExchange: getLastExchange()
        })
      })
      const data = await res.json()
      setOutcomeScores(data)
      setPendingOutcomeScores(null)

      // Find the most likely outcome and check if it's significantly ahead
      const sorted = [...data].sort((a, b) => b.score - a.score)
      const mostLikely = sorted[0]
      const nextLikely = sorted[1]
      // Show popup if most likely outcome is at least 20% higher than the next highest and above 60%
      if (mostLikely && mostLikely.score >= 60 && (!nextLikely || mostLikely.score - nextLikely.score >= 20)) {
        setLikelyOutcome(mostLikely)
        setShowLikelyOutcomePopup(true)
      } else {
        setShowLikelyOutcomePopup(false)
        setLikelyOutcome(null)
      }
    } catch {
      setPendingOutcomeScores(null)
      setOutcomeScores([])
      setShowLikelyOutcomePopup(false)
      setLikelyOutcome(null)
    }
    setScoringLoading(false)
  }

  // Update handleInitialOptionSelect and handleOptionSelect to call fetchScores after updating history
  const handleInitialOptionSelect = (option: { type: string; text: string; likelySchoolResponse?: string }) => {
    setInitialSelected(true)
    fetchSchoolResponseAndOptions(option.text, option.type, true, option.likelySchoolResponse)
    setTimeout(fetchScores, 500) // slight delay to ensure history is updated
  }

  const handleOptionSelect = (option: { type: string; text: string; likelySchoolResponse?: string }) => {
    fetchSchoolResponseAndOptions(option.text, option.type, false, option.likelySchoolResponse)
    setTimeout(fetchScores, 500)
  }

  // Ensure outcomeScores is initialized at 0 at the start of each scenario
  useEffect(() => {
    if (scenario?.potentialOutcomes) {
      setOutcomeScores(
        scenario.potentialOutcomes.map(outcome => ({
          outcome,
          score: 0,
          explanation: "No progress yet."
        }))
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario?.id])

  // Start timer when scenario begins
  useEffect(() => {
    setStartTime(Date.now())
    setElapsedTime(0)
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [scenario?.id])

  // Log simulation data to the server
  const logSimulation = async (additionalData?: object) => {
    try {
      await fetch('/api/logSimulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: id,
          parentChoices: customHistory,
          outcomeScores,
          startTime,
          endTime: Date.now(),
          elapsedSeconds: startTime ? Math.floor((Date.now() - startTime) / 1000) : null,
          ...additionalData, // include any additional data like qualtricsCode
        }),
      })
    } catch (err) {
      // Optionally handle/log error
      console.error('Failed to log simulation:', err)
    }
  }


  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <nav className="mb-8 flex gap-4">
        <Link 
          href="/scenarios"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Back to Scenarios
        </Link>
      </nav>

      <div className="max-w-[110rem] mx-auto space-y-16">
        <h1 className="text-6xl font-bold">{scenario.title}</h1>
        <div className="bg-white dark:bg-gray-900 p-14 rounded-3xl border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-3xl font-semibold mb-8">Background:</h2>
          <p className="text-2xl">{scenario.background}</p>
        </div>

        {/* Chat and Choices side by side */}
        <div className="flex flex-col md:flex-row gap-16">
          {/* Chat Box */}
          <div
            className="flex-1 bg-white dark:bg-gray-800 p-14 rounded-3xl border border-gray-200 dark:border-gray-700"
            style={{ height: 'auto', minWidth: 0 }}
            id="chat-options-row"
          >
            <div
              className="flex flex-col gap-6 h-full"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                className="overflow-y-auto"
                id="chat-scroll"
                style={{
                  flex: 1,
                  minHeight: 0,
                  maxHeight: '100%',
                }}
              >
                {/* Always show initial school message at the top */}
                <div className="flex mb-10">
                  <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-8 py-6 rounded-2xl max-w-3xl text-lg">
                    <span className="font-bold text-blue-700">School:</span> {scenario.initialSchoolLine}
                  </div>
                </div>
                {customChatBubbles}
              </div>
            </div>
          </div>
          {/* Choices Box */}
          <div
            className="w-full md:w-[520px] flex flex-col gap-12 justify-start flex-shrink-0"
            id="options-box"
            style={{ height: 'auto' }}
          >
            {simulationEnded ? (
              <div className="bg-gray-100 dark:bg-gray-900 p-12 rounded-3xl border border-gray-300 dark:border-gray-700 flex flex-col items-center h-full">
                <h3 className="font-semibold mb-8 text-3xl text-green-700">Simulation Ended</h3>
                <p className="mb-8 text-2xl text-gray-700 dark:text-gray-300">Thank you for practicing your advocacy skills!</p>
                <div className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                  Time elapsed: {elapsedTime} seconds
                </div>

                {/* --- Feedback --- */}
                <div className="mb-8 w-full max-w-xl">
                  <h4 className="font-bold text-xl mb-2 text-blue-700">Feedback</h4>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{getPerformanceFeedback()}</p>
                </div>

                {/* --- Next Steps --- */}
                <div className="mb-8 w-full max-w-xl">
                  <h4 className="font-bold text-xl mb-2 text-blue-700">Suggested Next Steps</h4>
                  <ul className="list-disc pl-6 text-lg text-gray-800 dark:text-gray-200">
                    {getNextSteps().map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                {/* --- Qualtrics Code --- */}
                {/* {qualtricsCode && (
                  <div className="mb-8 w-full max-w-xl">
                    <h4 className="font-bold text-xl mb-2 text-blue-700">Survey Code</h4>
                    <p className="mb-2 text-lg">To continue in the survey, enter this code in Qualtrics:</p>
                    <div className="text-3xl font-mono bg-white dark:bg-gray-800 px-8 py-4 rounded-lg border border-blue-400 text-blue-700 select-all">
                      {qualtricsCode}
                    </div>
                  </div>
                )} */}

                <Link
                  href="/scenarios"
                  className="px-10 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block text-2xl"
                >
                  Back to Scenarios
                </Link>
              </div>
            ) : (
              <div className="h-full flex flex-col">{initialOptionsBox}</div>
            )}
          </div>
        </div>

        {/* Outcomes Box below chat and choices */}
        {scenario.potentialOutcomes && (
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-3xl p-12 mt-12">
            <h3 className="font-semibold mb-6 text-3xl text-blue-700">Possible Outcomes:</h3>
            {scoringLoading && (pendingOutcomeScores || outcomeScores.length > 0) ? (
              <ul className="space-y-6 opacity-60 pointer-events-none select-none">
                {(pendingOutcomeScores || outcomeScores).map(({ outcome, score, explanation }, idx) => (
                  <li key={idx} className="flex flex-col gap-3">
                    <div className="flex items-center gap-6">
                      <span className="flex-1 text-2xl">{outcome}</span>
                      <div className="w-72 bg-gray-200 dark:bg-gray-700 rounded h-4 overflow-hidden">
                        <div
                          className="bg-blue-500 h-4 rounded"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="ml-4 text-xl text-blue-700">{score}%</span>
                    </div>
                    <div className="text-xl text-gray-600 dark:text-gray-300">{explanation}</div>
                  </li>
                ))}
              </ul>
            ) : scoringLoading ? (
              <div className="text-blue-700 animate-pulse text-2xl">Scoring outcomes...</div>
            ) : (
              <ul className="space-y-6">
                {outcomeScores.map(({ outcome, score, explanation }, idx) => (
                  <li key={idx} className="flex flex-col gap-3">
                    <div className="flex items-center gap-6">
                      <span className="flex-1 text-2xl">{outcome}</span>
                      <div className="w-72 bg-gray-200 dark:bg-gray-700 rounded h-4 overflow-hidden">
                        <div
                          className="bg-blue-500 h-4 rounded"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="ml-4 text-xl text-blue-700">{score}%</span>
                    </div>
                    <div className="text-xl text-gray-600 dark:text-gray-300">{explanation}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Likely Outcome Popup */}
      {showLikelyOutcomePopup && likelyOutcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 shadow-2xl border border-blue-400 max-w-xl w-full">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Most Likely Outcome</h2>
            <p className="text-lg mb-2">
              <span className="font-semibold text-blue-700">{likelyOutcome.outcome}</span> is now <span className="font-bold">{likelyOutcome.score}% likely</span> according to the conversation so far.
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-6">{likelyOutcome.explanation}</p>
            <div className="flex gap-4 mt-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                onClick={() => {
                  setSimulationEnded(true)
                  setShowLikelyOutcomePopup(false)
                }}
              >
                End Scenario
              </button>
              <button
                className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                onClick={() => setShowLikelyOutcomePopup(false)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add this script to sync heights */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            function syncChatOptionsHeight() {
              var chat = document.getElementById('chat-options-row');
              var options = document.getElementById('options-box');
              if (chat && options) {
                var optionsHeight = options.offsetHeight;
                chat.style.height = optionsHeight + 'px';
              }
            }
            window.addEventListener('resize', syncChatOptionsHeight);
            setTimeout(syncChatOptionsHeight, 100);
            setTimeout(syncChatOptionsHeight, 500);
            setTimeout(syncChatOptionsHeight, 1000);
          `,
        }}
      />
    </div>
  )
}