import React from "react"
import type {ScoreBadgeProps} from "../../types/score-badge";

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeColor: string;
  let badgeText: string;

  if (score > 75) {
    badgeColor = "bg-badge-green text-green-600";
    badgeText = "Excellent";
  } else if (score > 50) {
    badgeColor = "bg-badge-yellow text-yellow-600";
    badgeText = "Good";
  } else {
    badgeColor = "bg-badge-red text-red-600";
    badgeText = "Needs Improvement";
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p>{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;