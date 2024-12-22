import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const generateRandomData = (min, max, length) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

const getTimeLabels = (timeframe, historicalPrices) => {
  switch (timeframe) {
    case '1d':
      return ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM'];
    case '1w':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    case '1m':
      return ['1st', '5th', '10th', '15th', '20th', '25th', '30th'];
    case '6m':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    case '1y':
      return ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];
    case '5y':
      return ['2020', '2021', '2022', '2023', '2024'];
    case 'all':
      return ['2000', '2005', '2010', '2015', '2020', '2025'];
    default:
      return [];
  }
};

const Spotify = () => {
  const [stockData, setStockData] = useState({
    symbol: 'SPOT',
    name: 'Spotify',
    price: 255.40,
    historicalPrices: {
      '1d': generateRandomData(75, 106, 7),
      '1w': generateRandomData(80, 110, 5),
      '1m': generateRandomData(89, 112, 7),
      '6m': generateRandomData(110, 127, 6),
      '1y': generateRandomData(121, 153, 6),
      '5y': generateRandomData(122, 263, 5),
      'all': generateRandomData(103, 290, 6),
    },
  });

  const [timeframe, setTimeframe] = useState('1d');
  const [predictedPrice, setPredictedPrice] = useState(null);

  // Price prediction function
  const predictPrice = () => {
    const lastPrice = stockData.historicalPrices[timeframe][stockData.historicalPrices[timeframe].length - 1];
    const predictedPrice = lastPrice * (1 + Math.random() * 0.05); // 5% predicted growth
    setPredictedPrice(predictedPrice.toFixed(2));
  };

  const chartData = {
    labels: getTimeLabels(timeframe, stockData.historicalPrices[timeframe]),
    datasets: [
      {
        label: `${stockData.name} Stock Price`,
        data: stockData.historicalPrices[timeframe],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    predictPrice();
  };

  useEffect(() => {
    predictPrice();
  }, [timeframe]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header Section */}
      <header className="flex justify-between items-center pr-6 py-2 pl-20 bg-zinc-800">
        <div className="flex items-center space-x-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/042/148/631/non_2x/spotify-logo-spotify-social-media-icon-free-png.png"
            alt="Spotify Logo"
            className="w-24 h-24"
          />
          <div className="text-2xl font-bold text-green-600">
            {stockData.name} ({stockData.symbol})
          </div>
        </div>
        <div className="text-lg">
          <span className="text-green-500">${stockData.price}</span>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="p-8 space-y-8 items-center justify-center">
        {/* Company Overview */}
        <section className="bg-zinc-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
          <p className="text-gray-400">
            Spotify Technology S.A. is a global leader in music streaming, offering millions of songs, podcasts, and videos.
            The company is at the forefront of revolutionizing the way we consume music through its subscription-based service
            and personalized recommendations.
          </p>
        </section>

        {/* Timeframe Selector */}
        <section className="text-center space-x-4">
          {['1d', '1w', '1m', '6m', '1y', '5y', 'all'].map((timeframeOption) => (
            <button
              key={timeframeOption}
              className={`py-1 px-4 rounded-full transition duration-300 ${timeframe === timeframeOption ? 'bg-green-600' : 'bg-gray-700'}`}
              onClick={() => handleTimeframeChange(timeframeOption)}
            >
              {timeframeOption === '1d' ? '1 Day' : timeframeOption === '1w' ? '1 Week' : timeframeOption === '1m' ? '1 Month' : timeframeOption === '6m' ? '6 Months' : timeframeOption === '1y' ? '1 Year' : timeframeOption === '5y' ? '5 Years' : 'All'}
            </button>
          ))}
        </section>

        {/* Stock Price Chart */}
        <section className="w-full max-w-3xl mx-auto mt-6">
          <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </section>

        {/* Buy/Sell Suggestion */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Buy or Sell?</h2>
          <div className="text-lg">
            {predictedPrice < stockData.price ? (
              <span className="text-red-500">Sell</span>
            ) : (
              <span className="text-green-500">Buy</span>
            )}
          </div>
        </section>

        {/* Predicted Price */}
        <section className="text-center mt-6">
          <h2 className="text-2xl font-semibold mb-4">Predicted Price</h2>
          <div className="text-lg">
            {predictedPrice ? (
              <span className="text-green-500 font-semibold">${predictedPrice}</span>
            ) : (
              <span className="text-gray-400">Loading...</span>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Spotify;
