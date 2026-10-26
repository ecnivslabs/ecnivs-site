import { ArrowUpRight } from '@phosphor-icons/react'
import { PRODUCTS, STATUS_LABEL, type Product } from '@/data/products'
import { Reveal } from './Reveal'

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noreferrer"
      className={`product-card product-${product.id}`}
    >
      <div className="product-website">
        <img
          src={product.preview}
          width="1280"
          height="880"
          alt={`${product.name} website preview`}
          loading="lazy"
          decoding="async"
        />
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
            <h2>Built in the lab</h2>
          </div>
        </div>
        <p className="section-description">
          Languages, tools and experiments you can use. Different projects, the
          same curiosity.
        </p>
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
