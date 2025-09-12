import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type LinkProps } from "next/link";
import Link from "next/link";
// import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";

const inlineLinkVariants = cva(
  "underline hover:text-green-400 hover:no-underline hover:blur-[0.5px] underline-offset-2",
  {
    variants: {
      variant: {
        default: "hover:white-glow-text-md transition-all duration-200",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface InlineLinkProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof inlineLinkVariants>,
    LinkProps {
  asChild?: boolean;
  target?: string;
}

const InlineLink = React.forwardRef<HTMLAnchorElement, InlineLinkProps>(
  ({ className, variant, href, size, asChild = false, ...props }, ref) => {
    const shouldTargetBlank =
      typeof href === "string" && href.startsWith("http");

    return (
      <Link
        href={href}
        className={cn(inlineLinkVariants({ variant, size, className }))}
        ref={ref}
        target={shouldTargetBlank ? "_blank" : ""}
        {...props}
      />
    );
  },
);
InlineLink.displayName = "Link";

export { InlineLink, inlineLinkVariants };
