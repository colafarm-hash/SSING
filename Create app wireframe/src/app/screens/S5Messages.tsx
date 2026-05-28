import { useNavigate } from "react-router";
import { Home, Clock, MessageCircle, User } from "lucide-react";

const mockThreads = [
  {
    id: 1,
    instructor: { name: "김OO", grade: 5 },
    lastMessage: "메인 슬로프 입구 리프트 앞에서 만나요",
    timestamp: "2024-01-15 14:35",
    unread: 2,
  },
  {
    id: 2,
    instructor: { name: "이OO", grade: 4 },
    lastMessage: "강습 잘 받으셨어요?",
    timestamp: "2024-01-10 16:20",
    unread: 0,
  },
  {
    id: 3,
    instructor: { name: "박OO", grade: 5 },
    lastMessage: "오후 2시에 메인 슬로프 입구에서 만나요",
    timestamp: "2024-01-05 13:45",
    unread: 0,
  },
];

export default function S5Messages() {
  const navigate = useNavigate();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    } else if (days === 1) {
      return "어제";
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-center px-5 bg-white border-b border-[#E5E6E8]">
        <span className="text-[16px] font-bold text-[#191919]">메시지</span>
      </div>

      {/* Thread List */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-24">
        {mockThreads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <MessageCircle className="w-12 h-12 text-[#D1D3D5] mb-4" strokeWidth={1.5} />
            <div className="text-[16px] font-bold text-[#191919] mb-2 text-center">
              아직 채팅이 없어요
            </div>
            <div className="text-[14px] text-[#76787A] text-center leading-relaxed">
              매칭이 확정되면 강사와 채팅을 시작할 수 있어요
            </div>
          </div>
        ) : (
          mockThreads.map((thread, index) => (
            <button
              key={thread.id}
              onClick={() => navigate(`/chat/${thread.id}`)}
              className="w-full px-5 py-4 flex items-center gap-4 hover:bg-[#F5F6F7] transition-colors border-b border-[#E5E6E8]"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#F5F6F7] flex items-center justify-center">
                  <span className="text-[16px] font-bold text-[#4B4F54]">
                    {thread.instructor.name[0]}
                  </span>
                </div>
                {thread.unread > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-[#2563EB] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-[11px] font-bold text-white">{thread.unread}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-[#191919]">
                      {thread.instructor.name}
                    </span>
                    <div className="px-2 py-0.5 bg-[#2563EB] rounded-lg shadow-sm">
                      <span className="text-[11px] font-bold text-white">{thread.instructor.grade}등급</span>
                    </div>
                  </div>
                  <span
                    className="text-[12px] text-[#A2A4A6]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {formatTimestamp(thread.timestamp)}
                  </span>
                </div>
                <div className={`text-[14px] truncate ${
                  thread.unread > 0 ? "text-[#191919] font-semibold" : "text-[#76787A]"
                }`}>
                  {thread.lastMessage}
                </div>
              </div>
            </button>
          ))
        )}
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
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="p-2 rounded-[16px] bg-[#2563EB] shadow-md">
              <MessageCircle className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-[11px] font-bold text-[#191919]">메시지</span>
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
  );
}
