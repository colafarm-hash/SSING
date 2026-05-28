import { useState, useRef } from 'react';
import {
  Home, Bell, MessageSquare, User, ChevronRight, Star,
  CheckCircle, Users, Clock, MapPin, Trash2, MessageCircle,
  FileText, Shield, LogOut, AlertCircle, CreditCard, X
} from 'lucide-react';

export default function App() {
  const [scale, setScale] = useState(0.4);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
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
    setScale(s => Math.min(2, Math.max(0.2, s + (e.deltaY > 0 ? -0.05 : 0.05))));
  };

  const resetView = () => {
    setScale(0.4);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="w-full h-screen bg-[#F5F6F7] overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E6E8] z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-[#191919]">SSING Wireflow</h1>
          <div className="text-sm text-[#76787A]">24 screens · 40+ connections</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#76787A]">Zoom: {Math.round(scale * 100)}%</div>
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
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            width: '5000px',
            height: '5000px',
            position: 'relative'
          }}
        >
          {/* SVG Layer for arrows */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: '5000px', height: '5000px' }}
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

            {/* Arrows - defined by coordinates */}
            {/* Auth & Entry */}
            <path d="M 260,550 Q 260,625 260,700" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />

            {/* Home navigation */}
            <path d="M 400,960 L 480,960" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />
            <path d="M 400,1000 L 480,1000" stroke="#191919" strokeWidth="2" fill="none" markerEnd="url(#arrow-black)" />

            {/* Instant 1:1 flow */}
            <path d="M 760,1660 L 840,1660" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />
            <path d="M 1120,1660 Q 1340,1660 1560,1660" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />

            {/* Group matching flow */}
            <path d="M 620,1960 L 480,2360" stroke="#FF8A00" strokeWidth="2" fill="none" markerEnd="url(#arrow-orange)" />
            <path d="M 760,2360 L 840,2360" stroke="#FF8A00" strokeWidth="2" fill="none" markerEnd="url(#arrow-orange)" />
            <path d="M 1120,2360 L 1200,2360" stroke="#FF8A00" strokeWidth="2" fill="none" markerEnd="url(#arrow-orange)" />
            <path d="M 1480,2360 Q 1520,2360 1560,2100 L 1560,1900" stroke="#FF8A00" strokeWidth="2" fill="none" markerEnd="url(#arrow-orange)" />

            {/* Reservation flow */}
            <path d="M 620,2000 L 480,3060" stroke="#191919" strokeWidth="2" fill="none" markerEnd="url(#arrow-black)" />
            <path d="M 760,3060 L 840,3060" stroke="#191919" strokeWidth="2" fill="none" markerEnd="url(#arrow-black)" />
            <path d="M 1120,3060 Q 1340,3060 1560,2100 L 1560,1900" stroke="#191919" strokeWidth="2" fill="none" markerEnd="url(#arrow-black)" />

            {/* Payment & Confirmation */}
            <path d="M 1840,1660 L 1920,1660" stroke="#0FB882" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />
            <path d="M 2200,1660 L 2280,1660" stroke="#0FB882" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />
            <path d="M 2060,1940 L 2060,2100 L 1920,2360" stroke="#0FB882" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />
            <path d="M 2200,1940 L 2200,2100 L 2280,2360" stroke="#0FB882" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />

            {/* Rating back to home */}
            <path d="M 2420,1660 Q 2600,1660 2600,400 L 400,400 L 400,700" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />

            {/* Bottom nav connections */}
            <path d="M 260,3780 L 260,1180" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />
            <path d="M 620,3780 L 260,1180" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />
            <path d="M 980,3780 L 260,1180" stroke="#76787A" strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-gray)" />

            {/* Modal triggers */}
            <path d="M 2200,1800 L 3200,2360" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="2,2" fill="none" markerEnd="url(#arrow-light-gray)" />
            <path d="M 2200,1860 L 3200,2800" stroke="#A2A4A6" strokeWidth="1.5" strokeDasharray="2,2" fill="none" markerEnd="url(#arrow-light-gray)" />
          </svg>

          {/* Lane Labels */}
          <div className="absolute" style={{ left: '20px', top: '0px' }}>
            <div className="text-sm font-bold text-[#76787A]">1. Auth</div>
          </div>
          <div className="absolute" style={{ left: '20px', top: '700px' }}>
            <div className="text-sm font-bold text-[#76787A]">2. Home & Entry</div>
          </div>
          <div className="absolute" style={{ left: '20px', top: '1400px' }}>
            <div className="text-sm font-bold text-[#76787A]">3. Instant 1:1</div>
          </div>
          <div className="absolute" style={{ left: '20px', top: '2100px' }}>
            <div className="text-sm font-bold text-[#76787A]">4. Instant Group</div>
          </div>
          <div className="absolute" style={{ left: '20px', top: '2800px' }}>
            <div className="text-sm font-bold text-[#76787A]">5. Reservation</div>
          </div>
          <div className="absolute" style={{ left: '20px', top: '3500px' }}>
            <div className="text-sm font-bold text-[#76787A]">Bottom Nav</div>
          </div>
          <div className="absolute" style={{ left: '20px', top: '4200px' }}>
            <div className="text-sm font-bold text-[#76787A]">Settings</div>
          </div>
          <div className="absolute" style={{ left: '3000px', top: '2100px' }}>
            <div className="text-sm font-bold text-[#76787A]">Modals</div>
          </div>

          {/* Legend */}
          <div className="absolute bg-white rounded-2xl border border-[#E5E6E8] p-6" style={{ left: '4500px', top: '100px', width: '320px' }}>
            <h3 className="font-bold text-[#191919] mb-4">Wireflow 범례</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 bg-[#2563EB]"></div>
                <span className="text-sm text-[#4B4F54]">즉시 매칭 흐름</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 bg-[#191919]"></div>
                <span className="text-sm text-[#4B4F54]">예약 매칭 흐름</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 bg-[#FF8A00]"></div>
                <span className="text-sm text-[#4B4F54]">그룹 매칭 흐름</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 bg-[#0FB882]"></div>
                <span className="text-sm text-[#4B4F54]">결제 완료 흐름</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 border-t-2 border-dashed border-[#76787A]"></div>
                <span className="text-sm text-[#4B4F54]">조건부 / 보조 이동</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 border-t-2 border-dotted border-[#A2A4A6]"></div>
                <span className="text-sm text-[#4B4F54]">모달 호출</span>
              </div>
            </div>
          </div>

          {/* LANE 1: Auth */}
          <ScreenCard x={120} y={0} id="O1" name="Login" path="/login">
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
              <div className="text-center">
                <div className="text-xl font-bold text-[#191919] mb-1">SSING</div>
                <div className="text-xs text-[#76787A]">스키 · 보드 강습 매칭</div>
              </div>
              <div className="w-full space-y-3">
                <button className="w-full h-12 bg-[#FEE500] rounded-xl text-sm font-semibold text-[#191919]">
                  카카오로 시작하기
                </button>
                <button className="w-full h-12 bg-[#191919] rounded-xl text-sm font-semibold text-white">
                  Apple로 시작하기
                </button>
              </div>
              <div className="text-[10px] text-[#A2A4A6]">회원가입 시 이용약관 동의</div>
            </div>
          </ScreenCard>

          {/* LANE 2: Home & Entry */}
          <ScreenCard x={120} y={700} id="C1" name="Home" path="/">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E6E8]">
                <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs text-[#191919]">지산리조트</div>
                <Bell size={18} className="text-[#191919]" />
              </div>
              <div className="flex-1 p-4 space-y-3">
                <div className="px-4 py-2.5 bg-[#F5F6F7] rounded-lg text-xs text-[#4B4F54]">
                  오늘 14:00 · 김OO 강사
                </div>
                <div className="p-5 bg-[#2563EB] rounded-2xl text-white">
                  <div className="font-bold mb-1">지금 강습</div>
                  <div className="text-xs opacity-90">요청 즉시 강사 매칭</div>
                </div>
                <div className="p-5 bg-white border border-[#E5E6E8] rounded-2xl">
                  <div className="font-semibold text-[#191919] mb-1">예약 강습</div>
                  <div className="text-xs text-[#76787A]">원하는 시간에 강사 매칭</div>
                </div>
              </div>
              <BottomNav active="홈" />
            </div>
          </ScreenCard>

          <ScreenCard x={480} y={700} id="C2" name="Request Input" path="/request">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">즉시 강습</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-[#191919] mb-2">종목</div>
                  <div className="flex gap-2">
                    <div className="px-4 py-2 bg-[#2563EB] text-white rounded-full text-xs font-semibold">스키</div>
                    <div className="px-4 py-2 bg-[#F5F6F7] text-[#191919] rounded-full text-xs">보드</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#191919] mb-2">레벨</div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">입문</div>
                    <div className="px-3 py-1.5 bg-[#2563EB] text-white rounded-full text-xs">초급</div>
                    <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">상급</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#191919] mb-2">시간</div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">2시간</div>
                    <div className="px-3 py-1.5 bg-[#2563EB] text-white rounded-full text-xs">3시간</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-[#E5E6E8]">
                  <div className="text-xs font-semibold text-[#191919]">함께 듣기</div>
                  <div className="w-10 h-6 bg-[#2563EB] rounded-full"></div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E6E8]">
                <button className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-semibold">강사 매칭 시작</button>
              </div>
            </div>
          </ScreenCard>

          {/* LANE 3: Instant 1:1 */}
          <ScreenCard x={480} y={1400} id="C3" name="Instructor Pool" path="/instructors">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E6E8]">
                <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">강사 12명</div>
              </div>
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 bg-[#2563EB] text-white rounded-full text-xs">추천순</div>
                  <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">평점순</div>
                  <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">가격순</div>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                <InstructorCard name="김OO" grade="골드" rating="4.9" price="₩70,000" />
                <InstructorCard name="이OO" grade="실버" rating="4.8" price="₩65,000" />
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={840} y={1400} id="C4" name="Instructor Profile" path="/instructor/:id">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">강사 프로필</div>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="p-4 text-center border-b border-[#E5E6E8]">
                  <div className="w-16 h-16 mx-auto mb-2 bg-[#F5F6F7] rounded-full"></div>
                  <div className="font-bold text-[#191919]">김OO 강사</div>
                  <div className="inline-block px-2 py-0.5 bg-[#FFD700] rounded text-xs mt-1">골드</div>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                  <div className="p-3 bg-[#F5F6F7] rounded-lg text-center">
                    <div className="text-xs text-[#76787A]">평점</div>
                    <div className="font-bold text-[#191919]">4.9</div>
                  </div>
                  <div className="p-3 bg-[#F5F6F7] rounded-lg text-center">
                    <div className="text-xs text-[#76787A]">재예약</div>
                    <div className="font-bold text-[#191919]">89%</div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="p-4 bg-[#F5F6F7] rounded-lg">
                    <div className="text-xs font-semibold mb-1">₩70,000원</div>
                    <div className="text-[10px] text-[#76787A]">3시간 기준</div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E6E8]">
                <button className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-semibold">매칭 시작</button>
              </div>
            </div>
          </ScreenCard>

          {/* LANE 4: Group Matching */}
          <ScreenCard x={480} y={2100} id="GM-A" name="Group Matching A" path="/group-matching?phase=matching">
            <div className="flex flex-col items-center justify-center h-full px-6">
              <div className="w-20 h-20 mb-6 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
              <Users size={32} className="text-[#2563EB] mb-4" />
              <div className="text-base font-bold text-[#191919] mb-2 text-center">비슷한 분들을 찾고 있어요</div>
              <div className="text-xs text-[#76787A] text-center mb-6">곧 매칭될 거예요</div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={840} y={2100} id="GM-B" name="Group Matching B" path="/group-matching?phase=confirmed">
            <div className="flex flex-col items-center justify-center h-full px-6">
              <CheckCircle size={48} className="text-[#0FB882] mb-4" />
              <div className="text-xl font-bold text-[#191919] mb-2">3명이 매칭됐어요</div>
              <div className="flex gap-2 my-6">
                <div className="px-3 py-1.5 bg-[#EBF2FF] text-[#2563EB] rounded-full text-xs font-semibold">본인</div>
                <div className="px-3 py-1.5 bg-[#F5F6F7] text-[#4B4F54] rounded-full text-xs">28세 · 남</div>
                <div className="px-3 py-1.5 bg-[#F5F6F7] text-[#4B4F54] rounded-full text-xs">31세 · 여</div>
              </div>
              <div className="text-sm text-[#76787A] text-center">강사를 함께 골라볼게요</div>
            </div>
          </ScreenCard>

          <ScreenCard x={1200} y={2100} id="GM-C" name="Group Matching C" path="/group-matching?phase=voting">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">강사 투표</div>
                <div className="px-2.5 py-1 bg-[#FEE500] rounded-full text-xs font-semibold">2:47 남음</div>
              </div>
              <div className="px-4 py-2 bg-[#FFF3CD] border-b border-[#FFE69C]">
                <div className="text-xs text-[#856404]">3명 중 2명이 투표했어요</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                <div className="p-3 border border-[#E5E6E8] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-sm text-[#191919]">김OO 강사</div>
                    <div className="text-xs text-[#76787A]">2표</div>
                  </div>
                  <button className="w-full py-2 bg-[#2563EB] text-white rounded-lg text-xs font-semibold">투표하기</button>
                </div>
                <div className="p-3 border border-[#E5E6E8] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-sm text-[#191919]">이OO 강사</div>
                    <div className="text-xs text-[#76787A]">0표</div>
                  </div>
                  <button className="w-full py-2 bg-white border border-[#E5E6E8] text-[#191919] rounded-lg text-xs font-semibold">투표하기</button>
                </div>
              </div>
            </div>
          </ScreenCard>

          {/* LANE 5: Reservation */}
          <ScreenCard x={480} y={2800} id="C5" name="Room List" path="/rooms">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E6E8]">
                <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">방 8개</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                <div className="p-4 border border-[#E5E6E8] rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-[#191919]">김OO 강사</div>
                    <div className="px-2 py-0.5 bg-[#FFD700] rounded text-[10px]">골드</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#76787A] mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>14:00</span>
                    </div>
                    <div>3/4명</div>
                  </div>
                  <div className="text-base font-bold text-[#191919]">₩52,500원</div>
                </div>
                <div className="p-4 border border-[#E5E6E8] rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-[#191919]">박OO 강사</div>
                    <div className="px-2 py-0.5 bg-[#C0C0C0] rounded text-[10px]">실버</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#76787A] mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>15:00</span>
                    </div>
                    <div>1/4명</div>
                  </div>
                  <div className="text-base font-bold text-[#191919]">₩48,000원</div>
                </div>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={840} y={2800} id="C6" name="Room Detail" path="/room/:id">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">방 상세</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                <div className="p-4 bg-[#F5F6F7] rounded-xl">
                  <div className="font-semibold text-[#191919] mb-1">김OO 강사</div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-[#FFD700] rounded text-[10px]">골드</div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star size={12} className="fill-[#FFD700] text-[#FFD700]" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#76787A]">시작 시간</span>
                    <span className="text-[#191919] font-semibold">14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#76787A]">강습 시간</span>
                    <span className="text-[#191919] font-semibold">3시간</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#76787A]">현재 인원</span>
                    <span className="text-[#191919] font-semibold">3/4명</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#76787A] mb-2">참여 중인 분들</div>
                  <div className="space-y-1.5">
                    <div className="text-xs text-[#4B4F54]">28세 · 남</div>
                    <div className="text-xs text-[#4B4F54]">31세 · 여</div>
                    <div className="text-xs text-[#4B4F54]">25세 · 남</div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E6E8]">
                <button className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-semibold">입장하기</button>
              </div>
            </div>
          </ScreenCard>

          {/* LANE 6: Payment & Confirmation */}
          <ScreenCard x={1560} y={1400} id="C7" name="Payment" path="/payment">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">결제</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                <div className="p-3 bg-[#F5F6F7] rounded-lg">
                  <div className="text-xs text-[#76787A] mb-1">강사</div>
                  <div className="font-semibold text-[#191919]">김OO 강사</div>
                </div>
                <div className="space-y-2 text-xs border-t border-[#E5E6E8] pt-4">
                  <div className="flex justify-between">
                    <span className="text-[#76787A]">1:1 기준가</span>
                    <span className="text-[#191919]">₩70,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#76787A]">인원 분담</span>
                    <span className="text-[#0FB882]">-₩26,250원</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E5E6E8]">
                    <span className="font-semibold text-[#191919]">1인 부담</span>
                    <span className="text-lg font-bold text-[#191919]">₩43,750원</span>
                  </div>
                </div>
                <div className="border-t border-[#E5E6E8] pt-4">
                  <div className="text-xs text-[#76787A] mb-2">결제 수단</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 border-2 border-[#2563EB] rounded-lg">
                      <div className="w-4 h-4 border-2 border-[#2563EB] rounded-full bg-[#2563EB]"></div>
                      <span className="text-xs text-[#191919]">카드</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 border border-[#E5E6E8] rounded-lg">
                      <div className="w-4 h-4 border-2 border-[#E5E6E8] rounded-full"></div>
                      <span className="text-xs text-[#76787A]">카카오페이</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E6E8]">
                <button className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-bold">₩43,750원 결제하기</button>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={1920} y={1400} id="C8" name="Match Confirmed" path="/confirmed">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">매칭 확정</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                <div className="text-center py-6">
                  <CheckCircle size={32} className="text-[#0FB882] mx-auto mb-3" />
                  <div className="text-lg font-bold text-[#191919]">매칭 완료</div>
                </div>
                <div className="p-4 bg-[#F5F6F7] rounded-xl">
                  <div className="font-semibold text-[#191919] mb-2">김OO 강사</div>
                  <button className="w-full py-2.5 bg-[#2563EB] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                    <MessageCircle size={16} />
                    강사와 채팅하기
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#76787A]">강습 시작</span>
                    <span className="text-[#191919]">오늘 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#76787A]">결제 금액</span>
                    <span className="text-[#191919] font-semibold">₩43,750원</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-[#F5F6F7] text-[#4B4F54] rounded-lg text-sm font-semibold">
                  강습 완료 · 평가하기
                </button>
                <div className="text-center">
                  <button className="text-xs text-[#76787A] underline">강습 취소</button>
                </div>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={2280} y={1400} id="C9" name="Post-Lesson Rating" path="/rating">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">강습 평가</div>
                <button className="text-sm text-[#76787A]">나중에</button>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#191919] mb-4">강습은 어떠셨어요?</div>
                  <div className="flex justify-center gap-2 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={32} className="fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>
                  <div className="text-sm text-[#0FB882] font-semibold">최고예요</div>
                </div>
                <div>
                  <textarea
                    className="w-full h-24 p-3 border border-[#E5E6E8] rounded-lg text-xs resize-none"
                    placeholder="강습 후기를 작성해주세요 (선택)"
                  />
                </div>
                <div className="p-4 bg-[#F5F6F7] rounded-xl">
                  <div className="text-xs text-[#76787A] mb-2">다음에도 이 강사와 강습하시겠어요?</div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-semibold">네, 좋아요</button>
                    <button className="flex-1 py-2 bg-white border border-[#E5E6E8] text-[#191919] rounded-lg text-xs">아니요</button>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E6E8]">
                <button className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-semibold">평가 제출</button>
              </div>
            </div>
          </ScreenCard>

          {/* Post-lesson screens */}
          <ScreenCard x={1920} y={2100} id="S1" name="Chat" path="/chat/:matchId">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E6E8]">
                <div className="font-bold text-[#191919]">김OO 강사</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                <div className="text-center">
                  <div className="inline-block px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs text-[#76787A]">
                    매칭이 확정됐어요
                  </div>
                </div>
                <div className="flex">
                  <div className="max-w-[70%] p-3 bg-[#F5F6F7] rounded-2xl rounded-tl-none text-sm text-[#191919]">
                    안녕하세요! 14시에 뵙겠습니다
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[70%] p-3 bg-[#2563EB] text-white rounded-2xl rounded-tr-none text-sm">
                    네, 감사합니다!
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E6E8]">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="메시지 입력"
                    className="flex-1 px-4 py-2 bg-[#F5F6F7] rounded-full text-sm"
                  />
                  <button className="w-8 h-8 flex items-center justify-center bg-[#2563EB] rounded-full">
                    <MessageCircle size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={2280} y={2100} id="S9" name="Report" path="/report/:matchId">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">강사 신고</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-[#191919] mb-3">신고 사유</div>
                  <div className="space-y-2">
                    {['불친절한 태도', '무단 지각/결석', '부적절한 행동', '강습 불성실', '기타'].map((reason, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 border border-[#E5E6E8] rounded-lg">
                        <div className={`w-4 h-4 border-2 rounded-full ${i === 0 ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#E5E6E8]'}`}></div>
                        <span className="text-xs text-[#191919]">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#191919] mb-2">상세 내용</div>
                  <textarea
                    className="w-full h-20 p-3 border border-[#E5E6E8] rounded-lg text-xs resize-none"
                    placeholder="상세한 내용을 작성해주세요"
                  />
                </div>
                <div className="p-3 bg-[#F5F6F7] rounded-lg">
                  <div className="text-[10px] text-[#76787A]">매칭 ID: #M123456</div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E6E8]">
                <button className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-semibold">신고 제출</button>
              </div>
            </div>
          </ScreenCard>

          {/* Bottom Nav destinations */}
          <ScreenCard x={120} y={3500} id="S4" name="History" path="/history">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8] text-center">
                <div className="font-bold text-[#191919]">강습 내역</div>
              </div>
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 bg-[#2563EB] text-white rounded-full text-xs">진행 중</div>
                  <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">완료</div>
                  <div className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-xs">취소</div>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                <div className="p-4 border border-[#E5E6E8] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-[#191919]">김OO 강사</div>
                    <div className="px-2 py-0.5 bg-[#EBF2FF] text-[#2563EB] rounded text-[10px] font-semibold">진행 중</div>
                  </div>
                  <div className="text-xs text-[#76787A]">2026.05.28 14:00</div>
                </div>
                <div className="p-4 border border-[#E5E6E8] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-[#191919]">이OO 강사</div>
                    <div className="px-2 py-0.5 bg-[#F5F6F7] text-[#76787A] rounded text-[10px]">완료</div>
                  </div>
                  <div className="text-xs text-[#76787A]">2026.05.20 10:00</div>
                </div>
              </div>
              <BottomNav active="내역" />
            </div>
          </ScreenCard>

          <ScreenCard x={480} y={3500} id="S5" name="Messages" path="/messages">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8] text-center">
                <div className="font-bold text-[#191919]">메시지</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 border border-[#E5E6E8] rounded-xl">
                  <div className="w-12 h-12 bg-[#F5F6F7] rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-semibold text-[#191919]">김OO 강사</div>
                      <div className="px-1.5 py-0.5 bg-[#FFD700] rounded text-[9px]">골드</div>
                    </div>
                    <div className="text-xs text-[#76787A]">14시에 뵙겠습니다</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#A2A4A6] mb-1">10:24</div>
                    <div className="w-5 h-5 bg-[#2563EB] text-white rounded-full text-[10px] flex items-center justify-center">1</div>
                  </div>
                </div>
              </div>
              <BottomNav active="메시지" />
            </div>
          </ScreenCard>

          <ScreenCard x={840} y={3500} id="S6" name="Profile" path="/profile">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8] text-center">
                <div className="font-bold text-[#191919]">내 정보</div>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="p-6 border-b border-[#E5E6E8]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#F5F6F7] rounded-full"></div>
                    <div>
                      <div className="font-bold text-[#191919] mb-1">홍길동</div>
                      <div className="text-xs text-[#76787A]">hong@example.com</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[#F5F6F7] rounded-lg text-center">
                      <div className="text-xs text-[#76787A]">총 강습</div>
                      <div className="font-bold text-[#191919]">12회</div>
                    </div>
                    <div className="p-3 bg-[#F5F6F7] rounded-lg text-center">
                      <div className="text-xs text-[#76787A]">총 결제</div>
                      <div className="font-bold text-[#191919]">₩520K</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  {['내 정보 수정', '결제 수단', '알림 설정', '고객 지원', '약관·정책'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-2">
                      <span className="text-sm text-[#191919]">{item}</span>
                      <ChevronRight size={16} className="text-[#A2A4A6]" />
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-3 px-2 border-t border-[#E5E6E8] mt-3">
                    <span className="text-sm text-[#DC2626]">로그아웃</span>
                    <LogOut size={16} className="text-[#DC2626]" />
                  </div>
                </div>
              </div>
              <BottomNav active="내정보" />
            </div>
          </ScreenCard>

          <ScreenCard x={1200} y={3500} id="S2" name="Location Picker" path="/location">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">스키장 선택</div>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="p-4 space-y-1">
                  {[
                    { name: '지산리조트', current: true },
                    { name: '비발디파크', current: false },
                    { name: '곤지암리조트', current: false },
                    { name: '엘리시안강촌', current: false }
                  ].map((resort, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-2">
                      <span className="text-sm text-[#191919]">{resort.name}</span>
                      {resort.current && <CheckCircle size={16} className="text-[#2563EB]" />}
                    </div>
                  ))}
                  <div className="border-t border-[#E5E6E8] mt-4 pt-4">
                    <div className="text-xs text-[#A2A4A6] px-2">지원 예정</div>
                    <div className="mt-2 space-y-1">
                      {['하이원', '휘닉스파크'].map((resort, i) => (
                        <div key={i} className="py-3 px-2">
                          <span className="text-sm text-[#A2A4A6]">{resort}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={1560} y={3500} id="S3" name="Notifications" path="/notifications">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">알림</div>
                <button className="text-sm text-[#2563EB]">모두 읽음</button>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="px-4 py-2 bg-[#F5F6F7]">
                  <div className="text-xs text-[#76787A]">오늘</div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 mt-1 bg-[#2563EB] rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm text-[#191919] mb-1">매칭이 확정됐어요</div>
                      <div className="text-xs text-[#76787A]">김OO 강사와 강습이 확정됐습니다</div>
                      <div className="text-[10px] text-[#A2A4A6] mt-1">10:24</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 ml-5">
                      <div className="text-sm text-[#76787A] mb-1">새 메시지가 도착했어요</div>
                      <div className="text-xs text-[#A2A4A6]">14시에 뵙겠습니다</div>
                      <div className="text-[10px] text-[#A2A4A6] mt-1">09:15</div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-[#F5F6F7]">
                  <div className="text-xs text-[#76787A]">이번 주</div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-1 ml-5">
                      <div className="text-sm text-[#76787A] mb-1">강습이 완료됐어요</div>
                      <div className="text-xs text-[#A2A4A6]">평가를 남겨주세요</div>
                      <div className="text-[10px] text-[#A2A4A6] mt-1">5월 20일</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScreenCard>

          {/* Settings sub-screens */}
          <ScreenCard x={120} y={4200} id="EditProfile" name="Edit Profile" path="/edit-profile">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">내 정보 수정</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-2 bg-[#F5F6F7] rounded-full"></div>
                  <button className="text-sm text-[#2563EB]">사진 변경</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#76787A] mb-2 block">이름</label>
                    <input
                      type="text"
                      value="홍길동"
                      className="w-full px-4 py-3 border border-[#E5E6E8] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#76787A] mb-2 block">이메일</label>
                    <input
                      type="email"
                      value="hong@example.com"
                      disabled
                      className="w-full px-4 py-3 border border-[#E5E6E8] rounded-lg text-sm bg-[#F5F6F7] text-[#A2A4A6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#76787A] mb-2 block">전화번호</label>
                    <input
                      type="tel"
                      value="010-1234-5678"
                      className="w-full px-4 py-3 border border-[#E5E6E8] rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-[#E5E6E8]">
                <button className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-semibold">저장</button>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={480} y={4200} id="PaymentMethods" name="Payment Methods" path="/payment-methods">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">결제 수단 관리</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                <div className="flex items-center justify-between p-4 border border-[#E5E6E8] rounded-xl">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-[#191919]" />
                    <div>
                      <div className="text-sm font-semibold text-[#191919]">신한카드</div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-[#76787A]">****-****-****-1234</div>
                        <div className="px-1.5 py-0.5 bg-[#2563EB] text-white rounded text-[9px]">기본</div>
                      </div>
                    </div>
                  </div>
                  <button>
                    <Trash2 size={16} className="text-[#76787A]" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-[#E5E6E8] rounded-xl">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-[#191919]" />
                    <div>
                      <div className="text-sm font-semibold text-[#191919]">카카오페이</div>
                      <div className="text-xs text-[#76787A]">hong@example.com</div>
                    </div>
                  </div>
                  <button>
                    <Trash2 size={16} className="text-[#76787A]" />
                  </button>
                </div>
                <button className="w-full py-4 border-2 border-dashed border-[#E5E6E8] rounded-xl text-sm text-[#76787A]">
                  + 결제 수단 추가
                </button>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={840} y={4200} id="NotificationSettings" name="Notification Settings" path="/notification-settings">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">알림 설정</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-6">
                <div>
                  <div className="text-sm font-semibold text-[#191919] mb-3">알림 종류</div>
                  <div className="space-y-3">
                    {[
                      { label: '매칭 알림', enabled: true },
                      { label: '메시지 알림', enabled: true },
                      { label: '강습 시작 알림', enabled: true },
                      { label: '마케팅 알림', enabled: false }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <span className="text-sm text-[#191919]">{item.label}</span>
                        <div className={`w-11 h-6 rounded-full ${item.enabled ? 'bg-[#2563EB]' : 'bg-[#E5E6E8]'}`}>
                          <div className={`w-5 h-5 mt-0.5 bg-white rounded-full transition-transform ${item.enabled ? 'ml-5' : 'ml-0.5'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#191919] mb-3">알림 채널</div>
                  <div className="space-y-3">
                    {[
                      { label: '푸시 알림', enabled: true },
                      { label: '이메일 알림', enabled: false },
                      { label: 'SMS 알림', enabled: false }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <span className="text-sm text-[#191919]">{item.label}</span>
                        <div className={`w-11 h-6 rounded-full ${item.enabled ? 'bg-[#2563EB]' : 'bg-[#E5E6E8]'}`}>
                          <div className={`w-5 h-5 mt-0.5 bg-white rounded-full transition-transform ${item.enabled ? 'ml-5' : 'ml-0.5'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={1200} y={4200} id="Support" name="Support" path="/support">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">고객 지원</div>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-6">
                <div>
                  <div className="text-sm font-semibold text-[#191919] mb-3">자주 묻는 질문</div>
                  <div className="space-y-2">
                    {['강습 취소는 어떻게 하나요?', '환불 정책이 궁금해요', '강사 변경이 가능한가요?'].map((q, i) => (
                      <div key={i} className="flex items-center justify-between py-3 px-4 border border-[#E5E6E8] rounded-lg">
                        <span className="text-sm text-[#191919]">{q}</span>
                        <ChevronRight size={16} className="text-[#A2A4A6]" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#191919] mb-3">1:1 문의</div>
                  <button className="w-full py-4 bg-[#F5F6F7] rounded-xl flex items-center justify-center gap-2">
                    <MessageSquare size={18} className="text-[#191919]" />
                    <span className="text-sm font-semibold text-[#191919]">문의하기</span>
                  </button>
                </div>
              </div>
            </div>
          </ScreenCard>

          <ScreenCard x={1560} y={4200} id="Terms" name="Terms" path="/terms">
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">약관·정책</div>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="p-4 space-y-1">
                  {[
                    '이용약관',
                    '개인정보 처리방침',
                    '위치기반 서비스 이용약관',
                    '환불 정책',
                    '커뮤니티 가이드라인',
                    '오픈소스 라이선스'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-2">
                      <span className="text-sm text-[#191919]">{item}</span>
                      <ChevronRight size={16} className="text-[#A2A4A6]" />
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 border-t border-[#E5E6E8]">
                  <div className="text-[10px] text-[#A2A4A6] text-center">
                    (주)SSING · 사업자등록번호 123-45-67890
                    <br />
                    대표이사 홍길동 · 서울특별시 강남구
                  </div>
                </div>
              </div>
            </div>
          </ScreenCard>

          {/* NotFound */}
          <ScreenCard x={1920} y={4200} id="404" name="Not Found" path="*">
            <div className="flex flex-col items-center justify-center h-full px-6">
              <div className="text-6xl font-bold text-[#E5E6E8] mb-4">404</div>
              <div className="text-lg font-bold text-[#191919] mb-2">페이지를 찾을 수 없어요</div>
              <div className="text-sm text-[#76787A] mb-6 text-center">요청하신 페이지가 존재하지 않습니다</div>
              <button className="px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold">홈으로</button>
            </div>
          </ScreenCard>

          {/* Modals */}
          <ModalCard x={3200} y={2100} id="Receipt" name="Receipt Modal">
            <div className="flex flex-col h-full">
              <div className="h-1 w-12 mx-auto mt-2 mb-4 bg-[#E5E6E8] rounded-full"></div>
              <div className="px-6 py-4 border-b border-[#E5E6E8]">
                <div className="text-base font-bold text-[#191919]">결제 상세</div>
              </div>
              <div className="flex-1 overflow-auto p-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#76787A]">1:1 기준가</span>
                  <span className="text-[#191919]">₩70,000원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#76787A]">인원 분담</span>
                  <span className="text-[#0FB882]">-₩26,250원</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#E5E6E8]">
                  <span className="font-semibold text-[#191919]">1인 부담</span>
                  <span className="text-lg font-bold text-[#191919]">₩43,750원</span>
                </div>
                <div className="h-px bg-[#E5E6E8] my-4"></div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#76787A]">결제 수단</span>
                  <span className="text-[#191919]">신한카드 ****-1234</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#76787A]">결제 일시</span>
                  <span className="text-[#191919]">2026.05.28 10:24</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#76787A]">매칭 ID</span>
                  <span className="text-[#191919]">#M123456</span>
                </div>
              </div>
              <div className="p-6 border-t border-[#E5E6E8]">
                <button className="w-full h-12 bg-[#191919] text-white rounded-xl font-semibold">닫기</button>
              </div>
            </div>
          </ModalCard>

          <ModalCard x={3200} y={2550} id="Cancel" name="Cancel Dialog">
            <div className="flex flex-col items-center justify-center h-full px-6">
              <AlertCircle size={48} className="text-[#DC2626] mb-4" />
              <div className="text-xl font-bold text-[#191919] mb-2">강습을 취소하시겠어요?</div>
              <div className="text-sm text-[#76787A] text-center mb-6">
                강습 시작 24시간 전까지는 전액 환불됩니다.
                <br />
                이후 취소 시 50% 환불됩니다.
              </div>
              <div className="w-full space-y-2">
                <button className="w-full py-3 bg-[#DC2626] text-white rounded-xl font-semibold">강습 취소하기</button>
                <button className="w-full py-3 bg-[#F5F6F7] text-[#191919] rounded-xl font-semibold">돌아가기</button>
              </div>
            </div>
          </ModalCard>

          <ModalCard x={3200} y={3000} id="AlertSubscribe" name="Alert Subscribe Modal">
            <div className="flex flex-col h-full">
              <div className="h-1 w-12 mx-auto mt-2 mb-4 bg-[#E5E6E8] rounded-full"></div>
              <div className="flex-1 p-6">
                <Bell size={32} className="text-[#2563EB] mb-4" />
                <div className="text-lg font-bold text-[#191919] mb-2">강사 등장 알림 받기</div>
                <div className="text-sm text-[#76787A] mb-6">
                  조건에 맞는 강사가 나타나면
                  <br />
                  바로 알려드릴게요
                </div>
              </div>
              <div className="p-6 border-t border-[#E5E6E8] space-y-2">
                <button className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-semibold">알림 받기</button>
                <button className="w-full py-3 bg-[#F5F6F7] text-[#191919] rounded-xl font-semibold">취소</button>
              </div>
            </div>
          </ModalCard>

          <ModalCard x={3200} y={3450} id="Logout" name="Logout Dialog">
            <div className="flex flex-col items-center justify-center h-full px-6">
              <LogOut size={48} className="text-[#76787A] mb-4" />
              <div className="text-xl font-bold text-[#191919] mb-6">로그아웃하시겠어요?</div>
              <div className="w-full space-y-2">
                <button className="w-full py-3 bg-[#DC2626] text-white rounded-xl font-semibold">로그아웃</button>
                <button className="w-full py-3 bg-[#F5F6F7] text-[#191919] rounded-xl font-semibold">취소</button>
              </div>
            </div>
          </ModalCard>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function ScreenCard({ x, y, id, name, path, children }: {
  x: number;
  y: number;
  id: string;
  name: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute" style={{ left: `${x}px`, top: `${y}px`, width: '280px' }}>
      <div className="text-xs font-bold text-[#191919] mb-2">{id} · {name}</div>
      <div className="w-[280px] h-[560px] bg-white rounded-[24px] border border-[#E5E6E8] overflow-hidden shadow-sm">
        {children}
      </div>
      <div className="text-[10px] text-[#76787A] mt-1.5">{path}</div>
    </div>
  );
}

function ModalCard({ x, y, id, name, children }: {
  x: number;
  y: number;
  id: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute" style={{ left: `${x}px`, top: `${y}px`, width: '240px' }}>
      <div className="text-xs font-bold text-[#191919] mb-2">{id} · {name}</div>
      <div className="w-[240px] h-[400px] bg-white rounded-[24px] border border-[#E5E6E8] overflow-hidden shadow-lg">
        {children}
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: string }) {
  const items = [
    { label: '홈', icon: Home },
    { label: '내역', icon: FileText },
    { label: '메시지', icon: MessageSquare },
    { label: '내정보', icon: User }
  ];

  return (
    <div className="flex items-center justify-around h-16 border-t border-[#E5E6E8] bg-white">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <item.icon size={20} className={active === item.label ? 'text-[#2563EB]' : 'text-[#A2A4A6]'} />
          <span className={`text-[10px] ${active === item.label ? 'text-[#2563EB] font-semibold' : 'text-[#A2A4A6]'}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function InstructorCard({ name, grade, rating, price }: {
  name: string;
  grade: string;
  rating: string;
  price: string;
}) {
  const gradeColor = grade === '골드' ? '#FFD700' : '#C0C0C0';

  return (
    <div className="flex items-center gap-3 p-3 border border-[#E5E6E8] rounded-xl">
      <div className="w-12 h-12 bg-[#F5F6F7] rounded-full"></div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="font-semibold text-[#191919]">{name}</div>
          <div className="px-2 py-0.5 rounded text-[10px]" style={{ backgroundColor: gradeColor }}>
            {grade}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-[#FFD700] text-[#FFD700]" />
            <span>{rating}</span>
          </div>
          <span className="text-[#76787A]">·</span>
          <span className="font-semibold text-[#191919]">{price}원</span>
        </div>
      </div>
    </div>
  );
}