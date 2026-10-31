import React, { useState } from 'react';
import { X, Check, Sparkles, Zap, Shield, Rocket } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('pro');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="relative p-6 lg:p-8 bg-gradient-to-b from-blue-50/80 to-transparent dark:from-blue-950/30 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scale Beyond Limits</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Supercharge Your Multi-Model Stack
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Upgrade to Pro for higher throughput, zero rate limits, dedicated proxy endpoints, and 25B monthly tokens.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center gap-3 mt-6">
            <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  billingCycle === 'annual'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">SAVE 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Free Tier */}
          <div
            onClick={() => setSelectedPlan('free')}
            className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
              selectedPlan === 'free'
                ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Plan</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Free Developer</h3>
            <div className="mt-2 mb-4">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$0</span>
              <span className="text-xs text-slate-500"> / month</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>7.4B tokens / month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>34 LLM Providers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>60 RPM Rate Limit</span>
              </li>
            </ul>
          </div>

          {/* Pro Tier (Featured) */}
          <div
            onClick={() => setSelectedPlan('pro')}
            className={`p-5 rounded-2xl border text-left cursor-pointer relative transition-all ${
              selectedPlan === 'pro'
                ? 'border-blue-600 ring-2 ring-blue-600/30 bg-blue-50/40 dark:bg-blue-950/40 shadow-lg'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              Most Popular
            </div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Recommended
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Pro Developer</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {billingCycle === 'annual' ? '$24' : '$29'}
              </span>
              <span className="text-xs text-slate-500"> / month</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>25B tokens / month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Zero rate limits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Priority inference routing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Custom fallback policies</span>
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div
            onClick={() => setSelectedPlan('enterprise')}
            className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
              selectedPlan === 'enterprise'
                ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Team Scale</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Enterprise</h3>
            <div className="mt-2 mb-4">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {billingCycle === 'annual' ? '$159' : '$199'}
              </span>
              <span className="text-xs text-slate-500"> / month</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Unlimited tokens volume</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>99.99% Uptime SLA</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Dedicated VPC & IP whitelist</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Cancel or change plans anytime. No hidden fees.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpgrade}
              disabled={success}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Subscribed Successfully!</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Confirm & Activate {selectedPlan.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
