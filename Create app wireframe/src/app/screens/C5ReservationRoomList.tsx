import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ChevronLeft, Star, Clock, Users, Award } from "lucide-react";

const mockRooms = [
  {
    id: 1,
    instructor: { name: "김OO", grade: 5, rating: 4.9 },
    startTime: "오늘 14:00",
    occupancy: { current: 2, max: 4 },
    isMulti: true,
    price: 35000,
    timeLimit: "13:30",
    viewers: 2,
    featured: true,
  },
  {
    id: 2,
    instructor: { name: "이OO", grade: 4, rating: 4.7 },
    startTime: "오늘 15:00",
    occupancy: { current: 0, max: 1 },
    isMulti: false,
    price: 70000,
    timeLimit: null,
    viewers: 0,
    featured: false,
  },
  {
    id: 3,
    instructor: { name: "박OO", grade: 5, rating: 5.0 },
    startTime: "내일 10:00",
    occupancy: { current: 1, max: 3 },
    isMulti: true,
    price: 40000,
    timeLimit: "오늘 18:00",
    viewers: 3,
    featured: false,
  },
];

export default function C5ReservationRoomList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const allowMulti = searchParams.get("allowMulti") !== "false";
  const [sort, setSort] = useState("추천순");

  const filteredRooms = allowMulti
    ? mockRooms
    : mockRooms.filter((room) => !room.isMulti);

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-[#2563EB] rounded-full shadow-sm">
            <span className="text-[14px] font-bold text-white">{filteredRooms.length}개</span>
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Request Summary */}
      <div className="relative z-10 px-5 py-4 bg-[#F5F6F7] border-b border-[#E5E6E8]">
        <div className="flex items-center gap-2 text-[13px]">
          <div className="px-2.5 py-1 bg-white rounded-full border border-[#E5E6E8] shadow-sm">
            <span className="font-bold text-[#191919]">내 요청</span>
          </div>
          <span className="text-[#76787A]">·</span>
          <span className="text-[#4B4F54] font-normal">
            스키 · 초급 · 2명 · 3시간 · 오늘 14:00{!allowMulti && " · 1:1 단독"}
          </span>
        </div>
      </div>

      {/* Sort */}
      <div className="relative z-10 px-5 py-4 border-b border-[#E5E6E8] overflow-x-auto bg-white">
        <div className="flex gap-2">
          {["추천순", "시간순", "등급순", "평점순", "가격순"].map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-200 ${
                sort === s
                  ? "bg-[#191919] text-white shadow-lg"
                  : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Room List */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {filteredRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => navigate(`/room/${room.id}`)}
            className={`group w-full bg-white rounded-[20px] p-5 text-left border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              room.featured
                ? "border-[#2563EB]/30 shadow-lg ring-1 ring-[#2563EB]/10"
                : "border-[#E5E6E8] shadow-md hover:border-[#2563EB]/30"
            }`}
          >
            {/* Instructor Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-[16px] bg-[#F5F6F7] shadow-md" />
                {room.instructor.grade === 5 && (
                  <div className="absolute -top-1 -right-1 p-0.5 bg-[#2563EB] rounded-full shadow-sm">
                    <Award className="w-3 h-3 text-white" strokeWidth={2.5} fill="white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[16px] font-bold text-[#191919]">{room.instructor.name}</span>
                  <div className="px-2 py-0.5 bg-[#2563EB] rounded-lg text-[11px] font-bold text-white shadow-sm">
                    {room.instructor.grade}등급
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#FF8A00] text-[#FF8A00]" strokeWidth={0} />
                  <span className="text-[13px] font-bold text-[#191919]">{room.instructor.rating}</span>
                </div>
              </div>
            </div>

            {/* Room Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#191919]">{room.startTime}</span>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm ${
                  room.isMulti
                    ? "bg-[#0FB882] text-white"
                    : "bg-[#191919] text-white"
                }`}>
                  {room.isMulti ? "다중 매칭" : "1:1 단독"}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#76787A]" strokeWidth={2} />
                  <div className="flex items-center gap-1.5">
                    <span className="text-[16px] font-bold text-[#191919]">{room.occupancy.current}</span>
                    <span className="text-[14px] text-[#76787A] font-normal">/</span>
                    <span className="text-[14px] text-[#76787A] font-normal">{room.occupancy.max}명</span>
                  </div>
                </div>
                {room.timeLimit && (
                  <span className="text-[12px] text-[#FF8A00] font-bold">
                    ~ {room.timeLimit}
                  </span>
                )}
              </div>
            </div>

            {/* Price & Viewer Badge */}
            <div className="flex items-center justify-between pt-3 border-t border-[#F5F6F7]">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#76787A] font-normal mb-1">
                  {room.isMulti ? "1인 부담" : "1:1 강습"}
                </span>
                <span className="text-[18px] font-bold text-[#191919]">
                  ₩{room.price.toLocaleString()}원
                </span>
              </div>
              {room.viewers >= 2 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F5F6F7] rounded-full border border-[#E5E6E8]">
                  <Users className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={2} />
                  <span className="text-[11px] font-bold text-[#2563EB]">{room.viewers}명</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
