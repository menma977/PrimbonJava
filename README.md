# PrimbonJava

**Ancient Wisdom, Modern Insight.**
A React-based web application that combines traditional Javanese Primbon divination with modern AI (GLM-4) to provide insights on Weton, Compatibility, and Life Guidance.

## 🚀 Features

- **Cek Weton**: Calculate your Weton (Dina + Pasaran) and Neptu from your Gregorian birthdate.
- **Cek Jodoh**: Analyze compatibility between two people using traditional formulas (Wasesa Segara, etc.).
- **Tanya Mbah (AI Chat)**: Chat with "Mbah Artificial", a mystical AI persona powered by GLM-4, for personalized advice.
- **Dark Mode UI**: "Mystical Modern" aesthetic with Gold accents on Dark Slate background.
- **Local History**: Saves your predictions locally on your device.

## 🛠️ Tech Stack

- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Runtime**: Bun (Recommended) or Node.js
- **AI**: GLM-4 via Z.ai (Client-side integration)

## 📦 Installation & Setup

1. **Install Dependencies**

   ```bash
   bun install
   # or npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env.local` inside the root directory.

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and add your **GLM-4 API Key**:

   ```env
   VITE_AI_PROVIDER=glm# Options: glm, google, mock

   VITE_GLM_API_KEY=your_z_ai_api_key_here
   VITE_GLM_MODEL=glm-4-flash
   
   VITE_GOOGLE_API_KEY=your_google_api_key_here
   VITE_GOOGLE_MODEL=gemini-2.5-flash
   ```

3. **Run Development Server**

   ```bash
   bun run dev
   # or npm run dev
   ```

4. **Build for Production**
   ```bash
   bun run build
   ```

## 📂 Project Structure

- `src/components/features`: Core feature components (Weton, Match, Chat).
- `src/components/layout`: Main application layout.
- `src/components/ui`: Shadcn UI components.
- `src/context`: React Context for state management.
- `src/services`: API integrations (GLM-4).
- `src/utils`: Primbon logic (Math & Algorithms).
- `src/types`: TypeScript definitions.
- `docs/`: Project documentation (PRD, FSD, Design System, ERD).

## 🔮 Note

This application runs entirely on the client-side. Your data is stored in your browser's LocalStorage.
