"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton = ({ text, className }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [text]);

  return (
    <button
      onClick={copyToClipboard}
      className={cn(
        "absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium transition-all",
        "bg-background/80 text-foreground/60 hover:bg-background hover:text-foreground",
        "border border-border/50 hover:border-border",
        "opacity-0 group-hover:opacity-100",
        "backdrop-blur-sm",
        copied && "border-green-500/50 bg-green-500/20 text-green-600",
        className,
      )}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      ) : (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="m5,15 L5,5 A2,2 0 0,1 7,3 L17,3"></path>
        </svg>
      )}
    </button>
  );
};
