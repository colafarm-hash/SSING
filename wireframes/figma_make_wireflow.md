# Figma Make — Wireflow (전체 화면 흐름도)

> **새 Figma Make 프로젝트**에 던질 자기완결 prompt. 기존 SSING 앱 프로젝트와 별개. 한 보드에 24개 화면 + 모달 + 화살표 흐름을 표시하는 발표·인수인계용 wireflow 산출물.

## 사용 방법

1. **새 Figma Make 창** 열기 (기존 앱 프로젝트와 다른 새 프로젝트)
2. 아래 코드블록 (``` 내부 ```) 통째 복사
3. 입력창 붙여넣기 → 생성
4. 결과: HTML 한 페이지 (scrollable + zoomable wireflow 보드)

---

## Wireflow Prompt

```
Build a single-page WIREFLOW DIAGRAM for the SSING mobile app — a
visualization showing all 24 screens of the app as mini phone-frame
cards laid out on one large scrollable/zoomable board, connected by
arrows showing the user navigation flow.

This is a presentation and dev-handoff artifact, not a working app.
Output: ONE HTML page with all screens visible at once. No routing,
no real interactivity beyond pan/zoom on the board.

## OUTPUT FORMAT

Single React component that renders a large absolute-positioned SVG
+ HTML canvas (e.g. 4000×3000px) containing:
- Phone-frame cards for each screen (~280×560px each, mini-mockup style)
- SVG arrows connecting screens with proper color/style coding
- Section labels (swim lanes + clusters)
- Legend showing arrow color meaning

Wrap everything in a container that allows pan + zoom (use a simple
mouse-drag pan + scroll-wheel zoom; library not needed — implement
with CSS transform on a wrapper div).

Top of the page: a minimal toolbar with current zoom level + "Reset
view" button.

## CONTEXT — SSING APP

SSING is a Korean ski/snowboard lesson matching platform. Two matching
modes:
- Instant matching (요청 즉시 강사 매칭)
- Reservation matching (원하는 시간에 강사 매칭)

Within instant mode, users can choose "1:1 단독" or "함께도 OK" (group
matching with voting).

## DESIGN SYSTEM TOKENS (v2 — same as the app itself)

- Phone frame: white bg, 24px outer radius simulating a phone, 1px
  border #E5E6E8
- Card background: white
- Text: #191919 (primary) / #4B4F54 (body) / #76787A (caption) /
  #A2A4A6 (placeholder)
- Brand Blue: #2563EB
- Surfaces: #FFFFFF / #F5F6F7
- Pretendard font with Korean fallback
- Weights: 700 / 600 / 400 only (no font-black/900)
- No colored shadows, no decorative gradients on the wireflow itself

## 24 SCREEN CARDS (mini-mockup specs)

Each screen card is ~280×560px (proportional iPhone aspect), with:
- Top label outside the frame: screen ID + name (e.g. "C1 · Home")
  in 12/700 #191919
- Inside the frame: simplified UI of the screen — header + 2-4 key
  content blocks. Use real Korean copy from the app.
- Bottom outside the frame: tiny path label (e.g. "/login") in
  10/500 #76787A

Detail per screen:

### O1 · Login (/login)
- Top: small "SSING" wordmark + "스키 · 보드 강습 매칭"
- Middle: yellow #FEE500 button "카카오로 시작하기" + black #191919
  button "Apple로 시작하기"
- Bottom: tiny terms note

### C1 · Home (/)
- Header strip: 지산리조트 chip + 알림 벨
- Compact gray strip "오늘 14:00 · 김OO 강사" (ongoing match)
- Large Brand Blue card "지금 강습 · 요청 즉시 강사 매칭"
- Smaller white card with border "예약 강습 · 원하는 시간에 강사 매칭"
- Bottom tab bar: 홈(active) / 내역 / 메시지 / 내 정보

### C2 · Request Input (/request)
- Header: back + "즉시 강습" or "예약 강습"
- Form sections (compressed): 종목 chips (스키/보드), 레벨 chips
  (입문/초급/상급), 인원 chips (1-5), 시간 chips (2/3/4시간), 장소 row,
  강습받는 사람 stack
- "함께 듣기" toggle row (when applicable)
- Sticky bottom: blue "강사 매칭 시작" button

### C3 · Instructor Pool (/instructors)
- Header: back + count chip "강사 N명"
- Sticky sort chip row (추천순/등급순/평점순/거리순/가격순)
- Instructor cards (2 visible): avatar + name + grade badge + rating
  + price ₩70,000원 + viewer badge

### C4 · Instructor Profile (/instructor/:id)
- Header: back + "강사 프로필"
- Large avatar + name + grade
- 4-tile metric grid: 평점 · 재예약 · 누적 강습 · 거리
- Price card + intro + reviews
- Sticky bottom: blue "매칭 시작" button

### C5 · Reservation Room List (/rooms)
- Header: back + count chip "방 N개"
- Request summary chip
- Sort chip row
- Room cards: instructor info + start time + occupancy + multi badge
  + price + viewer badge

### C6 · Room Detail (/room/:id)
- Header: back + "방 상세"
- Instructor summary
- Room info card (start time, duration, capacity, price)
- Current entrants (anonymized "OO세 · 남/여")
- Sticky bottom: blue "입장하기" button

### C7 · Payment (/payment)
- Header: back + "결제"
- Instructor summary
- Lesson info card (5 rows)
- Price breakdown: 1:1 기준가 ₩70,000원 / 인원 분담 (-#0FB882) / 1인
  부담 ₩43,750원 (large)
- Payment method radio list (카드/카카오페이/토스)
- Sticky bottom: blue "₩43,750원 결제하기"

### C8 · Match Confirmed (/confirmed)
- Header: back + "매칭 확정"
- Calm success: small #0FB882 check + "매칭 완료" 20/700
- Instructor card + blue "강사와 채팅하기" button
- Lesson info + payment summary
- Quiet "강습 완료 · 평가하기" gray button (demo trigger)
- Tiny "강습 취소" link bottom

### C9 · Post-Lesson Rating (/rating)
- Header: back + "강습 평가" + "나중에" text
- Header section "강습은 어떠셨어요?" 26/700
- Star rating row (5 stars, large) + label tier badge
- Review textarea
- Re-booking intention check
- Sticky bottom: blue "평가 제출"

### GroupMatching · Phase A (loading) (/group-matching phase=matching)
- Header: back, no title
- Center: dual-ring pulse animation (static representation OK in wireflow)
  + Users icon + "비슷한 분들을 찾고 있어요" + subtext
- 3 bouncing dots + rotating status text
- Conditions chip row

### GroupMatching · Phase B (group confirmed)
- Header: back, no title
- Center: large #0FB882 CheckCircle + "3명이 매칭됐어요"
- Member chip row: 본인 (blue tint) + "28세 · 남" + "31세 · 여"
- Subtext "강사를 함께 골라볼게요"

### GroupMatching · Phase C (voting)
- Header: back + "강사 투표" + timer pill "2:47 남음"
- Notice strip
- Member status row (votes indicator)
- 4 instructor candidate cards with vote count + "투표하기" button

### S1 · Chat (/chat/:matchId)
- Header: back + instructor name "김OO 강사"
- System message bubble centered "매칭이 확정됐어요"
- Chat bubbles: incoming (gray, left) + outgoing (Brand Blue, right)
- Bottom input bar with send icon

### S2 · Location Picker (/location)
- Header: back + "스키장 선택"
- List rows: 지산리조트 (current, check icon) + 비발디파크 + 곤지암 + ...
- "지원 예정" section at bottom

### S3 · Notifications (/notifications)
- Header: back + "알림" + "모두 읽음" text right
- Group: 오늘 / 이번 주
- Notification rows: icon + title + preview + timestamp + unread dot

### S4 · History (/history)
- Header: "강습 내역" (centered, tab)
- Filter chips: 진행 중 / 완료 / 취소
- Lesson cards: date · instructor + status pill (color-coded)
- Bottom tab bar (내역 active)

### S5 · Messages (/messages)
- Header: "메시지" (centered, tab)
- Thread rows: avatar + name + grade badge + last message + time + unread badge
- Bottom tab bar (메시지 active)

### S6 · Profile (/profile)
- Header: "내 정보" (centered, tab)
- Profile section: avatar + name + email + 2 stat tiles (총 강습 · 총 결제)
- Settings menu rows (5): 내 정보 수정 / 결제 수단 / 알림 설정 / 고객 지원 / 약관·정책
- Red 로그아웃 row at bottom
- Bottom tab bar (내정보 active)

### S9 · Report (/report/:matchId)
- Header: back + "강사 신고"
- 신고 사유 selection (5 reasons)
- 상세 내용 textarea
- Note strip with match ID
- Sticky bottom: blue "신고 제출"

### EditProfile (/edit-profile)
- Header: back + "내 정보 수정"
- Avatar + "사진 변경" link
- Form fields: 이름 / 이메일 (disabled) / 전화번호
- Sticky bottom: "저장" button

### PaymentMethods (/payment-methods)
- Header: back + "결제 수단 관리"
- Method cards: card icon + label + "기본" pill + delete trash
- Dashed "+ 결제 수단 추가" button

### NotificationSettings (/notification-settings)
- Header: back + "알림 설정"
- Section "알림 종류": 4 toggle rows
- Section "알림 채널": 3 toggle rows (32px gap above)

### Support (/support)
- Header: back + "고객 지원"
- Section "자주 묻는 질문": accordion items (collapsed)
- Section "1:1 문의": gray button with message icon

### Terms (/terms)
- Header: back + "약관·정책"
- 6 policy rows with ChevronRight
- Bottom caption with company info

### NotFound (*)
- Centered: large 404 or "페이지를 찾을 수 없어요"
- "홈으로" button

## MODAL CARDS (4)

Smaller cards (~240×400px) styled as overlays. Place in a separate
"Modals" cluster:

### ReceiptModal (bottom sheet, from C8)
- Sheet handle on top
- "결제 상세" header
- Itemized rows: 1:1 기준가 · 인원 분담 (-) · 1인 부담 (large) ·
  결제 수단 · 결제 일시 · 매칭 ID
- Black "닫기" button

### CancelDialog (centered, from C8)
- Title "강습을 취소하시겠어요?"
- Refund policy note
- Red "강습 취소하기" button + gray "돌아가기"

### AlertSubscribeModal (bottom sheet, from C3/C5 empty)
- Header "강사 등장 알림 받기" or "방 열림 알림 받기"
- Description
- Blue "알림 받기" + gray "취소"

### LogoutDialog (centered, from S6)
- Title "로그아웃하시겠어요?"
- Red "로그아웃" button + gray "취소"

## BOARD LAYOUT (Hybrid: swim lanes + clusters)

Arrange cards on the board as follows (use absolute positioning).
Coordinates approximate — adjust for visual balance.

### LANE 1 — Auth (top, y=0)
Single card: O1 Login (x=120)

### LANE 2 — Home & Entry (y=700)
C1 Home (x=120) → C2 Request Input (x=480)

### LANE 3 — Instant 1:1 flow (y=1400)
C2 → C3 Pool (x=480) → C4 Profile (x=840) → arrows toward C7

### LANE 4 — Instant Group flow (y=2100)
C2 → GroupMatching A (x=480) → GroupMatching B (x=840) →
GroupMatching C (x=1200) → arrows toward C7

### LANE 5 — Reservation flow (y=2800)
C2 → C5 Room List (x=480) → C6 Room Detail (x=840) → arrows toward C7

### LANE 6 — Payment & Confirmation (right column, y=1400-2800)
C7 Payment (x=1560) → C8 Confirmed (x=1920) → C9 Rating (x=2280) →
back to C1 (curve arrow back to top-left)

### LANE 7 — Post-lesson (y=2800 continued)
S1 Chat (x=1920 + offset) [from C8]
S9 Report (x=2280 + offset) [from C9]

### CLUSTER A — Bottom Nav destinations (y=3500, horizontal row)
S4 History · S5 Messages · S6 Profile · S2 Location · S3 Notifications
(each ~280px wide, gap 40px)

### CLUSTER B — Settings sub-screens (y=4200, horizontal row)
EditProfile · PaymentMethods · NotificationSettings · Support · Terms
Place near S6 Profile.

### CLUSTER C — Modals (right side, y=2100)
ReceiptModal · CancelDialog · AlertSubscribeModal · LogoutDialog
Near their parent screens.

### EXTRA — NotFound (bottom-right corner)
Single card representing the * catch-all.

## ARROWS — COLOR CODING

Use SVG <path> elements for arrows. Curved (bezier) preferred for
non-adjacent screens, straight for adjacent.

| Color | Stroke | Style | Meaning |
| #2563EB (Brand Blue) | 2px | solid | Instant matching primary flow |
| #191919 (Black) | 2px | solid | Reservation matching primary flow |
| #FF8A00 (Warm) | 2px | solid | Group matching flow |
| #0FB882 (Success) | 2px | solid | Payment → confirmed |
| #76787A (Gray) | 1.5px | dashed (4,4) | Conditional / back / optional |
| #A2A4A6 (Light gray) | 1.5px | dotted (2,2) | Modal trigger (parent → modal) |

Arrowhead: small triangle marker at the target end (use SVG <marker>).

## SPECIFIC ARROWS TO DRAW

(Source screen → Target screen, color)

Auth & Entry:
- O1 → C1 (Brand Blue, solid) "로그인 성공"

Home navigation:
- C1 → C2 (Brand Blue) "즉시 강습 탭" [variant: instant]
- C1 → C2 (Black) "예약 강습 탭" [variant: reservation]
- C1 → C8 (Gray dashed) "진행 매칭 클릭" [conditional]
- C1 → S2 (Gray dashed) "위치 핀 클릭"
- C1 → S3 (Gray dashed) "벨 클릭"
- C1 → S4 (Gray dashed) "내역 탭"
- C1 → S5 (Gray dashed) "메시지 탭"
- C1 → S6 (Gray dashed) "내 정보 탭"

Instant 1:1:
- C2 → C3 (Brand Blue) "instant + 1:1 제출"
- C3 → C4 (Brand Blue) "강사 카드 탭"
- C4 → C7 (Brand Blue) "매칭 시작"

Instant Group:
- C2 → Group Phase A (Warm) "instant + 함께OK 제출"
- Group A → Group B (Warm) "3s 후 자동"
- Group B → Group C (Warm) "2s 후 자동"
- Group C → C7 (Warm) "voting 결과"

Reservation:
- C2 → C5 (Black) "reservation 제출"
- C5 → C6 (Black) "방 카드 탭"
- C6 → C7 (Black) "입장 동의"

Payment & Confirmation:
- C7 → C8 (Success) "결제 성공"
- C8 → S1 (Success) "강사와 채팅"
- C8 → C9 (Success) "강습 완료"
- C9 → C1 (Gray dashed, curved back) "평가 제출"
- C9 → S9 (Gray dashed) "강사 신고"

Bottom nav cross-links (from S4/S5/S6, gray dashed):
- S4 → C1, S5 → C1, S6 → C1
- S4 → C8 (진행 중 강습 카드)
- S4 → C9 (평가 남음 카드)
- S5 → S1 (스레드 탭)

Profile menu:
- S6 → EditProfile · PaymentMethods · NotificationSettings · Support · Terms
  (all Gray dashed)

Modals (Gray dotted, from parent → modal):
- C8 → ReceiptModal
- C8 → CancelDialog
- C3 → AlertSubscribeModal (empty state)
- C5 → AlertSubscribeModal
- S6 → LogoutDialog

NotFound:
- *all* → NotFound (catch-all, do not draw explicit arrows; just place
  the card in a corner with a small "* 모든 경로" caption)

## LANE LABELS

Place lane title labels in the left margin (x=-100, before each lane's
y position). 14/700 #76787A.

- "1. Auth"
- "2. Home & Entry"
- "3. Instant 1:1"
- "4. Instant Group Matching"
- "5. Reservation"
- "6. Payment & Confirmation"
- "7. Post-lesson"
- "Bottom Nav"
- "Profile · Settings"
- "Modals"

## LEGEND (top-right of board, 320×200px card)

Title: "Wireflow 범례"
Rows:
- (Brand Blue line) 즉시 매칭 흐름
- (Black line) 예약 매칭 흐름
- (Warm orange line) 그룹 매칭 흐름
- (Green line) 결제 완료 흐름
- (Gray dashed) 조건부 / 보조 이동
- (Gray dotted) 모달 호출
- "screen card · ID + 이름 + 경로"

## PAN / ZOOM CONTROLS

Implement simple pan + zoom on the board container:

```javascript
// In the wireflow component
const [scale, setScale] = useState(0.4); // start zoomed out
const [pan, setPan] = useState({ x: 0, y: 0 });
const isDragging = useRef(false);
const dragStart = useRef({ x: 0, y: 0 });

