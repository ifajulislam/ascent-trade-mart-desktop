import { contextBridge, ipcRenderer } from "electron";

// Exposes a highly restricted 'api' object to the React frontend
// The frontend can call window.api.ping() but cannot touch ipcRenderer directly
contextBridge.exposeInMainWorld("api", {
  ping: (): Promise<string> => ipcRenderer.invoke("ping"),
});
