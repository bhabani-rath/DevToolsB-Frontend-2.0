/**
 * ResultDisplay - Result card component with copy-to-clipboard functionality
 */

import { useState } from "react";

const ResultDisplay = ({
  label,
  value,
  description = "",
  gradient = "from-blue-500 to-purple-600",
  icon = "📊",
  copyable = true,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`
      relative
      bg-gradient-to-br ${gradient}
      rounded-2xl
      p-6
      shadow-lg
      text-white
      ${className}
    `}
    >
      {/* Icon */}
      <div className="text-4xl mb-2">{icon}</div>

      {/* Label */}
      <h3 className="text-sm font-medium opacity-90 mb-1">{label}</h3>

      {/* Value */}
      <div className="text-4xl md:text-5xl font-bold mb-2 break-words">
        {value}
      </div>

      {/* Description */}
      {description && <p className="text-sm opacity-80">{description}</p>}

      {/* Copy Button */}
      {copyable && (
        <button
          onClick={handleCopy}
          className="
            absolute top-4 right-4
            bg-white/20 hover:bg-white/30
            backdrop-blur-sm
            rounded-lg
            px-3 py-2
            text-sm font-medium
            transition-all
            duration-200
            flex items-center gap-2
          "
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ResultDisplay;
