import React from 'react';
import { X, Check, Bell, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearUnread: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onClearUnread,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-end p-4 pt-16">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-150">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearUnread}
              className="text-[11px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Mark all read
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
          {MOCK_NOTIFICATIONS.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                !item.read ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
          <span className="text-[11px] text-slate-400">All provider webhooks & alerts active</span>
        </div>
      </div>
    </div>
  );
};
