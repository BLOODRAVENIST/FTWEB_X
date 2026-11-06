<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=40&duration=2500&pause=800&color=9F4FFF&center=true&vCenter=true&multiline=true&width=900&height=120&lines=%F0%9F%92%80+FTWEB_X;Web+GUI+for+FTBUGRECON;500%2B+Bug+Bounty+Tools;Live+Streaming+Recon" alt="Typing SVG" />

<br/>

<a href="https://github.com/BLOODRAVENIST/FTWEB_X">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=18&duration=4000&pause=1000&color=A855F7&center=true&vCenter=true&width=600&lines=Built+by+%5BBLOODRAVENIST%5D;For+Authorized+Bug+Bounty+Only;Stream.+Scan.+Dominate." alt="Subtitle" />
</a>

<br/>

<a href="https://github.com/BLOODRAVENIST/FTWEB_X">
  <img src="https://img.shields.io/github/stars/BLOODRAVENIST/FTWEB_X?style=for-the-badge&logo=github&color=9F4FFF&labelColor=1a1a2e" alt="Stars"/>
</a>
<a href="https://github.com/BLOODRAVENIST/FTWEB_X/network/members">
  <img src="https://img.shields.io/github/forks/BLOODRAVENIST/FTWEB_X?style=for-the-badge&logo=git&color=A855F7&labelColor=1a1a2e" alt="Forks"/>
</a>
<a href="https://github.com/BLOODRAVENIST/FTWEB_X/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/BLOODRAVENIST/FTWEB_X?style=for-the-badge&color=7C3AED&labelColor=1a1a2e" alt="License"/>
</a>
<a href="https://github.com/BLOODRAVENIST/FTWEB_X">
  <img src="https://img.shields.io/badge/Version-1.0.0-9F4FFF?style=for-the-badge&labelColor=1a1a2e" alt="Version"/>
</a>
<a href="https://github.com/BLOODRAVENIST/FTWEB_X">
  <img src="https://img.shields.io/badge/Made%20with-Python-3776AB?style=for-the-badge&logo=python&logoColor=white&labelColor=1a1a2e" alt="Python"/>
</a>

<br/><br/>

<a href="https://github.com/BLOODRAVENIST/FTWEB_X">
  <img src="https://img.shields.io/badge/🚀_LIVE_DEMO-CLICK_HERE-9F4FFF?style=for-the-badge&labelColor=0a0a0f" alt="Demo"/>
</a>
<a href="https://buymeacoffee.com/bloodravenist">
  <img src="https://img.shields.io/badge/☕_BUY_ME_A_COFFEE-SUPPORT-FFDD00?style=for-the-badge&labelColor=0a0a0f" alt="Coffee"/>
</a>
<a href="https://github.com/BLOODRAVENIST/FTBUGRECON">
  <img src="https://img.shields.io/badge/🔧_FTBUGRECON-ENGINE-A855F7?style=for-the-badge&labelColor=0a0a0f" alt="Engine"/>
</a>

<br/><br/>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

</div>

<br/>

<div align="center">

## 🎯 What Is FTWEB_X?

</div>

<table align="center">
<tr>
<td width="50%" valign="top">

### 💀 The Problem

- ❌ Terminal-only recon tools
- ❌ Ugly CLI output
- ❌ No live feedback
- ❌ Hard to run parallel scans
- ❌ Copy-paste chaos

</td>
<td width="50%" valign="top">

### ⚡ The Solution

- ✅ **Beautiful browser UI**
- ✅ **Real-time streaming**
- ✅ **Matrix rain aesthetic**
- ✅ **One-click scan control**
- ✅ **Zero terminal needed**

</td>
</tr>
</table>

<div align="center">

