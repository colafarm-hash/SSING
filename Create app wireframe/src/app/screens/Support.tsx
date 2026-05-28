import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "매칭은 어떻게 진행되나요?",
    a: "사용자가 즉시 또는 예약 모드로 강습 요청을 보내면, 개인화 매칭 알고리즘이 조건에 맞는 강사·방을 풀로 제시해요. 사용자가 강사를 선택하면 자동으로 방이 열리거나 기존 방에 합류돼요.",
  },
  {
    q: "결제는 안전한가요?",
    a: "PG사를 통해 안전하게 결제되며, 결제 정보는 SSING 서버에 저장되지 않아요. 카드·카카오페이·토스 결제를 지원해요.",
  },
  {
    q: "강습을 취소하면 환불은 어떻게 되나요?",
    a: "강습 시작 24시간 전까지는 전액 환불돼요. 그 이후 취소는 일정 비율의 위약금이 부과돼요. 자세한 환불 정책은 약관을 확인해주세요.",
  },
  {
    q: "강사가 마음에 안 들면 어떻게 하나요?",
    a: "강습 후 평가 화면에서 의견을 남길 수 있어요. 심각한 문제가 있다면 매칭 화면에서 1:1 문의로 신고해주세요.",
  },
  {
    q: "다중 매칭은 뭔가요?",
    a: "같은 강사 방에 여러 사용자가 합류할 수 있는 기능이에요. 인원이 늘수록 인당 가격이 자동으로 분담돼요. 사용자가 '함께도 OK'를 선택하면 활성화돼요.",
  },
  {
    q: "패찰비는 누가 부담하나요?",
    a: "패찰비는 강사가 부담해요. 사용자는 강습료만 결제하면 돼요.",
  },
  {
    q: "강습 시간을 변경할 수 있나요?",
    a: "강사와 채팅에서 일정 변경에 합의하면 가능해요. 다만 강사 일정에 따라 거절될 수도 있어요.",
  },
  {
    q: "강사로 등록하려면 어떻게 하나요?",
    a: "별도의 강사 앱을 통해 등록 신청을 받고 있어요. 자세한 안내는 1:1 문의로 연락해주세요.",
  },
];

export default function Support() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      <div className="h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">고객 지원</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-10">
        <div className="text-[13px] font-bold text-[#191919] mb-3">자주 묻는 질문</div>
        <div className="bg-white rounded-[16px] border border-[#E5E6E8] divide-y divide-[#E5E6E8] mb-8">
          {FAQ.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i} className="px-4">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full py-4 flex items-center justify-between text-left"
                >
                  <span className="text-[15px] font-semibold text-[#191919] pr-3">{item.q}</span>
                  {open ? (
                    <ChevronUp className="w-5 h-5 text-[#76787A] shrink-0" strokeWidth={2} />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#76787A] shrink-0" strokeWidth={2} />
                  )}
                </button>
                {open && (
                  <div className="pb-4 text-[14px] text-[#4B4F54] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-[13px] font-bold text-[#191919] mb-3">1:1 문의</div>
        <button
          onClick={() => console.log("contact")}
          className="w-full h-[56px] bg-[#F5F6F7] rounded-[16px] flex items-center justify-center gap-2 text-[15px] font-semibold text-[#191919]"
        >
          <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
          1:1 문의하기
        </button>
        <div className="mt-2 text-center text-[12px] text-[#76787A]">
          보통 24시간 이내에 답변드려요
        </div>
      </div>
    </div>
  );
}
