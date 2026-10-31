import React, { useState } from 'react';
import {
  Headphones,
  CheckCircle2,
  Send,
  MessageSquare,
  Github,
  HelpCircle,
  ChevronDown,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('routing');
  const [ticketDescription, setTicketDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does MultiAI offer 7.4 billion tokens per month completely free?',
      a: 'We pool serverless developer allocations, sponsored research grants, and high-efficiency open weights compute from our 34 partner providers into a unified developer free tier.',
    },
    {
      q: 'Does MultiAI store or log my prompt content or outputs?',
      a: 'No. MultiAI operates a strict zero-data-retention (ZDR) proxy architecture. Payloads are processed in memory and encrypted with ephemeral keys, with no disk persistence.',
    },
    {
      q: 'Can I Bring My Own Key (BYOK) for higher enterprise rate limits?',
      a: 'Yes! You can configure your own OpenAI, Anthropic, or AWS Bedrock keys in your settings to bypass pooled quotas while keeping unified schema routing.',
    },
    {
      q: 'Is the /v1 endpoint fully compliant with the OpenAI REST schema?',
      a: 'Yes. Any SDK, library, or CLI supporting OpenAI chat completions works immediately by setting baseURL to https://api.multiai.dev/v1.',
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDescription) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketSubject('');
      setTicketDescription('');
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Live System Health Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">
              All 34 Provider Endpoints Operational
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Current global latency: 190ms · 99.99% system availability over the past 30 days
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>STATUS: NOMINAL</span>
        </div>
      </div>

      {/* Grid: Submit Ticket & Community */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Support Ticket Form (Col 7) */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Headphones className="w-4.5 h-4.5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Submit a Developer Ticket
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Our infrastructure engineering team typically responds within 2 hours.
          </p>

          <form onSubmit={handleSubmitTicket} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
              >
                <option value="routing">Endpoint Routing / Fallback Failure</option>
                <option value="latency">High Latency or Timeout</option>
                <option value="limits">Rate Limit / Token Quota Increase</option>
                <option value="billing">Billing & Subscription Inquiry</option>
                <option value="custom">Enterprise Private VPC Setup</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Rate limit 429 on Claude 3.7 Sonnet endpoint"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                required
                className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Description / Request ID
              </label>
              <textarea
                rows={4}
                placeholder="Include request timestamp, endpoint name, or error code..."
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                required
                className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Ticket #8241 Created Successfully!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Community & Direct Channels (Col 5) */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Developer Community</h3>
            <p className="text-xs text-slate-500">
              Join 42,000+ AI engineers building multi-model architectures.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="#discord"
                onClick={(e) => e.preventDefault()}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/70 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-indigo-500" />
                  <span>Discord Developer Server</span>
                </div>
                <span className="text-[10px] text-slate-400">42k members</span>
              </a>

              <a
                href="#github"
                onClick={(e) => e.preventDefault()}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/70 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-slate-800 dark:text-white" />
                  <span>GitHub SDK Issues</span>
                </div>
                <span className="text-[10px] text-slate-400">Open source</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed pr-6">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
