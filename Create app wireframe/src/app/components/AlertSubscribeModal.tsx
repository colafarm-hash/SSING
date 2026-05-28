import { useState } from "react";

interface AlertSubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: "instructor" | "room";
  requestSummary: string;
}

export default function AlertSubscribeModal({ isOpen, onClose, context, requestSummary }: AlertSubscribeModalProps) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [kakaoEnabled, setKakaoEnabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const title = context === "instructor" ? "강사 등장 알림 받기" : "방 열림 알림 받기";
  const description =
    context === "instructor"
      ? "조건에 맞는 강사가 등장하면 알려드려요."
      : "조건에 맞는 방이 열리면 알려드려요.";
  const toastMessage =
    context === "instructor"
      ? "알림을 등록했어요. 강사가 등장하면 알려드릴게요."
      : "알림을 등록했어요. 방이 열리면 알려드릴게요.";

  const handleSubscribe = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2000);
  };

  return (
    <>
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
            <div className="text-[18px] font-bold text-[#191919] mb-2">{title}</div>
            <div className="text-[14px] text-[#76787A] mb-6">{description}</div>

            {/* Request Summary */}
            <div className="mb-6 px-4 py-3 bg-[#F5F6F7] rounded-[16px] border border-[#E5E6E8]">
              <div className="text-[13px] text-[#4B4F54]">{requestSummary}</div>
            </div>

            {/* Toggles */}
            <div className="mb-6 space-y-3">
              <button
                onClick={() => setPushEnabled(!pushEnabled)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-white border border-[#E5E6E8] hover:border-[#2563EB]/30 transition-all"
              >
                <span className="text-[15px] font-semibold text-[#191919]">푸시 알림</span>
                <div
                  className={`w-12 h-7 rounded-full transition-all ${
                    pushEnabled ? "bg-[#2563EB]" : "bg-[#D1D3D5]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full mt-1 transition-all ${
                      pushEnabled ? "ml-6" : "ml-1"
                    }`}
                  />
                </div>
              </button>

              <button
                onClick={() => setKakaoEnabled(!kakaoEnabled)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-white border border-[#E5E6E8] hover:border-[#2563EB]/30 transition-all"
              >
                <span className="text-[15px] font-semibold text-[#191919]">카카오톡 알림</span>
                <div
                  className={`w-12 h-7 rounded-full transition-all ${
                    kakaoEnabled ? "bg-[#2563EB]" : "bg-[#D1D3D5]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full mt-1 transition-all ${
                      kakaoEnabled ? "ml-6" : "ml-1"
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleSubscribe}
                className="w-full h-[52px] bg-[#2563EB] rounded-[20px] text-[16px] font-bold text-white shadow-md active:scale-[0.98] transition-all"
              >
                알림 받기
              </button>
              <button
                onClick={onClose}
                className="w-full h-[52px] bg-[#F5F6F7] rounded-[20px] text-[16px] font-bold text-[#4B4F54] active:scale-[0.98] transition-all"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#191919] text-white px-6 py-4 rounded-[16px] shadow-xl z-[110] max-w-[340px] mx-auto">
          <div className="text-[14px] text-center leading-relaxed">{toastMessage}</div>
        </div>
      )}
    </>
  );
}
