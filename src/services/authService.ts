import api from "./api";
import type { LoginRequest, User } from "@/types/auth";

export const authService = {
  login: async (credentials: LoginRequest): Promise<User> => {
    const { data } = await api.post<User>("/auth/login", credentials);
    return data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/me");
    return data;
  },
};
