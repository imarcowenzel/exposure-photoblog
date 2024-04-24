import { create } from "zustand";

interface SubmitState {
  photoUrl: File[];
  photoPreview: string;
  setPhotoUrl: (photoUrl: File[]) => void;
  setPhotoPreview: (photoPreview: string) => void;
}

export const useSubmit = create<SubmitState>((set) => ({
  photoUrl: [],
  photoPreview: "",
  setPhotoUrl: (photoUrl: File[]) => set({ photoUrl }),
  setPhotoPreview: (photoPreview: string) => set({ photoPreview }),
}));
