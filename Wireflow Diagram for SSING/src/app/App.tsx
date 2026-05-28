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
          <div className="text-sm text-[#76787A]">28 screens · pixel-aligned to 실 앱</div>
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
          {/* ===== ARROWS removed by user request (2026-05-28) — 화살표 + ArrowLabel 전부 제거. 카드와 레인 레이블만 유지. ===== */}

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
