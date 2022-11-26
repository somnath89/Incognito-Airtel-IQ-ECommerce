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
      
    
    let url = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/template/send';
    
    let payload = {
            templateId: "f0736ec8-ac66-46e1-bb63-853e4167d117",
            method:"POST",
            to: "919502635554",
            from: "918971031100",
            filterBlacklistNumbers:"false",
            mediaAttachment:{
            	type:"IMAGE",
            	id:"715996982851122"
            }
        }
  
    let resp = await invokeAPI(url,payload);
    
    console.log('----response ----');
    
    console.log(JSON.stringify(resp));
  
     const response = {
          statusCode: 200,
          body: JSON.stringify(resp),
      };
    
      return response;
  };
  