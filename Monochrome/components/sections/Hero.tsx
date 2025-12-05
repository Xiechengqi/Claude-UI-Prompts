import Link from 'next/link'

interface HeroProps {
  headline: string
  subhead: string
  cta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export default function Hero({ headline, subhead, cta, secondaryCta }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b-8 border-black">
      {/* Background texture */}
      <div className="absolute inset-0 texture-lines opacity-[0.08]" aria-hidden />

      {/* Additional subtle texture layer */}
      <div className="absolute inset-0 texture-noise" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Foundation badge */}
        <div className="mb-12">
          <span className="mono-label text-xs uppercase tracking-widest text-black">
            Linux Foundation
          </span>
        </div>

        {/* Main headline - oversized as per design system */}
        <h1 className="display-heading text-[clamp(3.5rem,11vw,9rem)] mb-12 text-balance">
          {headline}
        </h1>

        {/* Subheading */}
        <p className="body-serif text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-16 text-pretty">
          {subhead}
        </p>

        {/* Primary CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link
            href={cta.href}
            className="btn-primary text-justify min-w-[280px]"
            aria-label={`Download ${cta.label}`}
          >
            {cta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="btn-secondary text-justify min-w-[280px]"
            aria-label={`View ${secondaryCta.label}`}
          >
            {secondaryCta.label}
          </Link>
        </div>

        {/* Visual punctuation - decorative elements */}
        <div className="flex items-center justify-center space-x-6">
          <div className="w-4 h-4 border-2 border-black" aria-hidden />
          <div className="h-1 w-32 bg-black" aria-hidden />
          <span className="mono-label text-xs uppercase tracking-widest">
            Secure • Open • Global
          </span>
          <div className="h-1 w-32 bg-black" aria-hidden />
          <div className="w-4 h-4 border-2 border-black" aria-hidden />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-100">
            <span className="mono-label text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-0.5 h-8 bg-black"></div>
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-8 right-8 hidden lg:block">
        <div className="w-16 h-16 border-2 border-black" aria-hidden />
      </div>

      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="w-16 h-16 border-2 border-black" aria-hidden />
      </div>
    </section>
  )
}