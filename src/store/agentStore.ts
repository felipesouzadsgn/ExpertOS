import { create } from 'zustand';

export interface AgentTask {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  createdAt: string;
}

export interface Agent {
  id: string;
  expertId: string;
  name: string;
  role: string;
  description: string;
  status: 'active' | 'busy' | 'idle';
  model: string;
  systemPrompt: string;
  tools: string[];
  tasks: AgentTask[];
  color: string;
}

const mockAgents: Agent[] = [
  // Agents for Aria Sterling (Expert 1)
  {
    id: 'a1',
    expertId: '1',
    name: 'Orchestrator Prime',
    role: 'Task Routing & Strategy',
    description: 'Analyzes incoming requests and delegates to specialized agents.',
    status: 'active',
    model: 'Gemini 1.5 Pro',
    systemPrompt: 'You are the lead orchestrator for Aria Sterling. CORE DIRECTIVES:\n1. Expert First: Every operation starts with Aria\'s context.\n2. Context Before Gen: Never produce in a vacuum. Always load briefing, branding, and ICP first.\n3. Identity Locked: All outputs must reflect Aria\'s sophisticated, authoritative voice.\n4. Human-Verified: Ensure the Brand Voice + QA core validates authenticity before final delivery.\n\nYour job is to understand the overarching strategy for luxury real estate content and delegate tasks to specialized agents. Always keep Aria\'s UHNW target audience in mind.',
    tools: ['Task Delegation', 'Strategy Analysis', 'Workflow Management'],
    tasks: [
      { id: 't1', title: 'Plan Q3 Content Calendar', status: 'in-progress', createdAt: '2026-04-16T10:00:00Z' }
    ],
    color: 'bg-green-500'
  },
  {
    id: 'a2',
    expertId: '1',
    name: 'The Copy Architect',
    role: 'Writing & Tone',
    description: 'Ensures all generated text strictly adheres to the Expert\'s tone of voice.',
    status: 'busy',
    model: 'Gemini 1.5 Pro',
    systemPrompt: 'You write exclusively for Aria Sterling. Tone: Sophisticated, authoritative, elegant, and highly exclusive. Use high-end real estate terminology but keep it accessible to UHNW individuals. Never use cheap or overly salesy language.',
    tools: ['Text Generation', 'Tone Analysis', 'Grammar Check'],
    tasks: [
      { id: 't2', title: 'Draft Penthouse Listing Description', status: 'in-progress', createdAt: '2026-04-16T10:05:00Z' },
      { id: 't3', title: 'Write LinkedIn Post on Market Trends', status: 'pending', createdAt: '2026-04-16T10:10:00Z' }
    ],
    color: 'bg-yellow-500'
  },
  {
    id: 'a3',
    expertId: '1',
    name: 'Trend Sentinel',
    role: 'Research & Scraping',
    description: 'Continuously monitors market trends and competitor content.',
    status: 'active',
    model: 'Gemini 1.5 Flash',
    systemPrompt: 'Monitor luxury real estate trends, interest rates, and UHNW investment patterns. Provide daily summaries to the Orchestrator.',
    tools: ['Web Search', 'Data Scraping', 'Market API Access'],
    tasks: [
      { id: 't4', title: 'Analyze Miami Luxury Condo Market', status: 'completed', createdAt: '2026-04-15T08:00:00Z' }
    ],
    color: 'bg-green-500'
  },
  
  // Agents for Marcus Chen (Expert 2)
  {
    id: 'a4',
    expertId: '2',
    name: 'Growth Hacker AI',
    role: 'Strategy & Analytics',
    description: 'Analyzes SaaS metrics and formulates PLG strategies.',
    status: 'active',
    model: 'Gemini 1.5 Pro',
    systemPrompt: 'You are the lead strategist for Marcus Chen. Focus on B2B SaaS Growth, PLG, and conversion rate optimization. Always use data-driven frameworks.',
    tools: ['Data Analysis', 'Strategy Formulation', 'Metric Tracking'],
    tasks: [
      { id: 't5', title: 'Analyze Q2 Churn Data', status: 'in-progress', createdAt: '2026-04-16T09:00:00Z' }
    ],
    color: 'bg-green-500'
  },
  {
    id: 'a5',
    expertId: '2',
    name: 'Tech Writer Bot',
    role: 'Content Creation',
    description: 'Writes technical blog posts and LinkedIn threads.',
    status: 'idle',
    model: 'Gemini 1.5 Flash',
    systemPrompt: 'Write for Marcus Chen. Tone: Data-driven, direct, analytical, and actionable. No fluff, just frameworks and metrics. Target audience: SaaS Founders and CMOs.',
    tools: ['Text Generation', 'Markdown Formatting'],
    tasks: [],
    color: 'bg-text-muted'
  },

  // Agents for Elena Rostova (Expert 3)
  {
    id: 'a6',
    expertId: '3',
    name: 'Empowerment Engine',
    role: 'Community & Engagement',
    description: 'Drafts community responses and motivational content.',
    status: 'active',
    model: 'Gemini 1.5 Pro',
    systemPrompt: 'You represent Elena Rostova. Tone: Empathetic, motivational, empowering, and deeply personal. Focus on mindset and abundance for female entrepreneurs.',
    tools: ['Social Media Management', 'Sentiment Analysis'],
    tasks: [
      { id: 't6', title: 'Draft Weekly Newsletter', status: 'in-progress', createdAt: '2026-04-16T08:30:00Z' }
    ],
    color: 'bg-green-500'
  }
];

interface AgentStore {
  agents: Agent[];
  getAgentsByExpert: (expertId: string) => Agent[];
  updateAgent: (agent: Agent) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: mockAgents,
  getAgentsByExpert: (expertId) => get().agents.filter(a => a.expertId === expertId),
  updateAgent: (updatedAgent) => set((state) => ({
    agents: state.agents.map(a => a.id === updatedAgent.id ? updatedAgent : a)
  }))
}));