**FTWEB_X** is a **browser-based GUI** that wraps [FTBUGRECON](https://github.com/BLOODRAVENIST/FTBUGRECON) — the 500+ tool bug bounty recon framework — in a **Flask + Socket.IO** server and streams every line of output live to an **animated purple hacker interface**.

<br/>

> *"Recon shouldn't feel like reading logs. It should feel like watching a movie."*

</div>

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## ✨ Features That Hit Different

</div>

<table align="center">
<tr>
<td align="center" width="25%">

### ⚡
### Live Stream
WebSocket-powered real-time output. Every tool result appears **instantly** as it happens.

</td>
<td align="center" width="25%">

### 🌧️
### Matrix Rain
Animated purple falling characters. **Full hacker aesthetic**, zero compromise.

</td>
<td align="center" width="25%">

### 🎨
### Purple Theme
Deep violet gradients, pulse effects, fade-in animations. **FTBUGRECON matched**.

</td>
<td align="center" width="25%">

### 📱
### Responsive
Desktop. Tablet. Mobile. **Looks perfect everywhere**.

</td>
</tr>
<tr>
<td align="center">

### ▶️
### Start / Stop / Clear
Full control over scan lifecycle. **One-click everything**.

</td>
<td align="center">

### 📊
### Live Stats
Status, target, line count, elapsed timer — **updating in real-time**.

</td>
<td align="center">

### 🌐
### Auto-Open Browser
`./run.sh` starts the server and **opens your browser automatically**.

</td>
<td align="center">

### 🛡️
### Binary Detection
Missing `ftbugrecon`? **Warns you before the scan starts**.

</td>
</tr>
</table>

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## 🏗️ Architecture

</div>

```mermaid
flowchart TD
    A[🌐 Browser<br/>HTML/CSS/JS] -->|WebSocket<br/>Socket.IO| B[🐍 Flask Backend<br/>app.py]
    B -->|subprocess.Popen| C[⚙️ ftbugrecon<br/>C Binary]
    C --> D[📁 results/<br/>TARGET_TIMESTAMP/]
    B -.->|stream stdout| A

    style A fill:#9F4FFF,stroke:#A855F7,color:#fff
    style B fill:#7C3AED,stroke:#A855F7,color:#fff
    style C fill:#6D28D9,stroke:#A855F7,color:#fff
    style D fill:#4C1D95,stroke:#A855F7,color:#fff
```

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## 🚀 Quick Start

</div>

<table align="center">
<tr>
<td width="50%">

### 📦 Step 1 — Clone

```bash
git clone https://github.com/BLOODRAVENIST/FTWEB_X.git
cd FTWEB_X
```

</td>
<td width="50%">

### 🔧 Step 2 — Build Engine

```bash
cd ~/PROJECT/FTBUGRECON
make
```

</td>
</tr>
<tr>
<td width="50%">

### 🐍 Step 3 — Setup Python

```bash
cd ~/PROJECT/FTWEB_X
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

</td>
<td width="50%">

### 🚀 Step 4 — Launch

```bash
chmod +x run.sh
./run.sh
```

**Browser opens automatically at**  
`http://127.0.0.1:5000`

</td>
</tr>
</table>

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## 🎮 How To Use

</div>

```text
┌─────────────────────────────────────────────────┐
│  1. Server chalao   →   ./run.sh                │
│  2. Browser khulega →   http://127.0.0.1:5000   │
│  3. Target daalo    →   example.com             │
│  4. START SCAN      →   🟣 Click                │
│  5. Live output     →   Matrix rain background  │
│  6. STOP / CLEAR    →   Full control            │
└─────────────────────────────────────────────────┘
```

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## 📁 File Structure

</div>

```bash
FTWEB_X/
│
├── 🐍 backend/
│   ├── app.py                  # Flask + Socket.IO server
│   └── requirements.txt        # Python dependencies
│
├── 🎨 templates/
│   └── index.html              # Main UI
│
├── 💅 static/
│   ├── style.css               # Animated purple theme
│   └── app.js                  # Matrix rain + Socket.IO client
│
├── 🚀 run.sh                   # Startup script
├── 🚫 .gitignore
├── ⚖️  LICENSE                  # MIT
└── 📖 README.md
```

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## 🔌 API & WebSocket

</div>

<table align="center">
<tr>
<td width="50%" valign="top">

### 🌐 REST Endpoints

| Method | Endpoint | Purpose |
|:---:|---|---|
| `GET` | `/` | Main UI |
| `GET` | `/api/check` | Binary exists? |
| `POST` | `/api/start` | Start scan |
| `POST` | `/api/stop` | Stop scan |
| `GET` | `/api/status` | Scan status |

**Start payload:**
```json
{"target": "example.com"}
```

</td>
<td width="50%" valign="top">

### 📡 WebSocket Events

| Event | Direction | Purpose |
|:---:|---|---|
| `connect` | S → C | Connection ready |
| `scan_output` | S → C | Live output line |
| `scan_complete` | S → C | Finished + exit code |

**Client connect:**
```js
const socket = io();
socket.on('scan_output', line => {
  terminal.innerHTML += line + '<br/>';
});
```

</td>
</tr>
</table>

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## 🛠️ Troubleshooting

</div>

<table align="center">
<tr>
<td width="50%">

| ❌ Issue | ✅ Fix |
|---|---|
| `Invalid async_mode` | `sed -i 's/threadlet/threading/' backend/app.py` |
| `Port 5000 in use` | `sudo lsof -i :5000` then `kill PID` |
| `ftbugrecon not found` | `cd ~/PROJECT/FTBUGRECON && make` |

</td>
<td width="50%">

| ❌ Issue | ✅ Fix |
|---|---|
| `ModuleNotFoundError` | `source venv/bin/activate && pip install -r backend/requirements.txt` |
| Browser not opening | Manually open `http://127.0.0.1:5000` |
| Permissions denied | `chmod +x run.sh` |

</td>
</tr>
</table>

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## ⚖️ Legal Disclaimer

</div>

<div align="center">

> **🚨 FOR AUTHORIZED BUG BOUNTY & PENETRATION TESTING ONLY 🚨**

</div>

<table align="center">
<tr>
<td width="50%" valign="top">

### ✅ Allowed

- Targets within **valid bug bounty scope**
- **Authorized** penetration testing with **written permission**
- Lab environments (**HTB**, **THM**, **VulnHub**)
- **Your own** systems

</td>
<td width="50%" valign="top">

### ❌ Not Allowed

- Systems you **do not own**
- Systems you have **no permission** for
- **Unauthorized** access — illegal everywhere
- **Production** systems without scope

</td>
</tr>
</table>

<div align="center">

Unauthorized access is illegal under **CFAA (US)**, **Computer Misuse Act (UK)**, **IT Act (India)**, and similar laws worldwide.

**You are responsible for your own actions. Use responsibly.**

</div>

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

## 💜 Support The Project

</div>

<div align="center">

If **FTWEB_X** helped you land a bug, save time, or just look cool doing recon — **consider buying me a coffee**. ☕

<br/><br/>

<a href="https://buymeacoffee.com/bloodravenist">
  <img src="https://img.shields.io/badge/☕_BUY_ME_A_COFFEE-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black&labelColor=0a0a0f" alt="Coffee" height="45"/>
</a>

<br/><br/>

### ⭐ Star this repo if it helped you ⭐

<br/>

<a href="https://github.com/BLOODRAVENIST/FTWEB_X">
  <img src="https://img.shields.io/github/stars/BLOODRAVENIST/FTWEB_X?style=social" alt="Stars"/>
</a>

</div>

<br/>

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900" alt="divider"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&duration=3000&pause=1000&color=9F4FFF&center=true&vCenter=true&width=600&lines=Made+with+%F0%9F%92%9C+by+BLOODRAVENIST;Recon.+Stream.+Dominate.;Happy+Hunting+%F0%9F%8E%AF" alt="Footer" />

<br/>

<a href="https://github.com/BLOODRAVENIST">
  <img src="https://img.shields.io/badge/GitHub-BLOODRAVENIST-9F4FFF?style=for-the-badge&logo=github&labelColor=0a0a0f" alt="GitHub"/>
</a>
<a href="https://github.com/BLOODRAVENIST/FTBUGRECON">
  <img src="https://img.shields.io/badge/Engine-FTBUGRECON-A855F7?style=for-the-badge&logo=gnubash&labelColor=0a0a0f" alt="Engine"/>
</a>

<br/><br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=9F4FFF&height=120&section=footer&text=Happy%20Hunting&fontSize=40&fontColor=ffffff&animation=twinkling" width="100%"/>

</div>
