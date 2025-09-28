import { cn, isImageFile, isVideoFile } from "@/lib/utils";
import { ZoomableContainer } from "../specialized-ui/zoomable-container";
import { Image } from "@/components/image";
import React from "react";
import { AutoMediaVideo } from "./auto-media-video";
import { GLBViewer } from "./glb-viewer";

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
  showProgress = true,
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
  copyright?: string;
}

export const Media = ({
  src,
  alt,
  caption,
  showProgress = true,
  widthPercentage = 100,
  copyright,
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
        <div className="mt-2 flex flex-col justify-between md:flex-row md:items-center">
          {caption && (
            <span className="block text-sm font-normal italic text-foreground/80">
              {caption}
            </span>
          )}
          {copyright && (
            <span className="ml-auto block text-xs font-normal italic text-foreground/80">
              {copyright && `© ${copyright}`}
            </span>
          )}
        </div>
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

interface IFrameProps {
  caption?: string;
  originalUrl?: string;
  hostedPlatform?: string;
  embedUrl: string;
  widthPercentage?: SupportedWidthPercentage;
  height?: number;
  className?: string;
}

const IFrame = ({
  caption,
  originalUrl,
  hostedPlatform,
  embedUrl,
  widthPercentage = 100,
  height = 400,
  className,
}: IFrameProps) => {
  return (
    <div className={cn("mb-6 w-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border/20",
          "transition-all duration-500 hover:shadow-lg",
        )}
        style={{
          width: widthPercentage
            ? getTailwindWidthClass(widthPercentage)
            : "100%",
          height,
        }}
      >
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          allowFullScreen
          className="absolute inset-0"
          title={caption ?? "Embedded content"}
        />
      </div>

      {/* Caption and metadata */}
      <div className="mt-2 flex flex-col justify-between md:flex-row md:items-center">
        {caption && (
          <span className="block text-sm font-normal italic text-foreground/80">
            {caption}
          </span>
        )}
        <div className="flex flex-col text-xs text-foreground/60 md:ml-auto md:text-right">
          {hostedPlatform && (
            <span className="font-medium">Hosted on {hostedPlatform}</span>
          )}
          {originalUrl && (
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-foreground/80"
            >
              View original
            </a>
          )}
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
  GLBViewer,
  IFrame,
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
