import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../Reviewitem/ReviewItem';
import Cart from '../cart/Cart';

const Review = () => {
   const[cart,setCart] = useState([]);
   const removeProduct =(productKey)=>{    //for remove cart from reviewItem
         //console.log('remove clicked',productKey);
         const newCart = cart.filter(pd =>pd.key!==productKey);
         setCart(newCart);
         removeFromDatabaseCart(productKey);
   }
   useEffect(()=>{
      const savedCard = getDatabaseCart();
      const productKey = Object.keys(savedCard);
      const productCounts = productKey.map(key =>{
         const product = fakeData.find(pd =>pd.key===key);
         product.quantity = savedCard[key];
         return product;
      });
      setCart(productCounts);
      //console.log (savedCard);
      //console.log(productKey);
      //console.log(productCounts);
    
      

   
   
   },[])
   return (
      <div className="twin-container">
         <div className="product-container">
            <h1>  Cart item: {cart.length} </h1>
            {
               cart.map(pd => <ReviewItem
               key ={pd.key}
               removeProduct ={removeProduct} 
               product ={pd}></ReviewItem>)
            }
         </div>
         <div className="cart-container">
               <Cart cartProperty={cart}></Cart>
         </div>
            


      </div>
   );
};

export default Review;