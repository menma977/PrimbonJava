# Story: Refactor AI Service to Adapter Pattern

| Metadata     | Details                   |
|:-------------|:--------------------------|
| **Story ID** | `AI-001-service-refactor` |
| **Feature**  | Multi-Provider AI         |
| **Role**     | Frontend Developer        |
| **Priority** | High                      |

## Description

Refactor the existing `src/services/ai.ts` to use a Factory/Adapter pattern. This sets the foundation for supporting multiple AI providers (GLM, Google, Mock).

## Acceptance Criteria

- [ ] Define `AIAdapter` interface with method `sendMessage(messages: ChatMessage[], context: UserProfile): Promise<string>`.
- [ ] Implement `GLMAdapter` class that encapsulates the current GLM-4 logic.
- [ ] Implement `AIServiceFactory` that selects the adapter based on `import.meta.env.VITE_AI_PROVIDER`.
- [ ] Update `generateMbahResponse` to use the Factory -> Adapter flow.
- [ ] **Verification**: Existing Chat UI continues to work with GLM-4 (default).

## Technical Implementation

- **File**: `src/services/ai.ts` (Refactor)
- **New Types**: `AIAdapter`, `AIServiceFactory`
- **Env**: Add `VITE_AI_PROVIDER` (default to 'glm' if missing).
