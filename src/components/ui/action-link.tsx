import Link from "next/link";
import type { ComponentProps } from "react";
import { actionStyles, type ActionVariant } from "./action-styles";

type ActionLinkProps = ComponentProps<typeof Link> & { variant?: ActionVariant };

export function ActionLink({ variant, className, ...props }: ActionLinkProps) {
  return <Link className={actionStyles(variant, className)} {...props} />;
}
