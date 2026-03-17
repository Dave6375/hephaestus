import { headers } from "next/headers";
import { ImageResponse } from "next/og";

/**
 * In simple terms, that file is for the preview
 * image people see when your site link is shared.
 */
export const runtime = "edge"
export const alt = 'Haphaestus - AI-powered 3D Asset Pipeline'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = "image/png"
export default async function Image() {
    try {
        // Get the host from headers
        const headerList = await headers()
        const host = headerList.get("host") || ""
        const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
        const baseUrl = `${protocol}://${host}`;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#000",
                    }}
                />
            ),
            {
                ...size,
            }
        )
    } catch (e) {
        console.error(e)
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}