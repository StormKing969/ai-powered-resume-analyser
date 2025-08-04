import React from "react";
import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Criteria = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score >= 75
      ? "text-green-600"
      : score >= 50
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className={"resume-summary"}>
      <div className={"criteria"}>
        <div className={"flex flex-row gap-2 items-center justify-center"}>
          <p className={"text-2xl"}>{title}</p>
          <ScoreBadge score={score} />
        </div>

        <p className={"text-2xl"}>
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className={"bg-white rounded-2xl shadow-md w-full"}>
      <div className={"flex flex-row items-center p-4 gap-8"}>
        <ScoreGauge score={feedback.overallScore} />

        <div className={"flex flex-col gap-2"}>
          <h2 className={"text-2xl font-bold"}>Your Score</h2>
          <p className={"text-sm text-gray-500"}>
            This score is based on the following criteria:
          </p>
        </div>
      </div>

      <Criteria title={"Tone & Style"} score={feedback.toneAndStyle.score} />
      <Criteria title={"Content"} score={feedback.content.score} />
      <Criteria title={"Structure"} score={feedback.structure.score} />
      <Criteria title={"Skills"} score={feedback.skills.score} />
    </div>
  );
};

export default Summary;