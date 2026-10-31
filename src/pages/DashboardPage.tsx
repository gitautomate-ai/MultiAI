import React, { useState } from 'react';
import {
  Layers,
  Box,
  Zap,
  Plug,
  Flame,
  ArrowRight,
  BarChart2,
  Play,
  FileText,
  Tag,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { PageId } from '../types';
import { POPULAR_MODELS, USAGE_30_DAYS } from '../data/mockData';
import { HeroVisual } from '../components/HeroVisual';
import { ProviderBrandIcon } from '../components/BrandIcons';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  onSelectModel: (modelId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectModel }) => {
  const [timeRange, setTimeRange] = useState<'30d' | '7d' | '90d'>('30d');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Sparkline data helpers
  const sparklineUp = "M 0 25 Q 20 15, 40 22 T 80 12 T 120 5";
  const sparklineFlat = "M 0 15 L 40 15 L 80 15 L 120 15";
  const sparklineUp2 = "M 0 22 Q 30 24, 60 14 T 120 6";

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Main Hero Banner matching screenshot */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-blue-100/40 dark:from-slate-800/90 dark:via-blue-950/30 dark:to-slate-800/60 border border-blue-100/90 dark:border-blue-900/40 p-6 sm:p-8 lg:p-10 shadow-2xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              One API. 34 Free LLM Providers.{' '}
              <span className="text-blue-600 dark:text-blue-400 block sm:inline">
                635 Model Endpoints.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              The ultimate multi-model platform for developers. Build, experiment, and scale with 7.4
              billion tokens per month - completely free to get started.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('playground')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm shadow-blue-500/25 flex items-center gap-2"
              >
                <span>Try in Playground</span>
                <span className="text-sm">→</span>
              </button>
              <button
                onClick={() => onNavigate('docs')}
                className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-2xs"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>View Documentation</span>
              </button>
            </div>
          </div>

          {/* Hero Right Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* 2. Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 7.4B Tokens/Month */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              ↑ 12%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
              7.4B
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Tokens / Month
            </div>
          </div>
          {/* Blue Sparkline */}
          <div className="mt-3 h-8 w-full">
            <svg viewBox="0 0 120 30" className="w-full h-full overflow-visible">
              <path d={sparklineUp} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: 34 Free LLM Providers */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              ↑ 0%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
              34
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Free LLM Providers
            </div>
          </div>
          {/* Flat Sparkline */}
          <div className="mt-3 h-8 w-full">
            <svg viewBox="0 0 120 30" className="w-full h-full overflow-visible">
              <path d={sparklineFlat} fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: 635 Model Endpoints */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Plug className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              ↑ 8%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
              635
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Model Endpoints
            </div>
          </div>
          {/* Blue Sparkline */}
          <div className="mt-3 h-8 w-full">
            <svg viewBox="0 0 120 30" className="w-full h-full overflow-visible">
              <path d={sparklineUp2} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: /v1 Unified Endpoint */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              ✓ Active
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              /v1
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Unified Endpoint
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>OpenAI compatible schema</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom 3-Card Grid matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Card 1: Popular Models (Col span 5) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Popular Models</h3>
              </div>
              <button
                onClick={() => onNavigate('models')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 group"
              >
                <span>View All</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>

            {/* Model List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-1">
              {POPULAR_MODELS.map((model) => (
                <div
                  key={model.id}
                  onClick={() => {
                    onSelectModel(model.id);
                    onNavigate('playground');
                  }}
                  className="py-3 px-1.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center p-2 shrink-0 ${model.iconBg}`}
                    >
                      <ProviderBrandIcon type={model.iconType} size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {model.name}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 truncate">
                        {model.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50">
                      Free
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{model.monthlyTokens}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Usage Overview (Col span 4) */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4.5 h-4.5 text-blue-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Usage Overview</h3>
              </div>
              <div className="relative">
                <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <span>Last 30 Days</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Metric Head */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                4.8B
              </span>
              <span className="text-xs text-slate-500 font-medium">Tokens Used</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full ml-auto">
                ↑ 18%
              </span>
            </div>

            {/* Vertical Bar Chart matching screenshot */}
            <div className="mt-6">
              <div className="h-32 flex items-end gap-1.5 pt-4 pb-1 relative">
                {USAGE_30_DAYS.map((day, idx) => {
                  const maxTokens = 250;
                  const heightPercent = Math.max(15, Math.min(100, (day.tokensM / maxTokens) * 100));
                  const isHovered = hoveredBarIndex === idx;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredBarIndex(idx)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                      className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative"
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-10 z-20 px-2 py-1 rounded-md bg-slate-900 text-white text-[10px] whitespace-nowrap shadow-md pointer-events-none font-mono">
                          {day.date}: {day.tokensM}M tokens
                        </div>
                      )}
                      {/* Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-sm transition-all duration-150 ${
                          isHovered
                            ? 'bg-blue-600'
                            : 'bg-blue-400/80 group-hover:bg-blue-500 dark:bg-blue-500/70'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Date Ticks matching screenshot */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Aug 20</span>
                <span>Aug 27</span>
                <span>Sep 03</span>
                <span>Sep 10</span>
                <span>Sep 19</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Quick Actions (Col span 3) */}
        <div className="lg:col-span-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <Zap className="w-4.5 h-4.5 text-blue-600 fill-blue-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Quick Actions</h3>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Action 1: Open Playground */}
              <button
                onClick={() => onNavigate('playground')}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Open Playground</span>
              </button>

              {/* Action 2: Browse Models */}
              <button
                onClick={() => onNavigate('models')}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <Box className="w-3.5 h-3.5 text-slate-500" />
                <span>Browse Models</span>
              </button>

              {/* Action 3: Check Pricing */}
              <button
                onClick={() => onNavigate('billing')}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                <span>Check Pricing</span>
              </button>

              {/* Action 4: View API Docs */}
              <button
                onClick={() => onNavigate('docs')}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>View API Docs</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Latency SLA</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              p50: 190ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
