import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyser" },
    { name: "description", content: "Smart feedback" },
  ];
}

export default function Home() {
  return (
    <main className={"bg-[url('./images/bg-main.svg')] bg-cover"}>
      <Navbar />

      <section className={"main-section"}>
        <div className={"page-heading pb-8"}>
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check the feedback</h2>
        </div>

        {resumes.length > 0 && (
          <div className={"resumes-section"}>
            {resumes.map((resume, index) => (
              <div>
                <ResumeCard key={index} resume={resume} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}