// -----------------------------
// Job Definition
// -----------------------------

/**
 * Represents a job listing or opportunity.
 */
export interface Job {
  /** Title of the job (e.g. "Frontend Engineer") */
  title: string;

  /** Full job description or responsibilities */
  description: string;

  /** Location of the job (e.g. "Remote", "Austin, TX") */
  location: string;

  /** Skills required for the role */
  requiredSkills: string[];
}

// -----------------------------
// Resume Definition
// -----------------------------

/**
 * Represents a candidate's resume and its associated feedback.
 */
export interface Resume {
  /** Unique identifier for the resume */
  id: string;

  /** Optional company name associated with the resume */
  companyName?: string;

  /** Optional job title the resume is targeting */
  jobTitle?: string;

  /** Path to the resume preview image (e.g. thumbnail) */
  imagePath: string;

  /** Path to the actual resume file (e.g. PDF) */
  resumePath: string;

  /** Feedback object containing scores and improvement tips */
  feedback: Feedback;
}

// -----------------------------
// Feedback Definition
// -----------------------------

/**
 * Structured feedback for a resume, including scores and tips.
 */
export interface Feedback {
  /** Overall score across all categories */
  overallScore: number;

  /** ATS (Applicant Tracking System) compatibility feedback */
  ATS: {
    /** Score for ATS compatibility */
    score: number;

    /** Tips for improving or affirming ATS performance */
    tips: {
      /** Whether the tip is positive or needs improvement */
      type: "good" | "improve";

      /** Tip content or suggestion */
      tip: string;
    }[];
  };

  /** Tone and style feedback (e.g. professionalism, clarity) */
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;

      /** Explanation for why the tip matters */
      explanation: string;
    }[];
  };

  /** Content feedback (e.g. relevance, completeness) */
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };

  /** Structure feedback (e.g. layout, readability) */
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };

  /** Skills feedback (e.g. alignment with job requirements) */
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
}