import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import React from 'react'
import { client, urlFor } from '../../lib/client';
import { Post } from '../../types/typings';
import PortableText from 'react-portable-text';

interface Props {
    post: Post;
}

function Post({ post }: Props) {
    // console.log(post);
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section>
                <Image src={urlFor(post.mainImage).url()!} width={1900} height={200} className='object-cover' />
                <div className="container xl:max-w-3xl mx-auto px-4 mt-12">
                    <h2 className='text-3xl font-bold'>{post.title}</h2>
                    <span className='block text-sm text-grey-500 mt-2'>{post.short}</span>
                    <div className='flex items-center gap-3 mt-4'>
                        <Image src={urlFor(post.author.image).url()!} width={40} height={40} className='rounded-full object-cover' />
                        <span>Blog Post By {post.author.name} - {post.publishedAt.slice(0, 10)}</span>
                    </div>

                    <div className='post-content pt-8'>
                        <PortableText
                            content={post.body}
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                            serializers={{
                                h1: (props: any) => {
                                    <h1 className='text-2xl font-bold' {...props} />
                                },
                                h2: (props: any) => {
                                    <h2 className='text-xl font-bold' {...props} />
                                },
                                h3: (props: any) => {
                                    <h3 className='text-lg font-bold' {...props} />
                                },
                                li: ({children}: any) => {
                                    <li className='ml-4 list-disc'>
                                        {children}
                                    </li>
                                },
                                link: ({href, children}: any) => {
                                    <a href={href} className='text-blue-500 hover:underline'>
                                        {children}
                                    </a>
                                },
                            }}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == 'post']{
        _id,
        slug {
            current
        }
    }`;
    const posts = await client.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == 'post' && slug.current == $slug][0]{
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
    const post = await client.fetch(query, {
        slug: params?.slug,
    });

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post
        },
        revalidate: 60,
    }
}
