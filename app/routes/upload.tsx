import React, { useState } from "react";
import Navbar from "~/components/Navbar";
import UploadFile from "~/components/UploadFile";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<string>("");
  const [haveFile, setHaveFile] = useState<File | null>(null);

  const handleFileUpload = (file: File | null) => {
    setHaveFile(file);
  };

  const handleAnalyseResume = async ({
    companyName,
    jobTitle,
    jobDescription,
    haveFile,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    haveFile: File;
  }) => {
    setIsProcessing(true);
    setStatusInfo("Uploading your file...");
    const uploadedFile = await fs.upload([haveFile]);

    if (!uploadedFile) {
      setIsProcessing(false);
      return setStatusInfo("Failed to upload file. Please try again.");
    }

    setStatusInfo("Converting to image...");
    const imageFile = await convertPdfToImage(haveFile);

    if (!imageFile.file) {
      setIsProcessing(false);
      console.log(imageFile.error)
      return setStatusInfo("Failed to convert PDF to image. Please try again.");
    }

    setStatusInfo("Uploading image...");
    const uploadedImage = await fs.upload([imageFile.file]);

    if (!uploadedImage) {
      setIsProcessing(false);
      return setStatusInfo("Failed to upload image. Please try again.");
    }

    setStatusInfo("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      companyName,
      jobTitle,
      jobDescription,
      resumeFile: uploadedFile.path,
      resumeImage: uploadedImage.path,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusInfo("Analyzing your resume...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ companyName, jobTitle, jobDescription }),
    );

    if (!feedback) {
      setIsProcessing(false);
      return setStatusInfo("Failed to analyze resume. Please try again.");
    }

    const feedbackData =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;
    data.feedback = JSON.parse(feedbackData);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusInfo("Analysis complete! You can now view your feedback.");
    setIsProcessing(false);

    console.log("Resume Analysis Data:", data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!haveFile) return;

    handleAnalyseResume({ companyName, jobTitle, jobDescription, haveFile });
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