import localFont from "next/font/local";

export const texGyreHeros = localFont({
  src: [
    {
      path: "../fonts/texgyreheroscn-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/texgyreheros-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/texgyreheros-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/texgyreheros-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/texgyreheros-bolditalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-texgyreheros",
});

export const texGyreHerosCondensed = localFont({
  src: [
    {
      path: "../fonts/texgyreheroscn-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/texgyreheroscn-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/texgyreheroscn-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/texgyreheroscn-bolditalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-texgyreheros-condensed",
});

// GlowSansSC-Condensed-Regular.otf

// export const glowSansSCCondensed = localFont({
//   src: [
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Condensed-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Condensed-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Condensed-ExtraBold.otf",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Condensed-ExtraLight.otf",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Condensed-Heavy.otf",
//       weight: "900",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Condensed-Light.otf",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Condensed-Medium.otf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Condensed-Thin.otf",
//       weight: "100",
//       style: "normal",
//     },
//   ],
//   display: "swap",
//   variable: "--font-glowsans-condensed",
// });

export const glowSansSCCompressed = localFont({
  src: [
    // {
    //   path: "../fonts/simplified-chinese/GlowSansSC-Compressed-Regular.otf",
    //   weight: "400",
    //   style: "normal",
    // },
    {
      path: "../fonts/simplified-chinese/min/GlowSansSC-Compressed-Bold.woff",
      weight: "700",
      style: "normal",
    },
    // {
    //   path: "../fonts/simplified-chinese/GlowSansSC-Compressed-ExtraBold.otf",
    //   weight: "800",
    //   style: "normal",
    // },
    // {
    //   path: "../fonts/simplified-chinese/GlowSansSC-Compressed-ExtraLight.otf",
    //   weight: "200",
    //   style: "normal",
    // },
    // {
    //   path: "../fonts/simplified-chinese/GlowSansSC-Compressed-Light.otf",
    //   weight: "300",
    //   style: "normal",
    // },
    // {
    //   path: "../fonts/simplified-chinese/GlowSansSC-Compressed-Medium.otf",
    //   weight: "500",
    //   style: "normal",
    // },
    // {
    //   path: "../fonts/simplified-chinese/GlowSansSC-Compressed-Thin.otf",
    //   weight: "100",
    //   style: "normal",
    // },
  ],
  display: "swap",
  variable: "--font-glowsans-compressed",
});

// const glowSansSCNormal = localFont({
//   src: [
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Normal-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Normal-ExtraBold.otf",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Normal-ExtraLight.otf",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Normal-Heavy.otf",
//       weight: "900",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Normal-Light.otf",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Normal-Medium.otf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Normal-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/simplified-chinese/GlowSansSC-Normal-Thin.otf",
//       weight: "100",
//       style: "normal",
//     },
//   ],
//   display: "swap",
//   variable: "--font-glowsans-normal",
// });

// src/app/fonts/Redaction_10-Bold.woff2 src/app/fonts/Redaction_10-Italic.woff2 src/app/fonts/Redaction_10-Regular.woff2 src/app/fonts/Redaction_20-Bold.woff2 src/app/fonts/Redaction_20-Italic.woff2 src/app/fonts/Redaction_20-Regular.woff2 src/app/fonts/Redaction_35-Bold.woff2 src/app/fonts/Redaction_35-Italic.woff2 src/app/fonts/Redaction_35-Regular.woff2 src/app/fonts/Redaction_50-Bold.woff2 src/app/fonts/Redaction_50-Italic.woff2 src/app/fonts/Redaction_50-Regular.woff2 src/app/fonts/Redaction_70-Bold.woff2 src/app/fonts/Redaction_70-Italic.woff2 src/app/fonts/Redaction_70-Regular.woff2 src/app/fonts/Redaction_100-Bold.woff2 src/app/fonts/Redaction_100-Italic.woff2 src/app/fonts/Redaction_100-Regular.woff2 src/app/fonts/Redaction-Bold.woff2 src/app/fonts/Redaction-Italic.woff2 src/app/fonts/Redaction-Regular.woff2
// export const redaction = localFont({
//   src: [
//     {
//       path: "../fonts/Redaction-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//   ],
//   display: "swap",
//   variable: "--font-redaction",
// });

// export const redaction10 = localFont({
//   src: [
//     {
//       path: "../fonts/Redaction_10-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_10-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_10-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//   ],
//   display: "swap",
//   variable: "--font-redaction-10",
// });

// export const redaction20 = localFont({
//   src: [
//     {
//       path: "../fonts/Redaction_20-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_20-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_20-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//   ],
//   display: "swap",
//   variable: "--font-redaction-20",
// });

// export const redaction35 = localFont({
//   src: [
//     {
//       path: "../fonts/Redaction_35-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_35-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_35-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//   ],
//   display: "swap",
//   variable: "--font-redaction-35",
// });

export const redaction50 = localFont({
  src: [
    {
      path: "../fonts/Redaction_50-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Redaction_50-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Redaction_50-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-redaction-50",
});

// export const redaction70 = localFont({
//   src: [
//     {
//       path: "../fonts/Redaction_70-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_70-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_70-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//   ],
//   display: "swap",
//   variable: "--font-redaction-70",
// });

// export const redaction100 = localFont({
//   src: [
//     {
//       path: "../fonts/Redaction_100-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_100-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Redaction_100-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//   ],
//   display: "swap",
//   variable: "--font-redaction-100",
// });
