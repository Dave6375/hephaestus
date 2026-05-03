import puter from "@heyputer/puter.js";
import {SIMPLEX_RENDER_PROMPT} from "./constants";
import type { Generate3DViewParams } from "../type";

/**
 * Fetches an image from a URL and converts it to a base64 data URL.
 * image URL -> Blob/File -> save to hosting -> hosted URL
 *
 * order of things:
 * a normal remote URL
 * a data URL
 * some image source that is not yet hosted in Puter
 *
 * @param url - The URL of the image to fetch.
 * @returns A promise that resolves with the data URL string.
 * @throws Error if the fetch response is not ok or if reading the blob fails.
 */
export async function fetchAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
  }

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert image blob to data URL"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error reading image blob"));
    };
    reader.readAsDataURL(blob);
  });
}

export const generate3DView = async ({ sourceImage, userRequest }: Generate3DViewParams & { userRequest?: string }) => {
    // Basic guard: Only proceed if there's a specific request or we decide to trust the caller
    // Since we can't easily see the caller's intent here without it being passed,
    // we assume the caller has already verified the intent or we rely on the prompt instructions.
    // However, adding a log or a simple check if userRequest is available could help.
    
    if (userRequest) {
        const lowerRequest = userRequest.toLowerCase();
        // Stricter keywords to match "turn the floor plan into a 3D render"
        const keywords = ["render", "3d", "architectural", "3d render", "floor plan to 3d"];
        const isRequested = keywords.some(keyword => lowerRequest.includes(keyword));
        
        // Also check for the specific intent of turning a photo/plan into a render
        const hasIntent = lowerRequest.includes("turn") || lowerRequest.includes("convert") || lowerRequest.includes("make");
        
        if (!isRequested || (lowerRequest.includes("photo") && !hasIntent)) {
            console.log("[AI] 3D view not specifically requested for this media. Skipping.");
            return { renderedImage: null, renderedPath: undefined };
        }
    } else {
        // If no userRequest is provided, we MUST NOT proceed automatically
        console.log("[AI] No user request provided. Skipping automatic 3D generation.");
        return { renderedImage: null, renderedPath: undefined };
    }

    const dataUrl = sourceImage.startsWith("data:")
        ? sourceImage
        // The wait makes sure the image is in the data file format
        : await fetchAsDataUrl(sourceImage)


    const base64Data = dataUrl.split(",")[1];
    const mimeType = dataUrl.split(":")[1].split(";")[0];

    if (!base64Data || !mimeType) {
        throw new Error("Invalid source image payload");
    }

    console.log("[AI] Starting txt2img with prompt length:", SIMPLEX_RENDER_PROMPT.length);
    const response = await puter.ai.txt2img(SIMPLEX_RENDER_PROMPT, {
        provider: 'gemini',
        input_image: base64Data,
        model: 'gemini-2.5-flash',
        input_image_mime_type: mimeType,
        ratio: { w: 1024, h: 1024 },
        // The default model is usually more stable for Image-to-Image
    }).catch(err => {
        console.error("[AI] puter.ai.txt2img failed:", err);
        throw err;
    });

    console.log("[AI] Response received from puter.ai.txt2img");
    const rawImageUrl = ( response as HTMLImageElement ).src ?? null;

    if (!rawImageUrl) return { renderedImage: null, renderedPath: undefined };

    const renderedImage = rawImageUrl.startsWith("data:")
        ? rawImageUrl : await fetchAsDataUrl(rawImageUrl);

    return { renderedImage, renderedPath: undefined };
}

