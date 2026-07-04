# RVsync — Real-time Code Collaboration Platform

RVsync is a professional, high-performance real-time collaborative coding space designed for modern developers. It features live pair programming with cursor sharing, code execution across 80+ programming languages, integrated video and voice chat, real-time shared notepad/markdown previews, and deep GitHub repository integration.

---

## Key Features

- 👥 **Real-time Collaboration**: Code together seamlessly with active cursor sharing, syntax highlighting sync, and follow mode.
- 💻 **Cross-Language Code Execution**: Compile and run code in 80+ supported languages directly inside the shared environment (powered by Piston).
- 👁️ **Live Web Previews**: See changes instantly with built-in styling engines like Tailwind CSS.
- 📹 **Built-in Video & Voice**: Fully secure, peer-to-peer audio-video streaming for smooth coordination during programming sessions.
- 📝 **Shared Markdown Notepad**: Collaborative notepad to take notes, write logs, and preview documentation in markdown format.
- 🐙 **GitHub Integration**: Load files directly from repositories, commit changes, and save work directly to GitHub.

---

## Monorepo Architecture

RVsync is configured as a Turborepo monorepo:

```
├── apps/
│   ├── client/       # Next.js App Router frontend with Monaco editor & WebRTC
│   └── server/       # uWebSockets.js & Socket.IO high-performance sync server
├── packages/
│   └── types/        # Shared TypeScript typings for communications
```

### Technologies Used

- **Frontend**: Next.js 15, Tailwind CSS, Monaco Editor, simple-peer (WebRTC), Socket.IO client, Framer Motion.
- **Backend**: Node.js, Socket.IO, uWebSockets.js (extremely fast WebSocket transmission).
- **Compilation**: Turbo, TypeScript.

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

Clone the repository and install all dependencies:

```bash
pnpm install
```

### Running Locally

To launch the client and server concurrently in development mode, run:

```bash
pnpm dev
```

The services will start at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

### Building for Production

To compile all applications:

```bash
pnpm build
```

---

## Author & Attribution

- Brand: **RVsync**
- Maintained by: **Hitesh S P**
