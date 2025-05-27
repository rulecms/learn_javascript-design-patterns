import Link from 'next/link';
import { Pattern } from '@/lib/patterns-data';

interface PatternCardProps {
  pattern: Pattern;
}

export default function PatternCard({ pattern }: PatternCardProps) {
  const getCategoryColor = (category: Pattern['category']) => {
    switch (category) {
      case 'creational':
        return 'bg-green-900/20 text-green-400 border-green-800';
      case 'structural':
        return 'bg-blue-900/20 text-blue-400 border-blue-800';
      case 'behavioral':
        return 'bg-purple-900/20 text-purple-400 border-purple-800';
      default:
        return 'bg-gray-900/20 text-gray-400 border-gray-800';
    }
  };

  const getCategoryLabel = (category: Pattern['category']) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Link href={`/patterns/${pattern.id}`}>
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 h-full card-hover">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{pattern.name}</h3>
          <span className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(pattern.category)}`}>
            {getCategoryLabel(pattern.category)}
          </span>
        </div>
        <p className="text-gray-300 text-sm line-clamp-3">
          {pattern.description}
        </p>
        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
          <span>Learn more</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
} 