import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Converts a size in bytes to a human-readable string with appropriate units.
 *
 * Supports conversion to Bytes, KB, MB, GB, and TB. Automatically selects the
 * most appropriate unit based on the input size.
 *
 * @param bytes - The size in bytes to be converted.
 * @returns A formatted string representing the size in Bytes, KB, MB, GB, or TB.
 *
 * @example
 * formatSize(1024);        // "1.00 KB"
 * formatSize(1048576);     // "1.00 MB"
 * formatSize(0);           // "0 Bytes"
 */
export function formatSize(bytes: number): string {
  const units = ["Bytes", "KB", "MB", "GB", "TB"];

  // Handle edge case for zero bytes
  if (bytes === 0) return "0 Bytes";

  // Determine appropriate unit index using logarithmic scaling
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  // Convert bytes to the selected unit
  const size = bytes / Math.pow(1024, i);

  // Format to two decimal places and append unit
  return `${size.toFixed(2)} ${units[i]}`;
}

/**
 * Generates a cryptographically secure UUID (version 4).
 *
 * Uses the browser's native crypto API for secure random generation.
 *
 * @returns A UUID string in the format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".
 *
 * @example
 * generateUUID(); // "3f29c7d2-8e4f-4c3a-bf1e-9a2e8f7c6d1a"
 */
export const generateUUID = (): string => {
  return crypto.randomUUID();
};

/**
 * Composes and merges class names using clsx and tailwind-merge.
 *
 * Accepts conditional class names, arrays, and objects. Automatically resolves
 * Tailwind CSS class conflicts (e.g. "p-2" vs "p-4").
 *
 * @param inputs - A variadic list of class values (strings, arrays, objects).
 * @returns A single merged class name string.
 *
 * @example
 * cn("bg-red-500", "text-white", { hidden: false }); // "bg-red-500 text-white"
 * cn("p-2", "p-4"); // "p-4" (tailwind-merge resolves conflict)
 */
export function cn(...inputs: ClassValue[]) {
  // clsx handles conditional logic; twMerge resolves Tailwind conflicts
  return twMerge(clsx(inputs));
}