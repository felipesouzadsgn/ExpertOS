import { create } from 'zustand';

export interface Expert {
  id: string;
  name: string;
  handle: string;
  niche: string;
  bio: string;
  profilePicture?: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  avatarGradient: string;
  brandColor: string;
  tokens: string;
  archetypes: number;
}

const mockExperts: Expert[] = [
  { id: '1', name: 'Aria Sterling', handle: '@aria.sterling', niche: 'Luxury Real Estate', bio: 'Top 1% luxury real estate broker specializing in ultra-high-net-worth properties.', profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', socialLinks: { instagram: 'https://instagram.com/aria.sterling', linkedin: 'https://linkedin.com/in/ariasterling' }, avatarGradient: 'from-primary to-purple-500', brandColor: '#6366f1', tokens: '1.2M', archetypes: 14 },
  { id: '2', name: 'Marcus Chen', handle: '@marcus.growth', niche: 'B2B SaaS Growth', bio: 'Scaling B2B SaaS companies from $1M to $10M ARR through product-led growth.', profilePicture: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop', socialLinks: { twitter: 'https://twitter.com/marcusgrowth', linkedin: 'https://linkedin.com/in/marcuschen' }, avatarGradient: 'from-blue-500 to-cyan-500', brandColor: '#3b82f6', tokens: '850K', archetypes: 8 },
  { id: '3', name: 'Elena Rostova', handle: '@elena.coach', niche: 'High-Ticket Coaching', bio: 'Empowering female entrepreneurs to build 7-figure coaching empires.', profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', socialLinks: { instagram: 'https://instagram.com/elena.coach' }, avatarGradient: 'from-rose-500 to-orange-500', brandColor: '#f43f5e', tokens: '2.1M', archetypes: 22 },
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
