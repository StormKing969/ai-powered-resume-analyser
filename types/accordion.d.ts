import type { ReactNode } from "react";

// -----------------------------
// Accordion Context Type
// -----------------------------

/**
 * Shared context type used by Accordion components.
 * Provides state and control functions for managing open items.
 */
export interface AccordionContextType {
  /** Array of currently active item IDs */
  activeItems: string[];

  /** Toggles the active state of a given item */
  toggleItem: (id: string) => void;

  /** Checks if a given item is currently active */
  isItemActive: (id: string) => boolean;
}

// -----------------------------
// Accordion Root Props
// -----------------------------

/**
 * Props for the root <Accordion /> component.
 */
export interface AccordionProps {
  /** Accordion items to render */
  children: ReactNode;

  /** ID of the item to open by default */
  defaultOpen?: string;

  /** Whether multiple items can be open simultaneously */
  allowMultiple?: boolean;

  /** Optional className for styling the root container */
  className?: string;
}

// -----------------------------
// Accordion Item Props
// -----------------------------

/**
 * Props for each <AccordionItem /> wrapper.
 */
export interface AccordionItemProps {
  /** Unique ID for the item (used for toggling and tracking state) */
  id: string;

  /** Child components (typically header and content) */
  children: ReactNode;

  /** Optional className for styling the item container */
  className?: string;
}

// -----------------------------
// Accordion Header Props
// -----------------------------

/**
 * Props for the clickable <AccordionHeader /> component.
 */
export interface AccordionHeaderProps {
  /** ID of the item this header controls */
  itemId: string;

  /** Header label or content */
  children: ReactNode;

  /** Optional className for styling the header button */
  className?: string;

  /** Optional icon to display (e.g. chevron) */
  icon?: ReactNode;

  /** Position of the icon relative to the label */
  iconPosition?: "left" | "right";
}

// -----------------------------
// Accordion Content Props
// -----------------------------

/**
 * Props for the collapsible <AccordionContent /> component.
 */
export interface AccordionContentProps {
  /** ID of the item this content belongs to */
  itemId: string;

  /** Content to display when the item is active */
  children: ReactNode;

  /** Optional className for styling the content container */
  className?: string;
}