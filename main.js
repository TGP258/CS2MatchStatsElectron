const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// Path scanner service
class PathScannerService {
    constructor() {
        this.steamPath = null;
        this.csgoPath = null;
        this.matchHistoryPath = null;
        this.counterStrikeSharpInstalled = false;
        this.cs2MatchStatsPluginFound = false;
    }

    scanDrives() {
        const drives = [];
        const platform = process.platform;
        
        if (platform === 'win32') {
            for (let letter = 65; letter <= 90; letter++) {
                const drivePath = letter + ':\\';
                try {
                    if (fs.existsSync(drivePath)) {
                        const stats = fs.statSync(drivePath);
                        if (stats.isDirectory()) {
                            drives.push(drivePath);
                        }
                    }
                } catch (e) {
                }
            }
        }
        
        return drives;
    }

    scanSteamPath() {
        if (this.steamPath && fs.existsSync(this.steamPath)) {
            return true;
        }

        const drives = this.scanDrives();
        const possiblePaths = [];

        for (const drive of drives) {
            possiblePaths.push(
                path.join(drive, 'Program Files (x86)', 'Steam'),
                path.join(drive, 'Steam'),
                path.join(drive, 'SteamLibrary'),
                path.join(drive, 'Program Files', 'Steam')
            );
        }

        for (const steamPath of possiblePaths) {
            if (fs.existsSync(steamPath)) {
                const steamAppsPath = path.join(steamPath, 'steamapps');
                if (fs.existsSync(steamAppsPath) || fs.existsSync(path.join(steamPath, 'steam.exe'))) {
                    this.steamPath = steamPath;
                    return true;
                }
            }
        }

        return false;
    }

