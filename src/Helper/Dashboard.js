class Dashboard {
  // Simple function
  static printSum = (a, b) => {
    return a + b;
  };

  // Simple function
  static multiply = (a, b) => {    
    console.log(a * b);
    return a * b;
  };

  // Return Promise
  static getPromiseData = () => {
    return Promise.resolve({ name: "JsMount", id: 123 });
  };
  // Populate ETH Ticker Price
  static PopulateETHCTicker = () =>{
    console.log('ws_eth');
    var ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
    ws = evt => {
      // listen to data sent from the websocket server
      let lastPrice = null;
      let stockPriceElement = document.getElementById('ethusd-price');
      let stockObject = JSON.parse(evt.data);
      let price = parseFloat(stockObject.p).toFixed(2);
      stockPriceElement.innerText = price;
      stockPriceElement.style.color = !lastPrice || lastPrice === price ? price > 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;
    };
  }
} 

export default Dashboard;