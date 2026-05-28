import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, MapPin, Check } from "lucide-react";

const resorts = [
  { id: 1, name: "지산리조트", distance: "현재 위치", current: true },
  { id: 2, name: "비발디파크", distance: "45km" },
  { id: 3, name: "곤지암리조트", distance: "32km" },
  { id: 4, name: "하이원리조트", distance: "178km" },
  { id: 5, name: "휘닉스파크", distance: "125km" },
  { id: 6, name: "엘리시안 강촌", distance: "85km" },
];

const upcomingResorts = [
  "용평리조트",
  "무주리조트",
  "웰리힐리파크",
];

export default function S2Location() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(resorts.find(r => r.current)?.id || 1);

  const handleSelect = (id: number) => {
    setSelected(id);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <span className="text-[16px] font-bold text-[#191919]">스키장 선택</span>
        <div className="w-10" />
      </div>

      {/* Resort List */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-6 space-y-3">
        {resorts.map((resort) => (
          <button
            key={resort.id}
            onClick={() => handleSelect(resort.id)}
            className={`w-full bg-white rounded-[16px] px-5 py-4 flex items-center justify-between border transition-all duration-200 ${
              selected === resort.id
                ? "border-[#2563EB] shadow-md"
                : "border-[#E5E6E8] shadow-sm hover:border-[#2563EB]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-[12px] ${
                selected === resort.id ? "bg-[#2563EB]" : "bg-[#F5F6F7]"
              }`}>
                <MapPin className={`w-5 h-5 ${
                  selected === resort.id ? "text-white" : "text-[#4B4F54]"
                }`} strokeWidth={2} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[16px] font-bold ${
                    selected === resort.id ? "text-[#191919]" : "text-[#191919]"
                  }`}>
                    {resort.name}
                  </span>
                  {resort.current && (
                    <div className="px-2 py-0.5 bg-[#0FB882] rounded-[8px]">
                      <span className="text-[11px] font-bold text-white">현재 위치</span>
                    </div>
                  )}
                </div>
                {resort.distance && !resort.current && (
                  <div className="text-[13px] text-[#76787A]">{resort.distance}</div>
                )}
              </div>
            </div>
            {selected === resort.id && (
              <Check className="w-6 h-6 text-[#2563EB]" strokeWidth={2.5} />
            )}
          </button>
        ))}

        {/* Upcoming Section */}
        <div className="pt-6">
          <div className="text-[13px] font-bold text-[#76787A] mb-3 px-1">지원 예정</div>
          <div className="space-y-2">
            {upcomingResorts.map((resort) => (
              <div
                key={resort}
                className="bg-[#F5F6F7] rounded-[16px] px-5 py-4 flex items-center gap-4"
              >
                <div className="p-2.5 rounded-[12px] bg-[#EBECED]">
                  <MapPin className="w-5 h-5 text-[#A2A4A6]" strokeWidth={2} />
                </div>
                <div className="text-[16px] font-bold text-[#A2A4A6]">{resort}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
