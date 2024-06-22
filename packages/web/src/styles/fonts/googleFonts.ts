import { Raleway } from "next/font/google";
import localFont from "next/font/local";

export const pretendard = localFont({
  src: "./local/PretendardVariable.woff2",
  variable: "--next-font-family-pretendard",
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700", "800"], // BOLD, EXTRABOLD only
  variable: "--next-font-family-raleway",
});

export const nanumSquare = localFont({
  src: "./local/NanumSquare-ExtraBold.woff2",
  variable: "--next-font-family-nanum-square",
});
