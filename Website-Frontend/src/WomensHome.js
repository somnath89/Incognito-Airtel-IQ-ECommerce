import React,{useState,useEffect} from 'react';

import './App.css';

import { Link } from "react-router-dom";

function WomensHome() {
  

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
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to={"/"}>Home</Link></li>
          <li className="active"><Link to={"/womens"}>Women</Link></li>
          <li><Link to={"/mens"}>Men</Link></li>
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
        <img style={{marginLeft:'50px'}} src={process.env.PUBLIC_URL+"/images/women-top-category.png"} alt="women-top-categories" />
        
        <hr class="divider"/>
        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Top Trending Brands</h2>
        <img style={{marginLeft:'50px'}} src={process.env.PUBLIC_URL+"/images/women-trending.png"} alt="women-trending" />
        <hr class="divider"/>
        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Top Picks</h2>
        <img style={{marginLeft:'50px'}} src={process.env.PUBLIC_URL+"/images/women-top-picks.png"} alt="women-top-picks" />
        </div>
    );
}

export default WomensHome;
