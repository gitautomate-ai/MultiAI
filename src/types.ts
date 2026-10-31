export type PageId =
  | 'dashboard'
  | 'playground'
  | 'models'
  | 'providers'
  | 'analytics'
  | 'billing'
  | 'docs'
  | 'support';

export interface ModelItem {
  id: string;
  name: string;
  provider: string;
  providerId: string;
  description: string;
  contextWindow: string;
  contextTokens: number;
  isFree: boolean;
  monthlyTokens?: string;
  latencyMs: number;
  throughput: number; // tokens/sec
  modalities: ('Chat' | 'Reasoning' | 'Code' | 'Vision' | 'Audio' | 'Embeddings')[];
  pricingPrompt: string;
  pricingCompletion: string;
  iconBg: string;
  iconType: 'openai' | 'anthropic' | 'meta' | 'google' | 'deepseek' | 'mistral' | 'cohere' | 'huggingface';
  popularRank?: number;
}

export interface ProviderItem {
  id: string;
  name: string;
  iconType: string;
  modelsCount: number;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime: string;
  avgLatency: number;
  freeTierAllowance: string;
  category: 'Major Frontier' | 'Open Weights' | 'Specialized Reasoning' | 'High-Speed Inference';
  description: string;
  hasByok: boolean;
  priority: number;
}

export interface DailyUsageItem {
  date: string;
  label: string;
  tokensM: number;
  requestsK: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'announcement' | 'rate-limit' | 'provider';
}
