# Figma Make — Wireflow Precision Patch v2 (강사단위 합류 화살표 재배치)

> **목적**: 강사단위 합류 메커니즘 전환에 맞춰, 화살표를 카드→카드가 아닌
> **카드 내 specific 버튼 → 다음 카드 진입점** 단위로 정밀 재배치.
>
> **적용 순서**:
> 1. `figma_make_wireflow_patch.md` (v1 content) → 이미 적용된 상태 가정
> 2. `figma_make_wireflow_precision_patch.md` (v1 precision) → 이미 적용된 상태 가정
> 3. `figma_make_wireflow_patch_v2.md` (v2 content, GM 제거 + 합류 다이얼로그) → 이미 적용된 상태 가정
> 4. **이 patch (v2 precision) → 마지막에 적용**
>
> 같은 Figma Make 세션 (Wireflow Diagram for SSING)에 던진다.
>
> Idempotent.

---

## Precision Patch v2

````
Apply this precision arrow re-routing patch to the SSING Wireflow
Diagram. This rewrites the arrow set to match the new instructor-unit
join model, using button-anchored origins (each arrow starts from the
specific button or UI element inside the source card that triggers the
navigation, not from the generic card edge).

Pre-conditions (must already be in place from prior patches):
- GM-A/B/C cards removed
- JoinConsentDialog modal card added at (3000, 3700) or (3000, 3800)
- C7/C8/C9 in Instant row (y=1460)
- S1/S2/S3/S9 in Sub-screens row (y=2200 → adjusted to y=2380 in v2
  content patch — use whichever is current in your build)
- ScreenCard inner viewport 393×852 scaled by 0.7125 → 280×607 outer

If your current y values differ from below, translate the y-offsets
proportionally. Don't break the orthogonal pattern.

##########################################################
# PRIORITY 1 — REMOVE every arrow touching GM-A/B/C
##########################################################

Delete these (already specified in v2 content patch — re-confirm):
1. C2 → GM-A (Warm bezier)
2. GM-A → GM-B (Warm dashed)
3. GM-B → GM-C (Warm dashed)
4. GM-C → C7 (Warm bezier)

##########################################################
# PRIORITY 2 — REMOVE legacy "즉시 그룹" branch from C2
##########################################################

C2 now has exactly TWO outgoing primary arrows:
1. C2 "강사 매칭 시작" (instant) → C3 (Blue)
2. C2 "방 매칭 시작" (reservation) → C5 (Black)

The previous third arrow (C2 → GM-A, Warm) is gone. Both instant
variants (1:1, 합류) go through the same C2 → C3 → C4 path; the
branching happens at C4 via JoinConsentDialog, not at C2.

##########################################################
# PRIORITY 3 — UPDATE C2 → C3, C2 → C5 paths
##########################################################

Single submit button at C2 bottom is the source for both. The current
v1 precision patch uses:
- C2 → C3: `M 620,1283 L 620,1460`
- C2 → C5: `M 620,1283 Q 620,2000 480,3130`

Keep these. They originate from the same sticky CTA button (inner
200,790) at the bottom of C2; the visual divergence happens after the
button. Add a small caption near the C2 button:
- "즉시 모드" 11/600 #2563EB along the blue branch
- "예약 모드" 11/600 #191919 along the black branch

##########################################################
# PRIORITY 4 — UPDATE C3 → C4 (join indicator-aware origins)
##########################################################

C3 now shows 4 instructor cards with different joinStatus indicators.
For demonstration, draw the C3 → C4 arrow from the **second card**
(이OO, "2명 함께 듣는 중 · 38분 남음") to highlight the join-flow
path.

Replace existing C3 → C4 arrow with:

```svg
{/* C3 이OO 강사 카드 (inner y ≈ 460, second card) → C4 좌측 진입 */}
{/* Card 2 위치: card_y + 460*0.7125 = 1460 + 328 = 1788 */}
<path d="M 760,1788 L 840,1788"
  stroke="#2563EB" strokeWidth="2" fill="none"
  markerEnd="url(#arrow-blue)" />
```

Caption near midpoint: "강사 선택" 11/400 #76787A

##########################################################
# PRIORITY 5 — NEW C4 → JoinConsentDialog arrow
##########################################################

C4 "매칭 시작" sticky CTA (inner 200, 790) → JoinConsentDialog modal.
Conditional path (only fired when mode=instant AND allowMulti=true
AND (joinStatus.kind === "none" || "open")).

Light gray dotted (modal trigger style):