    scanCsgoPath() {
        if (this.csgoPath && fs.existsSync(this.csgoPath)) {
            return true;
        }

        if (!this.steamPath && !this.scanSteamPath()) {
            return false;
        }

        const possiblePaths = [
            path.join(this.steamPath, 'steamapps', 'common', 'Counter-Strike Global Offensive'),
            path.join(this.steamPath, 'steamapps', 'common', 'Counter-Strike 2'),
            path.join(this.steamPath, 'common', 'Counter-Strike Global Offensive'),
            path.join(this.steamPath, 'common', 'Counter-Strike 2')
        ];

        for (const csgoPath of possiblePaths) {
            if (fs.existsSync(csgoPath)) {
                this.csgoPath = csgoPath;
                return true;
            }
        }

        // Try recursive search in steamapps\common
        try {
            const commonPaths = [
                path.join(this.steamPath, 'steamapps', 'common'),
                path.join(this.steamPath, 'common')
            ];

            for (const commonPath of commonPaths) {
                if (fs.existsSync(commonPath)) {
                    const dirs = fs.readdirSync(commonPath);
                    for (const dir of dirs) {
                        if (dir.toLowerCase().startsWith('counter-strike')) {
                            const fullPath = path.join(commonPath, dir);
                            if (fs.existsSync(path.join(fullPath, 'game')) || fs.existsSync(path.join(fullPath, 'csgo'))) {
                                this.csgoPath = fullPath;
                                return true;
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Error scanning CSGO path:', e);
        }

        return false;
    }

    scanMatchHistoryPath() {
        if (this.matchHistoryPath && fs.existsSync(this.matchHistoryPath)) {
            return true;
        }

        if (!this.csgoPath && !this.scanCsgoPath()) {
            return false;
        }

        const possiblePaths = [
            path.join(this.csgoPath, 'game', 'csgo', 'match_history'),
            path.join(this.csgoPath, 'csgo', 'match_history'),
            path.join(this.csgoPath, 'match_history'),
            path.join(this.csgoPath, 'game', 'csgo'),
            path.join(this.csgoPath, 'csgo')
        ];

        for (const matchPath of possiblePaths) {
            if (fs.existsSync(matchPath)) {
                this.matchHistoryPath = matchPath;
                return true;
            }
        }

        return false;
    }

    scanPluginInstallation() {
        if (!this.csgoPath && !this.scanCsgoPath()) {
            this.counterStrikeSharpInstalled = false;
            this.cs2MatchStatsPluginFound = false;
            return false;
        }

        const possiblePaths = [
            path.join(this.csgoPath, 'game', 'csgo', 'addons', 'counterstrikesharp', 'plugins'),
            path.join(this.csgoPath, 'csgo', 'addons', 'counterstrikesharp', 'plugins'),
            path.join(this.csgoPath, 'addons', 'counterstrikesharp', 'plugins')
        ];

        for (const pluginPath of possiblePaths) {
            if (fs.existsSync(pluginPath)) {
                this.counterStrikeSharpInstalled = true;
                const plugins = fs.readdirSync(pluginPath);
                this.cs2MatchStatsPluginFound = plugins.some(p => 
                    p.toLowerCase() === 'cs2matchstats'
                );
                return true;
            }
        }

        this.counterStrikeSharpInstalled = false;
        this.cs2MatchStatsPluginFound = false;
        return false;
    }

    getMatchFiles() {
        if (!this.matchHistoryPath || !fs.existsSync(this.matchHistoryPath)) {
            return [];
        }

        try {
            const files = fs.readdirSync(this.matchHistoryPath)
                .filter(file => file.startsWith('match_') && file.endsWith('.json'))
                .map(file => {
                    const filePath = path.join(this.matchHistoryPath, file);
                    const stat = fs.statSync(filePath);
                    return {
                        filename: file,
                        filepath: filePath,
                        timestamp: stat.mtime.toISOString()
                    };
                })
                .sort((a, b) => b.filename.localeCompare(a.filename));

            return files;
        } catch (e) {
            console.error('Error reading match files:', e);
            return [];
        }
    }

    setCustomPaths(steamPath, csgoPath, matchHistoryPath) {
        if (steamPath && fs.existsSync(steamPath)) {
            this.steamPath = steamPath;
        }
        if (csgoPath && fs.existsSync(csgoPath)) {
            this.csgoPath = csgoPath;
        }
        if (matchHistoryPath && fs.existsSync(matchHistoryPath)) {
            this.matchHistoryPath = matchHistoryPath;
        }
    }

    getStatus() {
        return {
            steamPath: this.steamPath,
            csgoPath: this.csgoPath,
            matchHistoryPath: this.matchHistoryPath,
            counterStrikeSharpInstalled: this.counterStrikeSharpInstalled,
            cs2MatchStatsPluginFound: this.cs2MatchStatsPluginFound,
            matchFilesCount: this.getMatchFiles().length
        };
    }
}

// Match data service
class MatchDataService {
    loadMatchFromFile(filePath) {
        if (!fs.existsSync(filePath)) {
            return null;
        }

        try {
            const jsonContent = fs.readFileSync(filePath, 'utf8');
            const match = JSON.parse(jsonContent);
            match.filename = path.basename(filePath);
            match.filepath = filePath;
            return match;
        } catch (e) {
            console.error('Error loading match file:', e);
            return null;
        }
    }

    loadAllMatches(filePaths) {
        const matches = [];
        for (const filePath of filePaths) {
            const match = this.loadMatchFromFile(filePath);
            if (match) {
                matches.push(match);
            }
        }
        return matches;
    }
}

const pathScanner = new PathScannerService();
const matchDataService = new MatchDataService();

let mainWindow;

const configPath = path.join(app.getPath('userData'), 'config.json');

function loadConfig() {
  try {
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.steamPath || config.csgoPath || config.matchHistoryPath) {
        pathScanner.setCustomPaths(config.steamPath, config.csgoPath, config.matchHistoryPath);
      }
      return config;
    }
  } catch (e) {
    console.error('Error loading config:', e);
  }
  return {};
}

function saveConfig(config) {
  try {
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('Error saving config:', e);
  }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        backgroundColor: '#0b0e14',
        frame: false,
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, 'public', 'logo.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        show: false
    });

    mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    loadConfig();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers

// Scanning handlers
ipcMain.handle('scan:full', async () => {
    pathScanner.scanSteamPath();
    pathScanner.scanCsgoPath();
    pathScanner.scanMatchHistoryPath();
    pathScanner.scanPluginInstallation();
    return pathScanner.getStatus();
});

ipcMain.handle('scan:steam', async () => {
    const result = pathScanner.scanSteamPath();
    return { success: result, path: pathScanner.steamPath };
});

ipcMain.handle('scan:csgo', async () => {
    const result = pathScanner.scanCsgoPath();
    return { success: result, path: pathScanner.csgoPath };
});

ipcMain.handle('scan:matchHistory', async () => {
    const result = pathScanner.scanMatchHistoryPath();
    return { success: result, path: pathScanner.matchHistoryPath };
});

ipcMain.handle('scan:plugins', async () => {
    const result = pathScanner.scanPluginInstallation();
    return {
        success: result,
        counterStrikeSharpInstalled: pathScanner.counterStrikeSharpInstalled,
        cs2MatchStatsPluginFound: pathScanner.cs2MatchStatsPluginFound
    };
});

ipcMain.handle('scan:status', async () => {
    return pathScanner.getStatus();
});

ipcMain.handle('scan:setCustomPaths', async (event, steamPath, csgoPath, matchHistoryPath) => {
    pathScanner.setCustomPaths(steamPath, csgoPath, matchHistoryPath);
    saveConfig({ steamPath, csgoPath, matchHistoryPath });
    return pathScanner.getStatus();
});

ipcMain.handle('scan:selectFolder', async (event, title) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: title,
        properties: ['openDirectory']
    });
    
