import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

const initialProfile = {
  name: "홍길동",
  email: "hong@example.com",
  phone: "010-1234-5678",
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState(initialProfile.name);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [toast, setToast] = useState<string | null>(null);
  const toastRef = useRef<number | null>(null);

  const isDirty =
    name !== initialProfile.name || phone !== initialProfile.phone;

  useEffect(() => () => {
    if (toastRef.current) window.clearTimeout(toastRef.current);
  }, []);

  const handleSave = () => {
    if (!isDirty) return;
    setToast("저장됐어요");
    toastRef.current = window.setTimeout(() => {
      setToast(null);
      navigate(-1);
    }, 1200);
  };

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">내 정보 수정</span>
        <div className="w-10" />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-28 space-y-7">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[#F5F6F7] shadow-inner" />
          <button className="text-[14px] font-semibold text-[#2563EB]">사진 변경</button>
        </div>

        {/* Name */}
        <div>
          <label className="block text-[13px] font-bold text-[#191919] mb-2">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-[#E5E6E8] rounded-[16px] px-4 py-3.5 text-[15px] text-[#191919] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Email (disabled) */}
        <div>
          <label className="block text-[13px] font-bold text-[#191919] mb-2">이메일</label>
          <input
            type="email"
            value={initialProfile.email}
            disabled
            className="w-full bg-[#F5F6F7] border border-[#E5E6E8] rounded-[16px] px-4 py-3.5 text-[15px] text-[#76787A]"
          />
          <div className="mt-2 text-[12px] text-[#76787A]">이메일은 변경할 수 없어요</div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[13px] font-bold text-[#191919] mb-2">전화번호</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white border border-[#E5E6E8] rounded-[16px] px-4 py-3.5 text-[15px] text-[#191919] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 py-5">
        <div className="max-w-[393px] mx-auto">
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`w-full h-[56px] rounded-[16px] text-[16px] font-bold transition-all ${
              isDirty
                ? "bg-[#2563EB] text-white shadow-md hover:shadow-lg active:scale-[0.98]"
                : "bg-[#F5F6F7] text-[#A2A4A6] cursor-not-allowed"
            }`}
          >
            저장
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-[#191919] text-white text-[13px] font-semibold shadow-2xl z-[100]">
          {toast}
        </div>
      )}
    </div>
  );
}
