import { LogOut } from "lucide-react";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function LogoutDialog({ isOpen, onClose }: LogoutDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-6" onClick={onClose}>
      <div
        className="w-full max-w-[340px] bg-white rounded-[24px] shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#F5F6F7] flex items-center justify-center mb-4">
            <LogOut className="w-6 h-6 text-[#76787A]" strokeWidth={2} />
          </div>
          <div className="text-[18px] font-bold text-[#191919] mb-2">로그아웃하시겠어요?</div>
          <div className="text-[14px] text-[#76787A] mb-6">언제든 다시 로그인할 수 있어요</div>

          <div className="w-full space-y-2">
            <button
              className="w-full h-[52px] bg-[#F5444C] rounded-[16px] text-[15px] font-bold text-white"
            >
              로그아웃
            </button>
            <button
              onClick={onClose}
              className="w-full h-[52px] bg-[#F5F6F7] rounded-[16px] text-[15px] font-bold text-[#191919]"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
