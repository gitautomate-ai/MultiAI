import React, { useState } from 'react';
import { BookOpen, Copy, Check, Terminal, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

export const DocsPage: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const quickstartTs = `npm install openai

# MultiAI is 100% compatible with the official OpenAI SDK!
# Simply change the baseURL to https://api.multiai.dev/v1`;

  const requestExample = `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.multiai.dev/v1',
  apiKey: process.env.MULTIAI_API_KEY, // 'sk_live_multiai_...'
});

// Route to any of 635 models across 34 providers with zero changes:
const response = await client.chat.completions.create({
  model: 'multiai/claude-3-7-sonnet', // or 'multiai/gpt-4.1', 'multiai/deepseek-r1'
  messages: [
    { role: 'user', content: 'Explain quantum entanglement in two sentences.' }
  ],
  // Optional: Automatic fallback list if the primary provider is busy
  extra_body: {
    fallbacks: ['multiai/gemini-2.5-pro', 'multiai/llama-3.1-70b']
  }
});

console.log(response.choices[0].message.content);`;

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>DEVELOPER DOCUMENTATION</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Unified API Reference
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          One endpoint, one key, and complete interoperability with the OpenAI client ecosystem.
        </p>
      </div>

      {/* Section 1: Quickstart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>01. Quickstart (Under 60 Seconds)</span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Because MultiAI conforms strictly to the OpenAI REST specification, you can reuse your existing
          codebase, libraries, and agent frameworks (LangChain, LlamaIndex, Vercel AI SDK, AutoGen)
          without installing vendor-specific packages.
        </p>

        <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 relative">
          <button
            onClick={() => copyCode(quickstartTs, 'qs')}
            className="absolute top-3 right-3 text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
          >
            {copiedSection === 'qs' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSection === 'qs' ? 'Copied' : 'Copy'}</span>
          </button>
          <pre>{quickstartTs}</pre>
        </div>
      </div>

      {/* Section 2: Code Integration */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>02. Universal Chat Completions</span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Send chat requests with native streaming, tool calls, and automated cross-provider fallbacks.
        </p>

        <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 relative overflow-x-auto">
          <button
            onClick={() => copyCode(requestExample, 'code')}
            className="absolute top-3 right-3 text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
          >
            {copiedSection === 'code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSection === 'code' ? 'Copied' : 'Copy'}</span>
          </button>
          <pre>{requestExample}</pre>
        </div>
      </div>

      {/* Section 3: Smart Fallback Architecture */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>03. Zero-Downtime Fallback Architecture</span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          If an upstream provider encounters an outage or HTTP 429 rate limit, MultiAI immediately proxies
          the request to the specified backup models without returning an error to your application.
        </p>
      </div>
    </div>
  );
};
