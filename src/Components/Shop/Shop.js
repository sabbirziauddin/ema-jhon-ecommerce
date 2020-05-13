import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';


const Shop = () => {
          const firstData10 = fakeData.slice(0,10);
          const [products,setProducts] =useState(firstData10);
          //for add cart we need use another usestate
         const [cart,setCart] = useState([])
          //click handler
          const handlerAddProduct =(product) =>{
           // console.log("product added",product);
            const newCart = [...cart,product];
            setCart(newCart);
            const sameProduct =newCart.filter(pd =>pd.key===product.key);
            const count = sameProduct.length;
            addToDatabaseCart(product.key,count);
          } 
   return (
   

      <div className="shop-container">
          <div className="product-container">
               
                  {
                     products.map(pd =>
                     <Product
                     key={pd.key}
                      showAddToCard={true}
                      product= {pd}
                      handlerAdd ={handlerAddProduct}> </Product>)
                      
                  } 
               
            </div> 
           <div className="cart-container">
           <Cart cartProperty={cart}></Cart>

           
           

         </div>   
        
          
          
      
      
      
         
      </div>
   );
};

export default Shop;