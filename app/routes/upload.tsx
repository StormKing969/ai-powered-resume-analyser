import React, { useState } from "react";
import Navbar from "~/components/Navbar";
import UploadFile from "~/components/UploadFile";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<string>("");
  const [fileState, setFileState] = useState<File | null>(null);

  const handleFileUpload = (file: File | null) => {
    setFileState(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!fileState) return;

    console.log("Form Data:", {
      companyName,
      jobTitle,
      jobDescription,
      file: fileState,
    });
  };

  return (
    <main className={"bg-[url('./images/bg-main.svg')] bg-cover min-h-screen"}>
      <Navbar />

      <section className={"main-section"}>
        <div className={"page-heading py-16"}>
          <h1>Smart feedback</h1>
          {isProcessing ? (
            <>
              <h2>{statusInfo}</h2>
              <img
                src={"./images/resume-scan.gif"}
                alt={"Resume Scan"}
                className={"w-full"}
              />
            </>
          ) : (
            <h2>
              Upload your resume for Improvement Tips and Applicant Tracking
              System score
            </h2>
          )}

          {!isProcessing && (
            <form
              id={"upload-form"}
              onSubmit={handleSubmit}
              className={"flex flex-col gap-4 mt-8"}
            >
              <div className={"form-div"}>
                <label htmlFor={"company-name"}>Company Name</label>
                <input
                  type="text"
                  id={"company-name"}
                  name={"company-name"}
                  placeholder={"Company Name"}
                  required
                />
              </div>

              <div className={"form-div"}>
                <label htmlFor={"job-title"}>Job Title</label>
                <input
                  type="text"
                  id={"job-title"}
                  name={"job-title"}
                  placeholder={"Job Title"}
                  required
                />
              </div>

              <div className={"form-div"}>
                <label htmlFor={"job-description"}>Job Description</label>
                <textarea
                  rows={5}
                  id={"job-description"}
                  name={"job-description"}
                  placeholder={"Job Description"}
                  required
                />
              </div>

              <div className={"form-div"}>
                <label htmlFor={"upload-button"}>Upload your Resume</label>
                <UploadFile onFileSelect={handleFileUpload} />
              </div>

              <button className={"primary-button"} type={"submit"}>
                Analyse Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;