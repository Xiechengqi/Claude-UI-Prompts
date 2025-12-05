export type DownloadMirror = {
  region: string
  url: string
  bandwidthGbps: number
  country?: string
  latency?: number
}

export type KernelRelease = {
  codename: string
  version: string
  lts: boolean
  releaseDate: string
  kernel: string
  highlights: string[]
  changelog?: string
  checksums?: {
    sha256: string
    sha512: string
  }
}

export type DocumentationItem = {
  title: string
  href: string
  description: string
  category: 'kernel' | 'hardware' | 'security' | 'admin' | 'development'
  lastUpdated: string
}

export type CommunityResource = {
  title: string
  description: string
  href: string
  type: 'foundation' | 'events' | 'mentorship' | 'contribute' | 'support'
}

export type LinuxPageData = {
  hero: {
    headline: string
    subhead: string
    cta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  releases: KernelRelease[]
  mirrors: DownloadMirror[]
  documentation: DocumentationItem[]
  community: CommunityResource[]
}

export type NavigationItem = {
  label: string
  href: string
  description?: string
}