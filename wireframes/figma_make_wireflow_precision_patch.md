# Figma Make — Wireflow Precision Patch (#48 + #49)

> **목표**: Wireflow Diagram for SSING 프로젝트의 미니 모킹을 실 앱(Create app wireframe)과 픽셀 정합 + 화살표를 카드→카드가 아닌 **카드 내 specific 버튼 → 다음 카드 진입점** 단위로 정밀화.
>
> **던지는 곳**: Wireflow Diagram for SSING (Figma Make 세션)
> https://www.figma.com/make/vp2strij824SckBSatGKqM/Wireflow-Diagram-for-SSING
>
> **한 번 던지면 끝**. Idempotent — 재실행해도 중복 작업 없음.
>
> ---
>
> ## ⚠️ 전제 조건 (반드시 먼저 처리)
>
> 이 patch는 **`figma_make_wireflow_patch.md` (Wireflow Patch v1)** 을 먼저 적용한 상태를 가정한다.
> v1 patch는 콘텐츠 수정 (골드/실버 → 1~5등급, C1 시즌 strip, C2 누락 섹션 등)을 다룬다.
>
> 만약 v1 patch를 아직 안 던졌다면:
> 1. **v1 patch (`figma_make_wireflow_patch.md`) 먼저** Figma Make에 던지기
> 2. zip 받아서 덮어쓰기
> 3. 그 다음 **이 precision patch** 를 같은 세션에 던지기
>
> 한 번에 처리하고 싶으면 두 patch를 합쳐서 던져도 됨. 단, 토큰 한도 주의.

---

## Precision Patch

````
Apply this comprehensive precision patch to the SSING Wireflow Diagram
project. This rebuilds every ScreenCard mini-mocking to be a pixel-
perfect, scaled-down copy of the actual app screen, and reroutes every
arrow to originate from the specific button inside the card that triggers
the navigation (instead of generic card-edge to card-edge arrows).

Reference source for the actual app screens:
  Create app wireframe / src / app / screens / *.tsx
(They are NOT importable here — inline their JSX into this project.)

Design system v2 unchanged. Stay bg-white, weights 400/600/700, no
colored shadows, no emoji, no gradients except primary CTA and C1
instant card, Pretendard, 해요체 Korean, tabular numerals.

##########################################################
# PRIORITY 1 — ScreenCard system upgrade (pixel ratio fix)
##########################################################

The actual app uses iPhone 15 Pro viewport (393 × 852). The current
ScreenCard is 280 × 560 which breaks the aspect ratio (horizontal
0.7125x, vertical 0.6573x). Fix:

### ScreenCard component — change size + add scaled inner viewport

```tsx
function ScreenCard({ x, y, id, name, path, children }: {
  x: number; y: number; id: string; name: string; path: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute" style={{ left: `${x}px`, top: `${y}px`, width: '280px' }}>
      <div className="text-xs font-bold text-[#191919] mb-2">{id} · {name}</div>
      <div
        className="bg-white rounded-[24px] border border-[#E5E6E8] overflow-hidden shadow-sm"
        style={{ width: '280px', height: '607px' }}
      >
        {/* Inner viewport — exact iPhone 15 Pro size, scaled to fit */}
        <div
          style={{
            width: '393px',
            height: '852px',
            transform: 'scale(0.7125)',
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
      <div className="text-[10px] text-[#76787A] mt-1.5">{path}</div>
    </div>
  );
}
```

### ModalCard — same treatment but 240 × 520 outer, 337 × 730 inner, scale 0.7125

```tsx
function ModalCard({ x, y, id, name, children }: {
  x: number; y: number; id: string; name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute" style={{ left: `${x}px`, top: `${y}px`, width: '240px' }}>
      <div className="text-xs font-bold text-[#191919] mb-2">{id} · {name}</div>
      <div
        className="bg-white rounded-[24px] border border-[#E5E6E8] overflow-hidden shadow-lg"
        style={{ width: '240px', height: '520px' }}
      >
        <div
          style={{
            width: '337px',
            height: '730px',
            transform: 'scale(0.7125)',
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
```

### Card y-positions — re-space lanes to account for taller cards (+47px each)

Cards now 607px tall instead of 560px. Lane y-positions need adjustment.
Apply the following mapping (use these EXACT y values):

