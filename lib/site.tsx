import React from 'react';
import {FirstBentoAnimation} from "@/components/FirstBentoAnimation";
import {SecondBentoAnimation} from "@/components/SecondBentoAnimation";
import {ThirdBentoAnimation} from "@/components/ThirdBentoAnimation";
import {FourthBentoAnimation} from "@/components/FourthBentoAnimation";

export interface SiteConfig {
    name: string;
    description: string;
    links: {
        twitter: string;
        github: string;
    };
    nav: {
        links: {
            id: string;
            name: string;
            href: string;
        }[];
    };
    hero: {
        badge: string;
        badgeIcon: React.ReactNode;
        title: string;
        description: string;
        cta: {
            primary: {
                text: string;
                href: string;
            };
            secondary: {
                text: string;
                href: string;
            };
        };
    };
    bentoSection: {
        title: string;
        description: string;
        items: {
            id: number;
            title: string;
            description: string;
            content: React.ReactNode;
        }[];
    };
}

export const siteConfig: SiteConfig = {
    name: "Hephaestus",
    // url: "https://agentkitt.xyz",
    description:
        "Production-ready Automated 3D Asset Pipeline Using Puter AI and KV as well as E2B sandbox.",
    links: {
        twitter: "https://www.instagram.com/idokod09/",
        github: "https://github.com/Dave6375/hephaestus",
    },
    nav: {
        links: [
            { id: "hero", name: "Home", href: "#hero" },
            { id: "features", name: "Features", href: "#features" },
            { id: "Database", name: "Database", href: "#Database" },
            { id: "pricing", name: "Pricing", href: "#pricing" },
            { id: "faq", name: "FAQ", href: "#faq" },
        ],
    },
    hero: {
        badge: "New: Hephaestus AI is now in beta",
        badgeIcon: <span className="mr-2">🚀</span>,
        title: "The Ultimate AI 3D Asset Pipeline",
        description: "Production-ready Automated 3D Asset Pipeline Using Puter AI and KV as well as E2B sandbox. Includes authentication, database persistence, and a beautiful UI—everything you need to launch fast.",
        cta: {
            primary: {
                text: "Try for free",
                href: "/chat"
            },
            secondary: {
                text: "Learn More",
                href: "#features"
            }
        }
    },
    bentoSection: {
        title: "Powerful Features Out of the Box",
        description:
            "AgentKit includes everything you need-no need to build from scratch",
        items: [
            {
                id: 1,
                content: <FirstBentoAnimation />,
                title: "Intelligent Web Search",
                description:
                    "Enable web search when your agent needs current information. Search results are automatically cited and displayed in a beautiful UI.",
            },
            {
                id: 2,
                content: <SecondBentoAnimation />,
                title: "Real-time Streaming",
                description:
                    "Streaming responses with tool call visualization. See your agent's search process in real-time with collapsible source citations.",
            },
            {
                id: 3,
                content: (
                    <ThirdBentoAnimation
                        data={[20, 30, 25, 45, 40, 55, 75]}
                        toolTipValues={[
                            1234, 1678, 2101, 2534, 2967, 3400, 3833, 4266, 4700, 5133,
                        ]}
                    />
                ),
                title: "Persistent Chat History",
                description:
                    "All conversations are automatically saved to PostgreSQL. User-scoped data with Prisma ORM for easy querying and management.",
            },
            {
                id: 4,
                content: <FourthBentoAnimation once={false} />,
                title: "Deploy Anywhere",
                description:
                    "Optimized for Vercel deployment with environment variable management. Includes error handling, loading states, and responsive design.",
            },
        ],
    },
};
