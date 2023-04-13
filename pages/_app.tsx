import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "./_layout";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const enrolled = localStorage.getItem("enrolled");

    if (!enrolled) {
      localStorage.setItem("enrolled", "false");
    }
  }) 

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