```svg
{/* C4 "매칭 시작" sticky CTA (inner 200,790) → JoinConsentDialog */}
{/* C4 우측 모서리 (1120, 2023) → modal 좌측 (3000, 3800) */}
{/* ortho path: 우측으로 빠져 yH3 lane (y=2280) 거쳐 col8 vertical lane (x=2940)에서 modal 좌측 진입 */}
<path d="M 1120,2023 L 2940,2023 L 2940,3800 L 3000,3800"
  stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="2,2" fill="none"
  markerEnd="url(#arrow-light-gray)" />
```

Caption near the bend at (2940, 2280): "합류 동의 시" 11/400 #76787A

##########################################################
# PRIORITY 6 — UPDATE C4 → C7 arrow (split into 3 logical sources)
##########################################################

C4 has THREE possible routings to C7 depending on dialog outcome:
1. 첫 손님 + "함께 들을게요" → C7 with joinRole="first"
2. 첫 손님 + "1:1 단독만" → C7 with joinRole="solo"
3. 후속 손님 + "N명째로 합류할게요" → C7 with joinRole="subsequent"

For wireflow clarity, draw ONE arrow from C4 to C7 (representing all
three) but with a forked tail near C4's right edge:

```svg
{/* C4 → C7 main (모든 합류 케이스 합쳐서) */}
{/* origin: C4 CTA (inner 200,790) → C4 우측 (1120,2023) → C7 좌측 진입 */}
<path d="M 1120,2023 Q 1340,1900 1560,1764"
  stroke="#2563EB" strokeWidth="2" fill="none"
  markerEnd="url(#arrow-blue)" />
```

Caption near midpoint: "결제로" 11/400 #2563EB

(Alternative: draw 3 thin parallel sub-arrows fanning out — but that
crowds the diagram. Single arrow + caption is cleaner.)

##########################################################
# PRIORITY 7 — JoinConsentDialog → C7 (loop-back)
##########################################################

After user confirms in the dialog, control returns to C4 then
proceeds to C7. For wireflow clarity, add a back-loop arrow from
JoinConsentDialog → C4:

```svg
{/* JoinConsentDialog 1차 (3000,3800) → C4 우측 (1120, 1840 — C4 카드 우측 상단) */}
{/* 동의 후 C4의 매칭 시작 흐름이 재개됨을 표현 */}
<path d="M 3000,3800 L 2960,3800 L 2960,1840 L 1120,1840"
  stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="2,2" fill="none"
  markerEnd="url(#arrow-light-gray)" />
```

Caption near (2960, 2700) bend: "확정 후 결제로" 11/400 #76787A

##########################################################
# PRIORITY 8 — Reservation flow remains untouched
##########################################################

These arrows stay as in v1 precision:
- C2 → C5 (Black bezier)
- C5 → C6 (Black horizontal)
- C6 → C7 (Black long bezier up to instant row)
- C7 → C8 (Green)
- C8 → C9 (Green)
- C8 → S1 (Gray dashed)
- C9 → C1 (Gray dashed top arc)
- Bottom-nav routes (Light gray dotted)
- S6 → Settings 5-fan (Light gray dotted)
- S6 → Logout modal (Light gray dotted)
- C7 → Receipt modal (Light gray dotted)
- C8 → Cancel modal (Light gray dotted)
- S4 → C8 (Gray dashed re-entry)
- O1 약관 → Terms (Light gray dotted)

##########################################################
# PRIORITY 9 — Update C3 → AlertSubscribe (no joinStatus chip yet)
##########################################################

The C3 empty state arrow (when no instructor available) → AlertSubscribe
modal stays the same in concept, but its source button is now the
"강사 등장 알림 받기" CTA shown in C3 empty state (only visible when
sortedInstructors.length === 0).

Keep existing path:
```svg
<path d="M 760,1976 Q 2000,1976 3000,3300"
  stroke="#A2A4A6" strokeWidth="1" strokeDasharray="2,2" fill="none"
  markerEnd="url(#arrow-light-gray)" />
```

Caption: "강사 0명 시" 11/400 #76787A

##########################################################
# PRIORITY 10 — Total arrow count after v2 precision
##########################################################

Removed (v2): 4 (GM-* arrows)
Added (v2): 2 (C4→JoinConsentDialog, JoinConsentDialog→C4 loopback)
Modified (v2): 2 (C3→C4 origin shifted to 2nd card, C4→C7 single arrow)

Final count: 32 - 4 + 2 = **30 arrows**

