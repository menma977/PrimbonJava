# Feature PRD Addendum: Multi-Provider AI & Developer Mode

| Item             | Details                               |
|:-----------------|:--------------------------------------|
| **Feature Name** | Multi-Provider AI & Dev Mode          |
| **Version**      | 1.1                                   |
| **Status**       | Draft                                 |
| **Feature Type** | Infrastructure / Developer Experience |

## 1. Background & Problem Statement

**Context**: The current system is hardcoded to GLM-4 (Z.ai).
**Problem**:

1. **Vendor Lock-in**: If Z.ai is down or changes pricing, the app breaks.
2. **Dev Costs**: Developers burn real tokens/money just to test the UI or chat flow.
3. **Rate Limits**: "Insufficient balance" or rate limits block development progress.
   **Solution**: Refactor the AI service to support multiple swappable providers (GLM, Google Gemini) controlled via `.env`, and introduce a "Mock" provider for zero-cost testing.

## 2. Objectives

1. **Flexibility**: Switch AI providers (GLM <-> Google) instantly via environment variables.
2. **Zero-Cost Testing**: Enable developers to test the Chat UI loop without making any network requests (Mock Mode).
3. **Reliability**: Fallback options if one provider fails (manual switch).

## 3. Scope

| Capability                    | Scope | Priority | Implementation Note                   |
|:------------------------------|:-----:|:--------:|:--------------------------------------|
| **Provider: Z.ai (GLM)**      |   ✅   |    P0    | Existing, strictly maintained.        |
| **Provider: Google (Gemini)** |   ✅   |    P1    | New integration via API Key.          |
| **Provider: Mock (Dev)**      |   ✅   |    P0    | Returns randomized static wisdom.     |
| **Env Config Strategy**       |   ✅   |    P0    | `VITE_AI_PROVIDER=google\|glm\|mock`  |
| **UI Selector**               |   ❌   |   N/A    | Config is env-based, not user-facing. |

## 4. Functional Requirements

### 4.1 Environment Configuration

The system must respect the following new variables:

- `VITE_AI_PROVIDER`: Enum [`glm`, `google`, `mock`]
- `VITE_GOOGLE_API_KEY`: Required if provider is `google`.
- `VITE_GOOGLE_MODEL`: Optional, defaults to cheap model (e.g., `gemini-1.5-flash`).

### 4.2 Abstract AI Interface

Refactor `src/services/ai.ts` into a factory/adapter pattern:

- **Interface**: `AIService.sendMessage(messages, context)`
  | :----------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
  | **US-AI-01** | As a dev, I want to use Google Gemini so I can use my free tier quota. | - Set `VITE_AI_PROVIDER=google` in `.env`<br>- Chat receives valid response from Gemini API. |
  | **US-AI-02** | As a dev, I want a Mock mode so I can test UI without using internet or money. | - Set `VITE_AI_PROVIDER=mock`<br>- Chat returns static text after delay.<br>- No network calls to
  external AI APIs. |
  | **US-AI-03** | As a user, I want consistent persona ("Mbah") regardless of provider. | - System prompt is injected correctly into Google adapter.<br>- Mock responses maintain the "Mbah" tone. |

## 6. Technical Constraints

- **Google API**: Use REST endpoint to avoid heavy SDK bundles if possible, or lightweight fetch wrapper.
- **Security**: Keys remain in `.env` (client-side risk accepted as per MVP scope).
