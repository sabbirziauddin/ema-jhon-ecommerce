import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
      const cart =props.cartProperty;
      // const total = cart.reduce((total,productElement) => total+productElement.price,0);
      let total =0;
      for(let i = 0; i <cart.length;i++ ){
         const newElement = cart[i];
         total = total +newElement.price;
      }

      let shippingCost = 12.99;
      if(cart.length===0){
         shippingCost = 0;
      }
      else if(total>30){
         shippingCost =0;
      }
      else if(total>15){
         shippingCost=4.99
      }
      const tax =(total/10).toFixed(2) ;
      const grandTotal = total +shippingCost+Number (tax);
      const formatNumber = function(number){
         const precision = number.toFixed(2) ;
         return Number (precision);
      
      
      }
   return (
      <div>
       <h4>Order Summary</h4>
        <p>Item Order:{cart.length}</p>
        <p>SubTotal Price: ${formatNumber(total) }</p>
        <p> <small>Shipping Cost:</small> ${shippingCost}</p>
        <p> <small>tax +vat:</small>${tax}</p>
        <p>total:${ grandTotal}</p>  
        <br/>
         <br/>
         <Link to="/Review" >
        <button className ="btn-main"> Review Order</button>
         </Link>

         
      </div>
   );
};

export default Cart;