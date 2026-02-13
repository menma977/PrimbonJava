# Implementation Plan: Javanese Calendar & AI Markdown Support

Add a comprehensive Javanese calendar view with Pasaran markings and implement Markdown rendering for AI responses to improve readability.

## User Review Required

> [!IMPORTANT]
>
> - **Markdown Library**: I propose using `react-markdown` as it is lightweight and standard for React apps.
> - **Calendar Placement**: I plan to place the Javanese Calendar as a new section in the `MainLayout`, similar to other tools like Weton Calculator.

## Proposed Changes

### AI Chat Markdown Support

#### [MODIFY] [AIChat.tsx](file:///home/menma977/Storage/work/react/PrimbonJava/src/components/features/AIChat.tsx)

- Install `react-markdown`.
- Wrap the AI response box in `<ReactMarkdown />` component.
- This ensures visual clarity for both Z.ai (GLM) and Google Gemini providers.
- Apply basic styling for markdown elements (lists, tables, bold).

### Javanese Date Logic

#### [MODIFY] [primbon.ts](file:///home/menma977/Storage/work/react/PrimbonJava/src/utils/primbon.ts)

- Utilize existing `StandardPrimbon.getWeton(date)` for Pasaran calculation.
- Add `getDaysInMonth(year, month)` to `StandardPrimbon` to return a month's worth of Weton data.

### Calendar UI

#### [NEW] [JavaneseCalendar.tsx](file:///home/menma977/Storage/work/react/PrimbonJava/src/components/features/JavaneseCalendar.tsx)

- Create a grid-based month-view calendar.
- Display Gregorian day number and Javanese Pasaran label.
- Add "Hari Baik" visual indicators using `StandardPrimbon` logic.
- Add month navigation (Prev/Next).

### Integration

#### [MODIFY] [App.tsx](file:///home/menma977/Storage/work/react/PrimbonJava/src/App.tsx)

- Add `'CALENDAR'` to `ViewState`.
- Update `renderContent()` to include `<JavaneseCalendar />`.
- Add a "Kalender Jawa" button to the Home screen grid.

#### [MODIFY] [MainLayout.tsx](file:///home/menma977/Storage/work/react/PrimbonJava/src/components/layout/MainLayout.tsx)

- (Optional) Add a link to the Calendar in the header if desired, though `App.tsx` handles the main flow.

---

## Verification Plan

### Automated Tests

- No existing test suite. I will create a basic test file `src/utils/__tests__/javanese-date.test.ts` if possible, or verify via manual check.

### Manual Verification

1. **Markdown**:
    - Open AI Chat.
    - Ask a question that triggers a list or bold text.
    - Verify that the response is rendered as HTML (not raw `**text**`).
2. **Calendar**:
    - Navigate to the "Kalender Jawa" section.
    - Verify that dates match the 2026 calendar.
    - Check if Pasaran names are correct (e.g., Feb 13, 2026 is Legi).
    - Test "Next"/"Prev" month navigation.
    - Verify "Hari Baik" highlights are visible on appropriate days.
