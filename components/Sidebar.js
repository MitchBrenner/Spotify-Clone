import React, { useEffect, useState } from 'react'
import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, PlusCircleIcon, HeartIcon, RssIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '@/hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '@/atoms/playlistAtom';

function Sidebar() {

    const spotifyApi = useSpotify();
    const { data : session, status } = useSession();
    const [playlists, setPlaylists] = useState(null);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists()
            .then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi]);

    console.log("You picked >>> ", playlistId)

  return (
    <div className='text-gray-500 pb-100 p-5 border-r border-gray-900 overflow-y-scroll 
    h-screen scrollbar-hide text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem]
    hidden md:inline-flex'>
        <div className='space-y-4'>
            <button 
            onClick={() => signOut()}
            className='flex items-center space-x-2 hover:text-white'>
                <XCircleIcon className="h-5 w-5" />
                <p>Logout</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className="h-5 w-5" />
                <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <MagnifyingGlassIcon className="h-5 w-5" />
                <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <BuildingLibraryIcon className="h-5 w-5" />
                <p>Your Library</p>
            </button>

            <hr className='border-t-[0.1px] bordder-gray-900'/>

            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className="h-5 w-5" />
                <p>Create Playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HeartIcon className="h-5 w-5" />
                <p>Liked Songs</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <RssIcon className="h-5 w-5" />
                <p>Your Episodes</p>
            </button>

            <hr className='border-t-[0.1px] bordder-gray-900'/>
            <div className='text-gray-500 text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem]
                hidden md:inline-flex flex-col space-y-4 pb-[100px]'>
            {
                playlists?.map((playlist) => (
                    <p onClick={() => setPlaylistId(playlist.id)} key={playlist.id} className='cursor-pointer hover:text-white'>
                        {playlist.name}
                    </p>
                ))
            }
            </div>

        </div>
    </div>
  )
}

export default Sidebar