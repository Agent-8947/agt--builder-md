import { create } from 'zustand';

interface StoreState {
  step: number;
  answers: Record<number, any>;
  files: Record<string, string>;
  loadingProgress: number;
  setStep: (step: number) => void;
  setAnswer: (questionId: number, answer: any) => void;
  setFiles: (files: Record<string, string>) => void;
  setLoadingProgress: (progress: number) => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  step: -1,
  answers: {},
  files: {},
  loadingProgress: 0,
  setStep: (step) => set({ step }),
  setAnswer: (questionId, answer) => 
    set((state) => ({ 
      answers: { ...state.answers, [questionId]: answer } 
    })),
  setFiles: (files) => set({ files }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
  reset: () => set({ step: -1, answers: {}, files: {}, loadingProgress: 0 }),
}));
