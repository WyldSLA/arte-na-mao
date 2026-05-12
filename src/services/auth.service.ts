import Cookies from "js-cookie";
import api from "./api";
import type { AuthResponse, LoginDto, SignupDto, Usuario } from "@/types";

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", dto);
    Cookies.set("access_token", data.data.accessToken);
    Cookies.set("refresh_token", data.data.refreshToken);
    return data;
  },

  async signup(dto: SignupDto): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/signup", dto);
    Cookies.set("access_token", data.data.accessToken);
    Cookies.set("refresh_token", data.data.refreshToken);
    return data;
  },

  async me(): Promise<Usuario> {
    const { data } = await api.get<{ status: string; data: Usuario }>(
      "/auth/me",
    );
    return data.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout").catch(() => {}); // ignora erro de rede
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  },

  isAuthenticated(): boolean {
    return !!Cookies.get("access_token");
  },
};
