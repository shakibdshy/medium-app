import { GetStaticProps } from 'next';
import React from 'react'
import { client } from '../../lib/client';
import { Post } from '../../types/typings';

interface Props {
    post: Post;
}

function Post({ post }: Props) {
    // console.log(post);

    return (
        <>
            <section>
                <div className="container mx-auto px-4">

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
        body
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
        }
    }
}
