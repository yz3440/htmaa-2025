/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import withMDX from "@next/mdx";
import { env } from "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ["mdx", "jsx", "js", "ts", "tsx"],
  output: "export",
  trailingSlash: true,
  basePath: env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: env.NEXT_PUBLIC_ASSET_PREFIX,
  images: {
    unoptimized: true,
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})(config);
