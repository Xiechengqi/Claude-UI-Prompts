import Link from 'next/link'
import { Github, Mail, ExternalLink } from 'lucide-react'

const footerSections = [
  {
    title: 'Resources',
    links: [
      { label: 'Kernel.org', href: 'https://kernel.org' },
      { label: 'Linux Foundation', href: 'https://linuxfoundation.org' },
      { label: 'Linux Documentation', href: 'https://tldp.org' },
      { label: 'Man Pages', href: 'https://man7.org/linux/man-pages/' }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'Mailing Lists', href: 'https://kernel.org/doc/html/latest/process/maintainer-pgp-guide.html' },
      { label: 'Linux Subreddit', href: 'https://reddit.com/r/linux' },
      { label: 'Stack Exchange', href: 'https://unix.stackexchange.com' },
      { label: 'IRC Channels', href: 'https://kernel.org/doc/html/latest/process/development.html#irc' }
    ]
  },
  {
    title: 'Developers',
    links: [
      { label: 'Kernel Development', href: 'https://kernel.org/doc/html/latest/process/development.html' },
      { label: 'Submit Patches', href: 'https://kernel.org/doc/html/latest/process/submitting-patches.html' },
      { label: 'Coding Style', href: 'https://kernel.org/doc/html/latest/process/coding-style.html' },
      { label: 'API Documentation', href: 'https://kernel.org/doc/html/latest/' }
    ]
  }
]

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/torvalds/linux',
    label: 'Linux Kernel on GitHub'
  },
  {
    icon: Mail,
    href: 'mailto:linux-kernel@vger.kernel.org',
    label: 'Linux Kernel Mailing List'
  }
]

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t-8 border-white">
      <div className="texture-noise absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden />

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Linux Foundation Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 border-2 border-white flex items-center justify-center">
                <span className="font-display font-bold text-lg">L</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">Linux</span>
            </div>
            <p className="body-serif text-sm leading-relaxed text-gray-300 mb-6">
              The operating system that runs the world. Open source, secure, and community-driven.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="w-10 h-10 border-2 border-white flex items-center justify-center transition-all duration-100 hover:bg-white hover:text-black focus-ring-inverted"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mono-label text-xs uppercase tracking-widest mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-100 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={12} strokeWidth={1.5} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t-2 border-white">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© {new Date().getFullYear()} Linux Foundation</span>
              <span>•</span>
              <span>Released under GPL</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-100"
              >
                Privacy Policy
              </Link>
              <Link
                href="/trademarks"
                className="text-gray-400 hover:text-white transition-colors duration-100"
              >
                Trademark Usage
              </Link>
              <Link
                href="/code-of-conduct"
                className="text-gray-400 hover:text-white transition-colors duration-100"
              >
                Code of Conduct
              </Link>
            </div>
          </div>
        </div>

        {/* Linux Quote */}
        <div className="mt-8 text-center">
          <blockquote className="body-serif text-lg text-gray-300 italic">
            "Talk is cheap. Show me the code."
            <footer className="mono-label text-xs uppercase tracking-widest mt-3 text-gray-500">
              — Linus Torvalds
            </footer>
          </blockquote>
        </div>
      </div>
    </footer>
  )
}