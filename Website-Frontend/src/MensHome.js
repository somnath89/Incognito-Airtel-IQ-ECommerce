import React,{useState,useEffect} from 'react';
import axios from "axios";

import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function MensHome() {
  

  const settings = {
          dots: true,
          autoplay: false,
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        };
  return (
    <div>
    <nav style={{backgroundColor:'#101348'}} className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
          {<div class="background" style={{background:'url('+process.env.PUBLIC_URL+'/images/bloom-logo.png)'}}></div>}
         {/*<img style={{margin:'5px'}} src={process.env.PUBLIC_URL+"/images/bloom-logo.png"} alt="Bloom" />*/}
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/womens"}>Women</Link></li>
          <li className="active"><Link to={"/mens"}>Men</Link></li>
          <li><Link to={"/"}>Kids</Link></li>
          <li><Link to={"/"}>Beauty</Link></li>
          <li><Link to={"/"}>Shoes & Bags</Link></li>
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

        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Shop By Category</h2>
        <img style={{width:'100%'}} src={process.env.PUBLIC_URL+"/images/men-categories.png"} alt="men-categories" />
        
        <hr class="divider"/>
        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Top Trending Brands</h2>
        <img style={{width:'100%'}} src={process.env.PUBLIC_URL+"/images/men-top-brands.png"} alt="men-top-brands" />
        <hr class="divider"/>
        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Top Picks</h2>
        <img style={{width:'100%'}} src={process.env.PUBLIC_URL+"/images/men-top-picks.png"} alt="men-top-picks" />
        </div>);
}

export default MensHome;
