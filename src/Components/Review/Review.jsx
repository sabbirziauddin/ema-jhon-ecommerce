import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../Reviewitem/ReviewItem';
import Cart from '../cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
   const[cart,setCart] = useState([]);
   //25.12
   const[orderPlaced,setOrderPlaced] = useState(false)

   //for place order in review component 25.12
   const handlePlaceOrder =()=>{
      // console.log("order place");
      setCart([]);
      setOrderPlaced(true);
      processOrder();

   } 
    //for remove cart from reviewItem
   const removeProduct =(productKey)=>{   
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
         //add quantity to the object 
         product.quantity = savedCard[key];
         return product;
      });
      setCart(productCounts);
      //console.log (savedCard);
      //console.log(productKey);
      //console.log(productCounts);
    
      

   
   
   },[]);
   let thankYou;
   if(orderPlaced) {
      thankYou = <img src ={happyImage} alt=""/>;

   }
   return (
      <div className="twin-container">
         <div className="product-container">
            {/* <h1>  Cart item: {cart.length} </h1> */}
            {
               cart.map(pd => <ReviewItem
               key ={pd.key}
               removeProduct ={removeProduct} 
               product ={pd}></ReviewItem>)
            }
            {thankYou}
            
         </div>
         <div className="cart-container">
               <Cart cartProperty={cart}>
                  <button onClick={handlePlaceOrder} className="btn-main">Place Order</button>
                  
               </Cart>
         </div>
            


      </div>
   );
};

export default Review;