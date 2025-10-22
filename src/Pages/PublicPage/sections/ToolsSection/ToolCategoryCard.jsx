import { AiOutlineArrowUp } from "react-icons/ai";

const ToolCategoryCard = ({
  posterImg,
  sectionHeader,
  descTool,
  toolCount,
  totalUser,
  categoryId,
}) => {
  return (
    <div className="w-80 h-auto flex flex-col gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300 overflow-hidden border border-slate-700 hover:border-violet-500">
      {/* Poster Image */}
      <div className="w-full relative overflow-hidden group">
        <img
          src={posterImg}
          alt={sectionHeader}
          className="w-full h-40 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-3 px-6">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-violet-400 via-pink-500 to-purple-600 bg-clip-text">
          {sectionHeader}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">{descTool}</p>
      </div>

      {/* Stats Section */}
      <div className="w-full flex justify-around items-center gap-4 px-6 py-4 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xl font-bold text-violet-400">
            {toolCount}
          </span>
          <span className="text-xs text-slate-400">Tools Created</span>
        </div>
        <div className="h-12 w-px bg-slate-600"></div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xl font-bold text-pink-400">{totalUser}</span>
          <span className="text-xs text-slate-400">Users</span>
        </div>
      </div>

      {/* Button Section */}
      <div className="px-6 pb-6">
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-violet-500/50 transition-all duration-300 group">
          <span>Explore Now</span>
          <AiOutlineArrowUp className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default ToolCategoryCard;
