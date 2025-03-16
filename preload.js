const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data), // Process-Client communication
  on: (channel, listener) => ipcRenderer.on(channel, listener)
});