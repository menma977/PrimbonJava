# PRD Addendum: Javanese Calendar & AI Markdown

## Overview

| Item             | Details                                 |
|:-----------------|:----------------------------------------|
| **Feature Name** | Javanese Calendar & AI Markdown Support |
| **Timeline**     | 1 Day                                   |
| **Status**       | Draft                                   |
| **Team**         | 1 Developer (AI-Assisted)               |

## Background

The "Mbah" AI currently provides wise interpretations but lacks visual structure in its responses. Additionally, while we have Weton calculation, a full Javanese Calendar view with Pasaran markings is
missing—a core requirement for users to plan their lives according to tradition.

## Objectives

1. **Visual Clarity**: Enable the AI to use Markdown (bold, lists, tables) to make interpretations easier to digest.
2. **Holistic Planning**: Provide a full month-view calendar that shows Gregorian dates alongside Javanese Pasaran (Legi, Pahing, Pon, Wage, Kliwon).
3. **Auspicious Guidance**: Integrate "Hari Baik" (Good Days) indicators directly into the calendar view.

## Success Metrics

| Metric                  | Baseline | Target | Measurement Method                       |
|:------------------------|:---------|:-------|:-----------------------------------------|
| **Calendar Engagement** | 0        | 30%    | Local storage click tracking on calendar |
| **AI Readability**      | Plaintxt | Md     | User feedback/Visual confirmation        |

## Scope

### ✅ In-Scope

- **Javanese Month View**: A grid displaying the current month's Gregorian dates with Javanese Pasaran markings.
- **AI Interpretation**: GLM-4 (Z.ai) and Google Gemini integration + Markdown Rendering.
- **Hari Baik Highlights**: Simple visual indicators for generally auspicious/inauspicious days based on basic Javanese numerology (Neptu).
- **Navigation**: Ability to switch between months.

### ❌ Out-of-Scope

- **Google Calendar Sync**: Not for this iteration.
- **Personalized Ritual Reminders**: Push notifications are out of scope.

## User Stories

| ID    | Story                                                                                                                     | Acceptance Criteria                                                                                                 |
|:------|:--------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------|
| US-01 | As a user, I want to see the Javanese Pasaran (Legi, Pahing, etc.) on my regular calendar so I can track the 5-day cycle. | Given the calendar is open, when I look at a date, then I see its corresponding Javanese Pasaran name.              |
| US-02 | As a user, I want to see which days are "Hari Baik" (auspicious) in the month view so I can plan my events.               | Given the month view, when a day is auspicious, then it is highlighted with a specific color or icon.               |
| US-03 | As a user, I want the AI's interpretations to be formatted with bold text and lists so I can read the key points quickly. | Given the AI sends a response, when it contains Markdown syntax, then it is rendered as HTML instead of plain text. |
| US-04 | As a user, I want to navigate to previous or next months to plan ahead for my weddings or other events.                   | Given the calendar view, when I click 'Next' or 'Prev', then the calendar updates to the correct month.             |

## Analytics & Tracking

```json
{
  "event": "calendar_view",
  "properties": {
    "month": "integer",
    "year": "integer"
  }
}
```

## Technical Considerations

- **Library**: Use `date-fns` for Gregorian logic and a custom Javanese date utility (or existing one if found).
- **Markdown**: Use `react-markdown` for the chat interface.
- **Performance**: Ensure the calendar doesn't lag during month transitions (it's all client-side).

## Open Questions

| Question                                                       | Status                                      |
|:---------------------------------------------------------------|:--------------------------------------------|
| Specific "Hari Baik" logic for month-view (simple vs complex)? | Using simplified Neptu-based logic for now. |
