import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string | number) {
  return str
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function isVideoFile(src: string) {
  return src.endsWith(".mp4");
}

export function isImageFile(src: string) {
  return (
    src.endsWith(".jpg") ||
    src.endsWith(".jpeg") ||
    src.endsWith(".png") ||
    src.endsWith(".gif") ||
    src.endsWith(".webp")
  );
}
