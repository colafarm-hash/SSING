# Figma Make — Patch 3

> 두 가지 묶음: (1) C1 빈 공간 보강, (2) 즉시 모드 타인 매칭 + 그룹 voting 메커니즘 (신규 화면 3개).
> Figma Make 같은 세션에 코드블록 통째 던지기.

---

## Patch 3 — C1 visual + 타인 매칭 voting flow

```
Apply two groups of changes to the existing SSING project. Design system
v2 unchanged (Toss/Apple/Linear/Strava references — bg-white, weights
400/600/700, no colored shadows, no emoji, no gradients except primary
CTA + C1 mode cards).

## ============================================================
## GROUP 1 — C1 Home visual polish (empty space)
## ============================================================

### Problem
Below the Reservation card on C1 there's a large empty white area that
looks unfinished. The screen is functionally minimal (correct), but
visually unbalanced.

### Solution
Tighten the layout and reduce wasted whitespace. Specifically:

1. Increase the Instant card minimum height from 240px to ~260-280px.
2. Increase the Reservation card min height from 140px to ~180-200px.
3. Add a thin section below the Reservation card with a single quiet
   informational strip (NOT a marketing slot, NOT a third mode entry):
   - Background: #F5F6F7
   - Padding: 16px 20px
   - Rounded 16px
   - Two lines:
     - Top (12/600 #76787A): "이번 시즌"
     - Bottom (15/700 #191919, tabular numerals): "12월 1일 ~ 3월 15일"
   - This is contextual orientation (when can I use the service?),
     not a CTA or promotion.
4. Adjust the vertical spacing so the bottom navigation sits flush with
   what's above — no more huge dead zone above the bottom-nav.

### Inside the cards — visual enrichment
Both Instant and Reservation cards currently have only text. Add a
single subtle decorative element to each, NOT increasing visual noise:

- Instant card (Brand Blue gradient): a subtle outline ski-slope curve
  in the bottom-right corner, white at opacity 0.10, decorative only.
- Reservation card (white): a subtle outline calendar-grid pattern in
  the bottom-right, #2563EB at opacity 0.06, decorative only.

NO change to copy. NO icons added or removed. The Zap icon and Calendar
icon already on each card stay where they are.

### Constraint
The two card CTAs are still the primary purpose of the screen — these
decorations stay quiet and do not compete with the headings.

## ============================================================
## GROUP 2 — Instant mode "타인 매칭" + Group Voting flow
## ============================================================

### Background
Currently in C2RequestInput, only reservation mode shows the "함께 듣기"
toggle. Add the SAME concept to instant mode, but with a DIFFERENT
downstream flow:

- Reservation + "함께도 OK" → filters C5 room list (existing behavior)
- Instant + "타인 매칭 ON" → triggers group-matching algorithm and a
  voting flow (NEW)

This is for users who want to do instant lessons but are willing to be
grouped with strangers of similar level/age for cost-sharing.

### CHANGE 1 — C2RequestInput.tsx

Show the "함께 듣기" toggle ALSO in instant mode (currently only shown
in reservation mode). Same UI as the existing reservation-mode toggle
(two segmented chips, blue when selected).

Copy adjustment:
- Instant mode caption (under chips):
  - "함께도 OK": "비슷한 수준·나이대의 다른 분들과 묶여서 강습"
  - "1:1 단독만": "혼자 1:1 강습"

When submitting:
- Instant + 함께도 OK → `navigate("/group-matching")`
- Instant + 1:1 단독만 → `navigate("/instructors")` (existing C3)
- Reservation + 함께도 OK → `navigate("/rooms?allowMulti=true")`
- Reservation + 1:1 단독만 → `navigate("/rooms?allowMulti=false")`

### CHANGE 2 — New screen: GroupMatching.tsx (/group-matching)

A SINGLE screen with internal state machine (3 phases). Don't split
into multiple routes — phases transition inside the same component.

Route: `/group-matching` (register in routes.tsx with ErrorBoundary).

#### PHASE A — Matching (loading)
Duration: ~3 seconds (mock; setTimeout to next phase).

Layout:
- Header: back button + "그룹 매칭" centered
- Body (vertical center):
  - Pulsing animated radar/ring icon (large, #2563EB,
    use Lucide Users icon with subtle CSS pulse animation)
  - Heading "비슷한 분들을 찾고 있어요" (22/700 #191919)
  - Subtext "비슷한 수준·나이대의 분들과 그룹을 만드는 중이에요"
    (14/400 #76787A)
  - Conditions summary chip row (compact, neutral): "스키 · 초급 · 30대"
- Background: bg-white, no decorations.

#### PHASE B — Group confirmed
Duration: ~2 seconds (mock; setTimeout to next phase).

Layout:
- Same header
- Body (vertical center):
  - Large success icon (CheckCircle 56px #0FB882)
  - Heading "3명이 매칭됐어요" (24/700 #191919, the number is dynamic)
  - Anonymous member chip row — 3 cards horizontally:
    - "본인" (highlighted bg #2563EB/10 #2563EB text)
    - "28세 · 남" (bg #F5F6F7)
    - "31세 · 여" (bg #F5F6F7)
  - Subtext "강사를 함께 골라볼게요" (14/400 #76787A)
- Auto-advance to Phase C after 2s. Optional "다음" button if mocking
  manual progression.

#### PHASE C — Voting
This is the main interactive phase. Mock duration: 3-minute countdown.

Layout:
- Header: back + "강사 투표" + timer pill ("2:47 남음" tabular nums,
  bg #FF8A00/10 #FF8A00 text, 12/700, rounded-pill)
- Notice strip (info, bg #F5F6F7, 12px radius, 14px padding, body
  13/400 #4B4F54): "그룹 전원이 투표해서 강사를 정해요. 동률은 등급·평점
  순으로 결정돼요."
- Group members compact row (avatars + "투표 완료" indicator on those
  who voted): "본인" / "28세·남 ✓" / "31세·여 (대기 중)"
- Instructor candidate cards (4 instructors, mock data):
  - Each card: white bg, 1px #E5E6E8, 16px radius, 16px padding
  - Top: avatar 48px placeholder + name + grade badge (solid #2563EB)
    + rating + re-booking rate
  - Middle: short bio one-liner
  - Bottom: vote count + "투표하기" button
    - Vote count: "현재 {n}표 / 3명 중" (where n is mock 0~3)
    - Vote button: full-width bottom of card, 44px height, bg #2563EB
      text white when not voted, bg #F5F6F7 text #4B4F54 with check
      icon when this user has voted for this instructor
    - One user can only vote for ONE instructor (changing vote moves
      the user's vote to the new instructor)

- After voting (mock: tap to vote on any card):
  - Update vote counts visually
  - When timer expires OR all 3 members voted → transition to result

#### PHASE D (sub-state of C) — Voting result + auto-route
- Compute winner: highest votes; tie-break by grade then rating
- Show brief confirmation overlay: "박OO 강사로 결정됐어요" with that
  instructor card highlighted, 2-second display
- Auto-navigate to `/payment` (C7) with grouped payment context

### CHANGE 3 — routes.tsx
Add route:
```
import GroupMatching from "./screens/GroupMatching";
// ...
{ path: "/group-matching", Component: GroupMatching, ErrorBoundary: NotFound },
```

### CHANGE 4 — C7Payment.tsx (minor)
The payment screen should reflect group context. If arrived from group
voting:
- Display "그룹 매칭 · 박OO 강사" header line
- Show price = (P + (n-1)*α) / n for n=3 → ₩35,000원
- Otherwise existing 1:1 or reservation flow unchanged

Detect via location state or URL param; for mock, just hardcode the
group case to display correctly when arriving from /group-matching.

## EXACT KOREAN COPY (Group Voting)

- C2 instant 토글: "함께도 OK" / "1:1 단독만"
- C2 instant 캡션 (함께도 OK): "비슷한 수준·나이대의 다른 분들과 묶여서 강습"
- C2 instant 캡션 (1:1 단독만): "혼자 1:1 강습"
- Group-matching header: "그룹 매칭"
- Phase A heading: "비슷한 분들을 찾고 있어요"
- Phase A subtext: "비슷한 수준·나이대의 분들과 그룹을 만드는 중이에요"
- Phase B heading: "N명이 매칭됐어요" (N is dynamic)
- Phase B chip "본인" for self
- Phase B subtext: "강사를 함께 골라볼게요"
- Phase C header: "강사 투표"
- Phase C timer: "M:SS 남음"
- Phase C notice: "그룹 전원이 투표해서 강사를 정해요. 동률은
  등급·평점 순으로 결정돼요."
- Member status: "투표 완료" / "대기 중"
- Vote count: "현재 {n}표 / {total}명 중"
- Vote button (not voted): "투표하기"
- Vote button (voted): "투표했어요" (with check icon)
- Phase D confirm: "{name}으로 결정됐어요"
- Group-matching failure (if implemented): "조건에 맞는 분들을 못
  찾았어요. 1:1로 진행하시겠어요?" + 두 옵션 "1:1로 시작" / "취소"

## CONSTRAINTS

- Voting screen tone: calm cooperation, NOT competitive ranking.
  Avoid leaderboard-style large vote numbers; keep them as small
  inline text.
- Timer is gentle warning, NOT urgency pressure. #FF8A00 (warning)
  is OK but no flashing or red until < 30 seconds.
- All member representations are ANONYMIZED (age · gender only,
  never names).
- The user's own card is visually distinguished but not loudly
  (subtle #2563EB/10 background OR a small "본인" label).
- No gradients on voting buttons (solid only).
- No emoji.
- This entire flow is for instant mode only — reservation flow is
  unchanged.

## OUT OF SCOPE

- Don't change reservation flow (C5/C6).
- Don't change strict 1:1 instant flow (C3/C4).
- Don't change existing modal components.
- Don't add bottom navigation to /group-matching (it's a flow screen,
  not a tab destination).
- The post-voting payment integration is mock-level only (just hardcode
  the group display in C7 when navigated from /group-matching).
- Don't change matching algorithm semantics — group formation logic
  is mocked (no real backend matching).
```

