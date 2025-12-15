/**
 * Discount Calculator
 * Calculate discounts, final prices, and savings
 */

import { useState } from "react";
import CalculatorCard from "../shared/components/CalculatorCard";
import InputField from "../shared/components/InputField";
import ResultDisplay from "../shared/components/ResultDisplay";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [additionalDiscount, setAdditionalDiscount] = useState("");

  const calculateResults = () => {
    const price = parseFloat(originalPrice) || 0;
    const discount1 = parseFloat(discountPercent) || 0;
    const discount2 = parseFloat(additionalDiscount) || 0;

    // Calculate first discount
    const firstDiscountAmount = (price * discount1) / 100;
    const priceAfterFirst = price - firstDiscountAmount;

    // Calculate second discount (if any)
    const secondDiscountAmount =
      discount2 > 0 ? (priceAfterFirst * discount2) / 100 : 0;
    const finalPrice = priceAfterFirst - secondDiscountAmount;

    const totalSavings = price - finalPrice;
    const totalDiscountPercent =
      price > 0 ? ((totalSavings / price) * 100).toFixed(2) : "0.00";

    return {
      firstDiscountAmount: firstDiscountAmount.toFixed(2),
      secondDiscountAmount: secondDiscountAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      totalDiscountPercent,
    };
  };

  const results = calculateResults();

  return (
    <CalculatorCard
      title="Discount Calculator"
      icon="🏷️"
      gradient="from-pink-500 to-rose-600"
    >
      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <InputField
            label="Original Price"
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="0.00"
            icon={<span>💰</span>}
            unit="$"
            min="0"
            step="0.01"
            required
          />

          <InputField
            label="Discount Percentage"
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="0"
            icon={<span>%</span>}
            unit="%"
            min="0"
            max="100"
            step="1"
            required
          />

          <InputField
            label="Additional Discount (Optional)"
            type="number"
            value={additionalDiscount}
            onChange={(e) => setAdditionalDiscount(e.target.value)}
            placeholder="0"
            icon={<span>🎁</span>}
            unit="%"
            min="0"
            max="100"
            step="1"
          />
        </div>

        <div>
          {/* Visual Price Comparison */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6 border-2 border-pink-200 dark:border-pink-800 h-full flex flex-col justify-center">
            <div className="text-center">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Original Price
                </p>
                <p className="text-3xl font-bold text-gray-400 line-through">
                  ${parseFloat(originalPrice) || 0}
                </p>
              </div>

              <div className="flex items-center justify-center mb-4">
                <div className="h-0.5 w-12 bg-gradient-to-r from-pink-500 to-rose-600"></div>
                <span className="text-2xl mx-2">💰</span>
                <div className="h-0.5 w-12 bg-gradient-to-r from-pink-500 to-rose-600"></div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Final Price
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ${results.finalPrice}
                </p>
              </div>

              {parseFloat(results.totalSavings) > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full">
                  <span>🎉</span>
                  <span className="font-semibold">
                    You save ${results.totalSavings}!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <ResultDisplay
          label="Final Price"
          value={`$${results.finalPrice}`}
          icon="💵"
          gradient="from-green-500 to-emerald-600"
        />

        <ResultDisplay
          label="Total Savings"
          value={`$${results.totalSavings}`}
          icon="💸"
          gradient="from-pink-500 to-rose-600"
        />

        <ResultDisplay
          label="Total Discount"
          value={`${results.totalDiscountPercent}%`}
          icon="🏷️"
          gradient="from-purple-500 to-indigo-600"
        />
      </div>

      {/* Discount Breakdown */}
      {parseFloat(originalPrice) > 0 && parseFloat(discountPercent) > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Discount Breakdown
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                Original Price
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${parseFloat(originalPrice).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                First Discount ({discountPercent}%)
              </span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -${results.firstDiscountAmount}
              </span>
            </div>
            {parseFloat(additionalDiscount) > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">
                  Additional Discount ({additionalDiscount}%)
                </span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  -${results.secondDiscountAmount}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg px-4 mt-2">
              <span className="font-bold">Final Price</span>
              <span className="font-bold text-xl">${results.finalPrice}</span>
            </div>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
};

export default DiscountCalculator;
