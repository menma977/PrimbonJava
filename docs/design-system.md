# Design System: PrimbonJava

| Item       | Details                            |
|:-----------|:-----------------------------------|
| **Theme**  | Mystical Modern                    |
| **Status** | Version 1.0 (Draft)                |
| **Vibe**   | Mysterious, Authoritative, Premium |

## 1. Design Tokens

### 1.1 Colors

| Token Name                 | Value                                                    | Usage                                      |
|:---------------------------|:---------------------------------------------------------|:-------------------------------------------|
| `color-primary`            | `#FFD700` (Gold)                                         | Primary actions, highlights, active states |
| `color-primary-foreground` | `#000000` (Black)                                        | Text on primary actions                    |
| `color-background`         | `#1a1a2e` (Dark Slate)                                   | App background, page body                  |
| `color-surface`            | `#16213e` (Deep Blue)                                    | Cards, modals, sidebars                    |
| `color-surface-hover`      | `#0f3460` (Lighter Blue)                                 | Hover states for surface elements          |
| `color-text-primary`       | `#e94560` (Soft Red) -> changed to `#EDEDED` (Off-White) | _Correction: High contrast text on dark._  |
| `color-text-muted`         | `#94a3b8` (Slate 400)                                    | Secondary text, captions                   |
| `color-border`             | `#334155` (Slate 700)                                    | Dividers, inputs                           |
| `color-error`              | `#ef4444` (Red 500)                                      | Error states, "Naas" days                  |
| `color-success`            | `#22c55e` (Green 500)                                    | Success states, "Hari Baik"                |

_Note: The palette is derived from a "Night Sky" aesthetic with Gold stars._

### 1.2 Typography

**Font Family 1: Headings (Mysterious/Ancient)**

- **Name**: `Cinzel` (Google Font)
- **Weights**: 700 (Bold), 500 (Medium)
- **Usage**: H1, H2, Hero Sections, "Weton" results.

**Font Family 2: Body (Readable/Modern)**

- **Name**: `Inter` (Google Font)
- **Weights**: 400 (Regular), 600 (SemiBold)
- **Usage**: Paragraphs, Interface Text, Inputs.

| Token          | Size            | Line Height | Weight | Font   |
|:---------------|:----------------|:------------|:-------|:-------|
| `text-display` | 2.25rem (36px)  | 1.1         | 700    | Cinzel |
| `text-h1`      | 1.875rem (30px) | 1.2         | 700    | Cinzel |
| `text-h2`      | 1.5rem (24px)   | 1.3         | 600    | Cinzel |
| `text-body`    | 1rem (16px)     | 1.5         | 400    | Inter  |
| `text-small`   | 0.875rem (14px) | 1.5         | 400    | Inter  |

### 1.3 Spacing & Radius

- **Base Unit**: `4px` (0.25rem)
- **Radius (Rounded)**: `0.5rem` (8px) standard. `1rem` (16px) for large cards.

---

## 2. Components

### 2.1 Buttons

**Primary Button**

- **Bg**: `color-primary` (Gold)
- **Text**: `color-primary-foreground` (Black)
- **Hover**: Brighten + Scale (1.05)
- **Shape**: Rounded (`0.5rem`)
- **Font**: Inter, SemiBold
- **Shadow**: Glow effect (`box-shadow: 0 0 10px #FFD700`)

**Ghost/Secondary Button**

- **Bg**: Transparent
- **Text**: `color-primary` (Gold)
- **Border**: `1px solid color-primary`

### 2.2 Cards (Batik Surface)

- **Bg**: `color-surface` with subtle CSS pattern overlay (optional opacity).
- **Border**: `1px solid color-border`
- **Padding**: `p-6` (1.5rem)
- **Effect**: "Glassmorphism" optional for specific mystical overlays.

### 2.3 Inputs (Date/Select)

- **Bg**: `color-background` (Darker than surface)
- **Border**: `color-border`
- **Focus**: Ring `2px` `color-primary`
- **Text**: `color-text-primary`

---

## 3. UI Patterns

### 3.1 The "Oracle" Layout

- **Center Stage**: Input fields are central and focused.
- **Result Reveal**: Results fade in with a mystical animation (slow ease-in).
- **Chat Interface**: Fixed bottom input, scrolling history above. "Mbah" avatar on left.

### 3.2 Result Presentation

- **Weton Card**:
    - Top: Gregorian Date
    - Middle: **Weton Name** (Large Cinzel Font, Gold)
    - Bottom: Neptu Value (Badge)

---

## 4. Accessibility (A11y)

- **Contrast**: Ensure Gold text on Dark Slate meets 4.5:1 ratio. (Gold `#FFD700` on `#1a1a2e` is ~14:1 ✅).
- **Focus States**: All interactive elements must have visible focus rings.
- **ARIA**: Date pickers and dynamic results must announce changes.
