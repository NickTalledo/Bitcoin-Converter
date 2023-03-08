import { useState, useEffect } from "react";
import Euro from "./Euro";
import GBP from "./GBP";
import UsDollar from "./USD";

const Currency = () => {
    const [bpiData, setBpiData] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [amount, setAmount] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [canRefresh, setCanRefresh] = useState(true);
    const [componentToShow, setComponentToShow] = useState('');
    const [isConvertingToBitcoin, setIsConvertingToBitcoin] = useState(true);

    const arrayUsdHandler = () =>{
      setComponentToShow('USD');
  }

  const arrayGbpHandler = () =>{
    setComponentToShow('GBP');
}

const arrayEuroHandler = () =>{
  setComponentToShow('EURO');
}

    useEffect(() => {
      async function fetchBpiData() {
        const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
        const data = await response.json();
        setBpiData(data.bpi);
        setTimestamp(data.time.updated);
        setCanRefresh(false);
        localStorage.setItem("lastRefreshTime", Date.now());
      }
      fetchBpiData();
    }, []);

    function handleCurrencyChange(e) {
      setSelectedCurrency(e.target.value);
    }
  
    function handleAmountChange(e) {
      setAmount(e.target.value);
    }

    function handleToggleConversion() {
      setIsConvertingToBitcoin(!isConvertingToBitcoin);
    }

    function convertFromBTC() {
      return (amount * bpiData[selectedCurrency]?.rate_float).toFixed(2);
    }
  
     function convertToBTC() {
       return (amount / bpiData[selectedCurrency]?.rate_float).toFixed(10);
     }

     window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to refresh?";
    });

    function handleRefreshClick() {
      if (!canRefresh) {
        const lastRefreshTime = localStorage.getItem("lastRefreshTime");
        const diff = Date.now() - lastRefreshTime;
        const remainingTime = Math.ceil((5 * 60 * 1000 - diff) / 1000);
        alert(`You can refresh data again in ${remainingTime} seconds.`);
        return;
      }
      
    }
    
    return <div class = "container">
         <div>
            <p>Time: {timestamp}</p>
            <hr/>
            <h1>Bitcoin Converter</h1>
            <button onClick={handleToggleConversion}>
            {isConvertingToBitcoin ? "Convert to Currency" : "Convert to Bitcoin"}
            </button>
            <button onClick={handleRefreshClick}>Refetch</button>
            <label htmlFor="currency">Currency:</label>
            <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
            {Object.keys(bpiData).map((currency) => (
              <option key={currency} value={currency}>{bpiData[currency].code}</option>
             ))}
            </select>
          </div>
          <h2>{isConvertingToBitcoin ? "Convert to Bitcoin" : "Convert to Currency"}</h2>
          {isConvertingToBitcoin ? (
          <><div class="form-group">
          <label htmlFor="amount">Amount: </label>
          <input id="amount" type="number" min="0" value={amount} onChange={handleAmountChange} />
        </div><div class="result-group">
            <label htmlFor="result">Bitcoin: </label>
            <input id="result" type="text" value={convertToBTC()} readOnly />
          </div></>
          ) : (
            <><div class="form-group">
            <label htmlFor="amount">Bitcoin: </label>
            <input id="amount" type="number" min="0" value={amount} onChange={handleAmountChange} />
          </div><div class="result-group">
              <label htmlFor="result">Amount: </label>
              <input id="result" type="text" value={convertFromBTC()} readOnly />
            </div></>
          )}
            <hr />
            <section>
        <button onClick={arrayUsdHandler}>
          <span>USD</span>
        </button>
        <button onClick={arrayGbpHandler}>
          <span>GBP</span>
        </button>
        <button onClick={arrayEuroHandler}>
          <span>Euro</span>
        </button>
        </section>
        {componentToShow == 'USD' && <UsDollar/>}
        {componentToShow == 'GBP' && <GBP />}
        {componentToShow == 'EURO' && <Euro/> }
    </div>;
}

export default Currency;