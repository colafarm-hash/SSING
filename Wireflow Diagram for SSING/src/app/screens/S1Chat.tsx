import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Send } from "lucide-react";

const mockMessages = [
  { id: "sys1", type: "system", text: "매칭이 확정됐어요. 강사와 만나는 슬로프와 시간을 정해주세요.", timestamp: "2024-01-15 14:30" },
  { id: "1", type: "incoming", text: "안녕하세요! 오늘 강습 기대되네요.", timestamp: "2024-01-15 14:32" },
  { id: "2", type: "outgoing", text: "네 안녕하세요! 어디서 만날까요?", timestamp: "2024-01-15 14:33" },
  { id: "3", type: "incoming", text: "메인 슬로프 입구 리프트 앞에서 만나요. 14:50에 도착 가능하세요?", timestamp: "2024-01-15 14:35" },
  { id: "4", type: "outgoing", text: "네 좋아요. 14:50에 리프트 앞에서 뵙겠습니다!", timestamp: "2024-01-15 14:36" },
];

const mockInstructor = {
  name: "김OO",
  grade: 5,
};

export default function S1Chat() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [messages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setInput("");
  };

  return (
    <div className="h-[852px] w-full max-w-[393px] mx-auto bg-white flex flex-col relative">
      {/* Header */}
      <div className="relative z-10 h-[59px] flex items-center justify-between px-5 bg-white border-b border-[#E5E6E8]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F5F6F7] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#191919]" strokeWidth={2} />
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-[#191919]">{mockInstructor.name}</span>
            <div className="px-2 py-0.5 bg-[#2563EB] rounded-lg shadow-sm">
              <span className="text-[11px] font-bold text-white">{mockInstructor.grade}등급</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/confirmed")}
            className="text-[12px] text-[#2563EB] hover:text-[#1E40AF] transition-colors"
          >
            강습 정보 보기
          </button>
        </div>
        <div className="w-10" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        {messages.map((msg) => {
          if (msg.type === "system") {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="text-[12px] text-[#76787A] text-center max-w-[280px] leading-relaxed">
                  {msg.text}
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex ${msg.type === "outgoing" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col gap-1 max-w-[75%]">
                <div
                  className={`px-4 py-3 rounded-[20px] ${
                    msg.type === "outgoing"
                      ? "bg-[#2563EB] text-white"
                      : "bg-[#F5F6F7] text-[#191919]"
                  }`}
                >
                  <div className="text-[15px] leading-relaxed">{msg.text}</div>
                </div>
                <div
                  className={`text-[11px] text-[#A2A4A6] ${
                    msg.type === "outgoing" ? "text-right" : "text-left"
                  }`}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E8] px-5 py-4 z-50">
        <div className="max-w-[393px] mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="메시지를 입력하세요"
            className="flex-1 bg-[#F5F6F7] border border-[#E5E6E8] rounded-[20px] px-5 py-3 text-[15px] text-[#191919] placeholder:text-[#A2A4A6] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-3 rounded-full transition-all ${
              input.trim()
                ? "bg-[#2563EB] shadow-md hover:shadow-lg active:scale-95"
                : "bg-[#F5F6F7]"
            }`}
          >
            <Send
              className={`w-5 h-5 ${input.trim() ? "text-white" : "text-[#A2A4A6]"}`}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
