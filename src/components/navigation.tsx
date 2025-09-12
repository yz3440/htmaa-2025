"use client";

import { InlineLink } from "@/components/ui/inline-link";
import useCurrentHeadingId from "@/hooks/useCurrentHeadingId";
import { type TableOfContents } from "@/lib/mdx/parser";
import { cn } from "@/lib/utils";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { type LayoutContext } from "@/components/layout";

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
  { title: "featured", href: "/featured", className: "cursor-zoom-in" },
  { title: "about", href: "/about", className: "cursor-help" },
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

  const nameHref = pathname === "/" ? "/about" : "/";

  return (
    <nav
      className={cn("flex h-full flex-col justify-between", className)}
      {...props}
    >
      <section>
        <HeadingTag className="font-condensed text-lg font-bold">
          <InlineLink href={nameHref}>
            Yufeng Zhao
            <span className="sr-only">
              {" "}
              is a media artist and technologist based in Brooklyn.
            </span>
          </InlineLink>
        </HeadingTag>
        <p className="font-condensed mt-2">
          <span className="cursor-help transition-all duration-500 hover:line-through">
            media artist
          </span>{" "}
          /{" "}
          <span className="cursor-progress transition-all duration-500 hover:line-through">
            technologist
          </span>
        </p>
        <p className="font-condensed mt-0 text-foreground/60">
          <span className="cursor-zoom-in transition-all duration-500 hover:line-through">
            data
          </span>{" "}
          /{" "}
          <span className="cursor-context-menu transition-all duration-500 hover:line-through">
            graphics
          </span>{" "}
          /{" "}
          <span className="cursor-alias transition-all duration-500 hover:line-through">
            experience
          </span>
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
  return (
    <InlineLink
      href={href}
      className={cn(
        currentPath === href && "font-bold text-yellow-300",
        className,
      )}
    >
      {children}
    </InlineLink>
  );
}
