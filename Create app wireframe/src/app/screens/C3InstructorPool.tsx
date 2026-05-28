import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft, Star, MapPin, TrendingUp, Award, Users, X } from "lucide-react";

type JoinStatus =
  | { kind: "none" }
  | { kind: "open"; current: number; capacity: number; remainMin: number }
  | { kind: "full" };

const mockInstructors: Array<{
  id: number;
  name: string;
  grade: number;
  rating: number;
  rebookingRate: number;
  distance: string;
  price: number;
  viewers: number;
  featured: boolean;
  joinStatus: JoinStatus;
}> = [
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
    joinStatus: { kind: "none" },
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
    joinStatus: { kind: "open", current: 2, capacity: 5, remainMin: 38 },
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
    joinStatus: { kind: "full" },
  },
  {
    id: 4,
    name: "최OO",
    grade: 3,
    rating: 4.5,
    rebookingRate: 78,
    distance: "1.6km",
    price: 70000,
    viewers: 0,
    featured: false,
    joinStatus: { kind: "open", current: 1, capacity: 5, remainMin: 52 },
  },
];

export default function C3InstructorPool() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sort, setSort] = useState("추천순");
  const [noticeOpen, setNoticeOpen] = useState(true);

  const allowMulti: boolean = location.state?.allowMulti ?? true;
  const mode: "instant" | "reservation" = location.state?.mode ?? "instant";
  const conditions = location.state?.conditions;
  const showJoinIndicators = mode === "instant" && allowMulti;

  const sorted = useMemo(() => {
    const arr = [...mockInstructors];
    arr.sort((a, b) => {
      if (sort === "등급순") return b.grade - a.grade;
      if (sort === "평점순") return b.rating - a.rating;
      if (sort === "거리순") return parseFloat(a.distance) - parseFloat(b.distance);
      if (sort === "가격순") return a.price - b.price;
      return 0;
    });
    // 마감 카드는 항상 풀 하단으로
    arr.sort((a, b) => {
      const af = a.joinStatus.kind === "full" ? 1 : 0;
      const bf = b.joinStatus.kind === "full" ? 1 : 0;
      return af - bf;
    });
    return arr;
  }, [sort]);

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
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
          <span className="text-[#4B4F54] font-normal">
            {conditions
              ? `${conditions.discipline === "ski" ? "스키" : "보드"} · ${
                  conditions.level === "beginner"
                    ? "입문"
                    : conditions.level === "intermediate"
                    ? "초급"
                    : "상급"
                } · ${conditions.groupSize}명 · ${conditions.duration}시간`
              : "스키 · 초급 · 2명 · 3시간"}
          </span>
        </div>
      </div>

      {/* 합류 안내 strip — instant + allowMulti 일 때만 */}
      {showJoinIndicators && noticeOpen && (
        <div className="relative z-10 mx-5 mt-4 mb-2 rounded-[12px] bg-[#F5F6F7] px-4 py-3 flex items-start justify-between gap-3">
          <div className="text-[13px] text-[#4B4F54] leading-relaxed">
            같은 강사를 선택한 분들이 자동으로 합류돼요. 가격은 인원에 따라 분담돼요.
          </div>
          <button
            onClick={() => setNoticeOpen(false)}
            className="p-1 -m-1 hover:bg-white rounded-full transition-colors"
            aria-label="안내 닫기"
          >
            <X className="w-4 h-4 text-[#76787A]" strokeWidth={2} />
          </button>
        </div>
      )}

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
        {sorted.map((instructor) => {
          const isFull = instructor.joinStatus.kind === "full";
          return (
            <button
              key={instructor.id}
              onClick={() => {
                if (isFull) return;
                navigate(`/instructor/${instructor.id}`, {
                  state: {
                    conditions,
                    allowMulti,
                    mode,
                    joinStatus: instructor.joinStatus,
                    instructorMock: {
                      id: instructor.id,
                      name: instructor.name,
                      grade: instructor.grade,
                      rating: instructor.rating,
                      rebookingRate: instructor.rebookingRate,
                      distance: instructor.distance,
                      price: instructor.price,
                    },
                  },
                });
              }}
              disabled={isFull}
              className={`group w-full bg-white rounded-[20px] p-5 text-left border transition-all duration-300 ${
                isFull
                  ? "opacity-50 cursor-not-allowed border-[#E5E6E8] shadow-sm"
                  : instructor.featured
                  ? "border-[#2563EB]/30 shadow-lg ring-1 ring-[#2563EB]/10 hover:shadow-xl hover:-translate-y-1"
                  : "border-[#E5E6E8] shadow-md hover:border-[#2563EB]/30 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div className="flex items-start gap-4 mb-3">
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

                  {/* 합류 상태 인디케이터 */}
                  {showJoinIndicators && (
                    <div className="mb-2">
                      {instructor.joinStatus.kind === "none" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F5F6F7] text-[12px] font-semibold text-[#4B4F54]">
                          1:1 단독 가능
                        </span>
                      )}
                      {instructor.joinStatus.kind === "open" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#2563EB]/10 text-[12px] font-bold text-[#2563EB]">
                          {instructor.joinStatus.current}명 함께 듣는 중 ·{" "}
                          {instructor.joinStatus.remainMin}분 남음
                        </span>
                      )}
                      {instructor.joinStatus.kind === "full" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#E5E6E8] text-[12px] font-semibold text-[#A2A4A6]">
                          마감
                        </span>
                      )}
                    </div>
                  )}

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
                <div className="text-[18px] font-bold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
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
          );
        })}
      </div>
    </div>
  );
}
