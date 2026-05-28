# Figma Make — 설정 메뉴 5개 화면 (Patch 2)

> S6Profile의 비활성 메뉴 5개를 활성화하고 각 화면 추가. 같은 세션에 코드블록 통째 던지기.

---

## Patch 2 — Settings Screens

```
Add 5 new settings screens to the SSING project and activate the
disabled menu items in S6Profile.

## DESIGN SYSTEM (v2 — same as all existing screens)
- bg-white. NO colored shadows. WEIGHTS 400/600/700 only (never 900).
- Brand Blue #2563EB as sparing primary CTA only. No gradients on
  secondary items.
- Lucide / Tabler outline icons. NO emoji.
- Pretendard, 해요체 Korean copy.
- Generous whitespace.
- Tabular numerals for numbers.
- All screens iPhone 15 Pro 393×852, safe area top 59 bottom 34.
- Reference apps: Toss / Apple Settings / Linear.

## ROUTES TO REGISTER (in routes.tsx)
Add these imports and routes:
- /edit-profile → EditProfile
- /payment-methods → PaymentMethods
- /notification-settings → NotificationSettings
- /support → Support
- /terms → Terms

All with `ErrorBoundary: NotFound` like existing routes.

## ACTIVATE S6Profile MENU
In `S6Profile.tsx`, the menuItems array currently has `disabled: true`
on all 5 items. CHANGE `disabled: true` to `disabled: false` (or just
remove the disabled prop) on all 5 — the screens now exist so they
should be reachable.

---

## SCREEN 1: EditProfile (/edit-profile)

PURPOSE
User edits their profile: name, email, phone, profile photo.

LAYOUT
- Header: back button + "내 정보 수정" centered
- Body (scrollable):
  - Profile photo section (top): 80×80 circle with initials avatar +
    "사진 변경" text link below (14/600 #2563EB)
  - Form fields (vertical stack, each ~16px gap):
    - "이름" label + input (current value "홍길동")
    - "이메일" label + input (current value "user@example.com",
      disabled — small caption "이메일은 변경할 수 없어요" #76787A 12px)
    - "전화번호" label + input (placeholder "010-0000-0000")
  - Each label: 13/700 #191919, 8px above input
  - Each input: bg #F5F6F7, no border, 12px radius, 14×16 padding,
    15/400, placeholder #A2A4A6, focus 1px #191919
- Sticky bottom: "저장" button — full-width 56px, bg #2563EB,
  white 16/700, rounded-16. Disabled when nothing changed
  (bg #F5F6F7, #A2A4A6 text).

ACTIONS
- Save → toast "저장됐어요" → navigate(-1)
- Back → navigate(-1)
- Photo change → console.log placeholder

---

## SCREEN 2: PaymentMethods (/payment-methods)

PURPOSE
Manage registered payment methods. List + add new.

MOCK DATA
- Card "신한카드 1234-****-****-5678", default=true
- KakaoPay "kakao@example.com", default=false

LAYOUT
- Header: back + "결제 수단 관리"
- Body:
  - List of methods (vertical cards, white bg, 1px #E5E6E8, 16px
    radius, 16px padding):
    - Each row: icon (16px Brand) + method name + last 4 digits +
      "기본" pill if default (bg #2563EB/10 text #2563EB 11/700)
    - Right side: ChevronRight to detail (or delete trash icon)
  - "+ 결제 수단 추가" button — full-width dashed border #D1D3D5,
    14/600 #4B4F54, 56px height, 12px radius. Mock — console.log only.
- Empty state (if no methods): centered icon CreditCard 48px #D1D3D5
  + "등록된 결제 수단이 없어요" + "결제 수단을 추가하고 빠르게 결제해보세요"

ACTIONS
- Tap method row → 결제 수단 상세 (mock: console.log)
- Tap delete → confirm dialog "이 결제 수단을 삭제하시겠어요?" → 삭제
- Tap "+" → console.log placeholder
- Back → navigate(-1)

---

## SCREEN 3: NotificationSettings (/notification-settings)

PURPOSE
Toggle notification categories and channels.

LAYOUT
- Header: back + "알림 설정"
- Body — two grouped sections:

  SECTION 1: "알림 종류" (15/700 #191919 section header)
  - 매칭 알림 (강사 매칭 확정, 입장 알림 등) — toggle ON default
  - 강습 알림 (강습 시작 1시간 전 리마인더) — toggle ON default
  - 채팅 알림 (강사 메시지) — toggle ON default
  - 마케팅 알림 (이벤트, 프로모션) — toggle OFF default

  SECTION 2: "알림 채널" (15/700 #191919 section header, 32px above)
  - 푸시 알림 — toggle ON default
  - 카카오톡 알림 — toggle OFF default
  - 이메일 알림 — toggle OFF default

- Each row: label 16/600 #191919 + sub-description 12/400 #76787A
  (where applicable) + right-side toggle switch.
- Toggle switch: 44×24 rounded-pill, bg #E5E6E8 (off) / #2563EB (on),
  18×18 white knob with subtle neutral shadow.
- Rows separated by 1px #E5E6E8 dividers.

ACTIONS
- Toggle changes save immediately (no save button). Show small toast
  "변경사항이 저장됐어요" briefly on first change only.
- Back → navigate(-1)

---

## SCREEN 4: Support (/support)

PURPOSE
FAQ + 1:1 contact entry.

LAYOUT
- Header: back + "고객 지원"
- Body:
  SECTION 1: "자주 묻는 질문" header (15/700)
    - Accordion list (8-10 mock items). Tap to expand inline answer.
    - Each item header: 15/600 #191919 + ChevronDown/Up icon
    - Expanded body: 14/400 #4B4F54 leading-relaxed, py-4
    - Items separated by 1px #E5E6E8
    - Mock items:
      - "매칭은 어떻게 진행되나요?"
      - "결제는 안전한가요?"
      - "강습을 취소하면 환불은 어떻게 되나요?"
      - "강사가 마음에 안 들면 어떻게 하나요?"
      - "다중 매칭은 뭔가요?"
      - "패찰비는 누가 부담하나요?"
      - "강습 시간을 변경할 수 있나요?"
      - "강사로 등록하려면 어떻게 하나요?"

  SECTION 2: "1:1 문의" (32px above)
    - Full-width button: bg #F5F6F7, 56px height, 16px radius,
      text 15/600 #191919, MessageCircle icon left
    - Label: "1:1 문의하기"
    - Sub-caption below: "보통 24시간 이내에 답변드려요" 12/400 #76787A

ACTIONS
- Accordion expand/collapse animated
- 1:1 문의 → console.log placeholder (real impl: open chat with CS bot)
- Back → navigate(-1)

---

## SCREEN 5: Terms (/terms)

PURPOSE
List of policy documents. Tap to read.

LAYOUT
- Header: back + "약관·정책"
- Body — list of document rows:
  - 이용약관
  - 개인정보처리방침
  - 위치기반서비스 이용약관
  - 마케팅 정보 수신 동의
  - 청소년보호정책
  - 사업자 정보
- Each row: white bg, py-4 px-5, label 15/600 #191919 +
  ChevronRight 20px #A2A4A6 right. Separator 1px #E5E6E8.
- Below the list: small caption 12/400 #A2A4A6
  "SSING은 (주)OOO이 운영합니다. 사업자등록번호 OOO-OO-OOOOO"

ACTIONS
- Tap row → detail screen (mock: console.log + simple alert
  "준비 중" for now). Real impl: full document viewer.
- Back → navigate(-1)

---

## OUT OF SCOPE — DO NOT CHANGE
- Don't change existing screens (C1-C9, S1-S9, O1).
- Don't change modal components.
- Don't change the design system tokens.
- Don't add bottom navigation to these 5 screens (they're sub-pages,
  not tab destinations).
```

---

## 던지고 받은 후 점검

| 화면 | 점검 |
|---|---|
| S6Profile | 메뉴 5개 활성화됨 (opacity 100%, 탭 가능) |
| EditProfile | 입력 필드 + 저장 버튼, 이메일 disabled |
| PaymentMethods | 카드·카카오페이 리스트 + 추가 버튼 |
| NotificationSettings | 7개 토글 (카테고리 4 + 채널 3) |
| Support | 8개 FAQ accordion + 1:1 문의 |
| Terms | 6개 정책 문서 리스트 |
| routes.tsx | 5개 import + 5개 route 추가 |

작업: 라우트 5개 + 화면 5개 + S6Profile 1줄 수정. Figma Make에 한 번에 던지면 끝.
