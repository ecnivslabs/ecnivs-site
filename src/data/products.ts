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
    id: 'pixie',
    name: 'Pixie',
    tagline: 'One harness that reshapes itself.',
    description:
      'Pixie writes its own tools, rewrites its own interface, and changes how it runs, live, against whatever domain you point it at. Catch it repeating itself and it builds the fix without being asked.',
    features: [
      'Builds tools unprompted when it notices it is repeating itself',
      'Rewrites its own interface live, no restart',
      'Real LSP diagnostics and typecheck gates',
    ],
    url: 'https://pixie.ecnivs.com',
    status: 'waitlist',
  },
]

export const STATUS_LABEL: Record<ProductStatus, string> = {
  'open-source': 'Live · open source',
  waitlist: 'In development · waitlist open',
}
