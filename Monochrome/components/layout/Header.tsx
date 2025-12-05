'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavigationItem } from '@/lib/types'

const navigationItems: NavigationItem[] = [
  { label: 'Distributions', href: '/distributions', description: 'Browse Linux distributions' },
  { label: 'Documentation', href: '/docs', description: 'Kernel and system documentation' },
  { label: 'Community', href: '/community', description: 'Join the Linux community' },
  { label: 'About', href: '/about', description: 'About Linux Foundation' }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-4 group"
              aria-label="Linux Foundation Home"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border-2 border-black flex items-center justify-center">
                  <span className="font-display font-bold text-sm">L</span>
                </div>
                <span className="font-display font-bold text-xl tracking-tight">LINUX</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mono-label text-xs group"
                  aria-label={item.description}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-100 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 border-2 border-black focus-ring"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-black bg-white">
            <nav className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
              <div className="flex flex-col space-y-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between py-3 border-b border-black group"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label={item.description}
                  >
                    <span className="mono-label text-xs uppercase tracking-widest">
                      {item.label}
                    </span>
                    <span className="text-black opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Section */}
              <div className="mt-8 pt-8 border-t-2 border-black">
                <div className="space-y-4">
                  <Link
                    href="#download"
                    className="btn-primary w-full justify-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Download Linux
                  </Link>
                  <Link
                    href="/contribute"
                    className="btn-secondary w-full justify-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contribute
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}