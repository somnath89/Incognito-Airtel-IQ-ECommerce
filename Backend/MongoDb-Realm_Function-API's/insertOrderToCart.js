exports = function(payload,response) {
   
    const postbody = EJSON.parse(payload.body.text());
    
    // Querying a mongodb service:
     const collection = context.services.get("mongodb-atlas").db("test").collection("cart");
     //let restaurants = collection.find(term).toArray();
     
     let restaurants = collection.insertOne(postbody);
    
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