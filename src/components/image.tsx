import NextImage, { ImageProps } from "next/image";

const basePath = "https://fab.cba.mit.edu/classes/863.25/people/YufengZhao";

export const Image: React.FC<ImageProps> = ({ src, ...rest }) => {
  const normalizedSrc =
    typeof src === "string" && src.startsWith("/")
      ? src.slice(1)
      : (src as string);

  const isDev =
    typeof process !== "undefined" &&
    process.env &&
    process.env.NODE_ENV === "development";

  const finalSrc = isDev ? `/${normalizedSrc}` : `${basePath}/${normalizedSrc}`;

  return <NextImage src={finalSrc} {...rest} />;
};
