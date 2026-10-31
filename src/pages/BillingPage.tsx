import React, { useState } from 'react';
import {
  CreditCard,
  Check,
  Zap,
  Sparkles,
  Download,
  AlertCircle,
  Plus,
  Shield,
} from 'lucide-react';

interface BillingPageProps {
  onOpenUpgrade: () => void;
}

export const BillingPage: React.FC<BillingPageProps> = ({ onOpenUpgrade }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const invoices = [
    { id: 'INV-2026-009', date: 'Oct 01, 2026', amount: '$0.00', status: 'Paid', plan: 'Free Tier Renewal' },
    { id: 'INV-2026-008', date: 'Sep 01, 2026', amount: '$0.00', status: 'Paid', plan: 'Free Tier Renewal' },
    { id: 'INV-2026-007', date: 'Aug 01, 2026', amount: '$0.00', status: 'Paid', plan: 'Free Tier Renewal' },
  ];

  const handleDownloadInvoice = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Invoice ${id} downloaded successfully.`);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Current Quota Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40">
                ACTIVE PLAN
              </span>
              <span className="text-xs text-slate-400">Renews on Nov 20, 2026</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">
              Free Developer Tier
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Access to 34 LLM providers, 635 endpoints, and 7.4 billion monthly tokens.
            </p>
          </div>

          <button
            onClick={onOpenUpgrade}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-blue-500/25 flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Upgrade to Pro</span>
          </button>
        </div>

        {/* Usage Progress Meter */}
        <div className="pt-6 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Monthly Token Allowance
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              4.8B / 7.4B tokens (64.8% consumed)
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
              style={{ width: '64.8%' }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>2.6B free tokens remaining this billing cycle</span>
            <span className="text-emerald-600 font-medium">Automatic reset in 20 days</span>
          </div>
        </div>
      </div>

      {/* Plans Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase">Starter</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Free Developer</h3>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            $0 <span className="text-xs text-slate-400 font-normal">/ month</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>7.4 Billion tokens / month</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>34 Free LLM Providers</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>60 Requests per minute</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Standard Community Support</span>
            </li>
          </ul>
          <button
            disabled
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-semibold cursor-default"
          >
            Current Active Plan
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-600 shadow-lg relative space-y-4">
          <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
            Most Popular
          </div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Scale</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pro Developer</h3>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            $29 <span className="text-xs text-slate-400 font-normal">/ month</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span>25 Billion tokens / month</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span>Zero rate limits</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span>Priority inference queue</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span>Custom fallback policies</span>
            </li>
          </ul>
          <button
            onClick={onOpenUpgrade}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Upgrade to Pro
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase">Dedicated</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise</h3>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            $199 <span className="text-xs text-slate-400 font-normal">/ month</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Unlimited tokens volume</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>99.99% Uptime SLA</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Dedicated VPC / Static IP</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>24/7 Phone & Slack Support</span>
            </li>
          </ul>
          <button
            onClick={onOpenUpgrade}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
          >
            Contact Sales
          </button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
          Billing & Invoice Receipts
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-bold font-mono text-slate-900 dark:text-white">{inv.id}</div>
                <div className="text-slate-400">{inv.plan} · {inv.date}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-slate-900 dark:text-white">{inv.amount}</span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40">
                  {inv.status}
                </span>
                <button
                  onClick={() => handleDownloadInvoice(inv.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
