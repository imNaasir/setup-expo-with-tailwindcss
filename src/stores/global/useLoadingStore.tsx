// stores/useLoadingStore.ts
import { create } from "zustand";

type LoadingState = {
    visible: boolean;
    showLoading: () => void;
    hideLoading: () => void;
};

const useLoadingStore = create<LoadingState>((set) => ({
    visible: false, // Initial state is hidden
    showLoading: () => set({ visible: true }),
    hideLoading: () => set({ visible: false }),
}));

export default useLoadingStore;
