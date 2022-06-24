import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Posts from '../components/Posts'
import { client } from '../lib/client'
import { Post } from '../types/typings'

interface Props {
  posts: [Post];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Banner />
        <Posts posts={posts} />
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
  _id,
  title,
  slug,
  short,
  mainImage,
  author -> {
  name, 
  image
},
categories,
body,
publishedAt
}`;
  const posts = await client.fetch(query);

  return {
    props: { posts }
  }
}

export default Home
