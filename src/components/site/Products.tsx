import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { PRODUCTS, STATUS_LABEL, type Product } from '@/data/products'

function LivePreview({ product }: { product: Product }) {
  const container = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const element = container.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1280)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="product-live-preview" ref={container}>
      <iframe
        src={product.url}
        title={`${product.name} live homepage`}
        width="1280"
        height="800"
        loading="lazy"
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
        tabIndex={-1}
        aria-hidden="true"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noreferrer"
      className={`product-card product-${product.id}`}
    >
      <div className="product-website">
        <div className="website-address">
          <span>{product.url.replace('https://', '')}</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </div>
        {product.livePreview ? (
          <LivePreview product={product} />
        ) : (
          <img
            src={product.preview}
            width="1280"
            height="880"
            alt={`${product.name} homepage`}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="product-details">
        <div className="product-name-row">
          <h3>{product.name}</h3>
          <span className="product-status">{STATUS_LABEL[product.status]}</span>
        </div>
        <p className="product-tagline">{product.tagline}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-card-link">
          <span>Explore {product.name}</span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </div>
      </div>
    </a>
  )
}

export function Products() {
  return (
    <section id="releases" className="products-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="section-intro">
          <div>
            <p className="section-label">ecnivs</p>
            <h2>We make things, too</h2>
          </div>
        </div>
        <p className="section-description">
          Curiosity doesn’t stop at the video. Meet the projects we’re building.
        </p>
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
