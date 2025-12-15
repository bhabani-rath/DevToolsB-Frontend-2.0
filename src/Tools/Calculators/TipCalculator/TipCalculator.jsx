/**
 * Tip Calculator
 * Calculate tips, split bills, and get per-person costs
 */

import { useState } from "react";
import CalculatorCard from "../shared/components/CalculatorCard";
import InputField from "../shared/components/InputField";
import ResultDisplay from "../shared/components/ResultDisplay";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [numPeople, setNumPeople] = useState("1");

  const calculateResults = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = parseFloat(tipPercent) || 0;
    const people = parseInt(numPeople) || 1;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;

    return {
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      perPerson: perPerson.toFixed(2),
    };
  };

  const results = calculateResults();

  const quickTipButtons = [5, 10, 15, 18, 20, 25];

  return (
    <CalculatorCard
      title="Tip Calculator"
      icon="💵"
      gradient="from-emerald-500 to-teal-600"
    >
      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <InputField
            label="Bill Amount"
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="0.00"
            icon={<span>💰</span>}
            unit="$"
            min="0"
            step="0.01"
            required
          />

          <InputField
            label="Tip Percentage"
            type="number"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            placeholder="15"
            icon={<span>%</span>}
            unit="%"
            min="0"
            max="100"
            step="1"
            required
          />

          {/* Quick Tip Buttons */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Quick Select
            </label>
            <div className="grid grid-cols-3 gap-2">
              {quickTipButtons.map((percent) => (
                <button
                  key={percent}
                  onClick={() => setTipPercent(percent.toString())}
                  className={`
                    py-2 px-4 rounded-lg font-medium transition-all
                    ${
                      tipPercent === percent.toString()
                        ? "bg-emerald-500 text-white shadow-lg scale-105"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }
                  `}
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <InputField
            label="Number of People"
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            placeholder="1"
            icon={<span>👥</span>}
            min="1"
            step="1"
            required
          />

          {/* Info Card */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
              <span>💡</span> Tips Guide
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Poor service: 10-12%</li>
              <li>• Average service: 15-18%</li>
              <li>• Great service: 20-25%</li>
              <li>• Exceptional: 25%+</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <ResultDisplay
          label="Tip Amount"
          value={`$${results.tipAmount}`}
          icon="💸"
          gradient="from-emerald-400 to-teal-500"
        />

        <ResultDisplay
          label="Total Amount"
          value={`$${results.totalAmount}`}
          icon="🧾"
          gradient="from-blue-500 to-indigo-600"
        />

        <ResultDisplay
          label="Per Person"
          value={`$${results.perPerson}`}
          icon="👤"
          gradient="from-purple-500 to-pink-600"
          description={`Split among ${numPeople} ${
            parseInt(numPeople) === 1 ? "person" : "people"
          }`}
        />
      </div>

      {/* Breakdown Table */}
      {parseFloat(billAmount) > 0 && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Bill Breakdown
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                Original Bill
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${parseFloat(billAmount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                Tip ({tipPercent}%)
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                +${results.tipAmount}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg px-4 mt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl">${results.totalAmount}</span>
            </div>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
};

export default TipCalculator;
