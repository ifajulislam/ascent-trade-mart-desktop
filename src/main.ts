import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

// Prevents multiple instances of the app from running during installation on Windows
if (started) {
  app.quit();
}

// Keep a global reference of the window object so JavaScript does not automatically delete it
let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // Security: Completely disables Node.js in the visual browser window
      nodeIntegration: false,
      // Security: Forces the preload script to run in a separate JavaScript context
      contextIsolation: true,
      // Security: Locks the renderer process at the operating system level
      sandbox: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

app.on("ready", () => {
  // Sets up a listener on the backend to hear messages from the frontend
  ipcMain.handle("ping", () => "pong");

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
