import { useState, useEffect } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const DEFAULT_HEADING_LEVELS: HeadingLevel[] = ["h1", "h2"];

interface UseCurrentHeadingIdOptions {
  headingLevels?: HeadingLevel[];
}

type HeadingPosition = "in-screen" | "above-screen" | "below-screen";

function useCurrentHeadingId({
  headingLevels = DEFAULT_HEADING_LEVELS,
}: UseCurrentHeadingIdOptions) {
  const [currentHeading, setCurrentHeading] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll(headingLevels.join(", "));
      let bottomHeading: Element | null = null;

      const parsedHeadings = Array.from(headings)
        .filter((heading) => heading.id && heading.id.length > 0)
        .map((heading) => {
          const rect = heading.getBoundingClientRect();
          const position: HeadingPosition =
            rect.bottom >= 0 && rect.bottom <= window.innerHeight
              ? "in-screen"
              : rect.bottom < 0
                ? "above-screen"
                : "below-screen";
          return {
            heading,
            rect,
            position,
          };
        })
        .sort((a, b) => a.rect.bottom - b.rect.bottom);

      const inScreenHeadings = parsedHeadings.filter(
        (heading) => heading.position === "in-screen",
      );

      if (inScreenHeadings.length > 0) {
        // if there are headings in the screen, set the bottommost heading
        bottomHeading = inScreenHeadings[inScreenHeadings.length - 1]!.heading;
      }

      if (inScreenHeadings.length === 0) {
        // if there are no headings in the screen, set the lowest heading above the screen
        const aboveScreenHeadings = parsedHeadings.filter(
          (heading) => heading.position === "above-screen",
        );
        if (aboveScreenHeadings.length > 0) {
          bottomHeading =
            aboveScreenHeadings[aboveScreenHeadings.length - 1]!.heading;
        }
      }

      // for (const heading of parsedHeadings) {
      //   const rect = heading.getBoundingClientRect();
      //   if (rect.bottom >= 0 && rect.bottom <= window.innerHeight) {
      //     bottomHeading = heading;
      //   }
      // }

      if (bottomHeading && bottomHeading.id.length > 0) {
        setCurrentHeading(bottomHeading.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headingLevels]);

  return currentHeading;
}

export default useCurrentHeadingId;
