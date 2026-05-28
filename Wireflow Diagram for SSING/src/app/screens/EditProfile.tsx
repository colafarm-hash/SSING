import { ChevronLeft } from "lucide-react";

export default function EditProfile() {
  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col">
      <div className="h-[59px] flex items-center justify-between px-5 border-b border-[#E5E6E8]">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">내 정보 수정</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7 pb-32">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-[#F5F6F7] border border-[#E5E6E8]" />
          <button className="text-[14px] font-bold text-[#2563EB]">사진 변경</button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-[13px] font-bold text-[#191919] mb-2">이름</label>
            <input
              type="text"
              defaultValue="홍길동"
              className="w-full bg-white border border-[#E5E6E8] rounded-[16px] px-4 py-3.5 text-[15px] text-[#191919] shadow-sm"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#191919] mb-2">이메일</label>
            <input
              type="email"
              value="hong@example.com"
              disabled
              className="w-full bg-[#F5F6F7] border border-[#E5E6E8] rounded-[16px] px-4 py-3.5 text-[15px] text-[#A2A4A6] shadow-sm"
            />
            <div className="text-[12px] text-[#76787A] mt-1.5">이메일은 변경할 수 없어요</div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#191919] mb-2">전화번호</label>
            <input
              type="tel"
              defaultValue="010-1234-5678"
              className="w-full bg-white border border-[#E5E6E8] rounded-[16px] px-4 py-3.5 text-[15px] text-[#191919] shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 py-5 z-50">
        <div className="max-w-[393px] mx-auto">
          <button className="w-full h-[56px] bg-[#F5F6F7] text-[#A2A4A6] rounded-[20px] text-[16px] font-bold cursor-not-allowed">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
