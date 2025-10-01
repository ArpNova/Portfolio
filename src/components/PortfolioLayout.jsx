import React, { Suspense } from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';

import Terminal from './terminal.jsx';
import Footer from './footer.jsx';
import Header from './header.jsx';
import Card from './card.jsx';


function PortfolioLayout() {
  const [leftPanelWidth, setLeftPanelWidth] = useState(40);
  const isResizing = useRef(false);
  const containerRef = useRef(null); 

  const handleMouseMove = useCallback((e) => {
    if (!isResizing.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    if (newWidth > 35 && newWidth < 65) {
      setLeftPanelWidth(newWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
   
    <div className='flex flex-col h-screen bg-gray-700'>
      <Header />

      <div className='flex flex-grow overflow-hidden' ref={containerRef}>
        
        
        <div className=' text-black flex items-center justify-center overflow-hidden border-b-2 border-green-800'
          style={{ width: `${leftPanelWidth}%` }}
        >
          <Card/>
        </div>
        
        
        <div
          className='w-0.5 cursor-col-resize bg-gray-400 hover:bg-blue-500 transition-colors'
          onMouseDown={handleMouseDown} 
        />
        
        
        <div className=' flex-grow flex items-center justify-center border-b-2 border-green-800'>
          <Terminal/>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default PortfolioLayout;