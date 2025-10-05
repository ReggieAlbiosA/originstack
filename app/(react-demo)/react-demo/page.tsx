export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Interactive Learning Platform
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 max-w-4xl">
            Master React
            <span className="block text-zinc-600 dark:text-zinc-400">Fundamentals</span>
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Explore core React concepts through interactive demonstrations.
            Learn hooks, state management, performance optimization, and best practices
            with hands-on examples.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a
              href="#demos"
              className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-200"
            >
              View Demos
            </a>
            <a
              href="#concepts"
              className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 border border-zinc-200 dark:border-zinc-700"
            >
              Learn Concepts
            </a>
          </div>
        </div>
      </section>

      <section id="concepts" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-12 text-center">
          Core Concepts
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Hooks
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Learn useState, useEffect, useMemo, useCallback, and custom hooks.
              Understand when and how to use each hook effectively.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              State Management
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Explore different patterns for managing state in React applications,
              from local state to context and advanced patterns.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Performance
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Optimize your React apps with memoization, lazy loading, and
              efficient rendering strategies to build fast applications.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Component Patterns
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Discover proven patterns for building reusable and maintainable
              components using composition and best practices.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Side Effects
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Master handling side effects, API calls, subscriptions, and
              cleanup in your React components properly.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Advanced Techniques
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Dive into advanced concepts like portals, error boundaries,
              code splitting, and server components.
            </p>
          </article>
        </div>
      </section>

      <section id="demos" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
          Interactive Demonstrations
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
          Hands-on examples that showcase React fundamentals in action.
          Each demo is interactive and includes detailed explanations.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <article className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Hooks</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              useMemo Demo
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              See how useMemo optimizes expensive calculations and prevents
              unnecessary re-renders in your components.
            </p>
            <a href="#" className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
              Try Demo
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </article>

          <article className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <span className="text-xs font-medium text-green-700 dark:text-green-300">State</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              State Management
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              Learn different approaches to managing state, from simple useState
              to complex state machines and patterns.
            </p>
            <a href="#" className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
              Try Demo
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </article>
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Built with Next.js and React. Learn by doing.
          </p>
        </div>
      </footer>
    </div>
  );
}
