# Story: Implement Google Gemini Adapter

| Metadata       | Details                   |
|:---------------|:--------------------------|
| **Story ID**   | `AI-002-google-adapter`   |
| **Feature**    | Multi-Provider AI         |
| **Role**       | Frontend Developer        |
| **Priority**   | Medium                    |
| **Dependency** | `AI-001-service-refactor` |

## Description

Implement the `GoogleAdapter` to allow users to use Gemini (Free Tier) as an alternative to GLM-4.

## Acceptance Criteria

- [ ] Implement `GoogleAdapter` implementing `AIAdapter`.
- [ ] Connect to `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`.
- [ ] Map `messages` format to Gemini's `contents` format.
- [ ] Inject `system_instruction` correctly (Mbah Persona).
- [ ] Handle `VITE_GOOGLE_API_KEY` missing error gracefully.
- [ ] **Verification**: Set `VITE_AI_PROVIDER=google` and receive valid chat response.

## Technical Implementation

- **File**: `src/services/ai.ts` (Add Adapter)
- **Env**: `VITE_GOOGLE_API_KEY` (Required if provider=google)
