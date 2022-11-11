import { useScrollFade } from '@lib/hooks'
import clsx from 'clsx'
import Image from 'next/image'

export default function Cast({ cast }) {
  const { ref, scrollClass, onScroll } = useScrollFade()

  return (
    <div
      ref={ref}
      className={clsx(
        'flex overflow-x-auto space-x-4 pb-4 scroll-section',
        scrollClass
      )}
      onScroll={onScroll}
    >
      {cast.map((person) => (
        <div key={person.id} className="flex items-center">
          <div className="aspect-square relative w-16 shrink-0">
            <Image
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : '/placeholder.svg'
              }
              alt={person.name}
              className="object-cover object-center rounded-full border-4 border-black-10"
              fill
            />
          </div>
          <div className="text-xs ml-4">
            <span className="block truncate">{person.name}</span>
            <span className="text-white-65 truncate">{person.character}</span>
          </div>
        </div>
      ))}
    </div>
  )
}