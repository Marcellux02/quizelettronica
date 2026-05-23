import React from 'react';

const QuizSelection = ({ onSelect }) => {
  return (
    <div className="glass-card rounded-3xl shadow-2xl p-8 sm:p-12 text-center animate-fade-in w-full max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
        Scegli il Quiz
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Electronics Option */}
        <button 
          onClick={() => onSelect('electronics')}
          className="group relative overflow-hidden rounded-2xl bg-white/50 hover:bg-white/80 transition-all duration-300 p-6 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-indigo-500/20"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
              Elettronica
            </h3>
            <p className="text-gray-600 mb-4">
              Circuiti, componenti e teoria dei semiconduttori.
            </p>
            
            <span className="inline-flex items-center text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
              Seleziona <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </button>

        {/* Cognition Option */}
        <button 
          onClick={() => onSelect('cognition')}
          className="group relative overflow-hidden rounded-2xl bg-white/50 hover:bg-white/80 transition-all duration-300 p-6 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-pink-500/20"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
              Cognition & Computation
            </h3>
            <p className="text-gray-600 mb-4">
              Neuroscienze, Intelligenza Artificiale e processi cognitivi.
            </p>
            
            <span className="inline-flex items-center text-sm font-semibold text-pink-600 group-hover:translate-x-1 transition-transform">
              Seleziona <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuizSelection;
