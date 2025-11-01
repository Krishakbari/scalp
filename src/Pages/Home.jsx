import React, { useState, useMemo } from "react";

export default function NiftyOptionCalculator() {
  const [lotSize, setLotSize] = useState(1);
  const [qtyPerLot, setQtyPerLot] = useState(75);
  const [targetPoints, setTargetPoints] = useState(2);
  const [slPoints, setSlPoints] = useState(3);
  const [brokerage, setBrokerage] = useState(50);
  const [customWinRate, setCustomWinRate] = useState("");
  const [monthlyTrades, setMonthlyTrades] = useState(""); // ✅ new input
  const [showCustomInput, setShowCustomInput] = useState(false);

  const qty = lotSize * qtyPerLot;

  const {
    profitPerTrade,
    lossPerTrade,
    breakevenRate,
    customProfit,
    totalBrokerage,
    monthlyProfit,
  } = useMemo(() => {
    const profitPerTrade = targetPoints * qty - brokerage;
    const lossPerTrade = -(slPoints * qty) - brokerage;

    const breakevenRate =
      (Math.abs(lossPerTrade) / (profitPerTrade + Math.abs(lossPerTrade))) *
      100;

    let customProfit = null;
    let monthlyProfit = null;

    if (customWinRate !== "") {
      const winRate = Number(customWinRate);
      const wins = winRate;
      const losses = 100 - winRate;
      customProfit =
        (wins * profitPerTrade + losses * lossPerTrade).toFixed(2);
    }

    if (customWinRate !== "" && monthlyTrades !== "") {
      const winRate = Number(customWinRate) / 100;
      const totalWins = monthlyTrades * winRate;
      const totalLosses = monthlyTrades * (1 - winRate);
      const profit =
        totalWins * profitPerTrade + totalLosses * lossPerTrade;
      monthlyProfit = profit.toFixed(2);
    }

    const totalBrokerage = 100 * brokerage;

    return {
      profitPerTrade,
      lossPerTrade,
      breakevenRate,
      customProfit,
      totalBrokerage,
      monthlyProfit,
    };
  }, [targetPoints, slPoints, brokerage, qty, customWinRate, monthlyTrades]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
          Option Strategy Calculator
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Calculate breakeven, profit/loss & probability results
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Lot Size
            </label>
            <input
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Quantity per Lot
            </label>
            <input
              type="number"
              value={qtyPerLot}
              onChange={(e) => setQtyPerLot(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
            />
            <p className="text-xs text-gray-500 mt-1">
              Total Quantity = {qtyPerLot} × {lotSize} = {qty}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Target Points
            </label>
            <input
              type="number"
              value={targetPoints}
              onChange={(e) => setTargetPoints(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Stop Loss Points
            </label>
            <input
              type="number"
              value={slPoints}
              onChange={(e) => setSlPoints(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Brokerage per Trade (₹)
            </label>
            <input
              type="number"
              value={brokerage}
              onChange={(e) => setBrokerage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300"
            />
          </div>
        </div>

        {/* Result Button */}
        <button
          onClick={() => setShowCustomInput(true)}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
        >
          Proceed & Show Results
        </button>

        {/* Results */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            Result Summary (per trade)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-gray-700">Profit per Win</p>
              <p className="font-semibold text-green-600">
                ₹{profitPerTrade.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-gray-700">Loss per Trade</p>
              <p className="font-semibold text-red-600">
                ₹{lossPerTrade.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-gray-700">Total Brokerage (100 trades)</p>
              <p className="font-semibold text-blue-600">
                ₹{totalBrokerage.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-gray-700">Break-even Win Rate</p>
              <p className="font-semibold text-amber-600">
                {breakevenRate.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        {/* Custom Probability Section */}
        {showCustomInput && (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              Test Your Win Probability
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <input
                type="number"
                placeholder="Enter Win Rate (e.g. 80)"
                value={customWinRate}
                onChange={(e) => setCustomWinRate(e.target.value)}
                className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {customProfit !== null && (
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-gray-700">
                  Expected Profit/Loss after 100 Trades (₹)
                </p>
                <p
                  className={`text-xl font-semibold ${
                    customProfit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{Number(customProfit).toLocaleString("en-IN")}
                </p>
              </div>
            )}

            {/* ✅ New Monthly Trades Input */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <input
                type="number"
                placeholder="Enter Monthly Trades (e.g. 250)"
                value={monthlyTrades}
                onChange={(e) => setMonthlyTrades(e.target.value)}
                className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
              />
            </div>

            {monthlyProfit !== null && (
              <div className="mt-4 bg-green-50 p-3 rounded-lg">
                <p className="text-gray-700">
                  Expected Profit/Loss after {monthlyTrades} Trades (₹)
                </p>
                <p
                  className={`text-xl font-semibold ${
                    monthlyProfit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{Number(monthlyProfit).toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
