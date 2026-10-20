import localFont from "next/font/local";

export const suisse = localFont({
  src: [
    {
      path: "./SuisseIntl-Thin.woff2",
      weight: "275",
      style: "normal",
    },
    {
      path: "./SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
});

export const unica = localFont({
  src: [
    {
      path: "./Unica77LLWeb-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-unica",
});
