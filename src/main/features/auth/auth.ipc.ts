import { ipcMain } from "electron";
import * as AuthService from "./auth.service";

interface LoginPasswordPayload {
  username: string;
  password?: string;
}

interface LoginPinPayload {
  userId: string;
  pin: string;
}

export const registerAuthHandlers = () => {
  ipcMain.handle(
    "auth:loginWithPassword",
    async (_event, payload: LoginPasswordPayload) => {
      try {
        if (!payload.username || !payload.password) {
          throw new Error("Username and password are required");
        }

        const user = await AuthService.loginWithPassword(
          payload.username,
          payload.password,
        );

        return { success: true, data: user };
      } catch (error: unknown) {
        if (error instanceof Error) {
          return { success: false, error: error.message };
        }
        return { success: false, error: "An unknown error occurred" };
      }
    },
  );

  ipcMain.handle(
    "auth:loginWithPin",
    async (_event, payload: LoginPinPayload) => {
      try {
        if (!payload.userId || !payload.pin) {
          throw new Error("User ID and PIN are required");
        }

        const user = await AuthService.loginWithPin(
          payload.userId,
          payload.pin,
        );

        return { success: true, data: user };
      } catch (error: unknown) {
        if (error instanceof Error) {
          return { success: false, error: error.message };
        }
        return { success: false, error: "An unknown error occurred" };
      }
    },
  );
};
