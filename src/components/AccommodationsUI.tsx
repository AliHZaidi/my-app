'use client'

import { useState } from 'react';
import Link from 'next/link';
import { DisabilityData } from '@/types/accommodations';

interface AccommodationsUIProps {
  disabilities: DisabilityData[];
}

export function AccommodationsUI({ disabilities }: AccommodationsUIProps) {
  const [selectedDisability, setSelectedDisability] = useState<DisabilityData | null>(null);
  const [selectedPresentation, setSelectedPresentation] = useState<string | null>(null);

  const filteredAccommodations = selectedDisability && selectedPresentation
    ? selectedDisability.accommodations_modifications.filter(
        acc => acc.addresses_presentation === selectedPresentation
      )
    : [];

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

      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Find Accommodations</h1>

        {/* Disability Selection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Select a Disability</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {disabilities.map((disability) => (
              <button
                key={disability.disability_name}
                onClick={() => {
                  setSelectedDisability(disability);
                  setSelectedPresentation(null);
                }}
                className={`p-4 rounded-lg border ${
                  selectedDisability?.disability_name === disability.disability_name
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {disability.disability_name}
              </button>
            ))}
          </div>
        </section>

        {/* Display Definition */}
        {selectedDisability && (
          <section className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="font-semibold mb-2">Definition:</h3>
            <p>{selectedDisability.working_definition}</p>
          </section>
        )}

        {/* Presentation Selection */}
        {selectedDisability && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How does it present?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDisability.common_presentations.map((presentation) => (
                <button
                  key={presentation}
                  onClick={() => setSelectedPresentation(presentation)}
                  className={`p-4 rounded-lg border text-left ${
                    selectedPresentation === presentation
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {presentation}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Display Accommodations */}
        {selectedPresentation && filteredAccommodations.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Recommended Accommodations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAccommodations.map((acc) => (
                <div
                  key={acc.name}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2"
                >
                  <h3 className="font-semibold">{acc.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    How it helps: {acc.how_it_helps}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Example: {acc.example}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}