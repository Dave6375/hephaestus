import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function CTASection() {
    const { ctaSection } = siteConfig;

    return (
        <section
            id="cta"
            className="flex w-full flex-col items-center justify-center px-5 py-16 md:px-10 md:py-20"
        >
            <div className="w-full max-w-5xl">
                <div className="relative z-20 h-[360px] w-full overflow-hidden rounded-[2rem] border border-border shadow-xl md:h-[400px]">
                    {/* Custom CTA background styling starts here */}
                    <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_0%,var(--secondary)_0%,color-mix(in_oklab,var(--primary)_42%,var(--secondary))_42%,var(--primary)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.08)_35%,transparent_70%)]" />
                    <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute right-[-10%] bottom-[-15%] h-56 w-56 rounded-full bg-background/15 blur-3xl" />
                    <div className="absolute left-[-8%] bottom-[-10%] h-44 w-44 rounded-full bg-secondary-foreground/10 blur-3xl" />
                    {/* Custom CTA background styling ends here */}

                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                        <h1 className="max-w-xs font-medium text-4xl text-primary-foreground tracking-tighter md:max-w-2xl md:text-6xl">
                            {ctaSection.title}
                        </h1>
                        <div className="mt-10 flex flex-col items-center justify-center gap-3">
                            <Link
                                href={ctaSection.button.href}
                                className="flex h-11 w-fit items-center justify-center rounded-full border border-white/25 bg-white px-5 font-semibold text-primary text-sm shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_8px_24px_-12px_rgba(0,0,0,0.35)] transition-colors hover:bg-white/90"
                            >
                                {ctaSection.button.text}
                            </Link>
                            <span className="text-sm text-primary-foreground/80">{ctaSection.subtext}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
