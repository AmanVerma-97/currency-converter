import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

function CurrencyConverter() {

  //const currencies = 'https://api.frankfurter.app/currencies';
  ///const conversion = 'https://api.frankfurter.app/latest?amount=1&from=USD&to=INR';

  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(null);
  const [fromCurrency, setfromCurrency] = useState("INR");
  const [toCurrency, settoCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting , setConverting ] = useState(false);
  //Important
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")) || []); //get favourites from localstorage, will be empty initially.


  //fetch currrency from API.
  const fetchCurrencies=async()=>{
    try {
        const res= await fetch('https://api.frankfurter.app/currencies');
        const data= await res.json();

        setCurrencies(Object.keys(data)); //data received is in form of 'Objects', converting to Array.
        
    } catch (error) {
        console.log("Error fetching",error);
    }
  }

 //Runs once whenever component is loaded.
  useEffect(() => {
    fetchCurrencies();
  }, []);

  //to convert currency
  const convertCurrency=async()=>{
    if(!amount){
        return; // when user wants to convert currenices but has not specified the amount
    }
    setConverting(true);// to animate till converting
    try {
        const res= await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        const data= await res.json();

        setConvertedAmount(data.rates[toCurrency]+" "+toCurrency)
        
    } catch (error) {
        console.log("Error fetching",error);
    } finally{
        setConverting(false);
    }
  }

  //to handle favourites
  const handleFavourite=(currency)=>{
    let updatedFavourites=[...favourites];

    if(favourites.includes(currency)){
        updatedFavourites = updatedFavourites.filter((fav)=>fav!==currency);
    }
    else{
        updatedFavourites.push(currency);
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  }

  //to swap currencies
  const swapCurrencies=()=>{
    setfromCurrency(toCurrency);
    settoCurrency(fromCurrency);
  }
  
  console.log(currencies);
  return (
    
    <div className=" w-10/12 max-w-xl mx-auto my-10 p-6 bg-white rounded-md shadow-md shadow-rose-600">

        <h2 className=" text-2xl font-semibold text-gray-800 mb-4 text-center"> Currency Converter </h2>
    
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end"> 

            <Dropdown currencies={currencies} title="From" handleFavourite={handleFavourite} currency={fromCurrency} setCurrency={setfromCurrency} favourites={favourites}/>
            
            {/* button to swap currencies */}
            <div className="flex justify-center -mb-5 sm:mb-0">
                <button onClick={swapCurrencies} className=" p-2 bg-gray-100 rounded-full hover:bg-gray-400">
                    <HiArrowsRightLeft className="text-xl text-gray-800"/>
                </button>
            </div>

            <Dropdown currencies={currencies} title="To" handleFavourite={handleFavourite} currency={toCurrency} setCurrency={settoCurrency} favourites={favourites}/>
        </div>

        <div> 
            <label htmlFor="amount" className="block text-sm font-medium text-gray-900 mb-1" > Amount </label>

            <input 
            type="number" 
            value={amount} 
            onChange={(e)=>setAmount(e.target.value)} 
            name="amount" 
            id="amount" 
            className=" w-full p-2 border border-gray-600/80 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-700/90 bg-gray-100"/>
        </div>

        <div className="flex justify-end mt-5">
            <button 
            onClick={convertCurrency} 
            className={`m-auto px-4 py-2 border border-black font-bold bg-rose-500 text-white rounded-md hover:bg-rose-700 
             focus:outline-none focus:ring-2 focus:ring-blue-700/90 focus:ring-offset-2 ${converting?" animate-pulse":""}`}> Convert</button>
        </div>

        { convertedAmount && <div className="mt-4 text-md font-semibold text-right text-green-700">
            Converted Amount : {convertedAmount}
        </div>}
    </div>
  )
}

export default CurrencyConverter