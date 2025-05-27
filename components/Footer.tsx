export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-400 text-center">
            Created with ❤️ by the RuleCMS Team
          </p>
          <a
            href="https://rulecms.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            rulecms.com
          </a>
          <p className="text-gray-500 text-sm text-center max-w-2xl">
            Learn JavaScript Design Patterns through interactive examples and clear explanations. 
            Master the essential patterns that will make you a better developer.
          </p>
        </div>
      </div>
    </footer>
  );
} 