| ID  | Old y | New y | Lane              |
|-----|-------|-------|-------------------|
| O1  | 0     | 0     | 1. Auth           |
| C1  | 700   | 720   | 2. Home & Entry   |
| C2  | 700   | 720   | 2. Home & Entry   |
| C3  | 1400  | 1460  | 3. Instant 1:1    |
| C4  | 1400  | 1460  | 3. Instant 1:1    |
| C7  | 1400  | 1460  | 3. Instant 1:1    |
| C8  | 1400  | 1460  | 3. Instant 1:1    |
| C9  | 1400  | 1460  | 3. Instant 1:1    |
| GM-A| 2100  | 2200  | 4. Instant Group  |
| GM-B| 2100  | 2200  | 4. Instant Group  |
| GM-C| 2100  | 2200  | 4. Instant Group  |
| S1  | 2100  | 2200  | 4 (chat lane)     |
| S9  | 2100  | 2200  | 4 (report lane)   |
| C5  | 2800  | 2940  | 5. Reservation    |
| C6  | 2800  | 2940  | 5. Reservation    |
| S4  | 3500  | 3680  | 6. Bottom Nav     |
| S5  | 3500  | 3680  | 6. Bottom Nav     |
| S6  | 3500  | 3680  | 6. Bottom Nav     |
| S2  | 3500  | 3680  | 6. Bottom Nav     |
| S3  | 3500  | 3680  | 6. Bottom Nav     |
| EditProfile, PaymentMethods, NotificationSettings, Support, Terms, 404 | 4200 | 4420 | 7. Settings |
| Receipt | 2100 (modal) | 2200 | Modals |
| Cancel  | 2550 | 2750 | Modals |
| AlertSubscribe | 3000 | 3300 | Modals |
| Logout  | 3450 | 3850 | Modals |

Lane labels also shift the same amount.

Canvas grows accordingly — change parent div from 5000×5000 to 5200×5200.

##########################################################
# PRIORITY 2 — Mini-mocking content = exact app screen copy
##########################################################

Replace every ScreenCard children with the EXACT JSX from the actual
app screen, but with:
- All `useNavigate` calls stubbed (`navigate` becomes a no-op)
- All `useSearchParams` replaced with fixed `mode = "instant"` (for C2)
- All `useParams` replaced with fixed `id = "1"` (for C4, C6)
- All `useState` initial values fixed to the demo values shown below
- Container `h-screen` becomes `style={{ height: '852px' }}` to lock to viewport size
- All Lucide React icons kept identical

The full app screen JSX is large — render each as a separate inline
component (MiniC1Home, MiniC2Request, MiniC3InstructorPool, etc.) inside
App.tsx so the structure stays scannable.

### Replacement summary (use this exact content for each):

**MiniO1Login** — Copy of O1Login.tsx. Demo: show both Kakao + Apple
buttons. Stub all handlers.

**MiniC1Home** — Copy of C1Home.tsx exactly. State: `hasOngoingMatch = true`
(show the ongoing strip). Pin name "지산리조트". Notification bell shows
red dot.

**MiniC2Request** — Copy of C2RequestInput.tsx with `mode = "instant"`.
State: discipline="ski", level="beginner", groupSize=2, duration=3,
participants=[{age:"25",gender:"male"},{age:"23",gender:"female"}],
allowMulti=true. Sticky submit visible.

**MiniC3InstructorPool** — Copy of C3InstructorPool.tsx exactly. Mock
data identical (3 instructors with grade 5/4/5, viewers 3/2/0).
Featured first card has ring.

**MiniC4InstructorProfile** — Copy of C4InstructorProfile.tsx. Pull
the same mockInstructors array, find id=1 (김OO grade 5 rating 4.9).
Show full profile + sticky "매칭 시작" CTA.

