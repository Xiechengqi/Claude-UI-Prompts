import 'server-only'
import { LinuxPageData, KernelRelease, DownloadMirror } from './types'

// Hero content - The voice of Linux Foundation
const heroCopy satisfies LinuxPageData['hero'] = {
  headline: 'The operating system that runs the world.',
  subhead: 'Linux powers everything from embedded devices and smartphones to the world\'s supercomputers and cloud infrastructure. Open. Secure. Unstoppable.',
  cta: { label: 'Download Latest', href: '#download' },
  secondaryCta: { label: 'View Releases', href: '#releases' }
}

// Core documentation sections
const documentationItems = [
  {
    title: 'Kernel Documentation',
    href: '/docs/kernel',
    description: 'Comprehensive kernel subsystem documentation, APIs, scheduler internals, and ABI guarantees.',
    category: 'kernel' as const,
    lastUpdated: '2024-11-15'
  },
  {
    title: 'Hardware Compatibility',
    href: '/docs/hardware',
    description: 'Certified hardware matrices, firmware requirements, device driver documentation, and compatibility tracking.',
    category: 'hardware' as const,
    lastUpdated: '2024-11-20'
  },
  {
    title: 'Security Advisories',
    href: '/security',
    description: 'CVE disclosures, vulnerability reports, security patches, and mitigation procedures for enterprise deployments.',
    category: 'security' as const,
    lastUpdated: '2024-11-22'
  },
  {
    title: 'System Administration',
    href: '/docs/admin',
    description: 'System configuration, performance tuning, networking, storage management, and troubleshooting guides.',
    category: 'admin' as const,
    lastUpdated: '2024-11-18'
  },
  {
    title: 'Development Guide',
    href: '/docs/development',
    description: 'Kernel development workflow, coding standards, patch submission, and contribution guidelines.',
    category: 'development' as const,
    lastUpdated: '2024-11-21'
  }
]

// Community engagement pathways
const communityResources = [
  {
    title: 'Linux Foundation',
    description: 'Governance structure, working groups, membership programs, and enterprise partnership opportunities.',
    href: '/community/foundation',
    type: 'foundation' as const
  },
  {
    title: 'Kernel Summits',
    description: 'Upcoming maintainer conferences, call for papers, technical sessions, and networking events.',
    href: '/events',
    type: 'events' as const
  },
  {
    title: 'Mentorship Programs',
    description: 'Guided contribution pathways, outreach programs, and opportunities to work directly with subsystem maintainers.',
    href: '/community/mentorship',
    type: 'mentorship' as const
  },
  {
    title: 'Contribute',
    description: 'Start contributing to Linux. Find beginner-friendly tasks, coding projects, and documentation needs.',
    href: '/contribute',
    type: 'contribute' as const
  },
  {
    title: 'Commercial Support',
    description: 'Enterprise-grade support options, service providers, and professional consulting partnerships.',
    href: '/support',
    type: 'support' as const
  }
]

// Latest kernel releases
const latestReleases satisfies KernelRelease[] = [
  {
    codename: 'Korean Dumpling',
    version: '6.12',
    lts: true,
    releaseDate: '2024-11-12',
    kernel: '6.12.0',
    highlights: [
      'Rust for real-time kernel components',
      'Energy-aware scheduling framework v2',
      'Confidential computing enhancements',
      'Ext4 filesystem performance optimizations',
      'BPF syscall improvements and security hardening'
    ],
    changelog: 'Major LTS release focusing on security, performance, and expanded hardware support.'
  },
  {
    codename: 'Baby Opossum',
    version: '6.11',
    lts: false,
    releaseDate: '2024-08-25',
    kernel: '6.11.3',
    highlights: [
      'Initial support for RISC-V vector extensions',
      'io_uring priority lanes and zero-copy operations',
      'AMD Zen 5 microarchitecture support',
      ' Nouveau driver improvements for RTX 40 series',
      'Filesystem layering improvements'
    ],
    changelog: 'Feature release with enhanced hardware support and I/O performance improvements.'
  },
  {
    codename: 'Opossums',
    version: '6.10',
    lts: false,
    releaseDate: '2024-06-23',
    kernel: '6.10.11',
    highlights: [
      'FS-CACHE filesystem improvements',
      'NTFS3 driver updates and performance gains',
      'Perf tool enhancements for profiling',
      'tcp improvements and congestion control',
      'Extensive driver updates for networking gear'
    ],
    changelog: 'Stability and performance focused release with extensive driver updates.'
  }
]

// Global download mirror infrastructure
const downloadMirrors satisfies DownloadMirror[] = [
  {
    region: 'North America',
    url: 'https://mirrors.edge.kernel.org',
    bandwidthGbps: 320,
    country: 'USA',
    latency: 15
  },
  {
    region: 'Europe',
    url: 'https://mirrors.edge.kernel.org',
    bandwidthGbps: 280,
    country: 'Germany',
    latency: 12
  },
  {
    region: 'Asia Pacific',
    url: 'https://mirrors.edge.kernel.org',
    bandwidthGbps: 210,
    country: 'Singapore',
    latency: 25
  },
  {
    region: 'South America',
    url: 'https://mirrors.edge.kernel.org',
    bandwidthGbps: 45,
    country: 'Brazil',
    latency: 85
  },
  {
    region: 'Africa',
    url: 'https://mirrors.edge.kernel.org',
    bandwidthGbps: 20,
    country: 'South Africa',
    latency: 120
  },
  {
    region: 'Middle East',
    url: 'https://mirrors.edge.kernel.org',
    bandwidthGbps: 35,
    country: 'UAE',
    latency: 45
  }
]

// In a real implementation, these would fetch from actual APIs
async function fetchReleasesFromAPI(): Promise<KernelRelease[]> {
  try {
    // This would connect to kernel.org API or similar
    const response = await fetch('https://api.kernel.org/releases', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    if (!response.ok) {
      throw new Error(`Kernel API returned ${response.status}`)
    }
    const data = await response.json()
    return data as KernelRelease[]
  } catch (error) {
    console.warn('Failed to fetch kernel releases, using fallback data:', error)
    return latestReleases
  }
}

async function fetchMirrorsFromAPI(): Promise<DownloadMirror[]> {
  try {
    // This would connect to mirror status APIs
    const response = await fetch('https://api.kernel.org/mirrors', {
      next: { revalidate: 1800 }, // Cache for 30 minutes
    })
    if (!response.ok) {
      throw new Error(`Mirror API returned ${response.status}`)
    }
    const data = await response.json()
    return data as DownloadMirror[]
  } catch (error) {
    console.warn('Failed to fetch mirror data, using fallback data:', error)
    return downloadMirrors
  }
}

export async function getLinuxPageData(): Promise<LinuxPageData> {
  // In production, these would be parallel API calls with proper error handling
  const [releases, mirrors] = await Promise.all([
    fetchReleasesFromAPI(),
    fetchMirrorsFromAPI()
  ])

  return {
    hero: heroCopy,
    releases,
    mirrors,
    documentation: documentationItems,
    community: communityResources
  }
}

export async function getKernelVersions(): Promise<string[]> {
  // Return available kernel versions for download page
  return latestReleases.map(release => release.version)
}

export function getMirrorByRegion(region: string): DownloadMirror | undefined {
  return downloadMirrors.find(mirror =>
    mirror.region.toLowerCase().includes(region.toLowerCase())
  )
}