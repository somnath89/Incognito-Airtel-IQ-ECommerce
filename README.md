Repository for Airtel IQ eCommerce hackathon

Deployed website URL - http://incognito-ecomm.s3-website.ap-south-1.amazonaws.com/#/

Order Tracking UI - http://incognito-ecomm.s3-website.ap-south-1.amazonaws.com/#/track

Order Confirm UI - http://incognito-ecomm.s3-website.ap-south-1.amazonaws.com/#/order_confirm

Backend services

WhatsApp chatbot is powered by lambda webhook 

chatbot callback URL - https://4e5jfki8zf.execute-api.us-east-1.amazonaws.com/default/whatsapp-webhooks

Chatbot communicates with mongoDb via "Realm Functions" which are acting as the respective http end points.

Realm Endpoints 

Insert Catalog Order API -- https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/insertOrdertoCart

Confirm Order API -- https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/updateOrderConfirm

Get Abandoned API -- https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/getAbondonedCart
