import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client';
import { Post } from '../../types/typings';
import PortableText from 'react-portable-text';
import { Button } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}
interface Props {
    post: Post;
}

function Post({ post }: Props) {
    console.log(post);
    
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

    const onSubmit: SubmitHandler<FormInput> = (data) => {
        fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(() => {
                setSubmitted(true);
            })
            .catch((err) => {
                setSubmitted(false);
                console.log(err);
            });
    };

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
                                li: ({ children }: any) => {
                                    <li className='ml-4 list-disc'>
                                        {children}
                                    </li>
                                },
                                link: ({ href, children }: any) => {
                                    <a href={href} className='text-blue-500 hover:underline'>
                                        {children}
                                    </a>
                                },
                            }}
                        />
                    </div>
                    <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
                    <div className='my-8'>
                        <p className='text-yellow-700'>Enjoyed this article?</p>
                        <h3 className='text-4xl font-bold font-serif'>Leave a Comment below!</h3>
                    </div>
                    {
                        submitted ? (
                            <div className='flex flex-col py-10 px-5 my-10 bg-yellow-800 text-white'>
                                <h1 className='text-2xl font-bold font-serif'>Thank you for submitting your comment!</h1>
                                <p>Once it has been approved, it will appear below!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-6 mb-10'>
                                <div>
                                    <label htmlFor="name" className='text-gray-700'>Name</label>
                                    <input {...register("name", { required: true })} id="name" type="text" placeholder="Your Name" className='mt-1 block w-full rounded-md bg-grey-100 border-transparent shadow focus:border-gray-500 focus:bg-white focus:ring-0' />
                                </div>
                                {errors.name && (
                                    <div className="text-red-500 text-sm font-bold">The Name Field is required</div>
                                )}
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input {...register("email", { required: true })} id="email" type="email" placeholder="email@example.com" className='mt-1 block w-full rounded-md bg-grey-100 shadow border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' />
                                </div>
                                {errors.email && (
                                    <div className="text-red-500 text-sm font-bold">The Email Field is required</div>
                                )}
                                <div>
                                    <label htmlFor="massage">Comment</label>
                                        <textarea {...register("comment", { required: true })} name="comment" id="comment" placeholder='Massage' className='form-textarea mt-1 block w-full rounded-md bg-grey-100 border-transparent shadow focus:border-gray-500 focus:bg-white focus:ring-0'></textarea>
                                </div>
                                {errors.comment && (
                                    <div className="text-red-500 text-sm font-bold">The Comment Field is required</div>
                                )}
                                <Button type='submit' color="amber" className='text-lg font-serif'>Submit</Button>
                            </form>
                        )
                    }
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
        'comments': *[
            _type == "comment" &&
            post._ref == ^._id &&
            approved == true
        ],
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
