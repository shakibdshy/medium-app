import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { client } from '../lib/client'
import { Post } from '../typings'

interface Props {
  posts: [Post];
}


const Home = ({ posts }: Props) => {  
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Banner />
        
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "post"]';
  const posts = await client.fetch(query);

  return {
    props: { posts }
  }
}

export default Home
