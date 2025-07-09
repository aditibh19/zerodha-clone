import React, { useEffect, useRef } from 'react';

const TradingViewWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          width: '100%',
          height: 500,
          symbol: 'NSE:TATAMOTORS', // Change to any ticker you want
          interval: 'D',
          timezone: 'Asia/Kolkata',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          container_id: 'tradingview-container'
        });
      }
    };

    containerRef.current.appendChild(script);
  }, []);

  return <div id="tradingview-container" ref={containerRef}></div>;
};

export default TradingViewWidget;
