/**
 * InputField - Standardized input component for calculators
 * Features: validation, error states, icons, and unit selectors
 */

const InputField = ({
  label,
  type = "number",
  value,
  onChange,
  placeholder = "",
  icon = null,
  unit = "",
  error = "",
  min,
  max,
  step = "any",
  required = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`
            w-full
            ${icon ? "pl-10" : "pl-4"}
            ${unit ? "pr-16" : "pr-4"}
            py-3
            rounded-xl
            border-2
            ${
              error
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            }
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
            focus:ring-2
            ${error ? "focus:ring-red-500/20" : "focus:ring-blue-500/20"}
            transition-all
            duration-200
          `}
        />

        {/* Unit */}
        {unit && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
            {unit}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
