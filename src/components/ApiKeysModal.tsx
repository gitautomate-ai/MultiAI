import React, { useState } from 'react';
import { X, Copy, Check, Key, Shield, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface ApiKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeysModal: React.FC<ApiKeysModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [keys, setKeys] = useState([
    {
      id: 'key-1',
      name: 'Default Production Key',
      key: 'sk_live_multiai_88a9f4c3b2e109d74e5f21',
      created: 'Oct 15, 2026',
      lastUsed: 'Just now',
    },
    {
      id: 'key-2',
      name: 'Staging / CI Test Key',
      key: 'sk_test_multiai_11c3e7f9a2b450d18e9c02',
      created: 'Oct 22, 2026',
      lastUsed: '2 days ago',
    },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const randomHex = Math.random().toString(16).substring(2, 18);
    const newEntry = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      key: `sk_live_multiai_${randomHex}`,
      created: 'Just now',
      lastUsed: 'Never',
    };
    setKeys([newEntry, ...keys]);
    setNewKeyName('');
    setShowCreate(false);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">API Keys & Authentication</h3>
              <p className="text-xs text-slate-500">
                Use your MultiAI API key to access all 34 providers through a single header.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Authorization Header Code Snippet */}
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs">
            <div className="text-slate-400 text-[11px] mb-1.5 flex items-center justify-between font-sans">
              <span>HTTP Request Header</span>
              <span className="text-emerald-400 font-mono">200 OK</span>
            </div>
            <code>Authorization: Bearer sk_live_multiai_...</code>
          </div>

          {/* Key List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Active Secret Keys ({keys.length})
              </span>
              <button
                onClick={() => setShowCreate(!showCreate)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Key</span>
              </button>
            </div>

            {showCreate && (
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Key description (e.g. Production Cluster A)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
                <button
                  onClick={handleCreateKey}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shrink-0"
                >
                  Generate Key
                </button>
              </div>
            )}

            <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-800">
              {keys.map((k) => (
                <div key={k.id} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">{k.name}</div>
                    <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {revealed ? k.key : `${k.key.substring(0, 16)}••••••••••••`}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Created {k.created} · Last used {k.lastUsed}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setRevealed(!revealed)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      title={revealed ? 'Hide secret' : 'Reveal secret'}
                    >
                      {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(k.key)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                      title="Copy Key"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    {keys.length > 1 && (
                      <button
                        onClick={() => handleDeleteKey(k.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
                        title="Delete Key"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
