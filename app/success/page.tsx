import Link from 'next/link'
import React from 'react'

const success = () => {
    return (
        <>
            <div className='flex justify-center items-center mt-10 text-7xl font-bold'>Payment successfully done</div>
            <div className='flex justify-center items-center'>
                <Link href={"/e-commerce"} className='bg-black text-white p-6 mt-6 ml-6 rounded-4xl '>Go to Home Page</Link>
            </div>
        </>
    )
}

export default success