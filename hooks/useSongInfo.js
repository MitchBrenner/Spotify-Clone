import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify';
import { songState } from '@/atoms/songAtom';
import { useRecoilState } from 'recoil';

export default function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(songState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId){
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                })
                .then(res => res.json());
                
                setSongInfo(trackInfo);
            }
        }
        fetchSongInfo();

    }, [currentTrackId, spotifyApi])

  return songInfo;
}
