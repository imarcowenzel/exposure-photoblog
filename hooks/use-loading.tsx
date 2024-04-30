import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  loggingIn: boolean;
  signingUp: boolean;
  changingUsername: boolean;
  changingPassword: boolean;
  setIsLoading: (state: boolean) => void;
  setLoggingIn: (state: boolean) => void;
  setSigningUp: (state: boolean) => void;
  setChangingUsername: (state: boolean) => void;
  setChangingPassword: (state: boolean) => void;
}

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  loggingIn: false,
  signingUp: false,
  changingUsername: false,
  changingPassword: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setLoggingIn: (loggingIn: boolean) => set({ loggingIn }),
  setSigningUp: (signingUp: boolean) => set({ signingUp }),
  setChangingUsername: (changingUsername: boolean) => set({ changingUsername }),
  setChangingPassword: (changingPassword: boolean) => set({ changingPassword }),
}));
