import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to home after a brief moment
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col items-center justify-center px-5">
      <div className="text-[24px] font-bold text-[#191919] mb-2">페이지를 찾을 수 없어요</div>
      <div className="text-[14px] text-[#76787A] text-center mb-6">
        잠시 후 홈으로 이동해요
      </div>
      <div className="w-12 h-12 border-4 border-[#E5E6E8] border-t-[#2563EB] rounded-full animate-spin" />
    </div>
  );
}
