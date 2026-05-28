import { MapPin, Bell, Zap, Calendar, Home, Clock, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router";

export default function C1Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative overflow-hidden">
      {/* Status Bar */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5">
        <button
          onClick={() => navigate("/location")}
          className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-[#E5E6E8] hover:bg-[#F5F6F7] transition-all"
        >
          <MapPin className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
          <span className="text-[14px] font-semibold text-[#191919]">지산리조트</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="text-[12px] font-bold text-[#2563EB] hover:text-[#1E40AF] transition-colors px-2 py-1"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-2.5 bg-white rounded-full shadow-sm border border-[#E5E6E8] hover:bg-[#F5F6F7] transition-all"
          >
            <Bell className="w-5 h-5 text-[#191919]" strokeWidth={2} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#F5444C] rounded-full ring-2 ring-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col px-5 pt-4 pb-[34px]">
        {/* Ongoing Match Indicator - Compact */}
        <button
          onClick={() => navigate("/confirmed")}
          className="mb-6 bg-[#F5F6F7] rounded-[16px] px-5 py-3 flex items-center justify-between border border-[#E5E6E8] hover:bg-[#EBECED] transition-colors"
        >
          <div>
            <div className="text-[12px] text-[#76787A] mb-1">진행 중인 강습</div>
            <div className="text-[15px] font-bold text-[#191919]">오늘 14:00 · 김OO 강사</div>
          </div>
        </button>

        {/* Instant Lesson - Primary Card (Larger) */}
        <button
          onClick={() => navigate("/request?mode=instant")}
          className="group mb-4 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-[20px] p-8 flex flex-col items-start text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
          style={{ minHeight: "270px" }}
        >
          {/* Subtle ski slope decoration */}
          <svg
            className="absolute bottom-0 right-0 opacity-10"
            width="120"
            height="80"
            viewBox="0 0 120 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 60 Q30 20, 60 40 T120 30"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          <div className="relative z-10 flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/15 backdrop-blur-sm rounded-[16px]">
              <Zap className="w-7 h-7 text-white" strokeWidth={2.5} fill="white" />
            </div>
            <div>
              <div className="text-[32px] font-bold text-white leading-none mb-2 tracking-tight">지금 강습</div>
              <div className="text-[15px] text-white/90">요청 즉시 강사 매칭</div>
            </div>
          </div>
        </button>

        {/* Reservation Lesson - Secondary Card */}
        <button
          onClick={() => navigate("/request?mode=reservation")}
          className="group bg-white rounded-[20px] p-6 flex flex-col items-start text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#E5E6E8] relative overflow-hidden"
          style={{ minHeight: "190px" }}
        >
          {/* Subtle calendar grid decoration */}
          <svg
            className="absolute bottom-0 right-0 opacity-[0.06]"
            width="100"
            height="70"
            viewBox="0 0 100 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="10" width="15" height="15" stroke="#2563EB" strokeWidth="1" />
            <rect x="30" y="10" width="15" height="15" stroke="#2563EB" strokeWidth="1" />
            <rect x="50" y="10" width="15" height="15" stroke="#2563EB" strokeWidth="1" />
            <rect x="70" y="10" width="15" height="15" stroke="#2563EB" strokeWidth="1" />
            <rect x="10" y="30" width="15" height="15" stroke="#2563EB" strokeWidth="1" />
            <rect x="30" y="30" width="15" height="15" stroke="#2563EB" strokeWidth="1" />
            <rect x="50" y="30" width="15" height="15" stroke="#2563EB" strokeWidth="1" />
            <rect x="70" y="30" width="15" height="15" stroke="#2563EB" strokeWidth="1" />
          </svg>

          <div className="relative z-10 flex items-center gap-3 mb-auto">
            <div className="p-2.5 bg-[#F5F6F7] rounded-[16px] border border-[#E5E6E8]">
              <Calendar className="w-6 h-6 text-[#2563EB]" strokeWidth={2} />
            </div>
            <div>
              <div className="text-[24px] font-bold text-[#191919] leading-none mb-1.5 tracking-tight">예약 강습</div>
              <div className="text-[14px] text-[#4B4F54]">원하는 시간에 강사 매칭</div>
            </div>
          </div>
        </button>

        {/* Season Info Strip */}
        <div className="mt-6 mb-6 bg-[#F5F6F7] rounded-[16px] px-5 py-4">
          <div className="text-[12px] font-semibold text-[#76787A] mb-1">이번 시즌</div>
          <div className="text-[15px] font-bold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
            12월 1일 ~ 3월 15일
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Navigation */}
        <div className="relative -mx-5 px-5 pt-4 bg-white border-t border-[#E5E6E8]">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1.5 group">
              <div className="p-2 rounded-[16px] bg-[#2563EB] shadow-md">
                <Home className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold text-[#191919]">홈</span>
            </button>
            <button onClick={() => navigate("/history")} className="flex flex-col items-center gap-1.5 group opacity-50 hover:opacity-100 transition-opacity">
              <div className="p-2 rounded-[16px]">
                <Clock className="w-5 h-5 text-[#76787A]" strokeWidth={2} />
              </div>
              <span className="text-[11px] text-[#76787A]">내역</span>
            </button>
            <button onClick={() => navigate("/messages")} className="flex flex-col items-center gap-1.5 group opacity-50 hover:opacity-100 transition-opacity">
              <div className="p-2 rounded-[16px]">
                <MessageCircle className="w-5 h-5 text-[#76787A]" strokeWidth={2} />
              </div>
              <span className="text-[11px] text-[#76787A]">메시지</span>
            </button>
            <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-1.5 group opacity-50 hover:opacity-100 transition-opacity">
              <div className="p-2 rounded-[16px]">
                <User className="w-5 h-5 text-[#76787A]" strokeWidth={2} />
              </div>
              <span className="text-[11px] text-[#76787A]">내 정보</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
