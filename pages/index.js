import { tmdb } from '@lib/service'
import Link from 'next/link'

export default function Home({ data }) {
  return (
    <div>
      <nav>
        <Link href="/" replace>
          All
        </Link>
        <Link href="?tab=movie" replace>
          Movies
        </Link>
        <Link href="?tab=tv" replace>
          TV Shows
        </Link>
      </nav>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const response = await tmdb.get(`/trending/${query.tab || 'all'}/week`)

  if (response.status === 404) {
    return {
      notFound: true,
    }
  }

  if (response.data.success === false) {
    return {
      props: {
        error: {
          statusCode: response.status,
          statusMessage: response.data.status_message,
        },
      },
    }
  }

  return {
    props: {
      data: response.data,
    },
  }
}
