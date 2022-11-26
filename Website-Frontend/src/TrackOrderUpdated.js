import React,{useState,useEffect} from 'react';
import './App.css';

import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TrackOrderUpdated() {

  const [order,setOrder] = useState('');

  const showOrderTracking=()=>{
    
    toast.info("Your order "+order+" is OUT for Delivery and will be delivered to you today between 6:00 PM to 9:00 PM.", { autoClose: true,position: toast.POSITION.TOP_CENTER,
      isLoading: false });
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
          <li className="active"><Link>Order Tracking</Link></li>
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

        <div className="input-group" style={{padding:'30px 150px',top:'-51px',left:'100px'}}>
            <h3>Enter your orderID / Tracking number :</h3>
            <div style={{display:'flex'}}>
                <input type="text" className="form-control" placeholder="Enter Order ID / Tracking number" name="order_tracking"
                onChange={(ev)=>setOrder(ev.target.value)}/>
                <div className="input-group-btn" style={{top:'0px'}}>
                <button className="btn btn-default" onClick={(ev)=>showOrderTracking()}>
                    <i className="glyphicon glyphicon-search"></i>
                </button>
            </div>
           </div>
          </div>

          <hr class="divider"/>

          <div class="track_features" style={{background:'url('+process.env.PUBLIC_URL+'/images/track-features.png)',backgroundRepeat:'no-repeat'}}>
                  {/* <img src={process.env.PUBLIC_URL+"/images/track-features.png"} alt="Logo"/> */}
                </div>

    </div>);
}

export default TrackOrderUpdated;
