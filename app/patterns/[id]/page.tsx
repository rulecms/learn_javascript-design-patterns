import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPatternById, getPatternsByCategory, Pattern } from '@/lib/patterns-data';
import CodeBlock from '@/components/CodeBlock';

export async function generateStaticParams() {
  const patterns = [
    'singleton', 'factory', 'builder', 'prototype',
    'adapter', 'decorator', 'facade', 'proxy',
    'observer', 'mediator', 'strategy', 'command'
  ];
  
  return patterns.map((id) => ({
    id: id,
  }));
}

export default async function PatternPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const pattern = getPatternById(id);

  if (!pattern) {
    notFound();
  }

  const relatedPatterns = getPatternsByCategory(pattern.category).filter(
    p => p.id !== pattern.id
  );

  const getCategoryColor = (category: Pattern['category']) => {
    switch (category) {
      case 'creational':
        return 'text-green-400';
      case 'structural':
        return 'text-blue-400';
      case 'behavioral':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getCategoryLabel = (category: Pattern['category']) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className={getCategoryColor(pattern.category)}>
          {getCategoryLabel(pattern.category)} Patterns
        </span>
        <span>/</span>
        <span className="text-white">{pattern.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {pattern.name} Pattern
          </h1>
          <span className={`text-sm px-4 py-2 rounded-full border ${
            pattern.category === 'creational' ? 'bg-green-900/20 text-green-400 border-green-800' :
            pattern.category === 'structural' ? 'bg-blue-900/20 text-blue-400 border-blue-800' :
            'bg-purple-900/20 text-purple-400 border-purple-800'
          }`}>
            {getCategoryLabel(pattern.category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">What is it?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {pattern.description}
            </p>
          </section>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Why use it?</h2>
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-300 leading-relaxed">
                {pattern.benefits}
              </p>
            </div>
          </section>

          {/* Code Example */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Code Example</h2>
            <CodeBlock code={pattern.codeExample} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Quick Facts */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Quick Facts</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-gray-500 text-sm">Category</dt>
                  <dd className={`font-medium ${getCategoryColor(pattern.category)}`}>
                    {getCategoryLabel(pattern.category)}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-sm">Common Use Cases</dt>
                  <dd className="text-gray-300 text-sm">
                    {pattern.category === 'creational' && 'Object creation, instance management'}
                    {pattern.category === 'structural' && 'Object composition, interface adaptation'}
                    {pattern.category === 'behavioral' && 'Communication patterns, algorithms'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Related Patterns */}
            {relatedPatterns.length > 0 && (
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                  Other {getCategoryLabel(pattern.category)} Patterns
                </h3>
                <div className="space-y-3">
                  {relatedPatterns.map((relatedPattern) => (
                    <Link
                      key={relatedPattern.id}
                      href={`/patterns/${relatedPattern.id}`}
                      className="block text-gray-300 hover:text-white transition-colors"
                    >
                      {relatedPattern.name} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Patterns
        </Link>
      </div>
    </div>
  );
} 