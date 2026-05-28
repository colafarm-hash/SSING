import MatchingLoader from "../components/MatchingLoader";

export default function GroupMatchingPhaseA() {
  return (
    <MatchingLoader
      title="비슷한 분들을 찾고 있어요"
      subtitle="비슷한 수준·나이대의 분들과 그룹을 만드는 중이에요"
      conditions={["스키", "초급", "30대"]}
      variant="group"
    />
  );
}
