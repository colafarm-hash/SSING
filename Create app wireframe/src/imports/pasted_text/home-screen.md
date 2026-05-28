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