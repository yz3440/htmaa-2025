import NextImage, { ImageProps } from "next/image";
import { env } from "@/env.js";

export const Image: React.FC<ImageProps> = ({ src, ...rest }) => {
  const normalizedSrc =
    typeof src === "string" && src.startsWith("/")
      ? src.slice(1)
      : (src as string);

  const finalSrc = env.NEXT_PUBLIC_BASE_URL
    ? `${env.NEXT_PUBLIC_BASE_URL}/${normalizedSrc}`
    : `/${normalizedSrc}`;

  return <NextImage src={finalSrc} {...rest} />;
};
