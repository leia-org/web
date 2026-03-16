---
sidebar_position: 6
tags:
  - contributing
  - frontend
  - workbench
keywords:
  - LEIA
  - workbench
  - frontend
  - contributing
  - UI
  - React
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Workbench Frontend

**Repository:** [leia-org/leia-workbench-frontend](https://github.com/leia-org/leia-workbench-frontend)

The web interface used by instructors and students in the LEIA Workbench. This is where experiments are run, AI sessions are managed in real time, and submissions are reviewed. Built with **React 19**, **TypeScript**, and **Vite**.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 + TypeScript | UI framework and type safety |
| Vite 6 | Build tool and dev server |
| Tailwind CSS 3 | Utility-first styling |
| React Router DOM 7 | Client-side routing |
| Socket.IO Client | Real-time WebSocket communication with the backend |
| Zustand | Global state management |
| Axios | HTTP client for REST API calls |
| Monaco Editor | In-browser code editing |
| ReactFlow | Node-based workflow visualization |
| Mermaid | Diagram rendering |
| Radix UI | Accessible UI primitives (tabs, select) |
| Emotion | CSS-in-JS for dynamic styles |
| React Toastify | Notification toasts |
| ESLint | Code quality |
| Docker | Containerization |

---

## Prerequisites

- **Node.js** >= 18.x
- **npm**
- The **Workbench Backend** running locally (or accessible via URL)

---

## Project Structure

```text
leia-workbench-frontend/
├── public/
│   └── logo/              # Static logo assets
├── src/                   # Application source code
├── .env.example           # Environment variable template
├── index.html             # HTML entry point
├── vite.config.ts         # Vite build configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
├── server.cjs             # Express server for production SPA serving
├── Dockerfile             # Container build configuration
└── package.json           # Dependencies and npm scripts
```

---

## Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_APP_BACKEND` | `http://localhost:3001` | URL of the Workbench Backend API |

:::tip
If you are running the Workbench Backend on a different port or host, update `VITE_APP_BACKEND` accordingly. All API and Socket.IO connections in the app use this variable.
:::

---

## Local Development

1. Fork and clone the repository:

   ```bash
   git clone <your-fork-url>
   cd leia-workbench-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and configure your values:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:8080`.
Make sure the Workbench Backend is running at the URL set in `VITE_APP_BACKEND`.

---

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| Dev server | `npm run dev` | Start Vite dev server with HMR on port 8080 |
| Build | `npm run build` | Compile TypeScript and bundle for production |
| Preview | `npm run preview` | Preview the production build locally |
| Lint | `npm run lint` | Check code with ESLint |
| Start | `npm start` | Launch the Express production server |

---

## Contributing

1. Fork the repository and create a branch off `main`:

   ```bash
   git checkout -b feat/my-feature
   ```

2. Follow the existing ESLint configuration

   :::danger
   **Do not disable rules without justification.**
   :::

3. Make sure the app builds without errors before opening a PR:

   ```bash
   npm run build
   ```

4. Use **Conventional Commits** for your commit messages (`feat:`, `fix:`, `docs:`, etc.).

5. Open a Pull Request with a clear description of your changes. **Include screenshots** if you modified any UI elements or session flows.
