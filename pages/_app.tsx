import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/navbar/";
import "../styles/globals.css";
import MusicBar from "@/components/musicControls";
import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useSelector } from 'react-redux';
import store from "@/controller/store";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  // const isVisible: boolean = useSelector((state: any) => state.bottom.bottom.isVisible);

  return (
    <Suspense>
      <SessionProvider session={session}>
        <Provider store={store}>
          <div className="d-flex flex-column">
            <div className="w-100 d-flex alignItems-start justify-content-center" style={{ minHeight: "100vh", marginBottom: "10vh" }}>
              <div style={{ width: "15%" }}> <NavBar /></div>
              <Component {...pageProps} />
            </div>
            <div style={{ zIndex: 2000 }}>
              <MusicBar />
            </div>
          </div>
        </Provider>
      </SessionProvider>
    </Suspense>
  );
}
