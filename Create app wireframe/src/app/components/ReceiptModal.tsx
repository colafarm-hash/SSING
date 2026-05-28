import { X } from "lucide-react";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    basePrice: number;
    groupSize: number;
    perPersonPrice: number;
    paymentMethod: string;
    paymentDate: string;
    matchId: string;
  };
}

export default function ReceiptModal({ isOpen, onClose, data }: ReceiptModalProps) {
  if (!isOpen) return null;

  const discount = data.basePrice - data.perPersonPrice;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end z-[100]" onClick={onClose}>
      <div
        className="w-full max-w-[393px] mx-auto bg-white rounded-t-[20px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.10)" }}
      >
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-9 h-1 bg-[#D1D3D5] rounded-full" />
        </div>

        {/* Content */}
        <div className="px-5 pb-8">
          <div className="text-[18px] font-bold text-[#191919] mb-6">결제 상세</div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#4B4F54]">1:1 기준가</span>
              <span className="text-[16px] font-bold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
                ₩{data.basePrice.toLocaleString()}원
              </span>
            </div>

            {data.groupSize > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#4B4F54]">인원 분담 ({data.groupSize}명)</span>
                <span className="text-[16px] font-bold text-[#0FB882]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  -₩{discount.toLocaleString()}원
                </span>
              </div>
            )}

            <div className="pt-4 border-t border-[#E5E6E8]">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-[16px] font-bold text-[#191919]">1인 부담</span>
                <div className="text-[28px] font-bold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  ₩{data.perPersonPrice.toLocaleString()}원
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E6E8] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#76787A]">결제 수단</span>
                <span className="text-[14px] font-semibold text-[#191919]">{data.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#76787A]">결제 일시</span>
                <span className="text-[14px] font-semibold text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {data.paymentDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#76787A]">매칭 ID</span>
                <span className="text-[14px] font-semibold text-[#191919]">{data.matchId}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full h-[52px] bg-[#191919] rounded-[20px] text-[16px] font-bold text-white active:scale-[0.98] transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
