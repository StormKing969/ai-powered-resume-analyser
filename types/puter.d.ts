// -----------------------------
// Filesystem Item Definition
// -----------------------------

/**
 * Represents a file or directory in a virtual filesystem.
 */
export interface FSItem {
  /** Unique identifier for the item */
  id: string;

  /** User ID of the owner */
  uid: string;

  /** Display name of the item */
  name: string;

  /** Full path to the item */
  path: string;

  /** Whether the item is a directory */
  is_dir: boolean;

  /** ID of the parent directory */
  parent_id: string;

  /** UID of the parent directory owner */
  parent_uid: string;

  /** Unix timestamp when the item was created */
  created: number;

  /** Unix timestamp when the item was last modified */
  modified: number;

  /** Unix timestamp when the item was last accessed */
  accessed: number;

  /** Size in bytes (null for directories) */
  size: number | null;

  /** Whether the item is writable by the current user */
  writable: boolean;
}

// -----------------------------
// User Definition
// -----------------------------

/**
 * Represents a user in the system.
 */
export interface PuterUser {
  /** Unique user identifier */
  uuid: string;

  /** Username or handle */
  username: string;
}

// -----------------------------
// Key-Value Store Item
// -----------------------------

/**
 * Represents a key-value pair for configuration or metadata.
 */
export interface KVItem {
  /** Key name */
  key: string;

  /** Associated value */
  value: string;
}

// -----------------------------
// Chat Message Content
// -----------------------------

/**
 * Represents the content of a chat message.
 * Can be plain text or a reference to a file.
 */
export interface ChatMessageContent {
  /** Type of content: either text or file */
  type: "file" | "text";

  /** Optional path to a file in the virtual filesystem */
  puter_path?: string;

  /** Optional text content */
  text?: string;
}

// -----------------------------
// Chat Message
// -----------------------------

/**
 * Represents a single message in a chat conversation.
 */
export interface ChatMessage {
  /** Role of the sender */
  role: "user" | "assistant" | "system";

  /** Message content: plain string or structured array */
  content: string | ChatMessageContent[];
}

// -----------------------------
// Chat Options for AI Interaction
// -----------------------------

/**
 * Options for customizing AI chat behavior.
 */
export interface PuterChatOptions {
  /** Optional model name (e.g. "gpt-4") */
  model?: string;

  /** Whether to stream responses */
  stream?: boolean;

  /** Maximum number of tokens to generate */
  max_tokens?: number;

  /** Temperature setting for randomness (0–2) */
  temperature?: number;

  /** Optional tool definitions for function calling */
  tools?: {
    type: "function";
    function: {
      /** Name of the function */
      name: string;

      /** Description of what the function does */
      description: string;

      /** Parameters schema (currently empty object) */
      parameters: {
        type: string;
        properties: {};
      };
    }[];
  };
}

// -----------------------------
// AI Response Format
// -----------------------------

/**
 * Represents a structured response from an AI model.
 */
export interface AIResponse {
  /** Index of the response in a batch */
  index: number;

  /** Message payload from the AI */
  message: {
    /** Role of the AI (e.g. "assistant") */
    role: string;

    /** Content of the message (string or structured array) */
    content: string | any[];

    /** Optional refusal reason if AI declined to respond */
    refusal: null | string;

    /** Optional annotations (e.g. citations, highlights) */
    annotations: any[];
  };

  /** Log probabilities (if available) */
  logprobs: null | any;

  /** Reason the generation finished (e.g. "stop", "length") */
  finish_reason: string;

  /** Usage metrics for billing or tracking */
  usage: {
    /** Type of usage (e.g. "completion") */
    type: string;

    /** Model used for the response */
    model: string;

    /** Token count or other metric */
    amount: number;

    /** Cost in billing units */
    cost: number;
  }[];

  /** Whether the response came via an AI chat service */
  via_ai_chat_service: boolean;
}