import { useState } from 'react'
import CurrencyConverter from './components/CurrencyConverter'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <div className=' min-h-screen bg-black flex flex-col items-center justify-center'> 

            <div className='container'>
              <CurrencyConverter />
            </div>
          
        </div>
      
    </>
  )
}

export default App
