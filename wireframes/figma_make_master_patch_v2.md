# Figma Make — Master Patch v2 (강사단위 합류 전환)

> **2026-05-29 메커니즘 변경**: 이전의 "그룹 매칭 → Voting" 모델 폐기.
> 사용자가 강사를 직접 선택하고, 같은 강사를 선택한 다른 사용자들이
> 자동으로 합류하는 **강사단위 합류** 모델로 전환.
>
> 본 패치는 Master Patch v1 적용이 끝난(또는 7개 신규 파일이 이미 생성된)
> 프로젝트 위에 적용한다. v1을 아직 안 했다면 v1 먼저, v2는 그 다음.
>
> 핵심 원칙: 즉시·예약 두 모드 모두 "강사 + 시간 슬롯" 단위 방으로 수렴.
> 즉시 모드는 첫 손님이 강사 선택 시 1시간 윈도우 방이 자동 생성되고,
> 후속 손님은 같은 강사 선택 시 합류 동의 다이얼로그로 합류.

---

## Master Patch v2

```
Apply this patch to the SSING project. This REPLACES the voting-based
group matching model with an instructor-unit join model where each
guest individually picks an instructor and the system either creates
a new room (first guest) or joins an existing one (subsequent guests).

Design system v2 unchanged. Treat as idempotent.

##########################################################
# PRIORITY 0 — REMOVE VOTING / GROUP MATCHING ENTIRELY
##########################################################

### REMOVE FILE: src/app/screens/GroupMatching.tsx
Delete this file. The voting-based group matching screen is obsolete.

### REMOVE ROUTE: /group-matching
In src/app/routes.tsx:
- Remove `import GroupMatching from "./screens/GroupMatching";`
- Remove the `{ path: "/group-matching", Component: GroupMatching, ... }` route entry.

### REMOVE all references to /group-matching, GroupMatching component,
voting UI, voting timer, voting overlay anywhere they appear.

If anything still references the old `fromGroupMatching` location.state
key, RENAME it to `fromInstructorJoin` per the new model below.

##########################################################
# PRIORITY 1 — C2RequestInput submit routing
##########################################################

### C2RequestInput.tsx — handleSubmit
Replace the existing submit handler with:

```typescript
const handleSubmit = (e) => {
  e.preventDefault();
  if (!isComplete) return;
  const conditions = {
    discipline, level, groupSize, duration, location, startTime,
    participants, allowMulti
  };
  if (mode === "instant") {
    // instant: always go to instructor pool. Join behavior is
    // resolved at C3/C4 based on allowMulti and the instructor's
    // current room state.
    navigate("/instructors", { state: { conditions, allowMulti, mode: "instant" } });
  } else {
    // reservation: room list (existing behavior)
    navigate(`/rooms?allowMulti=${allowMulti}`, { state: { conditions, mode: "reservation" } });
  }
};
```

Note: there is no longer any branch that routes to /group-matching.
"instant + allowMulti=true + groupSize=1" goes through C3 with join
indicators; the instructor-room is auto-created on the first user's
"매칭 시작" tap in C4.

##########################################################
# PRIORITY 2 — C3InstructorPool — join status indicators
##########################################################

### C3InstructorPool.tsx
Each instructor card now shows a join-status indicator chip below
the instructor's name row (above the rating/grade row).

Read `allowMulti` and `mode` from location.state. The chip variant
depends on the instructor's current room state (mocked for now).

Extend the mockInstructors seed with a `joinStatus` field for demo:
```typescript
const mockInstructors = [
  { id: "i1", name: "김OO", grade: 5, rating: 4.9, ...,
    joinStatus: { kind: "none" } },                          // 방 없음
  { id: "i2", name: "이OO", grade: 4, rating: 4.7, ...,
    joinStatus: { kind: "open", current: 2, capacity: 5, remainMin: 38 } },
  { id: "i3", name: "박OO", grade: 5, rating: 5.0, ...,
    joinStatus: { kind: "full" } },                          // 정원/만료
  { id: "i4", name: "최OO", grade: 3, rating: 4.5, ...,
    joinStatus: { kind: "open", current: 1, capacity: 5, remainMin: 52 } },
];
```

Indicator chip rendering (only when `mode === "instant"` AND
`allowMulti === true` — for 1:1 단독만 / 예약 모드는 chip 숨김):

| joinStatus.kind | chip 본문 | 스타일 |
|---|---|---|
| none | "1:1 단독 가능" | bg #F5F6F7 text #4B4F54 12/600 rounded-full pad 4×10 |
| open | "N명 함께 듣는 중 · OO분 남음" | bg #2563EB/10 text #2563EB 12/700 rounded-full pad 4×10 |
| full | "마감" | bg #E5E6E8 text #A2A4A6 12/600 rounded-full pad 4×10. 카드 전체 opacity 0.5, pointer-events none |

Sort still works as v1 (등급순/평점순/거리순/가격순/추천순 default).

C3 카드 tap: navigate(`/instructor/${i.id}`, { state: { conditions,
allowMulti, mode, joinStatus: i.joinStatus } });

### C3InstructorPool.tsx — top notice (조건적)
When `mode === "instant"` AND `allowMulti === true`, show a 1-line
notice strip below the header:
- bg #F5F6F7, padding 12×16, radius 12, 14/400 #4B4F54
- 본문: "같은 강사를 선택한 분들이 자동으로 합류돼요. 가격은 인원에 따라 분담돼요."
- 한 번 닫기 가능 (X icon right) — 세션 동안만 dismiss

### C3InstructorPool.tsx — 정원 만료 카드는 풀 하단으로
sortedInstructors 정렬 후, `joinStatus.kind === "full"` 카드를 배열 끝으로
이동시키는 후처리 추가:
```typescript
const ordered = [...sortedInstructors].sort((a, b) => {
  const af = a.joinStatus?.kind === "full" ? 1 : 0;
  const bf = b.joinStatus?.kind === "full" ? 1 : 0;
  return af - bf;
});
```

##########################################################
# PRIORITY 3 — C4InstructorProfile — 합류 동의 다이얼로그
##########################################################

### C4InstructorProfile.tsx
Replace the previous "매칭 시작 → /payment 직행" 흐름을 합류 동의
다이얼로그를 거치도록 변경.

Read state (with defaults):
```typescript
const location = useLocation();
const conditions = location.state?.conditions ?? defaultConditions;
const allowMulti = location.state?.allowMulti ?? true;
const mode = location.state?.mode ?? "instant";
const joinStatus = location.state?.joinStatus ?? { kind: "none" };
```

When "매칭 시작" 버튼 tap:

- If `mode !== "instant"` OR `!allowMulti`:
  → 다이얼로그 생략, navigate("/payment", { state: { instructor, conditions, mode } });
- Else if `joinStatus.kind === "none"` (첫 손님):
  → 첫 손님 다이얼로그 (shadcn/ui Dialog)
- Else if `joinStatus.kind === "open"` (후속 손님):
  → 후속 손님 다이얼로그
- Else if `joinStatus.kind === "full"`:
  → 버튼 disabled 처리 (UI 단에서 미리 차단해도 됨)

### 첫 손님 다이얼로그 (joinStatus.kind === "none")

shadcn/ui Dialog, max-width 360px, radius 20, padding 24:
- Title 18/700 #191919: "함께 들을 분을 받을까요?"
- Body 14/400 #4B4F54 leading-relaxed:
  "{instructor.name} 강사 방을 1시간 동안 열어둘게요. 같은 조건의 다른
  분이 합류하면 가격이 인당으로 분담돼요. 아무도 합류하지 않으면 1:1로
  강습을 진행해요."
- Two buttons stacked, gap 8px, 48px height, full-width, radius 14:
  - Primary: bg #2563EB white 15/700 "함께 들을게요"
    → navigate("/payment", { state: { instructor, conditions, mode,
      fromInstructorJoin: true, joinRole: "first",
      joinWindowMin: 60, currentCount: 1, allowMulti: true } });
  - Secondary: bg #F5F6F7 #191919 15/600 "1:1 단독만"
    → navigate("/payment", { state: { instructor, conditions, mode,
      fromInstructorJoin: true, joinRole: "solo",
      currentCount: 1, allowMulti: false } });

### 후속 손님 다이얼로그 (joinStatus.kind === "open")

- Title 18/700: "{instructor.name} 강사 방에 합류할까요?"
- Body 14/400 leading-relaxed:
  "현재 {joinStatus.current}명이 함께 듣고 있어요. {joinStatus.remainMin}분 안에
  추가로 합류할 수 있어요. 합류하면 인당 가격은 {perPersonAfterJoin}원이 돼요."
  ※ perPersonAfterJoin = floor((70000 + (joinStatus.current + 1 - 1) × 17500) / (joinStatus.current + 1))
- Sub caption 12/400 #76787A: "최종 인원이 늘어나면 가격이 자동으로 정산돼요."
- Two buttons stacked, gap 8px, 48px height, full-width, radius 14:
  - Primary: bg #2563EB white "{joinStatus.current + 1}명째로 합류할게요"
    → navigate("/payment", { state: { instructor, conditions, mode,
      fromInstructorJoin: true, joinRole: "subsequent",
      joinWindowMin: joinStatus.remainMin,
      currentCount: joinStatus.current + 1, allowMulti: true,
      perPersonPrice: perPersonAfterJoin } });
  - Secondary: bg transparent #4B4F54 15/600 "다른 강사 보기"
    → navigate(-1)  // back to C3

### C4 — "1:1 강습 ₩70,000원" 보조 카피
when `mode === "instant" && allowMulti`:
교체: "1:1 강습 ₩70,000원 — 함께 들으면 인당 가격이 분담돼요"
size: 13/400 #76787A.

##########################################################
# PRIORITY 4 — C7Payment — 합류 컨텍스트 표시
##########################################################

### C7Payment.tsx — read instructor-join context
```typescript
import { useLocation } from "react-router";
const location = useLocation();
const fromJoin = location.state?.fromInstructorJoin === true;
const joinRole = location.state?.joinRole;            // "first" | "subsequent" | "solo"
const currentCount = location.state?.currentCount ?? 1;
const joinWindowMin = location.state?.joinWindowMin;  // 첫 손님 60 / 후속 손님 remainMin
const perPersonPrice = location.state?.perPersonPrice ?? 70000;
const instructor = location.state?.instructor;
```

Remove every reference to `fromGroupMatching` and the old voting price
context. Pricing is now derived from currentCount and the v1 pricing
formula 모델 A.

### C7Payment.tsx — top chip
When `fromJoin && joinRole !== "solo"`:
- Show chip below header, padding 8×12, radius 999, bg #2563EB/10 text
  #2563EB 12/700, 본문:
  - joinRole === "first" → "1번째로 입장 · 합류 대기 1시간"
  - joinRole === "subsequent" → "{currentCount}번째로 합류 · 마감까지 {joinWindowMin}분"

### C7Payment.tsx — 합류 정산 안내 박스 (joinRole !== "solo" 일 때)
"결제 수단" 섹션 위에 안내 박스 삽입:
- bg #F5F6F7, padding 16, radius 14
- Heading 14/700 #191919: "추가 합류 시 가격이 자동 정산돼요"
- 본문 13/400 #4B4F54 leading-relaxed:
  - first: "지금은 1:1 기준 ₩70,000원이 부과돼요. 1시간 안에 다른 분이
    합류하면, 차액이 자동으로 환불·적립돼요."
  - subsequent: "지금은 {currentCount}명 기준 인당 ₩{perPersonPrice}원이
    부과돼요. 윈도우 안에 더 합류하면 차액이 자동으로 환불·적립돼요."

### C7Payment.tsx — 가격 라인 표시
- 1:1 / solo (joinRole === "solo" 또는 fromJoin === false 인 즉시 단독):
  단가 70,000원, 1명 → 70,000원
- first (혼자 입장, 합류 대기):
  현재 단가 70,000원, "최대 5명까지 인당 ₩28,000까지 분담 가능" 보조줄
- subsequent (N명째 합류):
  단가 ₩{perPersonPrice}원, 현재 인원 {currentCount}명, 추가 합류 시 정산

`tabular numerals` 적용 (font-feature-settings: "tnum").

### C7Payment.tsx — instant-only time string
- mode === "instant" + (joinRole !== "subsequent")
  → "지금부터 1시간 내 강습"
- mode === "instant" + joinRole === "subsequent"
  → "이 방 시작 시간 기준 1시간 내"
- mode === "reservation"
  → state.conditions.startTime 포맷한 실제 일시

##########################################################
# PRIORITY 5 — C8MatchConfirmed — 합류 상태 노출
##########################################################

### C8MatchConfirmed.tsx
location.state 에서 joinRole, currentCount, joinWindowMin 읽어옴.

- joinRole === "first":
  헤더 아래 안내: "혼자 매칭됐어요. 1시간 안에 추가 합류가 들어오면
  바로 알려드릴게요."
- joinRole === "subsequent":
  "{currentCount}명이 함께 들어요. 마감까지 {joinWindowMin}분 남았어요.
  최종 인원이 늘어나면 차액이 자동 정산돼요."
- joinRole === "solo" 또는 미정의:
  기존 텍스트 유지.

이미 매칭된 멤버 칩 (currentCount > 1 인 경우): "본인", "참가자 N"
형식 anonymous chip 가로 정렬 (이름·나이는 매칭 확정 후 채팅에서만
공개되므로 여기서는 anonymized).

##########################################################
# PRIORITY 6 — 04_matching_system.md 내용 반영
##########################################################

본 패치 적용 후 04_matching_system.md (외부 문서)의 다음 메커니즘이
앱 코드와 정확히 일치해야 함:

1. C2에서 즉시 + 함께 OK 선택 → C3 강사 풀 (합류 인디케이터 노출)
2. C3에서 강사 카드 tap → C4 프로필
3. C4 "매칭 시작" tap → 합류 동의 다이얼로그 (첫/후속 분기)
4. 합류 확정 → C7 결제 (정산 안내 + 가격 라인)
5. 결제 완료 → C8 매칭 완료 (합류 상태 표시)

##########################################################
# OUT OF SCOPE (do not change)
##########################################################

- v2 디자인 토큰, 폰트, 컬러 시스템 변경 금지
- 예약 매칭(C5, C6) 흐름은 그대로 유지 (이미 방 모델이라 합류 메커니즘
  동일하게 작동)
- 04 외 다른 .md 문서 수정 금지
- 새 라이브러리 추가 금지 (shadcn/ui, lucide-react만 사용)
- 매칭 알고리즘(필터링·정렬·뷰어 뱃지)은 v1 그대로 유지
```

