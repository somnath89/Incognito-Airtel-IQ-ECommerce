import React,{useState,useEffect} from 'react';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Slider from "react-slick";
import { Link } from "react-router-dom";

function BloomHome() {

  const settings = {
          dots: true,
          autoplay: true,
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
          <li className="active"><Link to={"/"}>Home</Link></li>
          <li><Link to={"/womens"}>Women</Link></li>
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
         <Slider {...settings} style={{marginTop:'-20px'}}>
            <div>
                <img style={{margin:'0px 135px'}} src={process.env.PUBLIC_URL+"/images/bfs4.gif"} alt="Slider Image" />
            </div>
            <div>
                <img style={{margin:'0px 135px'}} src={process.env.PUBLIC_URL+"/images/bfs1.jpg"} alt="Slider Image" />
              </div>
                <div>
                    <img style={{margin:'0px 135px'}} src={process.env.PUBLIC_URL+"/images/bfs2.jpg"} alt="Slider Image" />
                </div>
                <div>
                    <img style={{margin:'0px 135px'}} src={process.env.PUBLIC_URL+"/images/bfs3.jpg"} alt="Slider Image" />
                </div>
        </Slider>
        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Black Friday Deals</h2>
        <img style={{width:'100%'}} src={process.env.PUBLIC_URL+"/images/black-friday-deals.png"} alt="Slider Image" />

        <img style={{marginTop:'20px',width:'100%'}} src={process.env.PUBLIC_URL+"/images/bfs5.gif"} alt="Slider Image" />

        <hr class="divider"/>

        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Shop By Category</h2>
        <div style={{display:'flex'}}>
            <img style={{marginLeft:'50px'}} src={process.env.PUBLIC_URL+"/images/tops-tees.png"} alt="tops-tees" />
            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/kurtas.png"} alt="tops-tees" />
            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/dresses.png"} alt="tops-tees" />
            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/ethnic-sets.png"} alt="tops-tees" />
            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/bottomwear.png"} alt="bottomwear" />

            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/sleepwear.png"} alt="sleepwear" />
        </div>
        <div style={{display:'flex'}}>
            <img style={{marginLeft:'50px'}} src={process.env.PUBLIC_URL+"/images/winterwear.png"} alt="winterwear" />
            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/activewear.png"} alt="activewear" />
            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/shoes-bags.png"} alt="shoes-bags" />
            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/watches.png"} alt="watches" />
            <img style={{marginLeft:'10px'}} src={process.env.PUBLIC_URL+"/images/beauty.png"} alt="beauty" />
        </div>
        <hr class="divider"/>
        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Trending Ethnic Wear</h2>
        <img style={{marginLeft:'50px'}} src={process.env.PUBLIC_URL+"/images/trending-ethnic-wear.png"} alt="trending" />
        <hr class="divider"/>
        <h2 class="MuiTypography-root blackFridayHeader MuiTypography-h5">Top Picks</h2>
        <img style={{marginLeft:'50px'}} src={process.env.PUBLIC_URL+"/images/top-picks.png"} alt="top-picks" />

        </div>);
}

export default BloomHome;
