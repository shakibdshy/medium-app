import Image from 'next/image'
import React from 'react'

function Banner() {
    return (
        <>
            <section>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between flex-wrap bg-yellow-700 border-y border-black py-10 xl:py-14">
                        <div className='px-10 space-y-5'>
                            <h1 className="text-6xl max-w-lg font-serif"><span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read, and connect</h1>
                            <p className='max-w-lg'>It's easy and free to post your thinking on any topic and connect with millions of readers.</p>
                        </div>
                        <div className='hidden md:block h-32 lg:h-full px-10'>
                            <Image src='https://moryphea.sirv.com/mediumApp/medium.png' width={300} height={300} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner