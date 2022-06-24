import sanityClient from '@sanity/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2022-09-06',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
};

export const client = sanityClient(config);

export default async function createComment(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { _id, name, email, comment } = JSON.parse(req.body);
    try {
        await client.create({
            _type: "comment",
            post: {
                _type: "reference",
                _ref: _id,
            },
            name,
            email,
            comment,
        });
    } catch (err) {
        return res.status(500).json({ massage: `Couldn't create comment`, err });
    }
    
    return res.status(200).json({ massage: 'Comment Submitted' });
}