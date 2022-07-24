import React from "react";
import { Toaster } from "react-hot-toast";


import Layout from "../components/Layout";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  return (
    // passing states data to the app
    <StateContext>
      <Layout>
        {/* pop up bullshit at the end of the process */}
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
