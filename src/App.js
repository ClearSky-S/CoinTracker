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
        console.log(json);
        setCoins(list);
        setLoading(false);
      });
  }, []);
  return (
    <div className="App">
      <h1>The Coins!</h1>
      {loading?
        <strong>Loading...</strong>
      :
        <div>
          <select>
            {coins.map((coin, index) =>
              <option key={index}>{index}. {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}</option>
            )}
            {console.log(coins[0])}
            {console.log(typeof (coins[0]))}
          </select>
          <br/>
          <div>
            <input
              type="number"
              value={value}
              placeholder="Please enter a number"
              onChange={(event)=>setValue(event.target.value)}
              ></input>
            {" USD "}= &nbsp;
            <span>{value===""? 0 : value*10} {"BTC"}</span>
          </div>
        </div>
      }

    </div>
  );
}

export default App;
