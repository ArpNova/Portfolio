import {React, useEffect, useState, } from "react";

const Footer = () => {
    const [currentTime,setCurrenttime] = useState(new Date());
  
    useEffect(() => {
      const timerId = setInterval(() => {
        setCurrenttime(new Date())
      },1000)
      
      return ()=>{
        clearInterval(timerId);
      }
    },[])
  
    return (
      <footer className="bg-black p-1 font-mono border-b-2 border-green-800 text-center text-sm text-green-500 flex justify-between items-center">
        <span>arpan@portfolio:~$</span>
        <span>{currentTime.toLocaleString()}</span>
        
      </footer>
    );
};

export default Footer;