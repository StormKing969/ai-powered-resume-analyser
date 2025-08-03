/**
 * Converts a size in bytes to a human-readable string with appropriate units.
 *
 * @param {number} bytes - The size in bytes to be converted.
 * @returns {string} A formatted string representing the size in Bytes, KB, MB, GB, or TB.
 *
 * @example
 * formatSize(1024); // Returns "1.00 KB"
 * formatSize(1048576); // Returns "1.00 MB"
 * formatSize(0); // Returns "0 Bytes"
 */
export function formatSize(bytes: number): string {
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);

  return `${size.toFixed(2)} ${units[i]}`;
}

export const generateUUID = (): string => {
  return crypto.randomUUID();
};