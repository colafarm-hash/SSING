import { useNavigate } from "react-router";
import { ChevronLeft, Bell, CheckCheck, MessageCircle, CreditCard, Calendar } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "match",
    icon: Bell,
    title: "강사와 매칭됐어요",
    body: "채팅에서 만나는 장소를 정해주세요",
    timestamp: "2024-01-15 14:30",
    unread: true,
    route: "/confirmed",
  },
  {
    id: 2,
    type: "message",
    icon: MessageCircle,
    title: "김OO 강사님이 메시지를 보냈어요",
    body: "메인 슬로프 입구 리프트 앞에서 만나요",
    timestamp: "2024-01-15 14:35",
    unread: true,
    route: "/chat/1",
  },
  {
    id: 3,
    type: "reminder",
    icon: Calendar,
    title: "강습이 1시간 후에 시작돼요",
    body: "오늘 14:00 · 김OO 강사 · 지산리조트",
    timestamp: "2024-01-15 13:00",
    unread: false,
    route: "/confirmed",
  },
  {
    id: 4,
    type: "payment",
    icon: CreditCard,
    title: "결제가 완료됐어요",
    body: "₩43,750원 · 카드",
    timestamp: "2024-01-15 12:30",
    unread: false,
    route: "/confirmed",
  },
];

const groupByRecency = (notifications: typeof mockNotifications) => {
  const now = new Date();
  const today: typeof mockNotifications = [];
  const thisWeek: typeof mockNotifications = [];
  const earlier: typeof mockNotifications = [];

  notifications.forEach((notif) => {
    const date = new Date(notif.timestamp);
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      today.push(notif);
    } else if (diffDays < 7) {
      thisWeek.push(notif);
    } else {
      earlier.push(notif);
    }
  });

  return { today, thisWeek, earlier };
};

export default function S3Notifications() {
  const navigate = useNavigate();
  const { today, thisWeek, earlier } = groupByRecency(mockNotifications);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  };

  const getIconColor = (type: string) => {
    if (type === "match") return "text-[#2563EB]";
    if (type === "message") return "text-[#2563EB]";
    if (type === "reminder") return "text-[#FF8A00]";
    if (type === "payment") return "text-[#0FB882]";
    return "text-[#76787A]";
  };

  const renderNotification = (notif: typeof mockNotifications[0]) => (
    <button
      key={notif.id}
      onClick={() => navigate(notif.route)}
      className={`w-full px-5 py-4 flex items-start gap-4 hover:bg-[#F5F6F7] transition-colors ${
        notif.unread ? "bg-[#F5F6F7]/50" : "bg-white"
      }`}
    >
      <div className="relative">
        <div className="p-2.5 bg-white rounded-[12px] border border-[#E5E6E8] shadow-sm">
          <notif.icon className={`w-5 h-5 ${getIconColor(notif.type)}`} strokeWidth={2} />
        </div>
        {notif.unread && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white" />
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-start justify-between mb-1">
          <div className={`text-[15px] ${notif.unread ? "font-bold" : "font-semibold"} text-[#191919]`}>
            {notif.title}
          </div>
          <span
            className="text-[12px] text-[#A2A4A6] ml-2"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {formatTimestamp(notif.timestamp)}
          </span>
        </div>
        <div className="text-[14px] text-[#76787A] line-clamp-2 leading-relaxed">
          {notif.body}
        </div>
      </div>
    </button>
  );

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">알림</span>
        <button className="text-[14px] text-[#2563EB] font-bold hover:text-[#1E40AF] transition-colors">
          모두 읽음
        </button>
      </div>

      {/* Notification List */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        {mockNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <Bell className="w-12 h-12 text-[#D1D3D5] mb-4" strokeWidth={1.5} />
            <div className="text-[16px] font-bold text-[#191919] mb-2">알림이 없어요</div>
            <div className="text-[14px] text-[#76787A] text-center">
              새로운 소식이 있으면 알려드릴게요
            </div>
          </div>
        ) : (
          <>
            {today.length > 0 && (
              <div className="pt-4">
                <div className="px-5 py-2 text-[13px] font-bold text-[#76787A]">오늘</div>
                {today.map(renderNotification)}
              </div>
            )}
            {thisWeek.length > 0 && (
              <div className="pt-4">
                <div className="px-5 py-2 text-[13px] font-bold text-[#76787A]">이번 주</div>
                {thisWeek.map(renderNotification)}
              </div>
            )}
            {earlier.length > 0 && (
              <div className="pt-4">
                <div className="px-5 py-2 text-[13px] font-bold text-[#76787A]">이전</div>
                {earlier.map(renderNotification)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
