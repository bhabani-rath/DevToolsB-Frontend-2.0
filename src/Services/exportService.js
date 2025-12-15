/**
 * Export Service for DevToolsB Admin Dashboard
 *
 * Provides utilities to export data in CSV and JSON formats
 * with automatic file download functionality.
 */

// Mock data imports - these match the data structures in admin components
// In a real app, this would fetch from an API

const usersData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "Developer",
    status: "active",
    joinDate: "Dec 1, 2024",
    tools: 12,
    bio: "Full-stack developer with 5 years of experience in web technologies.",
    phone: "+1 234 567 890",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    role: "Admin",
    status: "active",
    joinDate: "Nov 15, 2024",
    tools: 8,
    bio: "Platform administrator and DevOps specialist.",
    phone: "+1 345 678 901",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@email.com",
    role: "Developer",
    status: "pending",
    joinDate: "Dec 5, 2024",
    tools: 3,
    bio: "Frontend specialist focused on React and Vue.js applications.",
    phone: "+1 456 789 012",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.w@email.com",
    role: "User",
    status: "inactive",
    joinDate: "Oct 20, 2024",
    tools: 0,
    bio: "New to the platform, exploring developer tools.",
    phone: "+1 567 890 123",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    role: "Developer",
    status: "active",
    joinDate: "Nov 28, 2024",
    tools: 15,
    bio: "Backend engineer specializing in Node.js and Python.",
    phone: "+1 678 901 234",
  },
];

const developersData = [
  {
    id: 1,
    name: "Alex Rodriguez",
    username: "@alexdev",
    bio: "Full-stack developer passionate about creating tools that make developers' lives easier.",
    tools: 24,
    stars: 1847,
    followers: 523,
    verified: true,
    github: "alexdev",
    linkedin: "alexrodriguez",
    email: "alex.r@email.com",
    location: "San Francisco, CA",
    website: "https://alexdev.io",
  },
  {
    id: 2,
    name: "Priya Sharma",
    username: "@priyacodes",
    bio: "Frontend specialist with expertise in React and TypeScript tooling.",
    tools: 18,
    stars: 2341,
    followers: 712,
    verified: true,
    github: "priyacodes",
    linkedin: "priyasharma",
    email: "priya.s@email.com",
    location: "Mumbai, India",
    website: "https://priyacodes.dev",
  },
  {
    id: 3,
    name: "David Kim",
    username: "@davidbuilds",
    bio: "Backend engineer focused on API development and testing tools.",
    tools: 31,
    stars: 3102,
    followers: 891,
    verified: true,
    github: "davidbuilds",
    linkedin: "davidkim",
    email: "david.k@email.com",
    location: "Seoul, South Korea",
    website: "https://davidbuilds.io",
  },
  {
    id: 4,
    name: "Emma Thompson",
    username: "@emmadev",
    bio: "DevOps enthusiast creating automation and deployment tools.",
    tools: 15,
    stars: 987,
    followers: 345,
    verified: false,
    github: "emmadev",
    linkedin: "emmathompson",
    email: "emma.t@email.com",
    location: "London, UK",
    website: "https://emmadev.co.uk",
  },
];

const toolsData = [
  {
    id: 1,
    name: "JSON Formatter Pro",
    description:
      "Advanced JSON formatter with syntax highlighting and validation",
    category: "Formatters",
    author: "Alex Rodriguez",
    rating: 4.9,
    downloads: 45230,
    status: "published",
    version: "2.1.0",
    lastUpdated: "Dec 10, 2024",
  },
  {
    id: 2,
    name: "Regex Tester",
    description: "Real-time regex pattern testing with explanation",
    category: "Testing",
    author: "Priya Sharma",
    rating: 4.7,
    downloads: 32100,
    status: "published",
    version: "1.5.2",
    lastUpdated: "Dec 8, 2024",
  },
  {
    id: 3,
    name: "Color Palette Generator",
    description: "AI-powered color scheme generator for designers",
    category: "Design",
    author: "David Kim",
    rating: 4.8,
    downloads: 28450,
    status: "published",
    version: "3.0.0",
    lastUpdated: "Dec 5, 2024",
  },
  {
    id: 4,
    name: "API Playground",
    description: "Test and debug REST APIs with ease",
    category: "API",
    author: "Emma Thompson",
    rating: 4.6,
    downloads: 19870,
    status: "pending",
    version: "1.0.0",
    lastUpdated: "Dec 12, 2024",
  },
  {
    id: 5,
    name: "Code Minifier",
    description: "Minify JavaScript, CSS, and HTML files",
    category: "Optimization",
    author: "Alex Rodriguez",
    rating: 4.5,
    downloads: 15240,
    status: "published",
    version: "2.0.1",
    lastUpdated: "Nov 28, 2024",
  },
  {
    id: 6,
    name: "Markdown Editor",
    description: "Live preview markdown editor with export options",
    category: "Editors",
    author: "Priya Sharma",
    rating: 4.8,
    downloads: 22100,
    status: "published",
    version: "1.8.0",
    lastUpdated: "Dec 1, 2024",
  },
];

