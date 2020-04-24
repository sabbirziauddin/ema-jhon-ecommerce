import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../cart/Cart';


const Shop = () => {
          const firstData10 = fakeData.slice(0,10);
          const [products,setProducts] =useState(firstData10);
          //for add cart we need use another usestate
         const [cart,setCart] = useState([])
          //click handler
          const handlerAddProduct =(product) =>{
            console.log("product added",product);
            const newCart = [...cart,product];
            setCart(newCart);
          } 
   return (
   

      <div className="shop-container">
          <div className="product-container">
               
                  {
                     products.map(pd =>
                     <Product
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