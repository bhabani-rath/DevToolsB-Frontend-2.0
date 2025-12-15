/**
 * BMI Calculator
 * Calculate Body Mass Index with health status and ideal weight range
 */

import { useState } from "react";
import CalculatorCard from "../shared/components/CalculatorCard";
import InputField from "../shared/components/InputField";
import ResultDisplay from "../shared/components/ResultDisplay";

const BMICalculator = () => {
  const [system, setSystem] = useState("metric"); // 'metric' or 'imperial'
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const calculateBMI = () => {
    let bmi = 0;
    let weightKg = parseFloat(weight) || 0;
    let heightCm = parseFloat(height) || 0;

    if (system === "imperial") {
      // Convert lbs to kg and inches to cm
      weightKg = weightKg * 0.453592;
      heightCm = heightCm * 2.54;
    }

    const heightM = heightCm / 100;
    if (heightM > 0) {
      bmi = weightKg / (heightM * heightM);
    }

    return bmi.toFixed(1);
  };

  const getHealthStatus = (bmi) => {
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5)
      return {
        status: "Underweight",
        color: "from-blue-500 to-cyan-600",
        emoji: "⚠️",
      };
    if (bmiNum < 25)
      return {
        status: "Normal Weight",
        color: "from-green-500 to-emerald-600",
        emoji: "✅",
      };
    if (bmiNum < 30)
      return {
        status: "Overweight",
        color: "from-yellow-500 to-orange-600",
        emoji: "⚠️",
      };
    return { status: "Obese", color: "from-red-500 to-rose-600", emoji: "❗" };
  };

  const calculateIdealWeight = () => {
    const heightCm =
      system === "metric" ? parseFloat(height) : parseFloat(height) * 2.54;
    const heightM = heightCm / 100;

    // Using BMI 18.5-24.9 as healthy range
    const minWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxWeight = (24.9 * heightM * heightM).toFixed(1);

    if (system === "imperial") {
      return {
        min: (minWeight * 2.20462).toFixed(1),
        max: (maxWeight * 2.20462).toFixed(1),
        unit: "lbs",
      };
    }

    return { min: minWeight, max: maxWeight, unit: "kg" };
  };

  const bmi = calculateBMI();
  const healthStatus = getHealthStatus(bmi);
  const idealWeight = calculateIdealWeight();

  return (
    <CalculatorCard
      title="BMI Calculator"
      icon="⚖️"
      gradient="from-teal-500 to-cyan-600"
    >
      {/* Unit System Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-xl bg-gray-200 dark:bg-gray-700 p-1">
          <button
            onClick={() => setSystem("metric")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              system === "metric"
                ? "bg-white dark:bg-gray-800 shadow-lg text-teal-600 dark:text-teal-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => setSystem("imperial")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              system === "imperial"
                ? "bg-white dark:bg-gray-800 shadow-lg text-teal-600 dark:text-teal-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Imperial (lbs/in)
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <InputField
            label="Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="0"
            icon={<span>⚖️</span>}
            unit={system === "metric" ? "kg" : "lbs"}
            min="0"
            step="0.1"
            required
          />

          <InputField
            label="Height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="0"
            icon={<span>📏</span>}
            unit={system === "metric" ? "cm" : "in"}
            min="0"
            step="0.1"
            required
          />

          <InputField
            label="Age (Optional)"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="0"
            icon={<span>🎂</span>}
            unit="years"
            min="0"
            max="120"
          />

          {/* Gender Selection */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGender("male")}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  gender === "male"
                    ? "bg-teal-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                👨 Male
              </button>
              <button
                onClick={() => setGender("female")}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  gender === "female"
                    ? "bg-teal-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                👩 Female
              </button>
            </div>
          </div>
        </div>

        {/* BMI Visualization */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-teal-200 dark:border-teal-800 flex flex-col justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Your BMI
            </p>
            <div
              className={`text-6xl font-bold bg-gradient-to-r ${healthStatus.color} bg-clip-text text-transparent mb-2`}
            >
              {bmi}
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">{healthStatus.emoji}</span>
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {healthStatus.status}
              </span>
            </div>

            {/* BMI Scale */}
            <div className="mt-4">
              <div className="relative h-8 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"></div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ResultDisplay
          label="Your BMI"
          value={bmi}
          description={healthStatus.status}
          icon={healthStatus.emoji}
          gradient={healthStatus.color}
        />

        <ResultDisplay
          label="Ideal Weight Range"
          value={`${idealWeight.min}-${idealWeight.max}`}
          description={`${idealWeight.unit}`}
          icon="🎯"
          gradient="from-purple-500 to-indigo-600"
        />
      </div>

      {/* Information Card */}
      {parseFloat(bmi) > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            BMI Categories
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Underweight:</strong> BMI less than 18.5
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Normal weight:</strong> BMI 18.5 to 24.9
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Overweight:</strong> BMI 25 to 29.9
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-rose-600"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Obese:</strong> BMI 30 or greater
              </span>
            </div>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
};

export default BMICalculator;
