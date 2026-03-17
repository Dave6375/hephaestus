import Image from "next/image";

export function CompanyShowcase() {
    return (
        <section
            id="company-showcase"
            className="relative flex w-full flex-col items-center justify-center gap-8 px-6 py-16"
        >
            <p className="font-medium text-muted-foreground text-center">
                Trusted by Codai consult industries
            </p>
            <div className="flex items-center justify-center">
                <div className="rounded-2xl border bg-background p-6 shadow-xl transition-all duration-300 hover:scale-105">
                    <Image
                        src="/companies/codai-light.png"
                        alt="Codai Logo"
                        width={160}
                        height={60}
                        className="h-16 w-auto object-contain dark:hidden"
                    />
                    <Image
                        src="/companies/codai.png"
                        alt="Codai Logo"
                        width={160}
                        height={60}
                        className="h-16 w-auto object-contain hidden dark:block"
                    />

                </div>
            </div>
        </section>
    );
}