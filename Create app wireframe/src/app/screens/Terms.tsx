import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TERMS = [
  "이용약관",
  "개인정보처리방침",
  "위치기반서비스 이용약관",
  "마케팅 정보 수신 동의",
  "청소년보호정책",
  "사업자 정보",
];

export default function Terms() {
  const navigate = useNavigate();
  const [info, setInfo] = useState<string | null>(null);

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      <div className="h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">약관·정책</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white divide-y divide-[#E5E6E8]">
          {TERMS.map((label) => (
            <button
              key={label}
              onClick={() => setInfo(`${label} — 준비 중`)}
              className="w-full py-4 px-5 flex items-center justify-between hover:bg-[#F5F6F7] transition-colors"
            >
              <span className="text-[15px] font-semibold text-[#191919]">{label}</span>
              <ChevronRight className="w-5 h-5 text-[#A2A4A6]" strokeWidth={2} />
            </button>
          ))}
        </div>

        <div className="px-5 py-4 text-[12px] text-[#A2A4A6] leading-relaxed">
          SSING은 (주)OOO이 운영합니다. 사업자등록번호 OOO-OO-OOOOO
        </div>
      </div>

      {info && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191919]/40 px-5">
          <div className="w-full max-w-[320px] rounded-[20px] bg-white p-6 shadow-2xl">
            <div className="text-[16px] font-bold text-[#191919] mb-4">{info}</div>
            <button
              onClick={() => setInfo(null)}
              className="w-full h-[44px] rounded-[12px] bg-[#2563EB] text-[14px] font-bold text-white"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
