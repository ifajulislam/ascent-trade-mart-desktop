import type { ElectronAPI } from "../../preload";

// Telling TypeScript to add custom 'api' object to the standard browser Window
declare global {
  interface Window {
    api: ElectronAPI;
  }
}
