export type ProductStatus = 'open-source' | 'waitlist'

export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  preview: string
  resources?: { label: string; href: string }[]
  status: ProductStatus
  license?: {
    name: string
    covers: string
  }
}

export const PRODUCTS: Product[] = [
  {
    id: 'olive',
    preview: '/products/olive-website.webp',
    resources: [
      { label: 'Olive docs', href: 'https://olive.ecnivs.com/docs/' },
      { label: 'Olive download', href: 'https://olive.ecnivs.com/download/' },
    ],
    name: 'Olive',
    tagline: 'A systems language you can read.',
    description:
      'Write systems code without braces, semicolons, or a garbage collector. Olive infers ownership and connects to C, Rust, and Python.',
    url: 'https://olive.ecnivs.com',
    status: 'open-source',
    license: {
      name: 'Apache License 2.0',
      covers: 'the Olive compiler, standard library, and related tooling',
    },
  },
  {
    id: 'pixie',
    preview: '/products/pixie-website.webp',
    name: 'Pixie',
    tagline: 'Your terminal. Your kind of agent.',
    description:
      'Pixie builds its own tools and changes its interface as you work. Make it fit your project, with up to 64% lower token usage through optimizations across the harness.',
    url: 'https://pixie.ecnivs.com',
    status: 'waitlist',
  },
]

export const STATUS_LABEL: Record<ProductStatus, string> = {
  'open-source': 'Open source',
  waitlist: 'Waitlist open',
}
