import React from 'react'
import useSpotify from '@/hooks/useSpotify';
import { millisToMinutesAndSeconds } from '@/lib/time';
import { useRecoilState } from 'recoil';
import { isPlayingState, songState } from '@/atoms/songAtom';


export default function Song({ track, order }) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(songState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri]
        })
    }

  return (
    <div 
        onClick={playSong}
        className='grid grid-cols-2 text-gray-500 py-2 hover:bg-gray-900 px-3 rounded-lg cursor-pointer'>
        <div className='flex items-center space-x-4'>
            <p className='max-w-5'>{order + 1}</p>
            <img 
                className='w-11 h-11'
                src={track.track.album.images[0].url}
            />
            <div>
                <p className='w-[210px] sm:w-[300px] md:w-[200px] lg:w-[400px] truncate text-white'>{track.track.name}</p>
                <p>{track.track.artists[0].name}</p>
            </div>
        </div>

        <div className='flex items-center justify-between ml-auto md:ml-0'>
            <p className='w-40 hidden md:inline'>{track.track.album.name}</p>
            <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>
    </div>
  )
}
