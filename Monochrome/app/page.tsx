import { getLinuxPageData } from '@/lib/linux-data'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SectionDivider from '@/components/layout/SectionDivider'
import Hero from '@/components/sections/Hero'
import Releases from '@/components/sections/Releases'
import Infrastructure from '@/components/sections/Infrastructure'
import Documentation from '@/components/sections/Documentation'
import Community from '@/components/sections/Community'
import { Download, Terminal, Shield } from 'lucide-react'

export default async function Home() {
  const data = await getLinuxPageData()

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main>
        {/* Hero Section */}
        <Hero
          headline={data.hero.headline}
          subhead={data.hero.subhead}
          cta={data.hero.cta}
          secondaryCta={data.hero.secondaryCta}
        />

        {/* Key Features Section */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center group">
              <div className="w-16 h-16 border-2 border-black mx-auto mb-6 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-100">
                <Shield size={24} strokeWidth={1.5} />
              </div>
              <h3 className="heading-serif text-xl mb-3">Security First</h3>
              <p className="body-serif text-sm text-gray-600 leading-relaxed">
                Built with security at its core. Enterprise-grade encryption,
                mandatory access controls, and continuous security auditing.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 border-2 border-black mx-auto mb-6 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-100">
                <Terminal size={24} strokeWidth={1.5} />
              </div>
              <h3 className="heading-serif text-xl mb-3">Performance</h3>
              <p className="body-serif text-sm text-gray-600 leading-relaxed">
                Optimized for maximum performance. From embedded devices to
                supercomputers, Linux delivers unparalleled speed and efficiency.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 border-2 border-black mx-auto mb-6 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-100">
                <Download size={24} strokeWidth={1.5} />
              </div>
              <h3 className="heading-serif text-xl mb-3">Open Source</h3>
              <p className="body-serif text-sm text-gray-600 leading-relaxed">
                Completely free and open. Modify, distribute, and contribute to
                the world's most collaborative software project.
              </p>
            </div>
          </div>
        </section>

        {/* Releases Section */}
        <section id="releases" className="relative">
          <div className="texture-lines opacity-[0.03]" aria-hidden />
          <SectionDivider label="KERNEL RELEASES" />
          <Releases releases={data.releases} />
        </section>

        {/* Infrastructure Section */}
        <section id="infrastructure" className="relative py-16 md:py-24">
          <div className="texture-grid opacity-[0.02]" aria-hidden />
          <SectionDivider label="INFRASTRUCTURE" />
          <Infrastructure mirrors={data.mirrors} />
        </section>

        {/* Documentation Section */}
        <section id="documentation" className="relative py-16 md:py-24">
          <SectionDivider label="DOCUMENTATION" />
          <Documentation documentation={data.documentation} />
        </section>

        {/* Community Section */}
        <section id="community" className="relative py-16 md:py-24">
          <div className="texture-diagonal opacity-[0.01]" aria-hidden />
          <SectionDivider label="COMMUNITY" />
          <Community community={data.community} />
        </section>

        {/* Final Call to Action */}
        <section className="relative bg-black text-white">
          <div className="absolute inset-0 inverted-lines opacity-[0.03]" aria-hidden />
          <div className="absolute inset-0 inverted-radial opacity-[0.05]" aria-hidden />

          <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-32">
            <div className="text-center">
              <span className="mono-label text-xs uppercase tracking-widest text-white">
                Join the Movement
              </span>
              <h2 className="display-heading text-[clamp(3rem,8vw,6rem)] mt-8 mb-8 text-white">
                Start Your Linux Journey Today
              </h2>
              <p className="body-serif text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 text-gray-300">
                Whether you're a developer, system administrator, or just curious about open source,
                Linux offers endless opportunities for learning and growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href={data.hero.cta.href}
                  className="btn-primary bg-white text-black hover:bg-black hover:text-white focus-ring-inverted"
                >
                  Download Linux
                </a>
                <a
                  href="/contribute"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-black focus-ring-inverted"
                >
                  Contribute to Kernel
                </a>
              </div>

              {/* Visual punctuation */}
              <div className="flex items-center justify-center space-x-6 mt-16">
                <div className="w-4 h-4 border-2 border-white" aria-hidden />
                <div className="h-1 w-32 bg-white" aria-hidden />
                <span className="mono-label text-xs uppercase tracking-widest text-white">
                  Free Forever
                </span>
                <div className="h-1 w-32 bg-white" aria-hidden />
                <div className="w-4 h-4 border-2 border-white" aria-hidden />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}