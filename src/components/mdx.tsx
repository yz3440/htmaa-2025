import { slugify } from "@/lib/utils";

// Helper function to safely convert React children to string
const childrenToString = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (typeof children === "number") return children.toString();
  if (Array.isArray(children)) {
    return children.map(childrenToString).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    const element = children as { props?: { children?: React.ReactNode } };
    return childrenToString(element.props?.children);
  }
  return "";
};
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import React from "react";
import basicElements from "./mdx/basic-elements";
import { EmbeddedVideo } from "./mdx/embedded-video";
import { specialElements } from "./mdx/special-elements";
import { Button } from "./ui/button";
import GridSection from "./mdx/grid-section";
import CarouselSection from "./mdx/carousel-section";

function createHeading(level: number, className?: string) {
  const Heading = ({
    children,
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => {
    const slug = slugify(childrenToString(children));
    return React.createElement(
      `h${level}`,
      { id: slug, className: className },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: basicElements.h1,
  h2: basicElements.h2,
  h3: basicElements.h3,
  h4: basicElements.h4,
  h5: createHeading(5),
  h6: createHeading(6),
  blockquote: basicElements.blockquote,
  p: basicElements.p,
  em: basicElements.em,
  strong: basicElements.strong,
  img: basicElements.img,
  hr: basicElements.hr,
  ul: basicElements.ul,
  li: basicElements.li,
  table: basicElements.table,
  thead: basicElements.thead,
  tbody: basicElements.tbody,
  td: basicElements.td,
  th: basicElements.th,
  pre: basicElements.pre,
  code: basicElements.code,
  // Image: RoundedImage,
  a: basicElements.a as React.ElementType,
  // code: Code,
  Button: Button,
  EmbeddedVideo: EmbeddedVideo,
  Media: specialElements.Media,
  MediaTextSection: specialElements.MediaTextSection,
  GridSection: GridSection,
  BulletPoint: specialElements.BulletPoint,
  CarouselSection: CarouselSection,
  GLBViewer: specialElements.GLBViewer,
};

// https://github.com/mdx-js/mdx/blob/v1/packages/mdx/index.js
const DEFAULT_OPTIONS = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [],
  compilers: [],
};
export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: DEFAULT_OPTIONS,
      }}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
