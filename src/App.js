import React, { Component } from  'react'
import HeaderComp  from './comp/HeaderComp';
import CoverComp from './comp/CoverComp';
import FooterComp from './comp/FooterComp';
import ProductComp from './comp/ProductComp';
import BlogComp from './comp/BlogComp';

import axios from 'axios';
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 10, // (causes 2500.99 to be printed as $2,501)
});

class App extends Component{
  constructor(props){
    super(props);    
  }
  // instance of websocket connection as a class property  
  ws_dotusd = new WebSocket('wss://stream.binance.com:9443/ws/dotusdt@trade');
  ws_btcusd = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
  ws_bnbusd = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade');
  ws_ethusd = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
  ws_shibusd = new WebSocket('wss://stream.binance.com:9443/ws/shibusdt@trade');
        // Create our number formatter.

  componentDidMount() {
    this.PopulateETHCryptoTikcer();
    this.PopulateBNBryptoTikcer();
    this.PopulateBTCCryptoTikcer();
    this.PopulateDOTCryptoTikcer();
    this.PopulateSHIBCryptoTikcer();
  }
  PopulateETHCryptoTikcer() {
    let stockPriceElement = document.getElementById('ethusd-price');
    let crypto24hrElement = document.getElementById('ethusd-24hrchange');
    let lastPrice = null;
    this.ws_ethusd.onmessage = evt => {
      // listen to data sent from the websocket server
      let stockObject = JSON.parse(evt.data);
      
      let price = formatter.format(parseFloat(stockObject.p).toFixed(2));
      stockPriceElement.innerText = price;
      stockPriceElement.style.color = !lastPrice || lastPrice === price ? price > 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;
    };
    //Fetch ETH 24 hour price
    axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT')
    .then(function (response) {
      let crypto24hrObject = JSON.parse(JSON.stringify(response.data));
      crypto24hrElement.innerText = crypto24hrObject.priceChangePercent;
      //crypto24hrElement.style.color
      if(crypto24hrObject.priceChangePercent.includes('-'))
      {
        console.log('NEGATIVE');
        crypto24hrElement.style.color = 'red'

      } 
      else
      {
        console.log('POSITIVE');
        crypto24hrElement.style.color = 'green'
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  PopulateBNBryptoTikcer() {
    let lastPrice = null;
    let stockPriceElement = document.getElementById('bnbusd-price');
    let crypto24hrElement = document.getElementById('bnbusd-24hrchange');
    this.ws_bnbusd.onmessage = evt => {
      // listen to data sent from the websocket server
      let stockObject = JSON.parse(evt.data);
      let price = formatter.format(parseFloat(stockObject.p).toFixed(2));
      stockPriceElement.innerText = price;
      stockPriceElement.style.color = !lastPrice || lastPrice === price ? price > 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;      
    };
    //Fetch BNB 24 hour price
    axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BNBUSDT')
    .then(function (response) {
      let crypto24hrObject = JSON.parse(JSON.stringify(response.data));
      crypto24hrElement.innerText = crypto24hrObject.priceChangePercent;
      //crypto24hrElement.style.color
      if(crypto24hrObject.priceChangePercent.includes('-'))
      {
        console.log('NEGATIVE');
        crypto24hrElement.style.color = 'red';

      } 
      else
      {
        console.log('POSITIVE');
        crypto24hrElement.style.color = 'green';
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  PopulateBTCCryptoTikcer() {
    let lastPrice = null;
    let stockPriceElement = document.getElementById('btcusd-price');
    let crypto24hrElement = document.getElementById('btcusd-24hrchange');
    this.ws_btcusd.onmessage = evt => {
      // listen to data sent from the websocket server
      let stockObject = JSON.parse(evt.data);
      let price = formatter.format(parseFloat(stockObject.p).toFixed(2));
      stockPriceElement.innerText = price;
      stockPriceElement.style.color = !lastPrice || lastPrice === price ? price > 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;
    };
    //Fetch BTC 24 hour price
    axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
    .then(function (response) {
      let crypto24hrObject = JSON.parse(JSON.stringify(response.data));
      crypto24hrElement.innerText = crypto24hrObject.priceChangePercent;
      //crypto24hrElement.style.color
      if(crypto24hrObject.priceChangePercent.includes('-'))
      {
        console.log('NEGATIVE');
        crypto24hrElement.style.color = 'red'

      } 
      else
      {
        console.log('POSITIVE');
        crypto24hrElement.style.color = 'green'
      }
    })
    .catch(function (error) {
      console.log(error);
    })

  }

  PopulateDOTCryptoTikcer() {
    let lastPrice = null;
    let stockPriceElement = document.getElementById('dotusd-price');
    let crypto24hrElement = document.getElementById('dotusd-24hrchange');
    this.ws_dotusd.onmessage = evt => {
      // listen to data sent from the websocket server
      let stockObject = JSON.parse(evt.data);
      let price = formatter.format(parseFloat(stockObject.p).toFixed(2));
      stockPriceElement.innerText = price;
      stockPriceElement.style.color = !lastPrice || lastPrice === price ? price > 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;
    };
    //Fetch BTC 24 hour price
    axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=DOTUSDT')
    .then(function (response) {
      let crypto24hrObject = JSON.parse(JSON.stringify(response.data));
      crypto24hrElement.innerText = crypto24hrObject.priceChangePercent;
      //crypto24hrElement.style.color
      if(crypto24hrObject.priceChangePercent.includes('-'))
      {
        console.log('NEGATIVE');
        crypto24hrElement.style.color = 'red'

      } 
      else
      {
        console.log('POSITIVE');
        crypto24hrElement.style.color = 'green'
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  //shibusd-price
  PopulateSHIBCryptoTikcer() {
    let lastPrice = null;
    let stockPriceElement = document.getElementById('shibusd-price');
    let crypto24hrElement = document.getElementById('shibusd-24hrchange');
    this.ws_shibusd.onmessage = evt => {
      // listen to data sent from the websocket server

      let stockObject = JSON.parse(evt.data);
      let price = formatter.format(parseFloat(stockObject.p).toFixed(6));
      stockPriceElement.innerText = price;
      stockPriceElement.style.color = !lastPrice || lastPrice === price ? price > 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;
    };
      //Fetch BTC 24 hour price
      axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=SHIBUSDT')
      .then(function (response) {
        let crypto24hrObject = JSON.parse(JSON.stringify(response.data));
        crypto24hrElement.innerText = crypto24hrObject.priceChangePercent;
        //crypto24hrElement.style.color
        if(crypto24hrObject.priceChangePercent.includes('-'))
        {
          console.log('NEGATIVE');
          crypto24hrElement.style.color = 'red'
  
        } 
        else
        {
          console.log('POSITIVE');
          crypto24hrElement.style.color = 'green'
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render(){
    return(
      <div>
         <HeaderComp/>
         <CoverComp />
         <BlogComp />
         <ProductComp />
         
         <FooterComp />         
      </div>
  )
  }
}



export default App