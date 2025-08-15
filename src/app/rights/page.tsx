import Link from 'next/link'

export default function Rights() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Your Rights</h1>
      <p className="text-xl mb-8">Coming soon: Learn about your rights in the IEP process</p>
      <Link 
        href="/"
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}