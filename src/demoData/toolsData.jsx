/**
 * Tools Data - Complete Tools Catalog
 *
 * @description Comprehensive catalog of all available tools organized by categories.
 * Includes tool metadata, features, and visual styling information.
 *
 * @module toolsData
 * @author DevToolsB Team
 * @version 1.0.0
 */

/**
 * Tool Categories
 * High-level categorization of tools with overview information
 *
 * @property {string} id - Category identifier
 * @property {string} name - Category display name
 * @property {number} toolsCreated - Number of tools in category
 * @property {string} totalUser - User count display string
 * @property {string} posterImg - Category poster image URL
 * @property {string} dpImg - Category display picture URL
 * @property {string} description - Category description
 * @property {string} href - Navigation link
 */
export const toolCategories = [
  {
    id: "calculator",
    name: "Calculators",
    toolsCreated: 21,
    totalUser: "150k+",
    posterImg:
      "https://res.cloudinary.com/dva4r5mad/image/upload/Calc-Tool-Main-Area-Card-Logo_s54bhl.jpg",
    dpImg:
      "https://res.cloudinary.com/dva4r5mad/image/upload/everydayCalcLogo_mu1ffq.webp",
    description: "Mathematical and financial calculations made easy",
    href: "/tools?category=calculator",
  },
  {
    id: "converter",
    name: "Converters",
    toolsCreated: 20,
    totalUser: "150k+",
    posterImg:
      "https://res.cloudinary.com/dva4r5mad/image/upload/I_WANT_A_RUBEL_TO_BE_RUPEE_syu65p.png",
    dpImg:
      "https://res.cloudinary.com/dva4r5mad/image/upload/Your_paragraph_text_zcqwae.png",
    description: "Convert between different units,formats and much more",
    href: "/tools?category=converter",
  },
  {
    id: "generator",
    name: "Generators",
    toolsCreated: 20,
    totalUser: "150k+",
    posterImg:
      "https://res.cloudinary.com/dva4r5mad/image/upload/BE_THE_GENERATOR_OF_SUCCESS_hxcxay.png",
    dpImg:
      "https://res.cloudinary.com/dva4r5mad/image/upload/ChatGPT_Image_Oct_20_2025_07_32_19_PM_gchdzh.png",
    description: "Generate passwords, codes, and unique identifiers",
    href: "/tools?category=generator",
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    toolsCreated: 20,
    totalUser: "150k+",
    posterImg:
      "https://res.cloudinary.com/dva4r5mad/image/upload/LET_S_DO_SOME_MISCELLANEOUS_rsxtso.png",
    dpImg:
      "https://res.cloudinary.com/dva4r5mad/image/upload/Add_the_text__MISCEL_pzoltc.png",
    description: "Additional utilities and helpful tools for additional use",
    href: "/tools?category=miscellaneous",
  },
];

/**
 * Individual Tools Data
 * Detailed information for each tool in the platform
 *
 * @property {number} id - Unique tool identifier
 * @property {string} name - Tool name
 * @property {string} slug - URL-friendly identifier
 * @property {string} description - Tool description
 * @property {string} icon - Emoji icon
 * @property {string} category - Category ID
 * @property {string} categoryName - Category display name
 * @property {string} categoryColor - Tailwind gradient for category
 * @property {string} gradient - Tool-specific gradient
 * @property {array} features - List of tool features
 * @property {boolean} isPopular - Popular tool flag
 */
