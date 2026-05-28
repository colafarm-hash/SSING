# Figma Make — Wireflow Patch v2 (강사단위 합류 흐름 반영)

> **2026-05-29 메커니즘 변경**: 즉시 매칭의 그룹/Voting 경로(GM-A/B/C)
> 폐기. 즉시·예약 모두 동일한 "C3 → C4 → C7" 흐름으로 수렴.
> 차이는 C4 매칭 시작 시점에 합류 동의 다이얼로그가 뜨는지 여부뿐.
>
> 본 패치는 Wireflow Patch v1 (figma_make_wireflow_patch.md) 적용
> 후 같은 세션에 던진다.
>
> 아직 v1 안 던졌다면 v1 먼저 적용 → v2 적용.

---

## 사용 방법

1. Wireflow Diagram 만든 Figma Make 세션 열기 (새 창 X)
2. 아래 코드블록 ``` 내부 ``` 통째 복사
3. 입력창 붙여넣기 → 생성
4. 새 zip 받아서 `Wireflow Diagram for SSING` 폴더 덮어쓰기

---

## Patch v2

```
Apply this patch to the SSING Wireflow diagram. This REMOVES the
voting-based group matching cards (GM-A/B/C) and the GM-* row, and
re-routes all arrows to the new instructor-unit join model.

Idempotent — re-running should not duplicate work.

## ============================================================
## SECTION A — REMOVE GroupMatching cards
## ============================================================

### Delete the following 3 cards entirely:
- GM-A (GroupMatching Phase A — loading)
- GM-B (GroupMatching Phase B — group confirmed)
- GM-C (GroupMatching Phase C — voting)

Remove their:
- card SVG/HTML elements
- screen component imports (if any)
- positions in the grid (col2/3/4 at row Group)
- ALL arrows touching them:
  - C2 → GM-A (the Warm color arrow descending from C2)
  - GM-A → GM-B (Warm)
  - GM-B → GM-C (Warm)
  - GM-C → C7 (Warm, bent path)
  - any GM-* → other connection

### Delete the lane label "4. Instant Group"
The Group lane is gone. Re-number lane labels:
1. Auth
2. Home & Entry
3. Instant (was "Instant 1:1")
4. Reservation (was 5)
5. Payment & Confirmation (was 6)
6. Post-lesson (was 7)
7. Bottom Nav
8. Profile · Settings
9. Modals

The Instant lane now ALWAYS goes C2 → C3 → C4 → C7 regardless of
group size or allowMulti — the join behavior is resolved inside
C3/C4 via state, not by branching to a separate screen.

## ============================================================
## SECTION B — Repurpose the freed Group row
## ============================================================

Row Group (y=2380) is now mostly empty. Use it for sub-screens that
were squeezed into the Instant row before:

| Card | New position (col, row) |
|---|---|
| S1 Chat | (col5, row Group) y=2380 — moved from Instant row |
| S2 Location | (col4, row Group) y=2380 |
| S3 Notifications | (col5, row Group) y=2380 — slightly offset from S1, or use col6 |
| S9 Report | (col6, row Group) y=2380 |

If S1 and S3 collide in col5, push S3 to col6 and S9 to col7.

The row label "4. Instant Group" → replace with "Sub-screens" or
delete entirely (the cards are reachable via Bottom Nav anyway).

## ============================================================
## SECTION C — C3 card content update (join indicators)
## ============================================================

### C3 InstructorPool card

Add per-instructor join indicator chip below each instructor name.
Use 3 of the 4 mock cards to demonstrate the 3 states:

Card 1 (김OO, 5등급, 4.9):
- Chip: "1:1 단독 가능" (bg #F5F6F7 #4B4F54 12/600 rounded-full)

Card 2 (이OO, 4등급, 4.7):
- Chip: "2명 함께 듣는 중 · 38분 남음" (bg #2563EB/10 #2563EB 12/700)

Card 3 (박OO, 5등급, 5.0):
- Chip: "마감" (bg #E5E6E8 #A2A4A6 12/600). Card opacity 0.5 overall.

Card 4 (최OO, 3등급, 4.5):
- Chip: "1명 함께 듣는 중 · 52분 남음" (bg #2563EB/10 #2563EB 12/700)

### C3 top notice strip (NEW)
Add a single-line notice strip below the C3 header (between header
and sort chip row):
- bg #F5F6F7, padding 12×16, radius 12
- text 13/400 #4B4F54
- 본문: "같은 강사를 선택한 분들이 자동으로 합류돼요. 가격은 인원에
  따라 분담돼요."
- "X" close icon right (12px, #76787A)

### C3 count chip
"강사 3명" → "강사 4명" (now showing 4 cards).

## ============================================================
## SECTION D — C4 card content update (join dialog 표시)
## ============================================================

### C4 InstructorProfile card

Add a "합류 안내" mini-strip just above the bottom CTA, bg #F5F6F7,
padding 12, radius 12, text 13/400 #4B4F54:
- 본문: "매칭 시작 시 합류 동의 다이얼로그가 떠요"

Bottom CTA label unchanged: "매칭 시작 · ₩70,000원"
Under CTA add 12/400 #76787A caption: "함께 들으면 인당 가격이 분담돼요"

### NEW Modal card: JoinConsentDialog
Add a new modal card to the Modal cluster (col8) representing the
합류 동의 다이얼로그:

- Card title: "JoinConsentDialog"
- Body shows TWO stacked variants (small split inside the card):
  - 첫 손님 variant:
    - "함께 들을 분을 받을까요?" 14/700
    - "1시간 동안 방을 열어둘게요. 합류하면 가격 분담." 11/400 #76787A
    - Buttons: "함께 들을게요" (blue) / "1:1 단독만" (gray)
  - 후속 손님 variant:
    - "{강사} 방에 합류할까요?" 14/700
    - "2명 함께 듣는 중 · 38분 남음 · 인당 ₩43,750" 11/400 #76787A
    - Buttons: "3명째로 합류" (blue) / "다른 강사 보기" (transparent)

Position: (col8, between AlertSubscribe and Logout modals).

## ============================================================
## SECTION E — C7 card content update (정산 안내)
## ============================================================

### C7 Payment card

Add a top chip below the header:
- bg #2563EB/10 #2563EB 12/700 rounded-pill padding 4×10
- 본문: "1번째로 입장 · 합류 대기 1시간"

Add a "추가 합류 시 가격이 자동 정산돼요" 안내 박스 위에 결제 수단
섹션:
- bg #F5F6F7, padding 16, radius 14
- Heading 14/700: "추가 합류 시 가격이 자동 정산돼요"
- 본문 12/400 #4B4F54: "지금은 1:1 기준 ₩70,000원이 부과돼요. 1시간
  안에 다른 분이 합류하면 차액이 자동으로 환불·적립돼요."

가격 라인은 "1:1 기준 ₩70,000원 · 최대 5명까지 인당 ₩28,000까지
분담 가능" 같이 두 줄로 표시.

## ============================================================
## SECTION F — C8 card content update (합류 상태)
## ============================================================

### C8 MatchConfirmed card

Add a mini-strip just below the success icon area, bg #F5F6F7,
padding 12, radius 12, text 13/400 #4B4F54:
- 본문: "혼자 매칭됐어요. 1시간 안에 추가 합류가 들어오면 바로 알려드릴게요."

(첫 손님 케이스 데모용. 후속 손님 케이스는 dialog modal 카드 안에서
이미 표현됨.)

## ============================================================
## SECTION G — Arrow re-routing (post-GM removal)
## ============================================================

### REMOVE these arrows entirely:
1. C2 → GM-A (Warm)
2. GM-A → GM-B (Warm)
3. GM-B → GM-C (Warm)
4. GM-C → C7 (Warm bent)

### MODIFY these arrows:

#### C1 → C2 (Home → Entry)
Single arrow only — no more split between instant/reservation at C1.
The mode/allowMulti is set in C2. Use Brand Blue solid.
- `M 400,1100 L 520,1100` (kept as is, but single arrow not pair)

#### C2 → C3 (Instant flow primary path)
Brand Blue solid, used for ALL instant variants (1:1, 직접 그룹,
합류 모두):
- `M 800,1880 L 920,1880` (unchanged)

#### C2 → C5 (Reservation flow)
Black solid:
- `M 680,1380 L 680,3160` (unchanged, but now only 2 arrows leave C2:
  this one and C2→C3)

#### C3 → C4 (unchanged)
Brand Blue: `M 1200,1880 L 1320,1880`

#### C4 → JoinConsentDialog (NEW, conditional)
Light gray dotted #A2A4A6 stroke-width 1.5 strokeDasharray "2,2":
- `M 1460,2160 L 1460,2280 L 2940,2280 L 2940,3700 L 3000,3700`
  (down out of C4, right along yH3 lane to col8, down to modal)
- Caption near arrow midpoint: "합류 동의 시" 11/400 #76787A

#### C4 → C7 (always; dialog 결과와 상관없이 결제로)
Brand Blue solid: `M 1600,1880 L 1720,1880` (unchanged)

#### C7 → C8 (unchanged)
Success green: `M 2000,1880 L 2120,1880`

#### C8 → C9 (unchanged)
Success green: `M 2400,1880 L 2520,1880`

### ADD these arrows:

#### Modal trigger from C4
- C4 → JoinConsentDialog (above) — already specified.

### Bottom-nav and Settings arrows: unchanged
Keep all dashed gray arrows from v1.

## ============================================================
## SECTION H — Legend update
## ============================================================

Remove the "Warm #FF8A00 — Group flow" entry from the legend.
Group flow no longer exists.

Add to legend:
- "Light gray dotted #A2A4A6 — 합류 동의 다이얼로그 트리거"

Final legend:
1. Brand Blue solid #2563EB — Instant flow / Primary CTA
2. Black solid #191919 — Reservation flow
3. Success green solid #0FB882 — Payment → Confirmation
4. Gray dashed #76787A 4,4 — Conditional / Back / Bottom-nav
5. Light gray dotted #A2A4A6 2,2 — Modal trigger / 다이얼로그

## ============================================================
## SECTION I — Lane label restructuring
## ============================================================

Update lane labels (left margin, x=-100):

| Row Y | Label |
|---|---|
| y=0 → 560 | 1. Auth |
| y=820 → 1380 | 2. Home & Entry |
| y=1600 → 2160 | 3. Instant (즉시) |
| y=2380 → 2940 | Sub-screens (모달·상세) |
| y=3160 → 3720 | 4. Reservation (예약) |
| y=3940 → 4500 | 5. Bottom Nav |
| y=4720 → 5280 | 6. Profile · Settings |
| col8 vertical | Modals (raise label vertically on right margin) |

Re-flow Payment & Confirmation cluster (C7/C8/C9) into the Instant
row (y=1600) — they're already there. No separate lane needed.

## ============================================================
## SECTION J — Final card placement reference (post-v2)
## ============================================================

| Card | Col | Row | (x, y) |
|---|---|---|---|
| O1 Login | 1 | Auth | (120, 0) |
| C1 Home | 1 | Home | (120, 820) |
| C2 Request | 2 | Home | (520, 820) |
| C3 Pool | 3 | Instant | (920, 1600) |
| C4 Profile | 4 | Instant | (1320, 1600) |
| C7 Payment | 5 | Instant | (1720, 1600) |
| C8 Confirmed | 6 | Instant | (2120, 1600) |
| C9 Rating | 7 | Instant | (2520, 1600) |
| S1 Chat | 5 | Sub-screens | (1720, 2380) |
| S2 Location | 4 | Sub-screens | (1320, 2380) |
| S3 Notifications | 6 | Sub-screens | (2120, 2380) |
| S9 Report | 7 | Sub-screens | (2520, 2380) |
| C5 Rooms | 2 | Reservation | (520, 3160) |
| C6 Room Detail | 3 | Reservation | (920, 3160) |
| S4 History | 1 | Bottom Nav | (120, 3940) |
| S5 Messages | 2 | Bottom Nav | (520, 3940) |
| S6 Profile | 3 | Bottom Nav | (920, 3940) |
| EditProfile | 1 | Settings | (120, 4720) |
| PaymentMethods | 2 | Settings | (520, 4720) |
| NotificationSettings | 3 | Settings | (920, 4720) |
| Support | 4 | Settings | (1320, 4720) |
| Terms | 5 | Settings | (1720, 4720) |
| NotFound | 6 | Settings | (2120, 4720) |
| Receipt modal | 8 | — | (3000, 2380) |
| Cancel modal | 8 | — | (3000, 2940) |
| AlertSubscribe modal | 8 | — | (3000, 3500) |
| JoinConsentDialog (NEW) | 8 | — | (3000, 3700) |
| Logout modal | 8 | — | (3000, 4060) |

Note: AlertSubscribe and JoinConsentDialog are vertically close
(3500 vs 3700). If they collide, push JoinConsent to y=3800.

## ============================================================
## OUT OF SCOPE
## ============================================================

- Don't re-draw arrows that weren't affected by GM removal.
- Don't change pan/zoom.
- Don't change card sizes (280×560 unchanged).
- Don't change toolbar.
- Don't add interactivity.
```

