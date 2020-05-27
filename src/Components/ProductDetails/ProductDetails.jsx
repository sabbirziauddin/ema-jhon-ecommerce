import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
//this component is for when we click name of the product than it is called
const ProductDetails = () => {
      const{productKey} = useParams();
      const product =fakeData.find(pd=>pd.key===productKey);
      console.log(product);

   return (
      <div>

      
      <h1>Product is comming soon!!!</h1>
      <Product showAddToCard={false} product={product}></Product>
     

      

         
      </div>
   );
};

export default ProductDetails;