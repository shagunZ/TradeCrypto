import { create } from '@mui/material/styles/createTransitions'
import React from 'react'
import { createContext,useState,useContext,useEffect } from 'react'

const Crypto = createContext();

const ContextCrypto = ({children}) => {

    const [currency,setCurrency] = useState("INR")
    const [symbol,setSymbol] = useState("Rs.")

    useEffect(()=>{
        if(currency==="INR") setSymbol("Rs.")
                else if(currency==="USD") setSymbol("$");
        else if(currency==="EUR") setSymbol("€");
        
    },[currency]);

  return (
    <>
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
        {children}
    </Crypto.Provider>
    </>
  )
}

export default ContextCrypto

export const CryptoState = () => { 
    return useContext(Crypto)
}