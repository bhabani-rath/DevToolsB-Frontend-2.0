import React from "react";

const InputField = ({
  type = "text",
  name,
  id,
  label,
  icon,
  helper,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          className={`peer w-full p-3 mini:p-3.5 mobile:p-4 pt-5 mini:pt-5.5 mobile:pt-6 pl-9 mini:pl-10 mobile:pl-11 pr-3 mini:pr-4 
          bg-inherit border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-500 dark:border-gray-400 focus:border-gray-900 dark:focus:border-gray-300"
          }
          dark:bg-gray-900 text-gray-900 dark:text-white text-sm mini:text-base`}
          type={type}
          placeholder=""
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        />
        <label
          className={`absolute text-xs mini:text-sm mobile:text-base duration-150 transform -translate-y-3 top-4 mini:top-5 z-10 origin-[0] left-9 mini:left-10 mobile:left-11 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 mini:peer-focus:-translate-y-4 
            ${
              error
                ? "text-red-500 peer-focus:text-red-500"
                : "text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-300"
            }`}
          htmlFor={id}
        >
          {label}
        </label>
        {icon && (
          <div className="absolute top-5 mini:top-5.5 mobile:top-6 left-3 mini:left-3.5 mobile:left-4 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {helper && !error && (
        <label className="pt-1 block text-gray-500 dark:text-gray-400 text-xs mini:text-sm">
          {helper}
        </label>
      )}
      {error && (
        <label className="pt-1 block text-red-500 text-xs mini:text-sm">
          {error}
        </label>
      )}
    </div>
  );
};

export default InputField;
