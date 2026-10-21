---
sidebar_position: 3
tags:
  - contributing
  - frontend
  - designer
keywords:
  - LEIA
  - designer
  - frontend
  - contributing
  - UI
  - React
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Designer Frontend

**Repository:** [leia-org/leia-designer-frontend](https://github.com/leia-org/leia-designer-frontend)

The web interface used by instructors to create, configure, and test LEIAs. Built with **React**, **TypeScript**, and **Vite**, it connects to the LEIA Designer Backend to manage LEIAs, personas, problems, and experiments.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 + TypeScript | UI framework and type safety |
| Vite | Build tool and dev server |
| Tailwind CSS 4 | Utility-first styling |
| React Router DOM 7 | Client-side routing |
| Axios | HTTP client for backend communication |
| Zod | Schema validation |
| Monaco Editor | In-browser code editing |
| Radix UI | Accessible UI primitives |
| React Toastify | Notification toasts |
| ESLint | Code quality |
| Docker | Containerization |

---

## Prerequisites

- **Node.js** >= 18.x
- **npm**
- The **Designer Backend** running locally (or accessible via URL)

---

## Project Structure

```text
leia-designer-frontend/
├── public/
│   └── logo/              # Static logo assets
├── src/                   # Application source code
├── .env.example           # Environment variable template
├── index.html             # HTML entry point
├── vite.config.ts         # Vite build configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
├── server.cjs             # Custom Node.js server (for production)
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
| `VITE_APP_BACKEND` | `http://localhost:3000` | URL of the Designer Backend API |

:::tip
If you are running the backend on a different port or host, update `VITE_APP_BACKEND` accordingly. All API calls in the app use this variable.
:::

---

## Local Development

1. Fork and clone the repository:

   ```bash
   git clone <your-fork-url>
   cd leia-designer-frontend
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

The app will be available at `http://localhost:5173`.
Make sure the Designer Backend is running at the URL set in `VITE_APP_BACKEND`.

---

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| Dev server | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | Compile TypeScript and bundle for production |
| Preview | `npm run preview` | Preview the production build locally |
| Lint | `npm run lint` | Check code with ESLint |
| Start | `npm start` | Launch the Node.js production server |

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

5. Open a Pull Request with a clear description of your changes. **Include screenshots** if you modified any UI elements or layouts.
