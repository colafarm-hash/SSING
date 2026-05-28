# Figma Make — Wireflow Patch (Content fixes + Orthogonal arrows)

> Wireflow Diagram for SSING 프로젝트의 **같은 세션**에 던지는 patch. 화면 내용 30+ 수정 + 화살표 ortho 재배치 + 누락 arrow 추가.

## 사용 방법

1. Wireflow Diagram 만든 Figma Make 세션 열기 (새 창 X — 기존 세션 이어서)
2. 아래 코드블록 ``` 내부 ``` 통째 복사
3. 입력창 붙여넣기 → 생성
4. 새 zip 받기 → `Wireflow Diagram for SSING` 폴더 덮어쓰기

---

## Patch

```
Apply this comprehensive patch to the SSING Wireflow diagram.
Idempotent — re-running should not duplicate work.

## ============================================================
## SECTION A — Content fixes (24 screen cards)
## ============================================================

### Global (cross-cutting)

1. Instructor grade badges — Replace EVERY "골드" yellow #FFD700 pill
   and "실버" silver #C0C0C0 pill with a SOLID #2563EB Brand Blue pill
   containing white text "N등급" (e.g. "5등급", "4등급").
   Affected cards: C3 list, C4 header, C5 instructor info, S5 thread
   rows. NO gold/silver anywhere in the wireflow.

2. Bottom nav labels — Use "내 정보" with a space (current wireflow
   uses "내정보" no space). Apply to ALL bottom-nav representations
   (C1, S4, S5, S6).

3. Bottom nav icons — Replace FileText → Clock for 내역 tab; replace
   MessageSquare → MessageCircle for 메시지 tab. Apply everywhere.

### O1 Login
- OK as-is. No changes.

### C1 Home
- ADD an "이번 시즌" info strip below the 예약 강습 card:
  - bg #F5F6F7, 16px radius, 16px padding
  - Line 1: "이번 시즌" 12/600 #76787A
  - Line 2: "12월 1일 ~ 3월 15일" 15/700 #191919 tabular
- ADD small caption "진행 중인 강습" 12/600 #76787A above the
  "오늘 14:00 · 김OO 강사" ongoing-match strip.

### C2 Request Input
- ADD a 장소 row at top of the form: blue accent bar + "장소" label
  + white card containing MapPin icon + "지산리조트" text.
- ADD 인원 chips row: 5 small chips "1 / 2 / 3 / 4 / 5", chip "2"
  selected with bg #2563EB white text.
- ADD 강습받는 사람 stack: 2 mini participant input rows showing
  "25세 · 남" and "23세 · 여" as filled chips.

### C3 Instructor Pool
- Sort chip row must have ALL 5: 추천순 / 등급순 / 평점순 / 거리순 / 가격순.
- Active sort chip color: bg #191919 (BLACK), white text. NOT blue.
- Count chip "강사 12명" → "강사 3명" (matches mock).
- Grade pills: 5등급/4등급 blue (per global rule).

### C4 Instructor Profile
- Metric tiles row: render ALL 4 tiles, not 2:
  1. 평점 4.9 (Star icon orange)
  2. 재예약 92% (TrendingUp icon green)
  3. 누적 강습 127 (Repeat icon blue)
  4. 거리 1.2km (MapPin icon orange)
- Use rebook 92% (not 89%).
- Grade badge "5등급" blue (per global rule).

### C5 Reservation Room List
- ADD "내 요청 · 스키 · 초급 · 2명 · 3시간 · 오늘 14:00" summary chip
  at top.
- ADD sort chip row: 추천순 / 시간순 / 등급순 / 평점순 / 가격순.
- Room 1 mock price: ₩35,000원 (2/4명 다중매칭). Room 2: ₩70,000원
  (1/1 단독). Replace the wrong values currently shown.
- Capacity room 1: 2/4명 (not 3/4명).
- Grade pills: 5등급/4등급 blue.

### C6 Room Detail
- ADD 시간 제한 row in the room info card: AlertCircle warm icon +
  "추가 입장 ~ 13:30까지" text.

### C7 Payment
- Payment method radio list must show 3 methods, not 2:
  1. 카드 (CreditCard icon)
  2. 카카오페이
  3. 토스 (Toss)
- ADD star rating + grade badge under the instructor name in the
  C7 instructor summary at top.

### C8 Match Confirmed
- OK as-is.

### C9 Post-Lesson Rating
- OK as-is.

### GroupMatching Phase A (loading)
- ADD conditions chip row at the bottom of the loader area:
  "스키" / "초급" / "3시간" (3 compact pills bg #F5F6F7 #4B4F54).

### GroupMatching Phase B (group confirmed)
- OK. Verify "본인" chip is highlighted (bg #2563EB/10 #2563EB text).

### GroupMatching Phase C (voting)
- Show 4 instructor candidate cards (not 2).
- Timer pill color: bg rgba(255,138,0,0.10) text #FF8A00 (warm),
  NOT yellow #FEE500.

### S1 Chat
- OK overall. Optionally change demo last message to
  "메인 슬로프 입구 리프트 앞에서 만나요" to match S5 thread preview.

### S2 Location Picker
- OK.

### S3 Notifications
- OK. Optional: ensure unread blue dot rendered on at least one row.

### S4 History
- Card rows should include:
  - Date · Instructor name
  - Status pill (color-coded: 진행 중 #2563EB / 완료 · 평가 남음 #FF8A00 /
    완료 #76787A / 취소 #F5444C)
  - Small meta row "스키 · 초급 · 지산리조트"
  - Price tag ₩43,750원
- Include at least one "완료 · 평가 남음" variant card.

### S5 Messages
- Bottom nav: "내 정보" with space (per global).
- Show at least 2 thread rows for realism.

### S6 Profile
- Stat tile labels: "총 강습 횟수" 8회 + "총 결제 금액" ₩35만 (or
  ₩350,000원). Match mock data (totalLessons=8, totalSpent=350000).
- Menu item second row: "결제 수단 관리" (NOT just "결제 수단").

### S9 Report
- OK.

### Settings cluster (EditProfile, PaymentMethods, NotificationSettings,
    Support, Terms, NotFound)
- OK overall, no changes needed in this wireflow.

### Modal cards
- All 4 OK (ReceiptModal, CancelDialog, AlertSubscribeModal, LogoutDialog).

### Lane labels
- ENSURE all 10 swim/cluster labels are placed in left margin:
  1. Auth / 2. Home & Entry / 3. Instant 1:1 / 4. Instant Group /
  5. Reservation / 6. Payment & Confirmation / 7. Post-lesson /
  Bottom Nav / Profile · Settings / Modals
- Position x=-100, vertical center of each row group, 14/700 #76787A.

## ============================================================
## SECTION B — Arrow layout: orthogonal (꺾인선) routing
## ============================================================

### New grid

Card size unchanged (280×560). Increase gaps for routing channels.

COLUMN X (card left-edge):
- Col 1 = 120  (O1, C1, S4, EditProfile)
- Col 2 = 520  (C2, GM-A, C5, S5, PaymentMethods)
- Col 3 = 920  (C3, GM-B, C6, S6, NotificationSettings)
- Col 4 = 1320 (C4, GM-C, S2, Support)
- Col 5 = 1720 (C7, S1, S3, Terms)
- Col 6 = 2120 (C8, S9, NotFound)
- Col 7 = 2520 (C9)
- Col 8 = 3000 (Modal cluster: Receipt/Cancel/AlertSubscribe/Logout)

ROW Y (card top-edge):
- Row Auth y=0
- Row Home y=820
- Row Instant1:1 y=1600
- Row Group y=2380
- Row Reservation y=3160
- Row BottomNav y=3940
- Row Settings y=4720

Reposition every card to its (col, row) per the Lane Assignment below.

### Lane assignment (card placements)

| Lane (row) | Cards at that row |
|---|---|
| Auth | O1(col1) |
| Home & Entry | C1(col1), C2(col2) |
| Instant 1:1 | C3(col3), C4(col4) |
| Instant Group | GM-A(col2), GM-B(col3), GM-C(col4) |
| Reservation | C5(col2), C6(col3) |
| Payment & Confirmation (overlay on Instant1:1 row, right side) | C7(col5), C8(col6), C9(col7) |
| Post-lesson | S1(col5, Group row), S9(col6, Group row) |
| Bottom Nav cluster | S4(col1), S5(col2), S6(col3) at row BottomNav |
| Profile-Settings cluster | EditProfile(col1), PaymentMethods(col2), NotificationSettings(col3), Support(col4), Terms(col5) at row Settings |
| Sub-screens | S2(col4 Group row), S3(col5 Group row) |
| Modals | Receipt(col8, near C8), Cancel(col8 below Receipt), AlertSubscribe(col8 below Cancel), Logout(col8 bottom) |
| NotFound | col6 row Settings |

### Routing channels (centerlines for ortho paths)

Horizontal lanes (between rows):
- yH1 = 720  (between Auth and Home)
- yH2 = 1500 (between Home and Instant1:1)
- yH3 = 2280 (between Instant1:1 and Group)
- yH4 = 3060 (between Group and Reservation)
- yH5 = 3840 (between Reservation and BottomNav)
- yH6 = 4620 (between BottomNav and Settings)

Vertical lanes (between columns):
- xV1 = 420, xV2 = 820, xV3 = 1220, xV4 = 1620, xV5 = 2020,
  xV6 = 2420, xV7 = 2900

### Orthogonal routing rules

1. EVERY arrow uses only horizontal and vertical segments. NO
   diagonals. NO bezier curves except 10px rounded bends at corners.
2. Use SVG path pattern:
   `M sx,sy L bendX,sy L bendX,by L tx,by L tx,ty` etc.
3. To round corners by 10px, use `Q`:
   `M sx,sy L bendX-10,sy Q bendX,sy bendX,sy+10 L bendX,by-10 Q bendX,by bendX+10,by L tx,by`
4. Helper function suggested:
   ```js
   function orthoLane(sx, sy, tx, ty, laneX) {
     return `M ${sx},${sy} L ${laneX},${sy} L ${laneX},${ty} L ${tx},${ty}`;
   }
   ```
5. `strokeLinejoin="round"` and `strokeLinecap="round"` on every path.

### Stagger map (shared lane offsets)

When multiple arrows traverse the same channel, offset by ±10-20px:
- yH1 channel: C9→C1 back-arrow uses y=540 (above the row);
  S4→C1 uses y=720; S5→C1 uses y=700; S6→C1 uses y=680.
- yH3 channel: GM-C→C7 at y=2280; C8→S1 at y=2300; C8→S9 inline at row.
- xV5/xV6 channels (right side): Receipt/Cancel/Alert/Logout arrows
  stagger by Y-target.
- xV4 channel: C6→C7 at x=1080, GM-C→C7 at x=1460.

### Complete arrow list with new ortho paths

(Replace ALL existing arrows with these. Coordinates use new grid.)

Color codes:
- Brand Blue #2563EB solid (Instant flow)
- Black #191919 solid (Reservation flow)
- Warm #FF8A00 solid (Group flow)
- Success #0FB882 solid (Payment → Confirmation)
- Gray #76787A dashed 4,4 (Conditional / Back / Bottom-nav)
- Light gray #A2A4A6 dotted 2,2 (Modal trigger)

#### Auth & Entry
- O1 → C1 (Blue): `M 260,560 L 260,820`

#### Home → C2 routes
- C1 → C2 instant (Blue): `M 400,1100 L 520,1100`
- C1 → C2 reservation (Black): `M 400,1120 L 520,1120` (+20 offset)

#### Home → bottom-tab destinations (Gray dashed)
- C1 → S4 history: `M 260,1380 L 260,3940` (straight down col 1)
- C1 → S5 messages: `M 280,1380 L 280,3920 L 660,3920 L 660,3940` (bend right)
- C1 → S6 profile: `M 300,1380 L 300,3900 L 1060,3900 L 1060,3940`
- C1 → S2 location: `M 400,1080 L 420,1080 L 420,2660 L 1460,2660` (bend through lane)
- C1 → S3 notifications: `M 400,1060 L 1860,1060 L 1860,2660` (lane through yH2 → down)
- C1 → C8 ongoing-match: `M 400,1100 L 2080,1100 L 2080,1600` (top-bound entry to C8)

#### Instant 1:1 flow (Blue)
- C2 → C3: `M 800,1880 L 920,1880` (straight horizontal)
- C3 → C4: `M 1200,1880 L 1320,1880`
- C4 → C7: `M 1600,1880 L 1720,1880`

#### Instant Group flow (Warm)
- C2 → GM-A: `M 660,1380 L 660,2380` (straight vertical down)
- GM-A → GM-B: `M 800,2660 L 920,2660`
- GM-B → GM-C: `M 1200,2660 L 1320,2660`
- GM-C → C7: `M 1460,2380 L 1460,2280 L 1860,2280 L 1860,2160`
  (up to yH3 lane, right, down into C7 bottom)

#### Reservation flow (Black)
- C2 → C5: `M 680,1380 L 680,3160` (vertical col 2, offset +20)
- C5 → C6: `M 800,3440 L 920,3440`
- C6 → C7: `M 1080,3160 L 1080,1500 L 1860,1500 L 1860,1880`
  (up through col 3 right lane, right through yH2, down into C7 top-right)

#### Payment & Confirmation (Success)
- C7 → C8: `M 2000,1880 L 2120,1880`
- C8 → C9: `M 2400,1880 L 2520,1880`

#### Post-lesson (Success / Gray dashed)
- C8 → S1 chat (Success): `M 2120,2160 L 2120,2300 L 1860,2300 L 1860,2380`
- C9 → S9 report (Gray dashed): `M 2660,2160 L 2660,2380 L 2260,2380`
- C9 → C1 back (Gray dashed, top arc):
  `M 2660,1600 L 2660,540 L 260,540 L 260,820`

#### Bottom nav back-to-home (Gray dashed, staggered)
- S4 → C1: `M 260,3940 L 260,720 L 260,820` (vertical straight, no bend needed since same x)
- S5 → C1: `M 660,3940 L 660,700 L 260,700 L 260,820`
- S6 → C1: `M 1060,3940 L 1060,680 L 260,680 L 260,820`

#### Bottom nav cross-links (Gray dashed)
- S4 → C8 (진행 중 강습 card): `M 400,4220 L 1640,4220 L 1640,2160 L 2120,2160 L 2120,1880` (long horizontal at y=4220 lane, then up)
- S4 → C9 (평가 남음 card): `M 400,4240 L 2480,4240 L 2480,1880 L 2520,1880`
- S5 → S1 (thread tap): `M 800,4200 L 1860,4200 L 1860,2660`

#### Profile → settings sub-screens (Gray dashed, fan-out)
Use a manifold:
- S6 trunk down: `M 1060,4500 L 1060,4640` (drop into yH6 lane)
- Then 5 branches from (1060, 4640):
  - → EditProfile (col1, y=4720): `M 1060,4640 L 260,4640 L 260,4720`
  - → PaymentMethods (col2): `M 1060,4640 L 660,4640 L 660,4720`
  - → NotificationSettings (col3): `M 1060,4640 L 1060,4720`
  - → Support (col4): `M 1060,4640 L 1460,4640 L 1460,4720`
  - → Terms (col5): `M 1060,4640 L 1860,4640 L 1860,4720`

#### Profile → logout modal (Light gray dotted)
- S6 → Logout modal: `M 1200,4220 L 2940,4220 L 2940,4060 L 3000,4060`

#### Modal triggers (Light gray dotted, right side, staggered Y)
- C8 → Receipt modal: `M 2400,1880 L 2900,1880 L 2900,2380 L 3000,2380`
- C8 → Cancel modal: `M 2400,1900 L 2880,1900 L 2880,2940 L 3000,2940`
  (offset x=2880 to avoid Receipt's lane)
- C3 → AlertSubscribe modal (empty state): `M 1200,1900 L 2920,1900 L 2920,3500 L 3000,3500`
- C5 → AlertSubscribe modal: `M 1060,3440 L 2920,3440 L 2920,3500 L 3000,3500`

#### NotFound — no explicit arrows
Just place the NotFound card in (col6, Settings row) with a small
caption near it: "* 모든 알 수 없는 경로". Do NOT draw arrows to it.

### Marker definitions
Keep all 6 existing arrow markers (blue, black, orange, green, gray,
light-gray). Apply correctly to each path.

### Rendering quality
- All arrow paths use `strokeLinejoin="round" strokeLinecap="round"`.
- For dashed/dotted, use `strokeDasharray="4,4"` (dashed) or `"2,2"` (dotted).
- Stroke width: 2 for solid primary flows (Blue/Black/Warm/Green),
  1.5 for Gray dashed/dotted.

## ============================================================
## OUT OF SCOPE
## ============================================================

- Don't change pan/zoom behavior.
- Don't change toolbar.
- Don't change legend (but update legend entries if new colors added — none).
- Don't add new screens beyond the 24 + 4 modal = 28 cards already specified.
- Don't add interactivity (cards still non-clickable in wireflow).
```

