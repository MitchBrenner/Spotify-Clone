import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
// session provider allows us to hold state of the session throughout the entire app
// can't use the session hook without the session provider

export default function App({ Component, pageProps : { session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
    );
}
