
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <section className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="hero-heading">
        <header className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Modern Web Development
            </span>
          </div>

          <h1 id="hero-heading" className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-gray-100 max-w-4xl">
            Next.js
            <span className="block text-blue-600 dark:text-blue-400">Application</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            A modern Next.js application showcasing beautiful UI, responsive design,
            and best practices for building scalable web applications.
          </p>

          <nav className="flex flex-wrap gap-4 justify-center pt-4" aria-label="Main navigation">
            <a
              href="#features"
              className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              aria-label="Navigate to features section"
            >
              Explore Features
            </a>
            <a
              href="#getting-started"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
              aria-label="Navigate to getting started section"
            >
              Get Started
            </a>
          </nav>
        </header>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="features-heading">
        <header className="mb-12 text-center">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Key Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built with modern technologies and best practices for optimal performance and developer experience.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Next.js application features">
          <article className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Server-Side Rendering
              </h3>
            </header>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Built-in SSR capabilities for improved SEO and faster initial page loads.
              Optimized for both static and dynamic content generation.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                API Routes
              </h3>
            </header>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Full-stack capabilities with built-in API routes. Create backend functionality
              without separate server setup.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Performance Optimized
              </h3>
            </header>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Automatic code splitting, image optimization, and built-in performance
              monitoring for optimal user experience.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                TypeScript Support
              </h3>
            </header>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Built-in TypeScript support with excellent developer experience
              and type safety throughout the application.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Responsive Design
              </h3>
            </header>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Mobile-first responsive design that works seamlessly across all
              devices and screen sizes.
            </p>
          </article>

          <article className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Modern UI Components
              </h3>
            </header>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Beautiful, accessible UI components built with modern design principles
              and best practices.
            </p>
          </article>
        </div>
      </section>

      <section id="getting-started" className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="getting-started-heading">
        <header className="mb-12 text-center">
          <h2 id="getting-started-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Getting Started
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to start building? Follow these simple steps to get your Next.js application up and running.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6" role="list" aria-label="Getting started steps">
          <article className="p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-lg" role="listitem">
            <header className="mb-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Step 1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Installation
              </h3>
            </header>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Install Next.js and set up your development environment with all the necessary dependencies.
            </p>
            <footer>
              <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                npx create-next-app@latest
              </code>
            </footer>
          </article>

          <article className="p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-lg" role="listitem">
            <header className="mb-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Step 2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Development
              </h3>
            </header>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Start the development server and begin building your application with hot reload.
            </p>
            <footer>
              <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                npm run dev
              </code>
            </footer>
          </article>
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Built with Next.js and modern web technologies. Ready for production.
          </p>
        </div>
      </footer>
    </div>
  );
}
