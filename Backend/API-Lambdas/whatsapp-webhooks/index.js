const fetch = require('node-fetch');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic QUlSVEVMX0RJR194ZFhEVDdpbEFpZkJQOFFxdkx5VDoxeipMVTZLTjxrenNMPytiVzgw'
  };
 
 const VERIFY_TOKEN = "testtoken";
  
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
    
    let req = JSON.parse(event.body);
    
    console.log(JSON.stringify(req));
    
      let url = '';
      let payload = {};
      let order_items_payload = {};
      let total_cart_val = 0;

      let inputMsg = '';
      let input_txt='';
      if(req.messageParameters && req.messageParameters.interactive && req.messageParameters.interactive.button_reply){
         inputMsg = req.messageParameters.interactive.button_reply.title
      }else if(req.messageParameters && req.messageParameters.text){
         input_txt =  req.messageParameters.text.body;
           /*if(input_txt.indexOf("Pin Code") != -1){
             inputMsg = "Pin Code";
          }*/
      }else if(req.messageParameters && req.messageParameters.button){
        inputMsg =  req.messageParameters.button.text;
     }else if(req.message && req.message.type =='order'){
            
            inputMsg =  'ORDER';
            
            //total_cart_val = req.message.order.product_items.map(p=>total_cart_val+(p.quantity*p.item_price));
            
            total_cart_val = req.message.order.product_items.reduce((accumulator, item) => accumulator + item.quantity*item.item_price,0);
            
            console.log('total cart val --->'+total_cart_val);
            
            order_items_payload = {products:req.message.order.product_items,
                                    user_id:req.from,
                                    last_visited:"--",
                                    check_out_status:"Pending",
                                    payment_mode:"-",
                                    cart_amount:total_cart_val,
                                    source:'whatsapp'
                                };
     }else if(req.indicator =='order_confirm_page'){
         inputMsg = 'Send_Order_Confirm';
     }
  let sessionId = '919502635554';
  
  console.log('Input Msg ---->'+inputMsg);
  console.log('Input Txt ---->'+input_txt);

  switch(inputMsg || input_txt.split('-')[0]){
    case "Send_Order_Confirm":
        url='https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text';
        payload={
            sessionId: "1e894093f3c518efe33er6",
            to: "919502635554",
            from: "918971031100",
            message: {
               text: "*Order Confirmed* \n\n Thank you for placing your order with us. \n Your order is confirmed. \n\n *Order ID - "+req.orderID+"*. \n\n You shall recieve your order within 5-7 working days."
            }
        }
        break;
    case "ORDER":
      /*url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/interactive/buttons';  
      payload = {
        sessionId: req.sessionId,
        to: sessionId,
        from: "918971031100",
        message: {
            text: "Thank you for placing your order with us . Before we proceed, we would like you to confirm your payment. How would you like to make the payment ?"
        },
        buttons: [
            {
                tag: "Cash",
                title: "Cash"
            },
            {
                tag: "Card",
                title: "Card"
            }
        ]
    };*/
      
         url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/template/send';
         payload = {
             templateId: "f23f28f0-7efd-4879-8672-d3332103cae4",
             method:"POST",
             to: sessionId,
             from: "918971031100",
             filterBlacklistNumbers:"false"
         };
      break;
     case "X":
          url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/template/send';
         payload = {
             templateId: "a1ca916a-abf3-4d17-aef9-3578f912bd33",
             method:"POST",
             to: sessionId,
             from: "918971031100",
             filterBlacklistNumbers:"false"
         };
         break;
    case "Hi":
    case "Hello":
        url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/interactive/buttons';
        payload = {
            sessionId: "a1ca916a-abf3-4d17-aef9-3578f912bd33",
            to: "919502635554",
            from: "918971031100",
            message: {
            text: "Welcome to Bloom EComm !\n\n Sooo excited to see you here ! 🤗 \n"+
            "Tell us whats on your mind and we'll help you shop for your favourite products. Be sure not to"+
            " miss our crazy festive offers on millions of products.\n\nLet's get started ?\n\n You can use our menu below 👇 for assistance."
        },
        buttons: [
            {
                tag: "Shop Online",
                title: "Shop Online"
            },
            {
                tag: "Shop from Store",
                title: "Shop from Store"
            },
            {
                tag: "More Options",
                title: "More Options"
            }
        ]
    };
        break;
    case "Shop from Store":
        url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text';
        payload = {
            sessionId: "1e894093f3c518efe33er6",
            to: sessionId,
            from: "918971031100",
            message: {
                text: "Great! Glad to help you shop from your nearest store. Can you share your 6 - digit area PIN Code ? "
            }
        };
        break;
    case "500084":
    case "500081":
        url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text';
        payload = {
            sessionId: "1e894093f3c518efe33er6",
            to: sessionId,
            from: "918971031100",
            message: {
                text: "Thank you for your interest. A store representative will call you shortly."+
                      "Here 👇  are catalogues of our latest Fashion essentials available in stores."+
                     "Select styles that you like and order when the representative calls you."
            }
        };
       
       console.log('------------------- Sending representative msg ----------------');
       
       /*await invokeAPI(url,payload);

       console.log('--------- Sending Category-1 ----------');
       //send catalog-1
        url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/media';
        payload = {
                sessionId: "1e894093f3c518efe33er6",
                to: "919502635554",
                from: "918971031100",
                mediaAttachment: {
                    type: "DOCUMENT",
                    id:"812463586532968",
                    fileName:"sample.pdf",
                    caption: "Sample doc"
                }
            };

         await invokeAPI(url,payload);*/

        
        break;
    case "More Options":
         url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/template/send';
         payload = {
             //templateId: "9ec691b5-b5de-4785-a1c8-288ee3d5ec79",
             templateId: "fae7a22a-7a9d-4b06-9d7e-e6fa008e13d9",
             method:"POST",
             to: sessionId,
             from: "918971031100",
             filterBlacklistNumbers:"false"
         }
        break;
    case "Help":
      url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/interactive/buttons';
      payload = {
        sessionId: "abcd3241hddssaa",
        to: "919502635554",
        from: "918971031100",
        message: {
            text: "Hey SOMNATH,Looking for something ? You can use our menu below for assistance ."
        },
        buttons: [
            {
                tag: "Shop Now",
                title: "Shop Now"
            },
            {
                tag: "Track Order",
                title: "Track Order"
            },
            {
                tag: "Refund & Returns",
                title: "Refund & Returns"
            }
        ]
    };
        break;
    case "Shop Online":
    case "Shop Now":
        url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/product/multiple';
        payload = {
            sessionId: "abcd123344444",
            to: "919502635554",
            from: "918971031100",
            message: {
                text: "Top Picks only for you🤗"
            },
            catalog: {
                heading: "Recommended Products",
                catalogId: "474175244812049",
                sections: [
                    {
                        heading: "Women - Western wear",
                        products: [
                            "10017413","10017412","10017419"
                        ]
                    },
                    {
                        heading: "Women - Ethnic wear",
                        products: [
                            "10017414","10017410","10017421"
                        ]
                    },
                    {
                        heading: "Men - Western wear",
                        products: [
                            "10017427","10017428","10017423"
                        ]
                    },
                    {
                        heading: "Men - Ethnic wear",
                        products: [
                            "10017432","10017433","10017431"
                        ]
                    }
                ]
            }
        };
        break;
    case "Track Order":
    case "Track":
    case "1":
      url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/template/send';
      let inp_var = 'Track-245367839393';
      /*if(input_txt ==''){
          input_txt = 'Track-245367839393'; //this is just a fallback condition with dummy order id
          
          input_txt.split('-')[1]
          
      }*/
      payload = {
        templateId: "e6a4a7cf-425a-4265-bc64-9b674fb85709",
        to: sessionId,
        from: "918971031100",
        filterBlacklistNumbers:"false",
        message: {
            variables: [
               inp_var.split('-')[1]
            ]
        }
    };  
    
    break;
    case "2":
          url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/template/send';
          payload = {
            templateId: "b69daff5-7645-4302-a6d0-70a6aadedf3c",
            to: sessionId,
            from: "918971031100",
            filterBlacklistNumbers:"false",
            
        };  
      break;
      case "4":
        url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text';
        payload = {
            sessionId: "1e894093f3c518efe33er6",
            to: sessionId,
            from: "918971031100",
            message: {
                text: "Please type your query in the format FAQ-< your query here >"
            }
        };
        break;
    case "Sure, Go ahead":
       url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/interactive/buttons';  
      payload = {
        sessionId: "abcd3241hddssaa",
        to: sessionId,
        from: "918971031100",
        message: {
            text: "Awesome. How would you like to make the purchase ?"
        },
        buttons: [
            {
                tag: "Cash",
                title: "Cash"
            },
            {
                tag: "Card",
                title: "Card"
            }
        ]
    };
     break;
     case "Cash":
      url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text';
      payload = {
        sessionId: "1e894093f3c518efe33er6",
        to: sessionId,
        from: "918971031100",
        message: {
            text: "Your order has been placed. You shall recieve it within 3 - 5 business days."
        }
    }
      break;
      case "Card":
      url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text';
      payload = {
        sessionId: "1e894093f3c518efe33er6",
        to: sessionId,
        from: "918971031100",
        message: {
            text: "Okay, Just visit this link to make a purchase and you are good to go. https://www.lifestylestores.com/in/en/department/women"
        }
    }
      break;
    //case "FAQ":
        // invoke dialogflow as NLP engine for default conversational flow.
      //url = 'https://5pv0dcdqxl.execute-api.us-east-1.amazonaws.com/default/invokeDialogflow';
      //payload = {queryText:input_txt.split('-')[1],sessionId:sessionId};
    //break;
    default:
     // invoke dialogflow as NLP engine for default conversational flow.
     
      //url = 'https://5pv0dcdqxl.execute-api.us-east-1.amazonaws.com/default/invokeDialogflow';
      //payload = {queryText:inputMsg !=''?inputMsg:input_txt,sessionId:sessionId};
      
      break;

  }

  if(url != '' && Object.keys(payload).length != 0 /*&& inputMsg != 'Pin Code'*/){
      console.log('------------------- API invoked ----------------');
      let resp = await invokeAPI(url,payload);
  }
  //if(inputMsg == 'Pin Code'input_txt){
 if(input_txt == '500084' || input_txt =='500081'){
    console.log('--------- Sending Category-1 ----------');
       //send catalog-1
        url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/media';
        payload = {
                sessionId: "1e894093f3c518efe33er6",
                to: "919502635554",
                from: "918971031100",
                mediaAttachment: {
                    type: "DOCUMENT",
                    //id:"812463586532968",
                    id:"418387270365145",
                    fileName:"Bloom_In_Store_Catalog.pdf",
                    caption: "Bloom In Store Catalog"
                }
            };

         await invokeAPI(url,payload);
  }
  if(inputMsg =='ORDER'){
      //insert order items to mongoDB
      let resp = await invokeAPI('https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/insertOrdertoCart',
      order_items_payload);
  }
  
  let mode = event.queryStringParameters["hub.mode"];
  let token = event.queryStringParameters["hub.verify_token"];
  let challenge = event.queryStringParameters["hub.challenge"];

  let response;
  // Check if a token and mode were sent
   if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
        response = {
        statusCode: 200,
        body: JSON.stringify({"response":challenge})
        };
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
        response = {
        statusCode: 403,
        body: JSON.stringify({"response":"Forbidden"})
     };
    }
  }
     return response;
};