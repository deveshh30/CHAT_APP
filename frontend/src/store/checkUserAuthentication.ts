import {create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface SignUpPayload {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}

interface AuthStore {
    authUser: any;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => Promise<void>;
    signUp: (data: SignUpPayload) => Promise<void>;
}

export const checkUserAuthenticated = create<AuthStore>((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,

    checkAuth : async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data, isCheckingAuth: false });
        } catch (error) {
            console.log("Not authenticated");
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        try {
            set({ isSigningUp: true });
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
        } catch (error: unknown) {
            console.log("signup failed", error);
            window.alert("Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },
}))