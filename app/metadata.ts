import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "Haphaestus - AI Agent 3D Asset Pipeline",
    description:
        "Generate and Upload Image to Create 3D Renders , Authentication, And Beautiful chat UI. built with Next.js, Puter.js, and E2B Sandbox",
    keywords: [
        "Hephaestus",
        "3D Asset Pipeline",
        "Next.js 3D AI Assets template",
        "Next.js template",
        "TypeScript",
        "Puter",
        "Puter KV",
        "Clerk authentication",
        "shadcn/ui",
        "Tailwind CSS",
        "Radix UI",
        "Puter Storage",
        "E2B Sandbox",
        "Puter Hosting",
    ],
    authors: [
        {
            name: "Dave Idoko",
            // url: "https://x.com/anayatkhan09",
        },
    ],
    creator: "Idokod09",
    openGraph: {
        type: "website",
        locale: "en_US",
        // url: siteConfig.url,
        title: "Haphaestus - AI Agent 3D Asset Pipeline",
        description:
            "Generate and Upload Image to Create 3D Renders , Authentication, And Beautiful chat UI. built with Next.js, Puter.js, and E2B Sandbox",
        siteName: "Haphaestus",
    },
    twitter: {
        card: "summary_large_image",
        title: "Haphaestus - AI Agent 3D Asset Pipeline",
        description:
            "Generate and Upload Image to Create 3D Renders , Authentication, And Beautiful chat UI. built with Next.js, Puter.js, and E2B Sandbox",
        creator: "@Idokod09",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};
