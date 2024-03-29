import { playlistState } from '@/atoms/playlistAtom';
import React from 'react'
import { useRecoilValue } from 'recoil'
import Song from './Song';

export default function Songs() {
    const playlist = useRecoilValue(playlistState);
    
  return (
    <div className='flex flex-col px-8 space-y-1 pb-28 text-white'>
        {
            playlist?.tracks.items.map((track, i) => (
                <Song key={track.track.id} track={track} order={i}/>
            ))
        }
    </div>
  )
}
