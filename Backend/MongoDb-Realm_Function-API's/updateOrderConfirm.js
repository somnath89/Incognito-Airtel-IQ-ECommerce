exports = function(payload,response) {
   
    const postbody = EJSON.parse(payload.body.text());
    
    let term = {$and:[
        {"check_out_status": {$eq: "Pending"}},
        {"user_id": {$eq:postbody.user}}
      ]
    };
    // Querying a mongodb service:
     const collection = context.services.get("mongodb-atlas").db("test").collection("cart");
     //let restaurants = collection.find(term).toArray();
     
     let restaurants = collection.updateOne(term,
      {
        $set:{
          "check_out_status":"Completed",
          "payment_mode":"online",
          "order_id":postbody.order_id,
          "email":postbody.email,
          "telephone":postbody.telephone,
          "address":postbody.address
       }
     });
    
    console.log("Response --"+JSON.stringify(restaurants));
    
    if(restaurants.length ==0){
     return [];
    }
    
    console.log(JSON.stringify(restaurants));
    
    response.setStatusCode(200);
    response.setHeader("Content-Type", "application/json");
    response.setBody(JSON.stringify(restaurants));
    
    return  response;
    
};