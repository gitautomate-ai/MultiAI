import React, { useState } from 'react';
import {
  LayoutDashboard,
  Code2,
  Box,
  Layers,
  BarChart3,
  CreditCard,
  BookOpen,
  Headphones,
  Rocket,
  ChevronDown,
  Key,
  Moon,
  Sun,
  User,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { PageId } from '../types';
import { MultiAILogo } from './BrandIcons';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenApiKeys: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  darkMode,
  onToggleDarkMode,
  onOpenApiKeys,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'playground', label: 'API Playground', icon: Code2 },
    { id: 'models', label: 'Models', icon: Box },
    { id: 'providers', label: 'Providers', icon: Layers },
    { id: 'analytics', label: 'Usage & Analytics', icon: BarChart3 },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'docs', label: 'Docs', icon: BookOpen },
    { id: 'support', label: 'Support', icon: Headphones },
  ];

  const handleNavClick = (id: PageId) => {
    onSelectPage(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand Header & Navigation */}
        <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-6 pb-2">
          {/* Brand Logo & Tagline */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 px-2 mb-8 text-left group"
          >
            <div className="relative flex items-center justify-center">
              <MultiAILogo size={38} />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
                <span>Multi</span>
                <span className="text-blue-600">AI</span>
              </div>
              <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-tight">
                One API. All AI.
              </div>
            </div>
          </button>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon
                    className={`w-4.5 h-4.5 transition-colors ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Promo Card: "Get Started Fast" */}
          <div className="mt-8 mb-4 p-4 rounded-2xl bg-gradient-to-b from-blue-50/70 to-indigo-50/40 dark:from-slate-800/70 dark:to-slate-800/40 border border-blue-100/70 dark:border-slate-700/80 text-center relative overflow-hidden">
            <div className="mx-auto w-10 h-10 rounded-full bg-blue-100/80 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2.5 shadow-xs">
              <Rocket className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Get Started Fast</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 px-1 leading-relaxed">
              Explore our powerful multi-model API
            </p>
            <button
              onClick={() => handleNavClick('docs')}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shadow-blue-500/20 flex items-center justify-center gap-1.5"
            >
              <span>View Docs</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                F
              </div>
              <div className="truncate">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Farhan Foo
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                  Free Developer
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* User Popover Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-16 left-3 right-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700/60 mb-1">
                <div className="text-xs font-medium text-slate-400">Signed in as</div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  techfurhan@gmail.com
                </div>
              </div>
              <button
                onClick={() => {
                  onOpenApiKeys();
                  setUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
              >
                <Key className="w-3.5 h-3.5 text-blue-500" />
                <span>API Keys & Credentials</span>
              </button>
              <button
                onClick={() => {
                  onToggleDarkMode();
                  setUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
                <span>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </button>
              <button
                onClick={() => {
                  handleNavClick('billing');
                  setUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                <span>Manage Subscription</span>
              </button>
              <div className="h-[1px] bg-slate-100 dark:bg-slate-700/60 my-1" />
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