---

## 던지고 받은 후 점검

| 영역 | 점검 |
|---|---|
| C1 빈 공간 | 두 카드 더 크고, 시즌 정보 strip 추가, 카드 내 데코 요소 절제됨 |
| C2 즉시 모드 | "함께 듣기" 토글 노출 (예약 모드와 동일 UI) |
| C2 즉시 + "함께도 OK" 제출 | `/group-matching` 진입 |
| /group-matching Phase A | 비슷한 분들 찾는 로딩 (3초) |
| /group-matching Phase B | "N명이 매칭됐어요" 그룹 멤버 표시 (2초) |
| /group-matching Phase C | Voting 화면 + 타이머 + 강사 4명 |
| Voting 결과 | 최다 득표 강사 결정 → C7로 자동 이동 |
| C7 그룹 진입 | "그룹 매칭 · OO 강사" 표시 + 분담가 |
| 익명성 | 본인 외 멤버는 "OO세 · 남/여"만 |
| 톤 | 협력 톤, 경쟁/긴급 압박 X |

---

## 04_matching_system.md 동기화

이미 04에 "즉시 매칭 + 타인 매칭" 섹션 추가됨:
- 그룹 매칭 알고리즘 입력 조건
- 그룹 정원 (2~5명, 권장 3~4)
- Voting 메커니즘 (타임리밋 3분 권장, 동률 처리, 기권)
- 매칭 후 가격 (모델 A 적용)
- 직접 그룹 vs 타인 매칭 비교
- 미확정 사항 (정확한 타임리밋, 가중 voting, 그룹 형성 실패 처리 등)

Figma Make 결과 받으면 이 메커니즘과 화면이 일치하는지 검증.
