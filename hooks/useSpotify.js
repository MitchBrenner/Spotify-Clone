// this is a custom hook to use the spotify api with the user's access token

import spotifyApi from '@/lib/spotify';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'


function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session){
            // if refresh token has expired or failed, sign in again
            if (session.error === "RefreshAccessTokenError"){
                signIn()
            }

            spotifyApi.setAccessToken(session.accessToken);

        }
    }, [session]);

    return spotifyApi;
}

export default useSpotify;
