import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Star, MapPin, Award, TrendingUp, Repeat, Users, Sparkles } from "lucide-react";

const mockInstructor = {
  id: 1,
  name: "김OO",
  grade: 5,
  rating: 4.9,
  lessonCount: 127,
  rebookingRate: 92,
  distance: "1.2km",
  price: 70000,
  intro: "안녕하세요. 10년 경력의 스키 강사입니다.",
  fullIntro: "10년간 스키 강습을 해오면서 초보자부터 상급자까지 다양한 수준의 학생들을 가르쳤습니다. 특히 초보자가 자신감을 갖고 슬로프를 내려올 수 있도록 돕는 것에 보람을 느낍니다.",
  certifications: ["대한스키지도자연맹 1급 지도자", "스포츠안전지도사"],
  reviews: [
    { rating: 5, text: "정말 친절하게 가르쳐주셔서 첫 강습인데도 많이 배웠어요.", time: "2일 전" },
    { rating: 5, text: "실력도 좋으시고 설명도 쉽게 해주셔서 좋았습니다.", time: "1주 전" },
    { rating: 4, text: "재미있게 배웠습니다. 다음에도 받고 싶어요.", time: "2주 전" },
  ],
  viewers: 3,
};

export default function C4InstructorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">강사 프로필</span>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-28">
        {/* Profile Header */}
        <div className="px-5 py-6 bg-white border-b border-[#E5E6E8]">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-[20px] bg-[#F5F6F7] shadow-lg" />
              <div className="absolute -bottom-2 -right-2 p-2 bg-[#2563EB] rounded-[16px] shadow-md">
                <Award className="w-5 h-5 text-white" strokeWidth={2.5} fill="white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[24px] font-bold text-[#191919]">{mockInstructor.name}</span>
                <div className="px-2.5 py-1 bg-[#2563EB] rounded-lg shadow-sm">
                  <span className="text-[12px] font-bold text-white">{mockInstructor.grade}등급</span>
                </div>
              </div>
              <div className="text-[14px] text-[#4B4F54] leading-relaxed mb-3">{mockInstructor.intro}</div>
              {mockInstructor.viewers >= 2 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F6F7] rounded-full border border-[#E5E6E8]">
                  <Users className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={2} />
                  <span className="text-[12px] font-bold text-[#2563EB]">{mockInstructor.viewers}명이 같이 보고 있어요</span>
                </div>
              )}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white rounded-[16px] p-3.5 shadow-md border border-[#E5E6E8]">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 fill-[#FF8A00] text-[#FF8A00]" strokeWidth={0} />
              </div>
              <div className="text-[18px] font-bold text-[#191919] text-center leading-none mb-1">{mockInstructor.rating}</div>
              <div className="text-[11px] text-[#76787A] text-center font-normal">평점</div>
            </div>
            <div className="bg-white rounded-[16px] p-3.5 shadow-md border border-[#E5E6E8]">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-[#0FB882]" strokeWidth={2} />
              </div>
              <div className="text-[18px] font-bold text-[#191919] text-center leading-none mb-1">{mockInstructor.rebookingRate}%</div>
              <div className="text-[11px] text-[#76787A] text-center font-normal">재예약</div>
            </div>
            <div className="bg-white rounded-[16px] p-3.5 shadow-md border border-[#E5E6E8]">
              <div className="flex items-center justify-center mb-2">
                <Repeat className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
              </div>
              <div className="text-[18px] font-bold text-[#191919] text-center leading-none mb-1">{mockInstructor.lessonCount}</div>
              <div className="text-[11px] text-[#76787A] text-center font-normal">강습</div>
            </div>
            <div className="bg-white rounded-[16px] p-3.5 shadow-md border border-[#E5E6E8]">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 text-[#FF8A00]" strokeWidth={2} />
              </div>
              <div className="text-[18px] font-bold text-[#191919] text-center leading-none mb-1">{mockInstructor.distance.replace('km', '')}</div>
              <div className="text-[11px] text-[#76787A] text-center font-normal">km</div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="text-[14px] font-bold text-[#191919] mb-3">가격</div>
          <div className="bg-white rounded-[20px] p-5 shadow-md border border-[#E5E6E8]">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[14px] text-[#4B4F54] font-normal">1:1 강습</span>
              <div className="text-[24px] font-bold text-[#191919] leading-none">₩{mockInstructor.price.toLocaleString()}원</div>
            </div>
            <div className="text-[12px] text-[#76787A] font-normal">패찰비는 강사가 부담해요</div>
          </div>
        </div>

        {/* Full Intro */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="text-[14px] font-bold text-[#191919] mb-3">소개</div>
          <div className="text-[15px] text-[#4B4F54] leading-relaxed">{mockInstructor.fullIntro}</div>
        </div>

        {/* Certifications */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="text-[14px] font-bold text-[#191919] mb-3">자격·경력</div>
          <div className="space-y-2.5">
            {mockInstructor.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span className="text-[14px] text-[#4B4F54] font-normal">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="px-5 py-6">
          <div className="text-[14px] font-bold text-[#191919] mb-4">
            강습 후기 <span className="text-[#2563EB]">{mockInstructor.reviews.length}</span>
          </div>
          <div className="space-y-4">
            {mockInstructor.reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-[20px] p-4 shadow-md border border-[#E5E6E8]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${
                          j < review.rating
                            ? "fill-[#FF8A00] text-[#FF8A00]"
                            : "text-[#D1D3D5]"
                        }`}
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#A2A4A6] font-normal">{review.time}</span>
                </div>
                <div className="text-[14px] text-[#26282B] leading-relaxed">{review.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 py-5 z-50">
        <div className="max-w-[393px] mx-auto">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("=== 매칭 시작 CLICKED ===");
              navigate("/payment");
            }}
            className="group w-full h-[58px] bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-[20px] text-[17px] font-bold text-white shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            매칭 시작
          </button>
        </div>
      </div>
    </div>
  );
}
