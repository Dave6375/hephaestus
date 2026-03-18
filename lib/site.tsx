import React from 'react';
import {FirstBentoAnimation} from "@/components/FirstBentoAnimation";
import {SecondBentoAnimation} from "@/components/SecondBentoAnimation";
import {ThirdBentoAnimation} from "@/components/ThirdBentoAnimation";
import {FourthBentoAnimation} from "@/components/FourthBentoAnimation";
import {FlickeringGrid} from "@/components/ui/flickering-grid";
import {Globe} from "@/components/ui/globe";

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
    quoteSection: {
        quote: string;
        author: {
            name: string;
            role: string;
            image: string;
        };
    };
    hypeSection: {
        title: string;
        description: string;
        items: {
            id: number;
            title: string;
            description: string;
            content: React.ReactNode;
        }[];
    };
    pricing: {
        title: string;
        description: string;
        pricingItems: {
            name: string;
            href: string;
            price: string;
            period: string;
            yearlyPrice: string;
            features: string[];
            description: string;
            buttonText: string;
            buttonColor: string;
            isPopular: boolean;
        }[];
    };
    ctaSection: {
        id: string;
        title: string;
        button: {
            text: string;
            href: string;
        };
        subtext: string;
    };
    featureSection: {
        title: string;
        description: string;
        items: {
            id: number;
            title: string;
            content: string;
            image?: string;
            video?: string;
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
    quoteSection: {
        quote:
            "The best AI does more than respond. It understands the goal, builds a step-by-step plan, and executes each task with speed, precision, and purpose.",
        author: {
            name: "Dave Idoko",
            role: "Founder, Assets Generator",
            image: "/Quote/random.png",
        },
    },
    hypeSection: {
        title: "Built for Scale",
        description:
            "Production-ready architecture that scales with your needs—from prototype to enterprise",
        items: [
            {
                id: 1,
                content: (
                    <div
                        className="relative flex size-full items-center justify-center overflow-hidden transition-all duration-300 hover:[mask-image:none] hover:[webkit-mask-image:none]"
                        style={{
                            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='265' height='268' viewBox='0 0 265 268' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M121.384 4.5393C124.406 1.99342 128.319 0.585938 132.374 0.585938C136.429 0.585938 140.342 1.99342 143.365 4.5393C173.074 29.6304 210.174 45.6338 249.754 50.4314C253.64 50.9018 257.221 52.6601 259.855 55.3912C262.489 58.1223 264.005 61.6477 264.13 65.3354C265.616 106.338 254.748 146.9 232.782 182.329C210.816 217.759 178.649 246.61 140.002 265.547C137.645 266.701 135.028 267.301 132.371 267.298C129.715 267.294 127.1 266.686 124.747 265.526C86.0991 246.59 53.9325 217.739 31.9665 182.309C10.0005 146.879 -0.867679 106.317 0.618784 65.3147C0.748654 61.6306 2.26627 58.1102 4.9001 55.3833C7.53394 52.6565 11.1121 50.9012 14.9945 50.4314C54.572 45.6396 91.6716 29.6435 121.384 4.56V4.5393Z' fill='black'/%3E%3C/svg%3E")`,
                            maskImage: `url("data:image/svg+xml,%3Csvg width='265' height='268' viewBox='0 0 265 268' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M121.384 4.5393C124.406 1.99342 128.319 0.585938 132.374 0.585938C136.429 0.585938 140.342 1.99342 143.365 4.5393C173.074 29.6304 210.174 45.6338 249.754 50.4314C253.64 50.9018 257.221 52.6601 259.855 55.3912C262.489 58.1223 264.005 61.6477 264.13 65.3354C265.616 106.338 254.748 146.9 232.782 182.329C210.816 217.759 178.649 246.61 140.002 265.547C137.645 266.701 135.028 267.301 132.371 267.298C129.715 267.294 127.1 266.686 124.747 265.526C86.0991 246.59 53.9325 217.739 31.9665 182.309C10.0005 146.879 -0.867679 106.317 0.618784 65.3147C0.748654 61.6306 2.26627 58.1102 4.9001 55.3833C7.53394 52.6565 11.1121 50.9012 14.9945 50.4314C54.572 45.6396 91.6716 29.6435 121.384 4.56V4.5393Z' fill='black'/%3E%3C/svg%3E")`,
                            WebkitMaskSize: "contain",
                            maskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                        }}
                    >
                        <div className="absolute top-[55%] left-[55%] z-10 size-full -translate-x-1/2 -translate-y-1/2 md:top-[58%] md:left-[57%]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="227"
                                height="244"
                                viewBox="0 0 227 244"
                                fill="none"
                                className="size-[90%] fill-background object-contain md:size-[85%]"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M104.06 3.61671C106.656 1.28763 110.017 0 113.5 0C116.983 0 120.344 1.28763 122.94 3.61671C148.459 26.5711 180.325 41.2118 214.322 45.6008C217.66 46.0312 220.736 47.6398 222.999 50.1383C225.262 52.6369 226.563 55.862 226.67 59.2357C227.947 96.7468 218.612 133.854 199.744 166.267C180.877 198.68 153.248 225.074 120.052 242.398C118.028 243.454 115.779 244.003 113.498 244C111.216 243.997 108.969 243.441 106.948 242.379C73.7524 225.055 46.1231 198.661 27.2556 166.248C8.38807 133.835 -0.947042 96.7279 0.329744 59.2168C0.441295 55.8464 1.74484 52.6258 4.00715 50.1311C6.26946 47.6365 9.34293 46.0306 12.6777 45.6008C46.6725 41.2171 78.5389 26.5832 104.06 3.63565V3.61671Z"
                                />
                            </svg>
                        </div>
                        <div className="absolute top-[58%] left-1/2 z-20 size-full -translate-x-1/2 -translate-y-1/2 md:top-[60%]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="245"
                                height="282"
                                viewBox="0 0 245 282"
                                className="size-full fill-accent object-contain"
                            >
                                <g filter="url(#filter0_dddd_2_33)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M113.664 7.33065C116.025 5.21236 119.082 4.04126 122.25 4.04126C125.418 4.04126 128.475 5.21236 130.836 7.33065C154.045 28.2076 183.028 41.5233 213.948 45.5151C216.984 45.9065 219.781 47.3695 221.839 49.6419C223.897 51.9144 225.081 54.8476 225.178 57.916C226.339 92.0322 217.849 125.781 200.689 155.261C183.529 184.74 158.4 208.746 128.209 224.501C126.368 225.462 124.323 225.962 122.248 225.959C120.173 225.956 118.13 225.45 116.291 224.484C86.0997 208.728 60.971 184.723 43.811 155.244C26.6511 125.764 18.1608 92.015 19.322 57.8988C19.4235 54.8334 20.6091 51.9043 22.6666 49.6354C24.7242 47.3665 27.5195 45.906 30.5524 45.5151C61.4706 41.5281 90.4531 28.2186 113.664 7.34787V7.33065Z"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_dddd_2_33"
                                        x="0.217041"
                                        y="0.0412598"
                                        width="244.066"
                                        height="292.917"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="3" />
                                        <feGaussianBlur stdDeviation="3.5" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_2_33"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="12" />
                                        <feGaussianBlur stdDeviation="6" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="effect1_dropShadow_2_33"
                                            result="effect2_dropShadow_2_33"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="27" />
                                        <feGaussianBlur stdDeviation="8" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="effect2_dropShadow_2_33"
                                            result="effect3_dropShadow_2_33"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="48" />
                                        <feGaussianBlur stdDeviation="9.5" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="effect3_dropShadow_2_33"
                                            result="effect4_dropShadow_2_33"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect4_dropShadow_2_33"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="81"
                                height="80"
                                viewBox="0 0 81 80"
                                className="fill-background"
                            >
                                <g filter="url(#filter0_iiii_2_34)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20.5 36V28C20.5 22.6957 22.6071 17.6086 26.3579 13.8579C30.1086 10.1071 35.1957 8 40.5 8C45.8043 8 50.8914 10.1071 54.6421 13.8579C58.3929 17.6086 60.5 22.6957 60.5 28V36C62.6217 36 64.6566 36.8429 66.1569 38.3431C67.6571 39.8434 68.5 41.8783 68.5 44V64C68.5 66.1217 67.6571 68.1566 66.1569 69.6569C64.6566 71.1571 62.6217 72 60.5 72H20.5C18.3783 72 16.3434 71.1571 14.8431 69.6569C13.3429 68.1566 12.5 66.1217 12.5 64V44C12.5 41.8783 13.3429 39.8434 14.8431 38.3431C16.3434 36.8429 18.3783 36 20.5 36ZM52.5 28V36H28.5V28C28.5 24.8174 29.7643 21.7652 32.0147 19.5147C34.2652 17.2643 37.3174 16 40.5 16C43.6826 16 46.7348 17.2643 48.9853 19.5147C51.2357 21.7652 52.5 24.8174 52.5 28Z"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_iiii_2_34"
                                        x="12.5"
                                        y="8"
                                        width="56"
                                        height="70"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feComposite
                                            in2="hardAlpha"
                                            operator="arithmetic"
                                            k2="-1"
                                            k3="1"
                                        />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="shape"
                                            result="effect1_innerShadow_2_34"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="3" />
                                        <feGaussianBlur stdDeviation="1.5" />
                                        <feComposite
                                            in2="hardAlpha"
                                            operator="arithmetic"
                                            k2="-1"
                                            k3="1"
                                        />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="effect1_innerShadow_2_34"
                                            result="effect2_innerShadow_2_34"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="8" />
                                        <feGaussianBlur stdDeviation="2.5" />
                                        <feComposite
                                            in2="hardAlpha"
                                            operator="arithmetic"
                                            k2="-1"
                                            k3="1"
                                        />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="effect2_innerShadow_2_34"
                                            result="effect3_innerShadow_2_34"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="14" />
                                        <feGaussianBlur stdDeviation="3" />
                                        <feComposite
                                            in2="hardAlpha"
                                            operator="arithmetic"
                                            k2="-1"
                                            k3="1"
                                        />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="effect3_innerShadow_2_34"
                                            result="effect4_innerShadow_2_34"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className="size-full">
                            <FlickeringGrid
                                className="size-full"
                                gridGap={4}
                                squareSize={2}
                                maxOpacity={0.5}
                            />
                        </div>
                    </div>
                ),

                title: "Enterprise-Grade Security",
                description:
                    "User authentication, data encryption, and secure API key management. Built with security best practices from the start.",
            },
            {
                id: 2,
                content: (
                    <div className="relative flex size-full max-w-lg -translate-y-20 items-center justify-center overflow-hidden [mask-image:linear-gradient(to_top,transparent,black_50%)]">
                        <Globe className="top-28" />
                    </div>
                ),

                title: "Ready to Scale",
                description:
                    "PostgreSQL database, efficient API routes, and optimized streaming. Handle thousands of users without breaking a sweat.",
            },
        ],
    },
    pricing: {
        title: "Pricing that scales with you",
        description:
            "Whichever plan you pick, it's free until you love your docs. That's our promise.",
        pricingItems: [
            {
                name: "Free",
                href: "#",
                price: "$0",
                period: "month",
                yearlyPrice: "$0",
                features: [
                    "Custom domain",
                    "SEO-optimizations",
                    "Auto-generated API docs",
                    "Built-in components library",
                ],
                description: "Perfect for individual users",
                buttonText: "Start Free",
                buttonColor: "bg-accent text-primary",
                isPopular: false,
            },
            {
                name: "Startup",
                href: "#",
                price: "$12",
                period: "month",
                yearlyPrice: "$120",
                features: [
                    "Custom domain",
                    "SEO-optimizations",
                    "Auto-generated API docs",
                    "Built-in components library",
                    "E-commerce integration",
                    "User authentication system",
                    "Multi-language support",
                    "Real-time collaboration tools",
                ],
                description: "Ideal for professionals and small teams",
                buttonText: "Upgrade to Pro",
                buttonColor: "bg-secondary text-white",
                isPopular: true,
            },
            {
                name: "Enterprise",
                href: "#",
                price: "$24",
                period: "month",
                yearlyPrice: "$240",
                features: [
                    "Custom domain",
                    "SEO-optimizations",
                    "Auto-generated API docs",
                    "Built-in components librarys",
                    "Real-time collaboration tools",
                ],
                description: "Best for large teams and enterprise-level organizations",
                buttonText: "Contact Sales",
                buttonColor: "bg-primary text-primary-foreground",
                isPopular: false,
            },
        ],
    },
    ctaSection: {
        id: "cta",
        title: "Start Building Your AI Agent Today",
        button: {
            text: "Lets get Started",
            href: "/chat",
        },
        subtext: "Referenced through Agentkit Starter",
    },
    featureSection: {
        title: "What This Autonomous AI Can Do",
        description:
            "Built to reason step by step, plan clearly, and execute practical work across development, automation, and analysis.",
        items: [
            {
                id: 1,
                title: "Capabilities",
                content:
                    "Designed for automated data scraping and analysis, live UI component prototyping, file conversion, and structured content processing across real project workflows.",
                image:
                    "https://unsplash.com/photos/XANYe86dewg/download?force=true&w=1600",
            },
            {
                id: 2,
                title: "Tooling and Integrations",
                content:
                    "It can test API integrations, process inputs and outputs between services, and help connect moving parts in a workflow without losing sight of the larger goal.",
                image:
                    "https://unsplash.com/photos/5RAdQdk-pdo/download?force=true&w=1600",
            },
            {
                id: 3,
                title: "Step-by-Step Execution",
                content:
                    "Beyond answering questions, it can break tasks into steps, iterate on solutions, support learning as an educational coding assistant, and generate system administration scripts when execution is needed.",
                image:
                    "https://unsplash.com/photos/MvVsnqKTnzM/download?force=true&w=1600",
            },
            {
                id: 4,
                title: "Multi-Agent Architecture",
                content:
                    "Its behavior is shaped by multiple AI prompts with separate roles for iteration, processing, multi-agent coordination, and reasoning, all orchestrated within a Next.js-based system.",
                image:
                    "https://images.unsplash.com/photo-1666882990322-e7f3b8df4f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
            },
        ],
    },
};


