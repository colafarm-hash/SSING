import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, Star, CreditCard, Shield, Sparkles, Award } from "lucide-react";

type JoinRole = "first" | "subsequent" | "solo";

const defaultData = {
  instructor: { name: "김OO", grade: 5, rating: 4.9 },
  lesson: {
    discipline: "스키",
    level: "초급",
    groupSize: 2,
    duration: "3시간",
    startTime: "지금부터 1시간 내 강습",
    location: "지산리조트",
  },
};

const paymentMethods = [
  { id: "card", name: "카드", icon: CreditCard },
  { id: "kakaopay", name: "카카오페이", icon: CreditCard },
  { id: "toss", name: "토스", icon: CreditCard },
];

const P = 70000;
const ALPHA = 17500;

export default function C7Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");

  // location.state 에서 합류 컨텍스트 읽기 (없으면 데모용 기본값)
  const fromJoin: boolean = location.state?.fromInstructorJoin === true;
  const joinRole: JoinRole = location.state?.joinRole ?? "solo";
  const currentCount: number = location.state?.currentCount ?? 1;
  const joinWindowMin: number | undefined = location.state?.joinWindowMin;
  const perPersonPrice: number = location.state?.perPersonPrice ?? P;
  const mode: "instant" | "reservation" = location.state?.mode ?? "instant";
  const instructor = location.state?.instructor ?? defaultData.instructor;
  const conditions = location.state?.conditions;

  // 예약 모드 — C6 에서 방 정보를 직접 넘겨주는 경우 우선 사용
  const reservationLesson = location.state?.reservationLesson;

  // Build lesson summary from state if present
  const lesson = reservationLesson
    ? {
        discipline: reservationLesson.discipline,
        level: reservationLesson.level,
        groupSize: reservationLesson.groupSize ?? currentCount,
        duration: reservationLesson.duration,
        startTime: reservationLesson.startTime,
        location: reservationLesson.location ?? defaultData.lesson.location,
      }
    : {
        discipline:
          conditions?.discipline === "ski"
            ? "스키"
            : conditions?.discipline === "snowboard"
            ? "보드"
            : defaultData.lesson.discipline,
        level:
          conditions?.level === "beginner"
            ? "입문"
            : conditions?.level === "intermediate"
            ? "초급"
            : conditions?.level === "advanced"
            ? "상급"
            : defaultData.lesson.level,
        groupSize: conditions?.groupSize ?? defaultData.lesson.groupSize,
        duration: conditions?.duration
          ? `${conditions.duration}시간`
          : defaultData.lesson.duration,
        startTime:
          mode === "instant"
            ? joinRole === "subsequent"
              ? "이 방 시작 시간 기준 1시간 내"
              : "지금부터 1시간 내 강습"
            : defaultData.lesson.startTime,
        location: defaultData.lesson.location,
      };

  // For solo case, basePrice = perPersonPrice. For first, perPerson = P. For subsequent, perPerson < P.
  const basePrice = P;
  const discount = basePrice - perPersonPrice;

  return (
    <div className="h-screen w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">결제</span>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-32">
        {/* Instructor Summary */}
        <div className="px-5 py-6 bg-white border-b border-[#E5E6E8]">
          {fromJoin && joinRole !== "solo" && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2563EB]/10 mb-3">
              <span className="text-[12px] font-bold text-[#2563EB]" style={{ fontVariantNumeric: "tabular-nums" }}>
                {joinRole === "first"
                  ? "1번째로 입장 · 합류 대기 1시간"
                  : mode === "reservation"
                  ? `${currentCount}번째로 합류 · 예약 방`
                  : `${currentCount}번째로 합류 · 마감까지 ${joinWindowMin ?? 0}분`}
              </span>
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-[20px] bg-[#F5F6F7] shadow-md" />
              <div className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-[#2563EB] rounded-[12px] shadow-md">
                <Award className="w-3.5 h-3.5 text-white" strokeWidth={2.5} fill="white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[18px] font-bold text-[#191919]">{instructor.name}</span>
                <div className="px-2 py-0.5 bg-[#2563EB] rounded-lg shadow-sm">
                  <span className="text-[11px] font-bold text-white">{instructor.grade}등급</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#FF8A00] text-[#FF8A00]" strokeWidth={0} />
                <span className="text-[14px] font-bold text-[#191919]">{instructor.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="text-[15px] font-bold text-[#191919] mb-4">강습 정보</div>
          <div className="bg-white rounded-[20px] p-5 shadow-md border border-[#E5E6E8] space-y-3">
            {[
              { label: "종목·레벨", value: `${lesson.discipline} · ${lesson.level}` },
              { label: "인원", value: `${currentCount}명${fromJoin && joinRole !== "solo" ? " (현재)" : ""}` },
              { label: "시간", value: lesson.duration },
              { label: "강습 시작", value: lesson.startTime },
              { label: "장소", value: lesson.location },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[13px] text-[#76787A] font-normal">{item.label}</span>
                <span className="text-[14px] font-bold text-[#191919]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 합류 정산 안내 (fromJoin && joinRole !== "solo") */}
        {fromJoin && joinRole !== "solo" && (
          <div className="px-5 py-5 border-b border-[#E5E6E8]">
            <div className="bg-[#F5F6F7] rounded-[14px] p-4">
              <div className="text-[14px] font-bold text-[#191919] mb-1.5">
                추가 합류 시 가격이 자동 정산돼요
              </div>
              <div className="text-[13px] text-[#4B4F54] leading-relaxed">
                {joinRole === "first"
                  ? "지금은 1:1 기준 ₩70,000원이 부과돼요. 1시간 안에 다른 분이 합류하면 차액이 자동으로 환불·적립돼요."
                  : mode === "reservation"
                  ? `지금은 ${currentCount}명 기준 인당 ₩${perPersonPrice.toLocaleString()}원이 부과돼요. 강사가 정한 추가 입장 마감 시각까지 더 합류하면 차액이 자동으로 환불·적립돼요.`
                  : `지금은 ${currentCount}명 기준 인당 ₩${perPersonPrice.toLocaleString()}원이 부과돼요. 윈도우 안에 더 합류하면 차액이 자동으로 환불·적립돼요.`}
              </div>
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="px-5 py-6 border-b border-[#E5E6E8]">
          <div className="text-[15px] font-bold text-[#191919] mb-4">결제 금액</div>
          <div className="bg-white rounded-[20px] p-5 shadow-md border border-[#E5E6E8]">
            <div className="space-y-3 mb-4 pb-4 border-b border-[#E5E6E8]">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#4B4F54] font-normal">1:1 기준가</span>
                <span className="text-[15px] font-normal text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  ₩{basePrice.toLocaleString()}원
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#4B4F54] font-normal">
                    인원 분담 ({currentCount}명)
                  </span>
                  <span className="text-[15px] font-normal text-[#0FB882]" style={{ fontVariantNumeric: "tabular-nums" }}>
                    -₩{discount.toLocaleString()}원
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-[16px] font-bold text-[#191919]">
                {joinRole === "first" ? "현재 부담 (1명 기준)" : "1인 부담"}
              </span>
              <div className="text-[28px] font-bold text-[#191919] leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
                ₩{perPersonPrice.toLocaleString()}원
              </div>
            </div>
            {fromJoin && joinRole === "first" && (
              <div className="text-[12px] text-[#76787A] mb-3">
                최대 5명까지 인당 ₩28,000원까지 분담 가능
              </div>
            )}
            <div className="space-y-2 pt-3 border-t border-[#E5E6E8]">
              <div className="flex items-center gap-2 text-[12px]">
                <Shield className="w-3.5 h-3.5 text-[#0FB882]" strokeWidth={2} />
                <span className="text-[#0FB882] font-bold">SSING 수수료 없음</span>
              </div>
              <div className="flex items-center gap-2 text-[12px]">
                <Shield className="w-3.5 h-3.5 text-[#0FB882]" strokeWidth={2} />
                <span className="text-[#76787A] font-normal">패찰비는 강사가 부담해요</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="px-5 py-6">
          <div className="text-[15px] font-bold text-[#191919] mb-4">결제 수단</div>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-[20px] transition-all duration-200 ${
                  paymentMethod === method.id
                    ? "bg-[#F5F6F7] border-2 border-[#2563EB] shadow-md"
                    : "bg-white border-2 border-[#E5E6E8] hover:border-[#2563EB]/30 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-[16px] ${
                    paymentMethod === method.id
                      ? "bg-[#2563EB] shadow-sm"
                      : "bg-[#F5F6F7]"
                  }`}>
                    <method.icon className={`w-5 h-5 ${
                      paymentMethod === method.id ? "text-white" : "text-[#4B4F54]"
                    }`} strokeWidth={2} />
                  </div>
                  <span className={`text-[15px] font-bold ${
                    paymentMethod === method.id ? "text-[#191919]" : "text-[#4B4F54]"
                  }`}>
                    {method.name}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    paymentMethod === method.id
                      ? "border-[#2563EB] bg-[#2563EB]"
                      : "border-[#D1D3D5]"
                  }`}
                >
                  {paymentMethod === method.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
              </button>
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
              navigate("/confirmed", {
                state: {
                  instructor,
                  conditions,
                  reservationLesson,
                  joinRole,
                  currentCount,
                  joinWindowMin,
                  perPersonPrice,
                  mode,
                  fromInstructorJoin: fromJoin,
                },
              });
            }}
            className="group w-full h-[58px] bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-[20px] text-[17px] font-bold text-white shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            style={{ pointerEvents: "auto", fontVariantNumeric: "tabular-nums" }}
          >
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            ₩{perPersonPrice.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
