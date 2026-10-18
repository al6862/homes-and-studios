import localFont from "next/font/local";

export const suisse = localFont({
  src: [
    {
      path: "./fonts/SuisseIntl-Thin.woff2",
      weight: "275",
      style: "normal",
    },
    {
      path: "./fonts/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
});

export const unica = localFont({
  src: [
    {
      path: "./fonts/Unica77-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-unica",
});
