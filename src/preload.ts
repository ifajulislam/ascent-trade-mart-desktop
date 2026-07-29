import { contextBridge, ipcRenderer } from "electron";
import type { SafeUser } from "./database/schema/user.schema";

export type AuthResponse =
  { success: true; data: SafeUser } | { success: false; error: string };

const api = {
  loginWithPassword: (
    username: string,
    password?: string,
  ): Promise<AuthResponse> => {
    return ipcRenderer.invoke("auth:loginWithPassword", { username, password });
  },

  loginWithPin: (userId: string, pin: string): Promise<AuthResponse> => {
    return ipcRenderer.invoke("auth:loginWithPin", { userId, pin });
  },
};

contextBridge.exposeInMainWorld("api", api);

export type ElectronAPI = typeof api;
