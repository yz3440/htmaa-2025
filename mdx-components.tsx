import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents) {
  // const components = {
  //   h1: (props) => <h1 style={{ color: "tomato" }} {...props} />,
  //   // ...
  // };

  return {
    ...components,
    // Add your custom
  };
}
