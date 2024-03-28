import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { set, shuffle } from 'lodash';

const colors = [
    "from-indigo-500",
    "from-green-500",
    "from-blue-500",
    "from-yellow-500",
    "from-red-500",
    "from-pink-500",
    "from-purple-500",
]


function Center() {

    const { data : session, status } = useSession();

    const [color, setColor] = useState(null);

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [])

  return (
    <div className='flex-grow text-white'>
        <header>
            <div className='absolute top-5 right-8 flex items-center space-x-3 bg-gray-700 opacity-90 
                    rounded-full hover:opacity-80 p-1 pr-3 cursor-pointer'>
                <img src={session?.user?.image} className='rounded-full h-10 w-10'/>
                <h2>{session?.user?.name}</h2>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>
        </header>
        <section className={`flex h-80 items-end space-x-7 bg-gradient-to-b to-black ${color} p-8`}>
            hello
        </section>
    </div>
  )
}

export default Center