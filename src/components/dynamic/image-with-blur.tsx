import Image, { type ImageProps } from "next/image";
import { getPlaiceholder } from "plaiceholder";
import fs from "fs/promises";
import path from "path";
export default async function ImageWithBlur({
  src,
  alt,
  ...props
}: ImageProps) {
  if (!src) return null;
  // check if its a http url

  let buffer: Buffer;
  if (typeof src === "string" && src.startsWith("http")) {
    // its a remote url
    const response = await fetch(src);
    buffer = Buffer.from(await response.arrayBuffer());
  } else {
    // its a local file
    buffer = await fs.readFile(getLocalFilePath(src as string));
  }
  // Generate base64 blur placeholder
  const { base64, metadata } = await getPlaiceholder(buffer, { size: 16 });

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      {...props}
      width={metadata.width}
      height={metadata.height}
      placeholder="blur"
      blurDataURL={base64}
    />
  );
}

function getLocalFilePath(src: string) {
  return path.join(process.cwd(), "public", src);
}
