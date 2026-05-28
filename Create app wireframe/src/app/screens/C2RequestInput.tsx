import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ChevronLeft, MapPin, Sparkles } from "lucide-react";

export default function C2RequestInput() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "instant";

  const [discipline, setDiscipline] = useState<"ski" | "snowboard" | null>("ski");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced" | null>("beginner");
  const [groupSize, setGroupSize] = useState(2);
  const [duration, setDuration] = useState<2 | 3 | 4 | null>(3);
  const [participants, setParticipants] = useState<Array<{ age: string; gender: "male" | "female" | null }>>([
    { age: "25", gender: "male" },
    { age: "23", gender: "female" },
  ]);
  const [allowMulti, setAllowMulti] = useState(true);

  const isComplete =
    discipline && level && duration && participants.every((p) => p.age && p.gender);

  const handleGroupSizeChange = (size: number) => {
    setGroupSize(size);
    const newParticipants = [...participants];
    while (newParticipants.length < size) {
      newParticipants.push({ age: "", gender: null });
    }
    while (newParticipants.length > size) {
      newParticipants.pop();
    }
    setParticipants(newParticipants);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isComplete) return;

    const conditions = {
      discipline,
      level,
      groupSize,
      duration,
      participants,
      allowMulti,
    };

    if (mode === "instant") {
      // 강사단위 합류 모델: instant 는 allowMulti 와 무관하게 강사 풀(C3)로 이동.
      // 합류/단독 분기는 C4 매칭 시작 시점에 다이얼로그로 처리.
      navigate("/instructors", {
        state: { conditions, allowMulti, mode: "instant" },
      });
    } else {
      navigate(`/rooms?allowMulti=${allowMulti}`, {
        state: { conditions, allowMulti, mode: "reservation" },
      });
    }
  };

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col overflow-y-auto relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          <span className="text-[16px] font-bold text-[#191919]">
            {mode === "instant" ? "즉시 강습" : "예약 강습"}
          </span>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-5 py-6 space-y-7 pb-32">
        {/* Location */}
        <div>
          <div className="text-[13px] font-bold text-[#191919] mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
            장소
          </div>
          <button onClick={() => navigate("/location")} className="w-full bg-white rounded-[16px] px-5 py-4 flex items-center justify-between shadow-sm border border-[#E5E6E8] hover:border-[#2563EB]/30 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F5F6F7] rounded-[12px]">
                <MapPin className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
              </div>
              <span className="text-[15px] font-semibold text-[#191919]">지산리조트</span>
            </div>
          </button>
        </div>

        {/* Discipline */}
        <div>
          <div className="text-[13px] font-bold text-[#191919] mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
            종목
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDiscipline("ski")}
              className={`group flex-1 py-4 rounded-[16px] text-[15px] font-bold transition-all duration-200 ${
                discipline === "ski"
                  ? "bg-[#2563EB] text-white shadow-lg"
                  : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
              }`}
            >
              스키
            </button>
            <button
              onClick={() => setDiscipline("snowboard")}
              className={`group flex-1 py-4 rounded-[16px] text-[15px] font-bold transition-all duration-200 ${
                discipline === "snowboard"
                  ? "bg-[#2563EB] text-white shadow-lg"
                  : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
              }`}
            >
              보드
            </button>
          </div>
        </div>

        {/* Level */}
        <div>
          <div className="text-[13px] font-bold text-[#191919] mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
            레벨
          </div>
          <div className="flex gap-2.5 mb-3">
            {(["beginner", "intermediate", "advanced"] as const).map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                className={`flex-1 py-3.5 rounded-[16px] text-[14px] font-bold transition-all duration-200 ${
                  level === lv
                    ? "bg-[#2563EB] text-white shadow-lg"
                    : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
                }`}
              >
                {lv === "beginner" ? "입문" : lv === "intermediate" ? "초급" : "상급"}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="특별히 알려주고 싶은 점이 있으면 적어주세요"
            className="w-full bg-white border border-[#E5E6E8] rounded-[16px] px-4 py-3.5 text-[14px] text-[#191919] placeholder:text-[#A2A4A6] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all shadow-sm"
          />
        </div>

        {/* Group Size */}
        <div>
          <div className="text-[13px] font-bold text-[#191919] mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
            인원
          </div>
          <div className="flex gap-2.5">
            {[1, 2, 3, 4, 5].map((size) => (
              <button
                key={size}
                onClick={() => handleGroupSizeChange(size)}
                className={`flex-1 py-3.5 rounded-[16px] text-[15px] font-bold transition-all duration-200 ${
                  groupSize === size
                    ? "bg-[#2563EB] text-white shadow-lg"
                    : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <div className="text-[13px] font-bold text-[#191919] mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
            시간
          </div>
          <div className="flex gap-2.5">
            {([2, 3, 4] as const).map((hr) => (
              <button
                key={hr}
                onClick={() => setDuration(hr)}
                className={`flex-1 py-3.5 rounded-[16px] text-[15px] font-bold transition-all duration-200 ${
                  duration === hr
                    ? "bg-[#2563EB] text-white shadow-lg"
                    : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
                }`}
              >
                {hr}시간
              </button>
            ))}
          </div>
        </div>

        {/* Participants */}
        <div>
          <div className="text-[13px] font-bold text-[#191919] mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
            강습받는 사람
          </div>
          <div className="space-y-3">
            {participants.map((p, i) => (
              <div key={i} className="bg-white rounded-[20px] p-4 border border-[#E5E6E8] shadow-sm">
                <div className="text-[12px] text-[#76787A] font-normal mb-2">{i + 1}번째 참여자</div>
                <div className="flex gap-2.5">
                  <input
                    type="number"
                    placeholder="나이"
                    value={p.age}
                    onChange={(e) => {
                      const newP = [...participants];
                      newP[i].age = e.target.value;
                      setParticipants(newP);
                    }}
                    className="flex-1 bg-[#F5F6F7] border border-[#E5E6E8] rounded-[16px] px-4 py-3 text-[14px] font-normal text-[#191919] placeholder:text-[#A2A4A6] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                  <button
                    onClick={() => {
                      const newP = [...participants];
                      newP[i].gender = "male";
                      setParticipants(newP);
                    }}
                    className={`flex-1 py-3 rounded-[16px] text-[14px] font-bold transition-all duration-200 ${
                      p.gender === "male"
                        ? "bg-[#2563EB] text-white shadow-md"
                        : "bg-[#F5F6F7] text-[#4B4F54] border border-[#E5E6E8]"
                    }`}
                  >
                    남
                  </button>
                  <button
                    onClick={() => {
                      const newP = [...participants];
                      newP[i].gender = "female";
                      setParticipants(newP);
                    }}
                    className={`flex-1 py-3 rounded-[16px] text-[14px] font-bold transition-all duration-200 ${
                      p.gender === "female"
                        ? "bg-[#2563EB] text-white shadow-md"
                        : "bg-[#F5F6F7] text-[#4B4F54] border border-[#E5E6E8]"
                    }`}
                  >
                    여
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {mode === "reservation" && (
          <div>
            <div className="text-[13px] font-bold text-[#191919] mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
              시작 시간
            </div>
            <input
              type="datetime-local"
              className="w-full bg-white border border-[#E5E6E8] rounded-[16px] px-4 py-3 text-[14px] text-[#191919] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all shadow-sm"
            />
          </div>
        )}

        {/* Multi-match toggle - shown in both modes */}
        <div>
          <div className="text-[13px] font-bold text-[#191919] mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
            함께 듣기
          </div>
          <div className="flex gap-3 mb-2">
            <button
              onClick={() => setAllowMulti(true)}
              className={`flex-1 py-4 rounded-[16px] text-[15px] font-bold transition-all duration-200 ${
                allowMulti
                  ? "bg-[#2563EB] text-white shadow-lg"
                  : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
              }`}
            >
              함께도 OK
            </button>
            <button
              onClick={() => setAllowMulti(false)}
              className={`flex-1 py-4 rounded-[16px] text-[15px] font-bold transition-all duration-200 ${
                !allowMulti
                  ? "bg-[#2563EB] text-white shadow-lg"
                  : "bg-white text-[#4B4F54] border border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
              }`}
            >
              1:1 단독만
            </button>
          </div>
          <div className="text-[12px] text-[#76787A]">
            {mode === "instant" ? (
              allowMulti
                ? "비슷한 수준·나이대의 다른 분들과 묶여서 강습"
                : "혼자 1:1 강습"
            ) : (
              allowMulti
                ? "다른 사람과 같은 방에 들어가도 OK (가격 분담)"
                : "우리만 듣는 1:1 단독 방만 매칭"
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 py-5 z-50">
        <div className="max-w-[393px] mx-auto">
          <button
            type="button"
            onClick={handleSubmit}
            className="group w-full h-[56px] rounded-[20px] text-[16px] font-bold transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            <Sparkles className="w-5 h-5" strokeWidth={2} />
            {mode === "instant" ? "강사 매칭 시작" : "방 매칭 시작"}
          </button>
        </div>
      </div>
    </div>
  );
}
