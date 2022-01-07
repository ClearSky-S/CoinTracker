import './App.css';
import { useState, useEffect } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(0);
  console.log(loading);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(response => response.json())
      .then(json => {
        let list = [];
        for (let i = 0; i < 10; i++) {
          list.push(json[i]);
        }
        setCoins(list);
        setLoading(false);
      });
  }, []);
  return (
    <div className="App">
      <h1>Coin Price</h1>
      {loading?
        <strong>Loading...</strong>
      :
        <div>
          <select
            onChange={(event)=>{console.log(event.target.value);setSelectedCoin(event.target.value)}}
          >
            {coins.map((coin, index) =>
              <option value={index} key={index}>{index}. {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}</option>
            )}
          </select>
          <br/>
          <div>
            <input
              value={value}
              onChange={(event)=>setValue(event.target.value)}
              type="number"
              placeholder="Please enter a number"
              ></input>
            {" USD "}= &nbsp;
            <span>{value===""? 0 : value/coins[selectedCoin].quotes.USD.price} {"BTC"}</span>
          </div>
        </div>
      }

    </div>
  );
}

export default App;
