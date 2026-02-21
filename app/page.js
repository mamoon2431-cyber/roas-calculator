"use client";

import { useState } from "react";

export default function Home() {
  const [productCost, setProductCost] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [refundRate, setRefundRate] = useState("");
  const [feesPercent, setFeesPercent] = useState("");
  const [result, setResult] = useState(null);

  function calculateROAS() {
    const cost = parseFloat(productCost);
    const price = parseFloat(salePrice);
    const refund = parseFloat(refundRate) / 100;
    const fees = parseFloat(feesPercent) / 100;

    if (!cost || !price) return;

    const revenueAfterRefunds = price * (1 - refund);
    const revenueAfterFees = revenueAfterRefunds * (1 - fees);
    const profit = revenueAfterFees - cost;

    if (profit <= 0) {
      setResult("Unprofitable");
      return;
    }

    const breakevenROAS = price / profit;
    setResult(breakevenROAS.toFixed(2));
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-4">
          Most Shopify Stores Scale Ads at a Loss.
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Calculate your TRUE breakeven ROAS after refunds, payment fees, 
          and discounts — before you scale.
        </p>

        <div className="bg-gray-100 p-4 rounded mb-6">
          <p className="text-sm text-gray-700">
            Most store owners only calculate product margin.
            They ignore refunds, transaction fees, and discount rates.
            That mistake destroys profit when scaling ads.
          </p>
        </div>

        <div className="space-y-4">

          <input
            type="number"
            placeholder="Product Cost (£)"
            className="w-full border p-2 rounded"
            onChange={(e) => setProductCost(e.target.value)}
          />

          <input
            type="number"
            placeholder="Sale Price (£)"
            className="w-full border p-2 rounded"
            onChange={(e) => setSalePrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Refund Rate (%)"
            className="w-full border p-2 rounded"
            onChange={(e) => setRefundRate(e.target.value)}
          />

          <input
            type="number"
            placeholder="Payment Fees (%)"
            className="w-full border p-2 rounded"
            onChange={(e) => setFeesPercent(e.target.value)}
          />

          <button
            onClick={calculateROAS}
            className="w-full bg-black text-white p-3 rounded font-semibold hover:bg-gray-800"
          >
            Calculate True Breakeven
          </button>

        </div>

        {result && (
          <div className="mt-6 p-4 rounded bg-gray-50 border">
            <p className="text-xl font-semibold">
              Your True Breakeven ROAS: {result}
            </p>

            {result !== "Unprofitable" && parseFloat(result) > 3 && (
              <p className="text-red-600 mt-2">
                Warning: Scaling below this ROAS will lose money.
              </p>
            )}

            {result !== "Unprofitable" && parseFloat(result) <= 3 && (
              <p className="text-green-600 mt-2">
                Healthy margin buffer. Scaling may be safer.
              </p>
            )}

            {result === "Unprofitable" && (
              <p className="text-red-600 mt-2">
                Your current numbers are not profitable.
              </p>
            )}
          </div>
        )}

      </div>

    </main>
  );
}