**MiniC5ReservationRoomList** — Copy of C5ReservationRoomList.tsx.
Mock 3 rooms with strict v2 design (no gold/silver labels — use the
actual 1~5 grade pill #2563EB white text format from C3).

**MiniC6RoomDetail** — Copy of C6RoomDetail.tsx. Show full info card
(강사 + 시간 + 인원 3/4 + 참여 중인 분들 + 다중매칭 동의 카드 +
sticky 입장하기 CTA).

**MiniC7Payment** — Copy of C7Payment.tsx. State: payment method "card"
selected. Pricing: 1:1 기준가 ₩70,000 / 인원 분담 -₩26,250 / 1인 부담
₩43,750.

**MiniC8MatchConfirmed** — Copy of C8MatchConfirmed.tsx. Big check + 강사
김OO 카드 + 강습 정보 + 강사와 채팅 CTA + 영수증 행 + 강습취소 링크.

**MiniC9PostLessonRating** — Copy of C9PostLessonRating.tsx. 5 stars
선택, 후기 textarea, 태그 chips, 재예약 yes/no, sticky 제출 CTA.

**MiniS1Chat** — Copy of S1Chat.tsx. 3 messages mock.

**MiniS2Location** — Copy of S2Location.tsx. 지산 active, 비발디·곤지암·
엘리시안 inactive, 하이원·휘닉스 supported soon.

**MiniS3Notifications** — Copy of S3Notifications.tsx. 3-4 notification
items grouped by 오늘 / 이번 주.

**MiniS4History** — Copy of S4History.tsx. 진행 중 tab selected. 2 cards
(진행 중 김OO + 완료 이OO).

**MiniS5Messages** — Copy of S5Messages.tsx. 1 unread thread (김OO).

**MiniS6Profile** — Copy of S6Profile.tsx. 홍길동, 12회 / ₩520K, 5 메뉴
rows + 로그아웃.

**MiniS9Report** — Copy of S9Report.tsx. 5 reason radios, 상세 textarea,
매칭 ID strip, sticky 신고 제출.

**MiniGroupMatchingPhaseA** — MatchingLoader variant=group: 비슷한 분들을
찾고 있어요 / 비슷한 수준·나이대의 분들과 그룹을 만드는 중이에요 /
chips [스키, 초급, 30대] / dual pulsing ring + UsersRound icon.

**MiniGroupMatchingPhaseB** — 3명이 매칭됐어요 confirmation: big check
icon, anonymous chips (본인 / 28세·남 / 31세·여), "강사를 함께 골라볼게요"
subtext.

**MiniGroupMatchingPhaseC** — voting screen: header with timer pill
(2:47 남음, bg #FF8A00/10 text #FF8A00), notice strip, member status
row, 3 instructor cards with vote buttons, 본인 voted state.

**MiniEditProfile, MiniPaymentMethods, MiniNotificationSettings,
MiniSupport, MiniTerms, Mini404** — Copy of the corresponding
settings screens.

**Modals (Receipt / Cancel / AlertSubscribe / Logout)** — Copy of the
existing component code (ReceiptModal, CancelDialog, AlertSubscribeModal,
+ a new Logout dialog with logout icon + 빨간 로그아웃 CTA + 취소).

Drop the helper `InstructorCard` function and the old hand-built JSX
that used 골드/실버 labels — those are inconsistent with v2 design.

##########################################################
# PRIORITY 3 — Arrow precision (#48): button-anchored origins
##########################################################

Replace all current arrows with the following set. Each arrow conceptually
originates from a SPECIFIC button or interactive element inside the
source card (not the generic card edge), and lands on the destination
card's canonical entry point.

### Anchoring rule

For each arrow, the comment above the `<path>` names the source button
(e.g. "C1 '지금 강습' 카드"). The path start coordinate is:
  - the button's absolute position (card_x + scaled_inner_x, card_y + scaled_inner_y)
  - OR the nearest card edge to that button if a direct path would overlap card content

In other words: button identity is what carries meaning; the exact start
point is at the card edge most aligned with the button, so the arrow
doesn't render on top of the card's mockup.

Coordinates below are absolute on the 5200×5200 canvas. They are derived
from card_origin + (inner_x * 0.7125, inner_y * 0.7125) when starting
at button, OR card_edge_x/y when exiting at the nearest edge.

### Card origins (top-left corner) reference table

| ID  | x   | y    |
|-----|-----|------|
| O1  | 120 | 0    |
| C1  | 120 | 720  |
| C2  | 480 | 720  |
| C3  | 480 | 1460 |
| C4  | 840 | 1460 |
| C7  | 1560| 1460 |
| C8  | 1920| 1460 |
| C9  | 2280| 1460 |
| GM-A| 480 | 2200 |
| GM-B| 840 | 2200 |
| GM-C| 1200| 2200 |
| S1  | 1920| 2200 |
| S9  | 2280| 2200 |
| C5  | 480 | 2940 |
| C6  | 840 | 2940 |
| S4  | 120 | 3680 |
| S5  | 480 | 3680 |
| S6  | 840 | 3680 |
| S2  | 1200| 3680 |
| S3  | 1560| 3680 |
| EditProfile | 120 | 4420 |
| PaymentMethods | 480 | 4420 |
| NotificationSettings | 840 | 4420 |
| Support | 1200 | 4420 |
| Terms | 1560 | 4420 |
| 404 | 1920 | 4420 |
| Receipt | 3200 | 2200 |
| Cancel  | 3200 | 2750 |
| AlertSubscribe | 3200 | 3300 |
| Logout  | 3200 | 3850 |

Card outer size: 280 wide × 607 tall (mockup body only — labels above
and path below are NOT part of arrow targets).

### Arrow list — every arrow originates from a specific button

For each arrow: src_card.button → dest_card.entry. Use these EXACT
SVG paths (computed: button positions inside 393×852, scaled by 0.7125,
added to card x/y origins).

```svg
{/* === AUTH → HOME === */}
{/* O1 "카카오로 시작하기" 버튼 (inner 120,540) → C1 카드 top center */}
<path d="M 260,385 L 260,720" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />

{/* === HOME → REQUEST (즉시 흐름) === */}
{/* C1 "지금 강습" 카드 우측 (inner 360,260) → C2 좌측 헤더 영역 */}
<path d="M 400,905 L 480,905" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />

{/* === HOME → REQUEST (예약 흐름) === */}
{/* C1 "예약 강습" 카드 우측 (inner 360,480) → C2 좌측 */}
<path d="M 400,1062 L 480,1062" stroke="#191919" strokeWidth="2" fill="none" markerEnd="url(#arrow-black)" />

{/* === C2 → C3 (즉시 1:1) === */}
{/* C2 "강사 매칭 시작" 버튼 (sticky bottom inner 200,790) → C3 카드 좌측 헤더 */}
<path d="M 620,1283 L 620,1460" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />

{/* === C2 → GM-A (즉시 그룹) === */}
{/* C2 "강사 매칭 시작" 버튼 (sticky bottom inner 200,790) + allowMulti=true → GM-A */}
{/* C2 카드 하단 우측 → 살짝 우회하여 GM-A 카드 좌측 */}
<path d="M 620,1283 Q 620,1700 480,2390" stroke="#FF8A00" strokeWidth="2" fill="none" markerEnd="url(#arrow-orange)" />

{/* === C2 → C5 (예약) === */}
{/* C2 "방 매칭 시작" 버튼 → C5 */}
<path d="M 620,1283 Q 620,2000 480,3130" stroke="#191919" strokeWidth="2" fill="none" markerEnd="url(#arrow-black)" />

{/* === C3 → C4 === */}
{/* C3 첫 강사 카드 우측 (inner 360,360) → C4 좌측 */}
<path d="M 760,1717 L 840,1717" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />

{/* === C4 → C7 === */}
{/* C4 "매칭 시작" sticky CTA (inner 200,790) → C7 좌측 헤더 진입 */}
<path d="M 1120,2023 Q 1340,2023 1560,1764" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />

{/* === GM-A → GM-B === */}
{/* phase transition (3s 후 자동) — 같은 lane 옆방향 진행 */}
<path d="M 760,2503 L 840,2503" stroke="#FF8A00" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrow-orange)" />

{/* === GM-B → GM-C === */}
{/* 2s 후 voting phase 진입 */}
<path d="M 1120,2503 L 1200,2503" stroke="#FF8A00" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrow-orange)" />

{/* === GM-C → C7 === */}
{/* GM-C 우측 모서리 → C7 좌측 진입 (voting 종료 후 결제) */}
<path d="M 1480,2503 Q 1520,2200 1560,1764" stroke="#FF8A00" strokeWidth="2" fill="none" markerEnd="url(#arrow-orange)" />

{/* === C5 → C6 === */}
{/* C5 첫 방 카드 우측 (inner 360,360) → C6 좌측 */}
<path d="M 760,3197 L 840,3197" stroke="#191919" strokeWidth="2" fill="none" markerEnd="url(#arrow-black)" />

{/* === C6 → C7 === */}
{/* C6 "입장하기" sticky CTA (inner 200,790) → C7 좌측 진입 (긴 우회) */}
<path d="M 1120,3503 Q 1450,3503 1560,1764" stroke="#191919" strokeWidth="2" fill="none" markerEnd="url(#arrow-black)" />

{/* === C7 → C8 === */}
{/* C7 "결제하기" sticky CTA (inner 200,790) → C8 카드 좌측 */}
<path d="M 1840,2023 L 1920,1717" stroke="#0FB882" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />

{/* === C8 → C9 === */}
{/* C8 "강습 완료 · 평가하기" 버튼 (inner 200,560) → C9 좌측 */}
<path d="M 2200,1859 L 2280,1717" stroke="#0FB882" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />

{/* === C8 → S1 === */}
{/* C8 "강사와 채팅하기" 버튼 (inner 200,380) → S1 카드 위 */}
{/* 카드 모서리 빠지는 path (시작점 = C8 카드 좌측 모서리에서 채팅 버튼 높이) */}
<path d="M 1920,1731 L 1990,2200" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />

{/* === C9 → C1 (홈복귀) === */}
{/* C9 "평가 제출" sticky CTA (inner 200,790) → C1 우측 헤더 (긴 우회 path) */}
<path d="M 2560,2023 Q 2700,2023 2700,400 L 400,400 L 400,720" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />

{/* === C1 헤더 위치 핀 → S2 === */}
{/* C1 위치핀 (inner 80,32) → S2 카드 위 */}
<path d="M 177,743 Q 177,1500 177,3680 L 1310,3680" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />

{/* === C1 헤더 알림벨 → S3 === */}
{/* C1 알림벨 (inner 360,32) → S3 카드 위 */}
<path d="M 376,743 Q 376,3500 1670,3680" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />

{/* === C1 ongoing 매칭 strip → C8 === */}
{/* C1 진행 중인 강습 카드 우측 (inner 360,135) → C8 */}
<path d="M 400,816 Q 1000,816 1920,1717" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />

{/* === Bottom Nav 분기 (C1 BottomNav 4개 아이콘) === */}
{/* 홈 아이콘 (inner 49,810) → C1 (자기 자신 — 생략) */}
{/* 내역 아이콘 (inner 147,810) → S4 */}
<path d="M 225,1297 Q 225,3500 260,3680" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* 메시지 아이콘 (inner 245,810) → S5 */}
<path d="M 295,1297 Q 295,3500 620,3680" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* 내정보 아이콘 (inner 343,810) → S6 */}
<path d="M 364,1297 Q 364,3500 980,3680" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* === S6 → Settings 5개 === */}
{/* S6 "내 정보 수정" row (inner 200,500) → EditProfile 카드 위 */}
<path d="M 980,4036 L 260,4420" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* S6 "결제 수단" row → PaymentMethods */}
<path d="M 980,4068 L 620,4420" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* S6 "알림 설정" row → NotificationSettings */}
<path d="M 980,4100 L 980,4420" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* S6 "고객 지원" row → Support */}
<path d="M 980,4132 L 1340,4420" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* S6 "약관·정책" row → Terms */}
<path d="M 980,4164 L 1700,4420" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* S6 로그아웃 → Logout modal */}
{/* S6 로그아웃 행 (inner 200,720) → 절대 (980, 4193). 우측 모서리 빠져 modal로 */}
<path d="M 1120,4193 Q 2100,4193 3200,4050" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* === C7 → Receipt modal === */}
{/* C7 결제 상세 영역 우측 → Receipt */}
<path d="M 1840,1860 Q 2500,1860 3200,2200" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* === C8 → Cancel modal === */}
{/* C8 강습 취소 링크 (inner 200,720) → Cancel */}
<path d="M 2200,1976 Q 2700,1976 3200,2750" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* === C3 empty state → AlertSubscribe modal === */}
{/* C3 "강사 등장 알림 받기" empty state button → AlertSubscribe */}
<path d="M 760,1976 Q 2000,1976 3200,3300" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />

{/* === S4 진행 중 카드 → C8 === */}
{/* S4 진행 중 강습 카드 → C8 (재진입) */}
<path d="M 400,3850 Q 400,1900 1920,1717" stroke="#76787A" strokeWidth="1" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />

{/* === O1 약관 링크 → Terms === */}
{/* O1 카드 하단 약관 텍스트 → Terms 카드 */}
<path d="M 400,400 Q 1000,400 1700,4420" stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,3" fill="none" markerEnd="url(#arrow-light-gray)" />
```

Remove ALL existing arrow paths. The above is the complete replacement
set. Total: 32 arrows.

##########################################################
# PRIORITY 4 — Legend update
##########################################################

Update the legend card to reflect the precision changes:

```tsx
<div className="absolute bg-white rounded-2xl border border-[#E5E6E8] p-6"
     style={{ left: '4700px', top: '100px', width: '320px' }}>
  <h3 className="font-bold text-[#191919] mb-4">Wireflow 범례</h3>
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <div className="w-12 h-0.5 bg-[#2563EB]"></div>
      <span className="text-sm text-[#4B4F54]">즉시 매칭 1:1 흐름</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-12 h-0.5 bg-[#191919]"></div>
      <span className="text-sm text-[#4B4F54]">예약 매칭 흐름</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-12 h-0.5 bg-[#FF8A00]"></div>
      <span className="text-sm text-[#4B4F54]">즉시 그룹 매칭 (Voting)</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-12 h-0.5 bg-[#0FB882]"></div>
      <span className="text-sm text-[#4B4F54]">결제·확정·평가 흐름</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-12 h-0.5 border-t-2 border-dashed border-[#76787A]"></div>
      <span className="text-sm text-[#4B4F54]">조건부 / 재진입 / 사후</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-12 h-0.5 border-t-2 border-dotted border-[#A2A4A6]"></div>
      <span className="text-sm text-[#4B4F54]">모달 / 보조 화면 호출</span>
    </div>
  </div>
  <div className="mt-5 pt-5 border-t border-[#E5E6E8]">
    <div className="text-xs font-semibold text-[#191919] mb-2">화살표 시작점</div>
    <div className="text-xs text-[#4B4F54]">
      카드 모서리가 아닌 <span className="font-semibold text-[#191919]">해당 액션을
      유발하는 버튼/요소</span>에서 출발합니다.
    </div>
  </div>
</div>
```

##########################################################
# PRIORITY 5 — Toolbar update
##########################################################

Update toolbar text:

```tsx
<h1 className="text-lg font-bold text-[#191919]">SSING Wireflow · Precision</h1>
<div className="text-sm text-[#76787A]">28 screens · 32 arrows · pixel-aligned</div>
```

##########################################################
# OUT OF SCOPE (do not change)
##########################################################

- Don't change pan/zoom/Reset view behavior
- Don't change card x positions (only y to account for taller cards)
- Don't change lane label structure
- Don't change modal positions on the x axis (still at x=3200)
- Don't add new screens beyond what's listed
- Don't change SVG marker definitions (arrow heads)
- Don't change the canvas background color (#F5F6F7)
````

---

## 사용 방법

1. Figma Make의 **Wireflow Diagram for SSING** 세션 열기
2. 위 ``` 코드블록 ``` 통째 복사 (백틱 4개로 감싼 바깥 블록 통째)
3. 입력창에 붙여넣기 → 생성
4. zip 다운로드 → `Wireflow Diagram for SSING/` 폴더에 덮어쓰기
5. `pnpm install && pnpm dev` → 와플 열어서 확인

---

## 결과 받은 후 점검

| 영역 | 점검 |
|---|---|
| 카드 사이즈 | 280×607 (외부) + 393×852 inner viewport scale(0.7125) |
| 미니 모킹 정합 | 각 카드 내부 = 실 앱 화면 축소판 (디자인 토큰·레이아웃·카피 정확히 동일) |
| 등급 표시 | 골드/실버 → 1~5 등급 pill로 통일됨 |
| 화살표 시작점 | 각 화살표가 카드 모서리가 아닌 **버튼 좌표**에서 출발 |
| 화살표 개수 | 정확히 32개 (이전 ~15개에서 확장) |
| 카드 간격 | 레인 y가 720/1460/2200/2940/3680/4420로 재배치됨 |
| 컬러 코드 | 즉시 파랑 / 예약 검정 / 그룹 주황 / 결제 초록 / 보조 회색 dashed / 모달 light gray dotted |
| 줌·팬 | 기존 동작 그대로 (Reset view 클릭 시 0.4 스케일) |

---

## 다음 단계 (이후 patch 예정)

- 메모 #50 — Voting 제거 + 즉시매칭 "강사단위" 전환 (사용자가 의미 설명 후 별도 patch)
- 4장. 서비스 상세 정의 (와프 완성 후 재작성)

---

## 변경 이력

| 날짜 | 변경 |
|---|---|
| 2026-05-28 | 초안 작성 — 미니 모킹 픽셀 정합(393×852 → 0.7125 scale) + 화살표 32개 버튼→창 정밀화 |