---

## 결과 받은 후 점검

| 영역 | 점검 |
|---|---|
| 등급 표시 | 모든 카드에서 골드/실버 사라지고 "N등급" 블루 pill |
| 바텀 nav | "내 정보" 공백 + Clock/MessageCircle 아이콘 |
| C1 | 진행 매칭 caption + 이번 시즌 strip 추가 |
| C2 | 장소·인원·강습받는 사람 표시 |
| C3 | 5개 sort chip + 검정 활성 |
| C4 | 메트릭 4타일 |
| C5 | 내 요청 summary + sort + 정확한 가격·인원 |
| C6 | 시간 제한 row |
| C7 | 결제 3종 + 강사 별점 |
| GM-A | conditions chip |
| GM-C | 4명 강사 후보 + 주황 timer |
| S4 | 다양한 status + 가격 + 메타 |
| S6 | 결제 수단 관리 정정 |
| 화살표 | 모두 ortho (꺾인선), 겹치지 않음, 누락 25개 추가 |
| 그리드 | 열간격 120 / 행간격 220 / 채널 명확 |
| Lane 라벨 | 10개 모두 좌측 margin 표시 |

## 던지는 법

1. **Wireflow Diagram 만들었던 Figma Make 세션 열기** (새 창 X)
2. 위 ``` 코드블록 ``` 통째 복사
3. 입력창에 붙여넣기 → 생성
4. 새 zip 받아서 `Wireflow Diagram for SSING` 폴더 덮어쓰기

이 patch 적용되면 발표 가능 수준 wireflow 됩니다.
