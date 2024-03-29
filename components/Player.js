import { isPlayingState, songState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';
import { ArrowUturnLeftIcon, ArrowsRightLeftIcon, BackwardIcon, ForwardIcon, PauseIcon, PlayIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { SpeakerWaveIcon as SpeakerWaveIconOutline } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { debounce } from 'lodash';

export default function Player() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(songState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();
    const {data: session, status} = useSession();

    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now Playing: ", data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId){
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session])

    useEffect(() => {
        if (volume > 0 && volume < 100){
            debouncedAdjustVolume(volume);
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => console.log(err));
        }, 500), 
        []
    );

  return (
    <div className='h-20 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3'>
        <div className='flex items-center space-x-4 text-xs md:text-base px-2 md:px-8'>
            {/* left */}
            <img 
                src={songInfo?.album?.images?.[0].url}
                className='hidden md:inline w-10 h-10'
            />
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0].name}</p>
            </div>
        </div>
        {/* center */}
        <div className='flex items-center justify-evenly'>
            <ArrowsRightLeftIcon className='button'/>
            <BackwardIcon className='button'/>
            {
                isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className='button'/>
                ) : (
                    <PlayIcon onClick={handlePlayPause} className='button'/>
                )
            }
            <ForwardIcon className='button'/>
            <ArrowUturnLeftIcon className='button'/>

        </div>

        {/* right */}
        <div className='flex items-center space-x-3 md:space-x-4 justify-end p-5'>
            <SpeakerWaveIconOutline onClick={() => volume > 0 && setVolume(volume - 10)} className='button'/>
            <input 
                type='range'
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className='w-14 md:w-28 accent-white hover:accent-[#1db954]'
            />
            <SpeakerWaveIcon onClick={() => volume < 100 && setVolume(volume + 10)} className='button'/>
        </div>
    </div>
  )
}
