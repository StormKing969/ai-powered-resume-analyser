// -----------------------------
// Uploaded File Props
// -----------------------------

/**
 * Props for a file upload component.
 * Allows handling of file selection events.
 */
export interface UploadedFile {
  /**
   * Optional callback triggered when a file is selected.
   * Receives the selected File object or `null` if cleared.
   */
  onFileSelect?: (file: File | null) => void;
}