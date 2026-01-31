"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { Icon } from "@/components/ui/Icon";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { step, language, setLanguage } = useStore();

  const languages = [
    { id: 'en', label: 'ENG' },
    { id: 'uk', label: 'UA' },
    { id: 'ru', label: 'RU' }
  ] as const;

  return (
    <div className="min-h-screen bg-[#FDFDFF] selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
      {/* Dynamic Header */}
      <header className={`fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 transition-all duration-500 ${step >= 0 ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm' : ''}`}>
        <div className="flex items-center gap-3 font-black text-2xl tracking-tighter">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Icon name="bot" size={24} strokeWidth={2.5} />
          </div>
          <span className="text-gray-900 hidden sm:inline">Agents<span className="text-indigo-600">Builder</span></span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`px-3 py-1.5 rounded-xl font-black text-[10px] tracking-widest transition-all ${language === lang.id
                  ? 'bg-white text-indigo-600 shadow-sm border border-gray-100'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {step >= 0 && step < 20 && (
            <div className="hidden md:flex items-center gap-6 ml-4">
              <div className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest">
                <Icon name="shield" size={16} /> Secure Context
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="text-sm font-black text-indigo-600 font-mono">v1.3.2</div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.div key="welcome" exit={{ opacity: 0, y: -20 }}>
              <WelcomeScreen />
            </motion.div>
          )}
          {step >= 0 && step < 20 && (
            <motion.div key="questions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
              <QuestionCard />
            </motion.div>
          )}
          {step === 20 && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingScreen />
            </motion.div>
          )}
          {step === 21 && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <ResultScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-0 left-0 w-full p-8 flex justify-center items-center gap-10 pointer-events-none opacity-50">
        <div className="flex items-center gap-2 text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
          <Icon name="shield" size={14} /> GRC Validated
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
          <Icon name="zap" size={14} /> Real-time Generation
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
          <Icon name="github" size={14} /> MIT Licensed
        </div>
      </footer>
    </div>
  );
}
