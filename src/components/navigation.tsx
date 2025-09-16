"use client";

import { InlineLink } from "@/components/ui/inline-link";
import useCurrentHeadingId from "@/hooks/useCurrentHeadingId";
import { type TableOfContents } from "@/lib/mdx/parser";
import { cn } from "@/lib/utils";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { type LayoutContext } from "@/components/layout";
import { ExternalLinkIcon } from "lucide-react";

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tableOfContents?: TableOfContents;
  layoutContext?: LayoutContext;
}

type NavigationItem = {
  title: string;
  href: string;
  children?: NavigationItem[];
  className?: string;
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: "everything",
    href: "/",
    className: "cursor-zoom-out",
  },
  {
    title: "website",
    href: "https://yufengzhao.com",
    className: "cursor-help",
  },
  {
    title: "github",
    href: "https://github.com/yz3440",
    className: "cursor-help",
  },
];

export function Navigation({
  layoutContext,
  tableOfContents,
  className,
  ...props
}: NavigationProps) {
  const pathname = usePathname();

  const HeadingTag = layoutContext === "home" ? "h1" : "div";

  const currentHeadingId = useCurrentHeadingId({
    headingLevels: ["h2"],
  });

  return (
    <nav
      className={cn("flex h-full flex-col justify-between", className)}
      {...props}
    >
      <section>
        <HeadingTag className="font-condensed text-lg font-bold">
          <Link href="/">
            How to Make Almost Anything <br className="hidden md:block" />{" "}
            <span className="font-normal">with</span> Yufeng Zhao
          </Link>
        </HeadingTag>
        <p className="font-condensed mt-2 text-foreground/60">
          a documentation blog about making things in{" "}
          <Link
            href="https://fab.cba.mit.edu/classes/MAS.863/"
            target="_blank"
            className="underline"
          >
            HTMAA 2025
          </Link>
        </p>

        <div className="font-condensed mt-2 grid grid-cols-3 md:grid-cols-1">
          {NAVIGATION_ITEMS.map((item) => (
            <div key={item.title} className={cn("mt-2")}>
              <InlineLinkWithHighlight
                currentPath={pathname}
                href={item.href}
                className={item.className}
              >
                {item.title}
              </InlineLinkWithHighlight>
              {item.children && (
                <div className="ml-2 mt-2 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <InlineLinkWithHighlight
                      key={child.title}
                      currentPath={pathname}
                      href={child.href}
                    >
                      {child.title}
                    </InlineLinkWithHighlight>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {tableOfContents && (
        <ul className="font-condensed mt-2 hidden text-right md:block">
          {tableOfContents
            .filter((item) => item.level === 2)
            .map((item) => {
              const isCurrent = currentHeadingId === item.slug;
              return (
                <li key={item.slug} className="mt-1 tracking-tight">
                  <InlineLink
                    href={`#${item.slug}`}
                    className={cn(
                      "text-foreground/40 no-underline",
                      isCurrent && "font-bold text-foreground",
                    )}
                  >
                    {item.text}
                  </InlineLink>
                </li>
              );
            })}
        </ul>
      )}
    </nav>
  );
}

function InlineLinkWithHighlight({
  currentPath,
  href,
  children,
  className,
}: {
  currentPath: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const shouldTargetBlank = href.startsWith("http");
  return (
    <InlineLink
      href={href}
      target={shouldTargetBlank ? "_blank" : "_self"}
      className={cn(
        currentPath === href && "font-bold text-green-500",
        "group",
        className,
      )}
    >
      {children}
      {shouldTargetBlank && (
        <ExternalLinkIcon className="ml-1 inline size-3 text-foreground/60 group-hover:text-green-500 group-hover:no-underline group-hover:blur-[0.5px]" />
      )}
    </InlineLink>
  );
}
