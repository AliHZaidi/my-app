'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { simpleScenarios } from '@/data/SimpleScenarios' // Create this file with your static scenario data

function SimpleScenarioPage() {
  const searchParams = useSearchParams()
  const scenarioId = searchParams.get('id')
  const scenario = simpleScenarios[scenarioId || '']

  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Scenario not found</h2>
          <p className="text-lg">Please select a valid scenario from the list.</p>
        </div>
      </div>
    )
  }

  const currentStep = scenario.steps[step]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">{scenario.title}</h1>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">{scenario.background}</p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{currentStep.question}</h2>
          <div className="flex flex-col gap-4">
            {currentStep.answers.map((answer, idx) => (
              <button
                key={idx}
                className={`px-6 py-4 rounded-lg border-2 text-lg font-medium transition-colors ${
                  selected === idx
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800'
                }`}
                onClick={() => {
                  setSelected(idx)
                  setShowFeedback(true)
                }}
                disabled={showFeedback}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
        {showFeedback && (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 text-lg text-blue-900 dark:text-blue-100">
            <div>
              <span className="font-semibold text-blue-700 dark:text-blue-200">Positive:</span> <span className="font-medium">{currentStep.answers[selected!].feedback.positive}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Consider:</span> <span className="font-medium">{currentStep.answers[selected!].feedback.negative}</span>
            </div>
          </div>
        )}
        <div className="flex justify-end mt-8">
          {showFeedback && step < scenario.steps.length - 1 && (
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                setStep(step + 1)
                setSelected(null)
                setShowFeedback(false)
              }}
            >
              Next
            </button>
          )}
          {showFeedback && step === scenario.steps.length - 1 && (
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => window.location.href = '/scenarios'}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SimpleScenarioPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SimpleScenarioPage />
    </Suspense>
  )
}