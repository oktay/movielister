import Link from 'next/link'

export default function Breadcrumb({ pages }) {
  return (
    <nav className="flex items-center text-sm">
      {pages.map(({ href, label }) => (
        <Link key={href} href={href} className="breadcrumb">
          {label}
        </Link>
      ))}
    </nav>
  )
}
