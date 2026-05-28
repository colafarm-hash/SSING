import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  "이용약관",
  "개인정보처리방침",
  "위치기반서비스 이용약관",
  "마케팅 정보 수신 동의",
  "청소년보호정책",
  "사업자 정보",
];

export default function Terms() {
  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col">
      <div className="h-[59px] flex items-center justify-between px-5 border-b border-[#E5E6E8]">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">약관·정책</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-5">
          {items.map((it, i) => (
            <button
              key={it}
              className={`w-full flex items-center justify-between py-4 ${i !== 0 ? "border-t border-[#E5E6E8]" : ""}`}
            >
              <span className="text-[15px] font-semibold text-[#191919]">{it}</span>
              <ChevronRight className="w-5 h-5 text-[#A2A4A6]" strokeWidth={2} />
            </button>
          ))}
        </div>

        <div className="px-5 py-6 mt-4 border-t border-[#E5E6E8]">
          <div className="text-[12px] text-[#A2A4A6] leading-relaxed">
            SSING은 (주)OOO이 운영합니다.<br />
            사업자등록번호 OOO-OO-OOOOO
          </div>
        </div>
      </div>
    </div>
  );
}
