import { cn } from "~/lib/utils";

/**
 * Renders an ATS (Applicant Tracking System) score card.
 *
 * Displays a score-based visual indicator and a list of suggestions
 * to help users improve their resume's compatibility with ATS software.
 */
const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        // Base styling for the card container
        "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",

        // Dynamic background color based on score thresholds
        score > 75
          ? "from-green-100"
          : score > 50
            ? "from-yellow-100"
            : "from-red-100",
      )}
    >
      {/* Header section with icon and score */}
      <div className="flex flex-row gap-4 items-center">
        <img
          // Icon changes based on score category
          src={
            score > 75
              ? "/icons/ats-good.svg"
              : score > 50
                ? "/icons/ats-warning.svg"
                : "/icons/ats-bad.svg"
          }
          alt="ATS"
          className="w-10 h-10"
        />
        <p className="text-2xl font-semibold">ATS Score - {score}/100</p>
      </div>

      {/* Description and suggestions section */}
      <div className="flex flex-col gap-2">
        <p className="font-medium text-xl">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-lg text-gray-500">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>

        {/* Render each suggestion with appropriate icon */}
        {suggestions.map((suggestion, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              // Icon based on suggestion type
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="ATS"
              className="w-4 h-4 mr-1"
            />
            <p className="text-lg text-gray-500">{suggestion.tip}</p>
          </div>
        ))}

        {/* Call-to-action for improvement */}
        <p className="text-lg text-gray-500">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;