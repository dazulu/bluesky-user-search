import { Actor } from "./types";
import { create } from "zustand";

export interface FormOptions {
  name: boolean;
  description: boolean;
  omit: string[];
  noDescription: boolean;
  noDisplayName: boolean;
}

export interface Store {
  cursor: string | null;
  formOptions: FormOptions;
  loading: boolean;
  query: string;
  results: Actor[] | null;
  resetResults: () => void;
  setCursor: (cursor: string | null) => void;
  setLoading: (loading: boolean) => void;
  setQuery: (query: string) => void;
  updateResults: (newResults: Actor[]) => void;
  updateFormOptions: (option: Partial<FormOptions>) => void;
}

export const useStore = create<Store>((set) => ({
  cursor: null,
  formOptions: {
    name: true,
    description: true,
    omit: [],
    noDescription: true,
    noDisplayName: true,
  },
  loading: false,
  query: "",
  results: null,
  resetResults: () => set({ results: null }),
  setCursor: (cursor: string | null) => set({ cursor }),
  setLoading: (loading: boolean) => set({ loading }),
  setQuery: (query: string) => set({ query }),
  updateResults: (newResults: Actor[]) =>
    set((state) => ({ results: [...(state.results ?? []), ...newResults] })),
  updateFormOptions: (option: Partial<FormOptions>) =>
    set((state: Store) => ({
      formOptions: { ...state.formOptions, ...option },
    })),
}));
