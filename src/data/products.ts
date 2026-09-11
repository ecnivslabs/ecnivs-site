export type ProductStatus = 'open-source' | 'waitlist'

export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  url: string
  status: ProductStatus
  license?: {
    name: string
    covers: string
  }
}

export const PRODUCTS: Product[] = [
  {
    id: 'olive',
    name: 'Olive',
    tagline: 'A systems language you can read.',
    description:
      'No garbage collector, no braces, and no semicolons. Indentation defines the structure, and the compiler infers ownership for you. When it can’t prove a borrow is safe, it falls back to a runtime check instead of letting memory corrupt silently.',
    features: [
      'Compiler-inferred ownership, no lifetime syntax',
      'Native interop with C, Rust, and Python',
      'Own package registry and distribution infrastructure',
    ],
    url: 'https://olive.ecnivs.com',
    status: 'open-source',
    license: {
      name: 'Apache License 2.0',
      covers: 'the Olive compiler, standard library, and related tooling',
    },
  },
  {
    id: 'crank',
    name: 'Crank',
    tagline: 'A coding agent that rewrites itself.',
    description:
      'A plugin-kernel coding agent that authors, typechecks, and hot-mounts its own runtime plugins. It does the same thing for video production, all on the same kernel.',
    features: [
      'Self-patching runtime, no restart to pick up a change',
      'Real LSP diagnostics and typecheck gates',
      'One kernel: coding tools and a video-production pack',
    ],
    url: 'https://crank.ecnivs.com',
    status: 'waitlist',
  },
]

export const STATUS_LABEL: Record<ProductStatus, string> = {
  'open-source': 'Live · open source',
  waitlist: 'In development · waitlist open',
}
