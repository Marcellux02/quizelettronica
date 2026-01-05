import React from 'react';

const Welcome = ({ onStart }) => {
  return (
    <div className="glass-card rounded-3xl shadow-2xl p-8 sm:p-12 text-center animate-fade-in">
      {/* Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
        Quiz di Elettronica
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
        Metti alla prova le tue conoscenze con domande su circuiti, componenti e teoria elettronica
      </p>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
          <div className="text-2xl font-bold text-indigo-600">10</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Domande</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-600">∞</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Tentativi</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
          <div className="text-2xl font-bold text-pink-600">AI</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Spiegazioni</div>
        </div>
      </div>

      {/* Start Button */}
      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 btn-glow overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="relative flex items-center gap-2">
          Inizia il Quiz
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Welcome;