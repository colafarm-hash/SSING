import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Star, Send, AlertCircle } from "lucide-react";

const mockData = {
  instructor: { name: "김OO" },
  lesson: {
    time: "오늘 14:00",
    discipline: "스키",
    level: "초급",
    groupSize: 2,
  },
};

const starLabels = ["별로예요", "아쉬워요", "괜찮아요", "좋아요", "최고예요"];

export default function C9PostLessonRating() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [wantRebook, setWantRebook] = useState(false);

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate("/")} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">강습 평가</span>
        <button
          onClick={() => navigate("/")}
          className="text-[14px] text-[#76787A] font-normal hover:text-[#4B4F54] transition-colors"
        >
          나중에
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-32">
        {/* Header Section */}
        <div className="px-5 py-6 bg-white border-b border-[#E5E6E8]">
          <div className="text-[24px] font-bold text-[#191919] mb-2 leading-tight">
            강습은 어떠셨어요?
          </div>
          <div className="text-[14px] text-[#76787A] font-normal">
            {mockData.lesson.time} · {mockData.lesson.discipline} · {mockData.lesson.level} · {mockData.lesson.groupSize}명
          </div>
        </div>

        {/* Instructor */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-[20px] bg-[#F5F6F7] shadow-md" />
            <div>
              <div className="text-[20px] font-bold text-[#191919]">{mockData.instructor.name}</div>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="px-5 py-8 border-b border-[#E5E6E8]">
          <div className="text-[15px] font-bold text-[#191919] mb-5">별점을 선택해주세요</div>
          <div className="flex items-center justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-2 transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-14 h-14 transition-all ${
                    star <= (hoveredRating || rating)
                      ? "fill-[#FF8A00] text-[#FF8A00]"
                      : "text-[#D1D3D5]"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          {(hoveredRating || rating) > 0 && (
            <div className="text-center">
              <div className={`inline-block px-4 py-2 rounded-full text-[15px] font-bold ${
                (hoveredRating || rating) >= 4
                  ? "bg-[#0FB882] text-white shadow-md"
                  : (hoveredRating || rating) === 3
                  ? "bg-[#FF8A00] text-white shadow-md"
                  : "bg-[#F5444C] text-white shadow-md"
              }`}>
                {starLabels[(hoveredRating || rating) - 1]}
              </div>
            </div>
          )}
        </div>

        {/* Review */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="text-[15px] font-bold text-[#191919] mb-3">
            후기 작성 <span className="text-[#76787A] font-normal">(선택)</span>
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="강습에서 좋았던 점, 아쉬웠던 점을 자유롭게 적어주세요"
            className="w-full h-32 bg-white border-2 border-[#E5E6E8] rounded-[20px] px-5 py-4 text-[15px] text-[#191919] placeholder:text-[#A2A4A6] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all shadow-sm leading-relaxed"
          />
          <div className="mt-2 text-[12px] text-[#76787A] font-normal">
            {review.length} / 500자
          </div>
        </div>

        {/* Rebook Intention */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <button
            onClick={() => setWantRebook(!wantRebook)}
            className={`w-full flex items-center gap-4 p-5 rounded-[20px] transition-all duration-200 ${
              wantRebook
                ? "bg-[#F5F6F7] border-2 border-[#0FB882] shadow-md"
                : "bg-white border-2 border-[#E5E6E8] hover:border-[#0FB882]/30 shadow-sm"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                wantRebook
                  ? "border-[#0FB882] bg-[#0FB882]"
                  : "border-[#D1D3D5]"
              }`}
            >
              {wantRebook && (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-[15px] font-bold ${wantRebook ? "text-[#191919]" : "text-[#4B4F54]"}`}>
              이 강사에게 다시 강습받고 싶어요
            </span>
          </button>
        </div>

        {/* Report */}
        <div className="px-5 py-6">
          <button onClick={() => navigate("/report/m1")} className="flex items-center gap-2 text-[13px] text-[#A2A4A6] hover:text-[#76787A] transition-colors">
            <AlertCircle className="w-4 h-4" strokeWidth={2} />
            강사에 문제가 있어요
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 py-5 z-50">
        <div className="max-w-[393px] mx-auto">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (rating > 0) {
                handleSubmit();
              }
            }}
            disabled={rating === 0}
            className={`group w-full h-[58px] rounded-[20px] text-[17px] font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              rating > 0
                ? "bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer"
                : "bg-[#F5F6F7] text-[#A2A4A6] cursor-not-allowed"
            }`}
            style={rating > 0 ? { pointerEvents: 'auto' } : undefined}
          >
            {rating > 0 && <Send className="w-5 h-5" strokeWidth={2.5} />}
            평가 제출
          </button>
        </div>
      </div>
    </div>
  );
}
