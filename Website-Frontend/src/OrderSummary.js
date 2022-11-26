import React,{useState,useEffect} from 'react';
import './App.css';
import axios from "axios";

import cogoToast from 'cogo-toast';

import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const req_headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic QUlSVEVMX0RJR194ZFhEVDdpbEFpZkJQOFFxdkx5VDoxeipMVTZLTjxrenNMPytiVzgw',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials':true
  };

//const order_confirm = 'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text';

const order_confirm = 'https://airteliq-incognito-webapp.glitch.me/sendMessage';


function OrderSummary() {
  const [email,setEmail] = useState('');
  const [telephone,setTelephone] = useState('');
  const [address,setAddress] = useState('');
  const [promocode,setPromoCode] = useState('');

  const reducer =(accumulator, currentValue, index)=> {
    const returns = accumulator + currentValue;
    console.log(
      `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
    );
    return returns;
  };

const calculate=()=>{
   let products = [
    {
        quantity: 2,
        item_price: 1490
    },
    {
        quantity: 1,
        item_price: 3815
    }
];
   let total_cart_val = products.reduce((accumulator, item) => accumulator + item.quantity*item.item_price,0);

    alert(total_cart_val);
}

const confirmOrder =()=>{
    
    toast.info("Confirming order, Please wait ...", { autoClose: false,position: toast.POSITION.TOP_CENTER,
                isLoading: true });

      let orderID = Math.floor(100000 + Math.random() * 900000);
      
      axios
       .post('https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/updateOrderConfirm', 
        {user:"919502635554",
        email:email,
        telephone:telephone,
        address:address,
        order_id:orderID
      })
      .then((response) => {
         toast.dismiss();
        cogoToast.info('Order Confirmed. Your order number is '+orderID+". You'll recieve further details in whatsapp message");
            
      });

      axios
      .post(order_confirm, {
                  indicator:"order_confirm_page",
                  orderID:orderID
        })
      .then((response) => {
       
        console.log('whatsapp message sent');
            
      });

    /*axios
      .post(order_confirm, {
        sessionId: "1e894093f3c518efe33er6",
        to: "919502635554",
        from: "918971031100",
        message: {
           text: "*Order Confirmed* \n\n Thank you for placing your order with us. \n Your order is confirmed. \n\n *Order ID - 234554545454*. \n\n You shall recieve your order within 5-7 working days."
        }
    },{
        headers: req_headers
      })
      .then((response) => {
       
        
          toast.dismiss();
          cogoToast.info('Yayyy !!! Your order is CONFIRMED.');
            
      });*/
}

  return (
    <div>
        <ToastContainer />
      <nav style={{backgroundColor:'#101348'}} className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
          {<div class="background" style={{background:'url('+process.env.PUBLIC_URL+'/images/bloom-logo.png)'}}></div>}
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to={"/"}>Home</Link></li>
          <li className="active"><Link>Order Confirmation</Link></li>
        </ul>

        <form className="navbar-form navbar-left">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" name="search"/>
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <i className="glyphicon glyphicon-search"></i>
              </button>
            </div>
          </div>
        </form>
        <ul className="nav navbar-nav navbar-right">
         <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
         <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
       </ul>
      </div>
    </nav>

        <hr class="divider"/>
        
        <div style={{padding:'20px'}}>
                <form>
                        <div className="input-group">
                            <span className="input-group-addon">
                            <label>Email Id</label></span>
                            <input id="email" style={{width:'70%'}} type="text" className="form-control" name="email" placeholder="Email"
                            onChange={(ev)=>setEmail(ev.target.value)}/>
                        </div>
                        <br/>
                        <div className="input-group">
                            <span className="input-group-addon"><label>Telephone #</label></span>
                            <input id="tel" style={{width:'70%'}} type="tel" className="form-control" name="Telephone" placeholder="Telephone"
                            onChange={(ev)=>setTelephone(ev.target.value)}/>
                        </div>
                        <br/>
                        <div className="input-group">
                            <span className="input-group-addon"><label>Shipping Address</label></span>
                            <input id="msg" style={{width:'70%'}} type="text" className="form-control" name="msg" placeholder="Shipping Address"
                             onChange={(ev)=>setAddress(ev.target.value)}/>
                        </div>
                        <br/>
                        <div className="input-group">
                            <span className="input-group-addon"><label>Promo Code</label></span>
                            <input id="promo_code" style={{width:'70%'}} type="text" className="form-control" name="promo_code" placeholder="promo_code"
                            onChange={(ev)=>setPromoCode(ev.target.value)}/>
                        </div>
                        <br/>
                        <div className="input-group">
                            <span className="input-group-addon"><label>Payment Mode</label></span>
                            <div style={{display:'flex',margin: '10px 20px'}}>
                                <input type="radio" id="cash" name="fav_language" value="cash"/>
                                <label style={{marginLeft:'20px'}} for="cash">Cash</label><br/>
                                <input style={{marginLeft:'20px'}} type="radio" id="online" name="fav_language" value="online"/>
                                <label style={{marginLeft:'20px'}} for="online">Online</label><br/>
                                
                            </div>
                            
                        </div>
                        
                        <div style={{marginTop:'25px'}} className="text-center">
                            <button type="button" className="btn btn-primary" onClick={(ev)=>confirmOrder()}>Confirm Order</button>
                    </div>
                        
                    </form>
               </div>
               

              
                
   </div>);
}

export default OrderSummary;
