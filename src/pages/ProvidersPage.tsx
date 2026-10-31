import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Zap,
  Key,
  ExternalLink,
  Search,
  Sparkles,
} from 'lucide-react';
import { PROVIDERS_LIST } from '../data/mockData';
import { PageId } from '../types';
import { ProviderBrandIcon } from '../components/BrandIcons';

interface ProvidersPageProps {
  onNavigate: (page: PageId) => void;
  onOpenApiKeys: () => void;
}

export const ProvidersPage: React.FC<ProvidersPageProps> = ({ onNavigate, onOpenApiKeys }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [fallbackEnabled, setFallbackEnabled] = useState(true);

  const categories = ['All', 'Major Frontier', 'Open Weights', 'High-Speed Inference', 'Specialized Reasoning'];

  const filteredProviders = PROVIDERS_LIST.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>PROVIDER NETWORK</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            34 Free LLM Providers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Unified authentication, intelligent load balancing, and automated cross-provider failover.
          </p>
        </div>

        {/* Global Fallback Toggle */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Smart Failover Router</span>
            </div>
            <div className="text-[11px] text-slate-400">Zero downtime on 429 rate-limits</div>
          </div>
          <button
            onClick={() => setFallbackEnabled(!fallbackEnabled)}
            className={`w-11 h-6 rounded-full p-1 transition-colors ${
              fallbackEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                fallbackEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Filter and Categories */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter providers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                    <ProviderBrandIcon type={provider.iconType} size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{provider.name}</h3>
                    <div className="text-[11px] text-slate-400">{provider.category}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{provider.uptime}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {provider.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center mb-4">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Models</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    {provider.modelsCount}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Avg Latency</div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {provider.avgLatency}ms
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Free Quota</div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {provider.freeTierAllowance.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Footer Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-medium">
                BYOK Supported · Priority #{provider.priority}
              </span>
              <button
                onClick={() => onNavigate('models')}
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
              >
                <span>Browse</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
