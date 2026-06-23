# CS2 Match Stats - Electron Desktop App

<!-- badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-28.x-blue.svg)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

[中文版 (README.md)](README.md)

<!-- toc -->
## Table of Contents

- [About](#about)
- [Features](#features)
- [Requirements](#requirements)
- [Build Requirements](#build-requirements)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Functionality](#functionality)
- [Data Format](#data-format)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Build & Release](#build--release)
- [FAQ](#faq)
- [Credits](#credits)
- [License](#license)

---

## About

CS2 Match Stats is a desktop application for Counter-Strike 2 match statistics. Built on the Electron framework, it provides a beautiful graphical interface to view match history, player statistics, and detailed round event information.

This app supports automatic scanning of CS2 installation directories and match history files, so you can get started quickly without manual path configuration.

> 🔗 **Original Project:** [CS2MatchStats](https://github.com/TGP258/CS2_Match_Stats)
>
> 📦 **Original Project Releases:** [Download CS2MatchStats Plugin](https://github.com/TGP258/CS2_Match_Stats/releases)
>
> This project is the Electron desktop version of CS2MatchStats, which requires the original project's plugin to generate match history data.

---

## Features

| Feature | Description |
|---------|-------------|
| Auto Scan | Automatically scans Steam, CS2 install paths, and match history directories |
| Custom Paths | Supports manual selection of game installation directories |
| Player Stats | Rating, KDA, ADR, RWS, Headshot Rate, Win Rate, and more |
| Ring Chart | Intuitive Rating display using a ring chart |
| Trend Chart | Line chart showing Rating trends over the last 10 matches |
| Match List | View all historical match records |
| Detailed Scoreboard | Complete player statistics table |
| Round Details | Click round dots to view kill events for each round |
| Event Records | Bomb plant/defuse, headshots, weapon information |
| Side Swap Detection | Auto-detects side swaps and calculates scores correctly |

---

## Requirements

To use the compiled application, the following requirements must be met:

1. **Counter-Strike 2** game installed
2. **CS2MatchStats** plugin installed and running (for generating match records)
3. **Windows 10/11** operating system

---

## Build Requirements

If you need to build this project from source, the following additional requirements must be met:

1. **Node.js 16+** - JavaScript runtime environment
2. **npm** - Node.js package manager (usually installed with Node.js)
3. Stable internet connection (required for downloading Electron binaries on first install)
4. Approximately 1GB of available disk space (dependencies and build artifacts)

---

## Quick Start

### Option 1: Use the compiled installer

1. Download the latest `CS2 Match Stats Setup x.x.x.exe`
2. Double-click to run the installer
3. Follow the wizard to complete installation
4. Launch the application

### Option 2: Run from source

```bash
# Clone the repository
git clone <repository-url>
cd CS2MatchStatsElectron

# Install dependencies
npm install

# Start the application
npm start
```

---

## Usage

### 1. First Launch

After launching, the app will automatically scan your system for CS2 installation paths:

- Automatically scans Steam installation directories
- Detects CS2 game folders
- Finds match_history directories
- Checks CS2MatchStats plugin installation status

### 2. Manual Path Setup

If auto-scan fails, you can manually set the paths:

1. Click the **⚙ Settings** button in the top right
2. Click the **Browse** button next to each path
3. Select the correct folder
4. Settings are saved automatically and loaded on next startup

### 3. View Player Statistics

1. Select a player at the top of the main page
2. View the Rating displayed in the ring chart
3. View KDA, ADR, RWS, headshot rate, and other data
4. View the Rating trend chart for the last 10 matches

### 4. View Match Details

1. Click any match in the match list
2. View the big score and complete scoreboard
3. Click round dots to see detailed events for that round

---

## Functionality

### Auto Scan Service

The app automatically scans the following locations:

| Scan Item | Scan Paths |
|-----------|------------|
| Steam | `Program Files (x86)/Steam`, `Steam`, `SteamLibrary` |
| CS2 | `steamapps/common/Counter-Strike Global Offensive` |
| Match History | `game/csgo/match_history` |
| Plugin | `addons/counterstrikesharp/plugins/` |

### Statistics Explained

| Stat | Description |
|------|-------------|
| Rating | Overall performance score based on kills, deaths, assists, etc. |
| KDA | (Kills + Assists) / Deaths |
| ADR | Average Damage per Round |
| RWS | Round Win Share |
| Headshot Rate | Headshot kills / Total kills |
| Win Rate | Wins / Total matches |

### Data Persistence

The app automatically saves the following configuration:

- Custom path settings (Steam, CS2, match_history)
- Selected player

---

## Data Format

Match records are saved in JSON files, consistent with the CS2MatchStats plugin format.

```json
{
  "MapName": "de_dust2",
  "StartTime": "2024-01-01T12:00:00",
  "EndTime": "2024-01-01T12:15:30",
  "Duration": 930,
  "Teams": {
    "CT": {
      "Name": "Counter-Terrorists",
      "Score": 16,
      "Players": {}
    },
    "T": {
      "Name": "Terrorists",
      "Score": 12,
      "Players": {}
    }
  },
  "Rounds": [
    {
      "RoundNumber": 1,
      "Winner": "CT",
      "Events": []
    }
  ]
}
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Electron 28.x |
| Frontend | Native HTML5 + CSS3 + JavaScript |
| Charts | Native SVG (ring chart, line chart) |
| Communication | IPC (Main process ↔ Renderer process) |
| Packaging | electron-builder |
| Languages | Bilingual (Chinese / English) |

---

## Project Structure

```
CS2MatchStatsElectron/
├── main.js                    # Electron main process
├── preload.js                 # Preload script (IPC API exposure)
├── package.json               # Project configuration
├── generate-icon.js           # Icon generation script
├── public/                    # Renderer process resources
│   ├── index.html             # Main page
│   ├── logo.png               # App icon (PNG)
│   └── icon.ico               # App icon (ICO)
├── release/                   # Build output directory
│   ├── CS2 Match Stats Setup x.x.x.exe  # Installer
│   └── win-unpacked/          # Portable version
└── node_modules/              # Dependencies
```

---

## Development Guide

### Environment Setup

```bash
# Install dependencies
npm install

# For users in China, set up mirror for faster downloads
npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
```

### Development & Debugging

```bash
# Start development mode
npm start

# Enable logging
npm run dev
```

### Code Structure

- **main.js**: Main process, handles window management, path scanning, file operations, IPC communication
- **preload.js**: Preload script, safely exposes APIs to the renderer process
- **public/index.html**: Frontend UI, contains all page rendering logic and charts

---

## Build & Release

### Windows Platform

```bash
# Build installer
npm run build:win

# Or use the general command
npm run build
```

Build artifacts are located in the `release/` directory:

- `CS2 Match Stats Setup x.x.x.exe` - NSIS installer
- `win-unpacked/` - Portable version

### Build Configuration

Configure in the `build` field of `package.json`:

```json
{
  "build": {
    "appId": "com.cs2matchstats.app",
    "productName": "CS2 Match Stats",
    "win": {
      "target": ["nsis"],
      "icon": "public/icon.ico"
    }
  }
}
```

---

## FAQ

### Q: The app shows an empty page after launch?

**A:** Please check:
1. CS2 game is installed
2. Match history directory exists and contains JSON files
3. If paths are incorrect, manually specify them in Settings

### Q: Can't find match records?

**A:** Please check:
1. CS2MatchStats plugin is correctly installed
2. At least one full match has been played
3. There are `match_*.json` files in the match_history directory

### Q: Auto scan failed?

**A:** You can manually set paths:
1. Click the Settings button in the top right
2. Click Browse to select each folder
3. Path settings are saved automatically

### Q: How to update the application?

**A:** Download the latest installer and install over the existing version. Configuration data will be preserved.

---

## Credits

This project is developed based on the following open source projects:

| Project | Description |
|---------|-------------|
| [CS2MatchStats](https://github.com/TGP258/CS2_Match_Stats) | Original project, provides data format and web version reference |
| [CS2-Bot-Improver](https://github.com/ed0ard/CS2-Bot-Improver) | Original project, provides CounterStrikeSharp framework integration |
| [CounterStrikeSharp](https://github.com/roflmuffin/CounterStrikeSharp) | CS2 server plugin framework |
| [Electron](https://www.electronjs.org/) | Cross-platform desktop application framework |
| [electron-builder](https://www.electron.build/) | Electron packaging tool |

Special thanks to all developers who contribute to the open source community.

---

## License

This project is developed based on CS2MatchStats and follows the original project's license.
