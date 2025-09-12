import { cn, isImageFile, isVideoFile } from "@/lib/utils";
import { ZoomableContainer } from "../specialized-ui/zoomable-container";
import Image from "next/image";
import ImageWithBlur from "../dynamic/image-with-blur";
import React from "react";
import ReactPlayer from "react-player";
import { AutoMediaVideo } from "./auto-media-video";

type SupportedWidthPercentage = 50 | 33 | 25 | 100 | 66 | 75;

const getTailwindWidthClass = (widthPercentage: SupportedWidthPercentage) => {
  switch (widthPercentage) {
    case 50:
      return "md:w-1/2";
    case 75:
      return "md:w-3/4";
    case 100:
      return "md:w-full";
    case 66:
      return "md:w-2/3";
    case 33:
      return "md:w-1/3";
    case 25:
      return "md:w-1/4";
    default:
      return "md:w-full";
  }
};

const SubHeading = ({
  children,
  h = 1,
}: {
  children: React.ReactNode;
  h?: number;
}) => (
  <p
    className={cn(
      `text-lg font-semibold text-zinc-700`,
      h === 1 && "-mt-4 mb-6",
      h === 2 && "-mt-2 mb-4",
      h === 3 && "mb-2",
    )}
    style={{ fontSize: "1.18rem", lineHeight: "1.75rem" }}
  >
    → {children}
  </p>
);

interface AutoMediaProps {
  src: string;
  alt?: string;
  noGlow?: boolean;
  noZoom?: boolean;
  showProgress?: boolean;
  caption?: string;
  widthPercentage?: SupportedWidthPercentage;
  className?: string;
}

const AutoMedia = ({
  src,
  alt,
  showProgress = false,
  noGlow = false,
  noZoom = false,
  className,
}: AutoMediaProps) => {
  let mediaElement: React.ReactNode = null;

  if (isVideoFile(src)) {
    mediaElement = (
      <AutoMediaVideo
        src={src}
        showProgress={showProgress}
        className={className}
      />
    );
  }

  if (isImageFile(src)) {
    mediaElement = (
      <Image
        className={cn(
          `w-full rounded-lg object-cover`,
          !noGlow && "glow-on-hover",
          "select-none",
          "pointer-events-none",
          className,
        )}
        src={src}
        alt={alt ?? ""}
        width={1080}
        height={1080}
        draggable={false}
        loading="eager"
      />
    );
  }

  if (!mediaElement) return null;

  if (!noZoom)
    mediaElement = <ZoomableContainer>{mediaElement}</ZoomableContainer>;

  return mediaElement;
};

interface MediaProps extends AutoMediaProps {
  asSpan?: boolean;
  caption?: string;
  widthPercentage?: SupportedWidthPercentage;
  showProgress?: boolean;
}

export const Media = ({
  src,
  alt,
  caption,
  showProgress = false,
  widthPercentage = 100,
  asSpan = true,
  ...props
}: MediaProps) => {
  if (caption && !alt) alt = caption;
  const Wrapper = asSpan ? "span" : "section";

  return (
    <Wrapper
      className={cn("block", "@container/media", "m-auto px-0", "w-full")}
    >
      <span
        className={cn(
          "block h-full w-full overflow-hidden",
          "transition-all duration-500",
          "hover:-rotate-[0.5deg] hover:scale-[102%]",
          widthPercentage ? `m-auto` : "md:w-full",
          widthPercentage ? getTailwindWidthClass(widthPercentage) : "",
          "rounded-lg",
          `pb-2`,
          `@md/media:pb-6 @md/media:pt-2`,
        )}
      >
        {/* give room for hover effect, overflow-hidden to prevent layout shift */}
        <AutoMedia src={src} alt={alt} showProgress={showProgress} {...props} />
        {caption && (
          <span className="mt-2 block text-sm font-normal italic text-foreground/80">
            {caption}
          </span>
        )}
      </span>
    </Wrapper>
  );
};

interface MediaTextSectionProps extends MediaProps {
  children: React.ReactNode;
  showProgress?: boolean;
  mediaPosition?: "left" | "right";
  textPosition?: "top" | "bottom";
  mediaWidth?: "narrow" | "normal" | "wide";
}

