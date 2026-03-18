import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Color from "@img/colour";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toRgbString = (value: string) => Color(value).rgb().string()

const resolveCssColor = (
  cssColor: React.CSSProperties["color"],
  fallback: string,
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor || typeof cssColor !== "string") return fallback;

  if (!cssColor.startsWith("var(")) {
    return cssColor;
  }

  const element = document.createElement("div");
  element.style.color = cssColor;
  document.body.appendChild(element);

  try {
    return window.getComputedStyle(element).color || fallback;
  } finally {
    document.body.removeChild(element);
  }
}

// Helper function to convert any CSS color to rgba
export const getRGBA = (
    cssColor: React.CSSProperties["color"],
    fallback: string = "rgba(180, 180, 180)",
): string => {
  try {
    return toRgbString(resolveCssColor(cssColor, fallback));
  } catch (e) {
    console.error("Color parsing failed:", e);
    return fallback;
  }
};

export const colorWithOpacity = (
    cssColor: React.CSSProperties["color"],
    opacity: number,
    fallback: string = "rgba(180, 180, 180, 0)",
): string => {
  try {
    return Color(resolveCssColor(cssColor, fallback)).alpha(opacity).rgb().string();
  } catch (e) {
    console.error("Color opacity parsing failed:", e);
    return fallback;
  }
};
