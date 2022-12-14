import { tmdb } from '@lib/service'
import Head from 'next/head'
import Navbar from '@components/navbar'
import Footer from '@components/footer'
import SearchIcon from '@components/icons/search.svg'
import Card from '@components/card'
import Pagination from '@components/pagination'
import Breadcrumb from '@components/breadcrumb'
import Filters from '@components/filters'
import Link from 'next/link'

export default function TV({ data, query, genres }) {
  return (
    <div>
      <Head>
        <title>TV Shows &mdash; Movielister</title>
        <meta
          name="description"
          content="Movielister, Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis pariatur optio quas!"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Navbar />

      <div className="container pb-12 animate-fade-in">
        <div className="my-20 max-w-xl">
          <Breadcrumb
            pages={[
              {
                href: '/',
                label: 'Home',
              },
              {
                href: '/tv',
                label: 'TV Shows',
              },
            ]}
          />
          <h1 className="heading-xl mt-4">TV Shows</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[260px] flex-shrink-0 relative">
            <div className="sticky top-24">
              <Filters genres={genres} />
            </div>
          </div>
          <div className="w-full">
            {data.results?.length ? (
              <div>
                <div className="card-list lg:grid-cols-2 xl:grid-cols-3">
                  {data.results.map((result) => (
                    <Card
                      key={result.id}
                      id={result.id}
                      image={result.poster_path}
                      title={result.name}
                      rating={result.vote_average}
                      type="tv"
                    />
                  ))}
                </div>
                <Pagination
                  totalPages={data.total_pages}
                  currentPage={query.page}
                  className="mt-8"
                />
              </div>
            ) : (
              <div className="h-96 lg:h-full grid place-items-center bg-black-10 rounded-xl">
                <div className="flex flex-col items-center">
                  <SearchIcon className="text-3xl mb-4" />
                  <span>No result for this filters</span>
                  <Link
                    href="/tv"
                    className="button button-primary button-sm mt-4"
                  >
                    Clear filters
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const response = await tmdb.get('/discover/tv', {
    params: {
      ...query,
    },
  })

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
          statusMessage:
            response.data.errors[0] || response.data.status_message,
        },
      },
    }
  }

  const { data: genresData } = await tmdb.get('/genre/tv/list')

  return {
    props: {
      data: response.data,
      genres: genresData.genres,
      query,
    },
  }
}
