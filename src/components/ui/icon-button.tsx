import type { ButtonHTMLAttributes } from "react";

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
  label: string;
};

export function IconButton({ label, className = "", type = "button", children, ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-border-strong bg-surface text-foreground transition-colors duration-(--duration-micro) ease-calm hover:enabled:bg-elevated active:enabled:bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
