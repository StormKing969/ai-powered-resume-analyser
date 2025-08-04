import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  {
    title: "Resume Review",
  },
  {
    name: "description",
    content: "View resume feedback and ATS score",
  },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResumeData = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) {
        console.error("Resume not found");
        return;
      }

      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumeFilePath);

      if (!resumeBlob) {
        console.error("Resume file not found");
        return;
      }

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);
      const imageBlob = await fs.read(data.resumeImagePath);

      if (!imageBlob) {
        console.error("Resume image not found");
        return;
      }

      const imageUrl = URL.createObjectURL(
        new Blob([imageBlob], { type: "image/png" }),
      );
      setImageUrl(imageUrl);
      setFeedback(data.feedback || "No feedback available");
    };

    loadResumeData();
  }, [id]);

  return (
    <main className={"!pt-0"}>
      <nav className={"resume-nav"}>
        <Link to={"/"} className={"back-button"}>
          <img
            src={"/icons/back.svg"}
            alt={"Back Arrow"}
            className={"w-2.5 h-2.5"}
          />
          <span className={"text-gray-800 text-sm font-semibold"}>
            Back to Homepage
          </span>
        </Link>
      </nav>

      <div className={"flex flex-row w-full max-lg:flex-col-reverse"}>
        <section
          className={
            "feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center"
          }
        >
          {imageUrl && resumeUrl && (
            <div
              className={
                " animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit"
              }
            >
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                <img
                  src={imageUrl}
                  alt={"Resume Preview"}
                  className={
                    "w-full h-full object-contain rounded-2xl shadow-lg"
                  }
                />
              </a>
            </div>
          )}
        </section>

        <section className={"feedback-section"}>
          <h2 className={"text-4xl !text-black font-bold"}>Resume Review</h2>
          {feedback ? (
            <div className={"flex flex-col gap-8 animate-in fade-in duration-1000"}>
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src={"/images/resume-scan-2.gif"} alt={"Resume Scan"} className={"w-full"} />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;