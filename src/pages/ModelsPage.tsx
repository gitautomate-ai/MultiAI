import React, { useState } from 'react';
import {
  Search,
  Box,
  Copy,
  Check,
  Play,
  SlidersHorizontal,
  Flame,
  Zap,
  Cpu,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { ALL_MODELS } from '../data/mockData';
import { ModelItem, PageId } from '../types';
import { ProviderBrandIcon } from '../components/BrandIcons';

interface ModelsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectModel: (modelId: string) => void;
}

export const ModelsPage: React.FC<ModelsPageProps> = ({ onNavigate, onSelectModel }) => {
  const [search, setSearch] = useState('');
  const [selectedModality, setSelectedModality] = useState<string>('All');
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const modalities = ['All', 'Chat', 'Reasoning', 'Code', 'Vision', 'Audio'];
  const providers = ['All', 'OpenAI', 'Anthropic', 'Google', 'Meta', 'DeepSeek', 'Mistral AI', 'Cohere'];

  const filteredModels = ALL_MODELS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase());

    const matchesModality =
      selectedModality === 'All' || m.modalities.includes(selectedModality as any);

    const matchesProvider =
      selectedProvider === 'All' || m.provider.toLowerCase() === selectedProvider.toLowerCase();

    return matchesSearch && matchesModality && matchesProvider;
  });

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`multiai/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <Box className="w-4 h-4" />
            <span>UNIFIED MODEL REGISTRY</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            635 Model Endpoints
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Zero-configuration access to every frontier and open-weights model through a single endpoint.
          </p>
        </div>

        {/* Global Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
            <span className="text-slate-400">Total Models: </span>
            <span className="font-bold text-slate-900 dark:text-white">635</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
            <span className="text-slate-400">Avg Latency: </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">210ms</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search 635 models by name, provider, or architecture..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 shadow-2xs"
            />
          </div>

          {/* Provider Select */}
          <div className="md:col-span-6 flex items-center gap-2">
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-hidden shadow-2xs"
            >
              {providers.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'All Providers (34)' : p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Modality Segmented Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          {modalities.map((mod) => (
            <button
              key={mod}
              onClick={() => setSelectedModality(mod)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedModality === mod
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mod}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-auto mr-3 hidden sm:inline">
            Showing {filteredModels.length} models
          </span>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            onClick={() => {
              onSelectModel(model.id);
              onNavigate('playground');
            }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/60 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Top Row: Provider & Free Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center p-1.5 ${model.iconBg}`}>
                    <ProviderBrandIcon type={model.iconType} size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {model.name}
                    </h3>
                    <div className="text-[11px] text-slate-400">{model.provider}</div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 shrink-0">
                  Free Tier
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {model.description}
              </p>

              {/* Metric specs */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center mb-4">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Context</div>
                  <div className="text-xs font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    {model.contextWindow}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Speed</div>
                  <div className="text-xs font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    {model.throughput} t/s
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Latency</div>
                  <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {model.latencyMs}ms
                  </div>
                </div>
              </div>

              {/* Modalities Chips */}
              <div className="flex flex-wrap gap-1 mb-4">
                {model.modalities.map((m) => (
                  <span
                    key={m}
                    className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={(e) => handleCopyId(model.id, e)}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 font-mono"
                title="Copy unified endpoint ID"
              >
                {copiedId === model.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{copiedId === model.id ? 'Copied' : `multiai/${model.id}`}</span>
              </button>

              <button
                onClick={() => {
                  onSelectModel(model.id);
                  onNavigate('playground');
                }}
                className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-colors"
                title="Open in Playground"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
