import { cn } from '@/lib/utils'
import { Logomark } from './Logomark'

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-2xl font-semibold tracking-[-0.04em] text-foreground',
        className,
      )}
    >
      <Logomark className="h-7 w-7 shrink-0" />
      <span>ecnivs</span>
    </span>
  )
}
