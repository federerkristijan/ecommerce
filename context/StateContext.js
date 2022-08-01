import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  // updated Product
  let foundProduct;
  let index;

  // add buttton
  const onAdd = (product, quantity) => {
    // checking if there's a product already in cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // adding new item to the price
    setTotalPrice(
      (prevTotalprice) => prevTotalprice + product.price * quantity
    );
    // adjusting total quantity
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities + product.quantity
    );
    if (checkProductInCart) {
      // increasing the quantity of an item and not duplicating the item (adding an existing item)
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product.id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    // instead of .splice (mutative) use .fitler (non-mutative)
    const newCartItems = cartItems.splice(index, 1);

    if (value === "inc") {
      // updating the current cartItems and adding a new element
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      // stops the coutner at 0
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  // incrementing quantity (+)
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // decrementing quantity (-)
  const decQty = () => {
    setQty((prevQty) => {
      // setting the min qty of 1
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
