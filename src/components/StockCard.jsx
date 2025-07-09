import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // ✅ Firebase DB import
import { collection, addDoc } from 'firebase/firestore';

const StockCard = ({ stock }) => {
  const isPositive = stock.regularMarketChangePercent >= 0;
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';

  const handleAddToWatchlist = async (e) => {
    e.preventDefault(); // prevents Link from opening chart when button clicked

    try {
      await addDoc(collection(db, "watchlist"), {
        symbol: stock.symbol,
        name: stock.shortName || stock.symbol,
        price: stock.regularMarketPrice,
        change: stock.regularMarketChangePercent,
        volume: stock.regularMarketVolume,
        addedAt: new Date(),
      });
      alert("✅ Added to Watchlist!");
    } catch (err) {
      console.error("❌ Error saving stock:", err);
      alert("❌ Failed to add stock to watchlist.");
    }
  };

  return (
    <Link to={`/stocks/${stock.symbol}`}>
      <div className="bg-white shadow-lg rounded-lg p-4 m-3 w-64 border hover:shadow-2xl transition">
        <h2 className="text-xl font-semibold">{stock.shortName || stock.symbol}</h2>
        <p className="text-sm text-gray-500">{stock.symbol}</p>
        <p className="text-2xl font-bold mt-2">{stock.regularMarketPrice} ₹</p>
        <p className={`${colorClass} text-sm mt-1`}>
          {stock.regularMarketChangePercent?.toFixed(2)}%
        </p>
        <p className="text-xs text-gray-400 mt-2">Vol: {stock.regularMarketVolume}</p>

        <button
          className="mt-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          onClick={handleAddToWatchlist}
        >
          + Add to Watchlist
        </button>
      </div>
    </Link>
  );
};

export default StockCard;
