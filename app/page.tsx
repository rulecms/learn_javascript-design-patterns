import { getPatternsByCategory } from '@/lib/patterns-data';
import PatternCard from '@/components/PatternCard';

export default function Home() {
  const creationalPatterns = getPatternsByCategory('creational');
  const structuralPatterns = getPatternsByCategory('structural');
  const behavioralPatterns = getPatternsByCategory('behavioral');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-6">
          JavaScript Design Patterns
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Learn essential design patterns that will make you a better JavaScript developer. 
          Explore interactive examples and understand when and how to apply each pattern.
        </p>
      </div>

      {/* Creational Patterns */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">Creational Patterns</h2>
          <p className="text-gray-400 text-lg">
            Patterns that deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creationalPatterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </section>

      {/* Structural Patterns */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">Structural Patterns</h2>
          <p className="text-gray-400 text-lg">
            Patterns that deal with object composition and typically identify simple ways to realize relationships between different objects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {structuralPatterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </section>

      {/* Behavioral Patterns */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">Behavioral Patterns</h2>
          <p className="text-gray-400 text-lg">
            Patterns that focus on communication between objects and the assignment of responsibilities between objects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {behavioralPatterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </section>

      {/* Why Learn Design Patterns */}
      <section className="mt-20 bg-gray-800/30 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Why Learn Design Patterns?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Better Architecture</h3>
            <p className="text-gray-400">
              Design patterns provide proven solutions to common problems, helping you build more maintainable and scalable applications.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Improved Communication</h3>
            <p className="text-gray-400">
              Patterns provide a common vocabulary for developers, making it easier to discuss and share architectural decisions.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Problem-Solving Skills</h3>
            <p className="text-gray-400">
              Understanding patterns helps you recognize recurring problems and apply appropriate solutions more effectively.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
