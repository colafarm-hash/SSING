import { useNavigate } from "react-router";
import { MessageCircle, Apple } from "lucide-react";

export default function O1Login() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // Mock: simulate successful login
    navigate("/");
  };

  const handleAppleLogin = () => {
    // Mock: simulate successful login
    navigate("/");
  };

  const handleOtherMethods = () => {
    // TODO: bottom sheet with email + google
    console.log("other methods");
  };

  const handleTermsClick = (type: "terms" | "privacy") => {
    console.log(`Navigate to ${type}`);
  };

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative overflow-hidden">
      {/* Logo Area - Top ~40% */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-5">
        {/* Optional subtle mountain illustration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 100 L60 40 L100 70 L140 20 L180 100 Z"
              stroke="#2563EB"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="relative z-10 text-center">
          <div className="text-[40px] font-bold text-[#191919] leading-none mb-3 tracking-tight">
            SSING
          </div>
          <div className="text-[15px] text-[#76787A]">
            스키 · 보드 강습 매칭
          </div>
        </div>
      </div>

      {/* Login Options Block - Middle */}
      <div className="relative px-5 pb-8 space-y-4">
        {/* KakaoTalk Login */}
        <button
          onClick={handleKakaoLogin}
          className="w-full h-[56px] bg-[#FEE500] rounded-[16px] flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <MessageCircle className="w-5 h-5 text-[#191919]" strokeWidth={2} fill="#191919" />
          <span className="text-[16px] font-bold text-[#191919]">카카오로 시작하기</span>
        </button>

        {/* Apple Login */}
        <button
          onClick={handleAppleLogin}
          className="w-full h-[56px] bg-[#191919] rounded-[16px] flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <Apple className="w-5 h-5 text-white" strokeWidth={2} fill="white" />
          <span className="text-[16px] font-bold text-white">Apple로 시작하기</span>
        </button>

        {/* Other Methods */}
        <button
          onClick={handleOtherMethods}
          className="w-full py-3 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <span className="text-[14px] font-semibold text-[#4B4F54]">다른 방법으로 시작하기</span>
        </button>
      </div>

      {/* Terms / Privacy Note - Bottom */}
      <div className="relative px-5 pb-[50px] text-center">
        <div className="text-[11px] text-[#A2A4A6] leading-relaxed">
          로그인하면 SSING의{" "}
          <button
            onClick={() => handleTermsClick("terms")}
            className="text-[#4B4F54] hover:underline"
          >
            이용약관
          </button>{" "}
          및{" "}
          <button
            onClick={() => handleTermsClick("privacy")}
            className="text-[#4B4F54] hover:underline"
          >
            개인정보처리방침
          </button>
          에<br />동의하는 것으로 간주됩니다
        </div>
      </div>
    </div>
  );
}
