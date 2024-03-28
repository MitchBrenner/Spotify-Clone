import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
    <div className='flex flex-col min-h-screen bg-black justify-center items-center'>
        <img 
            className='w-80 mb-10'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png"
        />

        {
            Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                        className='bg-[#1db954] text-white px-10 py-3 rounded-full my-5 hover:opacity-70'
                    >Login with {provider.name}</button>
                </div>
            ))
        }

    </div>
  )
}

export default Login


// server side rendering -- this means that the page is rendered on the server and then sent to the client
// so the client does not have to wait for the page to be rendered
export async function getServerSideProps(context) {
    const providers = await getProviders();

    console.log(providers)

    return {
        props: { 
            providers
        },
    }
}