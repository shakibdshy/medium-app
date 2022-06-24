// import sanityClient from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url'

import { createClient, createCurrentUserHook } from "next-sanity";

// export const client = sanityClient({
//     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//     apiVersion: '2022-09-06',
//     useCdn: true,
//     token: process.env.NEXT_PUBLIC_SANITY_TOKEN
// });

// const builder = imageUrlBuilder(client);

// export const urlFor = (source) => builder.image(source);

export const config = {
    projectId: 'ybzqkgus',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2022-09-06',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
};

export const client = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(client).image(source);

export const useCurrentUser = createCurrentUserHook(config);