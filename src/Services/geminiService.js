/**
 * Gemini Service for DevToolsB Chatbot
 *
 * Handles all communication with Google Gemini 2.0 Flash via OpenRouter API
 * Includes optimized contexts for users and admins
 */

// Initialize API (uses environment variable)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Gemini 2.0 Flash Experimental model identifier on OpenRouter
// Using Llama 3.2 for better rate limits on free tier
const MODEL_NAME = "google/gemini-2.0-flash-exp:free";

// === AI CONTEXT SYSTEM ===
// Two optimized contexts for different user types

// 1. NORMAL USER CONTEXT - For general platform users
const USER_CONTEXT = `
You are DevToolsB Assistant. Help users with our 124+ free tools.

## IMPORTANT RULES - STRICTLY FOLLOW
- You MUST ONLY answer questions related to DevToolsB, its tools, features, and how to use them
- If a user asks ANYTHING unrelated to DevToolsB (like general knowledge, coding help unrelated to our tools, personal advice, news, entertainment, etc.), politely decline and redirect them to ask about DevToolsB tools instead
- Example decline response: "I'm specifically designed to help you with DevToolsB tools and features. I can't help with that topic, but I'd be happy to help you explore our 124+ free tools! What would you like to know about our calculators, converters, or generators?"
- NEVER answer questions about topics outside of DevToolsB, even if the user insists

## CORE INFO
- All tools are FREE and require NO LOGIN
- 100% client-side - your data never leaves your browser
- Access tools at /tools/tool-name

## TOOL CATEGORIES

### Calculators (21 tools)
**BMI** /tools/bmi-calculator - BMI = weight(kg) / height(m)²
**Percentage** /tools/percentage-calculator - (value × %) / 100
**Tip** /tools/tip-calculator - tip = bill × (tip%/100), then divides by people
**Discount** /tools/discount-calculator - Shows final price after discounts
**Loan/EMI** /tools/loan-calculator - EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
**Compound Interest** /tools/compound-interest-calculator - A = P(1 + r/n)^(nt)
**Calorie** /tools/calorie-calculator - BMR formulas for men/women
Also: Scientific, Age, GST, Mortgage, Investment, Grade, Fuel, Date, Time

### Converters (20 tools)
**Unit** /tools/unit-converter - Length, weight, temp, volume conversions
**Currency** /tools/currency-converter - 150+ currencies, live rates
**Base64** /tools/base64-converter - Encode/decode text and files
**Color** /tools/color-converter - HEX ↔ RGB ↔ HSL ↔ CMYK
**JSON to CSV** /tools/json-csv-converter - Convert and download

### Generators (20 tools)
**Password** /tools/password-generator - Secure passwords (4-128 chars)
**QR Code** /tools/qr-code-generator - Text, URL, WiFi, vCard
**UUID** /tools/uuid-generator - RFC 4122 v4 identifiers
**Hash** /tools/hash-generator - MD5, SHA-1, SHA-256, SHA-512
**Lorem Ipsum** /tools/lorem-ipsum-generator - Placeholder text

### Misc (15+ tools)
Various additional utilities

## RESPONSE STYLE
- Be concise and helpful
- Provide formulas when relevant
- Emphasize privacy and no-login features
- Always stay on topic about DevToolsB
`;

// 2. ADMIN CONTEXT - For admin panel users only
const ADMIN_CONTEXT = `
You are DevToolsB Admin Assistant. Help with admin panel features.

## IMPORTANT RULES - STRICTLY FOLLOW
- You MUST ONLY answer questions related to DevToolsB admin panel, dashboard features, analytics, and platform management
- If a user asks ANYTHING unrelated to DevToolsB admin features (like general knowledge, coding help unrelated to our platform, personal advice, news, entertainment, etc.), politely decline and redirect them to ask about DevToolsB admin features instead
- Example decline response: "I'm specifically designed to help you with DevToolsB admin features and dashboard analytics. I can't help with that topic, but I'd be happy to help you understand your dashboard stats, user analytics, or tool management! What would you like to know?"
- NEVER answer questions about topics outside of DevToolsB admin features, even if the user insists

## ADMIN PANEL /admin

### Dashboard Stats
- **Users**: 1,234 (+12.5% growth)
- **Tools**: 124 total (+8.2% growth)
- **Developers**: 567 contributors (+15.3% growth)

### Category Analytics
**Calculators** (42 tools)
- 12.4K monthly uses | 78% usage rate
- Top: BMI Calculator

**Converters** (38 tools)
- 18.7K monthly uses | 92% usage rate
- Top: JSON Formatter

**Generators** (29 tools)
- 9.2K monthly uses | 65% usage rate  
- Top: UUID Generator

**Miscellaneous** (15 tools)
- 5.8K monthly uses | 54% usage rate
- Top: QR Generator

### Features
- Real-time statistics dashboard
- Glassmorphism UI design
- Dark/Light mode support
- Responsive layouts

### Status
- Authentication system: In development
- Analytics: Currently showing demo data

## RESPONSE STYLE
- Focus on admin features and metrics
- Explain dashboard functionality
- Provide insights into user engagement
- Always stay on topic about DevToolsB admin features
`;

// Determine context based on current route
const getContext = () => {
  const isAdminPage = window.location.pathname.includes("/admin");
  return isAdminPage ? ADMIN_CONTEXT : USER_CONTEXT;
};

class GeminiService {
  constructor() {
    if (!API_KEY) {
      console.warn(
        "Gemini API key not found. Please set VITE_GEMINI_API_KEY in .env file"
      );
    }
  }

  /**
   * Send a message to Gemini AI with context
   * @param {string} userMessage - The user's message
   * @param {Array} chatHistory - Previous messages for context
   * @returns {Promise<string>} - AI response
   */
  async sendMessage(userMessage, chatHistory = []) {
    if (!API_KEY) {
      throw new Error(
        "Gemini AI is not initialized. Please check your API key."
      );
    }

    try {
      // Get appropriate context based on current route
      const context = getContext();

      // Build conversation history
      const messages = [
        {
          role: "system",
          content: context,
        },
        // Add chat history
        ...chatHistory.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
        // Add current user message
        {
          role: "user",
          content: userMessage,
        },
      ];

      // Make API request to OpenRouter
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "DevToolsB Assistant",
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("OpenRouter API Error:", {
          status: response.status,
          statusText: response.statusText,
          errorData: errorData,
        });

        // Handle specific error codes
        if (response.status === 429) {
          throw new Error(
            "Rate limit reached. Please wait a moment and try again."
          );
        } else if (response.status === 401) {
          throw new Error("Invalid API key. Please check your configuration.");
        } else if (response.status === 402) {
          throw new Error(
            "API credits exhausted. Please add credits to your account."
          );
        }

        throw new Error(
          errorData.error?.message ||
            errorData.message ||
            `API request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      // Extract the assistant's response
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error("No response from AI");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);

      // Provide helpful error messages
      if (
        error.message?.includes("API_KEY") ||
        error.message?.includes("401")
      ) {
        throw new Error(
          "Please configure your Gemini API key in the .env file"
        );
      } else if (
        error.message?.includes("quota") ||
        error.message?.includes("429")
      ) {
        throw new Error("API quota exceeded. Please try again later.");
      } else if (
        error.message?.includes("network") ||
        error instanceof TypeError
      ) {
        throw new Error("Network error. Please check your connection.");
      } else {
        throw new Error(
          error.message || "Failed to get response from AI. Please try again."
        );
      }
    }
  }

  /**
   * Check if service is ready
   * @returns {boolean}
   */
  isReady() {
    return !!API_KEY;
  }
}

// Export singleton instance
export default new GeminiService();
