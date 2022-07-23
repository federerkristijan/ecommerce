import React from "react";
import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
        </div>
      </div>
    </div>
  );
};

// getStaticProps needs predefined getStaticPaths
export const getStaticPaths = async () => {
  // for every product make a custom current slug
  const query = `*[_type == "product"]
  { slug {
    current
  }}`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking'
  }
};

// pre-renders the page at build time using the props returned
export const getStaticProps = async ({ params: { slug } }) => {
  // defining the product query
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  // defining the productS query
  const productsQuery = '*[_type == "banner"]';

  // fetching the product
  const product = await client.fetch(query);

  // fetching the productS
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
