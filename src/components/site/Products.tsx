import { ArrowUpRight } from '@phosphor-icons/react'
import { PRODUCTS, STATUS_LABEL, type Product } from '@/data/products'
import { Reveal } from './Reveal'

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-background p-8 transition-colors duration-300 hover:border-accent/50 sm:p-10"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono-brand text-xs tracking-[0.16em] text-subtle-foreground uppercase">
          {STATUS_LABEL[product.status]}
        </span>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      <h3 className="font-accent-serif mt-8 text-4xl text-foreground italic sm:text-5xl">
        {product.name}
      </h3>
      <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <ul className="mt-8 space-y-3 border-t border-border/70 pt-6">
        {product.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-foreground/85"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8 font-mono-brand text-xs tracking-wide text-muted-foreground uppercase">
        {String(index + 1).padStart(2, '0')} &middot;{' '}
        {product.url.replace('https://', '')}
      </div>
    </a>
  )
}

export function Products() {
  return (
    <section id="releases" className="border-t border-border/60 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            Releases
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Latest releases.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            What we're building right now, and shipping as it's ready.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08}>
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
