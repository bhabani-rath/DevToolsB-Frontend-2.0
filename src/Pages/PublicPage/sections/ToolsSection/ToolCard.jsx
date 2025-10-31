import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import React from "react";

const ToolCard = () => {
  return (
    <div
      className="w-full mini:max-w-[280px] mobile:max-w-[320px] mobile-large:max-w-[380px] phablet:max-w-sm tablet:max-w-md laptop:max-w-lg desktop:max-w-xl 
                    bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 
                    rounded-2xl mobile:rounded-3xl 
                    p-4 mobile:p-5 tablet:p-6 
                    shadow-lg hover:shadow-xl dark:shadow-purple-900/20 dark:hover:shadow-purple-900/40 
                    transition-all duration-300
                    border border-transparent dark:border-gray-700"
    >
      {/* Header Section */}
      <div className="flex items-center gap-2 mobile:gap-3 mb-3 mobile:mb-4">
        <img
          src=""
          alt="Tool Icon"
          className="w-10 h-10 mobile:w-12 mobile:h-12 tablet:w-14 tablet:h-14 
                     rounded-lg mobile:rounded-xl 
                     bg-white dark:bg-gray-700 
                     p-2 shadow-md dark:shadow-gray-900/50"
        />
        <div className="flex flex-col">
          <span className="text-[10px] mobile:text-xs text-gray-500 dark:text-gray-400 font-medium">
            Developed By
          </span>
          <span className="text-xs mobile:text-sm tablet:text-base font-semibold text-gray-800 dark:text-gray-100">
            @Bhabani07
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-4 mobile:mb-5 tablet:mb-6">
        <h2
          className="text-lg mobile:text-xl tablet:text-2xl laptop:text-3xl 
                       font-bold text-gray-900 dark:text-white 
                       mb-2 mobile:mb-3 
                       line-clamp-1"
        >
          toolname
        </h2>
        <p
          className="text-xs mobile:text-sm tablet:text-base 
                      text-gray-600 dark:text-gray-300 
                      leading-relaxed 
                      line-clamp-3 mobile:line-clamp-4 tablet:line-clamp-5"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
          cupiditate natus a dicta. Consequuntur, deserunt itaque tenetur
          explicabo, ipsum voluptatem atque excepturi voluptatum soluta esse
          asperiores tempore! Laboriosam sapiente voluptate commodi. Ducimus
          consectetur nemo vero, aspernatur illum laudantium sint rem!
        </p>
      </div>

      {/* Stats Section */}
      <div
        className="flex items-center justify-between cursor-pointer
                      mb-4 mobile:mb-5 tablet:mb-6 
                      bg-white dark:bg-gray-800/50 
                      rounded-xl mobile:rounded-2xl 
                      p-3 mobile:p-4 
                      shadow-sm dark:shadow-gray-900/30 
                      border border-gray-100 dark:border-gray-700"
      >
        <div className="flex flex-col items-center flex-1">
          <span
            className="text-base mobile:text-lg tablet:text-xl 
                          font-bold text-purple-600 dark:text-purple-400"
          >
            150+
          </span>
          <span
            className="text-[10px] mobile:text-xs tablet:text-sm 
                          text-gray-500 dark:text-gray-400 
                          font-medium mt-0.5"
          >
            Happy Users
          </span>
        </div>
        <div
          className="w-px h-8 mobile:h-10 tablet:h-12 
                        bg-gray-200 dark:bg-gray-700"
        ></div>
        <div className="flex flex-col items-center flex-1">
          <span
            className="text-base mobile:text-lg tablet:text-xl 
                          font-bold text-purple-600 dark:text-purple-400"
          >
            4.2⭐
          </span>
          <span
            className="text-[10px] mobile:text-xs tablet:text-sm 
                          text-gray-500 dark:text-gray-400 
                          font-medium mt-0.5"
          >
            Rating
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 
                        hover:from-purple-700 hover:to-blue-700 
                        dark:from-purple-500 dark:to-blue-500 
                        dark:hover:from-purple-600 dark:hover:to-blue-600 
                        text-white font-semibold 
                        py-2.5 mobile:py-3 tablet:py-3.5 
                        px-4 mobile:px-6 
                        text-sm mobile:text-base tablet:text-lg 
                        rounded-lg mobile:rounded-xl 
                        transition-all duration-300 
                        flex items-center justify-center gap-2 
                        shadow-md hover:shadow-lg 
                        dark:shadow-purple-900/30 dark:hover:shadow-purple-900/50 
                        active:scale-[0.98]"
      >
        Explore Now
        <span className="text-base mobile:text-lg tablet:text-xl">
          <BsFillArrowUpRightCircleFill />
        </span>
      </button>
    </div>
  );
};

export default ToolCard;
