# Figma Make — SSING 부수 화면 합본 (S1~S10)

> C1~C9 핵심 플로우의 부수 화면 10개. 던질 화면 코드블록 ``` 내부 ```만 통째 복사해서 Figma Make에 붙여넣기.
> 모든 코드블록은 v2 Reference 시스템 (Toss + Apple Music + Linear + Strava) 자기완결 형태.

## 인덱스

| 화면 | 한 줄 설명 | 라우트 |
|---|---|---|
| [S1](#s1) | 채팅 (강사 ↔ 소비자) | `/chat/:matchId` |
| [S2](#s2) | 스키장 선택 | `/location` |
| [S3](#s3) | 알림 센터 | `/notifications` |
| [S4](#s4) | 내역 (강습 기록) | `/history` |
| [S5](#s5) | 메시지 (채팅 목록) | `/messages` |
| [S6](#s6) | 내 정보 | `/profile` |
| [S7](#s7) | 결제 내역 모달 | (C8 안 모달) |
| [S8](#s8) | 강습 취소 다이얼로그 | (C8 안 다이얼로그) |
| [S9](#s9) | 강사 신고 | `/report/:matchId` |
| [S10](#s10) | 알림 등록 모달 | (C3·C5 안 모달) |

---

## 공통 시스템 컨텍스트 (모든 코드블록에 prefix됨)

각 화면의 코드블록은 아래 v2 시스템 컨텍스트로 시작합니다. 변경 시 모든 부수 화면 코드블록 갱신 필요.

---

## <a name="s1"></a>S1 — Chat (1:1 강사 채팅)

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone, approachable but
trustworthy, never playful-cute.

You decide composition. Constraints define the design system, not layout.

## REFERENCE APPS
1. Toss (chat sections in customer support) — clean white surface, strong
   typography, restraint.
2. KakaoTalk — Korean mobile chat conventions, message bubble shapes,
   timestamp positioning.
3. Apple Messages — bubble geometry, generous whitespace, sectioned
   timestamps.
4. Linear (comments) — restraint, gradient discipline.

QUALITY BAR: like a KakaoTalk thread but with Toss-grade typography
restraint.

## DEVICE: iPhone 15 Pro 393×852. Safe area top 59, bottom 34.

## COLOR TOKENS
Brand #2563EB/#1E40AF. Text #000/#191919/#26282B/#4B4F54/#76787A/#A2A4A6.
Surfaces #FFF/#F5F6F7/#EBECED. Borders #E5E6E8/#D1D3D5.
Semantic #0FB882/#3478F6/#FF8A00/#F5444C.
NO off-palette colors.

## TYPOGRAPHY
Pretendard. Body 14-16/400, Caption 12/400, Heading 16-18/600.
WEIGHTS 700/600/400 ONLY. Tabular numerals for timestamps.

## COMPONENT TOKENS
Radius 12 / 16 / 20. Outgoing bubble: Brand Blue #2563EB bg, white text.
Incoming bubble: #F5F6F7 bg, #191919 text. Bubble max-width 75%.
Timestamp: 11px #A2A4A6, bottom of bubble group.

## SHADOWS: Flat. NO COLORED SHADOWS.

## GRADIENTS
ALLOWED: ONE Brand Blue gradient on the send button (icon only).
FORBIDDEN elsewhere.

## NO EMOJI. NO UNREQUESTED CHROME.

## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px.

---

## SCREEN: S1 — CHAT

PURPOSE
1:1 chat between user and matched instructor. Purpose is meeting-spot
agreement after match confirmation (C8 → S1). Limited to confirmed
matches.

ENTRY POINTS
- C8 "강사와 채팅하기" tap
- S5 (messages thread list) tap

INFORMATION TO DISPLAY
- Header: instructor name + grade label + back button. Optional "강습
  정보 보기" link to C8.
- Message bubble list (chronological, latest at bottom):
  - Outgoing (user): Brand Blue bubble, right-aligned
  - Incoming (instructor): #F5F6F7 bubble, left-aligned
  - Timestamps grouped by bubble cluster (not per-message)
- System messages (centered, subtle): "매칭이 확정됐어요. 강사와 만나는
  슬로프와 시간을 정해주세요." — at thread start
- Input bar at bottom: text input + send button. Plus icon for attachment
  (optional, can be omitted).

USER ACTIONS
- Type message → send (or tap send button)
- Tap header instructor name → C4 instructor profile
- Tap "강습 정보 보기" → C8
- Tap back → S5 or C8 depending on entry

EXACT KOREAN COPY
- Input placeholder: "메시지를 입력하세요"
- System start message: "매칭이 확정됐어요. 강사와 만나는 슬로프와
  시간을 정해주세요."
- Header secondary: "강습 정보 보기"
- Send button: icon only (Send or arrow-up). No text.

CONSTRAINTS
- Bubbles use solid fills, no gradients.
- Outgoing = Brand Blue solid, NOT gradient.
- Incoming = #F5F6F7 solid.
- No read receipts unless specified. No typing indicator unless specified.
- No emoji picker visible by default.
- Send button is Brand Blue solid (or single gradient if it's the
  primary CTA-style action).
- System messages are quiet — small, centered, #76787A text on no
  background.

DESIGNER DECISIONS
- Bubble shape (rounded 16-20, optional tail)
- Message density and spacing
- Input bar treatment (sticky bottom)
- Whether to show send button only when input non-empty
- Optional attachment affordance
```

---

## <a name="s2"></a>S2 — Location Picker

```
You are designing a mobile app screen for SSING — a Korean ski/snowboard
lesson matching platform. Friendly infrastructure tone, approachable but
trustworthy, never playful-cute.

You decide composition. Constraints define the design system.

## REFERENCE APPS
1. Toss (account/method selector) — clean list, large tap targets, clear
   selected state.
2. Apple Music (region picker) — sectioned list, restrained icons.
3. Linear (workspace picker) — restraint.

QUALITY BAR: Toss list discipline.

## DEVICE: iPhone 15 Pro 393×852. Safe area top 59, bottom 34.

## COLOR TOKENS — as v2.
## TYPOGRAPHY: Pretendard. WEIGHTS 700/600/400 ONLY. Tabular for numbers.
## COMPONENT TOKENS: Radius 12/14/16. Card-like rows.
## SHADOWS: Flat / neutral.
## GRADIENTS: FORBIDDEN (no primary CTA on this screen).
## NO EMOJI. NO UNREQUESTED CHROME.
## ICONOGRAPHY: Lucide / Tabler outline 1.5-2px.

---

## SCREEN: S2 — LOCATION PICKER

PURPOSE
User chooses or changes the ski resort context. Auto-detected resort is
shown first with current selection marker. Manual selection updates the
resort context across the app.

ENTRY POINTS
- C1 location chip tap
- C2 location field tap
- Auto-popup when GPS detects different resort

INFORMATION TO DISPLAY
- Header with back action
- Current detected resort (highlighted, with check icon)
- List of supported resorts:
  - 지산리조트, 비발디파크, 곤지암리조트, 하이원리조트, 휘닉스파크,
    엘리시안 강촌
  - Optional capacity/distance info if available (otherwise omit)
- "지원 예정" section for resorts under consideration (optional)

USER ACTIONS
- Tap a resort → select and return to previous screen (-1)
- Tap back → return without change

EXACT KOREAN COPY
- Header: "스키장 선택"
- Resort list copy (above)
- Auto-detected indicator: small "현재 위치" label or check icon
- "지원 예정" section header if used

CONSTRAINTS
- Selected/current resort uses check icon + bold text, NOT a gradient
  background.
- Row hover/press uses #F5F6F7 background.
- No off-palette colors.
- Card layout for each resort row, NOT collapsed list items.

DESIGNER DECISIONS
- Row layout (icon + name + check vs side-by-side)
- Whether to show resort distance from GPS
- Section grouping if any
```

---

## <a name="s3"></a>S3 — Notification Center

```
[Same v2 system context as S1 — copy from S1's system block]

---

## SCREEN: S3 — NOTIFICATION CENTER

PURPOSE
List of recent app notifications — matches, lesson reminders, payment
confirmations, instructor messages, system announcements. Tap to navigate
to relevant screen.

ENTRY POINTS
- C1 notification bell tap
- Push notification (deep link as fallback)

INFORMATION TO DISPLAY
- Header with back action and optional "모두 읽음" action
- List of notifications, grouped by recency (오늘 / 이번 주 / 이전):
  - Each row: notification icon (small, by type) + title + body preview
    + timestamp + unread dot if applicable
- Empty state when no notifications: centered icon + "알림이 없어요"
  + subtle subtitle

USER ACTIONS
- Tap notification → navigate to related screen (C8 for match, S1 for
  message, etc.)
- Tap "모두 읽음" → mark all read
- Tap back → C1

EXACT KOREAN COPY
- Header: "알림"
- "모두 읽음"
- Group headers: "오늘", "이번 주", "이전"
- Empty state: "알림이 없어요"
- Example notification copy:
  - "강사와 매칭됐어요. 채팅에서 만나는 장소를 정해주세요."
  - "강습이 1시간 후에 시작돼요."
  - "결제가 완료됐어요."
  - "김OO 강사님이 메시지를 보냈어요."

CONSTRAINTS
- Notification rows are flat cards or list rows on white. No gradients.
- Unread dot is small (~6-8px) Brand Blue solid.
- Notification type icons use #76787A or Brand Blue solid.
- No bright color backgrounds. Restraint.

DESIGNER DECISIONS
- Row layout density
- Group header treatment
- Empty state composition
- Whether unread items have subtle bg tint (#F5F6F7/50%)
```

---

## <a name="s4"></a>S4 — History (강습 내역)

```
[Same v2 system context]

---

## SCREEN: S4 — HISTORY (LESSON HISTORY)

PURPOSE
List of user's past and ongoing lessons. Reached via bottom-nav "내역"
tab. Tap to view details (C8 if ongoing, C9 or read-only summary if past).

ENTRY POINTS
- Bottom-nav "내역" tap

INFORMATION TO DISPLAY
- Header: "강습 내역" (centered, no back button — it's a tab)
- Filter chips at top (optional): 진행 중 / 완료 / 취소
- List of lesson records (most recent first):
  - Each card: date/time + instructor name + status pill + discipline +
    location + price
  - Status pill colors: 진행 중 (#2563EB), 완료 (#0FB882 or #76787A),
    취소 (#F5444C)
  - For "완료 · 평가 남음" status, emphasize with subtle accent
- Bottom navigation (active: 내역)

USER ACTIONS
- Tap card → C8 (if ongoing) or details (if past)
- Tap "완료 · 평가 남음" card → C9 rating
- Tap filter chip → filter list
- Bottom-nav routing

EXACT KOREAN COPY
- Header: "강습 내역"
- Filter chips: "진행 중" / "완료" / "취소"
- Status pills: "진행 중", "완료", "완료 · 평가 남음", "취소"
- Empty state: "강습 내역이 없어요"
- Bottom-nav: 홈 / 내역 (active) / 메시지 / 내 정보

CONSTRAINTS
- Status pills use solid colored backgrounds with corresponding text
  color (e.g., #2563EB bg + white text). NO gradients.
- Card layout: white bg, 1px #E5E6E8 border, 16px padding, 12px radius.
- Filter chips: solid fill on selected, neutral outline on unselected.
- Bottom nav follows v2 spec (active #191919 or #2563EB box+icon).

DESIGNER DECISIONS
- Card density
- Filter chip placement
- Whether to group by month or list chronologically
- Empty state composition
```

---

## <a name="s5"></a>S5 — Messages (채팅 목록)

```
[Same v2 system context]

---

## SCREEN: S5 — MESSAGES (CHAT THREAD LIST)

PURPOSE
List of active chat threads. Each thread = one match (confirmed). Reached
via bottom-nav "메시지" tab. Tap a thread → S1 chat.

ENTRY POINTS
- Bottom-nav "메시지" tap

INFORMATION TO DISPLAY
- Header: "메시지" (centered, tab)
- List of threads (most recent first):
  - Each row: instructor avatar/initials + name + last message preview
    + timestamp + unread badge (if any)
- Bottom navigation (active: 메시지)

USER ACTIONS
- Tap thread → S1 chat (with that match ID)
- Bottom-nav routing

EXACT KOREAN COPY
- Header: "메시지"
- Empty state: "아직 채팅이 없어요. 매칭이 확정되면 강사와 채팅을
  시작할 수 있어요."
- Example last messages: "오후 2시에 메인 슬로프 입구에서 만나요",
  "강습 잘 받으셨어요?"

CONSTRAINTS
- Thread rows are flat list items with thin dividers (1px #E5E6E8).
- Avatar uses #F5F6F7 placeholder or actual photo. NO gradient
  placeholder.
- Unread badge: small circle, Brand Blue solid, white number.
- Timestamp: 12px #76787A.

DESIGNER DECISIONS
- Row density
- Avatar size (44-48px)
- Empty state composition
```

---

## <a name="s6"></a>S6 — Profile (내 정보)

```
[Same v2 system context]

---

## SCREEN: S6 — PROFILE

PURPOSE
User's profile and settings. Reached via bottom-nav "내 정보" tab.
Contains personal info display + settings menu.

ENTRY POINTS
- Bottom-nav "내 정보" tap

INFORMATION TO DISPLAY
- Header: "내 정보" (centered, tab)
- Profile section: avatar/initials + name + email
- Optional: total lessons taken, total spent (for engagement)
- Settings menu (list rows):
  - 내 정보 수정
  - 결제 수단 관리
  - 알림 설정
  - 고객 지원
  - 약관·정책
  - 로그아웃 (with #F5444C accent)
- Bottom navigation (active: 내 정보)

USER ACTIONS
- Tap menu item → navigate to sub-screen (placeholder for now)
- Tap 로그아웃 → confirm dialog → logout
- Bottom-nav routing

EXACT KOREAN COPY
- Header: "내 정보"
- Menu items (above)
- Logout confirm: "로그아웃하시겠어요?" / "로그아웃" / "취소"

CONSTRAINTS
- Profile section uses calm white bg, no gradient.
- Settings menu rows are flat list with chevron-right.
- 로그아웃 uses #F5444C text color but NOT a #F5444C background.
- No off-palette accents.

DESIGNER DECISIONS
- Profile section visual treatment
- Stats display (if included)
- Menu row layout
- Logout placement (bottom of list typical)
```

---

## <a name="s7"></a>S7 — Receipt Modal (결제 내역 모달)

```
[Same v2 system context — bottom sheet modal]

---

## SCREEN: S7 — RECEIPT MODAL

PURPOSE
Bottom-sheet modal showing detailed payment receipt for a match.
Triggered from C8 "결제 내역 상세보기" tap.

PRESENTATION
- Bottom sheet over current screen (C8)
- 20px top corner radius
- Sheet shadow 0 -4px 16px rgba(0,0,0,0.10)
- 36×4 handle at top
- White bg

INFORMATION TO DISPLAY
- Header: "결제 상세"
- Itemized rows:
  - 1:1 기준가: ₩70,000원
  - 인원 분담 (n명): -₩{n}원 (if multi-match)
  - 1인 부담: ₩{n}원 (bold, emphasized)
  - 구분선
  - 결제 수단: 카드 / 카카오페이 등
  - 결제 일시: 날짜 + 시간
  - 매칭 ID: m1 등
- Close button at bottom

USER ACTIONS
- Tap close → dismiss sheet
- Tap overlay → dismiss sheet
- Drag handle down → dismiss sheet

EXACT KOREAN COPY
- Header: "결제 상세"
- Row labels: "1:1 기준가", "인원 분담 (N명)", "1인 부담", "결제 수단",
  "결제 일시", "매칭 ID"
- Close: "닫기"

CONSTRAINTS
- Sheet uses v2 sheet spec (radius, shadow, handle).
- Prices in `₩{n.toLocaleString()}원` format.
- "인원 분담" amount has minus sign and uses #0FB882 (success) text color.
- "1인 부담" is the most prominent figure (24-28px / 700).
- Close button uses #191919 solid background with white text, OR a quiet
  text-only "닫기" link.
- No gradient on rows, no colored shadows.

DESIGNER DECISIONS
- Sheet height (auto vs fixed)
- Close button style (full-width primary vs quiet text link)
- Row spacing
```

---

## <a name="s8"></a>S8 — Cancel Dialog (강습 취소 다이얼로그)

```
[Same v2 system context — centered modal dialog]

---

## SCREEN: S8 — CANCEL DIALOG

PURPOSE
Confirmation dialog when user taps "강습 취소" on C8. Shows refund
percentage based on timing and asks for confirmation.

PRESENTATION
- Centered modal over current screen (C8)
- 20px corner radius, white bg
- Backdrop: rgba(0,0,0,0.4)
- Max width ~320px

INFORMATION TO DISPLAY
- Title: "강습을 취소하시겠어요?"
- Body text: refund policy based on timing
  - 24h+ before: "강습 OO시간 전입니다. 100% 환불돼요"
  - 1-24h before: "강습 OO시간 전입니다. OO% 환불돼요"
  - <1h before: "강습이 임박해 환불이 어려워요"
- Two action buttons stacked or side-by-side

USER ACTIONS
- Tap "강습 취소하기" → cancel match, route to C1 (or refund processing)
- Tap "돌아가기" → dismiss dialog
- Tap backdrop → dismiss dialog

EXACT KOREAN COPY
- Title: "강습을 취소하시겠어요?"
- Body: per timing (above)
- Primary destructive: "강습 취소하기"
- Secondary: "돌아가기"
- Note: refund policy is pending finalization (N-2 in pending decisions)

CONSTRAINTS
- Primary destructive button uses #F5444C solid (no gradient), white text.
- Secondary uses #F5F6F7 bg, #4B4F54 text.
- Stack buttons vertically (mobile-friendly).
- Title is 18px / 700.
- Body is 14px / 400 #76787A.
- No colored shadows.

DESIGNER DECISIONS
- Dialog padding (24-32px)
- Button stack vs side-by-side
- Whether to include refund icon/visual
```

---

## <a name="s9"></a>S9 — Report (강사 신고)

```
[Same v2 system context]

---

## SCREEN: S9 — REPORT INSTRUCTOR

PURPOSE
User submits a report about an instructor (problem behavior, no-show,
safety incident, etc.). Reached from C9 (post-lesson rating) "강사에
문제가 있어요" tap.

ENTRY POINTS
- C9 report link tap

INFORMATION TO COLLECT
- Reason selection (single choice from predefined list):
  - 강사가 시간 약속을 어겼어요
  - 강습 품질이 매우 낮았어요
  - 부적절한 언행이 있었어요
  - 사고가 있었어요
  - 기타
- Detail text input (textarea, optional but encouraged)
- Optional: attach evidence (skip for now)

INFORMATION TO DISPLAY
- Header with back action
- Match ID reference (small, for tracking)
- Note: "신고 내용은 SSING 운영팀이 검토합니다."
- Submit button (enabled when reason selected)

USER ACTIONS
- Tap reason → select
- Type detail
- Submit → confirm + route to C1
- Back → C9

EXACT KOREAN COPY
- Header: "강사 신고"
- Section: "신고 사유"
- Reason options (above)
- Section: "상세 내용"
- Textarea placeholder: "구체적인 상황을 적어주시면 처리에 도움이 돼요"
- Note: "매칭 ID OO · 신고 내용은 SSING 운영팀이 검토합니다."
- Submit: "신고 제출"
- Post-submit toast: "신고가 접수됐어요. 24시간 내 검토 결과를 알려드려요."

CONSTRAINTS
- Reason rows use radio-like behavior, selected = #F5F6F7 bg + #2563EB
  border. No gradient fill.
- Textarea uses #F5F6F7 bg, no border, 14px radius.
- Submit uses Brand Blue solid (#2563EB), white text. Disabled = #F5F6F7
  bg + #A2A4A6 text.
- Tone is serious but reassuring — not punitive language.
- No bright red destructive styling on the main form (it's not
  destructive to the user).

DESIGNER DECISIONS
- Reason row layout (cards vs list)
- Textarea height
- Submit placement (sticky bottom recommended)
- Whether to show category icons
```

---

## <a name="s10"></a>S10 — Alert Subscribe Modal (알림 등록)

```
[Same v2 system context — bottom sheet modal]

---

## SCREEN: S10 — ALERT SUBSCRIBE MODAL

PURPOSE
Bottom-sheet modal triggered from C3 (empty instructor pool) or C5
(empty room list). User opts in to get notified when matching options
appear.

PRESENTATION
- Bottom sheet over C3 or C5
- 20px top corner radius, white bg
- Handle at top

INFORMATION TO DISPLAY
- Header: 
  - C3 context: "강사 등장 알림 받기"
  - C5 context: "방 열림 알림 받기"
- Description: 
  - C3: "조건에 맞는 강사가 등장하면 알려드려요."
  - C5: "조건에 맞는 방이 열리면 알려드려요."
- Summary of user's request (the 6+1 conditions, compact)
- Toggle/checkbox section (optional):
  - 푸시 알림
  - 카카오톡 알림 (if integrated)
- Submit + cancel actions

USER ACTIONS
- Tap "알림 받기" → register + dismiss → toast confirmation
- Tap "취소" → dismiss
- Tap backdrop → dismiss
- Drag handle down → dismiss

EXACT KOREAN COPY
- Header (per context): "강사 등장 알림 받기" / "방 열림 알림 받기"
- Description (per context above)
- Toggle labels: "푸시 알림", "카카오톡 알림"
- Primary: "알림 받기"
- Secondary: "취소"
- Post-register toast: "알림을 등록했어요. 강사가 등장하면 알려드릴게요."

CONSTRAINTS
- Primary uses Brand Blue solid (#2563EB), white text.
- Secondary is #F5F6F7, #4B4F54 text, OR text-only quiet link.
- Toggle styling follows v2 (solid on, gray off).
- No gradients on toggles or form rows.
- Request summary chip uses #F5F6F7 bg, #4B4F54 text.

DESIGNER DECISIONS
- Sheet height
- Whether to include toggle section or just confirm-style modal
- Submit placement
```

---

## 사용 흐름

1. 부수 화면별로 코드블록 (``` 내부 ```) 통째 복사
2. Figma Make에 던지기
3. 결과 TSX를 `Create app wireframe/src/app/screens/S{N}{Name}.tsx`로 저장 (기존 placeholder 교체)
4. 라우트는 이미 `routes.tsx`에 등록됨 — 파일 교체만 하면 작동
5. 모달(S7·S8·S10)은 별도 컴포넌트 파일로 만들어 부모 화면(C8, C3·C5)에서 import해서 사용

## 우선순위 권장

| 순위 | 화면 | 이유 |
|---|---|---|
| 1 | S1 채팅 | 매칭 후 필수 기능 (만남 장소 합의) |
| 2 | S4 내역 | 진행 매칭·평가 진입 경로 |
| 3 | S2 위치 선택 | 자주 쓰는 컨텍스트 변경 |
| 4 | S8 강습 취소 다이얼로그 | 결정적 사용자 액션 |
| 5 | S5 메시지 | S1과 연동 |
| 6 | S3 알림 센터 | 푸시 통합 시 필수 |
| 7 | S6 내 정보 | 설정 진입점 |
| 8 | S9 강사 신고 | 안전 기능 |
| 9 | S7 결제 내역 모달 | 정보 보조 |
| 10 | S10 알림 등록 모달 | 빈 상태 보조 |