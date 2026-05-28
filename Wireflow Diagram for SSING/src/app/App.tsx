import { useState, useRef } from "react";
import { MemoryRouter } from "react-router";

// Actual app screens (copied from Create app wireframe)
import O1Login from "./screens/O1Login";
import C1Home from "./screens/C1Home";
import C2RequestInput from "./screens/C2RequestInput";
import C3InstructorPool from "./screens/C3InstructorPool";
import C4InstructorProfile from "./screens/C4InstructorProfile";
import C5ReservationRoomList from "./screens/C5ReservationRoomList";
import C6RoomDetail from "./screens/C6RoomDetail";
import C7Payment from "./screens/C7Payment";
import C8MatchConfirmed from "./screens/C8MatchConfirmed";
import C9PostLessonRating from "./screens/C9PostLessonRating";
import S1Chat from "./screens/S1Chat";
import S2Location from "./screens/S2Location";
import S3Notifications from "./screens/S3Notifications";
import S4History from "./screens/S4History";
import S5Messages from "./screens/S5Messages";
import S6Profile from "./screens/S6Profile";
import S9Report from "./screens/S9Report";
import NotFound from "./screens/NotFound";

// Wireflow-only screens (placeholder until Master Patch applied to app)
import GroupMatchingPhaseA from "./screens/GroupMatchingPhaseA";
import GroupMatchingPhaseB from "./screens/GroupMatchingPhaseB";
import GroupMatchingPhaseC from "./screens/GroupMatchingPhaseC";
import EditProfile from "./screens/EditProfile";
import PaymentMethods from "./screens/PaymentMethods";
import NotificationSettings from "./screens/NotificationSettings";
import Support from "./screens/Support";
import Terms from "./screens/Terms";

// Modals
import ReceiptModal from "./components/ReceiptModal";
import CancelDialog from "./components/CancelDialog";
import AlertSubscribeModal from "./components/AlertSubscribeModal";
import LogoutDialog from "./components/LogoutDialog";

const SCALE = 0.7125; // 280/393 — viewport scale factor
const INNER_W = 393;
const INNER_H = 852;
const OUTER_W = Math.round(INNER_W * SCALE); // 280
const OUTER_H = Math.round(INNER_H * SCALE); // 607

