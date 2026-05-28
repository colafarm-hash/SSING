import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Star, MessageCircle, X, CheckCircle, Award } from "lucide-react";
import ReceiptModal from "../components/ReceiptModal";
import CancelDialog from "../components/CancelDialog";

const mockData = {
  instructor: { name: "김OO", grade: 5, rating: 4.9 },
  lesson: {
    startTime: "지금부터 1시간 내",
    duration: "3시간",
    discipline: "스키",
    level: "초급",
    groupSize: 2,
    location: "지산리조트",
  },
  payment: {
    basePrice: 70000,
    amount: 43750,
    method: "카드",
    date: "2024-01-15 12:30",
    matchId: "m1",
  },
  companions: [{ age: 25, gender: "여" }],
};

export default function C8MatchConfirmed() {
  const navigate = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const handleCancelConfirm = () => {
    setShowCancel(false);
    navigate("/");
  };

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate("/")} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">매칭 확정</span>
        <div className="w-10" />
      </div>

      {/* Success Banner - Calm */}
      <div className="relative z-10 bg-white px-6 py-6 border-b border-[#E5E6E8]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-1.5 bg-[#0FB882]/10 rounded-full">
            <CheckCircle className="w-6 h-6 text-[#0FB882]" strokeWidth={2.5} />
          </div>
          <div className="text-[20px] font-bold text-[#191919] leading-none">매칭 완료</div>
        </div>
        <div className="text-[14px] text-[#76787A]">
          강사와 채팅에서 만나는 장소를 정해주세요
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-6">
        {/* Instructor Info */}
        <div className="px-5 py-6 bg-white border-b border-[#E5E6E8]">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-[20px] bg-[#F5F6F7] shadow-lg" />
              <div className="absolute -bottom-2 -right-2 p-1.5 bg-[#2563EB] rounded-[12px] shadow-md">
                <Award className="w-4 h-4 text-white" strokeWidth={2.5} fill="white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[20px] font-bold text-[#191919]">{mockData.instructor.name}</span>
                <div className="px-2.5 py-1 bg-[#2563EB] rounded-lg shadow-sm">
                  <span className="text-[11px] font-bold text-white">{mockData.instructor.grade}등급</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#FF8A00] text-[#FF8A00]" strokeWidth={0} />
                <span className="text-[15px] font-bold text-[#191919]">{mockData.instructor.rating}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/chat/1")}
            className="group w-full flex items-center justify-center gap-2.5 h-[54px] bg-[#2563EB] rounded-[20px] text-[16px] font-bold text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
            강사와 채팅하기
          </button>
          <div className="mt-3 text-[13px] text-[#76787A] text-center">
            만나는 슬로프와 시간을 채팅에서 정해주세요
          </div>
        </div>

        {/* Lesson Info */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="text-[15px] font-bold text-[#191919] mb-4">강습 정보</div>
          <div className="bg-white rounded-[20px] p-5 shadow-md border border-[#E5E6E8] space-y-3">
            {[
              { label: "강습 시간", value: mockData.lesson.startTime },
              { label: "시간", value: mockData.lesson.duration },
              { label: "종목·레벨", value: `${mockData.lesson.discipline} · ${mockData.lesson.level}` },
              { label: "인원", value: `${mockData.lesson.groupSize}명` },
              { label: "장소", value: mockData.lesson.location },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[13px] text-[#76787A]">{item.label}</span>
                <span className="text-[14px] font-bold text-[#191919]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Companions */}
        {mockData.companions.length > 0 && (
          <div className="px-5 py-6 border-b border-[#E5E6E8]">
            <div className="text-[15px] font-bold text-[#191919] mb-3">함께 듣는 사람</div>
            <div className="grid grid-cols-2 gap-3">
              {mockData.companions.map((companion, i) => (
                <div key={i} className="bg-white rounded-[16px] px-4 py-3 border border-[#E5E6E8] shadow-sm">
                  <div className="text-[14px] font-bold text-[#191919]">
                    {companion.age}세 · {companion.gender}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[15px] font-bold text-[#191919]">결제 내역</div>
            <button
              onClick={() => setShowReceipt(true)}
              className="text-[13px] text-[#2563EB] font-bold hover:text-[#1E40AF] transition-colors"
            >
              상세보기 →
            </button>
          </div>
          <div className="bg-white rounded-[20px] p-5 shadow-md border border-[#E5E6E8]">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#4B4F54]">{mockData.payment.method}</span>
              <div className="text-[24px] font-bold text-[#191919] leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
                ₩{mockData.payment.amount.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Complete Trigger - Demo only, normally triggered automatically when lesson ends */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <button
            onClick={() => navigate("/rating")}
            className="w-full h-[48px] bg-[#F5F6F7] rounded-[16px] text-[14px] font-bold text-[#191919] hover:bg-[#EBECED] active:scale-[0.98] transition-all"
          >
            강습 완료 · 평가하기
          </button>
        </div>

        {/* Cancel */}
        <div className="px-5 py-6">
          <button
            onClick={() => setShowCancel(true)}
            className="flex items-center gap-2 text-[14px] text-[#76787A] hover:text-[#4B4F54] transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={2} />
            강습 취소
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        data={{
          basePrice: mockData.payment.basePrice,
          groupSize: mockData.lesson.groupSize,
          perPersonPrice: mockData.payment.amount,
          paymentMethod: mockData.payment.method,
          paymentDate: mockData.payment.date,
          matchId: mockData.payment.matchId,
        }}
      />

      {/* Cancel Dialog */}
      <CancelDialog
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={handleCancelConfirm}
        hoursUntilLesson={25}
      />
    </div>
  );
}
