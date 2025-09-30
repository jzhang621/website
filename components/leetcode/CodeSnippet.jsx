import React from 'react';

const CodeSnippet = ({ code, highlightedLines = [] }) => {
  const lines = code.split('\n');

  return (
    <div className="bg-slate-900 rounded-lg shadow-lg p-4 font-mono text-sm overflow-x-auto">
      <pre className="m-0">
        {lines.map((line, idx) => {
          const lineNumber = idx + 1;
          const isHighlighted = highlightedLines.includes(lineNumber);

          return (
            <div
              key={idx}
              className={`transition-colors duration-300 ${
                isHighlighted ? 'bg-yellow-500/20' : ''
              }`}
            >
              <span className="inline-block w-8 text-gray-500 select-none text-right mr-4">
                {lineNumber}
              </span>
              <span className={isHighlighted ? 'text-yellow-200' : 'text-gray-300'}>
                {line}
              </span>
            </div>
          );
        })}
      </pre>
    </div>
  );
};

export default CodeSnippet;
