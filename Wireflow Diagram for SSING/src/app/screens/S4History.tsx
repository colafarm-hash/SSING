import { useState } from "react";
import { useNavigate } from "react-router";
import { Home, Clock, MessageCircle, User, Calendar } from "lucide-react";

const mockHistory = [
  {
    id: 1,
    date: "2024-01-15",
    time: "14:00",
    instructor: "김OO",
    status: "진행 중",
    discipline: "스키",
    level: "초급",
    location: "지산리조트",
    price: 43750,
  },
  {
    id: 2,
    date: "2024-01-10",
    time: "10:00",
    instructor: "이OO",
    status: "완료 · 평가 남음",
    discipline: "스노보드",
    level: "중급",
    location: "비발디파크",
    price: 70000,
  },
  {
    id: 3,
    date: "2024-01-05",
    time: "15:00",
    instructor: "박OO",
    status: "완료",
    discipline: "스키",
    level: "초급",
    location: "지산리조트",
    price: 35000,
  },
  {
    id: 4,
    date: "2023-12-28",
    time: "11:00",
    instructor: "최OO",
    status: "취소",
    discipline: "스키",
    level: "중급",
    location: "하이원리조트",
    price: 70000,
  },
];

export default function S4History() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("전체");

  const filteredHistory = mockHistory.filter((item) => {
    if (filter === "전체") return true;
    if (filter === "진행 중") return item.status === "진행 중";
    if (filter === "완료") return item.status === "완료" || item.status === "완료 · 평가 남음";
    if (filter === "취소") return item.status === "취소";
    return true;
  });

  const getStatusColor = (status: string) => {
    if (status === "진행 중") return "bg-[#2563EB] text-white";
    if (status === "완료") return "bg-[#76787A] text-white";
    if (status === "완료 · 평가 남음") return "bg-[#0FB882] text-white";
    if (status === "취소") return "bg-[#F5444C] text-white";
    return "bg-[#F5F6F7] text-[#4B4F54]";
  };

  const handleCardClick = (item: typeof mockHistory[0]) => {
    if (item.status === "진행 중") {
      navigate("/confirmed");
    } else if (item.status === "완료 · 평가 남음") {
      navigate("/rating");
    }
  };

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-center px-5 bg-white border-b border-[#E5E6E8]">
        <span className="text-[16px] font-bold text-[#191919]">강습 내역</span>
      </div>

      {/* Filter Chips */}
      <div className="relative z-10 px-5 py-4 border-b border-[#E5E6E8] overflow-x-auto bg-white">
        <div className="flex gap-2">
          {["전체", "진행 중", "완료", "취소"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-200 ${
                filter === f
                  ? "bg-[#191919] text-white shadow-lg"
                  : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-4 pb-24">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Calendar className="w-12 h-12 text-[#D1D3D5] mb-4" strokeWidth={1.5} />
            <div className="text-[16px] font-bold text-[#191919] mb-2">강습 내역이 없어요</div>
            <div className="text-[14px] text-[#76787A]">첫 강습을 예약해보세요</div>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="w-full bg-white rounded-[16px] p-5 text-left border border-[#E5E6E8] shadow-sm hover:shadow-md hover:border-[#2563EB]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[16px] font-bold text-[#191919] mb-1">
                    {item.date} {item.time}
                  </div>
                  <div className="text-[14px] text-[#4B4F54]">{item.instructor} 강사</div>
                </div>
                <div className={`px-3 py-1.5 rounded-[12px] ${getStatusColor(item.status)}`}>
                  <span className="text-[12px] font-bold">{item.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#76787A] mb-3">
                <span>{item.discipline} · {item.level}</span>
                <div className="w-1 h-1 rounded-full bg-[#D1D3D5]" />
                <span>{item.location}</span>
              </div>
              <div className="text-[18px] font-bold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
                ₩{item.price.toLocaleString()}원
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
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="p-2 rounded-[16px] bg-[#2563EB] shadow-md">
              <Clock className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-[11px] font-bold text-[#191919]">내역</span>
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
  );
}
