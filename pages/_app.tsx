import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/navbar/";
import "../styles/globals.css";
import MusicBar from "@/components/musicControls";
import { Suspense } from "react";
import zIndex from "@mui/material/styles/zIndex";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <Suspense>
    <SessionProvider session={session}>
      <div style={{display: "flex", alignItems: "start"}}>
        <NavBar></NavBar>
        <div  style={{marginBottom: "100px"}}>
        <Component {...pageProps}/>
        </div>
        <div style={{ position: "absolute", zIndex: 9999 }}>
            <MusicBar />
          </div>
        </div>
    </SessionProvider>
    </Suspense>
  );
}
