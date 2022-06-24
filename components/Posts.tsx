import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { urlFor } from '../lib/client';
import { Post } from '../types/typings';

interface Props {
    posts: [Post];
}

function Posts({ posts }: Props) {
    return (
        <>
            <div className="container mx-auto px-4 lg:px-0 py-10">
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                    {
                        posts.map((post, index) => (
                            <article className='prose rounded-md shadow' key={index}>
                                <Link href={`post/${post.slug.current}`}>
                                    <a className='no-underline'>
                                        {post.mainImage && (
                                            <Image src={urlFor(post.mainImage).url()!} width={500} height={300} className='rounded-t-md' />
                                        )}
                                        <div className='flex items-center justify-between gap-5 p-4'>
                                            <div>
                                                <h2 className='font-bold text-lg my-0'>{post.title.slice(0, 46)}</h2>
                                                <p className='text-sm mt-2'>{post.short} by {post.author.name}</p>
                                            </div>
                                            <div>
                                                <Image src={urlFor(post.author.image).url()!} width={60} height={60} className='rounded-full' layout='fixed' />
                                            </div>
                                        </div>
                                    </a>
                                </Link>

                            </article>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Posts