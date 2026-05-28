# Figma Make — SSING 소비자 앱 합본 (Reference 기반 v2)

> Toss · Apple Music · Linear · Strava 4개 reference 기반 재생성용. 9개 화면 자기완결 코드블록. 던질 화면 코드블록 ``` 내부 ```만 통째 복사해서 Figma Make에 붙여넣기.
>
> **v1 대비 변경**: Reference 앱 명시 추가, font-weight 강제 (900 금지), 그라데이션·컬러 그림자 제한, 황금색 제거, 가격 표기 정상화, line-through 금지.

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

## <a name="c1"></a>C1 — Home

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone, approachable but
trustworthy, never playful-cute.

You decide the composition — layout, component choices, spacing, ratios,
decorative elements. Constraints below define the design system, not layout.

## REFERENCE APPS (apply these visual languages)

Take quality and composition inspiration from these specific apps. Borrow
their visual language and discipline. Do NOT copy their content.

1. Toss (Korean fintech, gold-standard Korean mobile UX) — clean white
   surfaces, strong typography hierarchy through WEIGHT and SIZE not
   color, tabular numerals everywhere money/time appears, restraint over
   decoration, subtle micro-interactions, masterful Korean typography.

2. Apple Music / Apple Wallet — display 28-44px headings carrying weight
   without color decoration, sectioned dense information without clutter,
   round 12-20px, tabular numerals, generous line-height, content over
   chrome.

3. Linear — gradient discipline (gradients appear in only 1-2 deliberate
   spots per screen, never as wallpaper), minimalist + density balance,
   subtle transitions, restraint as the dominant aesthetic.

4. Strava — for metric/number presentation only: large prominent numbers
   with tabular alignment, athletic clarity in numerical content. Do NOT
   borrow Strava's dark mode or saturated palette — SSING stays white-led.

QUALITY BAR: If placed next to a Toss or Apple Music screen, the SSING
screen should look like it belongs in the same visual tradition — not like
a generic SaaS dashboard.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS (no off-palette colors)
Brand: #2563EB / #1E40AF (deep)
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C

