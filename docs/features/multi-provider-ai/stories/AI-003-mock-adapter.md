# Story: Implement Mock Adapter (Dev Mode)

| Metadata       | Details                   |
|:---------------|:--------------------------|
| **Story ID**   | `AI-003-mock-adapter`     |
| **Feature**    | Multi-Provider AI         |
| **Role**       | Frontend Developer        |
| **Priority**   | Medium                    |
| **Dependency** | `AI-001-service-refactor` |

## Description

Implement the `MockAdapter` to allow developers to test the chat UI without any internet connection or API costs.

## Acceptance Criteria

- [ ] Implement `MockAdapter` implementing `AIAdapter`.
- [ ] Return instant (0 latency) responses from a static array of "Mbah Wisdom".
- [ ] No `fetch` calls should be made.
- [ ] **Verification**: Set `VITE_AI_PROVIDER=mock` and receive instant generated text.

## Technical Implementation

- **File**: `src/services/ai.ts` (Add Adapter)
- **Data**: Static array of strings (e.g., "Sabar adalah kunci.", "Gusti mboten sare.").