    if (result.canceled) {
        return null;
    }
    return result.filePaths[0];
});

// Match data handlers
ipcMain.handle('matches:list', async () => {
    const files = pathScanner.getMatchFiles();
    
    return files.map(file => {
        const match = matchDataService.loadMatchFromFile(file.filepath);
        
        const humanPlayers = [];
        if (match.Teams?.CT?.Players) {
            for (const [id, player] of Object.entries(match.Teams.CT.Players)) {
                if (player.Name && !player.IsBot) {
                    humanPlayers.push({
                      name: player.Name, team: 'CT',
                      rating: player.Rating || 1.0,
                      kd: player.Deaths > 0 ? +(player.Kills / player.Deaths).toFixed(2) : (player.Kills || 0)
                    });
                }
            }
        }
        if (match.Teams?.T?.Players) {
            for (const [id, player] of Object.entries(match.Teams.T.Players)) {
                if (player.Name && !player.IsBot) {
                    humanPlayers.push({
                      name: player.Name, team: 'T',
                      rating: player.Rating || 1.0,
                      kd: player.Deaths > 0 ? +(player.Kills / player.Deaths).toFixed(2) : (player.Kills || 0)
                    });
                }
            }
        }
        
        const rounds = match?.Rounds || [];
        let firstSwapIndex = -1;
        for (let i = 0; i < rounds.length; i++) {
            if (rounds[i]?.SideSwapped) { firstSwapIndex = i; break; }
        }
        if (firstSwapIndex < 0) {
            for (let i = 0; i < rounds.length; i++) {
                const rNum = rounds[i]?.RoundNumber || (i + 1);
                if (rNum === 13) { firstSwapIndex = i; break; }
            }
        }
        let ctScore = 0, tScore = 0;
        for (let i = 0; i < rounds.length; i++) {
            const w = rounds[i]?.Winner;
            if (!w) continue;
            const swapped = firstSwapIndex >= 0 && i >= firstSwapIndex;
            const initialSide = swapped ? (w === 'CT' ? 'T' : 'CT') : w;
            if (initialSide === 'CT') ctScore++;
            else if (initialSide === 'T') tScore++;
        }

        return {
            filename: file.filename,
            timestamp: file.timestamp,
            mapName: match?.MapName || 'Unknown',
            duration: match?.Duration || 0,
            roundCount: rounds.length,
            startTime: match?.StartTime || '',
            botDifficulty: match?.BotDifficulty || 0,
            difficultyLevel: match?.DifficultyLevel || '',
            ctScore: ctScore,
            tScore: tScore,
            humanPlayers: humanPlayers
        };
    });
});

ipcMain.handle('matches:get', async (event, filename) => {
    if (!filename.startsWith('match_') || !filename.endsWith('.json')) {
        return { error: 'Invalid filename' };
    }

    const matchPath = path.join(pathScanner.matchHistoryPath || '', filename);
    return matchDataService.loadMatchFromFile(matchPath);
});

ipcMain.handle('matches:getAllPlayerNames', async () => {
    const files = pathScanner.getMatchFiles();
    const matches = matchDataService.loadAllMatches(files.map(f => f.filepath));
    const names = new Set();

    for (const match of matches) {
        if (match.Teams?.CT?.Players) {
            for (const player of Object.values(match.Teams.CT.Players)) {
                if (player.Name && !player.IsBot) {
                    names.add(player.Name);
                }
            }
        }
        if (match.Teams?.T?.Players) {
            for (const player of Object.values(match.Teams.T.Players)) {
                if (player.Name && !player.IsBot) {
                    names.add(player.Name);
                }
            }
        }
    }

    return Array.from(names).sort();
});

// Window control handlers
ipcMain.handle('window:minimize', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.handle('window:maximize', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
        return mainWindow.isMaximized();
    }
    return false;
});

ipcMain.handle('window:close', () => {
    if (mainWindow) mainWindow.close();
});

ipcMain.handle('window:isMaximized', () => {
    return mainWindow ? mainWindow.isMaximized() : false;
});

// Shell
ipcMain.handle('shell:openExternal', (_, url) => shell.openExternal(url));