---

## 사용 방법

1. Figma Make 같은 세션 열기 (Master Patch v1 이미 적용된 상태에서)
2. 위 ``` 코드블록 ``` 통째 복사
3. 입력창에 붙여넣기 → 생성
4. zip 받기 → `Create app wireframe` 폴더에 덮어쓰기
5. `pnpm dev` → 즉시·함께 OK 흐름 클릭 테스트

## 결과 받은 후 점검

| 영역 | 점검 |
|---|---|
| GroupMatching.tsx 제거 | 파일 부재 + import·route 모두 사라짐 |
| C2 라우팅 | instant + allowMulti → /instructors (NOT /group-matching) |
| C3 인디케이터 | "1:1 단독 가능" / "N명 함께 듣는 중 · OO분 남음" / "마감" 칩 노출 |
| C3 notice | 즉시·함께OK 모드에서만 상단 안내 strip 노출 |
| C3 full 카드 | 풀 하단으로 이동 + opacity 0.5 |
| C4 다이얼로그 | joinStatus.kind에 따라 첫/후속 분기 |
| C4 단독만 분기 | "1:1 단독만" 선택 시 /payment로 joinRole="solo" 전달 |
| C7 chip | "1번째로 입장 · 합류 대기 1시간" / "N번째로 합류 · 마감까지 M분" |
| C7 정산 안내 박스 | first/subsequent 본문 분기 |
| C7 가격 라인 | currentCount + perPersonPrice 반영, tabular numerals |
| C8 합류 상태 | joinRole별 안내 + anonymous member chips |
| 빌드 | `pnpm dev` 컴파일 통과 |

---

## v2 적용 후 워크플로우

이번 v2로 즉시·예약 두 모드가 동일한 "강사+시간 슬롯 방" 메커니즘으로
수렴함. 이후 모든 매칭 관련 신규 작업은:

1. 04_matching_system.md 문서에 메커니즘 변경 먼저 기록
2. Figma Make patch prompt 작성 → 적용
3. 결과 검증 후 wireflow patch로 흐름도 동기화

이 순서로 진행.
