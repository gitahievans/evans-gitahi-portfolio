import type { HTMLAttributes } from "react";

export function Badge({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex rounded-full border border-border bg-elevated px-3 py-1 text-xs font-medium text-secondary ${className}`} {...props} />;
}
