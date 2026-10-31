import React from 'react';
import { Search, Bell, Sparkles, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenUpgrade: () => void;
  onToggleMobileMenu: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onOpenUpgrade,
  onToggleMobileMenu,
  unreadCount = 1,
}) => {
  return (
    <header className="h-16 px-4 lg:px-8 border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Left zone: Mobile toggle & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (opens command palette) */}
        <button
          onClick={onOpenSearch}
          className="w-full max-w-md flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 text-left text-sm text-slate-400 dark:text-slate-500 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
            <span className="truncate">Search models, providers, or features...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 rounded-md shrink-0">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Right zone: Notifications & Upgrade Plan CTA */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Primary Upgrade Plan CTA matching screenshot */}
        <button
          onClick={onOpenUpgrade}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shadow-blue-500/20 flex items-center gap-2 shrink-0 group"
        >
          <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12 text-blue-200" />
          <span className="whitespace-nowrap">Upgrade Plan</span>
        </button>
      </div>
    </header>
  );
};
