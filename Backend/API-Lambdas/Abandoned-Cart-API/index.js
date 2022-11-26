const fetch = require('node-fetch');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic QUlSVEVMX0RJR194ZFhEVDdpbEFpZkJQOFFxdkx5VDoxeipMVTZLTjxrenNMPytiVzgw'
  };
  
  const invokeAPI = async (url,payload)=>{
    let resp = {};
    
    console.log(JSON.stringify(payload));
    
    await fetch(url, {
              method: 'POST',
             body:JSON.stringify(payload),
          headers: headers
         }).then(res => res.json())
        .then(json => {
        console.log(json);
        resp = json;
      });
      return resp;
  }
  
  exports.handler = async (event) => {
      
     let date = new Date();
     console.log('---- Date ----');
  
    let url = 'https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/getAbondonedCart';
    
    let payload = {
      last_visited:(date.getDate()-1)+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    }
  
    let resp = await invokeAPI(url,payload);
    
    console.log('----response ----');
    
    console.log(JSON.stringify(resp));
  
    let cart = resp.map(item=>{
      let obj = {};
      
      obj["user_id"]=item.user_id;
      
      let items = item.products.map(q=>q.desc+"(Rs."+q.price+")");
      
      obj["msg"] = items.join(',');
  
      return obj;
    })
    
    let user_sms = '👋Hi *Ishita*, \n\nWe noticed that you haven’t completed your order.'+ 
                ' Don’t hesitate to let us know if you are having any trouble completing the order.'+ 
                ' If you are still interested, you can get these items at *extra 10% off*.\n\n'+
                'Use Code *XTRA10* at checkout.\n\nClick here 👇 to complete your order. '+
                '\n\nhttp://incognito-ecomm.s3-website.ap-south-1.amazonaws.com/#/order_confirm';
                
    let msgPayload = {sessionId:"1e894093f3c518efe33er6",
                  to:"919502635554",
                  from:"918971031100",
                  message:{
                    text:user_sms
                    }
                 }
                 
    let reminderResp = await invokeAPI('https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text',msgPayload);
    
     const response = {
          statusCode: 200,
          body: JSON.stringify(cart),
      };
    
      return response;
  };
  