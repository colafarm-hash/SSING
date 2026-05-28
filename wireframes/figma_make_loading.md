# Figma Make — 매칭 로딩 화면 (Patch 4)

> 매칭 알고리즘 작동 중 보여줄 세련된 로딩 컴포넌트. 공통 `MatchingLoader.tsx` 컴포넌트로 만들어서 즉시·예약·그룹 매칭 진입 시 재사용.
> Figma Make 같은 세션에 코드블록 통째 던지기.

---

## Patch 4 — Matching Loader Component

```
Add a polished, premium matching-loader component to the SSING project.
This component is reused across all matching flows (instant, reservation,
group). It's the "조건에 맞는 강사님을 찾는 중" screen with a refined
animation.

Reference visual language: Toss payment-processing loader, Apple
Wallet card-loading, Linear sync animations, Strava activity load.
Restrained, premium, NOT generic spinner.

## DESIGN SYSTEM (v2 — same)
- bg-white. Weights 400/600/700 only. No colored shadows.
- Brand Blue #2563EB used for the active radar/ring.
- Pretendard. 해요체 copy. No emoji.
- Tabular numerals for any counts.

## NEW FILE 1 — src/app/components/MatchingLoader.tsx

A reusable full-screen loader component with props for context-specific
copy.

### Props

```typescript
interface MatchingLoaderProps {
  title: string;                  // "조건에 맞는 강사님을 찾고 있어요"
  subtitle?: string;              // optional secondary line
  conditions?: string[];          // chip row of user's conditions
  variant?: "instructor" | "room" | "group";  // controls accent visual
}
```

### Visual Composition (full-screen, vertical center)

1. Header (slim — back button only, no title):
   - Just a ChevronLeft top-left for emergency cancel
   - Tap → navigate(-1)

2. Center stack (flex-col items-center justify-center, gap 32px):

   a) ANIMATED RING — the signature element. Two layers:
      - Outer ring: 160×160px circle, 2px stroke #2563EB,
        opacity 0.2, animates with `scale 1 → 1.15 → 1` over 2s
        infinite ease-in-out
      - Inner ring: 120×120px circle, 2px stroke #2563EB,
        animates with `scale 1 → 1.10 → 1` over 2s infinite,
        0.3s delay (out of phase)
      - Center icon (depending on variant):
        - "instructor" → Users icon 40px #2563EB
        - "room" → Calendar icon 40px #2563EB
        - "group" → UsersRound icon 40px #2563EB
      - The icon itself gently breathes (scale 1 → 1.05 → 1, 3s loop)
      - Implementation: use Tailwind animate-pulse / custom keyframes
        in globals.css OR inline @keyframes via style. Prefer custom
        for the dual-ring effect.

   b) Title (22-26 / 700, #191919, text-center, max width 280px):
      - From prop `title`

   c) Subtitle (14 / 400, #76787A, text-center, max width 280px):
      - From prop `subtitle` (optional, render only if present)

   d) Animated dots (under subtitle):
      - Three dots, each 6×6 circle #2563EB
      - Sequential bounce animation (each delayed by 0.2s)
      - "조건 분석 중" / "강사 검색 중" / "최적의 매칭 찾는 중" rotating
        text above the dots, 13/500 #76787A, swaps every 1.5s
        with a fade transition

   e) Conditions chip row (only if `conditions` prop provided):
      - Compact pill chips, bg #F5F6F7, 12/600 #4B4F54, rounded-full,
        padding 6×12, horizontal scroll if overflow
      - Example: ["스키", "초급", "2명", "3시간"]
      - Position: below the animated dots with 24px gap

3. Bottom subtle reassurance line (absolute bottom 24px from
   safe-area):
   - "보통 30초 안에 매칭이 완료돼요" — 12 / 400 #A2A4A6, text-center

### Keyframes (add to globals.css)

```css
@keyframes ring-pulse-outer {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50%      { transform: scale(1.15); opacity: 0.05; }
}

@keyframes ring-pulse-inner {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50%      { transform: scale(1.10); opacity: 0.15; }
}

@keyframes icon-breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.05); }
}

@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%           { transform: translateY(-6px); opacity: 1; }
}