const MediaTextSection = ({
  src,
  alt,
  caption,
  showProgress = false,
  mediaPosition = "left",
  textPosition = "top",
  mediaWidth = "normal",
  children,
}: MediaTextSectionProps) => {
  const mediaDescription = (
    <div
      className={cn(
        `font-condensed col-span-5 pt-4 lg:pt-0`,
        textPosition === "bottom" && "mt-auto",
        mediaWidth === "wide" && "col-span-3",
        mediaWidth === "narrow" && "col-span-8",
      )}
    >
      <figcaption className="text-base font-medium">{caption}</figcaption>
      <div className="font-body pt-2 text-base font-normal italic text-foreground/70">
        <UnwrapParagraph>{children}</UnwrapParagraph>
      </div>
    </div>
  );

  return (
    <section
      className={cn(
        `flex`,
        mediaPosition === "right" ? "flex-col-reverse" : "flex-col",
        "mb-8 mt-6 gap-0 px-0 lg:grid lg:grid-cols-12 lg:gap-8",
      )}
    >
      {/* if position is NOT "right" */}
      {mediaPosition === "right" && mediaDescription}

      {/* image */}
      <div
        className={cn(
          `col-span-7 pt-4 md:pt-0`,
          mediaWidth === "wide" && "col-span-9",
          mediaWidth === "narrow" && "col-span-4",
          "transition-all duration-700 hover:-rotate-[0.5deg] hover:scale-[102%]",
        )}
      >
        <Media src={src} alt={alt} showProgress={showProgress} />
      </div>

      {/* if position is "right" */}
      {mediaPosition !== "right" && mediaDescription}
    </section>
  );
};

interface BulletPointProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  mediaSrc?: string;
  emoji?: string;
  bgColor?: string;
  textColor?: string;
}

const BulletPoint = ({
  children,
  title,
  emoji,
  className,
  mediaSrc,
  style,
  bgColor,
  textColor,
  ...props
}: BulletPointProps) => {
  const media = mediaSrc ? <AutoMedia src={mediaSrc} /> : null;

  return (
    <div className="flex flex-col gap-0 rounded-lg bg-foreground/90">
      {media}
      <div
        className={cn(
          `col-span-1 row-span-1 flex flex-row rounded-lg p-4 leading-snug text-background`,
          "glow-on-hover",
          className,
        )}
        style={{
          backgroundColor: bgColor ?? undefined,
          boxShadow: `0 0 16px 0px ${bgColor ?? "white"}`,
          color: textColor ?? undefined,
          ...style,
        }}
        {...props}
      >
        {emoji && <span className="mr-2">{emoji}</span>}
        <div>
          {title && <h3 className="font-condensed font-bold">{title}</h3>}
          <p className="font-body font-condensed text-base">
            <UnwrapParagraph>{children}</UnwrapParagraph>
          </p>
        </div>
      </div>
    </div>
  );
};

export const specialElements = {
  SubHeading,
  Media,
  MediaTextSection,
  BulletPoint,
};

//
// MARK: HELPERS
//
export function UnwrapParagraph({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  // children could be a list of elements
  // we need to unwrap the paragraph element
  // and return the children
  // but first, we need to filter out empty text nodes and newlines
  let filteredChildren: React.ReactNode = React.Children.toArray(
    children,
  ).filter((child: React.ReactNode) => {
    if (typeof child === "string") {
      return child.trim() !== "";
    }
    return true;
  });

  // if the filtered children only has one element, return it directly
  if (Array.isArray(filteredChildren) && filteredChildren.length === 1) {
    filteredChildren = filteredChildren[0] as React.ReactNode;
  }

  if (
    React.isValidElement(filteredChildren) &&
    typeof filteredChildren.type === "function" &&
    (filteredChildren.type.name === "P" || filteredChildren.type.name === "p")
  ) {
    return (
      <>{(filteredChildren.props as { children: React.ReactNode }).children}</>
    );
  }

  return <>{filteredChildren}</>;
}
