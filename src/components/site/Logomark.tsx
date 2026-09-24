import { cn } from '@/lib/utils'

export function Logomark({ className }: { className?: string }) {
  return (
    <img
      src="/brand-mark.svg"
      width="32"
      height="32"
      alt=""
      aria-hidden="true"
      className={cn('h-7 w-7', className)}
    />
  )
}
