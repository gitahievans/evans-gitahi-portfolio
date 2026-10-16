const variants = {
  primary: "border-accent bg-accent text-accent-foreground hover:not-disabled:opacity-95 active:not-disabled:opacity-90",
  secondary: "border-border-strong bg-surface text-foreground hover:not-disabled:bg-elevated active:not-disabled:bg-background",
  quiet: "border-transparent bg-transparent text-accent hover:not-disabled:bg-elevated active:not-disabled:bg-surface",
} as const;

export type ActionVariant = keyof typeof variants;

export function actionStyles(variant: ActionVariant = "primary", className = "") {
  return [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-control border px-5 py-2.5 text-sm font-medium transition duration-(--duration-micro) ease-calm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  ].join(" ");
}
