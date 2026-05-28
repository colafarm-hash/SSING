interface CancelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hoursUntilLesson: number;
}

export default function CancelDialog({ isOpen, onClose, onConfirm, hoursUntilLesson }: CancelDialogProps) {
  if (!isOpen) return null;

  const getRefundInfo = () => {
    if (hoursUntilLesson >= 24) {
      return {
        text: `강습 ${hoursUntilLesson}시간 전입니다. 100% 환불돼요`,
        canCancel: true,
      };
    } else if (hoursUntilLesson >= 1) {
      const refundRate = Math.floor((hoursUntilLesson / 24) * 100);
      return {
        text: `강습 ${hoursUntilLesson}시간 전입니다. ${refundRate}% 환불돼요`,
        canCancel: true,
      };
    } else {
      return {
        text: "강습이 임박해 환불이 어려워요",
        canCancel: false,
      };
    }
  };

  const refundInfo = getRefundInfo();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-5 z-[100]" onClick={onClose}>
      <div
        className="bg-white rounded-[20px] p-6 max-w-[320px] w-full shadow-xl border border-[#E5E6E8]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[18px] font-bold text-[#191919] mb-3">
          강습을 취소하시겠어요?
        </div>
        <div className="text-[14px] text-[#76787A] leading-relaxed mb-6">
          {refundInfo.text}
        </div>
        <div className="space-y-3">
          {refundInfo.canCancel ? (
            <>
              <button
                onClick={onConfirm}
                className="w-full h-[52px] bg-[#F5444C] rounded-[16px] text-[16px] font-bold text-white shadow-md active:scale-[0.98] transition-all"
              >
                강습 취소하기
              </button>
              <button
                onClick={onClose}
                className="w-full h-[52px] bg-[#F5F6F7] rounded-[16px] text-[16px] font-bold text-[#4B4F54] active:scale-[0.98] transition-all"
              >
                돌아가기
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full h-[52px] bg-[#2563EB] rounded-[16px] text-[16px] font-bold text-white shadow-md active:scale-[0.98] transition-all"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
