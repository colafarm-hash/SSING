import { ChevronLeft, CreditCard, Trash2, Plus } from "lucide-react";

const methods = [
  { id: 1, type: "카드", label: "신한카드 1234-****-****-5678", isDefault: true },
  { id: 2, type: "kakaopay", label: "kakao@example.com", isDefault: false },
];

export default function PaymentMethods() {
  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col">
      <div className="h-[59px] flex items-center justify-between px-5 border-b border-[#E5E6E8]">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">결제 수단 관리</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
        {methods.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-[16px] p-4 border border-[#E5E6E8] shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[12px] bg-[#F5F6F7]">
                <CreditCard className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[15px] font-bold text-[#191919]">{m.label}</div>
                {m.isDefault && (
                  <div className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#2563EB]/10">
                    <span className="text-[11px] font-bold text-[#2563EB]">기본</span>
                  </div>
                )}
              </div>
            </div>
            <button className="p-2 -mr-2">
              <Trash2 className="w-4 h-4 text-[#76787A]" strokeWidth={2} />
            </button>
          </div>
        ))}

        <button className="w-full py-4 rounded-[16px] border-2 border-dashed border-[#E5E6E8] flex items-center justify-center gap-2 text-[#76787A]">
          <Plus className="w-4 h-4" strokeWidth={2} />
          <span className="text-[14px] font-bold">결제 수단 추가</span>
        </button>
      </div>
    </div>
  );
}
