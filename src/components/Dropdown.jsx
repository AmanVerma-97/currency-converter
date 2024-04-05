import { HiOutlineStar, HiStar } from "react-icons/hi2";

function Dropdown({
    currencies,
    title,
    favourites,
    handleFavourite,
    currency, //to and from currency
    setCurrency //to set to and from currency
}) {

  const favourite = favourites.includes(currency);
  return (
    <div>
        <label htmlFor={title} className="block text-sm font-medium text-gray-700 mb-1"> {title} </label>

        <div className="relative">
            <select 
            name="currencies" 
            id="currencies" 
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}
            className=" w-full p-2 border border-gray-600/80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700/90 bg-gray-100 cursor-pointer">
                {/* Render favourites */}
                {favourites.map((currency)=>{
                    return(
                        <option value={currency} key={currency} className=" bg-blue-200">
                            {currency}
                        </option>
                    )
                })}
                <hr />
                { currencies.filter((c)=>!favourites.includes(c)).map((curr) => {
                    return(
                        <option value={curr} key={curr}>
                            {curr}
                        </option>
                    );
                })}
                
            </select>
            
            {/*Button to add to favourite */}
            <button onClick={()=>handleFavourite(currency)} className=" absolute inset-y-0 right-4 pr-2 flex items-center justify-center text-sm leading-4 ">
                 {
                    favourite ? <HiStar/> :<HiOutlineStar />
                 }
                 
            </button>
            
        </div>
    </div>
  )
}

export default Dropdown