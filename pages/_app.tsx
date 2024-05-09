import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/navbar/";
import "../styles/globals.css";
import MusicBar from "@/components/musicControls";
import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import zIndex from "@mui/material/styles/zIndex";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <Suspense>
      <SessionProvider session={session}>
        <div className="d-flex flex-column">
          <div className="w-100 d-flex alignItems-start justify-content-center" style={{ minHeight: "90vh", marginBottom: "10vh" }}>
            <div style={{ width: "15%"}}> <NavBar /></div>
              <Component {...pageProps} />
          </div>
        </div>
      </SessionProvider>
    </Suspense>
  );
}
