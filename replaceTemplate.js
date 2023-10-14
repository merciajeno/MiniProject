module.exports=(temp,product)=>
{
    let output = temp.replace(/{%PRODUCTNAME}/g,product.productName)

   output = output.replace(/{%QUANTITY}/g,product.quantity)
   output = output.replace(/{%PRICE}/g,product.price)
   output = output.replace(/{%FROM}/g,product.from)
  
   output = output.replace(/{%ID}/g,product.id)
 
   return output;
}
