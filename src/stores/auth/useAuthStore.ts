import { create } from "zustand";

type AuthState = {
    token: string | null;
    wallet: WalletType | null; // Add wallet to the AuthState type
    expoToken?: string;
    isAlreadyUsed: boolean;
    setToken: (value: string | null) => void;
    setWallet: (value: WalletType | null) => void; // Update setWallet type
    setExpoToken: (value: string | undefined) => void;
};

export interface WalletType {
    id: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    email: string;
    fullName: string;
    userName: string;
    password: string;
    wallet: string;
    status: "active" | "inactive" | "suspended"; // Define possible statuses
    isVerified: boolean;
    kyc: any;
    mobile: string | null;
    image: string | null;
    user: any;
}

const useAuthStore = create<AuthState>((set) => ({
    token: null,
    wallet: null,
    isAlreadyUsed: false,
    setToken: (value) => set({ token: value, isAlreadyUsed: true }),
    setWallet: (value) => set({ wallet: value }),
    setExpoToken: (value) => set({ expoToken: value }),
}));

export default useAuthStore;
