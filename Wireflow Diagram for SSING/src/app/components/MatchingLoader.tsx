import { Users, Calendar, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

interface MatchingLoaderProps {
  title: string;
  subtitle?: string;
  conditions?: string[];
  variant: "instructor" | "room" | "group";
}

const statusByVariant: Record<MatchingLoaderProps["variant"], string[]> = {
  instructor: ["조건 분석 중", "가용 강사 검색 중", "최적의 강사 매칭 중"],
  room: ["조건 분석 중", "열린 방 검색 중", "최적의 방 매칭 중"],
  group: ["비슷한 수준 찾는 중", "비슷한 나이대 찾는 중", "그룹 만드는 중"],
};

const IconByVariant = {
  instructor: Users,
  room: Calendar,
  group: UsersRound,
};

export default function MatchingLoader({ title, subtitle, conditions, variant }: MatchingLoaderProps) {
  const Icon = IconByVariant[variant];
  const [statusIdx, setStatusIdx] = useState(0);
  const statuses = statusByVariant[variant];

  useEffect(() => {
    const t = setInterval(() => setStatusIdx((i) => (i + 1) % statuses.length), 1500);
    return () => clearInterval(t);
  }, [statuses.length]);

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col">
      {/* Header */}
      <div className="h-[59px] flex items-center px-5">
        <button className="p-2 -ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      </div>

      {/* Center stack */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
        {/* Dual pulsing rings */}
        <div className="relative w-[160px] h-[160px] flex items-center justify-center">
          <div
            className="absolute w-[160px] h-[160px] rounded-full border-2 border-[#2563EB]"
            style={{
              opacity: 0.2,
              animation: "ring-pulse-outer 2s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[120px] h-[120px] rounded-full border-2 border-[#2563EB]"
            style={{
              animation: "ring-pulse-inner 2s ease-in-out infinite 0.3s",
            }}
          />
          <Icon className="w-10 h-10 text-[#2563EB] relative z-10" strokeWidth={2} />
        </div>

        {/* Title */}
        <div className="text-center max-w-[280px]">
          <div className="text-[24px] font-bold text-[#191919] leading-tight mb-2">{title}</div>
          {subtitle && (
            <div className="text-[14px] text-[#76787A] leading-relaxed">{subtitle}</div>
          )}
        </div>

        {/* Status with dots */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-[14px] font-semibold text-[#2563EB] tabular-nums">
            {statuses[statusIdx]}
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"
                style={{
                  animation: "dot-bounce 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Conditions chips */}
        {conditions && conditions.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {conditions.map((c, i) => (
              <div
                key={i}
                className="px-3 py-1.5 bg-[#F5F6F7] rounded-full text-[12px] font-semibold text-[#4B4F54]"
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom hint */}
      <div className="pb-[50px] text-center px-5">
        <div className="text-[12px] text-[#A2A4A6]">보통 30초 안에 매칭이 완료돼요</div>
      </div>

      <style>{`
        @keyframes ring-pulse-outer {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.3; }
        }
        @keyframes ring-pulse-inner {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
