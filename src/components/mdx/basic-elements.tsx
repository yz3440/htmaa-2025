import { cn, slugify } from "@/lib/utils";
import { Media, UnwrapParagraph } from "./special-elements";
import { Separator } from "../ui/separator";
import { InlineLink } from "../ui/inline-link";

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

function HeadingHighlightSpan({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>) {
  return (
    <span
      className={cn(
        "cursor-pointer border-b-2 border-foreground underline-offset-4 transition-all hover:border-b-2 hover:border-green-500",
        "hover:white-glow-text-md hover:text-green-500",
        "font-condensed hover:blur-[0.5px]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Heading components
 */

const H1 = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const slug = slugify(childrenToString(children));
  return (
    <h1
      className="mb-6 mt-6 select-none text-4xl font-semibold tracking-tight"
      id={slug}
    >
      <a href={`#${slug}`} className="anchor">
        <HeadingHighlightSpan>{children}</HeadingHighlightSpan>
      </a>
    </h1>
  );
};

const H2 = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const slug = slugify(childrenToString(children));
  return (
    <h2
      className="mb-6 mt-6 select-none text-2xl font-semibold tracking-tight"
      id={slug}
    >
      <a href={`#${slug}`} className="anchor">
        <HeadingHighlightSpan>{children}</HeadingHighlightSpan>
      </a>
    </h2>
  );
};

const H3 = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const slug = slugify(childrenToString(children));
  return (
    <h3
      className="mb-6 mt-6 select-none text-xl font-semibold tracking-tight underline-offset-4"
      id={slug}
    >
      <a href={`#${slug}`} className="anchor">
        <HeadingHighlightSpan>{children}</HeadingHighlightSpan>
      </a>
    </h3>
  );
};

const H4 = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const slug = slugify(childrenToString(children));
  return (
    <h4
      className="mb-4 mt-4 select-none text-lg font-semibold tracking-tight underline-offset-4"
      style={{ fontSize: "1.18rem", lineHeight: "1.75rem" }}
      id={slug}
    >
      <a href={`#${slug}`} className="anchor">
        <HeadingHighlightSpan>{children}</HeadingHighlightSpan>
      </a>
    </h4>
  );
};

const H5 = ({ children }: { children: React.ReactNode }) => {
  const slug = slugify(childrenToString(children));
  return (
    <h5 className="mb-3 select-none text-lg font-normal" id={slug}>
      <a href={`#${slug}`} className="anchor">
        <HeadingHighlightSpan>{children}</HeadingHighlightSpan>
      </a>
    </h5>
  );
};

const H6 = ({ children }: { children: React.ReactNode }) => {
  const slug = slugify(childrenToString(children));
  return (
    <h6 className="select-none pt-2 text-xl" id={slug}>
      <a href={`#${slug}`} className="anchor">
        <HeadingHighlightSpan>{children}</HeadingHighlightSpan>
      </a>
    </h6>
  );
};

/**
 * Body components
 */

const BLOCKQUOTE = ({
  children,
}: React.DetailedHTMLProps<
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>) => (
  <blockquote
    className={cn(
      "group mx-2 mb-2 max-w-4xl py-4 pl-6 font-normal transition-all",
      "font-redaction-lg",
      "mb-4",
      "bg-primary-foreground/50 text-foreground/80",
      "border-l-4 border-foreground/30 hover:border-green-500",
      "text-xl",
      "select-none",
    )}
    style={{
      borderTopLeftRadius: "0.2rem",
      borderBottomLeftRadius: "0.2rem",
    }}
  >
    <div
      className={cn(
        "leading-normal transition-all",
        "white-glow-text-md group-hover:white-glow-text-lg",
      )}
    >
      <UnwrapParagraph>{children}</UnwrapParagraph>
    </div>
  </blockquote>
);

const P = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => <p className={`max-w-4xl pb-4 text-base font-normal`}>{children}</p>;

// _XXXX_ (italic) means low-highlight effect
const EM = ({
  children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <span className="low-highlight">{children}</span>
);

// **XXXX** (bold) means low-highlight effect + bold
const STRONG = ({
  children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <span className="font-semibold">{children}</span>
);

/**
 * List components
 */

const UL = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>) => <ul className="font-body list-disc pl-6">{children}</ul>;

const LI = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) => <li className="mb-2">{children}</li>;

const IMG = ({
  src,
  alt,
  title,
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  if (!src) return null;
  return <Media src={src} alt={alt} caption={title} />;
};

const HR = () => <Separator className="my-4"></Separator>;

const CODE = ({
  children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <code className="rounded-md bg-primary-foreground/50 px-1 py-0.5 font-mono text-foreground/80">
    {children}
  </code>
);

const TABLE = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>) => <table className="group mb-4 w-full">{children}</table>;

const THEAD = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) => <thead className="font-condensed round-full">{children}</thead>;

const TBODY = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) => <tbody className="font-condensed">{children}</tbody>;

const TH = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>) => (
  <th className="border border-transparent p-2 transition-colors group-hover:border-green-500">
    <div className="w-auto rounded-full bg-accent/40">{children}</div>
  </th>
);

const TD = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>) => (
  <td className="border border-transparent p-1 transition-colors group-hover:border-green-400">
    <div className="rounded-full bg-accent/10 px-3 py-1">{children}</div>
  </td>
);

const basicElements = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  blockquote: BLOCKQUOTE,
  p: P,
  em: EM,
  ul: UL,
  li: LI,
  strong: STRONG,
  img: IMG,
  hr: HR,
  code: CODE,
  table: TABLE,
  thead: THEAD,
  tbody: TBODY,
  td: TD,
  th: TH,
  a: InlineLink,
};

export default basicElements;
