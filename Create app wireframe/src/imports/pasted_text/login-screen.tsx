Add a new screen to the SSING project: O1 — Login.

This is the app entry screen shown ONCE before the first /home visit
(login required). Modern Korean mobile pattern (Toss-style, KakaoT-style):
no value-prop carousel, no multi-page onboarding, just login + a few
social options.

## ROUTE
- Path: `/login`
- Register in routes.tsx as the first route after imports.
- Make `/login` accessible without any auth gate (it IS the auth gate).
- For now (mock stage), do NOT add automatic redirect logic from `/` to
  `/login`. Just make `/login` reachable directly.

## DEVICE
iPhone 15 Pro frame, 393 × 852, portrait. Safe area top 59, bottom 34.

## DESIGN SYSTEM (same v2 — Toss/Apple/Linear/Strava references)

Apply the same design system used by C1~C9 and S1~S9 screens. Critical
points:
- Background: bg-white
- No emoji anywhere. Lucide / Tabler outline icons only.
- WEIGHTS: 400 / 600 / 700 only. NEVER font-black (900).
- No colored shadows. Neutral shadows only (shadow-sm/md/lg).
- Brand Blue #2563EB used SPARINGLY (primary CTA only).
- Korean copy in 해요체.
- Tabular numerals for any numbers.
- Generous whitespace.

QUALITY BAR: like a Toss or KakaoT login screen — calm, trustworthy,
minimal.

## PURPOSE
First app screen for new users (and returning users on signed-out
state). Single decision: which auth method.

## INFORMATION TO DISPLAY (top to bottom, with generous whitespace)

1. SSING logo / wordmark area (top portion, ~30-40% of screen)
   - Wordmark "SSING" in large display weight (32-40px / 700, #191919)
   - Below the wordmark: a single short tagline:
     "스키 · 보드 강습 매칭"
     (15px / 400, #76787A)
   - Centered both horizontally and within the logo block

2. Login options block (middle-lower portion)
   - Primary: KakaoTalk login button (Korean market default)
     - Full-width, height ~56px, radius 16px
     - Background #FEE500 (Kakao Yellow — this is the ONLY exception
       to the no-off-palette-color rule, because it's a brand
       requirement for KakaoTalk login per Kakao's brand guidelines)
     - Text color #191919 (NOT white)
     - Label: "카카오로 시작하기" (16px / 700)
     - Icon: small KakaoTalk chat-bubble glyph (use a generic
       lucide MessageCircle if no Kakao asset, but the Kakao Yellow
       background carries the brand)
   - Secondary: Apple login button
     - Full-width, height ~56px, radius 16px
     - Background #191919 (Black)
     - Text color white
     - Label: "Apple로 시작하기" (16px / 700)
     - Icon: lucide Apple icon (or generic if not available)
   - Tertiary (smaller, secondary visual weight):
     - "다른 방법으로 시작하기" — text link, 14px / 600, #4B4F54,
       centered, below the two primary buttons with ~12px gap.
     - On tap: open a bottom sheet with email/Google/etc options
       (the sheet itself does not need to be designed in this iteration;
       just hook up an empty handler — `console.log("other methods")`
       — or comment `// TODO: bottom sheet with email + google`).

3. Terms / privacy note (bottom, above safe area)
   - Small text (11px / 400, #A2A4A6), centered
   - Two lines:
     "로그인하면 SSING의"
     "이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다"
   - "이용약관" and "개인정보처리방침" should be inline links
     (#4B4F54 text, underline on hover).

## USER ACTIONS
- Tap KakaoTalk button → for mock stage, just call `navigate("/")`
  (simulate successful login, go to home)
- Tap Apple button → same, `navigate("/")`
- Tap "다른 방법으로 시작하기" → `console.log` only for now
- Tap 이용약관 / 개인정보처리방침 → `console.log` only

## EXACT KOREAN COPY
- Wordmark: "SSING"
- Tagline: "스키 · 보드 강습 매칭"
- Kakao button: "카카오로 시작하기"
- Apple button: "Apple로 시작하기"
- Other methods link: "다른 방법으로 시작하기"
- Terms note: "로그인하면 SSING의 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다"

## CONSTRAINTS
- No value-prop intro slides, no carousel, no "환영합니다" greeting,
  no marketing taglines beyond the single "스키 · 보드 강습 매칭" line.
- KakaoTalk Yellow (#FEE500) is the ONLY off-palette color allowed, and
  ONLY for the Kakao button.
- No gradients on any button. Solid fills only.
- No emoji.
- The Apple button uses solid #191919 (matches the existing "dark action"
  pattern in the design system).
- Logo area gets generous whitespace — don't crowd it.
- All three buttons (Kakao, Apple, text link) are vertically stacked,
  full-width within px-5 horizontal padding.
- Layout proportions roughly: top 1/3 logo area, middle 1/3 buttons,
  bottom small terms note.

## DESIGNER DECISIONS (you choose)
- Exact logo wordmark treatment (typography, optional tiny accent mark)
- Button vertical spacing (8-16px between)
- Whether to include a subtle illustration in the logo area
  (a single very simple ski mountain line drawing is OK if subtle,
  opacity 0.06-0.10, behind the wordmark)
- Exact icon glyph used inside Kakao/Apple buttons
- Tagline placement (immediately below wordmark vs slightly separated)

## OUT OF SCOPE
- Sign-up flow details (just `navigate("/")` for now)
- Email login form (deferred)
- Phone verification (deferred)
- Profile setup after login (handled later in /profile)
- Onboarding tutorials, value-prop slides (intentionally skipped —
  value lives in marketing landing page, not the app)