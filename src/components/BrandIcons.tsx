import React from 'react';

export const MultiAILogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="multiai-grad1" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="0.5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>
        <filter id="glow-logo" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Dynamic Ribbon 'M' */}
      <path
        d="M8 36L14 14C14.5 12 17.5 12 18 14L24 28L30 14C30.5 12 33.5 12 34 14L40 36C40.6 38.2 38.2 40 36.2 38.6L24 30L11.8 38.6C9.8 40 7.4 38.2 8 36Z"
        fill="url(#multiai-grad1)"
        filter="url(#glow-logo)"
      />
      <circle cx="24" cy="20" r="3" fill="#FFFFFF" />
    </svg>
  );
};

export const OpenAIIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-6 h-6', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.28 9.68a5.98 5.98 0 0 0-.52-4.94 6.06 6.06 0 0 0-4.32-2.95 6.02 6.02 0 0 0-5.18 1.15 6.04 6.04 0 0 0-4.04-.54 6.04 6.04 0 0 0-4.3 3.03 6.06 6.06 0 0 0-.82 4.93 6.05 6.05 0 0 0 .52 4.95 6.06 6.06 0 0 0 4.32 2.94 6.03 6.03 0 0 0 5.18-1.15 6.05 6.05 0 0 0 4.04.54 6.04 6.04 0 0 0 4.3-3.03 6.05 6.05 0 0 0 .82-4.94zm-8.31 10.66a4.42 4.42 0 0 1-3.3-1.46l.12-.07 4.14-2.39a.83.83 0 0 0 .42-.72v-5.85l1.76 1.02a.08.08 0 0 1 .04.06v4.75a4.44 4.44 0 0 1-3.18 4.66zm-8.48-3.9a4.44 4.44 0 0 1-.39-3.58l.12.07 4.14 2.39a.83.83 0 0 0 .83 0l5.06-2.93v2.03a.08.08 0 0 1-.03.07l-4.11 2.38a4.44 4.44 0 0 1-5.62-.43zm-1.89-8.48a4.44 4.44 0 0 1 2.9-2.12v4.86a.83.83 0 0 0 .41.72l5.06 2.92-1.76 1.02a.08.08 0 0 1-.07 0L7.7 13.01a4.44 4.44 0 0 1-4.1-4.94zm14.73 3.05l-5.06-2.93 1.76-1.02a.08.08 0 0 1 .07 0l4.11 2.38a4.44 4.44 0 0 1 1.2 5.97 4.44 4.44 0 0 1-2.08 1.54v-4.86a.83.83 0 0 0-.42-.72l.42-.36zm2.4-3.64l-.12-.07-4.14-2.39a.83.83 0 0 0-.83 0L10.7 7.84V5.81a.08.08 0 0 1 .03-.07l4.11-2.38a4.44 4.44 0 0 1 5.62.43 4.43 4.43 0 0 1 .27 4.58v-.03zm-9.74 3.75l2.02-1.16 2.02 1.16v2.33l-2.02 1.17-2.02-1.17v-2.33z" />
  </svg>
);

export const AnthropicIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-6 h-6', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2V6M12 18V22M2 12H6M18 12H22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const MetaIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-6 h-6', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M16.92 6C15.11 6 13.56 6.88 12 8.44C10.44 6.88 8.89 6 7.08 6C3.76 6 1 8.87 1 12.35C1 16.23 4.09 19 7.42 19C9.28 19 10.87 18.06 12 16.63C13.13 18.06 14.72 19 16.58 19C19.91 19 23 16.23 23 12.35C23 8.87 20.24 6 16.92 6ZM7.33 16.63C4.94 16.63 3.19 14.6 3.19 12.35C3.19 9.94 5.09 8.37 7.18 8.37C8.75 8.37 10.15 9.35 11.23 10.98C10.11 14.51 8.65 16.63 7.33 16.63ZM16.67 16.63C15.35 16.63 13.89 14.51 12.77 10.98C13.85 9.35 15.25 8.37 16.82 8.37C18.91 8.37 20.81 9.94 20.81 12.35C20.81 14.6 19.06 16.63 16.67 16.63Z"
      fill="#0081FB"
    />
  </svg>
);

export const GoogleIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-6 h-6', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export const DeepSeekIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-6 h-6', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M19.5 7.5C18 5 14.5 4 11 5C8.5 5.8 6.5 7.6 5.5 10C4 13.5 5 17.5 8 19.5C10 20.8 12.5 21 15 20.2C17 19.5 18.5 18 19.2 16C19.6 15 19.7 14 19.6 13C19.5 11.5 18.8 10.3 17.8 9.5C17 8.8 16 8.5 15 8.5C13.5 8.5 12 9.5 11.5 11C11.2 12 11.5 13 12.2 13.6C12.8 14 13.6 14.1 14.2 13.8"
      stroke="#4F46E5"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="15.5" cy="11" r="1.5" fill="#4F46E5" />
  </svg>
);

export const MistralIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-6 h-6', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="4" width="4" height="4" fill="#F97316" />
    <rect x="17" y="4" width="4" height="4" fill="#F97316" />
    <rect x="3" y="10" width="4" height="4" fill="#EA580C" />
    <rect x="10" y="10" width="4" height="4" fill="#EA580C" />
    <rect x="17" y="10" width="4" height="4" fill="#EA580C" />
    <rect x="3" y="16" width="4" height="4" fill="#C2410C" />
    <rect x="7" y="16" width="4" height="4" fill="#C2410C" />
    <rect x="10" y="16" width="4" height="4" fill="#C2410C" />
    <rect x="13" y="16" width="4" height="4" fill="#C2410C" />
    <rect x="17" y="16" width="4" height="4" fill="#C2410C" />
  </svg>
);

export const ProviderBrandIcon: React.FC<{ type: string; className?: string; size?: number }> = ({
  type,
  className = 'w-6 h-6',
  size = 24,
}) => {
  switch (type) {
    case 'openai':
      return <OpenAIIcon className={className} size={size} />;
    case 'anthropic':
      return <AnthropicIcon className={className} size={size} />;
    case 'meta':
      return <MetaIcon className={className} size={size} />;
    case 'google':
      return <GoogleIcon className={className} size={size} />;
    case 'deepseek':
      return <DeepSeekIcon className={className} size={size} />;
    case 'mistral':
      return <MistralIcon className={className} size={size} />;
    default:
      return (
        <div
          className={`flex items-center justify-center font-bold text-xs rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 ${className}`}
          style={{ width: size, height: size }}
        >
          {type.substring(0, 2).toUpperCase()}
        </div>
      );
  }
};
