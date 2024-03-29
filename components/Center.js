import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { set, shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '@/atoms/playlistAtom';
import spotifyApi from '@/lib/spotify';
import Songs from './Songs';

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
    const playlistId = useRecoilValue(playlistIdState); // this is like use state but only gets a value to protect it from changes
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId])


    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
        .then((data) => {
            setPlaylist(data.body)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [spotifyApi, playlistId])

    console.log(playlist)

  return (
    <div className='flex-grow text-white h-screen overflow-y-scroll scrollbar-hide'>
        <header>
            <div className='absolute top-5 right-8 flex items-center space-x-3 bg-black opacity-90 
                    rounded-full hover:opacity-80 p-1 pr-3 cursor-pointer'>
                <img src={session?.user?.image} className='rounded-full h-10 w-10'/>
                <h2>{session?.user?.name}</h2>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>
        </header>
        <section className={`flex h-80 items-end space-x-7 bg-gradient-to-b to-black ${color} p-8`}>
            <img 
                src={playlist?.images[0]?.url}
                className='h-44 w-44'
            />
            <div>
                <p>Playlist</p>
                <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
            </div>
        </section>
        <Songs />

    </div>
  )
}

export default Center