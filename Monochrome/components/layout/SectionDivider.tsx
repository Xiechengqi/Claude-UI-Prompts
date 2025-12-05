interface SectionDividerProps {
  label?: string
  className?: string
}

export default function SectionDivider({ label, className = '' }: SectionDividerProps) {
  return (
    <div
      className={`section-divider ${className}`}
      aria-hidden={label ? 'false' : 'true'}
    >
      <div className="h-1 bg-black flex-1"></div>
      {label && (
        <span className="mono-label text-xs uppercase tracking-widest px-4 whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="h-1 bg-black flex-1"></div>
    </div>
  )
}