/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import withMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ["mdx", "jsx", "js", "ts", "tsx"],
  output: "export",
  trailingSlash: true,
  basePath: "/classes/863.25/people/YufengZhao",
  assetPrefix: "/classes/863.25/people/YufengZhao",
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})(config);
