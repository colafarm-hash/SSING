import { ChevronLeft, ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "매칭은 어떻게 진행되나요?", a: "조건을 입력하면 매칭 알고리즘이 동시간대 가용 강사 풀을 제시해요. 풀에서 비교·선택하시면 됩니다." },
  { q: "결제는 안전한가요?", a: "PCI DSS 인증 PG사를 통해 처리되며, 카드 정보는 SSING 서버에 저장되지 않습니다." },
  { q: "강습을 취소하면 환불은 어떻게 되나요?", a: "24시간 전까지 100%, 1시간 전까지 50%, 이후엔 환불이 어려워요." },
  { q: "강사가 마음에 안 들면 어떻게 하나요?", a: "강습 후 평가에서 후기·신고가 가능하고, 다음에 같은 강사가 풀에서 노출되지 않게 설정할 수 있어요." },
  { q: "다중 매칭은 뭔가요?", a: "한 방에 여러 명이 같이 들어가서 비용을 분담하는 방식이에요." },
  { q: "패찰비는 누가 부담하나요?", a: "패찰비는 강사가 부담해요. 소비자는 강습료만 결제합니다." },
  { q: "강습 시간을 변경할 수 있나요?", a: "강사와 채팅으로 협의 가능하지만, 시작 12시간 전부터는 변경이 제한돼요." },
  { q: "강사로 등록하려면 어떻게 하나요?", a: "강사 앱에서 신청 후 자격증·경력 검토를 거쳐 등록됩니다." },
];

export default function Support() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col">
      <div className="h-[59px] flex items-center justify-between px-5 border-b border-[#E5E6E8]">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">고객 지원</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="text-[13px] font-bold text-[#76787A] mb-3 px-1">자주 묻는 질문</div>
        <div className="space-y-0">
          {faqs.map((f, i) => (
            <div key={i} className={`${i !== 0 ? "border-t border-[#E5E6E8]" : ""}`}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-[15px] font-semibold text-[#191919] flex-1 pr-3">{f.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#A2A4A6] flex-shrink-0 transition-transform ${
                    expanded === i ? "rotate-180" : ""
                  }`}
                  strokeWidth={2}
                />
              </button>
              {expanded === i && (
                <div className="pb-4 text-[14px] text-[#4B4F54] leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="text-[13px] font-bold text-[#76787A] mb-3 px-1">1:1 문의</div>
          <button className="w-full h-[56px] bg-[#F5F6F7] rounded-[16px] flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#191919]" strokeWidth={2} />
            <span className="text-[15px] font-bold text-[#191919]">1:1 문의하기</span>
          </button>
          <div className="text-[12px] text-[#76787A] text-center mt-2">보통 24시간 이내에 답변드려요</div>
        </div>
      </div>
    </div>
  );
}
