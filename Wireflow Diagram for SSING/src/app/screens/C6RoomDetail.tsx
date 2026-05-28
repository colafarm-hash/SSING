import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Star, Clock, MapPin, Users, Award, Sparkles, AlertCircle } from "lucide-react";

const mockRoom = {
  id: 1,
  instructor: {
    name: "김OO",
    grade: 5,
    rating: 4.9,
    rebookingRate: 92,
    intro: "안녕하세요. 10년 경력의 스키 강사입니다.",
  },
  startTime: "오늘 14:00",
  duration: "3시간",
  discipline: "스키",
  levels: ["입문", "초급"],
  occupancy: { current: 2, max: 4 },
  isMulti: true,
  price: 35000,
  timeLimit: "13:30",
  location: "지산리조트",
  entrants: [
    { age: 28, gender: "남" },
    { age: 25, gender: "여" },
  ],
  viewers: 3,
};

export default function C6RoomDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDialog, setShowDialog] = useState(false);

  const handleEnter = () => {
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setShowDialog(false);
    navigate("/payment");
  };

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">방 상세</span>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-28">
        {/* Instructor Summary */}
        <div className="px-5 py-6 bg-white border-b border-[#E5E6E8]">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-[20px] bg-[#F5F6F7] shadow-lg" />
              <div className="absolute -bottom-2 -right-2 p-1.5 bg-[#2563EB] rounded-[12px] shadow-md">
                <Award className="w-4 h-4 text-white" strokeWidth={2.5} fill="white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[20px] font-bold text-[#191919]">{mockRoom.instructor.name}</span>
                <div className="px-2.5 py-1 bg-[#2563EB] rounded-lg shadow-sm">
                  <span className="text-[11px] font-bold text-white">{mockRoom.instructor.grade}등급</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[13px] mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FF8A00] text-[#FF8A00]" strokeWidth={0} />
                  <span className="font-bold text-[#191919]">{mockRoom.instructor.rating}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[#D1D3D5]" />
                <span className="text-[#4B4F54] font-normal">재예약 {mockRoom.instructor.rebookingRate}%</span>
              </div>
              <div className="text-[13px] text-[#4B4F54] leading-relaxed mb-3">{mockRoom.instructor.intro}</div>
            </div>
          </div>
          <button
            onClick={() => navigate(`/instructor/${id}`)}
            className="text-[14px] font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
          >
            강사 프로필 보기 →
          </button>
        </div>

        {/* Room Info Card */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="bg-white rounded-[20px] p-5 shadow-md border border-[#E5E6E8]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[15px] font-bold text-[#191919]">강습 정보</div>
              <div className={`px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-sm ${
                mockRoom.isMulti
                  ? "bg-[#0FB882] text-white"
                  : "bg-[#191919] text-white"
              }`}>
                {mockRoom.isMulti ? "다중 매칭" : "1:1 단독"}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-[13px] text-[#76787A] font-normal">시작 시간</span>
                  <span className="text-[14px] font-bold text-[#191919]">{mockRoom.startTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-[13px] text-[#76787A] font-normal">강습 시간</span>
                  <span className="text-[14px] font-bold text-[#191919]">{mockRoom.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-[13px] text-[#76787A] font-normal">종목·레벨</span>
                  <span className="text-[14px] font-bold text-[#191919]">
                    {mockRoom.discipline} · {mockRoom.levels.join(", ")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-[13px] text-[#76787A] font-normal">장소</span>
                  <span className="text-[14px] font-bold text-[#191919]">{mockRoom.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Occupancy */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
              <span className="text-[15px] font-bold text-[#191919]">참여 인원</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] font-bold text-[#2563EB]">{mockRoom.occupancy.current}</span>
              <span className="text-[16px] text-[#76787A] font-normal">/</span>
              <span className="text-[16px] text-[#76787A] font-normal">{mockRoom.occupancy.max}명</span>
            </div>
          </div>

          {mockRoom.timeLimit && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-[#FFF7ED] rounded-[16px] border border-[#FF8A00]/20">
              <AlertCircle className="w-4 h-4 text-[#FF8A00]" strokeWidth={2} />
              <span className="text-[13px] text-[#FF8A00] font-bold">
                추가 입장 마감 ~ {mockRoom.timeLimit}
              </span>
            </div>
          )}

          {mockRoom.entrants.length > 0 && (
            <div>
              <div className="text-[13px] text-[#76787A] font-normal mb-3">함께 듣는 사람</div>
              <div className="grid grid-cols-2 gap-2">
                {mockRoom.entrants.map((entrant, i) => (
                  <div key={i} className="bg-white rounded-[16px] px-3 py-2.5 border border-[#E5E6E8] shadow-sm">
                    <div className="text-[13px] font-bold text-[#191919]">{entrant.age}세 · {entrant.gender}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="text-[15px] font-bold text-[#191919] mb-3">가격</div>
          <div className="bg-white rounded-[20px] p-5 shadow-md border border-[#E5E6E8]">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-[14px] text-[#4B4F54] font-normal">
                {mockRoom.isMulti ? "1인 부담" : "1:1 강습"}
              </span>
              <div className="text-[24px] font-bold text-[#191919] leading-none">₩{mockRoom.price.toLocaleString()}원</div>
            </div>
            <div className="space-y-1">
              <div className="text-[12px] text-[#76787A] font-normal">인원 확정 시 가격이 확정돼요</div>
              <div className="text-[12px] text-[#76787A] font-normal">패찰비는 강사가 부담해요</div>
            </div>
          </div>
        </div>

        {mockRoom.viewers >= 2 && (
          <div className="px-5 py-4">
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F5F6F7] rounded-[16px] border border-[#E5E6E8]">
              <Users className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
              <span className="text-[13px] font-bold text-[#2563EB]">{mockRoom.viewers}명이 같이 보고 있어요</span>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 py-5 z-50">
        <div className="max-w-[393px] mx-auto">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEnter();
            }}
            className="group w-full h-[58px] bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-[20px] text-[17px] font-bold text-white shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            입장하기
          </button>
        </div>
      </div>

      {/* Multi-match Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-5 z-[100]">
          <div className="bg-white rounded-[20px] p-6 max-w-[320px] w-full shadow-xl border border-[#E5E6E8]">
            <div className="text-[20px] font-bold text-[#191919] mb-3">
              {mockRoom.occupancy.current === 0 ? "다중 매칭 동의" : "방 입장 확인"}
            </div>
            <div className="text-[15px] text-[#4B4F54] leading-relaxed mb-6">
              {mockRoom.occupancy.current === 0
                ? "다른 사람을 추가로 받고 페이를 나눠 내시겠습니까?"
                : "다른 사람들과 함께 들어야 하는 방입니다. 괜찮으십니까?"}
            </div>
            <div className="space-y-3">
              {mockRoom.occupancy.current === 0 ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleConfirm();
                    }}
                    className="w-full h-[52px] bg-[#2563EB] rounded-[16px] text-[16px] font-bold text-white shadow-md active:scale-[0.98] transition-all cursor-pointer"
                  >
                    함께 들을게요
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleConfirm();
                    }}
                    className="w-full h-[52px] bg-[#F5F6F7] rounded-[16px] text-[16px] font-bold text-[#4B4F54] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    혼자 들을게요 (1:1)
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleConfirm();
                    }}
                    className="w-full h-[52px] bg-[#2563EB] rounded-[16px] text-[16px] font-bold text-white shadow-md active:scale-[0.98] transition-all cursor-pointer"
                  >
                    입장할게요
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowDialog(false);
                    }}
                    className="w-full h-[52px] bg-[#F5F6F7] rounded-[16px] text-[16px] font-bold text-[#4B4F54] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    취소
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
