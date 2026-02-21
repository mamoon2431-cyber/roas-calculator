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

    const breakevenROAS = price / (price - netProfit);

    setResult({
      netProfit: netProfit.toFixed(2),
      breakevenROAS: breakevenROAS.toFixed(2),
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        Shopify Breakeven ROAS Calculator
      </h1>

      <div className="flex flex-col gap-3 w-64">
        <input placeholder="Product Price" onChange={e => setPrice(Number(e.target.value))} />
        <input placeholder="COGS" onChange={e => setCogs(Number(e.target.value))} />
        <input placeholder="Shipping" onChange={e => setShipping(Number(e.target.value))} />
        <input placeholder="Processing Fee %" onChange={e => setFees(Number(e.target.value))} />
        <input placeholder="Refund Rate %" onChange={e => setRefund(Number(e.target.value))} />
        <input placeholder="Discount %" onChange={e => setDiscount(Number(e.target.value))} />

        <button onClick={calculate} className="bg-black text-white p-2">
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-6 text-center">
          <p>Net Profit Per Sale: £{result.netProfit}</p>
          <p>Breakeven ROAS: {result.breakevenROAS}x</p>
        </div>
      )}
    </div>
  );
}