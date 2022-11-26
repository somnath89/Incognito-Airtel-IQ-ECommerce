const express = require('express');
const serverless = require('serverless-http');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const {WebhookClient,Payload} = require('dialogflow-fulfillment');
const app = express()
const port = 4000

const dialogflow = require('@google-cloud/dialogflow').v2beta1;
require('dotenv').config();

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic QUlSVEVMX0RJR194ZFhEVDdpbEFpZkJQOFFxdkx5VDoxeipMVTZLTjxrenNMPytiVzgw'
};
// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Your google dialogflow project-id
const PROJECT_ID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
    }
}

// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {

    let sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, sessionId);

    const knowledgeBasePath ='projects/' + PROJECT_ID + '/knowledgeBases/' + 'MjM2MzU2MzUyMTM4MTIzNjczNg' + '';
    //const knowledgeBasePath ='projects/' + PROJECT_ID + '/knowledgeBases/' + 'NDI0MDI3MTU0MDMyMDQ2ODk5Mg' + '';

    // The text query request.
    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: queryText,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
        queryParams: {
          knowledgeBaseNames: [knowledgeBasePath],
        },
    };
    console.log('----------------------REQUEST-----');
    console.log(request);

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('----------RESPONSE-----');
    console.log(responses);
    const result = responses[0].queryResult;
    console.log(result);
    let resp;

     await fetch('https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text', {
            method: 'POST',
            body: JSON.stringify({
              sessionId: "1e894093f3c518efe33er6",
              to: "919502635554",
              from: "918971031100",
              message: {
                  text: result.fulfillmentText
              }
           }),
        headers: headers
       }).then(res => res.json())
      .then(json => {
      console.log(json);
      resp = json;
    });

     return {
         response: resp
         //response:result.fulfillmentText
     };
}

app.use(bodyParser.json());
// Dialogflow route
app.post('/dialogflow', async (req, res) => {

  // let languageCode = req.body.languageCode;
   let queryText = req.body.queryText;
  // let sessionId = req.body.sessionId;

  let languageCode = 'en';
  //let queryText = 'Hello from Lambda';
  let sessionId = '919502635554';

  let responseData = await detectIntent(languageCode, queryText, sessionId);

  res.send(responseData.response);

});


  // app.listen(port, () => {
  //  console.log(`App listening-on port ${port}`)
  // })

//module.exports.handler = serverless(app);
exports.handler = async (event) => {
    
  console.log(JSON.stringify(JSON.parse(event.body)));
   
   let req = JSON.parse(event.body);
   let queryText = req.queryText;
  // let sessionId = req.body.sessionId;

  let languageCode = 'en';
  //let queryText = 'Hello from Lambda';
  let sessionId = '919502635554';

  let responseData = await detectIntent(languageCode, queryText, sessionId);

  let response = {
    statusCode: 200,
    body: JSON.stringify(responseData.response),
};

  return response;
  
};