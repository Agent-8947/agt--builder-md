import { create } from 'zustand';

interface StoreState {
  step: number;
  answers: Record<number, string | string[] | undefined>;
  files: Record<string, string>;
  loadingProgress: number;
  language: 'en' | 'uk' | 'ru';
  setStep: (step: number) => void;
  setAnswer: (questionId: number, answer: string | string[] | undefined) => void;
  setFiles: (files: Record<string, string>) => void;
  setLoadingProgress: (progress: number) => void;
  setLanguage: (language: 'en' | 'uk' | 'ru') => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  step: -1,
  answers: {},
  files: {},
  loadingProgress: 0,
  language: 'en',
  setStep: (step) => set({ step }),
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer }
    })),
  setFiles: (files) => set({ files }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
  setLanguage: (language) => set({ language }),
  reset: () => set({ step: -1, answers: {}, files: {}, loadingProgress: 0, language: 'en' }),
}));
