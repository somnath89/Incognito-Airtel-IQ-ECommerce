exports = function(payload,response) {
   
    const postbody = EJSON.parse(payload.body.text());
    
    let term = {$and:[
        {"check_out_status": {$eq: "Pending"}},
        {"payment_mode": {$eq:"-"}}
      ]
    };
    // Querying a mongodb service:
     const collection = context.services.get("mongodb-atlas").db("test").collection("cart");
     const catalog_collection = context.services.get("mongodb-atlas").db("test").collection("catalog-products");
     
     let restaurants = collection.find(term).toArray();
     let productArr = restaurants[0].products;
     
    console.log("productArr --"+JSON.stringify(productArr));
     let prods = productArr.map(i=>{
       let item = {id:'',desc:'',price:''};
       let arr = catalog_collection.find({"id": {$eq: i.product_retailer_id}}).toArray();
       
       item['id']=i.product_retailer_id;
       item['desc']= arr[0].title;
       item['price']= arr[0].price;
       
       return item;
       
     })
     
     let updated_resp = [];
     
     let updatedObj = {user_id:'',products:[]}
     
     updatedObj['user_id'] = restaurants[0].user_id;
     updatedObj['products'] = prods;
     
     updated_resp.push(updatedObj);
     
     console.log("prods --"+JSON.stringify(updated_resp));
     
    //console.log("Response --"+JSON.stringify(restaurants));
    
    /*if(prods.length ==0){
     return [];
    }*/
    
    //let updated_order = collection.aggregate(pipeline).toArray();
    
    //console.log(JSON.stringify(restaurants));
    
    response.setStatusCode(200);
    response.setHeader("Content-Type", "application/json");
    response.setBody(JSON.stringify(updated_resp));
    
    return  response;
    //return updated_resp;
    
};