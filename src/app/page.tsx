import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeToggle />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <main className="w-full max-w-3xl mx-auto flex flex-col gap-[32px] items-center text-center py-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            IEP Meeting Prep Simulator
          </h1>
          <p className="text-2xl mb-10">
            Empowering parents to confidently participate in IEP meetings
          </p>

          <div className="w-full mt-10 flex justify-center">
            <Link
              className="flex flex-col items-center p-8 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors w-full max-w-xl"
              href="/scenarios"
            >
              <h2 className="text-3xl font-semibold mb-4">
                Rehearse Meeting Situations
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Practice common meeting scenarios and build confidence
              </p>
            </Link>
          </div>
        </main>

        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 my-12">
          <div className="space-y-6 text-xl text-gray-600 dark:text-gray-400">
            <p>
              This simulator is for practice purposes only and does not provide legal advice. Always consult with a special education 
              advocate or attorney for specific guidance related to IEPs.
            </p>
            <p>
              Currently, this tool focuses on IEP meeting processes. We acknowledge that the special education process 
              includes many interactions, such as IFSPs, Transition planning, Section 504 plans, and more. We plan on 
              expanding this tool in the future to better accommodate the needs of parents in these processes.
            </p>
          </div>
        </div>

        <footer className="w-full text-center text-xl text-gray-600 dark:text-gray-400 py-6">
          <p>Supporting parents through the IEP process</p>
        </footer>
      </div>
    </div>
  )
}
