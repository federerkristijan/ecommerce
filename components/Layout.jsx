import React from "react";
// like <head> in html, meta data, need to be imported in Next.js
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

// accessing other components via children prop
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Ecommerce pratice</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