export const toolsData = [
  // Calculators
  {
    id: 1,
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    description: "Advanced mathematical calculations",
    icon: "🧮",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-blue-400 to-indigo-600",
    features: [
      "Trigonometric functions",
      "Logarithms",
      "Complex numbers",
      "History",
    ],
    isPopular: true,
  },
  {
    id: 2,
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Calculate percentages quickly",
    icon: "💯",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-cyan-400 to-blue-600",
    features: [
      "Percentage of",
      "Percentage change",
      "Increase/Decrease",
      "Comparison",
    ],
    isPopular: true,
  },
  {
    id: 3,
    name: "BMI Calculator",
    slug: "bmi-calculator",
    description: "Calculate Body Mass Index",
    icon: "⚖️",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-teal-400 to-cyan-600",
    features: [
      "Metric & Imperial",
      "Health status",
      "Ideal weight",
      "BMI chart",
    ],
    isPopular: false,
  },
  {
    id: 4,
    name: "Loan Calculator",
    slug: "loan-calculator",
    description: "Calculate loan payments and interest",
    icon: "💰",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-green-400 to-emerald-600",
    features: [
      "EMI calculation",
      "Interest rates",
      "Amortization schedule",
      "Prepayment",
    ],
    isPopular: true,
  },
  {
    id: 5,
    name: "Age Calculator",
    slug: "age-calculator",
    description: "Calculate exact age and time differences",
    icon: "📅",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-purple-400 to-indigo-600",
    features: [
      "Years, months, days",
      "Next birthday",
      "Age difference",
      "Zodiac sign",
    ],
    isPopular: false,
  },
  {
    id: 16,
    name: "Tip Calculator",
    slug: "tip-calculator",
    description: "Calculate tips and split bills",
    icon: "💵",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-emerald-400 to-teal-600",
    features: [
      "Custom tip %",
      "Bill splitting",
      "Per person cost",
      "Total with tip",
    ],
    isPopular: true,
  },
  {
    id: 17,
    name: "Discount Calculator",
    slug: "discount-calculator",
    description: "Calculate discounts and savings",
    icon: "🏷️",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-pink-400 to-rose-600",
    features: [
      "Percentage off",
      "Final price",
      "Savings amount",
      "Multiple discounts",
    ],
    isPopular: true,
  },
  {
    id: 18,
    name: "GST Calculator",
    slug: "gst-calculator",
    description: "Calculate GST/Tax amounts",
    icon: "🧾",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-amber-400 to-yellow-600",
    features: [
      "Add/Remove GST",
      "Multiple tax rates",
      "Tax breakdown",
      "Export invoice",
    ],
    isPopular: false,
  },
  {
    id: 19,
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "Calculate compound interest growth",
    icon: "📈",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-green-400 to-lime-600",
    features: [
      "Annual/Monthly compounding",
      "Additional contributions",
      "Interest earnings chart",
      "Future value",
    ],
    isPopular: true,
  },
  {
    id: 20,
    name: "Date Calculator",
    slug: "date-calculator",
    description: "Calculate date differences and add/subtract days",
    icon: "📆",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-violet-400 to-purple-600",
    features: [
      "Date difference",
      "Add/Subtract days",
      "Business days",
      "Weekday counter",
    ],
    isPopular: false,
  },
  {
    id: 21,
    name: "Time Calculator",
    slug: "time-calculator",
    description: "Calculate time differences and conversions",
    icon: "⏰",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-sky-400 to-blue-600",
    features: [
      "Time difference",
      "Add/Subtract time",
      "Time zone conversion",
      "Decimal hours",
    ],
    isPopular: false,
  },
  {
    id: 22,
    name: "Grade Calculator",
    slug: "grade-calculator",
    description: "Calculate grades and GPA",
    icon: "🎓",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-indigo-400 to-blue-600",
    features: [
      "Weighted grades",
      "GPA calculation",
      "Letter grades",
      "Pass/Fail prediction",
    ],
    isPopular: false,
  },
  {
    id: 23,
    name: "Fuel Cost Calculator",
    slug: "fuel-cost-calculator",
    description: "Calculate fuel consumption and costs",
    icon: "⛽",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-orange-400 to-red-600",
    features: [
      "MPG/KPL calculation",
      "Trip cost",
      "Fuel efficiency",
      "Cost comparison",
    ],
    isPopular: false,
  },
  {
    id: 24,
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    description: "Calculate home mortgage payments",
    icon: "🏠",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-cyan-400 to-blue-600",
    features: [
      "Monthly payment",
      "Total interest",
      "Amortization schedule",
      "Extra payments",
    ],
    isPopular: true,
  },
  {
    id: 25,
    name: "Investment Calculator",
    slug: "investment-calculator",
    description: "Calculate investment returns and ROI",
    icon: "💹",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-blue-400 to-indigo-600",
    features: [
      "ROI calculation",
      "Future value",
      "Growth projection",
      "Return breakdown",
    ],
    isPopular: true,
  },
  {
    id: 26,
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    description: "Calculate daily calorie needs",
    icon: "🍎",
    category: "calculator",
    categoryName: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    gradient: "from-red-400 to-pink-600",
    features: [
      "BMR calculation",
      "TDEE",
      "Macro breakdown",
      "Weight goal planning",
    ],
    isPopular: false,
  },

  // Converters
  {
    id: 6,
    name: "Unit Converter",
    slug: "unit-converter",
    description: "Convert between various units",
    icon: "📏",
    category: "converter",
    categoryName: "Converter",
    categoryColor: "from-green-400 to-green-600",
    gradient: "from-orange-400 to-red-600",
    features: ["Length", "Weight", "Temperature", "Volume"],
    isPopular: true,
  },
  {
    id: 7,
    name: "Currency Converter",
    slug: "currency-converter",
    description: "Real-time currency exchange rates",
    icon: "💱",
    category: "converter",
    categoryName: "Converter",
    categoryColor: "from-green-400 to-green-600",
    gradient: "from-yellow-400 to-orange-600",
    features: ["Live rates", "150+ currencies", "Historical data", "Favorites"],
    isPopular: true,
  },
  {
    id: 8,
    name: "Base64 Converter",
    slug: "base64-converter",
    description: "Encode and decode Base64",
    icon: "🔐",
    category: "converter",
    categoryName: "Converter",
    categoryColor: "from-green-400 to-green-600",
    gradient: "from-gray-400 to-gray-600",
    features: ["Text to Base64", "Base64 to text", "File support", "URL safe"],
    isPopular: false,
  },
  {
    id: 9,
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert between color formats",
    icon: "🎨",
    category: "converter",
    categoryName: "Converter",
    categoryColor: "from-green-400 to-green-600",
    gradient: "from-pink-400 to-purple-600",
    features: [
      "HEX to RGB",
      "HSL support",
      "Color picker",
      "Palette generator",
    ],
    isPopular: true,
  },
  {
    id: 10,
    name: "JSON to CSV",
    slug: "json-csv-converter",
    description: "Convert JSON to CSV and vice versa",
    icon: "📊",
    category: "converter",
    categoryName: "Converter",
    categoryColor: "from-green-400 to-green-600",
    gradient: "from-blue-400 to-teal-600",
    features: ["Nested JSON", "Custom delimiter", "Preview", "Download"],
    isPopular: false,
  },

  // Generators
  {
    id: 11,
    name: "Password Generator",
    slug: "password-generator",
    description: "Create strong, secure passwords",
    icon: "🔒",
    category: "generator",
    categoryName: "Generator",
    categoryColor: "from-purple-400 to-purple-600",
    gradient: "from-indigo-400 to-purple-600",
    features: [
      "Custom length",
      "Character sets",
      "Strength meter",
      "Bulk generate",
    ],
    isPopular: true,
  },
  {
    id: 12,
    name: "QR Code Generator",
    slug: "qr-code-generator",
    description: "Generate QR codes for any data",
    icon: "📱",
    category: "generator",
    categoryName: "Generator",
    categoryColor: "from-purple-400 to-purple-600",
    gradient: "from-purple-400 to-pink-600",
    features: [
      "Text, URL, WiFi",
      "Custom colors",
      "Logo embed",
      "Download PNG/SVG",
    ],
    isPopular: true,
  },
  {
    id: 13,
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description: "Generate placeholder text",
    icon: "📝",
    category: "generator",
    categoryName: "Generator",
    categoryColor: "from-purple-400 to-purple-600",
    gradient: "from-gray-400 to-gray-600",
    features: [
      "Words/Paragraphs",
      "HTML tags",
      "Custom length",
      "Copy to clipboard",
    ],
    isPopular: false,
  },
  {
    id: 14,
    name: "UUID Generator",
    slug: "uuid-generator",
    description: "Generate unique identifiers",
    icon: "🆔",
    category: "generator",
    categoryName: "Generator",
    categoryColor: "from-purple-400 to-purple-600",
    gradient: "from-cyan-400 to-blue-600",
    features: ["UUID v4", "Bulk generate", "Custom format", "Validation"],
    isPopular: false,
  },
  {
    id: 15,
    name: "Hash Generator",
    slug: "hash-generator",
    description: "Generate various hash types",
    icon: "#️⃣",
    category: "generator",
    categoryName: "Generator",
    categoryColor: "from-purple-400 to-purple-600",
    gradient: "from-red-400 to-orange-600",
    features: [
      "MD5, SHA-256",
      "HMAC support",
      "File hashing",
      "Compare hashes",
    ],
    isPopular: true,
  },
];
