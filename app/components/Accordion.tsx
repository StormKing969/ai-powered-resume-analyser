import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";
import type {
  AccordionContentProps,
  AccordionContextType,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionProps,
} from "../../types/accordion";

// -----------------------------
// Accordion Context Definition
// -----------------------------

/**
 * Context for managing active accordion items.
 * Provides toggle and query functions to child components.
 */
const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

/**
 * Hook to access Accordion context.
 * Throws an error if used outside of <Accordion />.
 */
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

// -----------------------------
// Accordion Root Component
// -----------------------------

/**
 * Root Accordion component.
 *
 * Provides context for managing open/closed state of items.
 * Supports single or multiple open items via `allowMultiple`.
 */
export const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultOpen,
  allowMultiple = false,
  className = "",
}) => {
  // Initialize active items with default open ID if provided
  const [activeItems, setActiveItems] = useState<string[]>(
    defaultOpen ? [defaultOpen] : [],
  );

  /**
   * Toggles an item's active state.
   * Handles both single and multiple open modes.
   */
  const toggleItem = (id: string) => {
    setActiveItems((prev) => {
      if (allowMultiple) {
        // Toggle item in multi-select mode
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        // Toggle item in single-select mode
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  /**
   * Checks if a given item is currently active.
   */
  const isItemActive = (id: string) => activeItems.includes(id);

  return (
    <AccordionContext.Provider
      value={{ activeItems, toggleItem, isItemActive }}
    >
      {/* Container for accordion items */}
      <div className={`space-y-2 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

// -----------------------------
// Accordion Item Component
// -----------------------------

/**
 * Wrapper for each accordion item.
 * Used for layout and styling; does not manage state directly.
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  children,
  className = "",
}) => {
  return (
    <div className={`overflow-hidden border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// -----------------------------
// Accordion Header Component
// -----------------------------

/**
 * Clickable header for an accordion item.
 * Toggles the item's active state and displays an optional icon.
 */
export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  itemId,
  children,
  className = "",
  icon,
  iconPosition = "right",
}) => {
  const { toggleItem, isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  // Default chevron icon with rotation based on active state
  const defaultIcon = (
    <svg
      className={cn("w-5 h-5 transition-transform duration-200", {
        "rotate-180": isActive,
      })}
      fill="none"
      stroke="#98A2B3"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const handleClick = () => {
    toggleItem(itemId);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full px-4 py-3 text-left
        focus:outline-none
        transition-colors duration-200 flex items-center justify-between cursor-pointer
        ${className}
      `}
    >
      {/* Left-aligned icon and label */}
      <div className="flex items-center space-x-3">
        {iconPosition === "left" && (icon || defaultIcon)}
        <div className="flex-1">{children}</div>
      </div>

      {/* Right-aligned icon if specified */}
      {iconPosition === "right" && (icon || defaultIcon)}
    </button>
  );
};

// -----------------------------
// Accordion Content Component
// -----------------------------

/**
 * Content section of an accordion item.
 * Expands or collapses based on active state.
 */
export const AccordionContent: React.FC<AccordionContentProps> = ({
  itemId,
  children,
  className = "",
}) => {
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isActive ? "max-h-fit opacity-100" : "max-h-0 opacity-0"}
        ${className}
      `}
    >
      {/* Inner content with padding */}
      <div className="px-4 py-3">{children}</div>
    </div>
  );
};