import { CommunityResource } from '@/lib/types'
import Link from 'next/link'
import { Users, Calendar, GraduationCap, Code, Handshake } from 'lucide-react'

interface CommunityProps {
  community: CommunityResource[]
}

const typeIcons = {
  foundation: Users,
  events: Calendar,
  mentorship: GraduationCap,
  contribute: Code,
  support: Handshake
}

export default function Community({ community }: CommunityProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl mb-6">
          Join the Community
        </h2>
        <p className="body-serif text-lg max-w-3xl mx-auto text-gray-600">
          Linux is built by its community. Whether you're a developer, system administrator,
          or enthusiast, there are many ways to contribute and participate.
        </p>
      </div>

      {/* Community resources grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {community.map((resource) => {
          const IconComponent = typeIcons[resource.type]

          return (
            <article
              key={resource.title}
              className="group card-standard hover-inversion"
            >
              {/* Icon and type indicator */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center group-hover:border-white">
                  <IconComponent size={20} strokeWidth={1.5} />
                </div>
                <span className="mono-label text-xs uppercase tracking-widest">
                  {resource.type}
                </span>
              </div>

              {/* Resource title and description */}
              <h3 className="heading-serif text-2xl mb-4 group-hover:text-white">
                {resource.title}
              </h3>

              <p className="body-serif text-sm leading-relaxed mb-6 text-gray-600 group-hover:text-gray-300">
                {resource.description}
              </p>

              {/* Action link */}
              <Link
                href={resource.href}
                className="inline-flex items-center text-sm mono-label uppercase tracking-widest group/link"
              >
                Get Started
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-100">
                  →
                </span>
              </Link>
            </article>
          )
        })}
      </div>

      {/* Community stats */}
      <div className="mt-16 p-8 md:p-12 texture-diagonal">
        <div className="text-center mb-12">
          <h3 className="display-heading text-3xl md:text-4xl mb-4">
            By the Numbers
          </h3>
          <p className="body-serif text-lg text-gray-600">
            A global community driving innovation in open source software.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center border-2 border-black p-6 hover-inversion">
            <div className="text-4xl font-display font-black mb-2">20,000+</div>
            <div className="mono-label text-xs uppercase tracking-widest">Contributors</div>
          </div>
          <div className="text-center border-2 border-black p-6 hover-inversion">
            <div className="text-4xl font-display font-black mb-2">30M+</div>
            <div className="mono-label text-xs uppercase tracking-widest">Lines of Code</div>
          </div>
          <div className="text-center border-2 border-black p-6 hover-inversion">
            <div className="text-4xl font-display font-black mb-2">1,000+</div>
            <div className="mono-label text-xs uppercase tracking-widest">Companies</div>
          </div>
          <div className="text-center border-2 border-black p-6 hover-inversion">
            <div className="text-4xl font-display font-black mb-2">1991</div>
            <div className="mono-label text-xs uppercase tracking-widest">Founded</div>
          </div>
        </div>
      </div>

      {/* Get involved callout */}
      <div className="mt-16 text-center">
        <div className="inline-block p-8 border-4 border-black">
          <h3 className="heading-serif text-2xl mb-4">
            Ready to Contribute?
          </h3>
          <p className="body-serif text-sm mb-6 text-gray-600">
            Every contribution matters. From bug reports to kernel development,
            your skills can help shape the future of Linux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://kernel.org/doc/html/latest/process/submitting-patches.html"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Submit a Patch
            </a>
            <a
              href="https://wiki.linuxfoundation.org/newcomers"
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Contributors Guide
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}