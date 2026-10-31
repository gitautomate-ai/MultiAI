import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Zap,
  Activity,
  Layers,
  Check,
} from 'lucide-react';
import { USAGE_30_DAYS } from '../data/mockData';

export const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [downloaded, setDownloaded] = useState(false);

  const modelUsageStats = [
    { name: 'GPT-4.1', provider: 'OpenAI', tokens: '1.24B', share: '25.8%', requests: '890K', latency: '310ms' },
    { name: 'Claude 3.7 Sonnet', provider: 'Anthropic', tokens: '980M', share: '20.4%', requests: '710K', latency: '290ms' },
    { name: 'Llama 3.1 70B', provider: 'Meta', tokens: '870M', share: '18.1%', requests: '640K', latency: '180ms' },
    { name: 'Gemini 2.5 Pro', provider: 'Google', tokens: '760M', share: '15.8%', requests: '520K', latency: '240ms' },
    { name: 'DeepSeek R1', provider: 'DeepSeek', tokens: '690M', share: '14.3%', requests: '480K', latency: '380ms' },
    { name: 'Mistral Large 2', provider: 'Mistral AI', tokens: '260M', share: '5.4%', requests: '180K', latency: '210ms' },
  ];

  const handleDownloadCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Date,Tokens_M,Requests_K\n' +
      USAGE_30_DAYS.map((e) => `${e.date},${e.tokensM},${e.requestsK}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'multiai_usage_analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>REAL-TIME TELEMETRY</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Usage & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Granular token metering, cost savings benchmarks, and cross-provider latency distribution.
          </p>
        </div>

        {/* Range and Export */}
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  range === r
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r === '7d' ? 'Last 7 Days' : r === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownloadCsv}
            className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'Exported' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* 4 Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Total Tokens Metered</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">4.8B</div>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <span>↑ 18%</span>
            <span className="text-slate-400 font-normal">vs previous period</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Total API Requests</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">3.42M</div>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <span>↑ 24%</span>
            <span className="text-slate-400 font-normal">99.98% success</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Cost Saved vs Direct APIs</div>
          <div className="mt-2 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
            $14,280
          </div>
          <div className="mt-2 text-xs text-slate-400">Via free provider pool</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Global Average Latency</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">190ms</div>
          <div className="mt-2 text-xs text-slate-400 font-mono">p99: 580ms · TTFT: 82ms</div>
        </div>
      </div>

      {/* Model Consumption Breakdown Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
          Token Consumption by Model
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-medium">
                <th className="pb-3 pl-2">Model</th>
                <th className="pb-3">Provider</th>
                <th className="pb-3 text-right">Tokens Used</th>
                <th className="pb-3 text-right">Share</th>
                <th className="pb-3 text-right">Requests</th>
                <th className="pb-3 text-right pr-2">Avg Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {modelUsageStats.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 pl-2 font-bold text-slate-900 dark:text-white">{row.name}</td>
                  <td className="py-3.5 text-slate-500">{row.provider}</td>
                  <td className="py-3.5 text-right font-mono font-semibold text-slate-900 dark:text-white tabular-nums">
                    {row.tokens}
                  </td>
                  <td className="py-3.5 text-right font-mono text-blue-600 dark:text-blue-400 tabular-nums">
                    {row.share}
                  </td>
                  <td className="py-3.5 text-right font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                    {row.requests}
                  </td>
                  <td className="py-3.5 text-right font-mono text-emerald-600 dark:text-emerald-400 pr-2 tabular-nums">
                    {row.latency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
