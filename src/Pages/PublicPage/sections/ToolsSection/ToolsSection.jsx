// sections/ToolsSection/ToolsSection.jsx
import ToolCategoryCard from "./ToolCategoryCard";
import SectionHeader from "./../../../../Components/other/SectionHeader";
import { toolCategories } from "../../../../demoData/toolsData";

const ToolsSection = () => {
  return (
    <section
      id="tools"
      className="py-20 px-4 mobile:px-6 tablet:px-8 laptop:px-10 desktop:px-12 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <SectionHeader
          title="Tools We Offer"
          subtitle="Choose a category to explore our comprehensive tools"
        />

        <div className="w-full grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-4 gap-72 -ml-30">
          {toolCategories.map((category, index) => (
            <ToolCategoryCard
              key={index}
              posterImg={category.posterImg}
              sectionHeader={category.name}
              descTool={category.description}
              toolCount={category.toolsCreated}
              totalUser={category.totalUser}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