Update toolbar:
```tsx
<div className="text-sm text-[#76787A]">25 screens · 30 arrows · pixel-aligned · 강사단위 합류</div>
```

(25 screens = 24 original - 3 GM + 1 JoinConsentDialog + 3 was-already-there
let me recount: O1, C1, C2, C3, C4, C5, C6, C7, C8, C9, S1, S2, S3, S4,
S5, S6, S9, EditProfile, PaymentMethods, NotificationSettings, Support,
Terms, NotFound = 23 screens + 5 modals (Receipt, Cancel, AlertSubscribe,
JoinConsentDialog, Logout) = 28 total cards. Use this in toolbar: "28 cards · 30 arrows".)

##########################################################
# PRIORITY 11 — Legend update
##########################################################

Replace the "즉시 그룹 매칭 (Voting)" row with:
```tsx
<div className="flex items-center gap-3">
  <div className="w-12 h-0.5 border-t-2 border-dotted border-[#A2A4A6]"></div>
  <span className="text-sm text-[#4B4F54]">합류 동의 다이얼로그 트리거</span>
</div>
```

Move the orange (#FF8A00) row out — it's gone.

Add a small note at the legend bottom:
```tsx
<div className="mt-5 pt-5 border-t border-[#E5E6E8]">
  <div className="text-xs font-semibold text-[#191919] mb-2">강사단위 합류</div>
  <div className="text-xs text-[#4B4F54]">
    즉시·예약 모두 같은 흐름 (C2→C3→C4→C7). 차이는 C4에서 합류 동의
    다이얼로그가 뜨는지 여부.
  </div>
</div>
```

##########################################################
# OUT OF SCOPE
##########################################################

- 카드 사이즈, scale, viewport 변경 금지
- 카드 x 위치 변경 금지
- 모달 x=3000 좌표 변경 금지
- 줌/팬, Reset view 동작 변경 금지
- 새 화살표 마커 정의 금지 (기존 마커 재사용)
- 캔버스 배경색 변경 금지
````

---

## 사용 방법

1. Figma Make의 **Wireflow Diagram for SSING** 세션 열기 (선행 patch 적용된 상태)
2. 위 ```` 코드블록 ```` 통째 복사 (백틱 4개 바깥 블록까지)
3. 입력창 붙여넣기 → 생성
4. zip 받아서 `Wireflow Diagram for SSING/` 폴더 덮어쓰기

---

## 결과 받은 후 점검

| 영역 | 점검 |
|---|---|
| GM 화살표 | 4개 (C2→GMA, GMA→B, B→C, C→C7) 모두 사라짐 |
| C3 → C4 origin | 2번째 카드 (이OO, 합류 가능)에서 출발 |
| C4 → JoinConsentDialog | light gray dotted, ortho path 표시 |
| JoinConsentDialog → C4 (loopback) | "확정 후 결제로" 캡션 |
| C4 → C7 | 단일 파란 arrow (3가지 분기 통합) + "결제로" 캡션 |
| 캡션 | "강사 선택", "합류 동의 시", "확정 후 결제로", "결제로", "강사 0명 시" 등 |
| 화살표 총 개수 | 정확히 30개 |
| Legend | Warm (#FF8A00) 행 사라지고 "합류 동의 다이얼로그 트리거" 추가 + 강사단위 합류 노트 |
| Toolbar | "28 cards · 30 arrows · pixel-aligned · 강사단위 합류" |

---

## 적용 후 최종 상태

| 적용 순서 | 파일 | 효과 |
|---|---|---|
| 1 | `figma_make_wireflow.md` | 최초 wireflow 생성 |
| 2 | `figma_make_wireflow_patch.md` | 콘텐츠 일치 + ortho 화살표 v1 |
| 3 | `figma_make_wireflow_precision_patch.md` | 픽셀 정합 + 버튼 anchor 화살표 v1 |
| 4 | `figma_make_wireflow_patch_v2.md` | GM 제거 + JoinConsentDialog 추가 |
| 5 | **`figma_make_wireflow_precision_patch_v2.md` (본 patch)** | 강사단위 흐름 정밀 화살표 |

이 5단계 후 wireflow는 04_matching_system.md (강사단위 합류 메커니즘)
와 100% 일치.

---

## 변경 이력

| 날짜 | 변경 |
|---|---|
| 2026-05-29 | 초안 — 강사단위 합류 흐름 정밀 화살표 (30개), JoinConsentDialog 모달 연결 |
