# Functional Specification Document (FSD)

| Item             | Details     |
|:-----------------|:------------|
| **Project**      | PrimbonJava |
| **Version**      | 1.0         |
| **Status**       | Draft       |
| **Dependencies** | PRD v1.0    |

## 1. Functional Requirements

### 1.1 Core Calculations (Traditional)

| ID         | Feature              | Requirement                                                                                                                   | Acceptance Criteria                                                                                |
|:-----------|:---------------------|:------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| **FR-001** | **Weton Calculator** | System shall calculate Weton (Day + Market Day) and Neptu (Total Value) from a Gregorian Date.                                | Given DOB '1990-01-01', When calculated, Then return 'Senin Pon' and Neptu '11'.                   |
| **FR-002** | **Wedding Dates**    | System shall identify "Hari Baik" (Auspicious Days) based on couple's combined Weton and current Javanese month.              | Given Couple A & B, When requesting wedding dates, Then return list of dates avoiding "Naas" days. |
| **FR-003** | **Compatibility**    | System shall calculate compatibility score/description based on standard Javanese formulas (e.g., dividing neptu sum by 5/7). | Given Couple A & B, When matched, Then return result (e.g., "Tinari", "Padu") with interpretation. |
| **FR-004** | **Circumcision**     | System shall calculate auspicious dates for circumcision based on child's Weton.                                              | Given Child DOB, When requesting date, Then return safe dates in upcoming months.                  |

### 1.2 AI Oracle ("Mbah")

| ID         | Feature               | Requirement                                                                                                                | Acceptance Criteria                                                                                         |
|:-----------|:----------------------|:---------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------|
| **FR-005** | **AI Persona**        | AI Provider (Z.ai / GLM-4) shall adopt the persona of "Mbah" (The Elder): mystical, wise, authoritative, yet multilingual. | Given a prompt, The response style is 80% mystical/shamanic, 20% actionable advice.                         |
| **FR-006** | **Context Injection** | System must inject calculated Weton/Neptu data into the system prompt before sending user query to AI.                     | Given User 'Senin Pahing', When asking 'Career?', The prompt includes 'User is Senin Pahing (Neptu 13)...'. |
| **FR-007** | **Unrestricted**      | AI shall **not** filter "negative" topics (death, misfortune) but answer with warnings/wisdom.                             | Given a query about misfortune, AI answers directly without "I cannot start this conversation" blocks.      |

### 1.3 Data & Storage

| ID         | Feature           | Requirement                                                                       | Acceptance Criteria                                              |
|:-----------|:------------------|:----------------------------------------------------------------------------------|:-----------------------------------------------------------------|
| **FR-008** | **Local Storage** | System shall save User Profiles (Name, DOB) and recent History to `localStorage`. | When page reloads, Then previous user profiles are available.    |
| **FR-009** | **No Backend**    | All logic must execute client-side. No database connections.                      | Network tab shows only Z.ai API calls, no other server requests. |

## 2. Algorithms & Logic

### 2.1 Neptu Values (Standard Ref)

- **Days**: Minggu(5), Senin(4), Selasa(3), Rabu(7), Kamis(8), Jumat(6), Sabtu(9).
- **Markets**: Kliwon(8), Legi(5), Pahing(9), Pon(7), Wage(4).

### 2.2 Compatibility Formula (Example)

- `(Neptu A + Neptu B) % 7` = Remainder indicates fate (e.g., 1=Wasesa Segara, 2=Tunggak Semi...).

## 3. API Specification

### 3.1 Z.ai (GLM-4) Interface

- **Endpoint**: `https://open.bigmodel.cn/api/paas/v4/chat/completions` (Standard OpenAI-compatible).
- **Auth**: Bearer Token (User Input or build-time Env).
- **Model**: `glm-4-plus`.
- **Payload**:
  ```json
  {
    "model": "glm-4-plus",
    "messages": [
      {
        "role": "system",
        "content": "You are 'Mbah', a Javanese Elder/Shaman... [Persona Definition]"
      },
      { "role": "user", "content": "[Context: User is Senin Pon] [Query]" }
    ]
  }
  ```

## 4. User Interface (UI)

- **Theme**: `mystical-dark`.
- **Colors**: Gold (`#FFD700`) accents on Dark Slate (`#1a1a2e`) background.
- **Typography**: Serif headings (e.g., _Cinzel_ or _Playfair Display_), Sans-serif body.
- **Components**:
    - `DateInput` (Gregorian).
    - `ResultCard` (Batik pattern background).
    - `ChatInterface` (Streaming text response).
