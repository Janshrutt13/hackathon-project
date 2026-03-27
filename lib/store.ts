import { create } from 'zustand';
import type { WorkflowState, Intent } from './types';
import type { GeneratedBlog } from './aiGenerator';
import type { AnalyticsReport } from './analyticsCalculator';

interface BlogStore extends WorkflowState {
  generatedBlog: GeneratedBlog | null;
  analyticsReport: AnalyticsReport | null;
  isGenerating: boolean;
  error: string | null;
  setKeyword: (keyword: string) => void;
  setAudience: (audience: string) => void;
  setIntent: (intent: Intent[]) => void;
  setRegion: (region: string) => void;
  setTone: (tone: string) => void;
  setCurrentStep: (step: number) => void;
  generateBlog: () => Promise<void>;
  saveProject: () => void;
  reset: () => void;
  resetForNewBlog: () => void;
}

const initialState: WorkflowState = {
  currentStep: 1,
  keyword: '',
  audience: '',
  intent: ['informational'],
  region: 'Global',
  tone: 'Professional',
  stepStatuses: Array(7).fill('idle'),
};

export const useBlogStore = create<BlogStore>((set, get) => (({
  ...initialState,
  generatedBlog: null,
  analyticsReport: null,
  isGenerating: false,
  error: null,

  setKeyword: (keyword) => set({ keyword }),
  setAudience: (audience) => set({ audience }),
  setIntent: (intent) => set({ intent }),
  setRegion: (region) => set({ region }),
  setTone: (tone) => set({ tone }),
  setCurrentStep: (step) => set({ currentStep: step }),

  generateBlog: async () => {
    set({ isGenerating: true, error: null });

    try {
      const state = get();
      
      // Start pipeline
      set({ currentStep: 2, stepStatuses: ['complete', 'active', 'idle', 'idle', 'idle', 'idle', 'idle'] });
      
      // Simulate step progression
      await new Promise(resolve => setTimeout(resolve, 1500));
      set({ currentStep: 3, stepStatuses: ['complete', 'complete', 'active', 'idle', 'idle', 'idle', 'idle'] });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      set({ currentStep: 4, stepStatuses: ['complete', 'complete', 'complete', 'active', 'idle', 'idle', 'idle'] });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      set({ currentStep: 5, stepStatuses: ['complete', 'complete', 'complete', 'complete', 'active', 'idle', 'idle'] });
      
      // Call AI API to generate blog
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentStep: 5,
          keyword: state.keyword,
          audience: state.audience,
          intent: state.intent,
          region: state.region,
          tone: state.tone,
          stepStatuses: state.stepStatuses,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate blog');
      }

      const blog = await response.json();

      await new Promise(resolve => setTimeout(resolve, 1500));
      set({ currentStep: 6, stepStatuses: ['complete', 'complete', 'complete', 'complete', 'complete', 'active', 'idle'], generatedBlog: blog });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      set({ currentStep: 7, stepStatuses: ['complete', 'complete', 'complete', 'complete', 'complete', 'complete', 'active'], isGenerating: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      set({ error: errorMessage, isGenerating: false });
      console.error('Blog generation error:', error);
    }
  },

  saveProject: () => {
    const state = get();
    if (!state.generatedBlog || !state.keyword) return;

    const project = {
      id: Date.now().toString(),
      keyword: state.keyword,
      title: state.generatedBlog.title,
      createdAt: new Date().toISOString(),
      seoScore: state.generatedBlog.seoScore,
      blog: state.generatedBlog,
      analytics: state.analyticsReport,
    };

    // Get existing projects
    const existing = localStorage.getItem('blogy_projects');
    const projects = existing ? JSON.parse(existing) : [];
    
    // Add new project
    projects.push(project);
    
    // Save to localStorage
    localStorage.setItem('blogy_projects', JSON.stringify(projects));
  },

  reset: () => set({ 
    ...initialState, 
    generatedBlog: null, 
    analyticsReport: null,
    isGenerating: false, 
    error: null 
  }),

  resetForNewBlog: () => set({ 
    currentStep: 1,
    keyword: '',
    audience: '',
    intent: ['informational'],
    region: 'Global',
    tone: 'Professional',
    stepStatuses: Array(7).fill('idle'),
    generatedBlog: null, 
    analyticsReport: null,
    isGenerating: false, 
    error: null 
  }),
})) as BlogStore);
