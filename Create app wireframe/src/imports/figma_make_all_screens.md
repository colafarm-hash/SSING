# Figma Make — SSING 소비자 앱 합본 (전 화면)

> 9개 화면 각각 자기완결 코드블록. 던질 화면의 코드블록 ``` 내부 ```만 통째 복사해서 Figma Make 입력창에 붙여넣기. Base(디자인 시스템 토큰)는 각 코드블록에 포함되어 있어 단독 복사로 작동.

## 인덱스

| 화면 | 한 줄 설명 |
|---|---|
| [C1](#c1) | 홈 — 즉시/예약 모드 분기 |
| [C2](#c2) | 요청 입력 — 6+1항목 → 알고리즘 트리거 |
| [C3](#c3) | 강사 풀 (즉시) — 개인화 풀 + 뷰어 뱃지 + 실시간 입출 |
| [C4](#c4) | 강사 프로필 — 평점·후기·매칭 시작 |
| [C5](#c5) | 예약 방 목록 — 개인화 방 풀 |
| [C6](#c6) | 방 상세 — 다중매칭 동의 메커니즘 |
| [C7](#c7) | 결제 — 가격 모델 A, 락-인 |
| [C8](#c8) | 매칭 완료 — 확정 + 채팅 |
| [C9](#c9) | 강습 후 평가 — 평점·후기 |

---

## Base (공통 — 모든 코드블록에 포함됨)

각 코드블록은 아래 Base 시스템 블록 + 해당 화면 Screen 블록으로 구성됨. 변경 시 9개 코드블록 모두 갱신 필요.

---

## <a name="c1"></a>C1 — Home

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. The constraints below define the design system, not
the layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF (deep)
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600 letter-spacing
0.12em ALL CAPS. Weights: 700, 600, 400 only. Sentence-case. Tabular
numerals for money/time.

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue (never white)
- Inputs: #F5F6F7 bg, no border, 12px radius, 14×16 padding
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10),
  36×4 #E5E6E8 handle
- Bottom tab: white, 1px #E5E6E8 top border, 11/500 labels,
  active #191919 / inactive #A2A4A6

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default. No colored shadows.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere — decorative (👋, 😀, 🎿) or functional (✅, ⚠️, 🔔).
Use Lucide / Tabler outline icons.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless the Screen Prompt explicitly requests
them. The screen's specified content IS the screen.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface,
blue as sparing accent.

---

## SCREEN: C1 — HOME

PURPOSE
First screen on app launch. The user makes one decision: which matching
mode to use — Instant Lesson (request now, get matched in real time) or
Reservation Lesson (request a future time slot, get matched to an open
room). This screen is a pure entry / decision point.

ENTRY POINTS
- App cold start (after onboarding)
- Bottom-nav "Home" tap
- Return from post-lesson rating screen

INFORMATION TO DISPLAY
- Currently detected ski resort (auto-located by GPS, e.g. "지산리조트")
- Unread-notification indicator on a notification bell affordance
- An ongoing-matched-lesson indicator — ONLY when the user has an active
  confirmed match. Shows time + instructor name. Tappable.
- Two mode entry points: Instant Lesson and Reservation Lesson
- Bottom navigation (Home, History, Messages, Profile)

USER ACTIONS
- Tap location → ski-resort selector
- Tap bell → notification center
- Tap ongoing-match → C8
- Tap Instant Lesson → C2 with mode=instant
- Tap Reservation Lesson → C2 with mode=reservation
- Bottom-nav routing

EXACT KOREAN COPY
- "지금 강습" / "요청 즉시 강사 매칭"
- "예약 강습" / "원하는 시간에 강사 매칭"
- "지산리조트" (example)
- "오늘 14:00 · 김OO 강사" (example ongoing-match)
- Bottom-nav: 홈 / 내역 / 메시지 / 내 정보

CONSTRAINTS
- No real-time counts (instructor count, room count, etc.) — algorithm
  runs after C2.
- Two mode entry points are the screen's primary purpose.
- Instant Lesson MUST visually dominate (~60:40 visual weight vs
  Reservation). Reservation still feels premium, not faded.
- Ongoing-match indicator is compact and restrained — smaller than mode
  blocks.
- No greeting copy, no rhetorical question headers, no motivational
  subtitles. No "안녕하세요" or "오늘은 어떤 강습을 원하시나요?".
- No real-time data, no search, no input fields.

DESIGNER DECISIONS (you choose)
- How to express the two mode entries
- Layout proportions and spacing
- Decorative elements
- Ongoing-match indicator prominence
- Status bar / home indicator treatment
```

---

## <a name="c2"></a>C2 — Request Input

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints define the design system, not layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600 letter-spacing
0.12em ALL CAPS. Weights: 700, 600, 400. Sentence-case. Tabular numerals.

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue
- Inputs: #F5F6F7 bg, no border, 12px radius, 14×16 padding
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10)
- Bottom tab: white, 1px #E5E6E8 top, 11/500, active #191919 / inactive #A2A4A6

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere. Use Lucide / Tabler outline icons.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless explicitly requested.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface.

---

## SCREEN: C2 — REQUEST INPUT

PURPOSE
User inputs the requirements for their lesson so the matching algorithm
can curate a personalized pool. Submission triggers the algorithm and
routes to C3 (instant) or C5 (reservation), both in loading state.

ENTRY POINTS
- C1 Instant Lesson tap → mode = instant
- C1 Reservation Lesson tap → mode = reservation

INFORMATION TO COLLECT
Common (both modes):
1. Discipline — ski OR snowboard
2. Level — beginner / intermediate / advanced + optional free-text note
3. Group size — 1 to 5
4. Lesson duration — 2h / 3h / 4h
5. Location — ski resort (auto-detected, changeable)
6. Participant info — age + gender per participant (slots match group size)

Reservation only:
7. Start time — date + time, now+2h to now+3 months.

Instant mode does NOT collect start time (implicit "within 1h").

INFORMATION TO DISPLAY
- Mode the user came from, visible at all times
- Auto-detected resort with change affordance
- Submit affordance, enabled only when complete
- Back affordance returning to C1 (state preserved)

USER ACTIONS
- Select/modify any field
- Group size change → slots adjust
- Location tap → resort picker
- Submit → algorithm + route
- Back → C1, state preserved

EXACT KOREAN COPY
- Mode label: "즉시 강습" / "예약 강습"
- Section labels: 종목, 레벨, 인원, 시간, 시작 시간 (reservation),
  장소, 강습받는 사람
- Discipline: 스키 / 보드
- Level: 입문 / 초급 / 상급
- Level free-text placeholder: "특별히 알려주고 싶은 점이 있으면 적어주세요"
- Duration: 2시간 / 3시간 / 4시간
- Per-participant: 나이, 성별
- Gender: 남 / 여
- Submit (instant): "강사 매칭 시작"
- Submit (reservation): "방 매칭 시작"
- Off-season: "강습 시즌이 아니에요"
- Reservation out-of-range: "최소 2시간 후부터 예약 가능해요"

CONSTRAINTS
- Substantial input load (6-7 + per-participant). Composition should feel
  manageable, not overwhelming.
- Group-size change → smooth slot add/remove.
- Submit is the most prominent action, enabled when complete.
- Mode context visible at all times.
- Do NOT show matching results, counts, or any algorithm output.
- Submission feels decisive.

DESIGNER DECISIONS (you choose)
- Single form / stepper / multi-section / sheet steps
- Input rendering (chips, segmented, picker, stepper)
- Mode context surfacing
- Per-participant repeated input layout
- Sticky vs inline submit
- Progress indication
- Field defaults
```

---

## <a name="c3"></a>C3 — Instructor Pool (Instant)

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints define the design system, not layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600. Weights:
700, 600, 400. Sentence-case. Tabular numerals.

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue
- Inputs: #F5F6F7 bg, no border, 12px radius
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10)
- Bottom tab: white, 1px #E5E6E8 top, 11/500, active #191919 / inactive #A2A4A6

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere. Use Lucide / Tabler outline icons.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless explicitly requested.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface.

---

## SCREEN: C3 — INSTRUCTOR POOL (Instant Match Result)

PURPOSE
User arrives here immediately after submitting an instant-mode request.
The matching algorithm runs and produces a personalized pool filtered by
the 6 conditions. The pool is LIVE — instructors enter (going available)
and leave (matched elsewhere) in real time. Each card may show a viewer
badge for other users viewing the same instructor.

ENTRY POINTS
- C2 submission, mode=instant. Carries 6-condition payload.

INFORMATION TO DISPLAY

Screen meta:
- Compact request summary (discipline, level, group size, duration)
- Live count of instructors in the pool
- Pool validity window (1-hour instant window)
- A sort control

Each instructor card:
- Name or nickname
- Grade (1-5)
- Rating (out of 5)
- Re-booking rate (%)
- Distance
- Price P (₩70,000 1:1 baseline)
- Viewer badge "N명이 같이 보고 있어요" (2+ viewers)
- Optional photo or anonymous avatar

USER ACTIONS
- Tap card → C4 instructor profile
- (Optional) Direct match action → C7 with lock-in
- Change sort
- Back → C2 (input preserved)
- Pull-to-refresh

LIVE BEHAVIOR
- Pool updates via WebSocket/SSE.
- New cards fade in. Departed cards fade out, reflow smoothly.
- Viewer badge count updates live.
- Locked instructors are removed or visibly blocked.

EXACT KOREAN COPY
- Loading: "조건에 맞는 강사를 찾고 있어요"
- Active header: "조건에 맞는 강사 N명"
- Request summary prefix: "내 요청 ·"
- Viewer badge: "N명이 같이 보고 있어요"
- Price prefix: "1:1 강습 ₩"
- Sort: 추천순 / 등급순 / 평점순 / 거리순 / 가격순
- Empty: "조건에 맞는 강사가 아직 없어요" + "강사 등장 시 알림 받기"
- Expiry: "매칭 가능 시간이 끝났어요" + "다시 요청하기"

CONSTRAINTS
- LIVE feel is structural — composition supports smooth entry/exit.
- Viewer badge is adaptive info, not aggressive scarcity.
- No fabricated data (no platform-wide totals).
- No greetings or motivational copy.
- 1h validity is discoverable but not anxiety-inducing. No ticking
  countdowns.

DESIGNER DECISIONS (you choose)
- Card layout (vertical, grid, horizontal)
- Request summary placement
- Sort control placement
- Loading composition
- Viewer badge rendering
- How 1h window is communicated
```

---

## <a name="c4"></a>C4 — Instructor Profile

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints define the design system, not layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600. Weights:
700, 600, 400. Sentence-case. Tabular numerals.

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10)
- Bottom tab: white, 1px #E5E6E8 top, 11/500, active #191919 / inactive #A2A4A6

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere. Use Lucide / Tabler outline icons.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless explicitly requested.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface.

---

## SCREEN: C4 — INSTRUCTOR PROFILE

PURPOSE
Detailed instructor profile shown when the user taps a C3 card. Where
the user reviews enough info to commit to "매칭 시작" → C7 payment.

ENTRY POINTS
- C3 instructor card tap. Carries instructor_id + 6-condition context.

INFORMATION TO DISPLAY

Profile header:
- Photo or anonymous avatar
- Name/nickname
- Grade (1-5) as label/badge
- One-line self-introduction

Core metrics:
- Rating (out of 5, stars)
- Cumulative lesson count
- Re-booking rate (%)
- Distance

Pricing:
- 1:1 baseline P = ₩70,000
- Per-person cost from price model A: per-person = [P + (n-1) × α] / n,
  α = ₩17,500. Examples: n=1→₩70,000 / n=2→₩43,750 / n=3→₩35,000 /
  n=4→₩30,625 / n=5→₩28,000
- License-fee caption (instructor bears it, not user)

Self-introduction body:
- Full text, expandable
- Certifications / experience if present

Reviews:
- Count + scrollable list (rating, text, time)

Viewer badge:
- "N명이 같이 보고 있어요" (2+ viewers)

USER ACTIONS
- "매칭 시작" → C7 with lock-in
- Expand/collapse intro
- Photo enlarge (when present)
- Scroll reviews
- Back → C3 (card remains)

EXACT KOREAN COPY
- Match CTA: "매칭 시작"
- "평점" / "재예약" / "누적 강습" / "거리"
- Price: "1:1 강습 ₩" / "1인 부담 ₩" (group ≥ 2)
- License caption: "패찰비는 강사가 부담해요"
- Reviews header: "강습 후기"
- Reviews empty: "아직 후기가 없어요"
- Certifications: "자격·경력"
- Viewer badge: "N명이 같이 보고 있어요"
- New instructor: "신규 강사예요"
- Block modal: "이 강사는 방금 매칭이 시작됐어요" / "지금은 매칭이 어려워요"

CONSTRAINTS
- "매칭 시작" is the screen's primary action.
- Match-start triggers lock-in; feel decisive without anxiety.
- Per-person cost depends on group size — clear so user sees actual pay.
- Reviews are critical — don't bury.
- Instructor unavailable mid-view → blocking modal + return to C3.
- No greetings, no motivational copy, no fabricated metrics.

DESIGNER DECISIONS (you choose)
- Profile header composition
- Grade rendering
- Core metrics layout
- Pricing presentation
- Reviews layout
- CTA placement (sticky vs inline)
- Tabs/segments for sections
```

---

## <a name="c5"></a>C5 — Reservation Room List

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints define the design system, not layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600. Weights:
700, 600, 400. Sentence-case. Tabular numerals.

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10)
- Bottom tab: white, 1px #E5E6E8 top, 11/500, active #191919 / inactive #A2A4A6

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere. Use Lucide / Tabler outline icons.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless explicitly requested.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface.

---

## SCREEN: C5 — RESERVATION ROOM LIST

PURPOSE
User arrives after submitting a reservation-mode request. Algorithm
produces a personalized list of open rooms filtered by user conditions
(including desired start time). List is LIVE — new rooms open, full/
closed rooms leave. Each card may show a viewer badge.

ENTRY POINTS
- C2 submission, mode=reservation. Carries 6 base + start-time.

INFORMATION TO DISPLAY

Screen meta:
- Request summary (discipline, level, group size, duration + start time)
- Live count of rooms
- Sort control

Each room card:
- Instructor summary (name/nickname, grade, rating)
- Room start time
- Occupancy "N/M명"
- Multi-match label (multi-on vs solo-1:1)
- Price — per-person at current occupancy (multi) or 1:1 (solo)
- Time-limit (multi rooms, after first entrant)
- Viewer badge "N명이 같이 보고 있어요" (2+ viewers)

USER ACTIONS
- Tap card → C6
- Change sort
- Back → C2 (input preserved)
- Refresh

LIVE BEHAVIOR
- New rooms fade in.
- Full/closed rooms fade out.
- Occupancy + viewer count live.
- User's already-entered room shows "입장 중" state.

EXACT KOREAN COPY
- Loading: "조건에 맞는 방을 찾고 있어요"
- Active header: "조건에 맞는 방 N개"
- Request prefix: "내 요청 ·"
- Occupancy: "N/M명"
- Multi-on label: "다중 매칭" or "함께 듣기"
- Multi-off label: "1:1 단독"
- Time-limit prefix: "추가 입장 ~ HH:MM" or "타임리밋 OO분 남음"
- Price (multi): "1인 부담 ₩"
- Price (solo): "1:1 ₩"
- Viewer badge: "N명이 같이 보고 있어요"
- Empty: "조건에 맞는 방이 아직 없어요" + "방 열림 시 알림 받기"
- Sort: 추천순 / 시간순 / 등급순 / 평점순 / 가격순
- "입장 중" label for previously-entered rooms

CONSTRAINTS
- LIVE feel — smooth motion.
- Time-limit discoverable but not anxiety-inducing. No second-ticking.
- Viewer badge is gentle.
- Per-person price reflects CURRENT occupancy, not worst case.
- No greetings.
- No data that doesn't exist.

DESIGNER DECISIONS (you choose)
- Card layout
- Request summary surfacing
- Sort placement
- Loading composition
- Occupancy rendering
- Multi vs solo signaling
- Time-limit display
- Viewer badge rendering
```

---

## <a name="c6"></a>C6 — Room Detail

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints define the design system, not layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600. Weights:
700, 600, 400. Sentence-case. Tabular numerals.

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10)
- Modal/dialog: centered, white bg, 16px radius

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere. Use Lucide / Tabler outline icons.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless explicitly requested.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface.

---

## SCREEN: C6 — ROOM DETAIL

PURPOSE
Detailed view of a reservation room when user taps C5 card. Shows full
room info + instructor summary. The "입장하기" action triggers a
multi-match consent dialog with branching based on first vs subsequent
entrant.

ENTRY POINTS
- C5 room card tap. Carries room_id + 6+1-condition context.

INFORMATION TO DISPLAY

Instructor summary:
- Name/nickname, grade, rating, re-booking rate
- One-line intro
- Link to full profile (C4)

Room info:
- Start time, duration
- Discipline / accepted levels
- Max capacity (M)
- Current occupancy (live, N/M)
- Multi-match ON/OFF
- Price (per-person multi / baseline solo). Final confirms when
  occupancy locks.
- Time-limit (multi-on, after first entrant)
- License-fee caption

Current entrants (if any):
- Anonymized — "OO세 / 성별" only

Viewer badge:
- "N명이 같이 보고 있어요" (2+ viewers)

USER ACTIONS
- "입장하기" → multi-match consent dialog:
  - FIRST entrant (occupancy = 0): "다른 사람을 추가로 받고 페이를 나눠
    내시겠습니까?"
    - 함께 들을게요 → multi-match enter → C7
    - 혼자 들을게요 (1:1) → room becomes solo, closes → C7
  - SUBSEQUENT entrant (occupancy ≥ 1): "다른 사람들과 함께 들어야 하는
    방입니다. 괜찮으십니까?"
    - 입장할게요 → C7
    - 취소 → back to C5
- "강사 프로필 보기" → C4
- Back → C5

If multi-match OFF: skip dialog, direct 1:1 entry.

EXACT KOREAN COPY
- Entry CTA: "입장하기"
- First dialog header: "다중 매칭 동의"
- First dialog body: "다른 사람을 추가로 받고 페이를 나눠 내시겠습니까?"
- First options: "함께 들을게요" / "혼자 들을게요 (1:1)"
- Subsequent dialog header: "방 입장 확인"
- Subsequent dialog body: "다른 사람들과 함께 들어야 하는 방입니다.
  괜찮으십니까?"
- Subsequent options: "입장할게요" / "취소"
- Time-limit prefix: "추가 입장 ~ HH:MM"
- Price-confirm note: "인원 확정 시 가격이 확정돼요"
- Occupancy: "현재 N/M명"
- License caption: "패찰비는 강사가 부담해요"
- View profile: "강사 프로필 보기"
- Anonymous entrant: "OO세 · 남/여"
- Room closed: "방이 마감됐어요"

CONSTRAINTS
- Entry CTA unambiguous. Consent dialog follows exact branching.
- Entrant anonymity preserved — never names.
- Per-person price reflects current occupancy; "인원 확정 시 가격이
  확정돼요" caption visible.
- Multi-OFF rooms: no dialog, direct 1:1 entry.
- No greetings, no fabricated info.
- Room closes/full mid-view → blocking notice + route to C5.

DESIGNER DECISIONS (you choose)
- Instructor summary composition
- Room info layout
- Current entrants rendering
- Occupancy visualization
- Time-limit display
- Dialog composition (modal vs sheet)
- CTA placement
```

---

## <a name="c7"></a>C7 — Payment

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints define the design system, not layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600. Weights:
700, 600, 400. Sentence-case. Tabular numerals (esp. payments).

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10)
- Receipt-style card: white bg, 12-16px radius, tabular fares 24px+/700

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere. Use Lucide / Tabler outline icons.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless explicitly requested.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface.

---

## SCREEN: C7 — PAYMENT

PURPOSE
Payment for both instant and reservation matches. User confirms info,
sees price (price model A + SSING fee 0%), selects method, commits.
Success → C8. While on screen, the chosen instructor/room is locked
from other users.

ENTRY POINTS
- C4 "매칭 시작" (instant)
- C6 "함께 들을게요" (multi-match)
- C6 "혼자 들을게요" (solo after room closes)
- C6 "입장할게요" (subsequent entrant)

INFORMATION TO DISPLAY

Instructor summary (brief):
- Name/nickname, grade, rating

Lesson info:
- Discipline, level, group size, duration
- Start time — "지금부터 1시간 내 강습" (instant) or date/time (reservation)
- Location (resort name)

Price breakdown:
- 1:1 baseline P = ₩70,000
- Per-person from price model A based on group size / occupancy
- For unfixed-occupancy multi: "인원이 확정되면 정산해드려요"
- SSING fee: 0% (optional explicit "SSING 수수료 없음")
- License-fee caption: borne by instructor

Payment method:
- Card / KakaoPay / Toss / etc (PG TBD)
- Default = last-used

Terms:
- Payment terms, refund policy

USER ACTIONS
- Change payment method
- "결제하기" → process → success C8 / failure retry
- View terms
- Back → confirmation dialog (lock release) → if confirmed, route back

EXACT KOREAN COPY
- Payment CTA: "결제하기"
- Total prefix: "결제 금액 ₩"
- Per-person prefix: "1인 부담 ₩"
- Unfixed-occupancy: "인원이 확정되면 정산해드려요"
- Instant time: "지금부터 1시간 내 강습"
- Fee note (optional): "SSING 수수료 없음"
- License caption: "패찰비는 강사가 부담해요"
- Terms header: "결제 약관"
- In progress: "결제하고 있어요"
- Failure: "결제가 되지 않았어요. 다시 시도해주세요"
- Method change: "결제 수단 변경"
- Back confirmation: "결제를 취소하시겠어요? 다른 분이 이 강사를 매칭할
  수 있어요"

CONSTRAINTS
- Payment CTA is primary. Total uses tabular numerals.
- Price breakdown transparent — baseline, per-person, no-fee fact.
- Unfixed occupancy: 정산 note visible — no surprise adjustment.
- Lock-in implicit. No countdown timers ("결제 시간 5분 남음" — bad).
- Back-action confirmation must exist.
- No greetings, no motivational copy, no scarcity pressure.

DESIGNER DECISIONS (you choose)
- Receipt-style summary composition
- Price breakdown layout
- Payment method picker
- CTA placement
- Terms summary vs expanded
- Progress treatment
- Failure-state treatment
```

---

## <a name="c8"></a>C8 — Match Confirmed

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints define the design system, not layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 (success) / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600. Weights:
700, 600, 400. Sentence-case. Tabular numerals.

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10)
- Success indicator: #0FB882 for confirmed state badges

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere. Use Lucide / Tabler outline icons.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless explicitly requested.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface.

---

## SCREEN: C8 — MATCH CONFIRMED

PURPOSE
Confirmed-match screen after successful payment, or via C1 ongoing-match
tap, or push deep link, or History tab. Shows lesson details + chat
entry for meeting-spot agreement. After lesson ends → C9.

ENTRY POINTS
- C7 payment success
- C1 ongoing-match indicator tap
- Push deep link
- "내역" → ongoing match

INFORMATION TO DISPLAY

Confirmation status:
- Confirmed label + success indicator. Post-payment: emphasize
  completion. Later entry: tone down.

Instructor info:
- Name/nickname, grade, rating
- Photo / anonymous avatar
- Tap → C4

Lesson info:
- Start time — "지금부터 1시간 내" or "MM월 DD일 HH:MM"
- Duration, discipline, level
- Group size (if multi: anonymized companions)
- Location (resort name) — exact meeting spot in chat

Payment summary:
- Amount, method
- Receipt view affordance

Chat entry:
- 1:1 chat with instructor (separate screen, not in this wireframe set)
- Last message preview
- Unread dot

Companions (multi-match only):
- Anonymous "OO세 · 남/여", N people

Cancellation:
- Cancel action with refund-policy note

USER ACTIONS
- Tap chat → enters chat
- Tap instructor → C4
- Tap cancel → cancellation dialog (refund %) → confirm
- Tap receipt → modal
- Back/home → C1 (match active, surfaces in C1 ongoing bar)

EXACT KOREAN COPY
- Confirm label: "매칭 확정" or "강습 예약 완료"
- Post-payment heading (instant): "강사와 매칭됐어요"
- Post-payment heading (reservation): "예약이 확정됐어요"
- "강습 시간" / "장소" / "인원"
- Chat CTA: "강사와 채팅"
- Chat instruction: "만나는 슬로프와 시간을 채팅에서 정해주세요"
- Companion section: "함께 듣는 사람"
- Companion anonymous: "OO세 · 남/여"
- Receipt: "결제 내역 보기"
- Cancel: "강습 취소"
- Cancel dialog (24h+): "강습 OO시간 전입니다. 100% 환불돼요"
- Cancel dialog (close): "강습이 임박해 환불이 어려워요"
- Imminent banner: "곧 강습이 시작돼요"
- In progress: "강습 중"

CONSTRAINTS
- Confirmed status unambiguous.
- Chat entry discoverable (meeting-spot agreement required).
- Unfixed multi-occupancy: "인원 확정 대기 중" without alarming.
- Cancel reachable but not prominent — quiet.
- Companions anonymized.
- No greetings, no celebratory exclamation, calm-confident only.

DESIGNER DECISIONS (you choose)
- Confirmation treatment (full-screen success vs detail-forward)
- Lesson detail composition
- Chat entry placement
- Companion presentation
- Cancellation placement
- Just-confirmed vs ongoing-view differentiation
```

---

## <a name="c9"></a>C9 — Post-Lesson Rating

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone (think Kakao T):
approachable but trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints define the design system, not layout.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-32/700, Heading Large 22/700, Heading 18/600, Subtitle 16/600,
Body 14-16/400, CTA 16/600, Caption 12-13/400, Micro 11/600. Weights:
700, 600, 400. Sentence-case.

## COMPONENT TOKENS (when used)
- Radius: 8 / 12 / 16 / 20 / 9999
- Primary button: ~52px, #191919 text on Brand Blue
- Inputs: #F5F6F7 bg, no border, 12px radius, 14×16 padding
- Cards: white, 1px #E5E6E8, 12px radius, 16px padding
- Star rating: large interactive stars (finger-friendly), filled state
  uses Brand or #FF8A00

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32
## ELEVATION: Flat by default.

## VOICE & TONE
해요체. Short noun-verb phrases. No 오류가 발생했습니다, no exclamation
pressure, no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
No emoji anywhere — including star-emoji or face-emoji as rating glyphs.
Use Lucide / Tabler outline icon-stars.

## NO UNREQUESTED CHROME
No greetings, salutations, motivational copy, rhetorical question headers,
or decorative hero sections unless explicitly requested.

## ICONOGRAPHY
Lucide / Tabler outline, 1.5-2px stroke.

## PRINCIPLES
1. Brand Blue is a beacon. 2. Black is the grown-up half. 3. Glance, don't
read. 4. Reassure, don't pressure. 5. Generous whitespace. 6. Icons only.
7. Don't fabricate chrome.

## REFERENCE
Kakao T mobility app — friendly infrastructure, sober black-led surface.

---

## SCREEN: C9 — POST-LESSON RATING

PURPOSE
Reached after lesson ends (auto-triggered or user-triggered from C8 /
push). User submits required rating, optional review, optional re-booking
intention. Submission updates instructor's rolling rating and re-booking
metrics. Routes back to C1.

ENTRY POINTS
- Auto-entry after lesson completion
- C8 "강습 완료" trigger
- Push deep link

INFORMATION TO DISPLAY

Instructor info (brief):
- Name/nickname, photo/avatar
- Tap → C4

Lesson summary:
- Start/end time, discipline, level, group size
- If delayed entry: "OO일 전 강습" prefix

Rating input:
1. Star rating — 1 to 5, required. Shows level label on tap.
2. Written review — free text, optional but encouraged
3. Video feedback (S-1 pending) — optional attachment with caveat
4. Re-booking intention — single check "이 강사에게 다시 강습받고 싶어요"
5. Report — small secondary "강사에 문제가 있어요"

USER ACTIONS
- Select star → enable submit
- Type review
- Toggle re-booking
- Submit → save → C1
- "나중에 평가" → C1, incomplete in history
- Report → separate flow

EXACT KOREAN COPY
- Header: "강습은 어떠셨어요?"
- Star prompt: "별점을 선택해주세요"
- Star labels — 1: "별로예요", 2: "아쉬워요", 3: "괜찮아요",
  4: "좋아요", 5: "최고예요"
- Review placeholder: "강습에서 좋았던 점, 아쉬웠던 점을 자유롭게
  적어주세요"
- Video attach: "영상으로 피드백 받기"
- Re-booking: "이 강사에게 다시 강습받고 싶어요"
- Report: "강사에 문제가 있어요"
- Submit: "평가 제출"
- Later: "나중에 평가"
- Post-submit: "평가가 등록됐어요. 감사해요."
- History incomplete: "평가가 남았어요"
- Time-since prefix: "OO일 전 강습"

CONSTRAINTS
- Star rating required. Submit disabled until star selected.
- Tone is reflective, not pressurizing.
- Review feels optional but invited.
- Re-booking is single-check binary.
- Report discoverable but not prominent (small, low contrast).
- No celebratory/marketing language. Calm gratitude only.
- No emoji-stars or face-emoji. Icon-stars only.

DESIGNER DECISIONS (you choose)
- Star size (large, finger-friendly)
- Rating label position (inline vs below)
- Composition (scrolling form, sectioned, sheet)
- Submit placement (sticky vs inline)
- Optional fields treatment (collapsed vs always)
- Video attach UI
- Post-submit confirmation (toast vs sheet vs full-screen)
```
