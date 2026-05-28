# Figma Make — Master Patch (전체 통합 해결)

> 에이전트 점검에서 발견된 모든 이슈(빌드 실패·죽은 버튼·라우팅 누락·상태 정합·UX 결함) + 누락 7개 파일을 한 번에 해결.
> 이전 patch 1~4 / settings / onboarding 통합. 한 번만 던지면 끝.

---

## Master Patch

```
Apply this comprehensive patch to the SSING project. This consolidates
all previous patches. If something is already correctly implemented,
leave it. Treat as idempotent — re-running should not duplicate work.

Design system v2 unchanged (bg-white, weights 400/600/700 only,
no colored shadows, no emoji, no gradients except primary CTA +
C1 mode cards, Pretendard, 해요체 Korean, tabular numerals).

##########################################################
# PRIORITY 1 — BUILD MUST PASS (missing files)
##########################################################

These 7 files are referenced in routes.tsx but DO NOT EXIST.
Create each:

### FILE 1: src/app/screens/GroupMatching.tsx (route /group-matching)

A single-screen state machine with 3 phases. Use useState for phase.

Phase A — Matching (3s):
- Header: ChevronLeft → navigate(-1), title "그룹 매칭"
- Body center: render <MatchingLoader title="비슷한 분들을 찾고 있어요"
  subtitle="비슷한 수준·나이대의 분들과 그룹을 만드는 중이에요"
  conditions={["스키","초급","30대"]} variant="group" />
- After 3s, setPhase("confirmed")

Phase B — Group confirmed (2s):
- Header same
- Body center vertical: CheckCircle icon 56px #0FB882, heading
  "3명이 매칭됐어요" 24/700, anonymous member chips horizontal row:
  "본인" (bg #2563EB/10 text #2563EB), "28세 · 남" (bg #F5F6F7),
  "31세 · 여" (bg #F5F6F7). Subtext "강사를 함께 골라볼게요" 14/400 #76787A
- After 2s, setPhase("voting")

Phase C — Voting:
- Header: back + "강사 투표" + timer pill ("M:SS 남음" tabular,
  bg #FF8A00/10 text #FF8A00 12/700, rounded-pill)
- Notice strip (#F5F6F7, 12px radius, 14px padding):
  "그룹 전원이 투표해서 강사를 정해요. 동률은 등급·평점 순으로
  결정돼요."
- Member status row: "본인", "28세·남 ✓", "31세·여 (대기 중)"
- 4 instructor candidate cards (mock data — name 김OO/이OO/박OO/최OO,
  grade 5/4/5/3, rating 4.9/4.7/5.0/4.5, rebooking 92/85/95/78,
  brief intro):
  - White card, 1px #E5E6E8 border, 16px radius, 16px padding
  - Top: avatar 48px placeholder bg #F5F6F7 + name + grade badge solid
    #2563EB white text + rating + rebook%
  - Vote count "현재 N표 / 3명 중" small
  - Vote button bottom full-width 44px:
    - Not voted: bg #2563EB white "투표하기"
    - Voted: bg #F5F6F7 #4B4F54 "투표했어요" + check icon
  - Tap to vote (1 vote per user, changing moves vote)
- Timer countdown from 180s. State: votes object {instructorId: count}
- When timer expires OR all 3 voted:
  - Compute winner (highest count, ties broken by grade then rating)
  - Brief overlay "박OO 강사로 결정됐어요" 2s
  - navigate("/payment", { state: { fromGroupMatching: true,
    instructorName: "박OO", groupSize: 3, perPersonPrice: 35000 } })

### FILE 2: src/app/screens/EditProfile.tsx (/edit-profile)

Form: name input, email input (disabled with caption "이메일은 변경할
수 없어요"), phone input. Photo section top: 80px circle avatar +
"사진 변경" link 14/600 #2563EB.

State: track changes vs initial. Submit button disabled if no changes.
Sticky bottom "저장" full-width 56px bg #2563EB white 16/700 rounded-16.
On save: show toast "저장됐어요" 2s, then navigate(-1).
Header: back + "내 정보 수정".

### FILE 3: src/app/screens/PaymentMethods.tsx (/payment-methods)

Header: back + "결제 수단 관리".
Mock list:
- {id:1, type:"카드", label:"신한카드 1234-****-****-5678", default:true}
- {id:2, type:"kakaopay", label:"kakao@example.com", default:false}

Each row: white card 1px #E5E6E8 16px radius 16px padding.
- Icon CreditCard #2563EB 18px + method label
- "기본" pill if default (bg #2563EB/10 text #2563EB 11/700)
- Right: trash icon button → confirm "이 결제 수단을 삭제하시겠어요?"

Below list: dashed-border "+ 결제 수단 추가" button full-width.
console.log("add payment") for now.

### FILE 4: src/app/screens/NotificationSettings.tsx (/notification-settings)

Header: back + "알림 설정".

Section 1 "알림 종류":
- 매칭 알림 / 강습 알림 / 채팅 알림 / 마케팅 알림
- Toggle switches 44×24 (bg #E5E6E8 off, #2563EB on, 18×18 white knob)
- Default: 매칭·강습·채팅 ON, 마케팅 OFF

Section 2 "알림 채널" (32px below section 1):
- 푸시 알림 ON / 카카오톡 알림 OFF / 이메일 알림 OFF

Each row 60px tall, 1px #E5E6E8 divider.

Changes save immediately. Show toast "변경사항이 저장됐어요" briefly
on first change of session only.

### FILE 5: src/app/screens/Support.tsx (/support)

Header: back + "고객 지원".

Section 1 "자주 묻는 질문" — Accordion list (8 items):
1. 매칭은 어떻게 진행되나요?
2. 결제는 안전한가요?
3. 강습을 취소하면 환불은 어떻게 되나요?
4. 강사가 마음에 안 들면 어떻게 하나요?
5. 다중 매칭은 뭔가요?
6. 패찰비는 누가 부담하나요?
7. 강습 시간을 변경할 수 있나요?
8. 강사로 등록하려면 어떻게 하나요?

Each item header 15/600 + ChevronDown/Up. Expanded body 14/400
#4B4F54 leading-relaxed (mock 2-3 sentence answer each). Animate
expand/collapse.

Section 2 "1:1 문의" (32px below):
- Full-width button bg #F5F6F7 56px height 16px radius
- MessageCircle icon left, "1:1 문의하기" 15/600 #191919
- Caption below "보통 24시간 이내에 답변드려요" 12/400 #76787A
- console.log("contact") for now

### FILE 6: src/app/screens/Terms.tsx (/terms)

Header: back + "약관·정책".

List of 6 rows, each white bg, py-4 px-5, 1px #E5E6E8 divider:
- 이용약관
- 개인정보처리방침
- 위치기반서비스 이용약관
- 마케팅 정보 수신 동의
- 청소년보호정책
- 사업자 정보

Each row: label 15/600 #191919 + ChevronRight 20px #A2A4A6.
Tap → show "준비 중" alert (or detail stub).

Bottom caption (px-5 py-4): "SSING은 (주)OOO이 운영합니다.
사업자등록번호 OOO-OO-OOOOO" 12/400 #A2A4A6.

### FILE 7: src/app/components/MatchingLoader.tsx (reusable)

Props: { title: string, subtitle?: string, conditions?: string[],
variant: "instructor" | "room" | "group" }

Visual:
- Slim header with back button only (ChevronLeft top-left, no title)
  → navigate(-1)
- Center stack vertical, gap 32px:
  - Dual animated ring: outer 160×160 2px stroke #2563EB opacity 0.2
    pulsing scale 1→1.15→1 over 2s loop; inner 120×120 2px stroke
    #2563EB pulsing 1→1.10→1 with 0.3s delay
  - Center icon by variant: Users (instructor), Calendar (room),
    UsersRound (group) — 40px #2563EB, breathing scale 1→1.05→1 3s
  - Title 22-26/700 #191919 text-center max-w 280
  - Subtitle (if present) 14/400 #76787A text-center
  - Animated 3 dots 6×6 #2563EB sequential bounce (200ms stagger)
  - Rotating status text above dots, swap every 1.5s:
    - instructor: "조건 분석 중" / "가용 강사 검색 중" / "최적의 강사 매칭 중"
    - room: "조건 분석 중" / "열린 방 검색 중" / "최적의 방 매칭 중"
    - group: "비슷한 수준 찾는 중" / "비슷한 나이대 찾는 중" / "그룹 만드는 중"
  - Conditions chip row (if provided): bg #F5F6F7 12/600 #4B4F54
    rounded-full padding 6×12
- Bottom absolute: "보통 30초 안에 매칭이 완료돼요" 12/400 #A2A4A6
  text-center

Add @keyframes to globals.css for ring-pulse-outer, ring-pulse-inner,
icon-breathe, dot-bounce, status-text-fade.

Respect prefers-reduced-motion (static fallback).

##########################################################
# PRIORITY 2 — Core flow integrity
##########################################################

### C2RequestInput.tsx — submit routing
Currently always navigates to /instructors or /rooms ignoring allowMulti.
Fix submit handler:

```typescript
const handleSubmit = (e) => {
  e.preventDefault();
  if (!isComplete) return;
  const conditions = { discipline, level, groupSize, duration, location, startTime, participants };
  if (mode === "instant") {
    if (allowMulti && groupSize === 1) {
      navigate("/group-matching", { state: { conditions } });
    } else {
      navigate("/instructors", { state: { conditions } });
    }
  } else {
    navigate(`/rooms?allowMulti=${allowMulti}`, { state: { conditions } });
  }
};
```

### C2 — isComplete enforcement
Submit button: `disabled={!isComplete}`. Disabled state: bg #F5F6F7
text #A2A4A6 cursor-not-allowed.

### C2 — startTime state
Add: `const [startTime, setStartTime] = useState<string>("");`
Bind to the datetime-local input value + onChange.
Include in isComplete check: `(mode === "instant" || startTime)`.

### C2 — specialNote state
Add: `const [specialNote, setSpecialNote] = useState<string>("");`
Bind to the "특이사항" text input. Not required for isComplete.

### C2 — allowMulti toggle visibility
Show toggle only when:
- mode === "reservation", OR
- mode === "instant" AND groupSize === 1
(For instant mode with group size >=2, the user is already a group;
 toggle has no meaning.)

### C7Payment.tsx — read group context from location state
Replace `document.referrer.includes('/group-matching')` with:
```typescript
import { useLocation } from "react-router";
const location = useLocation();
const fromGroup = location.state?.fromGroupMatching === true;
const groupCtx = fromGroup ? location.state : null;
```
When fromGroup, show small top chip "그룹 매칭 · {groupCtx.instructorName} 강사"
and pricing reflects groupCtx.perPersonPrice and groupCtx.groupSize.

### C3InstructorPool.tsx — wrap initial render with MatchingLoader
```typescript
const [loading, setLoading] = useState(true);
useEffect(() => { const t = setTimeout(() => setLoading(false), 1800); return () => clearTimeout(t); }, []);
if (loading) return <MatchingLoader title="조건에 맞는 강사님을 찾고 있어요" subtitle="동시간대 가용한 강사 중에서 최적을 골라드릴게요" conditions={["스키","초급","2명","3시간"]} variant="instructor" />;
```

### C5ReservationRoomList.tsx — same pattern
```typescript
if (loading) return <MatchingLoader title="조건에 맞는 방을 찾고 있어요" subtitle="원하는 시간에 열린 방을 확인하는 중이에요" conditions={[...]} variant="room" />;
```

##########################################################
# PRIORITY 3 — Mock data consistency
##########################################################

### matchId standardization to "m1"
- C8 chat link: `navigate(\`/chat/\${mockData.payment.matchId}\`)` —
  matchId is already "m1"
- S5 mockThreads ids: change numeric 1/2/3 → "m1"/"m2"/"m3"
- S3 notifications deep links: same standard

### C3 sort actually sorts
Apply selected sort to `mockInstructors`:
```typescript
const sortedInstructors = [...mockInstructors].sort((a,b) => {
  if (sort === "등급순") return b.grade - a.grade;
  if (sort === "평점순") return b.rating - a.rating;
  if (sort === "거리순") return parseFloat(a.distance) - parseFloat(b.distance);
  if (sort === "가격순") return a.price - b.price;
  return 0; // 추천순 default
});
```
Render sortedInstructors.map(...) instead of mockInstructors.

### C5 sort actually sorts
Same pattern with the appropriate keys (시간순 by startTime,
가격순 by price, etc.).

### C4 :id lookup
Replace single mockInstructor with mockInstructors array (same as C3
seed data). Use `useParams().id` to find:
`const mockInstructor = mockInstructors.find(i => String(i.id) === id) || fallback;`

### C6 :id lookup
Same — read :id and lookup from mockRooms.

### C5 request summary reads from state
Read user request from `location.state?.conditions` if present, else
fall back to mock string. Render conditions dynamically.

##########################################################
# PRIORITY 4 — Dead buttons / unused components
##########################################################

### O1Login — link handlers
- "다른 방법으로 시작하기" → open a bottom sheet (use shadcn/ui Sheet
  component) with placeholder items: 이메일로 시작 / 구글로 시작 /
  전화번호로 시작. Each item is a row with icon + label. Tapping
  any item → navigate("/") (mock).
- "이용약관" link → navigate("/terms")
- "개인정보처리방침" link → navigate("/terms")

### C1Home — remove "로그인" header button
Remove the 로그인 button shown in C1 header area. C1 is for
logged-in users.

### C1Home — ongoing match conditional
Add boolean `hasOngoingMatch` (set to true for demo). Wrap the
진행 중인 강습 indicator block in `{hasOngoingMatch && (...)}`.

### S3Notifications — "모두 읽음" handler
Wire onClick to mark all unread=false in local state. Toast: "모두
읽음 처리됐어요".

### S4History — completed-no-rating tap behavior
For card with status "완료" (no pending rating): on tap, show
read-only detail bottom sheet with lesson summary. For "완료 · 평가
남음" cards: navigate("/rating"). For "진행 중": navigate("/confirmed").

### S6Profile — logout to /login
`handleLogout`: navigate("/login") instead of navigate("/").

### AlertSubscribeModal integration
Wire into C3 and C5 empty states.
- In C3, when `sortedInstructors.length === 0`: render empty state UI
  + primary button "강사 등장 알림 받기" → opens AlertSubscribeModal
- In C5, similarly: "방 열림 알림 받기" → modal
For demo, support `?empty=true` URL param to force empty state.

### S1Chat — handleSend appends to messages
Add local messages state. handleSend appends user message + clears input.
Render messages from state. Auto-scroll to bottom.

##########################################################
# PRIORITY 5 — Polish
##########################################################

### C4Profile — pricing helper caption
Below "1:1 강습 ₩70,000원" add small caption: "혼자 듣기 기준 — 다중매칭
시 인당 부담 변동" (12/400 #76787A).

### C7Payment — instant-only time string
The "지금부터 1시간 내 강습" string only when mode is instant (read
from location.state or URL param). For reservation, show actual
date/time from state.

### C2 size=1 + allowMulti hidden
Already in PRIORITY 2.

### C1Home — empty space (if not already addressed)
Increase Instant card min-height to 260-280px, Reservation card to
180-200px. Below Reservation card add a quiet "이번 시즌" strip
(bg #F5F6F7, 16px padding, 16px radius):
- Line 1: "이번 시즌" 12/600 #76787A
- Line 2: "12월 1일 ~ 3월 15일" 15/700 #191919 tabular

##########################################################
# OUT OF SCOPE (do not change)
##########################################################

- Don't change any other screen visual design.
- Don't change matching algorithm semantics.
- Don't change the v2 design system tokens.
- Don't add bottom navigation to non-tab screens (/group-matching,
  EditProfile, etc.).
- Don't introduce new icon libraries.
- Don't replace shadcn/ui components with custom ones.
```

---

## 사용 방법

1. Figma Make 같은 세션 열기
2. 위 ``` 코드블록 ``` 통째 복사
3. 입력창에 붙여넣기 → 생성
4. zip 받기 → `Create app wireframe` 폴더에 덮어쓰기
5. `pnpm install && pnpm dev` → 클릭 테스트

## 결과 받은 후 점검 (전체)

| 영역 | 점검 |
|---|---|
| 빌드 | `pnpm dev` 컴파일 통과 |
| 신규 7개 파일 | GroupMatching, EditProfile, PaymentMethods, NotificationSettings, Support, Terms, MatchingLoader 존재 |
| C2 submit | isComplete 검사 + startTime state + 라우팅 분기 |
| Group flow | /group-matching → /payment with state |
| MatchingLoader | C3, C5, /group-matching Phase A에서 1.8~3s |
| matchId | 모두 "m1" 통일 |
| Sort | C3, C5 정렬 실제 작동 |
| :id 사용 | C4, C6 lookup |
| 죽은 버튼 | O1, S3 "모두 읽음", S6 logout, S4 완료 카드 다 작동 |
| C1 헤더 로그인 | 제거됨 |
| AlertSubscribeModal | C3·C5 empty state 통합 |
| S1Chat | 메시지 전송 작동 |
| 카피 polish | C4 보조, C7 시간 분기 |

---

## 향후 워크플로우 강화

이번 master patch로 다 정리되면 — **모든 새 작업은 Figma Make에 patch prompt 먼저 던지고 결과 받아서 통합**하는 룰 확립. 로컬에서 hot-fix는 즉시 Figma Make에도 patch로 동기화.
