// sections/ToolsSection/ToolsSection.jsx
import ToolCategoryCard from "./ToolCategoryCard";
import SectionHeader from "./../../../../Components/other/SectionHeader";

const toolCategories = [
  {
    id: "calculators",
    name: "Calculators",
    iconType: "calculator",
    icon: "🧮", // Fallback emoji if needed
    gradient: "from-blue-500 to-indigo-600",
    description: "Mathematical and financial calculations made easy",
    count: 15,
    features: [
      "Scientific Calculators",
      "Financial Tools",
      "Health & Fitness",
      "Date & Time",
    ],
  },
  {
    id: "converters",
    name: "Converters",
    iconType: "converter",
    icon: "🔄",
    gradient: "from-green-500 to-emerald-600",
    description: "Convert between different units and formats",
    count: 12,
    features: [
      "Unit Conversion",
      "Currency Exchange",
      "Color Formats",
      "Data Formats",
    ],
  },
  {
    id: "generators",
    name: "Generators",
    iconType: "generator",
    icon: "⚡",
    gradient: "from-pink-500 to-rose-600",
    description: "Generate passwords, codes, and unique identifiers",
    count: 10,
    features: [
      "Password Generator",
      "QR Code Creator",
      "UUID Generator",
      "Hash Generator",
    ],
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    iconType: "miscellaneous",
    icon: "🔧",
    gradient: "from-orange-500 to-red-600",
    description: "Additional utilities and helpful tools",
    count: 8,
    features: ["Text Tools", "Formatters", "Validators", "Utilities"],
  },
];

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
          title="Developer Tools"
          subtitle="Choose a category to explore our comprehensive toolkit"
        />

        <div className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-4 gap-6">
          {toolCategories.map((category, index) => (
            <ToolCategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
