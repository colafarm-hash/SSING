# Figma Make — 수정 Prompt (Patch 1)

> 이미 만든 9개 화면 + 7개 부수 화면 + 3개 모달 위에 **추가 수정 사항**을 반영하는 patch prompt.
> Figma Make에 던지면 영구 반영됨 (다음 zip 받아도 유지).

## 사용법

1. Figma Make 같은 세션에서 아래 코드블록 (``` 내부 ```) 통째 복사
2. 입력창에 붙여넣기 → 생성
3. 새 zip 받아서 로컬에 풀기 (`Create app wireframe` 폴더에 덮어쓰기)

---

## Patch 1 — 죽은 버튼 복구 + 다중매칭 옵션 추가

```
Apply the following patches to the existing SSING project. Keep all other
code, design, and copy intact. These are corrections + one new feature.

## PATCH 1 — Restore dead buttons (navigation was lost in previous iteration)

### C1Home.tsx — Bottom Navigation
The bottom-nav tabs (내역, 메시지, 내 정보) currently have NO onClick
handlers. Add navigation:

- 홈 tab: stays active (current screen), no navigate
- 내역 tab → `navigate("/history")`
- 메시지 tab → `navigate("/messages")`
- 내 정보 tab → `navigate("/profile")`

Apply onClick to each tab button.

### C2RequestInput.tsx — Location Chip
The location chip showing "지산리조트" at the top of the form has NO
onClick. Add `onClick={() => navigate("/location")}` to it so users can
change the resort.

### C8MatchConfirmed.tsx — Lesson Complete Trigger (MISSING)
There is no way for users to reach C9 (post-lesson rating) from C8.
Add a NEW button between the "결제 내역" section and the "강습 취소"
section:

- Button label: "강습 완료 · 평가하기"
- Style: Full-width secondary button. bg #F5F6F7, text #191919, height
  48px, radius 14px, font 14/700.
- onClick: `navigate("/rating")`
- This is normally triggered automatically when a lesson ends, but for
  demo/testing, surface it as a manual button. Add a small comment in
  the code indicating this is a demo trigger.
- Place it inside its own padded section (px-5 py-6, border-b
  #E5E6E8) right before the "강습 취소" section.

## PATCH 2 — Add "함께 듣기" (multi-match consent) option to C2

### Background
In reservation mode, users should be able to choose upfront whether
they're OK with joining a multi-match room (cheaper, shared with others)
or want only a 1:1 solo room. This affects which rooms appear in C5.

### Change in C2RequestInput.tsx

Add a new input field, visible ONLY when mode is reservation. Place it
RIGHT AFTER the existing "시작 시간" field (which is also reservation-only).

State:
- New state variable: `allowMulti` (boolean), default `true`.

UI (Korean):
- Section header: "함께 듣기" (with the same blue bar accent as other
  section headers — `w-1 h-4 bg-[#2563EB] rounded-full`)
- Two segmented chips (full width, 50/50 split, same style as 시간
  chips):
  - "함께도 OK" — when selected: bg #2563EB, text white. When unselected:
    bg white, text #4B4F54, border #E5E6E8.
  - "1:1 단독만" — same styling pattern.
- Small caption below (12/400 #76787A):
  - When `allowMulti = true`: "다른 사람과 같은 방에 들어가도 OK (가격 분담)"
  - When `allowMulti = false`: "우리만 듣는 1:1 단독 방만 매칭"

### Change in C5ReservationRoomList.tsx (filter)

The room list (`mockRooms`) currently shows both multi-match rooms and
1:1 rooms. Add filtering based on the user's `allowMulti` choice (for now,
since we don't have shared state, just read from URL search param
`?allowMulti=true|false`, default true):

- If `allowMulti = true`: show all rooms (current behavior).
- If `allowMulti = false`: filter to only `isMulti === false` rooms.

Update the request summary chip at top to reflect this:
- If `allowMulti = false`: append "· 1:1 단독" to the summary line.

### Change in C2 submit handler

Pass the choice via URL when navigating to C5:
- `navigate(\`/rooms?allowMulti=\${allowMulti}\`)` instead of plain
  `/rooms`.

## DESIGN SYSTEM (apply throughout — same as v2)

- No emoji anywhere.
- No font-black (900). Use 400/600/700 only.
- No colored shadows.
- No greetings or rhetorical headers.
- Prices in `₩{n.toLocaleString()}원` format.
- All Korean copy in 해요체 (soft-polite).
- Tabular numerals for money, time, metrics.

## OUT OF SCOPE — DO NOT CHANGE

- Don't change other screen content.
- Don't restructure routes (just use existing `/history`, `/messages`,
  `/profile`, `/location`, `/rating`, `/rooms`).
- Don't change the visual design of existing buttons/cards (only ADD
  the missing pieces).
- Don't change the modal components (ReceiptModal, CancelDialog,
  AlertSubscribeModal) — they're already correct.
```

---

## 던지고 받은 후 점검 항목

| # | 점검 | 기대 결과 |
|---|---|---|
| 1 | C1 바텀 탭 클릭 | 내역·메시지·내 정보 각 라우트로 이동 |
| 2 | C2 위치 칩 클릭 | `/location` 진입 |
| 3 | C8 "강습 완료 · 평가하기" 버튼 노출 | 결제 내역과 강습 취소 사이에 표시 |
| 4 | C8 그 버튼 클릭 | `/rating` (C9) 진입 |
| 5 | C2 예약 모드 진입 | "함께 듣기" 토글 노출 (시작 시간 아래) |
| 6 | C2 즉시 모드 진입 | "함께 듣기" 토글 노출 X |
| 7 | C2 "1:1 단독만" 선택 후 제출 | URL이 `/rooms?allowMulti=false` |
| 8 | C5에서 `?allowMulti=false`일 때 | 1:1 단독 방만 표시 |
| 9 | C5 요청 요약 | `allowMulti=false`일 때 "· 1:1 단독" 추가 |

---

## 향후 워크플로우 권장

| 단계 | 처리 |
|---|---|
| 새 기능·수정 발생 | **Figma Make에 patch prompt 던지기 (이 파일처럼)** |
| Figma Make 결과 | zip 다운로드 → 로컬 폴더에 덮어쓰기 |
| 로컬 검증 | pnpm dev로 클릭 테스트 |
| 시급한 핫픽스 (zip 받기 전) | 로컬 직접 수정 후 즉시 같은 내용 Figma Make에 patch로 던지기 (양쪽 동기화 유지) |

로컬만 수정하면 다음 zip에서 또 날아갑니다. **Figma Make = single source of truth**로 유지.