const ratingsData = [
  {
    id: 1,
    user: "Jennifer Martinez",
    tool: "JSON Formatter Pro",
    rating: 5,
    comment:
      "Absolutely fantastic tool! Has saved me hours of work. The syntax highlighting is incredibly helpful.",
    date: "Dec 5, 2024",
    helpful: 24,
    status: "approved",
  },
  {
    id: 2,
    user: "Robert Chang",
    tool: "Regex Tester",
    rating: 4,
    comment:
      "Great regex testing tool. Would love to see more examples in the documentation.",
    date: "Dec 4, 2024",
    helpful: 18,
    status: "approved",
  },
  {
    id: 3,
    user: "Amanda Foster",
    tool: "Color Palette Generator",
    rating: 5,
    comment:
      "The AI suggestions are spot on! This tool has become essential for my design workflow.",
    date: "Dec 3, 2024",
    helpful: 31,
    status: "approved",
  },
  {
    id: 4,
    user: "Thomas Wright",
    tool: "Code Minifier",
    rating: 3,
    comment:
      "Works well for basic use cases, but struggles with complex JavaScript modules.",
    date: "Dec 2, 2024",
    helpful: 12,
    status: "pending",
  },
  {
    id: 5,
    user: "Sarah Lee",
    tool: "Markdown Editor",
    rating: 5,
    comment:
      "Best markdown editor I've used! The live preview is seamless and export options are great.",
    date: "Dec 1, 2024",
    helpful: 45,
    status: "approved",
  },
];

/**
 * Get data based on export type
 */
const getDataByType = (exportType) => {
  switch (exportType) {
    case "users":
      return { users: usersData };
    case "developers":
      return { developers: developersData };
    case "tools":
      return { tools: toolsData };
    case "ratings":
      return { ratings: ratingsData };
    case "all":
    default:
      return {
        users: usersData,
        developers: developersData,
        tools: toolsData,
        ratings: ratingsData,
      };
  }
};

/**
 * Escape CSV field value
 * Handles commas, quotes, and newlines
 */
const escapeCSVField = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  // If contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

/**
 * Convert array of objects to CSV string
 */
const arrayToCSV = (data, headers = null) => {
  if (!data || data.length === 0) {
    return "";
  }

  // Use provided headers or extract from first object
  const csvHeaders = headers || Object.keys(data[0]);

  // Build header row
  const headerRow = csvHeaders.map(escapeCSVField).join(",");

  // Build data rows
  const dataRows = data.map((item) => {
    return csvHeaders.map((header) => escapeCSVField(item[header])).join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};

/**
 * Convert export data to CSV format
 */
const convertToCSV = (exportType) => {
  const data = getDataByType(exportType);

  if (exportType === "all") {
    // For "all", create separate sections with headers
    let csv = "";

    if (data.users?.length) {
      csv += "=== USERS ===\n";
      csv += arrayToCSV(data.users) + "\n\n";
    }

    if (data.developers?.length) {
      csv += "=== DEVELOPERS ===\n";
      csv += arrayToCSV(data.developers) + "\n\n";
    }

    if (data.tools?.length) {
      csv += "=== TOOLS ===\n";
      csv += arrayToCSV(data.tools) + "\n\n";
    }

    if (data.ratings?.length) {
      csv += "=== RATINGS ===\n";
      csv += arrayToCSV(data.ratings) + "\n";
    }

    return csv;
  }

  // Single type export
  const dataArray = Object.values(data)[0];
  return arrayToCSV(dataArray);
};

/**
 * Convert export data to JSON format
 */
const convertToJSON = (exportType) => {
  const data = getDataByType(exportType);
  return JSON.stringify(data, null, 2);
};

/**
 * Trigger file download in browser
 */
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up blob URL
  URL.revokeObjectURL(url);
};

/**
 * Get formatted date string for filename
 */
const getDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Export data to file
 * @param {string} exportType - "all", "users", "developers", "tools", or "ratings"
 * @param {string} format - "csv" or "json"
 * @returns {Promise<{success: boolean, filename: string}>}
 */
export const exportData = async (exportType, format) => {
  try {
    const dateStr = getDateString();
    let content, filename, mimeType;

    if (format === "csv") {
      content = convertToCSV(exportType);
      filename = `devtoolsb_${exportType}_${dateStr}.csv`;
      mimeType = "text/csv;charset=utf-8;";
    } else if (format === "json") {
      content = convertToJSON(exportType);
      filename = `devtoolsb_${exportType}_${dateStr}.json`;
      mimeType = "application/json;charset=utf-8;";
    } else {
      throw new Error(`Unsupported format: ${format}`);
    }

    downloadFile(content, filename, mimeType);

    return { success: true, filename };
  } catch (error) {
    console.error("Export error:", error);
    throw error;
  }
};

export default {
  exportData,
};
