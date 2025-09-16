import NextImage, { ImageProps } from "next/image";
import { baseUrl } from "@/app/sitemap";

export const Image: React.FC<ImageProps> = ({ src, ...rest }) => {
  const normalizedSrc =
    typeof src === "string" && src.startsWith("/")
      ? src.slice(1)
      : (src as string);

  const isDev =
    typeof process !== "undefined" &&
    process.env &&
    process.env.NODE_ENV === "development";

  const finalSrc = isDev ? `/${normalizedSrc}` : `${baseUrl}/${normalizedSrc}`;

  return <NextImage src={finalSrc} {...rest} />;
};
