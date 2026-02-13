# Sprint Stories: Javanese Calendar & AI Markdown

## PRIM-001: Implement Markdown Rendering for AI Responses

**Role**: Frontend
**Acceptance Criteria**:

- AI responses in the chat bubble are rendered using `react-markdown`.
- Supports **bold**, _italics_, lists, and tables.
- Standard styles (colors, padding) apply to markdown elements.

## PRIM-002: Javanese Date Calculation Utilities

**Role**: Technical
**Acceptance Criteria**:

- Extend `StandardPrimbon` in `src/utils/primbon.ts`.
- `StandardPrimbon.getDaysInMonth(year, month)` returns dates with Pasaran and Neptu.
- `StandardPrimbon.isHariBaik(date)` returns boolean based on Neptu.

## PRIM-003: Monthly Javanese Calendar UI

**Role**: Frontend
**Acceptance Criteria**:

- A calendar component at `src/components/features/JavaneseCalendar.tsx`.
- Shows Gregorian dates + Javanese Pasaran.
- Navigation buttons for 'Previous Month' and 'Next Month'.

## PRIM-004: Auspicious Day Highlighting

**Role**: Frontend
**Acceptance Criteria**:

- Auspicious days (Hari Baik) highlighted in the calendar grid.
- Visual style consistent with "Mystical Modern" (gold/glow).

## PRIM-005: Integrate Calendar into App Flow

**Role**: Frontend
**Acceptance Criteria**:

- `App.tsx` updated with `'CALENDAR'` state.
- Home screen grid has a new button "Kalender Jawa" with a `CalendarDay` icon.
- Navigation back to Home works correctly.
