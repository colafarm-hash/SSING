import { X } from "lucide-react";

// 강사단위 합류 동의 다이얼로그.
// - role="first": 이 강사 방을 최초로 여는 손님 — 함께/단독 선택
// - role="subsequent": 이미 열린 방에 합류하려는 손님 — 합류/다른 강사
export type JoinRole = "first" | "subsequent";

interface FirstProps {
  isOpen: boolean;
  role: "first";
  instructorName: string;
  onConsentGroup: () => void;  // "함께 들을게요"
  onConsentSolo: () => void;   // "1:1 단독만"
  onClose: () => void;
}

interface SubsequentProps {
  isOpen: boolean;
  role: "subsequent";
  instructorName: string;
  currentCount: number;       // 합류 후 인원 = current+1
  remainMin: number;
  perPersonAfterJoin: number;
  onConsentJoin: () => void;  // "{newCount}명째로 합류할게요"
  onLookElsewhere: () => void; // "다른 강사 보기"
  onClose: () => void;
}

type Props = FirstProps | SubsequentProps;

export default function JoinConsentDialog(props: Props) {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191919]/40 px-5">
      <div className="w-full max-w-[360px] rounded-[20px] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-3">
          <div className="text-[18px] font-bold text-[#191919] leading-tight">
            {props.role === "first"
              ? "함께 들을 분을 받을까요?"
              : `${props.instructorName} 강사 방에 합류할까요?`}
          </div>
          <button
            onClick={props.onClose}
            className="p-1 -mr-1 -mt-1 hover:bg-[#F5F6F7] rounded-full transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-[#76787A]" strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        {props.role === "first" ? (
          <div className="text-[14px] text-[#4B4F54] leading-relaxed mb-5">
            {props.instructorName} 강사 방을 1시간 동안 열어둘게요. 같은 조건의
            다른 분이 합류하면 가격이 인당으로 분담돼요. 아무도 합류하지 않으면
            1:1로 강습을 진행해요.
          </div>
        ) : (
          <>
            <div className="text-[14px] text-[#4B4F54] leading-relaxed mb-3">
              현재 <b className="text-[#191919]">{props.currentCount - 1}명</b>이 함께
              듣고 있어요. <b className="text-[#191919]">{props.remainMin}분</b> 안에
              추가로 합류할 수 있어요. 합류하면 인당 가격은{" "}
              <b className="text-[#191919]" style={{ fontVariantNumeric: "tabular-nums" }}>
                ₩{props.perPersonAfterJoin.toLocaleString()}원
              </b>
              이 돼요.
            </div>
            <div className="text-[12px] text-[#76787A] leading-relaxed mb-5">
              최종 인원이 늘어나면 가격이 자동으로 정산돼요.
            </div>
          </>
        )}

        {/* Buttons */}
        {props.role === "first" ? (
          <div className="space-y-2">
            <button
              onClick={props.onConsentGroup}
              className="w-full h-[48px] rounded-[14px] bg-[#2563EB] text-[15px] font-bold text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
            >
              함께 들을게요
            </button>
            <button
              onClick={props.onConsentSolo}
              className="w-full h-[48px] rounded-[14px] bg-[#F5F6F7] text-[15px] font-semibold text-[#191919] hover:bg-[#EBECED] active:scale-[0.98] transition-all"
            >
              1:1 단독만
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={props.onConsentJoin}
              className="w-full h-[48px] rounded-[14px] bg-[#2563EB] text-[15px] font-bold text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
            >
              {props.currentCount}명째로 합류할게요
            </button>
            <button
              onClick={props.onLookElsewhere}
              className="w-full h-[48px] rounded-[14px] bg-transparent text-[15px] font-semibold text-[#4B4F54] hover:bg-[#F5F6F7] active:scale-[0.98] transition-all"
            >
              다른 강사 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