export default function App() {
  const [scale, setScale] = useState(0.5);
  const [pan, setPan] = useState({ x: 40, y: 40 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-no-pan]")) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.min(2, Math.max(0.15, s + (e.deltaY > 0 ? -0.04 : 0.04))));
  };

  const resetView = () => {
    setScale(0.32);
    setPan({ x: 40, y: 40 });
  };

  return (
    <div className="w-full h-screen bg-[#F5F6F7] overflow-hidden">
      {/* Toolbar */}
      <div
        className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E6E8] z-50 flex items-center justify-between px-6"
        data-no-pan
      >
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-[#191919]">SSING Wireflow · Precision</h1>
          <div className="text-sm text-[#76787A]">28 screens · 32 arrows · pixel-aligned to 실 앱</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#76787A] tabular-nums">Zoom: {Math.round(scale * 100)}%</div>
          <button
            onClick={resetView}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-semibold hover:bg-[#1e40af]"
          >
            Reset view
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="absolute inset-0 top-16"
        style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "0 0",
            width: "5400px",
            height: "5400px",
            position: "relative",
          }}
        >
          {/* ===== ARROWS (SVG layer, behind cards) ===== */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: "5400px", height: "5400px", zIndex: 0 }}
          >
            <defs>
              <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#2563EB" />
              </marker>
              <marker id="arrow-black" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#191919" />
              </marker>
              <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#FF8A00" />
              </marker>
              <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#0FB882" />
              </marker>
              <marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#76787A" />
              </marker>
              <marker id="arrow-light-gray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#A2A4A6" />
              </marker>
            </defs>

            {/* ============================================================
                ARROWS — 버튼 → 창 단위 (각 화살표는 정확한 트리거 좌표에서 출발)
                ============================================================ */}

            {/* === 1. AUTH → HOME === */}
            {/* O1 카카오/Apple 로그인 버튼 → C1 카드 상단 */}
            <path d="M 260,460 L 260,738" stroke="#2563EB" strokeWidth="3" fill="none" markerEnd="url(#arrow-blue)" />

            {/* === 2. C1 HOME → C2 REQUEST (즉시 / 예약 분기) === */}
            {/* C1 '지금 강습' gradient 카드 → C2 instant */}
            <path d="M 400,944 L 480,944" stroke="#2563EB" strokeWidth="3" fill="none" markerEnd="url(#arrow-blue)" />
            {/* C1 '예약 강습' white 카드 → C2 reservation */}
            <path d="M 400,1119 L 480,1119" stroke="#191919" strokeWidth="3" fill="none" markerEnd="url(#arrow-black)" />

            {/* === 3. C2 BOTTOM CTA → 3-WAY 분기 === */}
            {/* C2 '강사 매칭 시작' CTA → C3 (instant + 1:1) */}
            <path d="M 600,1347 L 600,1480" stroke="#2563EB" strokeWidth="3" fill="none" markerEnd="url(#arrow-blue)" />
            {/* C2 '강사 매칭 시작' CTA → GM-A (instant + 함께듣기) */}
            <path d="M 700,1347 Q 880,1700 880,2050 Q 880,2160 720,2218" stroke="#FF8A00" strokeWidth="3" fill="none" markerEnd="url(#arrow-orange)" />
            {/* C2 '방 매칭 시작' CTA → C5 (reservation, 우회 좌측) */}
            <path d="M 540,1347 Q 360,2200 540,2958" stroke="#191919" strokeWidth="3" fill="none" markerEnd="url(#arrow-black)" />

            {/* === 4. INSTANT 1:1 CHAIN (C3 → C4 → C7) === */}
            {/* C3 첫 강사 카드 → C4 */}
            <path d="M 751,1682 L 840,1682" stroke="#2563EB" strokeWidth="3" fill="none" markerEnd="url(#arrow-blue)" />
            {/* C4 '매칭 시작' bottom CTA → C7 */}
            <path d="M 1106,2052 Q 1340,2200 1560,1760" stroke="#2563EB" strokeWidth="3" fill="none" markerEnd="url(#arrow-blue)" />

            {/* === 5. GROUP MATCHING CHAIN (auto-transition orange dashed) === */}
            {/* GM-A spinner → GM-B (auto 3s) */}
            <path d="M 760,2524 L 840,2524" stroke="#FF8A00" strokeWidth="2.5" strokeDasharray="6,4" fill="none" markerEnd="url(#arrow-orange)" />
            {/* GM-B 매칭 완료 → GM-C voting */}
            <path d="M 1120,2524 L 1200,2524" stroke="#FF8A00" strokeWidth="2.5" strokeDasharray="6,4" fill="none" markerEnd="url(#arrow-orange)" />
            {/* GM-C 투표 결과 → C7 결제 */}
            <path d="M 1480,2400 Q 1520,2100 1700,2087" stroke="#FF8A00" strokeWidth="3" fill="none" markerEnd="url(#arrow-orange)" />

            {/* === 6. RESERVATION CHAIN (C5 → C6 → C7) === */}
            {/* C5 첫 방 카드 → C6 */}
            <path d="M 751,3174 L 840,3174" stroke="#191919" strokeWidth="3" fill="none" markerEnd="url(#arrow-black)" />
            {/* C6 '입장하기' bottom CTA → C7 */}
            <path d="M 1106,3530 Q 1450,2500 1700,2087" stroke="#191919" strokeWidth="3" fill="none" markerEnd="url(#arrow-black)" />

            {/* === 7. PAYMENT → CONFIRMED → RATING (green) === */}
            {/* C7 '결제하기' bottom CTA → C8 */}
            <path d="M 1826,2052 Q 1880,1800 1920,1700" stroke="#0FB882" strokeWidth="3" fill="none" markerEnd="url(#arrow-green)" />
            {/* C8 '강습 완료 · 평가하기' → C9 */}
            <path d="M 2186,1970 Q 2240,1820 2280,1730" stroke="#0FB882" strokeWidth="3" fill="none" markerEnd="url(#arrow-green)" />
            {/* C9 '평가 제출' → C1 홈 (긴 회귀 경로, 점선) */}
            <path d="M 2560,2050 Q 2780,2050 2780,440 L 260,440 L 260,738" stroke="#0FB882" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrow-green)" />

            {/* === 8. C1 HEADER 액션 (보조 gray dashed) === */}
            {/* C1 위치 핀 (지산리조트 pill) → S2 Location Picker */}
            <path d="M 170,761 Q 80,2400 1200,3878" stroke="#76787A" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow-gray)" />
            {/* C1 알림벨 → S3 Notifications */}
            <path d="M 378,761 Q 1700,800 1700,3700" stroke="#76787A" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow-gray)" />
            {/* C1 '진행 중인 강습' strip → C8 (재진입) */}
            <path d="M 400,812 Q 1300,812 1920,1620" stroke="#76787A" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow-gray)" />

            {/* === 9. C1 BOTTOM NAV (4 tabs) → S4/S5/S6 === */}
            {/* 내역 tab → S4 */}
            <path d="M 225,1305 Q 225,3600 260,3700" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* 메시지 tab → S5 */}
            <path d="M 295,1305 Q 295,3600 620,3700" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* 내정보 tab → S6 */}
            <path d="M 365,1305 Q 365,3600 980,3700" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />

            {/* === 10. POST-LESSON 보조 흐름 (gray dashed) === */}
            {/* C8 '강사와 채팅하기' → S1 */}
            <path d="M 2050,1730 L 2050,2218" stroke="#76787A" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow-gray)" />
            {/* C9 '강사에 문제가 있어요' → S9 */}
            <path d="M 2320,1990 Q 2330,2100 2420,2218" stroke="#76787A" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow-gray)" />
            {/* S4 진행 중 카드 → C8 (재진입) */}
            <path d="M 400,3880 Q 800,3000 1920,1750" stroke="#76787A" strokeWidth="2" strokeDasharray="5,4" fill="none" markerEnd="url(#arrow-gray)" />

            {/* === 11. S6 PROFILE 메뉴 (5 + 로그아웃) → Settings 카드 === */}
            {/* 내 정보 수정 → EditProfile */}
            <path d="M 1111,3874 Q 1200,4150 260,4438" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* 결제 수단 관리 → PaymentMethods */}
            <path d="M 1111,3914 Q 1200,4150 620,4438" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* 알림 설정 → NotificationSettings */}
            <path d="M 1111,3954 L 980,4438" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* 고객 지원 → Support */}
            <path d="M 1111,3994 Q 1200,4200 1340,4438" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* 약관·정책 → Terms */}
            <path d="M 1111,4033 Q 1300,4250 1700,4438" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* 로그아웃 → M-Logout */}
            <path d="M 1111,4085 Q 2200,4085 3200,4500" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />

            {/* === 12. MODAL triggers (dotted) === */}
            {/* C8 '상세보기 →' link → M-Receipt */}
            <path d="M 2186,1940 Q 2700,2000 3200,2280" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* C8 '강습 취소' link → M-Cancel */}
            <path d="M 2000,2080 Q 2500,2300 3200,3000" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
            {/* C3 비어있을 때 → M-Alert (강사 등장 알림) */}
            <path d="M 760,1900 Q 2000,2400 3200,3760" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />

            {/* === 13. O1 '이용약관 / 개인정보' link → Terms === */}
            <path d="M 260,580 Q 600,2500 1700,4438" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow-light-gray)" />
          </svg>

          {/* ===== ARROW LABELS — 화살표의 트리거 버튼 이름 ===== */}
          {/* Auth → Home */}
          <ArrowLabel x={300} y={595} text="카카오 / Apple 로그인" color="#2563EB" />
          {/* C1 → C2 (instant / reservation) */}
          <ArrowLabel x={440} y={920} text="지금 강습" color="#2563EB" />
          <ArrowLabel x={440} y={1097} text="예약 강습" color="#191919" />
          {/* C2 → 3-way split */}
          <ArrowLabel x={600} y={1413} text="강사 매칭 시작 · 1:1" color="#2563EB" />
          <ArrowLabel x={890} y={1940} text="함께 듣기 ON" color="#FF8A00" />
          <ArrowLabel x={340} y={2200} text="방 매칭 시작 · 예약" color="#191919" />
          {/* Instant 1:1 */}
          <ArrowLabel x={795} y={1665} text="강사 선택" color="#2563EB" />
          <ArrowLabel x={1340} y={2180} text="매칭 시작" color="#2563EB" />
          {/* Group */}
          <ArrowLabel x={800} y={2495} text="auto 3s" color="#FF8A00" />
          <ArrowLabel x={1160} y={2495} text="auto 2s" color="#FF8A00" />
          <ArrowLabel x={1565} y={2230} text="투표 결과 확정" color="#FF8A00" />
          {/* Reservation */}
          <ArrowLabel x={795} y={3155} text="방 선택" color="#191919" />
          <ArrowLabel x={1430} y={2480} text="입장하기" color="#191919" />
          {/* Payment → Confirmed → Rating */}
          <ArrowLabel x={1880} y={1900} text="결제하기" color="#0FB882" />
          <ArrowLabel x={2240} y={1875} text="강습 완료 · 평가하기" color="#0FB882" />
          <ArrowLabel x={2700} y={300} text="평가 제출 → 홈" color="#0FB882" />
          {/* C1 header / nav */}
          <ArrowLabel x={130} y={2400} text="지산리조트 (위치 핀)" color="#76787A" />
          <ArrowLabel x={1700} y={2400} text="알림벨" color="#76787A" />
          <ArrowLabel x={1300} y={1100} text="진행 중인 강습" color="#76787A" />
          <ArrowLabel x={235} y={2700} text="내역 tab" color="#A2A4A6" />
          <ArrowLabel x={320} y={2880} text="메시지 tab" color="#A2A4A6" />
          <ArrowLabel x={460} y={3000} text="내정보 tab" color="#A2A4A6" />
          {/* Post-lesson */}
          <ArrowLabel x={2050} y={2000} text="강사와 채팅하기" color="#76787A" />
          <ArrowLabel x={2375} y={2110} text="강사에 문제가 있어요" color="#76787A" />
          <ArrowLabel x={920} y={3300} text="진행 중 카드 클릭" color="#76787A" />
          {/* Modal triggers */}
          <ArrowLabel x={2900} y={2090} text="상세보기" color="#A2A4A6" />
          <ArrowLabel x={2700} y={2680} text="강습 취소" color="#A2A4A6" />
          <ArrowLabel x={2300} y={3160} text="빈 풀 · 등장 알림 받기" color="#A2A4A6" />
          {/* O1 → Terms */}
          <ArrowLabel x={650} y={2600} text="이용약관 / 개인정보" color="#A2A4A6" />

          {/* ===== LANE LABELS ===== */}
          <LaneLabel x={20} y={0}    text="1. Auth" />
          <LaneLabel x={20} y={720}  text="2. Home & Entry" />
          <LaneLabel x={20} y={1460} text="3. Instant 1:1 → Payment → Confirmed → Rating" />
          <LaneLabel x={20} y={2200} text="4. Instant Group Matching (Voting) / Post-lesson" />
          <LaneLabel x={20} y={2940} text="5. Reservation" />
          <LaneLabel x={20} y={3680} text="6. Bottom Nav destinations" />
          <LaneLabel x={20} y={4420} text="7. Settings & Misc" />
          <LaneLabel x={3120} y={2100} text="Modals" />

          {/* ===== SCREEN CARDS ===== */}

          {/* Lane 1: Auth */}
          <ScreenCard x={120} y={0} id="O1" name="Login" path="/login">
            <O1Login />
          </ScreenCard>

          {/* Lane 2: Home & Entry */}
          <ScreenCard x={120} y={720} id="C1" name="Home" path="/">
            <C1Home />
          </ScreenCard>
          <ScreenCard x={480} y={720} id="C2" name="Request Input" path="/request?mode=instant" initialPath="/request?mode=instant">
            <C2RequestInput />
          </ScreenCard>

          {/* Lane 3: Instant 1:1 → Payment → Rating */}
          <ScreenCard x={480} y={1460} id="C3" name="Instructor Pool" path="/instructors">
            <C3InstructorPool />
          </ScreenCard>
          <ScreenCard x={840} y={1460} id="C4" name="Instructor Profile" path="/instructor/1" initialPath="/instructor/1">
            <C4InstructorProfile />
          </ScreenCard>
          <ScreenCard x={1560} y={1460} id="C7" name="Payment" path="/payment">
            <C7Payment />
          </ScreenCard>
          <ScreenCard x={1920} y={1460} id="C8" name="Match Confirmed" path="/confirmed">
            <C8MatchConfirmed />
          </ScreenCard>
          <ScreenCard x={2280} y={1460} id="C9" name="Rating" path="/rating">
            <C9PostLessonRating />
          </ScreenCard>

          {/* Lane 4: Group Matching (3 phases) + Chat + Report */}
          <ScreenCard x={480} y={2200} id="GM-A" name="Group · Matching" path="/group-matching?phase=A">
            <GroupMatchingPhaseA />
          </ScreenCard>
          <ScreenCard x={840} y={2200} id="GM-B" name="Group · 매칭 완료" path="/group-matching?phase=B">
            <GroupMatchingPhaseB />
          </ScreenCard>
          <ScreenCard x={1200} y={2200} id="GM-C" name="Group · 강사 투표" path="/group-matching?phase=C">
            <GroupMatchingPhaseC />
          </ScreenCard>
          <ScreenCard x={1920} y={2200} id="S1" name="Chat" path="/chat/m1" initialPath="/chat/m1">
            <S1Chat />
          </ScreenCard>
          <ScreenCard x={2280} y={2200} id="S9" name="Report" path="/report/m1" initialPath="/report/m1">
            <S9Report />
          </ScreenCard>

          {/* Lane 5: Reservation */}
          <ScreenCard x={480} y={2940} id="C5" name="Room List" path="/rooms">
            <C5ReservationRoomList />
          </ScreenCard>
          <ScreenCard x={840} y={2940} id="C6" name="Room Detail" path="/room/1" initialPath="/room/1">
            <C6RoomDetail />
          </ScreenCard>

          {/* Lane 6: Bottom Nav destinations */}
          <ScreenCard x={120} y={3680} id="S4" name="History" path="/history">
            <S4History />
          </ScreenCard>
          <ScreenCard x={480} y={3680} id="S5" name="Messages" path="/messages">
            <S5Messages />
          </ScreenCard>
          <ScreenCard x={840} y={3680} id="S6" name="Profile" path="/profile">
            <S6Profile />
          </ScreenCard>
          <ScreenCard x={1200} y={3680} id="S2" name="Location Picker" path="/location">
            <S2Location />
          </ScreenCard>
          <ScreenCard x={1560} y={3680} id="S3" name="Notifications" path="/notifications">
            <S3Notifications />
          </ScreenCard>

          {/* Lane 7: Settings + Misc */}
          <ScreenCard x={120} y={4420} id="EditProfile" name="Edit Profile" path="/edit-profile">
            <EditProfile />
          </ScreenCard>
          <ScreenCard x={480} y={4420} id="PaymentMethods" name="Payment Methods" path="/payment-methods">
            <PaymentMethods />
          </ScreenCard>
          <ScreenCard x={840} y={4420} id="NotificationSettings" name="Notification Settings" path="/notification-settings">
            <NotificationSettings />
          </ScreenCard>
          <ScreenCard x={1200} y={4420} id="Support" name="Support" path="/support">
            <Support />
          </ScreenCard>
          <ScreenCard x={1560} y={4420} id="Terms" name="Terms" path="/terms">
            <Terms />
          </ScreenCard>
          <ScreenCard x={1920} y={4420} id="404" name="Not Found" path="*">
            <NotFound />
          </ScreenCard>

          {/* ===== MODALS ===== */}
          <ScreenCard x={3200} y={2200} id="M-Receipt" name="Receipt Modal" path="modal: 영수증">
            <ReceiptModal
              isOpen={true}
              onClose={() => {}}
              data={{
                basePrice: 70000,
                groupSize: 2,
                perPersonPrice: 43750,
                paymentMethod: "신한카드 ****-1234",
                paymentDate: "2026.05.28 10:24",
                matchId: "m1",
              }}
            />
          </ScreenCard>
          <ScreenCard x={3200} y={2940} id="M-Cancel" name="Cancel Dialog" path="modal: 강습 취소">
            <CancelDialog isOpen={true} onClose={() => {}} onConfirm={() => {}} />
          </ScreenCard>
          <ScreenCard x={3200} y={3680} id="M-Alert" name="Alert Subscribe" path="modal: 등장 알림">
            <AlertSubscribeModal
              isOpen={true}
              onClose={() => {}}
              context="instructor"
              requestSummary="스키 · 초급 · 2명 · 3시간 · 지산리조트"
            />
          </ScreenCard>
          <ScreenCard x={3200} y={4420} id="M-Logout" name="Logout Dialog" path="modal: 로그아웃">
            <LogoutDialog isOpen={true} onClose={() => {}} />
          </ScreenCard>

          {/* ===== LEGEND ===== */}
          <div
            className="absolute bg-white rounded-2xl border border-[#E5E6E8] p-6 shadow-sm"
            style={{ left: "4900px", top: "120px", width: "340px" }}
          >
            <h3 className="font-bold text-[#191919] mb-1">Wireflow 범례</h3>
            <div className="text-[11px] text-[#76787A] mb-4">v2 · Precision (pixel-aligned)</div>
            <div className="space-y-3">
              <LegendRow color="#2563EB" label="즉시 매칭 1:1 흐름" />
              <LegendRow color="#191919" label="예약 매칭 흐름" />
              <LegendRow color="#FF8A00" label="즉시 그룹 매칭 (Voting)" />
              <LegendRow color="#0FB882" label="결제 · 확정 · 평가 흐름" />
              <LegendRow color="#76787A" label="조건부 / 재진입 / 사후" dashed />
              <LegendRow color="#A2A4A6" label="모달 / 보조 화면 호출" dotted />
            </div>
            <div className="mt-5 pt-4 border-t border-[#E5E6E8]">
              <div className="text-xs font-bold text-[#191919] mb-2">화살표 시작점</div>
              <div className="text-xs text-[#4B4F54] leading-relaxed">
                카드 모서리가 아닌 <span className="font-bold text-[#191919]">해당 액션을 유발하는 버튼/요소</span>에서 출발합니다. 카드 안의 미니 모킹은 실 앱(393×852)의 정확한 0.7125배 축소판입니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Helper components
   ============================================================ */

function LaneLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <div className="absolute" style={{ left: `${x}px`, top: `${y}px` }}>
      <div className="text-sm font-bold text-[#76787A]">{text}</div>
    </div>
  );
}

/**
 * ArrowLabel — small badge that names the button/element triggering an arrow.
 * Positioned in canvas-space; (x, y) is the label's CENTER.
 */
function ArrowLabel({
  x,
  y,
  text,
  color = "#191919",
}: {
  x: number;
  y: number;
  text: string;
  color?: string;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    >
      <div
        className="px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap shadow-sm"
        style={{
          color,
          backgroundColor: "#FFFFFF",
          border: `1px solid ${color}33`,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function LegendRow({
  color,
  label,
  dashed,
  dotted,
}: {
  color: string;
  label: string;
  dashed?: boolean;
  dotted?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <svg width="48" height="3">
        <line
          x1="0"
          y1="1.5"
          x2="48"
          y2="1.5"
          stroke={color}
          strokeWidth={dashed || dotted ? "1.5" : "2"}
          strokeDasharray={dashed ? "4,3" : dotted ? "2,3" : undefined}
        />
      </svg>
      <span className="text-sm text-[#4B4F54]">{label}</span>
    </div>
  );
}

/**
 * ScreenCard wraps a real app screen in a fixed 393×852 viewport,
 * scaled by 0.7125 to produce a pixel-perfect 280×607 mini-mocking.
 * Each card runs in its own MemoryRouter so router hooks work without
 * affecting other cards.
 */
function ScreenCard({
  x,
  y,
  id,
  name,
  path,
  initialPath,
  children,
}: {
  x: number;
  y: number;
  id: string;
  name: string;
  path: string;
  initialPath?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${x}px`, top: `${y}px`, width: `${OUTER_W}px`, zIndex: 1 }}
    >
      <div className="text-xs font-bold text-[#191919] mb-2 truncate">
        <span className="text-[#76787A] mr-1">{id} ·</span>
        {name}
      </div>
      <div
        className="bg-white rounded-[24px] border border-[#E5E6E8] overflow-hidden shadow-sm relative"
        style={{ width: `${OUTER_W}px`, height: `${OUTER_H}px` }}
      >
        <div
          style={{
            width: `${INNER_W}px`,
            height: `${INNER_H}px`,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
            position: "relative",
          }}
        >
          <MemoryRouter initialEntries={[initialPath || path]}>
            {children}
          </MemoryRouter>
        </div>
      </div>
      <div className="text-[10px] text-[#76787A] mt-1.5 truncate">{path}</div>
    </div>
  );
}
