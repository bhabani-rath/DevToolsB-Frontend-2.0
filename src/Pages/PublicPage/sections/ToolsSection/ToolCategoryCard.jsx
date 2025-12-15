/**
 * ToolCategoryCard Component
 * @description Card displaying tool category with stats and navigation
 * @param {string} posterImg - Category poster image URL
 * @param {string} sectionHeader - Category name
 * @param {string} descTool - Category description
 * @param {number} toolCount - Number of tools in category
 * @param {string} totalUser - User count display
 * @param {string} href - Navigation link
 * @author DevToolsB Team
 */

import { AiOutlineArrowUp } from "react-icons/ai";

const ToolCategoryCard = ({
  posterImg,
  sectionHeader,
  descTool,
  toolCount,
  totalUser,
  href,
}) => {
  return (
    <div
      className="w-full 
      mini:max-w-[280px] 
      mobile:max-w-[320px] 
      mobile-large:max-w-[360px]
      phablet:max-w-[400px]
      tablet:max-w-[340px]
      laptop:max-w-[380px]
      desktop:max-w-[400px]
      h-auto flex flex-col gap-3 mobile-large:gap-4
      bg-gradient-to-br from-white to-gray-50 
      dark:from-gray-800 dark:to-gray-900 
      rounded-lg mobile-large:rounded-xl 
      shadow-lg tablet:shadow-2xl
      hover:shadow-violet-500/30 dark:hover:shadow-violet-500/50 
      hover:scale-105 transition-all duration-300 overflow-hidden 
      border border-gray-200 dark:border-gray-700 
      hover:border-violet-400 dark:hover:border-violet-500"
    >
      {/* Poster Image */}
      <div className="w-full relative overflow-hidden group">
        <img
          src={posterImg}
          alt={sectionHeader}
          className="w-full 
          h-32 mini:h-36 mobile-large:h-40 tablet:h-44 laptop:h-48
          object-cover rounded-t-lg mobile-large:rounded-t-xl 
          group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div
        className="flex flex-col gap-2 mobile-large:gap-3 
      px-4 mobile:px-5 mobile-large:px-6"
      >
        <h2
          className="text-lg mobile:text-xl mobile-large:text-2xl 
        font-bold text-transparent 
        bg-gradient-to-r from-violet-600 via-pink-600 to-purple-600 
        dark:from-violet-400 dark:via-pink-500 dark:to-purple-500 
        bg-clip-text leading-tight"
        >
          {sectionHeader}
        </h2>
        <p
          className="text-gray-600 dark:text-slate-300 
        text-xs mobile:text-sm 
        leading-relaxed line-clamp-3"
        >
          {descTool}
        </p>
      </div>

      {/* Stats Section */}
      <div
        className="w-full flex justify-around items-center 
        gap-2 mobile-large:gap-4 
        px-4 mobile:px-5 mobile-large:px-6 
        py-3 mobile-large:py-4 
        bg-gray-100/80 dark:bg-gray-800/50 
        backdrop-blur-sm"
      >
        <div className="flex flex-col justify-center items-center">
          <span
            className="text-xl mobile:text-2xl 
          font-bold text-violet-600 dark:text-violet-400"
          >
            {toolCount}
          </span>
          <span
            className="text-[10px] mobile:text-xs 
          text-gray-500 dark:text-slate-400 text-center"
          >
            Tools Created
          </span>
        </div>
        <div
          className="h-10 mobile-large:h-12 
        w-px bg-gray-300 dark:bg-slate-600"
        ></div>
        <div className="flex flex-col justify-center items-center">
          <span
            className="text-xl mobile:text-2xl 
          font-bold text-pink-600 dark:text-pink-400"
          >
            {totalUser}
          </span>
          <span
            className="text-[10px] mobile:text-xs 
          text-gray-500 dark:text-slate-400 text-center"
          >
            Users
          </span>
        </div>
      </div>

      {/* Button Section */}
      <div
        className="px-4 mobile:px-5 mobile-large:px-6 
      pb-4 mobile-large:pb-6"
      >
        <a
          href={href}
          className="w-full flex items-center justify-center 
          gap-1.5 mobile-large:gap-2 
          bg-gradient-to-r from-violet-600 to-pink-600 
          hover:from-violet-700 hover:to-pink-700 
          text-white font-semibold 
          py-2.5 mobile:py-3 
          px-4 mobile-large:px-6 
          rounded-lg 
          shadow-lg hover:shadow-violet-500/50 
          transition-all duration-300 group
          text-sm mobile-large:text-base"
        >
          <span>Explore Now</span>
          <AiOutlineArrowUp className="text-base mobile-large:text-lg rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
};

export default ToolCategoryCard;
