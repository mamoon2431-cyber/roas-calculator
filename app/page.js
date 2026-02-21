"use client";
import { useState } from "react";

export default function Home() {
  const [price, setPrice] = useState("");
  const [cogs, setCogs] = useState("");
  const [shipping, setShipping] = useState("");
  const [fees, setFees] = useState("");
  const [refund, setRefund] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const discountedPrice = price * (1 - discount / 100);
    const processingFee = discountedPrice * (fees / 100);
    const refundLoss = discountedPrice * (refund / 100);
    const netProfit =
      discountedPrice - cogs - shipping - processingFee - refundLoss;

    const breakevenROAS =
      netProfit > 0 ? (price / netProfit).toFixed(2) : "Not Profitable";

    setResult({
      netProfit: netProfit.toFixed(2),
      breakevenROAS,
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          True Breakeven ROAS Calculator
        </h1>

        <div className="flex flex-col gap-3">
          <input className="border p-2 rounded"
            placeholder="Product Price (£)"
            onChange={e => setPrice(Number(e.target.value))}
          />
          <input className="border p-2 rounded"
            placeholder="COGS (£)"
            onChange={e => setCogs(Number(e.target.value))}
          />
          <input className="border p-2 rounded"
            placeholder="Shipping (£)"
            onChange={e => setShipping(Number(e.target.value))}
          />
          <input className="border p-2 rounded"
            placeholder="Processing Fee (%)"
            onChange={e => setFees(Number(e.target.value))}
          />
          <input className="border p-2 rounded"
            placeholder="Refund Rate (%)"
            onChange={e => setRefund(Number(e.target.value))}
          />
          <input className="border p-2 rounded"
            placeholder="Average Discount (%)"
            onChange={e => setDiscount(Number(e.target.value))}
          />

          <button
            onClick={calculate}
            className="bg-black text-white p-3 rounded mt-2 hover:bg-gray-800 transition"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="mt-6 text-center border-t pt-4">
            <p className="font-semibold">
              Net Profit Per Sale: £{result.netProfit}
            </p>
            <p className="font-semibold mt-2">
              Breakeven ROAS: {result.breakevenROAS}x
            </p>
          </div>
        )}
      </div>
    </div>
  );
}