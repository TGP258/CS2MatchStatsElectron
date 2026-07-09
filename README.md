# CS2 对局统计 - Electron 桌面版

<!-- badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-28.x-blue.svg)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

[English Version (README_EN.md)](README_EN.md)

<!-- toc -->
## 目录

- [简介](#简介)
- [效果展示](#效果展示)
- [功能特点](#功能特点)
- [使用要求](#使用要求)
- [编译要求](#编译要求)
- [快速开始](#快速开始)
- [使用方法](#使用方法)
- [功能说明](#功能说明)
- [段位系统](#段位系统)
- [数据格式](#数据格式)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [开发指南](#开发指南)
- [打包发布](#打包发布)
- [常见问题](#常见问题)
- [未解决的问题](#未解决的问题)
- [Credits](#credits)
- [许可证](#许可证)

---

## 简介

CS2 对局统计是一款 Counter-Strike 2 对局数据统计的桌面应用程序。它基于 Electron 框架开发，提供了美观的图形界面来查看对局历史、玩家统计数据和详细的回合事件信息。

本应用支持自动扫描 CS2 安装目录和比赛记录文件，无需手动配置路径即可快速开始使用。

> 🔗 **原项目：** [CS2MatchStats](https://github.com/TGP258/CS2_Match_Stats)
>
> 📦 **原项目 Releases：** [前往下载 CS2MatchStats 插件](https://github.com/TGP258/CS2_Match_Stats/releases)
>
> 本项目是 CS2MatchStats 的 Electron 桌面版本，需要配合原项目的插件使用才能生成比赛记录数据。

---

## 效果展示

### 主页 - 玩家统计与对局列表

![主页 - 玩家统计与对局列表](screenshots/home.png)

- 环形图直观展示 Rating 数值
- 数据卡片展示 KDA、ADR、RWS、爆头率、场次、胜率
- 近十场 Rating 变化趋势折线图
- 对局列表快速浏览历史记录

### 比赛详情 - 计分板与回合指示

![比赛详情 - 计分板与回合指示](screenshots/match-detail.png)

- 大比分展示
- 完整的玩家数据计分板
- 回合进度指示，点击可查看回合详情

### 回合详情 - 事件时间线

![回合详情 - 事件时间线](screenshots/round-detail.png)

- 击杀事件（含武器、爆头标记）
- 炸弹安放/拆除事件
- 系统时间精确到秒

---

## 功能特点

| 功能    | 说明                           |
|-------|------------------------------|
| 自动扫描  | 自动扫描 Steam、CS2 安装路径和比赛记录目录   |
| 自定义路径 | 支持用户手动选择游戏安装目录               |
| 玩家统计  | Rating、KDA、ADR、RWS、爆头率、胜率等数据 |
| 环形图展示 | 使用环形图直观展示 Rating 数值          |
| 趋势图表  | 近十场 Rating 变化趋势折线图           |
| 对局列表  | 查看所有历史对局记录                   |
| 详细计分板 | 完整的玩家数据统计表格                  |
| 回合详情  | 点击回合圆点查看每回合击杀事件              |
| 事件记录  | 炸弹安放/拆除、爆头、武器信息              |
| 换边检测  | 自动检测换边并正确计算比分                |
| 段位显示  | 自动计算并显示当前段位                  |


---

## 使用要求

使用已编译好的应用程序，需要满足以下条件：

1. **Counter-Strike 2** 游戏已安装
2. **CS2MatchStats** 插件已安装并正常运行（用于生成比赛记录）
3. **Windows 10/11** 操作系统

---

## 编译要求

如果需要从源码编译本项目，需要额外满足以下条件：

1. **Node.js 16+** - JavaScript 运行环境
2. **npm** - Node.js 包管理器（通常随 Node.js 一起安装）
3. 稳定的网络连接（首次安装依赖时需要下载 Electron 二进制文件）
4. 约 1GB 可用磁盘空间（依赖和构建产物）

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

## 段位系统

本应用内置了一套基于 ELO 思想的段位系统，综合考虑对局难度、比分差距、玩家表现和段位差距来计算每场对局的 EXP 增减。

### 段位体系

共 10 个段位，从低到高依次为：

| 段位 | EXP 阈值 | 颜色 |
|------|---------|------|
| D | 0 | 灰色 |
| D+ | 80 | 浅灰 |
| C | 200 | 绿色 |
| C+ | 360 | 浅绿 |
| B | 560 | 蓝色 |
| B+ | 800 | 浅蓝 |
| A | 1120 | 紫色 |
| A+ | 1500 | 品红 |
| S | 2000 | 橙色 |
| Pro | 2600 | 金色 |

新玩家初始 EXP 为 500（C 段位）。

### 对局难度

对局难度由插件记录的 `BotDifficulty` 字段决定（通过 CS2-Bot-Improver 的 `botprofile.vpk` 文件 SHA256 哈希检测）：

| BotDifficulty | 原始值 |
|---------------|--------|
| Low | 1 |
| Medium | 2 |
| High | 3 |

旧数据中 `BotDifficulty` 为 0 或不可读时，默认按 C+ 对局处理。

### 拟合难度

根据对局胜负和比分差距，对原始难度进行动态调整：

- **胜利时**：碾压局（比分差越大）拟合难度降低，势均力敌局拟合难度不变
- **失败时**：被碾压局（比分差越大）拟合难度升高，势均力敌局拟合难度不变

| 比分差 | 胜利调整 | 失败调整 |
|--------|---------|---------|
| ≤1 | ±0 | ±0 |
| 2 | -0.1 | +0.1 |
| 3 | -0.2 | +0.2 |
| 4 | -0.3 | +0.3 |
| 5 | -0.4 | +0.4 |
| ≥6 | -0.5 | +0.5 |

拟合难度下限为 0.5。

### 对局难度标签

根据拟合难度映射为段位标签：

| 拟合难度 | 标签 |
|---------|------|
| ≤0.5 | C |
| ≤1.0 | C+ |
| ≤1.5 | B |
| ≤2.0 | B+ |
| ≤2.5 | A |
| ≤3.0 | A+ |
| ≤3.5 | S |
| >3.5 | Pro |

### 单场 EXP 计算公式

每场对局的 EXP 计算公式如下：

**胜局：**

```
baseClose = 比分差距系数（碾压局低，势均力敌局高）
winClose = min(1.0, 1.0 - baseClose × 0.65 + 0.35)  // 碾压胜 > 险胜
perfBonus = (Rating - 1.0) × 30                     // 表现分
difficultyFactor = 0.5 + 拟合难度 × 0.5
baseGain = BASE(60) × winClose × difficultyFactor + perfBonus
EXP = baseGain × 段位差倍率
```

**负局：**

```
baseLoss = BASE(60) × baseClose × (0.8 + 拟合难度 × 0.4)
EXP = -(baseLoss × 段位差倍率)
```

> 负局不计算表现分（perfBonus），避免高 Rating 玩家输赢通吃。

**比分差距系数（baseClose）：**

| 比分差 | baseClose |
|--------|-----------|
| ≤2 | 1.00 |
| 3 | 0.95 |
| 4 | 0.85 |
| 5 | 0.75 |
| 6 | 0.65 |
| ≥7 | max(0.3, 1.0 - (比分差 - 2) × 0.07) |

### 段位差倍率

段位差倍率是本系统的核心机制，根据 **对局段位** 与 **玩家当前段位** 的差值调整 EXP：

- **高段位打低段位**：胜局得分大幅减少，败局扣分大幅增加（防止刷分）
- **低段位打高段位**：胜局得分大幅增加，败局扣分减少（鼓励挑战高难度）

| 段位差 | 胜局倍率 | 负局倍率 | 说明 |
|--------|---------|---------|------|
| -4 | 0.10 | 0.15 | 高4级打低局，几乎不得分 |
| -3 | 0.25 | 0.25 | |
| -2 | 0.50 | 0.40 | 得同段 1/3~1/2 |
| -1 | 0.75 | 0.70 | |
| 0 | 1.00 | 1.00 | 同段位正常 |
| +1 | 1.50 | 1.40 | |
| +2 | 2.00 | 1.80 | 1.5~2 倍 |
| +3 | 2.50 | 2.30 | |
| +4 | 2.80 | 2.80 | 2.5~3 倍 |

> 段位差 = 对局段位索引 - 玩家段位索引（正值=对局比玩家高端）

### 总 EXP 计算

总 EXP 采用 **70% 近期 + 30% 全局** 的加权平均：

1. 按时间顺序逐场迭代计算 EXP，每场使用当时玩家段位计算段位差倍率
2. 近期 10 场 EXP 合计 × 0.7 + 全部场次 EXP 合计 × 0.3 = 总 EXP
3. 根据总 EXP 对应段位阈值确定当前段位和进度

### 单局玩家特殊规则

只进行过一场对局的玩家（通常为 BOT 伪装的真人），段位显示为该场对局难度标签 + `?`，例如 `B?`、`A+?`。

### BOT 段位方向

BOT 的段位拟合方向与真人玩家相反：BOT 在某难度对局中碾压真人玩家时，BOT 的段位显示更高（例如 C+ 局 BOT 赢 → 显示 B）。

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

## 未解决的问题

以下是当前版本中已知的、尚未解决的问题：

| 问题 | 说明 |
|------|------|
| **MVP 计算存在 BUG** | 单场比赛的 MVP 统计可能不准确，与游戏内实际 MVP 数量可能存在偏差 |
| **助攻统计存在偏差** | 助攻数据统计可能与游戏内实际数据不一致，部分助攻可能未被正确记录 |
| **击杀队友计算入 KD** | 队友击杀（TK）目前被错误地计入击杀数据中，会影响 KD 和 Rating 计算 |

这些问题源于原始数据采集的限制，后续版本会逐步修复。

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
