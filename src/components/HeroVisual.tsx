import React from 'react';
import { OpenAIIcon, GoogleIcon, MetaIcon, AnthropicIcon } from './BrandIcons';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[220px] lg:h-[260px] flex items-center justify-center select-none overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-400/25 blur-3xl -top-10 -right-10 pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full bg-indigo-400/20 blur-2xl top-10 left-10 pointer-events-none" />

      {/* Orbital Ellipses */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="260"
          cy="150"
          rx="190"
          ry="95"
          transform="rotate(-8 260 150)"
          stroke="#93C5FD"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeOpacity="0.6"
        />
        <ellipse
          cx="260"
          cy="150"
          rx="140"
          ry="65"
          transform="rotate(12 260 150)"
          stroke="#60A5FA"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />
        <path
          d="M100 140 C 180 80, 320 220, 420 140"
          stroke="url(#orbitGradient)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <defs>
          <linearGradient id="orbitGradient" x1="100" y1="140" x2="420" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="1" stopColor="#93C5FD" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Sparkles */}
      <div className="absolute top-6 right-20 text-blue-400 animate-pulse">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-32 text-blue-500/80">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute top-16 left-12 text-indigo-400/70">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      {/* Floating Provider Brand Badges */}
      {/* 1. OpenAI */}
      <div className="absolute top-6 left-28 bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-lg shadow-blue-500/10 border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer">
        <OpenAIIcon className="w-5 h-5 text-slate-900 dark:text-white" />
      </div>

      {/* 2. Google */}
      <div className="absolute top-3 right-48 bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-lg shadow-blue-500/10 border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer">
        <GoogleIcon className="w-5 h-5" />
      </div>

      {/* 3. Meta */}
      <div className="absolute top-10 right-28 bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-lg shadow-blue-500/10 border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer">
        <MetaIcon className="w-5 h-5" />
      </div>

      {/* 4. Anthropic */}
      <div className="absolute bottom-10 left-32 bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-lg shadow-blue-500/10 border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer">
        <AnthropicIcon className="w-5 h-5 text-amber-600" />
      </div>

      {/* 5. Hugging Face / Mistral */}
      <div className="absolute top-14 right-10 bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-lg shadow-blue-500/10 border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer">
        <span className="text-base leading-none">🤗</span>
      </div>

      {/* 6. DeepSeek / Midjourney / AI badge */}
      <div className="absolute bottom-14 right-14 bg-slate-900 text-white p-2.5 rounded-full shadow-lg shadow-blue-500/15 border border-slate-700 hover:scale-110 transition-transform cursor-pointer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="12 2 2 22 22 22" />
        </svg>
      </div>

      {/* 7. Sailboat / Research */}
      <div className="absolute top-20 left-16 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
          <path d="M4 18h16l-3 4H7l-3-4zM6 16L12 2v14M12 4l7 12" />
        </svg>
      </div>

      {/* Centerpiece 3D Processor Chip */}
      <div className="relative z-10 flex flex-col items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-500">
        {/* Glow halo under chip */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur-xl opacity-40 animate-pulse" />

        {/* Outer Circuit Substrate */}
        <div className="relative w-44 h-32 lg:w-48 lg:h-36 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-2.5 shadow-2xl border border-blue-300/40 backdrop-blur-sm">
          {/* Circuit Grid Lines */}
          <div className="absolute inset-2 border border-blue-400/30 rounded-xl pointer-events-none" />
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

          {/* Micro Pins on edges */}
          <div className="absolute -top-1.5 left-6 right-6 flex justify-between px-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="w-1.5 h-1.5 bg-cyan-300 rounded-xs shadow-xs shadow-cyan-200" />
            ))}
          </div>
          <div className="absolute -bottom-1.5 left-6 right-6 flex justify-between px-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="w-1.5 h-1.5 bg-cyan-300 rounded-xs shadow-xs shadow-cyan-200" />
            ))}
          </div>

          {/* Chip Center Die */}
          <div className="w-full h-full bg-gradient-to-b from-blue-500/90 to-blue-700/95 rounded-xl border border-blue-300/50 flex flex-col items-center justify-center p-3 text-white shadow-inner relative overflow-hidden group">
            {/* Shimmer line */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 animate-[shimmer_3s_infinite]" />

            <div className="flex items-center gap-1.5 mb-1">
              <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                <path
                  d="M8 36L14 14C14.5 12 17.5 12 18 14L24 28L30 14C30.5 12 33.5 12 34 14L40 36C40.6 38.2 38.2 40 36.2 38.6L24 30L11.8 38.6C9.8 40 7.4 38.2 8 36Z"
                  fill="#FFFFFF"
                />
              </svg>
              <span className="font-extrabold text-base lg:text-lg tracking-tight drop-shadow-sm">MultiAI</span>
            </div>
            <div className="text-[10px] text-blue-100 font-mono tracking-wider uppercase font-semibold">
              UNIFIED ENGINE
            </div>
            <div className="mt-1 flex items-center gap-1 text-[9px] text-cyan-200 bg-blue-900/60 px-2 py-0.5 rounded-full border border-blue-400/30 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>635 ENDPOINTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
