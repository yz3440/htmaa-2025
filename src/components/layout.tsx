import Link from "next/link";
// import { Link } from "next-view-transitions";
import BlurryCursorOverlay from "@/components/specialized-ui/blurry-cursor-overlay";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { InlineLink } from "@/components/ui/inline-link";
import { Button } from "@/components/ui/button";
import { type TableOfContents } from "@/lib/mdx/parser";
export type LayoutContext = "home" | "project-detail";
import { Navigation } from "@/components/navigation";
import BackgroundElement from "./three/background-element";
import { Suspense } from "react";
import DraggableEasterEgg from "./specialized-ui/draggable-easter-egg";

interface LayoutProps {
  children: React.ReactNode;
  layoutContext?: LayoutContext;
  tableOfContents?: TableOfContents;
}

export default function Layout({
  children,
  layoutContext = "home",
  tableOfContents,
}: LayoutProps) {
  return (
    <div className="m-auto flex flex-col md:block md:max-w-7xl">
      {/* Decorations */}

      {/* BOTTOM RIGHT */}
      {/* <div
        className="fixed bottom-0 right-0 z-10 h-36 w-36 translate-x-1/2 translate-y-1/2 rounded-full transition-all hover:scale-150 hover:bg-blue-500 lg:h-64 lg:w-64"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(25,25,25,0) 65%, rgba(25,25,25,0) 70%)",
        }}
      ></div> */}
      <Suspense fallback={null}>
        <DraggableEasterEgg className="fixed bottom-0 right-0 z-10 h-36 w-36 translate-x-1/2 translate-y-1/2 rounded-full transition-all hover:scale-150 hover:bg-blue-500 lg:h-64 lg:w-64" />
      </Suspense>

      {/* TOP LEFT */}
      <div
        className="fixed left-0 top-0 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all hover:scale-150 hover:bg-blue-500 lg:h-96 lg:w-96"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(25,25,25,0) 65%, rgba(25,25,25,0) 70%)",
        }}
      ></div>

      <div
        className={cn(
          `md:border-r-22 mr-auto w-full border-r-0 border-dashed border-black transition-all md:fixed md:h-full md:p-6 md:py-6`,
          "md:w-64 lg:w-80",
          // layoutContext === "project-detail"
          //   ? "md:w-48 lg:w-64"
          //   : "md:w-64 lg:w-80",
          "px-6 pt-6 md:px-6",
        )}
      >
        <Navigation
          layoutContext={layoutContext}
          tableOfContents={tableOfContents}
          className={cn(
            // dim the navigation when in project detail page
            layoutContext === "project-detail" &&
              "opacity-80 transition-all hover:opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 right-0 -z-20 hidden h-12 w-6 translate-x-full translate-y-1/2 transition-all hover:h-[256rem] md:block",
          )}
        ></div>
        {/* <div className="translate-x- absolute bottom-0 right-0 -z-20 hidden h-12 w-6 translate-y-1/2 bg-white transition-all hover:w-[128rem] md:block"></div> */}
      </div>

      <main
        className={cn(
          "col-start-4 w-full transition-all md:ml-auto md:w-auto",
          "md:ml-64 lg:ml-80",
          // layoutContext === "project-detail"
          //   ? "md:ml-48 lg:ml-64"
          //   : "md:ml-64 lg:ml-80",
          "mb-16 px-4 md:px-6",
          "pt-6",
        )}
        id="main"
      >
        {children}
        <BackToTopButton />
      </main>

      {/* <div className="z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {allProjects.map((project) => (
            <ProjectCard
              metadata={project.metadata}
              slug={project.slug}
              key={project.slug}
            />
          ))}
        </div> */}
      <Suspense fallback={null}>
        <BlurryCursorOverlay />
      </Suspense>
    </div>
  );
}

function BackToTopButton() {
  return (
    <>
      <Link
        className="fixed bottom-4 left-4 z-10 block h-10 w-10 cursor-pointer transition-all md:hidden md:h-6 md:w-6 md:cursor-default md:text-black md:hover:-rotate-90 md:hover:scale-150"
        href="#"
        scroll={true}
        aria-label="back to top"
      >
        <span className="sr-only">Back to top</span>
        <Button
          className="flex h-full w-full items-center justify-center font-bold"
          size="sm"
          lighting="convex-sm"
        >
          <ArrowUp size={24} />
        </Button>
      </Link>

      <div className={`mb-0 mt-8 hidden justify-center md:flex`}>
        <InlineLink href="#" scroll={true} className="font-bold">
          <span className="sr-only">Back to top</span>
          <Button
            size="sm"
            lighting="convex-sm"
            className="group gap-1 transition-all"
            aria-label="back to top"
          >
            <div className="translate-y-[1px]">
              <ArrowUp size={12} className="my-auto group-hover:animate-spin" />
            </div>
            <div className="group-hover:white-glow-text-md my-auto underline group-hover:text-yellow-300 group-hover:no-underline">
              back to top
            </div>

            <div className="translate-y-[1px]">
              <ArrowUp size={12} className="my-auto group-hover:animate-spin" />
            </div>
          </Button>
        </InlineLink>
      </div>
    </>
  );
}
