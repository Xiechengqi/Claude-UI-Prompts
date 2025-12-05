import { DownloadMirror } from '@/lib/types'

interface InfrastructureProps {
  mirrors: DownloadMirror[]
}

export default function Infrastructure({ mirrors }: InfrastructureProps) {
  const totalBandwidth = mirrors.reduce((sum, mirror) => sum + mirror.bandwidthGbps, 0)
  const averageLatency = mirrors.reduce((sum, mirror) => sum + (mirror.latency || 0), 0) / mirrors.length

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        {/* Download topology */}
        <div className="card-standard relative overflow-hidden texture-grid">
          <h3 className="heading-serif text-3xl md:text-4xl mb-6">
            Global Distribution Infrastructure
          </h3>

          <p className="body-serif text-lg leading-relaxed mb-8">
            Our mirror network spans every continent, ensuring fast, reliable access to Linux distributions
            and kernel source code. Each mirror is continuously monitored for performance, security, and
            data integrity.
          </p>

          {/* Infrastructure stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-black">{mirrors.length}</div>
              <div className="mono-label text-xs uppercase tracking-widest">Mirrors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-black">{totalBandwidth}+</div>
              <div className="mono-label text-xs uppercase tracking-widest">Gbps Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-black">{averageLatency.toFixed(0)}ms</div>
              <div className="mono-label text-xs uppercase tracking-widest">Avg Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-black">24/7</div>
              <div className="mono-label text-xs uppercase tracking-widest">Monitoring</div>
            </div>
          </div>

          {/* Mirror regions */}
          <div className="border-t-2 border-black pt-6">
            <h4 className="mono-label text-xs uppercase tracking-widest mb-4">Regional Mirrors</h4>
            <dl className="grid gap-4 md:grid-cols-2">
              {mirrors.map((mirror) => (
                <div key={mirror.region} className="flex items-center justify-between py-2 border-b border-black">
                  <div>
                    <dt className="mono-label text-xs uppercase tracking-widest">{mirror.region}</dt>
                    <dd className="text-sm font-mono truncate">{mirror.url}</dd>
                  </div>
                  <div className="text-right">
                    <dd className="mono-label text-xs">{mirror.bandwidthGbps} Gbps</dd>
                    {mirror.latency && (
                      <dd className="text-xs text-gray-600">{mirror.latency}ms</dd>
                    )}
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Integrity protocol */}
        <div className="card-standard">
          <h3 className="heading-serif text-2xl md:text-3xl mb-6">
            Security & Integrity
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mono-label text-xs uppercase tracking-widest mb-3">Cryptographic Verification</h4>
              <ul className="space-y-2 text-sm body-serif">
                <li>SHA-512 checksums for all releases</li>
                <li>GPG signatures from kernel maintainers</li>
                <li>Reproducible build verification</li>
                <li>Cryptographic hash transparency</li>
              </ul>
            </div>

            <div>
              <h4 className="mono-label text-xs uppercase tracking-widest mb-3">Distribution Methods</h4>
              <ul className="space-y-2 text-sm body-serif">
                <li>HTTP/HTTPS direct downloads</li>
                <li>BitTorrent swarm support</li>
                <li>rsync synchronization</li>
                <li>Content delivery networks (CDNs)</li>
              </ul>
            </div>

            <div>
              <h4 className="mono-label text-xs uppercase tracking-widest mb-3">Compliance & Standards</h4>
              <ul className="space-y-2 text-sm body-serif">
                <li>SBOM in SPDX format</li>
                <li>FOSS license compliance</li>
                <li>Export control compliance</li>
                <li>Audit trail and logging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Download statistics visualization */}
      <div className="mt-12 card-standard">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center p-6 border-2 border-black hover-inversion">
            <div className="text-4xl font-display font-black mb-2">10M+</div>
            <div className="mono-label text-xs uppercase tracking-widest">Downloads Monthly</div>
          </div>
          <div className="text-center p-6 border-2 border-black hover-inversion">
            <div className="text-4xl font-display font-black mb-2">190+</div>
            <div className="mono-label text-xs uppercase tracking-widest">Countries</div>
          </div>
          <div className="text-center p-6 border-2 border-black hover-inversion">
            <div className="text-4xl font-display font-black mb-2">99.9%</div>
            <div className="mono-label text-xs uppercase tracking-widest">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}