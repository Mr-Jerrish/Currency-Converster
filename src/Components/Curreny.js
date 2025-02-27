import {useEffect, useState} from 'react';
import axios from 'axios';

export const Curreny = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurreny, setFromCurrency] = useState('USD');
  const [toCurreny, setToCurrency] = useState('INR');
  const [value, setValue]=useState(null)
  const [exchangeRate ,setExchangeRate]=useState(null);
 useEffect(()=>{
  const getExchangeRate = async () => {
    try{
      let url= `https://v6.exchangerate-api.com/v6/029fb767ddaf26e04ad9d677/latest/${fromCurreny}`;
      const response=await axios.get(url);
      console.log(response);
      setExchangeRate(response.data.conversion_rates[toCurreny])
    }catch (error) {
      console.error('Enter Fecting Exchange Rate:',error);
    }
  }
  getExchangeRate();
 },[fromCurreny,toCurreny]);
 useEffect(()=>{
  if(exchangeRate !== null) {
    setValue((amount * exchangeRate).toFixed(2));
  }
 },[amount,exchangeRate]);
 const HandleAmountChange = (e)=> {
   let value = parseFloat(e.target.value);
   setAmount(isNaN(value)?0:value); 
 }
 const handleChangeCurrency = (e) =>{
    setFromCurrency(
      e.target.value
    )
 }
 const handleChangeTo = (e) =>{
    setToCurrency(
      e.target.value
    )
 }

  return (
    <>
    <div className="container d-flex flex-column vh-100 w-100 justify-content-center align-items-center">

    <div className='p-5 main'>

    <div className='heading mb-3'>
      <h2>Currency Converter</h2>
    </div>

  

    <div className='label mb-2'>
          <label className="form-label fw-bold">Amount</label>
    <input type="number" className="form-control" value={amount} onChange={HandleAmountChange}></input>
    </div>

    <div className='FromCurrency mb-2'>
        <label className="form-label fw-bold">From Currency</label>
      <select className="form-select" value={fromCurreny} onChange={handleChangeCurrency}> 
  
  <option  value='USD'>USD - United States Dollar</option>
  <option value="EUR">EUR - Euro</option>
  <option value="GBP">GBP - British Pound Sterling</option>
   <option value="JPY">JPY - japanese Yen</option>
    <option value="AUD">AUD - Australian Dollar</option>
     <option value="CAD">CAD - Canadian Dollar</option>
      <option value="CNY">CNY - Chinese Yuan</option>
       <option value="INR">INR - Indian Rupee</option>
        <option value="BRL">BRL - Brazilian Real</option>
         <option value="ZAR">ZAR - South African Rand</option>
</select>
    </div>

     <div className='ToCurrency mb-2'>
        <label className="form-label fw-bold">To Currency</label>
      <select className="form-select" value={toCurreny} onChange={handleChangeTo}>
  
  <option value="USD" >USD - United States Dollar</option>
  <option value="EUR">EUR - Euro</option>
  <option value="GBR">GBR - British Pound Sterling</option>
   <option value="JPY">JPY - japanese Yen</option>
    <option value="AUD">AUD - Australian Dollar</option>
     <option value="CAD">CAD - Canadian Dollar</option>
      <option value="CNY">CNY - Chinese Yuan</option>
       <option value="INR">INR - Indian Rupee</option>
        <option value="BRL">BRL - Brazilian Real</option>
         <option value="ZAR">ZAR - South African Rand</option>
</select>
    </div>

    <div className='Result '>
      <p className='fs-3'>{amount} {fromCurreny} is equal to {value}  {toCurreny}</p>
    </div>



  </div>

</div>

    </>
  )
}
