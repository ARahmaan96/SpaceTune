import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/navbar/";
import "../styles/globals.css";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <div>
        <NavBar></NavBar>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
