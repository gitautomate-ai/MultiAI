import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Sliders,
  Sparkles,
  Zap,
  ArrowRightLeft,
  ChevronDown,
  Terminal,
} from 'lucide-react';
import { ALL_MODELS } from '../data/mockData';
import { ProviderBrandIcon } from '../components/BrandIcons';

interface PlaygroundPageProps {
  initialModelId?: string;
}

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({ initialModelId = 'gpt-4.1' }) => {
  const [modelA, setModelA] = useState(initialModelId);
  const [modelB, setModelB] = useState('claude-3-7-sonnet');
  const [compareMode, setCompareMode] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [stream, setStream] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a high-performance software architect assisting developers with clean, robust code.'
  );
  const [prompt, setPrompt] = useState(
    'Write a TypeScript function that implements exponential backoff with jitter for resilient API calls.'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [responseA, setResponseA] = useState<string | null>(null);
  const [responseB, setResponseB] = useState<string | null>(null);
  const [activeTabCode, setActiveTabCode] = useState<'curl' | 'typescript' | 'python' | 'go'>('typescript');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedResponseA, setCopiedResponseA] = useState(false);

  const selectedModelA = ALL_MODELS.find((m) => m.id === modelA) || ALL_MODELS[0];
  const selectedModelB = ALL_MODELS.find((m) => m.id === modelB) || ALL_MODELS[1];

  const handleRun = () => {
    setIsRunning(true);
    setResponseA(null);
    setResponseB(null);

    const mockOutputA = `Here is a production-grade TypeScript implementation of exponential backoff with full jitter:

\`\`\`typescript
export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
}

export async function fetchWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxRetries = 4, baseDelayMs = 250, maxDelayMs = 4000, factor = 2 } = options;

  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries) {
        throw new Error(\`Max retries (\${maxRetries}) exceeded: \${(error as Error).message}\`);
      }

      // Full jitter: uniformly distributed between 0 and min(maxDelay, base * factor^attempt)
      const calculatedDelay = Math.min(maxDelayMs, baseDelayMs * Math.pow(factor, attempt));
      const jitteredDelay = Math.random() * calculatedDelay;

      await new Promise((resolve) => setTimeout(resolve, jitteredDelay));
    }
  }
}
\`\`\`

### Execution Performance
- **Model**: ${selectedModelA.name} via MultiAI Unified \`/v1\`
- **Tokens Generated**: 264 tokens
- **Latency**: ${selectedModelA.latencyMs}ms (TTFT: 92ms)
- **Cost**: $0.00 (Covered under 7.4B Free Developer Tier)`;

    const mockOutputB = `Here is the resilient exponential backoff with jitter in TypeScript:

\`\`\`typescript
type AsyncFn<T> = () => Promise<T>;

export async function retryWithJitter<T>(
  operation: AsyncFn<T>,
  retries = 3,
  delay = 300
): Promise<T> {
  try {
    return await operation();
  } catch (err) {
    if (retries <= 0) throw err;
    const backoff = delay * 2;
    const jitter = Math.floor(Math.random() * backoff);
    await new Promise((r) => setTimeout(r, jitter));
    return retryWithJitter(operation, retries - 1, backoff);
  }
}
\`\`\`

### Comparison Telemetry
- **Model**: ${selectedModelB.name}
- **Throughput**: ${selectedModelB.throughput} tok/s
- **Latency**: ${selectedModelB.latencyMs}ms`;

    setTimeout(() => {
      setResponseA(mockOutputA);
      if (compareMode) {
        setResponseB(mockOutputB);
      }
      setIsRunning(false);
    }, 800);
  };

  const codeSnippets = {
    typescript: `import OpenAI from 'openai';

// MultiAI provides a drop-in 100% OpenAI compatible client
const client = new OpenAI({
  baseURL: 'https://api.multiai.dev/v1',
  apiKey: process.env.MULTIAI_API_KEY, // 'sk_live_multiai_...'
});

const response = await client.chat.completions.create({
  model: '${selectedModelA.id}', // Any of 635 supported endpoints!
  messages: [
    { role: 'system', content: '${systemPrompt}' },
    { role: 'user', content: '${prompt}' }
  ],
  temperature: ${temperature},
  max_tokens: ${maxTokens},
});

console.log(response.choices[0].message.content);`,

    python: `from openai import OpenAI
import os

# MultiAI unified /v1 endpoint
client = OpenAI(
    base_url="https://api.multiai.dev/v1",
    api_key=os.environ.get("MULTIAI_API_KEY")
)

response = client.chat.completions.create(
    model="${selectedModelA.id}",
    messages=[
        {"role": "system", "content": "${systemPrompt}"},
        {"role": "user", "content": "${prompt}"}
    ],
    temperature=${temperature},
    max_tokens=${maxTokens}
)

print(response.choices[0].message.content)`,

    curl: `curl https://api.multiai.dev/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $MULTIAI_API_KEY" \\
  -d '{
    "model": "${selectedModelA.id}",
    "messages": [
      {"role": "system", "content": "${systemPrompt}"},
      {"role": "user", "content": "${prompt}"}
    ],
    "temperature": ${temperature},
    "max_tokens": ${maxTokens}
  }'`,

    go: `package main

import (
	"context"
	"fmt"
	"os"
	"github.com/sashabaranov/go-openai"
)

func main() {
	cfg := openai.DefaultConfig(os.Getenv("MULTIAI_API_KEY"))
	cfg.BaseURL = "https://api.multiai.dev/v1"
	client := openai.NewClientWithConfig(cfg)

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: "${selectedModelA.id}",
			Messages: []openai.ChatCompletionMessage{
				{Role: openai.ChatMessageRoleSystem, Content: "${systemPrompt}"},
				{Role: openai.ChatMessageRoleUser, Content: "${prompt}"},
			},
			Temperature: ${temperature},
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println(resp.Choices[0].Message.Content)
}`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTabCode]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Controls Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Primary Model Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Model A:</span>
            <select
              value={modelA}
              onChange={(e) => setModelA(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
            >
              {ALL_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider})
                </option>
              ))}
            </select>
          </div>

          {/* Compare Mode Toggle */}
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              compareMode
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Compare Models</span>
          </button>

          {/* Model B Selector (if compare mode enabled) */}
          {compareMode && (
            <div className="flex items-center gap-2 animate-in fade-in">
              <span className="text-xs font-semibold text-slate-500">Model B:</span>
              <select
                value={modelB}
                onChange={(e) => setModelB(e.target.value)}
                className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
              >
                {ALL_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCodeModal(true)}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Export Code</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs shadow-blue-500/20 flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run Unified Call</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Input & Prompt Editor (Col 7 or 6) */}
        <div className="lg:col-span-6 space-y-4">
          {/* System Prompt Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="uppercase tracking-wider">System Instructions</span>
              <span className="text-[11px] text-slate-400 font-normal">Optional</span>
            </div>
            <textarea
              rows={2}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden resize-none font-mono"
            />
          </div>

          {/* User Prompt Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="uppercase tracking-wider">User Prompt</span>
              <button
                onClick={() => setPrompt('')}
                className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
            <textarea
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt or test instructions..."
              className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden font-sans"
            />

            {/* Quick Prompt Ideas */}
            <div className="pt-2">
              <div className="text-[11px] text-slate-400 font-medium mb-1.5">Preset developer templates:</div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Exponential backoff with jitter',
                  'Parse unformatted JSON schema',
                  'Compare Postgres vs ClickHouse',
                  'Debug React 19 hydration mismatch',
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hyperparameters Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>Inference Parameters</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>Temperature</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>Max Tokens</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{maxTokens}</span>
                </div>
                <input
                  type="range"
                  min="256"
                  max="8192"
                  step="256"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Output & Comparison Console (Col 6) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Response Box A */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col h-full min-h-[380px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ProviderBrandIcon type={selectedModelA.iconType} size={18} />
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {selectedModelA.name}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  Unified Endpoint
                </span>
              </div>
              {responseA && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(responseA);
                    setCopiedResponseA(true);
                    setTimeout(() => setCopiedResponseA(false), 2000);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  {copiedResponseA ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedResponseA ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <div className="flex-1 py-3 overflow-y-auto">
              {isRunning ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-3">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-slate-400 font-mono">Routing through MultiAI engine...</span>
                </div>
              ) : responseA ? (
                <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {responseA}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400">
                  <Sparkles className="w-8 h-8 text-blue-300 dark:text-blue-900 mb-2" />
                  <p className="text-xs">Click "Run Unified Call" to test this endpoint</p>
                  <span className="text-[11px] text-slate-400 mt-1">
                    Latency: ~{selectedModelA.latencyMs}ms · Context: {selectedModelA.contextWindow}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Response Box B (if compare mode active) */}
          {compareMode && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col min-h-[260px] animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ProviderBrandIcon type={selectedModelB.iconType} size={18} />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {selectedModelB.name}
                  </span>
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                    Side-by-side Compare
                  </span>
                </div>
              </div>

              <div className="flex-1 py-3 overflow-y-auto">
                {responseB ? (
                  <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {responseB}
                  </pre>
                ) : (
                  <div className="text-center py-8 text-xs text-slate-400">
                    Awaiting response comparison...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code Export Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">API Integration Code</h3>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            {/* Language Tabs */}
            <div className="flex items-center gap-2 px-4 pt-3 border-b border-slate-100 dark:border-slate-800">
              {(['typescript', 'python', 'curl', 'go'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTabCode(lang)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                    activeTabCode === lang
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {lang}
                </button>
              ))}
              <button
                onClick={handleCopyCode}
                className="ml-auto text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 pb-1"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950 max-h-96 overflow-y-auto">
              <pre className="text-xs font-mono text-slate-200 leading-relaxed">
                {codeSnippets[activeTabCode]}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
