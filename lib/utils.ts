import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Color from "@img/colour";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toRgbString = (value: string) => Color(value).rgb().string()

// Helper function to convert any CSS color to rgba
export const getRGBA = (
    cssColor: React.CSSProperties["color"],
    fallback: string = "rgba(180, 180, 180)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor || typeof cssColor !== "string") return fallback;

  try {
    // Handle CSS variables
    if (cssColor.startsWith("var(")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      return toRgbString(computedColor);
    }

    return toRgbString(cssColor);
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
  if (!cssColor || typeof cssColor !== "string") return fallback;

  try {
    return Color(cssColor).alpha(opacity).rgb().string();
  } catch (e) {
    console.error("Color opacity parsing failed:", e);
    return fallback;
  }
};

