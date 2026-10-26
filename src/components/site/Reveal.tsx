import { useEffect, useRef, type ReactNode } from 'react'

let observer: IntersectionObserver | undefined
function revealObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer?.unobserve(entry.target)
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) continue
        const target = entry.target as HTMLElement
        target.style.setProperty(
          '--reveal-delay',
          `${Number(target.dataset.revealDelay)}ms`,
        )
        target.classList.add('reveal-enter')
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
    const finished = (event: AnimationEvent) => {
      if (event.target === target) target.classList.remove('reveal-enter')
    }
    target.addEventListener('animationend', finished)
    target.addEventListener('animationcancel', finished)
    current.observe(target)
    return () => {
      current.unobserve(target)
      target.removeEventListener('animationend', finished)
      target.removeEventListener('animationcancel', finished)
      target.classList.remove('reveal-enter')
      target.style.removeProperty('--reveal-delay')
    }
  }, [])
  return (
    <div ref={element} className={className} data-reveal-delay={delay * 1000}>
      {children}
    </div>
  )
}
