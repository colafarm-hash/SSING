import { ChevronLeft } from "lucide-react";

const kinds = [
  { label: "매칭 알림", on: true },
  { label: "강습 알림", on: true },
  { label: "채팅 알림", on: true },
  { label: "마케팅 알림", on: false },
];

const channels = [
  { label: "푸시 알림", on: true },
  { label: "카카오톡 알림", on: false },
  { label: "이메일 알림", on: false },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={`w-11 h-6 rounded-full transition-colors ${on ? "bg-[#2563EB]" : "bg-[#E5E6E8]"}`}
    >
      <div
        className={`w-[18px] h-[18px] rounded-full bg-white shadow-md mt-[3px] transition-transform ${
          on ? "translate-x-[23px]" : "translate-x-[3px]"
        }`}
      />
    </div>
  );
}

export default function NotificationSettings() {
  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col">
      <div className="h-[59px] flex items-center justify-between px-5 border-b border-[#E5E6E8]">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">알림 설정</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-5">
          <div className="text-[13px] font-bold text-[#76787A] mb-2 px-1">알림 종류</div>
          <div className="space-y-0">
            {kinds.map((k, i) => (
              <div
                key={k.label}
                className={`flex items-center justify-between h-[60px] ${i !== 0 ? "border-t border-[#E5E6E8]" : ""}`}
              >
                <span className="text-[15px] text-[#191919]">{k.label}</span>
                <Toggle on={k.on} />
              </div>
            ))}
          </div>
        </div>

        <div className="h-2 bg-[#F5F6F7]" />

        <div className="px-5 py-5">
          <div className="text-[13px] font-bold text-[#76787A] mb-2 px-1">알림 채널</div>
          <div className="space-y-0">
            {channels.map((c, i) => (
              <div
                key={c.label}
                className={`flex items-center justify-between h-[60px] ${i !== 0 ? "border-t border-[#E5E6E8]" : ""}`}
              >
                <span className="text-[15px] text-[#191919]">{c.label}</span>
                <Toggle on={c.on} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