---

## 결과 받은 후 점검

| 영역 | 점검 |
|---|---|
| GM 카드 | GM-A/B/C 3장 전부 사라짐 |
| Warm 화살표 | 4개 (C2→GMA, GMA→B, B→C, C→C7) 전부 사라짐 |
| 라인 라벨 | "Instant Group" 사라지고 "Sub-screens" 또는 미표시 |
| C3 인디케이터 | 4장 카드에 1:1 단독 가능 / 함께 듣는 중 / 마감 3종 표시 |
| C3 notice | 상단 안내 strip 표시 |
| C3 카드 카운트 | "강사 4명" |
| C4 합류 안내 | CTA 위 mini-strip 표시 + 보조 카피 |
| JoinConsentDialog | col8 modal 클러스터에 신규 카드 |
| C7 chip | "1번째로 입장 · 합류 대기 1시간" |
| C7 정산 안내 박스 | 결제 수단 위 박스 표시 |
| C7 가격 라인 | "1:1 기준 ₩70,000원 · 최대 5명 ₩28,000" |
| C8 합류 상태 | 첫 손님 안내 strip |
| C4 → JoinConsentDialog 화살표 | light gray dotted 표시 |
| Legend | Warm 항목 사라짐, 모달 트리거 추가 |
| 카드 배치 | C7/C8/C9가 Instant row에 정렬 |

## v2 적용 후 워크플로우

v1 → v2 적용 후 wireflow는 즉시·예약 두 모드가 **동일한 mainline
(C2 → C3/C5 → C4/C6 → C7 → C8 → C9)** 을 따르고, 차이는 분기 다이얼로그
(JoinConsentDialog) 호출 여부에 있음을 분명히 보여줌. 발표용으로
이전보다 깔끔.
