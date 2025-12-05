import { DocumentationItem } from '@/lib/types'
import Link from 'next/link'
import { Book, Shield, Cpu, Settings, Code } from 'lucide-react'

interface DocumentationProps {
  documentation: DocumentationItem[]
}

const categoryIcons = {
  kernel: Book,
  hardware: Cpu,
  security: Shield,
  admin: Settings,
  development: Code
}

const categoryColors = {
  kernel: 'border-black',
  hardware: 'border-black',
  security: 'border-black',
  admin: 'border-black',
  development: 'border-black'
}

export default function Documentation({ documentation }: DocumentationProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl mb-6">
          Documentation
        </h2>
        <p className="body-serif text-lg max-w-3xl mx-auto text-gray-600">
          Comprehensive documentation covering every aspect of Linux system administration,
          kernel development, and enterprise deployment.
        </p>
      </div>

      {/* Documentation grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documentation.map((doc) => {
          const IconComponent = categoryIcons[doc.category]

          return (
            <article
              key={doc.title}
              className="group card-standard hover-inversion"
            >
              {/* Icon and category */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 border-2 ${categoryColors[doc.category]} flex items-center justify-center group-hover:border-white`}>
                    <IconComponent size={16} strokeWidth={1.5} />
                  </div>
                  <span className="mono-label text-xs uppercase tracking-widest">
                    {doc.category}
                  </span>
                </div>
                <span className="mono-label text-xs text-gray-500">
                  {new Date(doc.lastUpdated).toLocaleDateString()}
                </span>
              </div>

              {/* Document title and description */}
              <h3 className="heading-serif text-2xl mb-4 group-hover:text-white">
                {doc.title}
              </h3>

              <p className="body-serif text-sm leading-relaxed mb-6 text-gray-600 group-hover:text-gray-300">
                {doc.description}
              </p>

              {/* Read more link */}
              <Link
                href={doc.href}
                className="inline-flex items-center text-sm mono-label uppercase tracking-widest group/link"
              >
                Read Documentation
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-100">
                  →
                </span>
              </Link>
            </article>
          )
        })}
      </div>

      {/* Quick reference section */}
      <div className="mt-16 p-8 md:p-12 texture-grid">
        <h3 className="display-heading text-3xl mb-8 text-center">Quick Reference</h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Common commands reference */}
          <div className="border-2 border-black p-6">
            <h4 className="mono-label text-xs uppercase tracking-widest mb-4">Essential Commands</h4>
            <div className="space-y-2">
              <code className="block text-xs font-mono border border-black p-2">
                ls -la /proc/cpuinfo
              </code>
              <code className="block text-xs font-mono border border-black p-2">
                uname -r
              </code>
              <code className="block text-xs font-mono border border-black p-2">
                dmesg | head
              </code>
            </div>
          </div>

          {/* Configuration files */}
          <div className="border-2 border-black p-6">
            <h4 className="mono-label text-xs uppercase tracking-widest mb-4">Config Files</h4>
            <div className="space-y-2">
              <code className="block text-xs font-mono border border-black p-2">
                /etc/sysctl.conf
              </code>
              <code className="block text-xs font-mono border border-black p-2">
                /proc/sys/
              </code>
              <code className="block text-xs font-mono border border-black p-2">
                /etc/fstab
              </code>
            </div>
          </div>

          {/* Kernel modules */}
          <div className="border-2 border-black p-6">
            <h4 className="mono-label text-xs uppercase tracking-widest mb-4">Module Commands</h4>
            <div className="space-y-2">
              <code className="block text-xs font-mono border border-black p-2">
                lsmod
              </code>
              <code className="block text-xs font-mono border border-black p-2">
                modprobe vboxdrv
              </code>
              <code className="block text-xs font-mono border border-black p-2">
                rmmod -f module
              </code>
            </div>
          </div>

          {/* System monitoring */}
          <div className="border-2 border-black p-6">
            <h4 className="mono-label text-xs uppercase tracking-widest mb-4">Monitoring</h4>
            <div className="space-y-2">
              <code className="block text-xs font-mono border border-black p-2">
                top -H
              </code>
              <code className="block text-xs font-mono border border-black p-2">
                free -h
              </code>
              <code className="block text-xs font-mono border border-black p-2">
                iostat -x 1
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* External resources */}
      <div className="mt-12 text-center">
        <h4 className="mono-label text-xs uppercase tracking-widest mb-6">External Resources</h4>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://tldp.org"
            className="btn-ghost text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Linux Documentation Project
          </a>
          <a
            href="https://kernel.org/doc"
            className="btn-ghost text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kernel Docs
          </a>
          <a
            href="https://man7.org/linux/man-pages"
            className="btn-ghost text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Man Pages
          </a>
        </div>
      </div>
    </section>
  )
}