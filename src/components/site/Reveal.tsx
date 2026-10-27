import { useEffect, useRef, type ReactNode } from 'react'

let observer: IntersectionObserver | undefined
function revealObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer?.unobserve(entry.target)
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) continue
        entry.target.animate(
          [{ transform: 'translateY(12px)' }, { transform: 'translateY(0)' }],
          {
            duration: 600,
            delay: Number((entry.target as HTMLElement).dataset.revealDelay),
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          },
        )
      }
    },
    { threshold: 0.05 },
  )
  return observer
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const element = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const target = element.current
    if (!target || !('IntersectionObserver' in window)) return
    const current = revealObserver()
    current.observe(target)
    return () => {
      current.unobserve(target)
      for (const animation of target.getAnimations()) animation.cancel()
    }
  }, [])
  return (
    <div ref={element} className={className} data-reveal-delay={delay * 1000}>
      {children}
    </div>
  )
}
