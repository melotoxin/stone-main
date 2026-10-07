import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SurfaceProps = {
  children: ReactNode;
  variant?: "light" | "dark";
  arrow?: boolean;
  compact?: boolean;
  "data-testid"?: string;
};

export type MarbleButtonProps = SurfaceProps &
  (
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  );

/** Photographed stone, shared by navigation, enquiry and editorial CTAs. */
export function MarbleButton({
  variant = "light",
  arrow = true,
  compact = false,
  children,
  className,
  ...props
}: MarbleButtonProps) {
  const classes = cn(
    "marble-button",
    `marble-button--${variant}`,
    compact && "marble-button--compact",
    className,
  );
  const content = (
    <>
      <span className="marble-button__polish" aria-hidden="true" />
      <span className="marble-button__label">{children}</span>
      {arrow && (
        <ArrowRight
          className="marble-button__arrow"
          size={20}
          strokeWidth={1.4}
          aria-hidden="true"
        />
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    return (
      <Link
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement> & {
          href: string;
        })}
        className={classes}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
    >
      {content}
    </button>
  );
}
