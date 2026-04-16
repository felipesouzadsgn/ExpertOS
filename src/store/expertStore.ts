import { create } from 'zustand';

export interface Expert {
  id: string;
  name: string;
  handle: string;
  niche: string;
  role?: string;
  bio: string;
  profilePicture?: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  avatarGradient: string;
  brandColor: string;
  colorPalette?: string[];
  typography?: { heading: string; body: string };
  archetype?: string;
  toneOfVoice?: string;
  photographicStyle?: string;
  icp?: string;
  skills?: string[];
  tokens: string;
  archetypes: number;
}

const mockExperts: Expert[] = [
  { 
    id: '1', 
    name: 'Aria Sterling', 
    handle: '@aria.sterling', 
    niche: 'Luxury Real Estate', 
    role: 'Luxury Broker & Investor',
    bio: 'Top 1% luxury real estate broker specializing in ultra-high-net-worth properties.', 
    profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', 
    socialLinks: { instagram: 'https://instagram.com/aria.sterling', linkedin: 'https://linkedin.com/in/ariasterling' }, 
    avatarGradient: 'from-primary to-purple-500', 
    brandColor: '#6366f1', 
    colorPalette: ['#6366f1', '#1e1b4b', '#e0e7ff'],
    typography: { heading: 'Playfair Display', body: 'Inter' },
    archetype: 'The Ruler / The Creator',
    toneOfVoice: 'Sophisticated, authoritative, elegant, and highly exclusive. Uses high-end real estate terminology but keeps it accessible to UHNW individuals.',
    photographicStyle: 'High contrast, architectural focus, warm lighting, cinematic depth of field.',
    icp: 'Ultra-high-net-worth individuals, tech founders, and international investors looking for trophy assets.',
    skills: ['Luxury Sales', 'Negotiation', 'Property Valuation', 'Personal Branding'],
    tokens: '1.2M', 
    archetypes: 14 
  },
  { 
    id: '2', 
    name: 'Marcus Chen', 
    handle: '@marcus.growth', 
    niche: 'B2B SaaS Growth', 
    role: 'Growth Advisor',
    bio: 'Scaling B2B SaaS companies from $1M to $10M ARR through product-led growth.', 
    profilePicture: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop', 
    socialLinks: { twitter: 'https://twitter.com/marcusgrowth', linkedin: 'https://linkedin.com/in/marcuschen' }, 
    avatarGradient: 'from-blue-500 to-cyan-500', 
    brandColor: '#3b82f6', 
    colorPalette: ['#3b82f6', '#0f172a', '#f8fafc'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    archetype: 'The Sage / The Magician',
    toneOfVoice: 'Data-driven, direct, analytical, and actionable. No fluff, just frameworks and metrics.',
    photographicStyle: 'Minimalist, tech-focused, cool tones, often featuring charts or clean workspaces.',
    icp: 'SaaS Founders, Head of Growth, and CMOs at Series A/B startups.',
    skills: ['PLG', 'Go-to-Market', 'Data Analysis', 'Conversion Rate Optimization'],
    tokens: '850K', 
    archetypes: 8 
  },
  { 
    id: '3', 
    name: 'Elena Rostova', 
    handle: '@elena.coach', 
    niche: 'High-Ticket Coaching', 
    role: 'Business Mentor',
    bio: 'Empowering female entrepreneurs to build 7-figure coaching empires.', 
    profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', 
    socialLinks: { instagram: 'https://instagram.com/elena.coach' }, 
    avatarGradient: 'from-rose-500 to-orange-500', 
    brandColor: '#f43f5e', 
    colorPalette: ['#f43f5e', '#4c0519', '#ffe4e6'],
    typography: { heading: 'Georgia', body: 'Lato' },
    archetype: 'The Caregiver / The Hero',
    toneOfVoice: 'Empathetic, motivational, empowering, and deeply personal. Focuses on mindset and abundance.',
    photographicStyle: 'Bright, airy, warm tones, lifestyle-focused, approachable and inspiring.',
    icp: 'Female coaches, consultants, and service providers stuck at $10k/month wanting to scale.',
    skills: ['Mindset Coaching', 'High-Ticket Sales', 'Community Building', 'Offer Creation'],
    tokens: '2.1M', 
    archetypes: 22 
  },
];

interface ExpertStore {
  experts: Expert[];
  activeExpert: Expert | null;
  setActiveExpert: (id: string) => void;
  updateExpert: (expert: Expert) => void;
}

export const useExpertStore = create<ExpertStore>((set) => ({
  experts: mockExperts,
  activeExpert: mockExperts[0],
  setActiveExpert: (id) => set((state) => ({
    activeExpert: state.experts.find(e => e.id === id) || state.activeExpert
  })),
  updateExpert: (updatedExpert) => set((state) => {
    const newExperts = state.experts.map(e => e.id === updatedExpert.id ? updatedExpert : e);
    return {
      experts: newExperts,
      activeExpert: state.activeExpert?.id === updatedExpert.id ? updatedExpert : state.activeExpert
    };
  })
}));
