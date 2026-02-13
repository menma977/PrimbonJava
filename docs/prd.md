# Product Requirements Document (PRD)

| Item             | Details                            |
|:-----------------|:-----------------------------------|
| **Product Name** | PrimbonJava                        |
| **Version**      | 1.0 (MVP)                          |
| **Status**       | Draft                              |
| **Timeline**     | 2 Days                             |
| **Team**         | 1 Developer (AI-Assisted)          |
| **Platform**     | Web (Client-side only, no backend) |

## 1. Background & Problem Statement

**Context**: The ancient Javanese wisdom of Primbon is often inaccessible or scattered across outdated sources.
**Problem**: Users seeking guidance on auspicious dates (wedding, circumcision) or compatibility often rely on fragmentary information or purely static calculation tools that lack depth.
**Solution**: revive the "old primbon website" experience with a modern, responsive web application that combines rigorous traditional algorithms with the interpretative power of GLM-4 (Z.ai) and
Google Gemini AI.

## 2. Objectives

1. **Revitalize Tradition**: comprehensive digital access to Javanese weton and calendar systems.
2. **Modernize Experience**: AI-driven interpretations (via GLM-4) to make ancient wisdom relatable and conversational.
3. **Speed to Market**: Launch a functional MVP within 48 hours.
4. **Retention**: Create a "sticky" experience where users return for daily/regular guidance.

## 3. Success Metrics

| Metric                  | Baseline | Target  | Measurement Method                          |
|:------------------------|:---------|:--------|:--------------------------------------------|
| **User Retention**      | 0        | 20% D30 | Returning visitors (local storage tracking) |
| **Calculation Speed**   | N/A      | < 200ms | Performance API (Client-side)               |
| **AI Latency**          | N/A      | < 3s    | Time to first token (streaming)             |
| **Calendar Engagement** | 0        | 30%     | Local storage click tracking on calendar    |

## 4. Scope

| Feature                  | Scope | Priority | Implementation Note                           |
|:-------------------------|:-----:|:--------:|:----------------------------------------------|
| **Web Platform**         |   ✅   |    P0    | React (Vite), No Backend, LocalStorage        |
| **Wedding Dates**        |   ✅   |    P0    | "Hari Baik" calculation (Weton + Market Day)  |
| **Circumcision Dates**   |   ✅   |    P1    | Auspicious dates for children                 |
| **Couple Compatibility** |   ✅   |    P0    | Weton matching + Javanese Calendar analysis   |
| **AI Interpretation**    |   ✅   |    P0    | GLM-4 (Z.ai) integration + Markdown Rendering |
| **AI Chat/Assistant**    |   ✅   |    P1    | "Ask the Elder" style interface               |
| **Javanese Calendar**    |   ✅   |    P1    | Full month view with Pasaran marking          |
| **Auspicious Days (HB)** |   ✅   |    P1    | "Hari Baik" highlights in calendar            |
| **User Auth**            |   ❌   |   N/A    | No login required (Stateless/Local)           |
| **Google Ads**           |   ❌   |   N/A    | Forbidden for MVP                             |
| **Backend DB**           |   ❌   |   N/A    | No server-side persistence                    |
| **Mobile App**           |   ❌   |   N/A    | Responsive Web only                           |

## 5. Functional Requirements

### 5.1 Traditional Module

- **Weton Calculator**: Input birthdate -> Output Weton (Pasaran + Dina).
- **Neptu Engine**: Calculate numerical values for days/markets to drive compatibility logic.
- **Calendar System**: Gregorian <-> Javanese Calendar converter + Monthly month-view with Pasaran markings.
- **Hari Baik Highlights**: Visual markers for auspicious/inauspicious days in calendar.

### 5.2 AI Module (Z.ai / GLM-4 & Google Gemini)

- **Persona**: "Mbah" (The Elder) - wise, respectful, mystical but clear.
- **Integration**: Direct API call from client (User provides Key or Env var).
- **Markdown Support**: Render AI responses using Markdown (bold, lists, tables) for better readability.
- **Context Injection**: Feed calculated Weton/Neptu data into prompt for personalized reading.

## 6. User Experience (UX)

- **Theme**: "Mystical Modern" (Dark mode, gold accents, batik patterns).
- **Flow**:
    1. User enters data (Name, DOB).
    2. System calculates core data (Weton, Neptu) instantly.
    3. User clicks "Interpret" for AI analysis.
    4. Result displayed with "Share" option.

## 7. Technical Constraints

- **API Security**: Since it's client-side only, API Key handling must be careful (User input or Env var during build).
- **Model**: GLM-4-Plus (Z.ai).
- **State**: usage of `localStorage` to save recent calculations implies privacy policy considerations (data stays on device).

## 8. Open Questions

| Question                       | Status | Owner |
|:-------------------------------|:-------|:------|
| Specific "Hari Baik" formulas? | Open   | Dev   |
| Z.ai API Rate Limits?          | Open   | User  |

## 9. Appendix

- **Weton**: Javanese birthday (Day + Market Day).
- **Neptu**: Numerical value assigned to Weton.
