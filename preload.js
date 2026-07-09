const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Scanning methods
    scan: {
        full: () => ipcRenderer.invoke('scan:full'),
        steam: () => ipcRenderer.invoke('scan:steam'),
        csgo: () => ipcRenderer.invoke('scan:csgo'),
        matchHistory: () => ipcRenderer.invoke('scan:matchHistory'),
        plugins: () => ipcRenderer.invoke('scan:plugins'),
        status: () => ipcRenderer.invoke('scan:status'),
        setCustomPaths: (steamPath, csgoPath, matchHistoryPath) => 
            ipcRenderer.invoke('scan:setCustomPaths', steamPath, csgoPath, matchHistoryPath),
        selectFolder: (title) => ipcRenderer.invoke('scan:selectFolder', title)
    },
    
    // Match data methods
    matches: {
        list: () => ipcRenderer.invoke('matches:list'),
        get: (filename) => ipcRenderer.invoke('matches:get', filename),
        getAllPlayerNames: () => ipcRenderer.invoke('matches:getAllPlayerNames')
    },
    
    // Window control methods
    window: {
        minimize: () => ipcRenderer.invoke('window:minimize'),
        maximize: () => ipcRenderer.invoke('window:maximize'),
        close: () => ipcRenderer.invoke('window:close'),
        isMaximized: () => ipcRenderer.invoke('window:isMaximized')
    },

    // Shell methods
    openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url)
});
