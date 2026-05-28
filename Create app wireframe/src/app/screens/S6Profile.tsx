import { useState } from "react";
import { useNavigate } from "react-router";
import { Home, Clock, MessageCircle, User, ChevronRight, LogOut } from "lucide-react";

const mockUser = {
  name: "홍길동",
  email: "user@example.com",
  totalLessons: 8,
  totalSpent: 350000,
};

const menuItems = [
  { id: 1, label: "내 정보 수정", route: "/edit-profile" },
  { id: 2, label: "결제 수단 관리", route: "/payment-methods" },
  { id: 3, label: "알림 설정", route: "/notification-settings" },
  { id: 4, label: "고객 지원", route: "/support" },
  { id: 5, label: "약관·정책", route: "/terms" },
];

export default function S6Profile() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    navigate("/");
  };

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-center px-5 bg-white border-b border-[#E5E6E8]">
        <span className="text-[16px] font-bold text-[#191919]">내 정보</span>
      </div>

      {/* Profile Section */}
      <div className="relative z-10 px-5 py-8 bg-white border-b border-[#E5E6E8]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#F5F6F7] flex items-center justify-center">
            <span className="text-[24px] font-bold text-[#4B4F54]">
              {mockUser.name[0]}
            </span>
          </div>
          <div>
            <div className="text-[20px] font-bold text-[#191919] mb-1">
              {mockUser.name}
            </div>
            <div className="text-[14px] text-[#76787A]">
              {mockUser.email}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F5F6F7] rounded-[16px] px-4 py-4 border border-[#E5E6E8]">
            <div className="text-[13px] text-[#76787A] mb-1">총 강습 횟수</div>
            <div className="text-[24px] font-bold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {mockUser.totalLessons}회
            </div>
          </div>
          <div className="bg-[#F5F6F7] rounded-[16px] px-4 py-4 border border-[#E5E6E8]">
            <div className="text-[13px] text-[#76787A] mb-1">총 결제 금액</div>
            <div className="text-[24px] font-bold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
              ₩{(mockUser.totalSpent / 10000).toFixed(0)}만
            </div>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-24">
        <div className="py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#F5F6F7] transition-colors border-b border-[#E5E6E8]"
            >
              <span className="text-[16px] font-semibold text-[#191919]">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-[#A2A4A6]" strokeWidth={2} />
            </button>
          ))}
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#F5F6F7] transition-colors"
          >
            <span className="text-[16px] font-semibold text-[#F5444C]">로그아웃</span>
            <LogOut className="w-5 h-5 text-[#F5444C]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 pt-4 pb-[34px] z-50">
        <div className="max-w-[393px] mx-auto flex items-center justify-around">
          <button onClick={() => navigate("/")} className="flex flex-col items-center gap-1.5 group opacity-50 hover:opacity-100 transition-opacity">
            <div className="p-2 rounded-[16px]">
              <Home className="w-5 h-5 text-[#76787A]" strokeWidth={2} />
            </div>
            <span className="text-[11px] text-[#76787A]">홈</span>
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
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="p-2 rounded-[16px] bg-[#2563EB] shadow-md">
              <User className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-[11px] font-bold text-[#191919]">내 정보</span>
          </button>
        </div>
      </div>

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-5 z-[100]">
          <div className="bg-white rounded-[20px] p-6 max-w-[320px] w-full shadow-xl border border-[#E5E6E8]">
            <div className="text-[18px] font-bold text-[#191919] mb-3">
              로그아웃하시겠어요?
            </div>
            <div className="text-[14px] text-[#76787A] leading-relaxed mb-6">
              다시 로그인하면 계속 이용할 수 있어요
            </div>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full h-[52px] bg-[#F5444C] rounded-[16px] text-[16px] font-bold text-white shadow-md active:scale-[0.98] transition-all"
              >
                로그아웃
              </button>
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="w-full h-[52px] bg-[#F5F6F7] rounded-[16px] text-[16px] font-bold text-[#4B4F54] active:scale-[0.98] transition-all"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
