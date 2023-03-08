import axios from "axios";
import { useState, useEffect } from "react";

const UsDollar = () => {
    const [bpiData, setBpiData] = useState({});

    const fetchAPIData = async () => {
      const {data:{bpi}} = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      setBpiData(bpi);
    }

    useEffect(() => {
      fetchAPIData();
    }, []);
    
    return <div>
            <p class="currency-name">Currency: {JSON.stringify(bpiData.USD?.code,0,1)} </p>
            <p class="bitcoin-to-currency">1 Bitcoin to {JSON.stringify(bpiData.USD?.code,0,1)}: {JSON.stringify(bpiData.USD?.rate_float,0,1)} </p>
            <p class="currency-to-bitcoin">1 {JSON.stringify(bpiData.USD?.code,0,1)} to Bitcoin: {1/JSON.stringify(bpiData.USD?.rate_float,0,1)} </p>
            <p class="currency-description">Description: {JSON.stringify(bpiData.USD?.description,0,1)} </p>
    </div>;
}

export default UsDollar;