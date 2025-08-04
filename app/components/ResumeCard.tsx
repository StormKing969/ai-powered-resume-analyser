import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import type { Resume } from "../../types";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, resumeImagePath, jobTitle, feedback },
}: {
  resume: Resume;
}) => {
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const { fs } = usePuterStore();

  useEffect(() => {
    const loadResumes = async () => {
      const blob = await fs.read(resumeImagePath);

      if (!blob) {
        console.error("Resumes image not found");
        return;
      }

      let imageUrl = URL.createObjectURL(blob);
      setResumeUrl(imageUrl);
    };

    loadResumes();
  }, [resumeImagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className={"resume-card animate-in fade-in duration-1000"}
    >
      <div className={"resume-card-header"}>
        <div className={"flex flex-col gap-2"}>
          {companyName && (
            <h2
              className={
                "!text-black font-bold break-words text-center sm:text-left"
              }
            >
              {companyName}
            </h2>
          )}
          {jobTitle && (
            <h3 className={"text-lg break-words text-gray-500"}>{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className={"text-black font-bold"}>Resume</h2>
          )}
        </div>

        <div className={"flex-shrink-0"}>
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className={"gradient-border animate-in fade-in duration-1000"}>
          <div className={"w-full h-full"}>
            <img
              src={resumeUrl}
              alt="Resume"
              className={
                "w-full h-[350px] max-sm:h-[200px] object-cover object-top"
              }
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;