const onMouseDown = (e) => {
  isDragging.current = true;
  dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
};
const onMouseMove = (e) => {
  if (!isDragging.current) return;
  setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
};
const onMouseUp = () => { isDragging.current = false; };
const onWheel = (e) => {
  e.preventDefault();
  setScale(s => Math.min(2, Math.max(0.2, s + (e.deltaY > 0 ? -0.05 : 0.05))));
};
```

Wrap the entire board in:
`<div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "0 0" }}>`

Cursor: "grab" default, "grabbing" while dragging.

Toolbar at top: zoom display + "Reset view" button (sets scale to 0.4
and pan to 0).

## OUTPUT CONSTRAINTS

- Single React component file (App.tsx + maybe Wireflow.tsx + helpers)
- Use Tailwind for styling
- Use inline SVG for arrows and markers
- Use Lucide React icons inside the phone-frame cards
- No external diagram libraries (react-flow, etc.) — implement with
  raw SVG + DOM
- Korean copy as specified above
- All 24 screens visible at default zoom
- Performance: 24 cards + ~40 arrows should render smoothly

## NOTHING ELSE

- Don't make the cards interactive (no real navigation between cards)
- Don't try to mirror exact pixel-level mockups — simplified is fine
- Don't add a sidebar or modal UI on the wireflow itself
- Don't add export to PNG/PDF (let user screenshot)
```

---

## 결과 받은 후 점검

| 항목 | 기대 |
|---|---|
| 24개 화면 카드 모두 표시 | O1, C1~C9, GroupMatching 3 phases, S1·2·3·4·5·6·9, EditProfile·PaymentMethods·NotificationSettings·Support·Terms, NotFound |
| 4개 모달 카드 | ReceiptModal, CancelDialog, AlertSubscribeModal, LogoutDialog |
| Swim lane 7개 + cluster 3개 배치 | 가로 흐름 좌→우, 부수 cluster는 아래/옆 |
| 화살표 컬러 코드 | Brand Blue/Black/Warm/Success/Gray dashed/Gray dotted |
| 범례 | 우상단 카드 |
| Pan + Zoom | 마우스 드래그 + 스크롤 휠 |
| Reset view 버튼 | 초기 위치·줌으로 복귀 |

## 향후 활용

- 발표 슬라이드 (해당 페이지 캡처 → PPT 삽입)
- 개발자 인수인계 (라우팅·흐름 한 장으로 설명)
- 투자 자료 (서비스 복잡도·범위 시각화)
- 새 팀원 온보딩 (한눈에 전체 구조 파악)
