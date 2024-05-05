import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/navbar/";
import "../styles/globals.css";
import MusicBar from "@/components/musicControls";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <div>
        <NavBar></NavBar>
        <Component {...pageProps} />
        <MusicBar></MusicBar>
      </div>
    </SessionProvider>
  );
}
