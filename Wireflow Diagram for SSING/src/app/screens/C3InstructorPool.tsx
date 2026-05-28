import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Star, MapPin, TrendingUp, Award, Users } from "lucide-react";

const mockInstructors = [
  {
    id: 1,
    name: "김OO",
    grade: 5,
    rating: 4.9,
    rebookingRate: 92,
    distance: "1.2km",
    price: 70000,
    viewers: 3,
    featured: true,
  },
  {
    id: 2,
    name: "이OO",
    grade: 4,
    rating: 4.7,
    rebookingRate: 85,
    distance: "0.8km",
    price: 70000,
    viewers: 2,
    featured: false,
  },
  {
    id: 3,
    name: "박OO",
    grade: 5,
    rating: 5.0,
    rebookingRate: 95,
    distance: "2.1km",
    price: 70000,
    viewers: 0,
    featured: false,
  },
];

export default function C3InstructorPool() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("추천순");

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-[#2563EB] rounded-full">
            <span className="text-[14px] font-bold text-white">{mockInstructors.length}명</span>
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
          <span className="text-[#4B4F54] font-normal">스키 · 초급 · 2명 · 3시간</span>
        </div>
      </div>

      {/* Sort */}
      <div className="relative z-10 px-5 py-4 border-b border-[#E5E6E8] overflow-x-auto bg-white">
        <div className="flex gap-2">
          {["추천순", "등급순", "평점순", "거리순", "가격순"].map((s) => (
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

      {/* Instructor List */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {mockInstructors.map((instructor) => (
          <button
            key={instructor.id}
            onClick={() => navigate(`/instructor/${instructor.id}`)}
            className={`group w-full bg-white rounded-[20px] p-5 text-left border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              instructor.featured
                ? "border-[#2563EB]/30 shadow-lg ring-1 ring-[#2563EB]/10"
                : "border-[#E5E6E8] shadow-md hover:border-[#2563EB]/30"
            }`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-[20px] bg-[#F5F6F7] shadow-md" />
                {instructor.grade === 5 && (
                  <div className="absolute -top-1 -right-1 p-1 bg-[#2563EB] rounded-full shadow-md">
                    <Award className="w-3.5 h-3.5 text-white" strokeWidth={2.5} fill="white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[18px] font-bold text-[#191919]">{instructor.name}</span>
                  <div className="px-2 py-0.5 bg-[#2563EB] rounded-lg text-[11px] font-bold text-white shadow-sm">
                    {instructor.grade}등급
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[13px] mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FF8A00] text-[#FF8A00]" strokeWidth={0} />
                    <span className="font-bold text-[#191919]">{instructor.rating}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-[#D1D3D5]" />
                  <div className="flex items-center gap-1 text-[#4B4F54] font-normal">
                    <TrendingUp className="w-3.5 h-3.5 text-[#0FB882]" strokeWidth={2} />
                    재예약 {instructor.rebookingRate}%
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-[#76787A] font-normal">
                  <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>{instructor.distance}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F5F6F7]">
              <div className="text-[18px] font-bold text-[#191919]">
                ₩{instructor.price.toLocaleString()}원
              </div>
              {instructor.viewers >= 2 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F5F6F7] rounded-full border border-[#E5E6E8]">
                  <Users className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={2} />
                  <span className="text-[11px] font-bold text-[#2563EB]">{instructor.viewers}명이 보는 중</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
