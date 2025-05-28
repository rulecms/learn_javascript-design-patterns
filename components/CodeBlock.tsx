'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Escape HTML entities (server-safe version)
  const escapeHtml = (text: string) => {
    const htmlEntities: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    
    return text.replace(/[&<>"'/]/g, (match) => htmlEntities[match]);
  };

  // Simple syntax highlighting for TypeScript/JavaScript
  const highlightCode = (code: string) => {
    // First, escape HTML to prevent XSS and parsing issues
    let highlighted = escapeHtml(code);
    
    // Apply syntax highlighting with non-overlapping patterns
    // Order matters: strings and comments first to prevent highlighting inside them
    
    // Comments (single line)
    highlighted = highlighted.replace(
      /(\/\/.*$)/gm,
      '<span class="text-gray-500 italic">$1</span>'
    );
    
    // Comments (multi-line)
    highlighted = highlighted.replace(
      /(\/\*[\s\S]*?\*\/)/g,
      '<span class="text-gray-500 italic">$1</span>'
    );
    
    // Strings (double quotes, single quotes, and template literals)
    highlighted = highlighted.replace(
      /(&quot;[^&]*&quot;|&#x27;[^&]*&#x27;|`[^`]*`)/g,
      '<span class="text-green-400">$1</span>'
    );
    
    // Keywords (using word boundaries to prevent partial matches)
    const keywords = [
      'class', 'constructor', 'extends', 'implements', 'interface', 'function',
      'const', 'let', 'var', 'if', 'else', 'return', 'new', 'this', 'super',
      'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw',
      'public', 'private', 'protected', 'static', 'readonly', 'type', 'namespace',
      'enum', 'abstract', 'as', 'break', 'case', 'continue', 'debugger', 'default',
      'delete', 'do', 'finally', 'for', 'in', 'instanceof', 'switch', 'typeof',
      'void', 'while', 'with', 'yield'
    ];
    
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b(?![^<]*>)`, 'g');
    highlighted = highlighted.replace(keywordRegex, '<span class="text-purple-400">$1</span>');
    
    // Types and built-in objects
    const types = [
      'string', 'number', 'boolean', 'any', 'void', 'never', 'unknown', 'object',
      'symbol', 'null', 'undefined', 'true', 'false', 'Array', 'Object', 'Promise',
      'Map', 'Set', 'Date', 'RegExp', 'Error', 'JSON', 'Math', 'console'
    ];
    
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b(?![^<]*>)`, 'g');
    highlighted = highlighted.replace(typeRegex, '<span class="text-cyan-400">$1</span>');
    
    // Numbers
    highlighted = highlighted.replace(
      /\b(\d+)\b(?![^<]*>)/g,
      '<span class="text-orange-400">$1</span>'
    );
    
    // Function names (followed by parenthesis)
    highlighted = highlighted.replace(
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\((?![^<]*>)/g,
      '<span class="text-yellow-400">$1</span>('
    );
    
    // Class names, interfaces, types (PascalCase)
    highlighted = highlighted.replace(
      /\b([A-Z][a-zA-Z0-9_$]*)\b(?![^<]*>)/g,
      '<span class="text-blue-400">$1</span>'
    );
    
    // Decorators
    highlighted = highlighted.replace(
      /(@[a-zA-Z_$][a-zA-Z0-9_$]*)(?![^<]*>)/g,
      '<span class="text-pink-400">$1</span>'
    );
    
    return highlighted;
  };

  const highlightedCode = highlightCode(code);

  return (
    <div className="relative group">
      {/* Header */}
      <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
          </div>
          <span className="text-gray-400 text-sm font-medium ml-2">{language}</span>
        </div>
        
        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-all
                   bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white
                   border border-gray-600 hover:border-gray-500"
          title="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <div className="relative overflow-hidden rounded-b-lg">
        {/* Gradient background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>
        
        {/* Line numbers gutter */}
        <div className="relative flex">
          <div className="select-none pr-4 py-6 text-right bg-black/20 border-r border-gray-700/50">
            {code.split('\n').map((_, i) => (
              <div key={i} className="text-gray-600 text-sm font-mono leading-6 px-3">
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Code area */}
          <pre className="flex-1 py-6 px-6 overflow-x-auto text-sm leading-6">
            <code 
              className="font-mono text-gray-100"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
    </div>
  );
} 