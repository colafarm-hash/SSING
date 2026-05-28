import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, CreditCard, Trash2, Plus } from "lucide-react";

type Method = {
  id: number;
  type: "card" | "kakaopay" | "toss";
  label: string;
  isDefault: boolean;
};

const initialMethods: Method[] = [
  { id: 1, type: "card", label: "신한카드 1234-****-****-5678", isDefault: true },
  { id: 2, type: "kakaopay", label: "kakao@example.com", isDefault: false },
];

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [methods, setMethods] = useState<Method[]>(initialMethods);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const handleDelete = (id: number) => setConfirmId(id);
  const confirmDelete = () => {
    if (confirmId == null) return;
    setMethods((prev) => prev.filter((m) => m.id !== confirmId));
    setConfirmId(null);
  };

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">결제 수단 관리</span>
        <div className="w-10" />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-10 space-y-3">
        {methods.length === 0 && (
          <div className="text-center text-[14px] text-[#76787A] py-12">
            등록된 결제 수단이 없어요
          </div>
        )}
        {methods.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-[#E5E6E8] rounded-[16px] p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <CreditCard className="w-[18px] h-[18px] text-[#2563EB] shrink-0" strokeWidth={2} />
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-[#191919] truncate">{m.label}</div>
                {m.isDefault && (
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-[#2563EB]/10 text-[11px] font-bold text-[#2563EB]">
                    기본
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDelete(m.id)}
              className="p-2 hover:bg-[#F5F6F7] rounded-full"
              aria-label="삭제"
            >
              <Trash2 className="w-4 h-4 text-[#76787A]" strokeWidth={2} />
            </button>
          </div>
        ))}

        <button
          onClick={() => console.log("add payment")}
          className="w-full h-[56px] mt-2 rounded-[16px] border-2 border-dashed border-[#D1D3D5] text-[14px] font-semibold text-[#4B4F54] flex items-center justify-center gap-2 hover:border-[#2563EB]/40 hover:text-[#2563EB]"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          결제 수단 추가
        </button>
      </div>

      {/* Confirm Dialog */}
      {confirmId != null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191919]/40 px-5">
          <div className="w-full max-w-[320px] rounded-[20px] bg-white p-6 shadow-2xl">
            <div className="text-[16px] font-bold text-[#191919] mb-4">이 결제 수단을 삭제하시겠어요?</div>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 h-[44px] rounded-[12px] bg-[#F5F6F7] text-[14px] font-semibold text-[#191919]"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 h-[44px] rounded-[12px] bg-[#F5444C] text-[14px] font-bold text-white"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
