import React from "react";
import { client } from "../lib/client";

// stack imports don't work, research why!!!
// import { Product, FooterBanner, HeroBanner } from "../components";
import HeroBanner from "../components/HeroBanner";
import FooterBanner from "../components/FooterBanner";
import Product from "../components/Product";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
      {/* works correctly */}
      {/* {console.log(bannerData)} */}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product  key={product._id} product={product}/>)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
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
