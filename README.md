# CS2 对局统计 - Electron 桌面版

<!-- badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-28.x-blue.svg)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

[English Version (README_EN.md)](README_EN.md)

<!-- toc -->
## 目录

- [简介](#简介)
- [功能特点](#功能特点)
- [前置要求](#前置要求)
- [快速开始](#快速开始)
- [使用方法](#使用方法)
- [功能说明](#功能说明)
- [数据格式](#数据格式)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [开发指南](#开发指南)
- [打包发布](#打包发布)
- [常见问题](#常见问题)
- [Credits](#credits)
- [许可证](#许可证)

---

## 简介

CS2 对局统计是一款 Counter-Strike 2 对局数据统计的桌面应用程序。它基于 Electron 框架开发，提供了美观的图形界面来查看对局历史、玩家统计数据和详细的回合事件信息。

本应用支持自动扫描 CS2 安装目录和比赛记录文件，无需手动配置路径即可快速开始使用。

> **注意：** 本项目是 [CS2MatchStats](https://github.com/TGP258/CS2_Match_Stats) 的 Electron 桌面版本。

---

## 功能特点

| 功能 | 说明 |
|------|------|
| 自动扫描 | 自动扫描 Steam、CS2 安装路径和比赛记录目录 |
| 自定义路径 | 支持用户手动选择游戏安装目录 |
| 玩家统计 | Rating、KDA、ADR、RWS、爆头率、胜率等数据 |
| 环形图展示 | 使用环形图直观展示 Rating 数值 |
| 趋势图表 | 近十场 Rating 变化趋势折线图 |
| 对局列表 | 查看所有历史对局记录 |
| 详细计分板 | 完整的玩家数据统计表格 |
| 回合详情 | 点击回合圆点查看每回合击杀事件 |
| 事件记录 | 炸弹安放/拆除、爆头、武器信息 |
| 换边检测 | 自动检测换边并正确计算比分 |
| 自定义标题栏 | 精美的自定义窗口标题栏 |
| 双语支持 | 中文/英文界面切换 |
| 数据持久化 | 保存用户配置和选中的玩家 |
| 地图名本地化 | 地图名称中英文对照 |

---

## 前置要求

使用本应用前，请确保已具备以下条件：

1. **Counter-Strike 2** 游戏已安装
2. **CS2MatchStats** 插件已安装并正常运行（用于生成比赛记录）
3. **Windows 10/11** 操作系统
4. **Node.js 16+**（仅开发时需要）

---

## 快速开始

### 方式一：使用已编译的安装包

1. 下载最新版本的 `CS2 Match Stats Setup x.x.x.exe`
2. 双击运行安装程序
3. 按照向导完成安装
4. 启动应用程序

### 方式二：从源码运行

```bash
# 克隆项目
git clone <repository-url>
cd CS2MatchStatsElectron

# 安装依赖
npm install

# 启动应用
npm start
```

---

## 使用方法

### 1. 首次启动

应用启动后会自动扫描系统中的 CS2 安装路径：

- 自动扫描 Steam 安装目录
- 自动检测 CS2 游戏文件夹
- 自动查找 match_history 比赛记录目录
- 检测 CS2MatchStats 插件安装状态

### 2. 手动设置路径

如果自动扫描失败，可以手动设置路径：

1. 点击右上角的 **⚙ 设置** 按钮
2. 点击对应路径旁的 **浏览** 按钮
3. 选择正确的文件夹
4. 设置会自动保存，下次启动时自动加载

### 3. 查看玩家统计

1. 在主页面顶部选择玩家
2. 查看环形图展示的 Rating
3. 查看 KDA、ADR、RWS、爆头率等数据
4. 查看近十场 Rating 变化趋势图

### 4. 查看对局详情

1. 在对局列表中点击任意一场比赛
2. 查看大比分和完整计分板
3. 点击回合圆点查看该回合的详细事件

---

## 功能说明

### 自动扫描服务

应用会自动扫描以下位置：

| 扫描项 | 扫描路径 |
|--------|----------|
| Steam | `Program Files (x86)/Steam`、`Steam`、`SteamLibrary` |
| CS2 | `steamapps/common/Counter-Strike Global Offensive` |
| 比赛记录 | `game/csgo/match_history` |
| 插件 | `addons/counterstrikesharp/plugins/` |

### 统计数据说明

| 数据项 | 说明 |
|--------|------|
| Rating | 综合表现评分，基于击杀、死亡、助攻等计算 |
| KDA | (击杀 + 助攻) / 死亡 |
| ADR | 平均每回合伤害 |
| RWS | 回合胜利得分 |
| 爆头率 | 爆头击杀 / 总击杀 |
| 胜率 | 胜利场次 / 总场次 |

### 数据持久化

应用会自动保存以下配置：

- 自定义路径设置（Steam、CS2、match_history）
- 选中的玩家

---

## 数据格式

比赛记录保存在 JSON 文件中，格式与 CS2MatchStats 插件一致。

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

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Electron 28.x |
| 前端 | 原生 HTML5 + CSS3 + JavaScript |
| 图表 | 原生 SVG（环形图、折线图） |
| 通信 | IPC (主进程 ↔ 渲染进程) |
| 打包 | electron-builder |
| 语言 | 双语（中文 / 英文） |

---

## 项目结构

```
CS2MatchStatsElectron/
├── main.js                    # Electron 主进程
├── preload.js                 # 预加载脚本（IPC API 暴露）
├── package.json               # 项目配置
├── generate-icon.js           # 图标生成脚本
├── public/                    # 渲染进程资源
│   ├── index.html             # 主页面
│   ├── logo.png               # 应用图标 (PNG)
│   └── icon.ico               # 应用图标 (ICO)
├── release/                   # 打包输出目录
│   ├── CS2 Match Stats Setup x.x.x.exe  # 安装包
│   └── win-unpacked/          # 免安装绿色版
└── node_modules/              # 依赖包
```

---

## 开发指南

### 环境搭建

```bash
# 安装依赖
npm install

# 国内用户可设置镜像加速
npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
```

### 开发调试

```bash
# 启动开发模式
npm start

# 启用日志
npm run dev
```

### 代码结构说明

- **main.js**：主进程，负责窗口管理、路径扫描、文件操作、IPC 通信
- **preload.js**：预加载脚本，安全地向渲染进程暴露 API
- **public/index.html**：前端 UI，包含所有页面渲染逻辑和图表

---

## 打包发布

### Windows 平台

```bash
# 生成安装包
npm run build:win

# 或使用通用命令
npm run build
```

打包产物位于 `release/` 目录：

- `CS2 Match Stats Setup x.x.x.exe` - NSIS 安装程序
- `win-unpacked/` - 免安装绿色版

### 打包配置

在 `package.json` 的 `build` 字段中配置：

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

## 常见问题

### Q：应用启动后显示空页面？

**A：** 请确认：
1. CS2 游戏已安装
2. 比赛记录目录存在且包含 JSON 文件
3. 如路径不正确，请在设置中手动指定

### Q：找不到比赛记录？

**A：** 请确认：
1. CS2MatchStats 插件已正确安装
2. 游戏中至少进行过一场完整对局
3. match_history 目录下有 `match_*.json` 文件

### Q：自动扫描失败？

**A：** 可以手动设置路径：
1. 点击右上角设置按钮
2. 点击浏览按钮选择对应文件夹
3. 路径设置会自动保存

### Q：如何更新应用？

**A：** 下载最新版本的安装包，覆盖安装即可。配置数据会保留。

---

## Credits

本项目基于以下开源项目开发：

| 项目 | 说明 |
|------|------|
| [CS2MatchStats](https://github.com/TGP258/CS2_Match_Stats) | 原项目，提供数据格式和 Web 版参考 |
| [CS2-Bot-Improver](https://github.com/ed0ard/CS2-Bot-Improver) | 原项目，提供 CounterStrikeSharp 框架集成 |
| [CounterStrikeSharp](https://github.com/roflmuffin/CounterStrikeSharp) | CS2 服务器插件框架 |
| [Electron](https://www.electronjs.org/) | 跨平台桌面应用框架 |
| [electron-builder](https://www.electron.build/) | Electron 打包工具 |

特别感谢所有为开源社区做出贡献的开发者。

---

## 许可证

本项目基于 CS2MatchStats 开发，遵循原项目许可证。
