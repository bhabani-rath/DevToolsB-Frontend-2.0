/**
 * Percentage Calculator
 * Multiple calculation modes for percentage operations
 */

import { useState } from "react";
import CalculatorCard from "../shared/components/CalculatorCard";
import InputField from "../shared/components/InputField";
import ResultDisplay from "../shared/components/ResultDisplay";

const PercentageCalculator = () => {
  const [mode, setMode] = useState("what_is"); // what_is, is_what, increase, decrease
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const calculateResult = () => {
    const num1 = parseFloat(value1) || 0;
    const num2 = parseFloat(value2) || 0;

    switch (mode) {
      case "what_is": // What is X% of Y?
        return ((num1 / 100) * num2).toFixed(2);

      case "is_what": // X is what % of Y?
        return num2 !== 0 ? ((num1 / num2) * 100).toFixed(2) : "0";

      case "increase": // What is the % increase from X to Y?
        return num1 !== 0 ? (((num2 - num1) / num1) * 100).toFixed(2) : "0";

      case "decrease": // What is the % decrease from X to Y?
        return num1 !== 0 ? (((num1 - num2) / num1) * 100).toFixed(2) : "0";

      default:
        return "0";
    }
  };

  const result = calculateResult();

  const modeConfigs = {
    what_is: {
      title: "What is X% of Y?",
      label1: "Percentage (%)",
      label2: "Of Value",
      resultLabel: "Result",
      formula: `(${value1} / 100) × ${value2} = ${result}`,
      icon: "💯",
      gradient: "from-blue-500 to-cyan-600",
    },
    is_what: {
      title: "X is what % of Y?",
      label1: "Value (X)",
      label2: "Of Value (Y)",
      resultLabel: "Percentage",
      formula: `(${value1} / ${value2}) × 100 = ${result}%`,
      icon: "📊",
      gradient: "from-purple-500 to-pink-600",
    },
    increase: {
      title: "% Increase from X to Y",
      label1: "Original Value",
      label2: "New Value",
      resultLabel: "Percentage Increase",
      formula: `((${value2} - ${value1}) / ${value1}) × 100 = ${result}%`,
      icon: "📈",
      gradient: "from-green-500 to-emerald-600",
    },
    decrease: {
      title: "% Decrease from X to Y",
      label1: "Original Value",
      label2: "New Value",
      resultLabel: "Percentage Decrease",
      formula: `((${value1} - ${value2}) / ${value1}) × 100 = ${result}%`,
      icon: "📉",
      gradient: "from-red-500 to-rose-600",
    },
  };

  const config = modeConfigs[mode];

  return (
    <CalculatorCard
      title="Percentage Calculator"
      icon="💯"
      gradient="from-cyan-500 to-blue-600"
    >
      {/* Mode Selection */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {Object.entries(modeConfigs).map(([key, { title, icon, gradient }]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`
              p-4 rounded-xl font-medium transition-all
              ${
                mode === key
                  ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-105`
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-sm">{title}</div>
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <InputField
            label={config.label1}
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="0"
            icon={<span>🔢</span>}
            step="any"
            required
          />

          <InputField
            label={config.label2}
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="0"
            icon={<span>🔢</span>}
            step="any"
            required
          />
        </div>

        <div>
          {/* Result Preview */}
          <div
            className={`bg-gradient-to-br ${config.gradient} rounded-xl p-6 text-white h-full flex flex-col justify-center`}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">{config.icon}</div>
              <p className="text-sm opacity-90 mb-2">{config.resultLabel}</p>
              <div className="text-5xl font-bold mb-4">
                {result}
                {mode !== "what_is" && "%"}
              </div>
              {parseFloat(value1) > 0 && parseFloat(value2) > 0 && (
                <div className="text-xs opacity-75 bg-white/20 rounded-lg p-2">
                  {config.formula}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Result */}
      <ResultDisplay
        label={config.resultLabel}
        value={`${result}${mode !== "what_is" ? "%" : ""}`}
        icon={config.icon}
        gradient={config.gradient}
        description={config.title}
      />

      {/* Examples */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
          <span>💡</span> Quick Examples
        </h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-700 dark:text-blue-300">
          <div>• What is 20% of 100? = 20</div>
          <div>• 25 is what % of 200? = 12.5%</div>
          <div>• % increase from 50 to 75 = 50%</div>
          <div>• % decrease from 100 to 75 = 25%</div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default PercentageCalculator;
