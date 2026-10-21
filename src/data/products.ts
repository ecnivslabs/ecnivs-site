export type ProductStatus =
  'open-source' | 'source-available' | 'waitlist' | 'accounts-open'

export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  resources?: { label: string; href: string }[]
  status: ProductStatus
  license?: {
    name: string
    covers: string
  }
} & (
  | { livePreview: true; preview?: never }
  | { livePreview?: false; preview: string }
)

export const PRODUCTS: Product[] = [
  {
    id: 'weft',
    livePreview: true,
    resources: [
      {
        label: 'Weft documentation',
        href: 'https://weft.ecnivs.com/docs/',
      },
      { label: 'Weft source', href: 'https://github.com/ecnivslabs/weft' },
    ],
    name: 'Weft',
    tagline: 'Video, written in ASCII',
    description:
      'A video codec built around colored ASCII symbols. Encode a clip as .sci, then bring it to your own player.',
    url: 'https://weft.ecnivs.com',
    status: 'source-available',
    license: {
      name: 'Weft Noncommercial License 1.0',
      covers:
        'the codec, ingestion tools, command line interface, and browser player',
    },
  },
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
    preview: '/products/pixie-frame-preview.webp',
    resources: [
      { label: 'Pixie docs', href: 'https://pixie.ecnivs.com/guide' },
      { label: 'Pixie availability', href: 'https://pixie.ecnivs.com/downloads' },
    ],
    name: 'Pixie',
    tagline: 'Your terminal. Your kind of agent.',
    description:
      'An AI coding agent that builds its own tools and adapts its terminal interface as you work. Make it fit your project.',
    url: 'https://pixie.ecnivs.com',
    status: 'accounts-open',
  },
]

export const STATUS_LABEL: Record<ProductStatus, string> = {
  'open-source': 'Open source',
  'source-available': 'Source available',
  waitlist: 'Waitlist open',
  'accounts-open': 'Accounts open',
}
