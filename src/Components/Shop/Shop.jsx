import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { useEffect } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
import { Link } from "react-router-dom";

const Shop = () => {
  const firstData10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(firstData10);
  //for add cart we need use another usestate
  const [cart, setCart] = useState([]);
  //for showing same data in order summary from shop component and review component 25.3
  useEffect(() => {
    const savedCart = getDatabaseCart();
    //  console.log(savedCart);
    const productKeys = Object.keys(savedCart);
    // console.log(productKeys);
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      // console.log(existingKey,savedCart[existingKey];)
      return product;
    });
    // console.log(previousCart);
    setCart(previousCart);
  }, []);

  //click handler
  const handlerAddProduct = (product) => {
    //console.log("product added",product); 25.2
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      const count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    //for local storage product count
    // const sameProduct =newCart.filter(pd =>pd.key===product.key);
    // const count = sameProduct.length;
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCard={true}
            product={pd}
            handlerAdd={handlerAddProduct}
          >
            {" "}
          </Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cartProperty={cart}>
        <Link to="/Review">
        <button className="btn-main"> Review Order</button>
        </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
