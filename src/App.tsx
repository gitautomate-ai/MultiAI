import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { UpgradeModal } from './components/UpgradeModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ApiKeysModal } from './components/ApiKeysModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ModelsPage } from './pages/ModelsPage';
import { ProvidersPage } from './pages/ProvidersPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { BillingPage } from './pages/BillingPage';
import { DocsPage } from './pages/DocsPage';
import { SupportPage } from './pages/SupportPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [selectedModelId, setSelectedModelId] = useState<string>('gpt-4.1');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [upgradeOpen, setUpgradeOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [apiKeysOpen, setApiKeysOpen] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(1);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId);
  };

  const handleClearNotifications = () => {
    setUnreadNotifications(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenApiKeys={() => setApiKeysOpen(true)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace Frame (offset for 64 / 256px sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header Bar */}
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenUpgrade={() => setUpgradeOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          unreadCount={unreadNotifications}
        />

        {/* Dynamic Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentPage === 'dashboard' && (
            <DashboardPage
              onNavigate={setCurrentPage}
              onSelectModel={handleSelectModel}
            />
          )}

          {currentPage === 'playground' && (
            <PlaygroundPage initialModelId={selectedModelId} />
          )}

          {currentPage === 'models' && (
            <ModelsPage
              onNavigate={setCurrentPage}
              onSelectModel={handleSelectModel}
            />
          )}

          {currentPage === 'providers' && (
            <ProvidersPage
              onNavigate={setCurrentPage}
              onOpenApiKeys={() => setApiKeysOpen(true)}
            />
          )}

          {currentPage === 'analytics' && <AnalyticsPage />}

          {currentPage === 'billing' && (
            <BillingPage onOpenUpgrade={() => setUpgradeOpen(true)} />
          )}

          {currentPage === 'docs' && <DocsPage />}

          {currentPage === 'support' && <SupportPage />}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={setCurrentPage}
        onSelectModel={handleSelectModel}
      />

      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
      />

      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onClearUnread={handleClearNotifications}
      />

      <ApiKeysModal
        isOpen={apiKeysOpen}
        onClose={() => setApiKeysOpen(false)}
      />
    </div>
  );
}
