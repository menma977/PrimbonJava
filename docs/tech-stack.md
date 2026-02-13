# Tech Stack & Architecture Decision

| Item        | Details     |
|:------------|:------------|
| **Project** | PrimbonJava |
| **Status**  | Draft       |
| **Date**    | 2026-02-12  |

## 1. Overview

**PrimbonJava** is a client-side web application designed to revitalize ancient Javanese wisdom using modern AI. The architecture prioritizes speed of development (2-day timeline), type safety, and a
premium "mystical" aesthetic.

## 2. Architecture Style

- **Pattern**: **Client-Side SPA (Single Page Application)**.
- **Justification**:
    - **Speed**: No backend boilerplate required.
    - **Simplicity**: Direct integration with Z.ai (GLM-4) API from the browser.
    - **Cost**: Free hosting on Vercel; no server maintenance.

## 3. Technology Decisions

| Layer                  | Choice                    | Alternatives Considered | Why This Choice                                                                                                                             |
|:-----------------------|:--------------------------|:------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| **Runtime & Pkg Mgr**  | **Bun**                   | Node/npm, pnpm          | **Speed**. Bun is significantly faster for installing dependencies and running scripts, crucial for a 2-day sprint.                         |
| **Frontend Framework** | **React + Vite**          | Next.js, Vue            | **Vite** offers instant HMR and lean build. React ecosystem supports the required UI libraries best.                                        |
| **Language**           | **TypeScript**            | JavaScript              | **Safety**. Prevents runtime errors and improves developer velocity via autocomplete/IntelliSense.                                          |
| **Styling**            | **Tailwind CSS**          | CSS Modules, Vanilla    | **Velocity**. Utility-first approach speeds up layout and theming. Essential for "Mystical" custom theming.                                 |
| **UI Library**         | **Shadcn UI**             | MUI, Chakra             | **Control & Aesthetics**. Copy-paste components allow full customization of the "Mystical/Dark" theme without fighting framework overrides. |
| **State Management**   | **React Context + Hooks** | Redux, Zustand          | **Sufficiency**. App state (User inputs, History) is simple enough not to require a heavy state library.                                    |
| **Deployment**         | **Vercel**                | Netlify, GitHub Pages   | **Integration**. Best-in-class support for Vite/React and easiest Zero-Config deployment.                                                   |

## 4. Key Architecture Decisions (ADRs)

### ADR-001: Client-Side API Key Management

- **Decision**: Store Z.ai API Key in `.env` (accessed via `import.meta.env.VITE_GLM_KEY`) and/or User Input.
- **Context**: We have no backend to proxy requests.
- **Consequences**:
    - **Risk**: The API key _will_ be visible in the browser network tab to savvy users.
    - **Mitigation**:
        - Do not commit `.env` to GitHub.
        - (Future) Implement a proxy if optimizing for security/billing limits becomes necessary.
        - For MVP, this risk is accepted to meet the "No Backend" constraint.

### ADR-002: LocalStorage for Persistence

- **Decision**: Use browser `localStorage` for user profiles and history.
- **Context**: No database available.
- **Consequences**: Data is device-specific. Users cannot sync between phone/laptop. Accepted for MVP.

## 5. Development Environment

- **Required**: Bun (latest).
- **Setup**:
    1. `bun install`
    2. `cp .env.example .env` (Add `VITE_GLM_KEY`)
    3. `bun run dev`

## 6. Architecture Diagram

```mermaid
graph TD
    User[User / Browser]
    subgraph Client [React SPA (Vite)]
        UI[Shadcn UI + PWM]
        Logic[Primbon Logic (TS)]
        Store[LocalStorage]
    end
    subgraph External
        AI[Z.ai (GLM-4) API]
    end

    User <--> UI
    UI --> Logic
    Logic <--> Store
    Logic -- "Predict(Prompt)" --> AI
```
