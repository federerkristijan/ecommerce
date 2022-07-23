import React from "react";
import { client, urlFor } from "../../lib/client";
import Product from "../../components/Product";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
          {/* <div className="small-images-container"> */}
          {/* changing  the big images by hovering over small images */}
          {/* {image?.map((item, i) => (
              <img src={urlFor(item)} className="" onMouseEnter="" />
            ))}
          </div> */}
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">{price}€</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick="">
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                0
              </span>
              <span className="plus" onClick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick="">
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        {/* marquee == list of scrolling divs */}
        <div className="marquee">
          <div className="maylike-products-container">
            {products.map((item) => (
              <Product />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// getStaticProps needs predefined getStaticPaths
export const getStaticPaths = async () => {
  // for every product make a custom current slug
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// pre-renders the page at build time using the props returned
export const getStaticProps = async ({ params: { slug }}) => {
  // defining the product query
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  // defining the productS query
  const productsQuery = '*[_type == "product"]';

  // fetching the product
  const product = await client.fetch(query);

  // fetching the productS
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
