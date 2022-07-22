import React from "react";
import { client } from "../lib/client";

// stack imports don't work, research why!!!
// import { Product, FooterBanner, HeroBanner } from "../components";
import HeroBanner from "../components/HeroBanner";
import FooterBanner from "../components/FooterBanner";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {["Product 1", "Product 2"].map((product) => product)}
      </div>

      <FooterBanner />
    </>
  );
};

export const getServerSideProps = async () => {
  // fetching the products
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  // fetching the banner
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
};

export default Home;
