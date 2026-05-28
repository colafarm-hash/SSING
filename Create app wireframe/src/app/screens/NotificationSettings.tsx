import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

type ToggleKey =
  | "match"
  | "lesson"
  | "chat"
  | "marketing"
  | "push"
  | "kakao"
  | "email";

const initial: Record<ToggleKey, boolean> = {
  match: true,
  lesson: true,
  chat: true,
  marketing: false,
  push: true,
  kakao: false,
  email: false,
};

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative ${on ? "bg-[#2563EB]" : "bg-[#E5E6E8]"}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-md transition-all ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

export default function NotificationSettings() {
  const navigate = useNavigate();
  const [state, setState] = useState(initial);
  const [toastSeen, setToastSeen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (toastRef.current) window.clearTimeout(toastRef.current);
  }, []);

  const flip = (k: ToggleKey) => {
    setState((s) => ({ ...s, [k]: !s[k] }));
    if (!toastSeen) {
      setToastSeen(true);
      setToast("변경사항이 저장됐어요");
      toastRef.current = window.setTimeout(() => setToast(null), 1500);
    }
  };

  const renderRow = (k: ToggleKey, label: string) => (
    <div className="h-[60px] flex items-center justify-between border-b border-[#E5E6E8] last:border-b-0">
      <span className="text-[15px] text-[#191919]">{label}</span>
      <Toggle on={state[k]} onChange={() => flip(k)} />
    </div>
  );

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      <div className="h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">알림 설정</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-10">
        <div className="text-[13px] font-bold text-[#191919] mb-2">알림 종류</div>
        <div className="bg-white rounded-[16px] px-4 border border-[#E5E6E8] mb-8">
          {renderRow("match", "매칭 알림")}
          {renderRow("lesson", "강습 알림")}
          {renderRow("chat", "채팅 알림")}
          {renderRow("marketing", "마케팅 알림")}
        </div>

        <div className="text-[13px] font-bold text-[#191919] mb-2">알림 채널</div>
        <div className="bg-white rounded-[16px] px-4 border border-[#E5E6E8]">
          {renderRow("push", "푸시 알림")}
          {renderRow("kakao", "카카오톡 알림")}
          {renderRow("email", "이메일 알림")}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-[#191919] text-white text-[13px] font-semibold shadow-2xl z-[100]">
          {toast}
        </div>
      )}
    </div>
  );
}
