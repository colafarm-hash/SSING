import { CheckCircle, ChevronLeft } from "lucide-react";

export default function GroupMatchingPhaseB() {
  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col">
      {/* Header */}
      <div className="h-[59px] flex items-center justify-between px-5 border-b border-[#E5E6E8]">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">그룹 매칭</span>
        <div className="w-10" />
      </div>

      {/* Body center */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <CheckCircle size={56} className="text-[#0FB882]" strokeWidth={2} />
        <div className="text-[24px] font-bold text-[#191919] text-center">3명이 매칭됐어요</div>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-[280px]">
          <div className="px-3 py-1.5 rounded-full text-[13px] font-bold bg-[#2563EB]/10 text-[#2563EB]">
            본인
          </div>
          <div className="px-3 py-1.5 rounded-full text-[13px] font-semibold bg-[#F5F6F7] text-[#4B4F54]">
            28세 · 남
          </div>
          <div className="px-3 py-1.5 rounded-full text-[13px] font-semibold bg-[#F5F6F7] text-[#4B4F54]">
            31세 · 여
          </div>
        </div>

        <div className="text-[14px] text-[#76787A] text-center mt-2">
          강사를 함께 골라볼게요
        </div>
      </div>

      {/* Bottom progress hint */}
      <div className="pb-[60px] text-center">
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#E5E6E8]" />
        </div>
      </div>
    </div>
  );
}
