import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Logo from './logo'
import Modal from './modal'
import Search from './search'
import SearchIcon from './icons/search.svg'
import clsx from 'clsx'

export default function Navbar() {
  const ref = useRef(null)
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    if (searchOpen) {
      ref.current?.focus()
    } else {
      ref.current?.blur()
    }
  }, [searchOpen])

  return (
    <header className="navbar">
      <div className="container flex items-center">
        <Link href="/" className="text-[40px]">
          <Logo />
          <span className="sr-only">Movielister</span>
        </Link>

        <nav className="ml-auto flex items-center">
          <Link
            href="/movie"
            className={clsx(
              'nav-link',
              router.pathname === '/movie' && 'text-white-100'
            )}
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className={clsx(
              'nav-link',
              router.pathname === '/tv' && 'text-white-100'
            )}
          >
            TV Shows
          </Link>

          {router.pathname !== '/search' && (
            <button
              className="ml-4 text-xl"
              onClick={() => {
                setSearchOpen(true)
                ref?.current?.focus()
              }}
            >
              <SearchIcon />
              <span className="sr-only">Search</span>
            </button>
          )}

          <Modal isOpen={searchOpen} setIsOpen={setSearchOpen}>
            <div className="bg-gray-900 rounded-xl w-80 -mt-[10vw]">
              <Search forwardedRef={ref} />
            </div>
          </Modal>
        </nav>
      </div>
    </header>
  )
}
