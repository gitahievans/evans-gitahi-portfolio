import type { ButtonHTMLAttributes } from "react";
import { actionStyles, type ActionVariant } from "./action-styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ActionVariant };

export function Button({ variant, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={actionStyles(variant, className)} {...props} />;
}
