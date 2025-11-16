import { create } from "zustand";

type CodeState = {
  code: string;
  setCode: (c: string) => void;
};

export const useCodeStore = create<CodeState>((set) => ({
  code: "",
  setCode: (c) => set({ code: c }),
}));
