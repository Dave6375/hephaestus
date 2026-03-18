import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

const parseColorChannels = (
  cssColor: React.CSSProperties["color"],
  fallback: string,
) => {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  const context = canvas.getContext("2d");
  if (!context) return null;

  const resolvedColor = resolveCssColor(cssColor, fallback);

  try {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = resolvedColor;
    context.fillRect(0, 0, 1, 1);

    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  } catch {
    return null;
  }
}

// Helper function to convert any CSS color to rgba
export const getRGBA = (
    cssColor: React.CSSProperties["color"],
    fallback: string = "rgb(180, 180, 180)",
): string => {
  try {
    const channels = parseColorChannels(cssColor, fallback);
    if (!channels) return fallback;

    const { r, g, b, a } = channels;
    return a >= 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
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
    const channels = parseColorChannels(cssColor, fallback);
    if (!channels) return fallback;

    const { r, g, b } = channels;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } catch (e) {
    console.error("Color opacity parsing failed:", e);
    return fallback;
  }
};
