import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  loggingIn: boolean;
  signingUp: boolean;
  setIsLoading: (state: boolean) => void;
  setLoggingIn: (state: boolean) => void;
  setSigningUp: (state: boolean) => void;
}

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  loggingIn: false,
  signingUp: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setLoggingIn: (loggingIn: boolean) => set({ loggingIn }),
  setSigningUp: (signingUp: boolean) => set({ signingUp }),
}));
