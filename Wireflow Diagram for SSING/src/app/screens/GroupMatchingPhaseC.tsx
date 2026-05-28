import { ChevronLeft, Check, Star, TrendingUp } from "lucide-react";

const candidates = [
  { id: 1, name: "김OO", grade: 5, rating: 4.9, rebook: 92, voted: true,  votes: 1 },
  { id: 2, name: "이OO", grade: 4, rating: 4.7, rebook: 85, voted: false, votes: 0 },
  { id: 3, name: "박OO", grade: 5, rating: 5.0, rebook: 95, voted: false, votes: 1 },
  { id: 4, name: "최OO", grade: 3, rating: 4.5, rebook: 78, voted: false, votes: 0 },
];

export default function GroupMatchingPhaseC() {
  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col">
      {/* Header */}
      <div className="h-[59px] flex items-center justify-between px-5 border-b border-[#E5E6E8]">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">강사 투표</span>
        <div
          className="px-2.5 py-1 rounded-full bg-[#FF8A00]/10"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <span className="text-[12px] font-bold text-[#FF8A00]">2:47 남음</span>
        </div>
      </div>

      {/* Notice strip */}
      <div className="px-5 py-3">
        <div className="bg-[#F5F6F7] rounded-[12px] px-4 py-3">
          <div className="text-[13px] text-[#4B4F54] leading-relaxed">
            그룹 전원이 투표해서 강사를 정해요. 동률은 등급·평점 순으로 결정돼요.
          </div>
        </div>
      </div>

      {/* Member status */}
      <div className="px-5 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2563EB]/10">
            <Check className="w-3 h-3 text-[#2563EB]" strokeWidth={3} />
            <span className="text-[12px] font-bold text-[#2563EB]">본인</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F6F7]">
            <Check className="w-3 h-3 text-[#0FB882]" strokeWidth={3} />
            <span className="text-[12px] font-semibold text-[#4B4F54]">28세·남</span>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#F5F6F7]">
            <span className="text-[12px] font-semibold text-[#A2A4A6]">31세·여 (대기 중)</span>
          </div>
        </div>
      </div>

      {/* Candidates */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-[16px] p-4 border border-[#E5E6E8] shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#F5F6F7]" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[15px] font-bold text-[#191919]">{c.name}</span>
                  <div className="px-1.5 py-0.5 bg-[#2563EB] rounded-md">
                    <span className="text-[10px] font-bold text-white">{c.grade}등급</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-[#FF8A00] text-[#FF8A00]" strokeWidth={0} />
                    <span className="font-bold text-[#191919]">{c.rating}</span>
                  </div>
                  <span className="text-[#D1D3D5]">·</span>
                  <div className="flex items-center gap-0.5 text-[#4B4F54]">
                    <TrendingUp className="w-3 h-3 text-[#0FB882]" strokeWidth={2} />
                    <span>{c.rebook}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#76787A]">현재</div>
                <div className="text-[13px] font-bold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {c.votes}표
                </div>
              </div>
            </div>
            <button
              className={`w-full h-[40px] rounded-[12px] text-[13px] font-bold transition-all ${
                c.voted
                  ? "bg-[#F5F6F7] text-[#4B4F54]"
                  : "bg-[#2563EB] text-white shadow-sm"
              }`}
            >
              {c.voted ? (
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  투표했어요
                </span>
              ) : (
                "투표하기"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
