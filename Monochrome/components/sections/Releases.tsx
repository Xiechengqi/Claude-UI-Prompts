import { KernelRelease } from '@/lib/types'

interface ReleasesProps {
  releases: KernelRelease[]
}

export default function Releases({ releases }: ReleasesProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="text-center mb-16">
        <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl mb-6">
          Latest Releases
        </h2>
        <p className="body-serif text-lg max-w-3xl mx-auto text-gray-600">
          Track the evolution of the Linux kernel. Each release brings new features, hardware support,
          and security enhancements to power the world's computing infrastructure.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {releases.map((release) => (
          <article
            key={release.codename}
            className="group card-standard hover-inversion cursor-pointer"
          >
            {/* Header with version and type */}
            <header className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className={`mono-label text-xs px-3 py-1 ${
                      release.lts
                        ? 'bg-black text-white'
                        : 'border border-black text-black'
                    }`}
                  >
                    {release.lts ? 'LTS' : 'STABLE'}
                  </span>
                  <span className="mono-label text-xs text-gray-500">
                    {release.releaseDate}
                  </span>
                </div>
                <h3 className="heading-serif text-2xl mb-2">
                  {release.codename}
                </h3>
                <p className="mono-label text-sm font-mono">
                  Kernel {release.kernel}
                </p>
              </div>
            </header>

            {/* Release highlights */}
            <div className="space-y-4">
              <div>
                <h4 className="mono-label text-xs uppercase tracking-widest mb-3">
                  Key Highlights
                </h4>
                <ul className="space-y-2">
                  {release.highlights.slice(0, 3).map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm body-serif leading-relaxed"
                    >
                      <span className="w-1 h-1 bg-black mt-2 mr-3 flex-shrink-0"></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Release metadata */}
              <dl className="border-t border-black pt-4 space-y-2">
                <div className="flex justify-between">
                  <dt className="mono-label text-xs">Version</dt>
                  <dd className="font-mono text-sm">{release.version}</dd>
                </div>
                {release.changelog && (
                  <div className="flex justify-between">
                    <dt className="mono-label text-xs">Notes</dt>
                    <dd className="text-xs text-gray-600 line-clamp-2">
                      {release.changelog}
                    </dd>
                  </div>
                )}
              </dl>

              {/* Action link */}
              <div className="pt-4 border-t border-black">
                <a
                  href={`https://kernel.org/pub/linux/kernel/v6.x/linux-${release.kernel}.tar.xz`}
                  className="inline-flex items-center text-sm mono-label uppercase tracking-widest group/link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Source
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-100">
                    →
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* View all releases link */}
      <div className="mt-16 text-center">
        <a
          href="https://kernel.org"
          className="btn-ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          View All Releases on Kernel.org
        </a>
      </div>
    </section>
  )
}