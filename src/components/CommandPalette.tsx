import React, { useState, useEffect } from 'react';
import { Search, X, Box, Layers, Code2, BookOpen, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { ALL_MODELS, PROVIDERS_LIST } from '../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  onSelectModel: (modelId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectModel,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredModels = ALL_MODELS.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.provider.toLowerCase().includes(query.toLowerCase()) ||
      m.id.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredProviders = PROVIDERS_LIST.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-blue-500 shrink-0" />
          <input
            type="text"
            placeholder="Type a model, provider, or page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] text-slate-400 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-sm">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3">
          {/* Quick Page Jumps */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 px-2 py-1 uppercase tracking-wider">
              Navigation
            </div>
            <div className="space-y-0.5">
              {[
                { id: 'playground', label: 'API Playground - Interactive multi-model studio', icon: Code2 },
                { id: 'models', label: 'Models Directory - 635 model endpoints', icon: Box },
                { id: 'providers', label: 'Providers - 34 supported LLM backends', icon: Layers },
                { id: 'docs', label: 'Documentation - Unified /v1 API integration', icon: BookOpen },
                { id: 'billing', label: 'Billing & Plans - Manage token limits', icon: CreditCard },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id as PageId);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matching Models */}
          {filteredModels.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 px-2 py-1 uppercase tracking-wider">
                Models ({filteredModels.length})
              </div>
              <div className="space-y-0.5">
                {filteredModels.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onSelectModel(m.id);
                      onNavigate('playground');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Box className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-slate-900 dark:text-white">{m.name}</span>
                      <span className="text-slate-400 dark:text-slate-500">· {m.provider}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      Free · {m.contextWindow}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Providers */}
          {filteredProviders.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 px-2 py-1 uppercase tracking-wider">
                Providers ({filteredProviders.length})
              </div>
              <div className="space-y-0.5">
                {filteredProviders.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate('providers');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-indigo-500" />
                      <span className="font-semibold text-slate-900 dark:text-white">{p.name}</span>
                      <span className="text-slate-400">· {p.modelsCount} models</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{p.uptime} uptime</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
            <Sparkles className="w-3 h-3" />
            <span>MultiAI Unified Index</span>
          </div>
        </div>
      </div>
    </div>
  );
};
