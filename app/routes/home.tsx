import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Resume } from "../../types";
import type { KVItem } from "../../types/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyser" },
    { name: "description", content: "Smart feedback" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const storedResumes = (await kv.list("resume:*", true)) as KVItem[];

      if (!storedResumes) {
        console.error("No resumes found");
        setLoadingResumes(false);
        return;
      }

      const parsedResumes: Resume[] = storedResumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className={"bg-[url('/images/bg-main.svg')] bg-cover min-h-screen"}>
      <Navbar />

      <section className={"main-section"}>
        <div className={"page-heading pb-8"}>
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>No resumes found. Upload a resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check the feedback</h2>
          )}
        </div>

        {loadingResumes && (
          <div className={"flex flex-col items-center justify-center"}>
            <img
              src={"/images/resume-scan-2.gif"}
              alt={"Loading Resume"}
              className={"w-[200px]"}
            />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className={"resumes-section"}>
            {resumes.map((resume) => (
              <div>
                <ResumeCard key={resume.id} resume={resume} />
              </div>
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div
            className={"flex flex-col items-center justify-center mt-10 gap-4"}
          >
            <Link
              to="/upload"
              className={"primary-button w-fit text-xl font-semibold"}
            >
              Upload your first resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}