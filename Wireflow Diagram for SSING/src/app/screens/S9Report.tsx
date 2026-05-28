import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft } from "lucide-react";

const reasons = [
  "강사가 시간 약속을 어겼어요",
  "강습 품질이 매우 낮았어요",
  "부적절한 언행이 있었어요",
  "사고가 있었어요",
  "기타",
];

export default function S9Report() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [detail, setDetail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    if (!selectedReason) return;

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">강사 신고</span>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-6 pb-32">
        {/* Reason Selection */}
        <div className="mb-8">
          <div className="text-[15px] font-bold text-[#191919] mb-4">신고 사유</div>
          <div className="space-y-3">
            {reasons.map((reason) => (
              <button
                key={reason}
                onClick={() => setSelectedReason(reason)}
                className={`w-full px-5 py-4 rounded-[16px] text-left text-[15px] font-semibold transition-all duration-200 ${
                  selectedReason === reason
                    ? "bg-[#F5F6F7] border-2 border-[#2563EB] text-[#191919]"
                    : "bg-white border border-[#E5E6E8] text-[#4B4F54] hover:border-[#2563EB]/30"
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
        </div>

        {/* Detail Input */}
        <div className="mb-8">
          <div className="text-[15px] font-bold text-[#191919] mb-4">상세 내용</div>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="구체적인 상황을 적어주시면 처리에 도움이 돼요"
            className="w-full h-40 bg-[#F5F6F7] border border-[#E5E6E8] rounded-[16px] px-5 py-4 text-[15px] text-[#191919] placeholder:text-[#A2A4A6] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
          />
        </div>

        {/* Note */}
        <div className="px-4 py-3 bg-[#F5F6F7] rounded-[16px] border border-[#E5E6E8]">
          <div className="text-[13px] text-[#76787A] leading-relaxed">
            매칭 ID <span className="font-bold text-[#191919]">{matchId || "m1"}</span> · 신고 내용은 SSING 운영팀이 검토합니다.
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 py-5 z-50">
        <div className="max-w-[393px] mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className={`w-full h-[56px] rounded-[20px] text-[16px] font-bold transition-all ${
              selectedReason
                ? "bg-[#2563EB] text-white shadow-lg hover:shadow-xl active:scale-[0.98]"
                : "bg-[#F5F6F7] text-[#A2A4A6] cursor-not-allowed"
            }`}
          >
            신고 제출
          </button>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#191919] text-white px-6 py-4 rounded-[16px] shadow-xl z-[100] max-w-[340px] mx-auto">
          <div className="text-[14px] text-center leading-relaxed">
            신고가 접수됐어요. 24시간 내 검토 결과를 알려드려요.
          </div>
        </div>
      )}
    </div>
  );
}
