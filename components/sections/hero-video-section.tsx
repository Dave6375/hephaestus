import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'

export function HeroVideoSection() {
    return (
        <div className='relative mt-10 px-6 mx-auto max-w-5xl'>
            <div className='relative size-full overflow-hidden rounded-2xl shadow-xl'>
                <HeroVideoDialog
                    className='block dark:hidden'
                    animationStyle='from-center'
                    videoSrc='https://www.youtube.com/embed/uqpXAfNEY4g'
                    thumbnailSrc='https://startup-template-sage.vercel.app/hero-light.png'
                    thumbnailAlt='Hero Video'
                    />
                <HeroVideoDialog
                    className='hidden dark:block'
                    animationStyle='from-center'
                    videoSrc='https://www.youtube.com/embed/uqpXAfNEY4g'
                    thumbnailSrc='https://startup-template-sage.vercel.app/hero-light.png'
                    thumbnailAlt='Hero Video'
                    />
            </div>
        </div>
    )
}