@keyframes status-text-fade {
  0%, 30%   { opacity: 1; transform: translateY(0); }
  40%, 60%  { opacity: 0; transform: translateY(4px); }
  70%, 100% { opacity: 1; transform: translateY(0); }
}
```

### Animation behavior
- Both rings run infinite loops, out of phase by 0.3s for a
  "breathing radar" effect — not jarring, premium feel.
- Icon breathe is subtle — barely noticeable but adds life.
- Three dots bounce in sequence (200ms stagger).
- Status text rotates between 3 messages with smooth fade.
- All animations respect `prefers-reduced-motion: reduce` —
  fall back to static rings + visible icon + static text.

### Reduced-motion fallback
- Rings stop animating, settle at scale 1 with their base opacity.
- Dots replaced by static three dots in a row.
- Status text shows only the first message statically.

## INTEGRATION

### USAGE 1 — C3 InstructorPool (instant, 1:1)
When the user arrives at /instructors after C2 submission, render
MatchingLoader first for 1.5-2 seconds, then transition to the
existing pool list.

```typescript
// Inside C3InstructorPool
const [loading, setLoading] = useState(true);
useEffect(() => {
  const t = setTimeout(() => setLoading(false), 1800);
  return () => clearTimeout(t);
}, []);
if (loading) {
  return <MatchingLoader
    title="조건에 맞는 강사님을 찾고 있어요"
    subtitle="동시간대 가용한 강사 중에서 최적을 골라드릴게요"
    conditions={["스키", "초급", "2명", "3시간"]}
    variant="instructor"
  />;
}
```

### USAGE 2 — C5 ReservationRoomList
Same pattern, different copy.

```typescript
<MatchingLoader
  title="조건에 맞는 방을 찾고 있어요"
  subtitle="원하는 시간에 열린 방을 확인하는 중이에요"
  conditions={["스키", "초급", "2명", "3시간", "오늘 14:00"]}
  variant="room"
/>
```

### USAGE 3 — /group-matching Phase A
Replace the existing Phase A loading in GroupMatching.tsx with this
component.

```typescript
<MatchingLoader
  title="비슷한 분들을 찾고 있어요"
  subtitle="비슷한 수준·나이대의 분들과 그룹을 만드는 중이에요"
  conditions={["스키", "초급", "30대"]}
  variant="group"
/>
```

## ROTATING STATUS MESSAGES (per variant)

Cycle every 1.5s, fade transition:

### variant="instructor"
- "조건 분석 중"
- "가용 강사 검색 중"
- "최적의 강사 매칭 중"

### variant="room"
- "조건 분석 중"
- "열린 방 검색 중"
- "최적의 방 매칭 중"

### variant="group"
- "비슷한 수준 찾는 중"
- "비슷한 나이대 찾는 중"
- "그룹 만드는 중"

## OUT OF SCOPE

- Don't add a percentage progress bar — this is indeterminate matching,
  not a known-duration upload.
- Don't add success animation here — that lives in the destination
  screen (C3 list reveal, C5 list reveal, GroupMatching Phase B).
- Don't add cancel confirmation dialog — back button just navigates(-1).
- Don't fetch real data — animation is purely time-driven mock at this
  stage.
- Don't add sound or haptic — visual-only.
- The component must respect prefers-reduced-motion (graceful fallback).

## QUALITY BAR
Compare side-by-side with Toss payment-processing or Apple Wallet card-
loading: same level of premium restraint. NOT a generic Material spinner,
NOT a Lottie-heavy bouncy animation.
```

---

## 사용 흐름 다이어그램

```
C2 즉시 + 1:1 단독 제출
  → MatchingLoader (instructor) 1.8s
  → C3 강사 풀

C2 즉시 + 함께도 OK 제출
  → /group-matching Phase A (MatchingLoader group) 3s
  → Phase B 그룹 확정 2s
  → Phase C voting

C2 예약 제출
  → MatchingLoader (room) 1.8s
  → C5 방 목록
```

---

## 결과 받은 후 점검

| 항목 | 기대 |
|---|---|
| 더블 링 펄스 | 두 링이 0.3s out-of-phase로 부드럽게 호흡 |
| 아이콘 브리딩 | 미세하게 (1.05배) 살아 움직임 |
| 도트 시퀀셜 바운스 | 200ms 간격 |
| 회전 상태 텍스트 | 1.5s마다 페이드 전환 |
| Conditions chip | 사용자 입력 조건 표시 |
| prefers-reduced-motion | 모든 애니메이션 정지, 정적 fallback |
| variant별 아이콘·copy 분기 | instructor/room/group 정확 |
| 30초 안내 라인 | 하단 quiet text |