NO gold (#FFD700/#FFA500), no off-brand accents.

## TYPOGRAPHY
Pretendard with Apple SD Gothic Neo / Noto Sans KR fallback. Korean primary.
Display 28-44 / 700 — hero headings.
Heading Large 22 / 700 — sheet headers, section heads.
Heading 18 / 600.
Subtitle 16 / 600. Body 14-16 / 400. Caption 12-13 / 400.
Micro 11 / 600 letter-spacing 0.12em ALL CAPS — brand accents.

WEIGHTS USED: 700, 600, 400 ONLY. NEVER 800 or 900 (no font-black).
Tabular numerals required for money, time, metrics, occupancy counts.

## COMPONENT TOKENS
Radius: 8 / 12 / 16 / 20 / 9999.
Primary button: ~52px tall, #191919 text on Brand Blue (never white on Brand).
Inputs: #F5F6F7 bg, no border, 12px radius, 14×16 padding.
Cards: white, 1px #E5E6E8, 12px radius, 16px padding.
Bottom sheet: 20px top radius, shadow 0 -4px 16px rgba(0,0,0,0.10).
Bottom tab: white, 1px #E5E6E8 top border, 11/500 labels, active #191919.

## SPACING: 8px base — 4, 8, 12, 16, 20, 24, 32. Whitespace is expensive.

## SHADOWS
Flat by default (border-defined). Neutral black-based shadows only —
shadow-sm / shadow-md / shadow-lg.
NO COLORED SHADOWS (no `shadow-[#color]/opacity` patterns).

## GRADIENTS
ALLOWED: Brand Blue gradient (#2563EB → #1E40AF) on the single primary
CTA per screen, AND on the two mode-entry cards on C1 (Instant +
Reservation).
FORBIDDEN: secondary buttons, badges, chips, labels, cards, indicators,
dialog buttons, payment icons, metric tiles, decorative blobs, success
banners, viewer pills, grade badges.

## VOICE & TONE
해요체. Short noun-verb. No 오류가 발생했습니다, no exclamation pressure,
no marketing superlatives, no English-first strings.

## NO EMOJI (absolute)
Zero emoji anywhere. Use Lucide / Tabler outline icons only.

## NO UNREQUESTED CHROME
No greetings, no rhetorical question headers, no motivational copy, no
decorative hero blocks unless the Screen Prompt explicitly requests them.

## ICONOGRAPHY
Lucide / Tabler outline 1.5-2px stroke. 16 inline / 18 button / 24 standalone.

## PRICE FORMATTING
ALWAYS `₩{price.toLocaleString()}원` — never `₩{n}천원`.
NEVER line-through on baseline prices.

## PRINCIPLES (Toss + Apple discipline)
1. Restraint over decoration.
2. Typography hierarchy via weight + size, not color saturation.
3. Brand Blue is a beacon (one accent per screen).
4. Black #191919 is the grown-up half.
5. Whitespace is the most expensive material.
6. Round geometry without playfulness.
7. Icons only, never emoji.
8. Don't fabricate chrome.

---

## SCREEN: C1 — HOME

PURPOSE
First screen on app launch. The user makes one decision: which matching
mode to use — Instant Lesson (request now, get matched in real time) or
Reservation Lesson (request a future time slot). Pure entry / decision point.

ENTRY POINTS
- App cold start (after onboarding)
- Bottom-nav "Home" tap
- Return from post-lesson rating screen

INFORMATION TO DISPLAY
- Currently detected ski resort (auto-located, e.g. "지산리조트")
- Unread-notification indicator on a notification bell affordance
- Ongoing-matched-lesson indicator — ONLY when active confirmed match
  exists. Shows time + instructor name. Tappable.
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
- No real-time counts (instructor count, room count, average matching
  time, etc.) — algorithm runs after C2.
- No "1시간 내 시작" or "2시간 후부터 예약 가능" or any time-window meta
  on the mode cards.
- The two mode entry points are the screen's primary purpose.
- Instant Lesson MUST visually dominate. The Instant block is noticeably
  larger than Reservation block AND than the ongoing-match indicator.
- Ongoing-match indicator is a COMPACT horizontal strip (44-56px tall),
  neutral surface (#F5F6F7), no gradient, no separate sub-button — the
  whole strip is tappable.
- No greeting copy, no rhetorical headers ("안녕하세요" forbidden).
- No real-time data, no search, no input fields.

DESIGNER DECISIONS
- How to express the two mode entries (within DESIGN constraints)
- Layout proportions
- Status bar / home indicator treatment
```

---

## <a name="c2"></a>C2 — Request Input

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone, approachable but
trustworthy, never playful-cute.

You decide composition. Constraints below define the design system.

## REFERENCE APPS
1. Toss — clean white forms, strong typography hierarchy via WEIGHT
   not color, restrained interactions, masterful Korean form UX.
2. Apple Music / Apple Wallet — sectioned info without clutter, generous
   whitespace, round 12-20px.
3. Linear — gradient discipline (1-2 spots max), minimalism.
4. Strava — large clear metric/number presentation only. Stay white-led.

QUALITY BAR: comparable to a Toss form screen, not a generic SaaS form.

## DEVICE
iPhone 15 Pro, 393 × 852, portrait. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand: #2563EB / #1E40AF
Text: #000000 / #191919 / #26282B / #4B4F54 / #76787A / #A2A4A6
Surfaces: #FFFFFF / #F5F6F7 / #EBECED
Borders: #E5E6E8 / #D1D3D5
Semantic: #0FB882 / #3478F6 / #FF8A00 / #F5444C
NO gold, no off-palette colors.

## TYPOGRAPHY
Pretendard with Korean fallback. Display 28-44/700, Heading 18-22/600-700,
Body 14-16/400, Caption 12-13/400, Micro 11/600 letter-spacing 0.12em.
WEIGHTS: 700, 600, 400 ONLY. Never 800 or 900. Tabular numerals.

## COMPONENT TOKENS
Radius: 8 / 12 / 16 / 20 / 9999. Primary button ~52px #191919 on Brand
(never white on Brand). Inputs #F5F6F7 bg, no border, 12px, 14×16.
Cards white 1px #E5E6E8 12px 16px.

## SPACING: 8 base — 4 8 12 16 20 24 32. Generous whitespace.

## SHADOWS: Flat by default. Neutral only (shadow-sm/md/lg). NO COLORED SHADOWS.

## GRADIENTS
ALLOWED: Brand Blue gradient on ONE primary CTA only (submit).
FORBIDDEN: chips, segmented controls, badges, sections, anywhere else.

## VOICE & TONE
해요체. Short noun-verb. No marketing superlatives.

## NO EMOJI. NO UNREQUESTED CHROME (no greetings, no rhetorical headers).

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px.

## PRINCIPLES
Restraint. Weight-based hierarchy. Brand Blue as beacon. Whitespace
expensive. Icons only.

---

## SCREEN: C2 — REQUEST INPUT

PURPOSE
User inputs lesson requirements so the algorithm can curate a personalized
pool. Submission triggers algorithm and routes to C3 (instant) or C5
(reservation), both in loading state.

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
- Mode visible at all times
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
- Section labels: 종목, 레벨, 인원, 시간, 시작 시간 (reservation), 장소,
  강습받는 사람
- Discipline: 스키 / 보드
- Level: 입문 / 초급 / 상급
- Level placeholder: "특별히 알려주고 싶은 점이 있으면 적어주세요"
- Duration: 2시간 / 3시간 / 4시간
- Per-participant: 나이, 성별
- Gender: 남 / 여
- Submit (instant): "강사 매칭 시작"
- Submit (reservation): "방 매칭 시작"

CONSTRAINTS
- Substantial input load — composition should feel manageable, not
  overwhelming. Sequencing, grouping, progressive disclosure all valid.
- Group-size change → smooth slot add/remove.
- Submit is the most prominent action.
- Mode context visible at all times.
- Do NOT show any algorithm output (counts, times, prices).
- Submission feels decisive.
- All selected chip/segment states are SOLID Brand Blue background with
  white text — no gradients on selected states.

DESIGNER DECISIONS
- Form structure (single scroll, stepper, sections, sheets)
- Input rendering (chips, segmented, picker, stepper)
- Mode context surfacing
- Per-participant repeated input layout
- Submit placement
- Field defaults
```

---

## <a name="c3"></a>C3 — Instructor Pool (Instant)

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure, never playful-cute.

You decide composition. Constraints define the design system.

## REFERENCE APPS
1. Toss — clean white card lists, strong number hierarchy.
2. Apple Music / Apple Wallet — sectioned card composition, large
   readable typography, restraint.
3. Linear — gradient discipline, sublist density balance.
4. Strava — for instructor metrics ONLY: large tabular numbers,
   athletic clarity. Stay white-led.

QUALITY BAR: Toss/Apple list quality.

## DEVICE: iPhone 15 Pro 393×852. Safe area 59/34.

## COLOR TOKENS
Brand #2563EB/#1E40AF. Text #000/#191919/#26282B/#4B4F54/#76787A/#A2A4A6.
Surfaces #FFF/#F5F6F7/#EBECED. Borders #E5E6E8/#D1D3D5.
Semantic #0FB882/#3478F6/#FF8A00/#F5444C.
NO gold, no off-palette.

## TYPOGRAPHY
Pretendard. Display 28-44/700, Heading Large 22/700, Heading 18/600,
Subtitle 16/600, Body 14-16/400, Caption 12-13/400, Micro 11/600 0.12em.
WEIGHTS: 700, 600, 400 ONLY. Tabular numerals.

## COMPONENT TOKENS
Radius 8/12/16/20/9999. Cards white 1px #E5E6E8 12-16px radius 16px padding.
Bottom tab white 1px #E5E6E8 top.

## SHADOWS: Flat or neutral only. NO COLORED SHADOWS.

## GRADIENTS
FORBIDDEN on every card, badge, chip, label.
Brand Blue gradient OK only on a single primary CTA (none on this screen
unless a direct match action is the primary).

## NO EMOJI. NO UNREQUESTED CHROME.

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px.

## PRICE FORMATTING: ALWAYS `₩{price.toLocaleString()}원`.

---

## SCREEN: C3 — INSTRUCTOR POOL (Instant)

PURPOSE
Personalized pool of instructors filtered by user conditions, LIVE
(instructors enter/leave in real time). Viewer badges for shared visibility.

ENTRY POINTS
- C2 submission with mode=instant.

INFORMATION TO DISPLAY
- Compact request summary (discipline, level, group size, duration)
- Live count of instructors
- 1-hour pool validity (gentle, no countdown)
- Sort control
- Instructor cards: name/nickname, grade (1-5), rating /5, re-booking
  rate %, distance, price ₩70,000원, viewer badge when 2+ viewers,
  optional photo or anonymous avatar.

USER ACTIONS
- Tap card → C4
- Change sort
- Back → C2 (input preserved)
- Pull-to-refresh

LIVE BEHAVIOR
- WebSocket/SSE updates.
- New cards fade in. Departed fade out, reflow smoothly.
- Viewer badge count updates live.

EXACT KOREAN COPY
- Loading: "조건에 맞는 강사를 찾고 있어요"
- Active header: "조건에 맞는 강사 N명"
- Request prefix: "내 요청 ·"
- Viewer badge: "N명이 같이 보고 있어요"
- Price prefix: "1:1 강습"
- Sort: 추천순 / 등급순 / 평점순 / 거리순 / 가격순
- Empty: "조건에 맞는 강사가 아직 없어요" + "강사 등장 시 알림 받기"
- Expiry: "매칭 가능 시간이 끝났어요" + "다시 요청하기"

CONSTRAINTS
- LIVE feel structural — smooth entry/exit.
- Viewer badge is adaptive info, not aggressive scarcity.
- No "추천 강사" badges or featured labels — sorting determines order.
- Cards use neutral 1px border emphasis, not gradients, for featured
  state if needed.
- No fabricated data.
- No greetings.
- Grade label is SOLID Brand Blue or solid #191919 with white text —
  no gold, no orange gradient.
- 1h window is discoverable but not anxiety-inducing.

DESIGNER DECISIONS
- Card layout (vertical list, horizontal cards, density)
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
lesson matching platform. Friendly infrastructure, never playful-cute.

You decide composition. Constraints define the design system.

## REFERENCE APPS
1. Toss — clean white surface, strong number hierarchy in metrics.
2. Apple Music — display headings, sectioned info, large tabular figures.
3. Linear — restraint, gradient discipline.
4. Strava — for the 4-metric tile row ONLY: large prominent numbers with
   tabular alignment, athletic clarity. Stay white-led.

QUALITY BAR: profile screen comparable to Toss certificate detail or
Apple Music artist page.

## DEVICE: iPhone 15 Pro 393×852.

## COLOR TOKENS
Brand #2563EB/#1E40AF. Text #000/#191919/#26282B/#4B4F54/#76787A/#A2A4A6.
Surfaces #FFF/#F5F6F7/#EBECED. Borders #E5E6E8/#D1D3D5.
Semantic #0FB882/#3478F6/#FF8A00/#F5444C.
NO gold (#FFD700/#FFA500 forbidden).

## TYPOGRAPHY
Pretendard. Display 28-44/700, Heading 22/700, 18/600, Body 14-16/400,
Caption 12-13/400, Micro 11/600 0.12em.
WEIGHTS 700/600/400 ONLY. Tabular numerals.

## COMPONENT TOKENS
Radius 8/12/16/20/9999. Primary button ~52px #191919 on Brand.
Cards white 1px #E5E6E8.

## SHADOWS: Flat / neutral only. NO COLORED SHADOWS.

## GRADIENTS
ALLOWED: ONE Brand Blue gradient on the bottom "매칭 시작" CTA.
FORBIDDEN: metric tiles, grade badge, avatar background, certifications,
reviews, anywhere else.

## NO EMOJI. NO UNREQUESTED CHROME. NO line-through on prices.

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px.

## PRICE FORMATTING: ALWAYS `₩{price.toLocaleString()}원`.

---

## SCREEN: C4 — INSTRUCTOR PROFILE

PURPOSE
Detailed profile when user taps a C3 card. Review enough info to commit
to "매칭 시작" → C7 payment.

ENTRY POINTS
- C3 instructor card tap.

INFORMATION TO DISPLAY
Profile header:
- Photo or anonymous avatar
- Name/nickname
- Grade (1-5) as solid label/badge
- One-line self-introduction

Core metrics (4-tile row, Strava-style number prominence):
- Rating (out of 5, stars)
- Cumulative lesson count
- Re-booking rate (%)
- Distance

Pricing:
- 1:1 baseline P = ₩70,000원
- Per-person cost from price model A: per-person = [P + (n-1) × α] / n,
  α = ₩17,500. Examples: n=1→₩70,000원 / n=2→₩43,750원 / n=3→₩35,000원
- License-fee caption (instructor bears it).

Self-introduction body:
- Full text, expandable
- Certifications / experience

Reviews:
- Count + scrollable list (rating, text, time)

Viewer badge:
- "N명이 같이 보고 있어요" (2+ viewers)

USER ACTIONS
- "매칭 시작" → C7 with lock-in
- Expand/collapse intro
- Photo enlarge (when present)
- Scroll reviews
- Back → C3

EXACT KOREAN COPY
- Match CTA: "매칭 시작"
- "평점" / "재예약" / "누적 강습" / "거리"
- Price: "1:1 강습 ₩70,000원" / "1인 부담 ₩{n}원" (group ≥ 2)
- License caption: "패찰비는 강사가 부담해요"
- Reviews header: "강습 후기"
- Reviews empty: "아직 후기가 없어요"
- Certifications: "자격·경력"
- Viewer badge: "N명이 같이 보고 있어요"
- New instructor: "신규 강사예요"

CONSTRAINTS
- "매칭 시작" is the primary action.
- Per-person cost depends on group size — clear so user sees actual pay.
- Reviews critical — don't bury.
- Grade label is SOLID #191919 or SOLID Brand Blue with white text. No
  gold, no orange gradient.
- Metric tiles use neutral borders. No gradient fills, no colored shadows.
- Star icons use #FF8A00 (warm semantic) — solid fill, no gradient.
- Avatar background neutral #F5F6F7 only, no gradient.
- Prices in `₩{n.toLocaleString()}원` format.

DESIGNER DECISIONS
- Profile header composition
- Grade rendering (within constraints above)
- Core metrics layout (4 tiles is canonical)
- Pricing presentation
- Reviews layout
- CTA placement (sticky bottom recommended)
```

---

## <a name="c5"></a>C5 — Reservation Room List

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure, never playful-cute.

You decide composition. Constraints define the design system.

## REFERENCE APPS
1. Toss — clean list with strong typographic emphasis.
2. Apple Music / Wallet — card composition, sectioned info.
3. Linear — gradient discipline.
4. Strava — for occupancy/time metric clarity only. Stay white-led.

QUALITY BAR: Toss-grade list discipline.

## DEVICE: iPhone 15 Pro 393×852.

## COLOR TOKENS
Brand #2563EB/#1E40AF. Text/Surfaces/Borders/Semantic — as documented.
NO gold.

## TYPOGRAPHY
Pretendard. Display 28-44/700, Heading 18-22/600-700, Body 14-16/400,
Caption 12-13/400, Micro 11/600 0.12em.
WEIGHTS 700/600/400 ONLY. Tabular numerals.

## COMPONENT TOKENS
Radius 8/12/16/20/9999. Cards white 1px #E5E6E8.

## SHADOWS: Flat / neutral only. NO COLORED SHADOWS.

## GRADIENTS
FORBIDDEN on cards, badges, chips, sort pills.

## NO EMOJI. NO UNREQUESTED CHROME.

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px.

## PRICE FORMATTING: ALWAYS `₩{price.toLocaleString()}원`.

---

## SCREEN: C5 — RESERVATION ROOM LIST

PURPOSE
Personalized list of open rooms filtered by user conditions (including
start time). LIVE — new rooms open, full/closed rooms leave.

ENTRY POINTS
- C2 submission with mode=reservation.

INFORMATION TO DISPLAY
- Request summary (discipline, level, group size, duration + start time)
- Live count of rooms
- Sort control
- Room cards: instructor summary (name, grade, rating), room start time,
  occupancy "N/M명", multi-match label, price (per-person multi or 1:1
  solo), time-limit (multi rooms after first entrant), viewer badge (2+).

USER ACTIONS
- Tap card → C6
- Change sort
- Back → C2
- Refresh

LIVE BEHAVIOR
- New rooms fade in. Full/closed fade out.
- Occupancy + viewer count live.

EXACT KOREAN COPY
- Loading: "조건에 맞는 방을 찾고 있어요"
- Active header: "조건에 맞는 방 N개"
- Request prefix: "내 요청 ·"
- Occupancy: "N/M명"
- Multi-on label: "다중 매칭"
- Multi-off label: "1:1 단독"
- Time-limit prefix: "추가 입장 ~ HH:MM"
- Price (multi): "1인 부담 ₩{n.toLocaleString()}원"
- Price (solo): "1:1 ₩{n.toLocaleString()}원"
- Viewer badge: "N명이 같이 보고 있어요"
- Empty: "조건에 맞는 방이 아직 없어요" + "방 열림 시 알림 받기"
- Sort: 추천순 / 시간순 / 등급순 / 평점순 / 가격순

CONSTRAINTS
- LIVE feel.
- Multi-match label is a solid #0FB882 fill OR solid #191919 fill with
  white text — no gradients.
- Grade label same — solid Brand or solid #191919.
- Time-limit discoverable but not anxiety-inducing.
- Viewer badge gentle.
- No fabricated data.
- Prices in toLocaleString format.

DESIGNER DECISIONS
- Card layout
- Sort placement
- Loading composition
- Occupancy rendering (text, progress bar, dots, etc.)
- Multi vs solo signaling within constraints
```

---

## <a name="c6"></a>C6 — Room Detail

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure, never playful-cute.

You decide composition. Constraints define the design system.

## REFERENCE APPS
Toss, Apple Music, Linear, Strava (number/occupancy clarity only).
Stay white-led.

## DEVICE: iPhone 15 Pro 393×852.

## COLOR TOKENS — as documented. NO gold.

## TYPOGRAPHY
Pretendard. WEIGHTS 700/600/400 ONLY. Tabular numerals.

## COMPONENT TOKENS
Radius 8/12/16/20/9999. Cards white 1px #E5E6E8. Modal centered white 16px radius.

## SHADOWS: Flat / neutral only. NO COLORED SHADOWS.

## GRADIENTS
ALLOWED: Brand Blue gradient on ONE primary CTA (입장하기).
FORBIDDEN: room info card, occupancy block, multi label, dialog buttons,
anywhere else.

## NO EMOJI. NO UNREQUESTED CHROME.

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px.

## PRICE FORMATTING: ALWAYS `₩{price.toLocaleString()}원`.

---

## SCREEN: C6 — ROOM DETAIL

PURPOSE
Detailed view of a reservation room. Entry action triggers multi-match
consent dialog with branching by first vs subsequent entrant.

ENTRY POINTS
- C5 room card tap.

INFORMATION TO DISPLAY
Instructor summary:
- Name, grade, rating, re-booking rate
- One-line intro
- Link to full profile (C4)

Room info:
- Start time, duration
- Discipline / accepted levels
- Max capacity M
- Current occupancy (live, N/M)
- Multi-match ON/OFF
- Price (per-person multi / baseline solo). Final confirms at occupancy lock.
- Time-limit (multi-on, after first entrant)
- License-fee caption

Current entrants (if any):
- Anonymized — "OO세 / 성별" only

Viewer badge:
- "N명이 같이 보고 있어요" (2+ viewers)

USER ACTIONS
- "입장하기" → multi-match consent dialog (branching):
  - FIRST entrant (occupancy = 0): "다른 사람을 추가로 받고 페이를 나눠
    내시겠습니까?" → 함께 들을게요 → multi → C7 / 혼자 들을게요 (1:1)
    → solo → C7
  - SUBSEQUENT entrant (occupancy ≥ 1): "다른 사람들과 함께 들어야 하는
    방입니다. 괜찮으십니까?" → 입장할게요 → C7 / 취소 → back to C5
- "강사 프로필 보기" → C4
- Back → C5
- If multi-match OFF: skip dialog, direct 1:1 entry.

EXACT KOREAN COPY
- Entry CTA: "입장하기"
- First dialog header: "다중 매칭 동의"
- First dialog body: "다른 사람을 추가로 받고 페이를 나눠 내시겠습니까?"
- First options: "함께 들을게요" / "혼자 들을게요 (1:1)"
- Subsequent header: "방 입장 확인"
- Subsequent body: "다른 사람들과 함께 들어야 하는 방입니다. 괜찮으십니까?"
- Subsequent options: "입장할게요" / "취소"
- Time-limit prefix: "추가 입장 ~ HH:MM"
- Price-confirm note: "인원 확정 시 가격이 확정돼요"
- Occupancy: "현재 N/M명"
- License caption: "패찰비는 강사가 부담해요"
- View profile: "강사 프로필 보기"
- Anonymous entrant: "OO세 · 남/여"
- Room closed: "방이 마감됐어요"

CONSTRAINTS
- Entry CTA unambiguous.
- Consent dialog follows exact branching.
- Entrant anonymity preserved.
- Per-person price reflects current occupancy with confirm note.
- Multi-OFF rooms: no dialog.
- Multi label and grade label are SOLID fills (no gradient).
- Dialog primary button uses solid Brand Blue or Brand Blue gradient;
  secondary is #F5F6F7 with #4B4F54 text.
- Prices in toLocaleString format.

DESIGNER DECISIONS
- Instructor summary composition
- Room info layout
- Entrants rendering
- Occupancy visualization
- Time-limit display
- Dialog composition
```

---

## <a name="c7"></a>C7 — Payment

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure, never playful-cute.

You decide composition. Constraints define the design system.

## REFERENCE APPS — payment is the showcase

1. Toss — apply MOST HEAVILY here. Toss is the global gold standard for
   Korean payment UX. Clean white, strong typography hierarchy on the
   payment amount, tabular numerals, restrained color, masterful
   payment-method selection.
2. Apple Wallet — receipt/transaction clarity, large prominent amount,
   clean sections.
3. Linear — restraint, gradient discipline.

QUALITY BAR: this screen should look like a Toss payment screen, period.

## DEVICE: iPhone 15 Pro 393×852.

## COLOR TOKENS — as documented. NO gold.

## TYPOGRAPHY
Pretendard. Display 32-44/700 for the amount. WEIGHTS 700/600/400 ONLY.
Tabular numerals MANDATORY for all monetary figures.

## COMPONENT TOKENS
Radius 8/12/16/20/9999. Primary button ~52-58px #191919 on Brand.
Cards white 1px #E5E6E8.

## SHADOWS: Flat / neutral only. NO COLORED SHADOWS.

## GRADIENTS
ALLOWED: Brand Blue gradient on the bottom "결제하기" CTA only.
FORBIDDEN: payment method tiles, instructor card, price breakdown card,
checkmarks, anywhere else.

## NO EMOJI. NO UNREQUESTED CHROME.

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px.

## PRICE FORMATTING: ALWAYS `₩{price.toLocaleString()}원`. NEVER `₩70 천원`.

## NO LINE-THROUGH on baseline prices.

---

## SCREEN: C7 — PAYMENT

PURPOSE
Payment for both instant and reservation matches. User confirms info,
sees price (price model A, SSING fee 0%), selects method, commits.
Lock-in active while on screen.

ENTRY POINTS
- C4 "매칭 시작" (instant)
- C6 "함께 들을게요" / "혼자 들을게요" / "입장할게요" (reservation)

INFORMATION TO DISPLAY

Instructor summary (brief):
- Name, grade, rating

Lesson info:
- Discipline, level, group size, duration
- Start time — "지금부터 1시간 내 강습" (instant) or date/time (reservation)
- Location (resort name)

Price breakdown (Toss-style clarity):
- 1:1 baseline price ₩70,000원 (DO NOT apply line-through)
- Per-person amount based on group size (price model A)
- For unfixed occupancy multi: "인원이 확정되면 정산해드려요"
- SSING fee: 0% (small note "SSING 수수료 없음" with #0FB882 shield icon)
- License-fee caption: instructor bears it

Payment method:
- Card / KakaoPay / Toss / etc
- Default = last-used

Terms:
- Payment terms, refund policy

USER ACTIONS
- Change payment method
- "결제하기" → process → C8 / failure retry
- View terms
- Back → confirmation dialog (lock release) → back

EXACT KOREAN COPY
- Payment CTA: "결제하기" (with amount inline: "₩43,750원 결제하기")
- Total prefix: "결제 금액"
- Per-person prefix: "1인 부담"
- Unfixed-occupancy: "인원이 확정되면 정산해드려요"
- Instant time: "지금부터 1시간 내 강습"
- Fee note: "SSING 수수료 없음"
- License caption: "패찰비는 강사가 부담해요"
- Terms header: "결제 약관"
- In progress: "결제하고 있어요"
- Failure: "결제가 되지 않았어요. 다시 시도해주세요"

CONSTRAINTS
- Payment CTA is primary action.
- Total amount uses tabular numerals and is highly prominent (32-44px /
  700). Toss-style.
- Price breakdown is TRANSPARENT — show baseline AND per-person as two
  clear rows. NO line-through on baseline (it's a multi-match cost split,
  not a discount).
- Unfixed occupancy note must be visible.
- Lock-in implicit. NO countdown timers, NO pressure copy.
- Back action confirms.
- Payment method selection uses neutral white tiles with Brand Blue
  border on selected (no gradient fill).
- Prices in `₩{n.toLocaleString()}원`.

DESIGNER DECISIONS
- Receipt-style summary composition
- Price breakdown row layout
- Payment method picker (cards, list, sheet)
- CTA placement (sticky bottom strongly recommended)
- Terms summary vs expanded
- Progress treatment
```

---

## <a name="c8"></a>C8 — Match Confirmed

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure, never playful-cute.

You decide composition. Constraints define the design system.

## REFERENCE APPS
1. Toss — calm transaction confirmation, restraint.
2. Apple Wallet — pass/ticket detail clarity.
3. Linear — restraint.

QUALITY BAR: like a Toss confirmation or Apple Wallet pass detail —
calm, complete, not celebratory.

## DEVICE: iPhone 15 Pro 393×852.

## COLOR TOKENS — as documented. NO gold.

## TYPOGRAPHY
Pretendard. WEIGHTS 700/600/400 ONLY. Tabular numerals.

## COMPONENT TOKENS
Radius 8/12/16/20/9999. Primary button ~52px #191919 on Brand.

## SHADOWS: Flat / neutral only. NO COLORED SHADOWS.

## GRADIENTS
ALLOWED: Brand Blue gradient on the primary "강사와 채팅" CTA only.
FORBIDDEN: success banner (must be calm), instructor card, info card,
anywhere else.

## NO EMOJI. NO UNREQUESTED CHROME.

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px. Success check icon
uses #0FB882 solid.

## PRICE FORMATTING: ALWAYS `₩{price.toLocaleString()}원`.

---

## SCREEN: C8 — MATCH CONFIRMED

PURPOSE
Confirmed-match screen after successful payment, or via C1 ongoing-match,
or push deep link, or History tab. Shows lesson details + chat entry.
After lesson ends → C9.

ENTRY POINTS
- C7 payment success
- C1 ongoing-match indicator tap
- Push deep link
- "내역" → ongoing match

INFORMATION TO DISPLAY

Confirmation status:
- CALM confirmed label + small #0FB882 check icon (20-28px). NOT a
  full-width gradient banner. Toss-style restraint.

Instructor info:
- Name, grade, rating
- Photo / anonymous avatar
- Tap → C4

Lesson info:
- Start time — "지금부터 1시간 내" or "MM월 DD일 HH:MM"
- Duration, discipline, level
- Group size (multi: anonymized companions)
- Location (resort)

Payment summary:
- Amount, method
- Receipt view affordance

Chat entry:
- 1:1 chat with instructor
- Last message preview, unread dot

Companions (multi-match only):
- Anonymous "OO세 · 남/여"

Cancellation:
- Cancel action with refund-policy note

USER ACTIONS
- Tap chat → enters chat
- Tap instructor → C4
- Tap cancel → cancellation dialog
- Tap receipt → modal
- Back/home → C1

EXACT KOREAN COPY
- Confirm label: "매칭 완료" or "예약 확정"
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
- Imminent banner: "곧 강습이 시작돼요"

CONSTRAINTS
- Confirmation is CALM-CONFIDENT, never celebratory.
- NO full-width green gradient banner. Use small #0FB882 check icon +
  18-22px heading "매칭 완료" + #76787A subtitle on white.
- Chat entry discoverable.
- Companions anonymized.
- Cancel reachable but quiet (small, low contrast).
- Prices in toLocaleString format.

DESIGNER DECISIONS
- Confirmation visual treatment (within calm constraint)
- Lesson detail composition
- Chat entry placement
- Companion presentation
- Cancellation placement
```

---

## <a name="c9"></a>C9 — Post-Lesson Rating

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure, never playful-cute.

You decide composition. Constraints define the design system.

## REFERENCE APPS
1. Toss — calm reflective interaction.
2. Apple Music — display heading + star/rating clarity.
3. Linear — restraint, gradient discipline.

QUALITY BAR: like Toss completion screen or Apple App Store review.

## DEVICE: iPhone 15 Pro 393×852.

## COLOR TOKENS — as documented. NO gold.

## TYPOGRAPHY
Pretendard. Display 28-32/700 for header. WEIGHTS 700/600/400 ONLY.

## COMPONENT TOKENS
Radius 8/12/16/20/9999. Star icons use icon component (Lucide/Tabler
outline), NOT emoji.

## SHADOWS: Flat / neutral only. NO COLORED SHADOWS.

## GRADIENTS
ALLOWED: Brand Blue gradient on "평가 제출" CTA when enabled.
FORBIDDEN: star rating label badge, rebook intention checkbox,
anywhere else.

## NO EMOJI (no star emoji, no face emoji). Icon-stars only.

## NO UNREQUESTED CHROME.

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px. Star icon filled state
uses #FF8A00 solid (no gradient).

---

## SCREEN: C9 — POST-LESSON RATING

PURPOSE
After lesson ends. User submits required rating, optional review,
optional re-booking intention. Updates instructor's rolling metrics.

ENTRY POINTS
- Auto-entry after lesson
- C8 trigger
- Push deep link

INFORMATION TO DISPLAY

Instructor info (brief):
- Name, photo/avatar

Lesson summary:
- Start time, discipline, level, group size
- If delayed entry: "OO일 전 강습" prefix

Rating input:
1. Star rating — 1 to 5 (icon-stars, large finger-friendly), required.
   Show level label on selection.
2. Written review — free text, optional.
3. Re-booking intention — single check.
4. Report — small secondary action.

USER ACTIONS
- Select star → enable submit, show label
- Type review
- Toggle re-booking
- Submit → save → C1
- "나중에 평가" → C1
- Report → separate flow

EXACT KOREAN COPY
- Header: "강습은 어떠셨어요?"
- Star prompt: "별점을 선택해주세요"
- Star labels — 1: "별로예요", 2: "아쉬워요", 3: "괜찮아요",
  4: "좋아요", 5: "최고예요"
- Review placeholder: "강습에서 좋았던 점, 아쉬웠던 점을 자유롭게
  적어주세요"
- Re-booking: "이 강사에게 다시 강습받고 싶어요"
- Report: "강사에 문제가 있어요"
- Submit: "평가 제출"
- Later: "나중에 평가"
- Post-submit: "평가가 등록됐어요. 감사해요."
- Time-since prefix: "OO일 전 강습"

CONSTRAINTS
- Star rating required. Submit disabled until selected.
- Tone is REFLECTIVE, not pressurizing.
- Review feels optional but invited.
- Re-booking is single-check binary.
- Report discoverable but small/low-contrast.
- NO celebratory or marketing language. Calm gratitude.
- NO emoji-stars or face-emoji. Icon-stars only (Lucide Star).
- Star level label uses neutral surface (#F5F6F7) with text color matching
  rating tier (#191919 for 4-5, #4B4F54 for 3, #76787A for 1-2). NO
  gradient label background.

DESIGNER DECISIONS
- Star size (large, finger-friendly, 40-56px)
- Rating label position
- Composition (scroll vs section)
- Submit placement (sticky bottom)
- Optional fields treatment
- Post-submit confirmation (toast vs sheet)
```
