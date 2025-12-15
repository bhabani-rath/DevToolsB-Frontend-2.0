# DevToolsB 🛠️

![DevToolsB](https://img.shields.io/badge/version-2.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646cff.svg?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.11-38bdf8.svg?logo=tailwindcss)

**DevToolsB** is a modern, comprehensive web-based developer tools platform built with React. It provides a collection of useful calculators and utilities designed to help developers, designers, and everyday users with common calculations and tasks.

## ✨ Features

- 🧮 **Multiple Calculators** - Tip, Discount, BMI, and Percentage calculators
- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🌓 **Dark Mode Support** - Seamless dark/light theme switching
- ⚡ **Fast & Optimized** - Built with Vite for lightning-fast performance
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔄 **Dynamic Routing** - Client-side routing with React Router
- 💾 **State Management** - Efficient context-based state management
- 🎯 **Code Splitting** - Lazy loading for optimal performance
- 🔐 **Admin Panel** - Dedicated admin dashboard for management
- 🎭 **Smooth Animations** - Enhanced user experience with Framer Motion

## 🚀 Tech Stack

### Core Technologies

- **React 19.2.0** - Latest React with cutting-edge features
- **Vite 7.0.0** - Next-generation frontend tooling
- **TailwindCSS 4.1.11** - Utility-first CSS framework
- **React Router DOM 7.6.3** - Client-side routing

### Key Libraries

- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API calls
- **Google Generative AI** - AI-powered features
- **React Icons** - Icon library
- **React Easy Crop** - Image cropping functionality
- **Sonner** - Toast notifications
- **js-cookie** - Cookie management

### Development Tools

- **ESLint** - Code linting and quality
- **Vite** - Build tool and dev server

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/DevToolsB-Frontend-2.0.git
   cd DevToolsB-Frontend-2.0
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your environment variables:

   ```env
   VITE_API_KEY=your_api_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Script               | Description                      |
| -------------------- | -------------------------------- |
| `npm run dev`        | Start development server         |
| `npm run build`      | Build for production             |
| `npm run preview`    | Preview production build locally |
| `npm run lint`       | Run ESLint for code quality      |
| `npm run check:deps` | Check for unused dependencies    |

## 📁 Project Structure

```
DevToolsB-Frontend-2.0/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, and other assets
│   ├── Components/        # Reusable UI components
│   │   ├── Navbar/       # Navigation components
│   │   ├── FooterBar/    # Footer component
│   │   ├── Loader/       # Loading components
│   │   └── 404/          # Not found page
│   ├── Context/          # React Context providers
│   │   └── ThemeContext  # Dark mode context
│   ├── Hooks/            # Custom React hooks
│   ├── Pages/            # Page components
│   │   ├── Admin/        # Admin panel pages
│   │   ├── PublicPage/   # Public-facing pages
│   │   ├── Authentication/ # Auth pages
│   │   └── ToolPage.jsx  # Dynamic tool page
│   ├── Routes/           # Route configurations
│   ├── Services/         # API services
│   ├── Tools/            # Tool implementations
│   │   └── Calculators/  # Calculator tools
│   │       ├── TipCalculator/
│   │       ├── DiscountCalculator/
│   │       ├── BMICalculator/
│   │       └── PercentageCalculator/
│   ├── demoData/         # Demo/mock data
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── .gitignore           # Git ignore rules
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## 🛠️ Available Tools

### Calculators

- **Tip Calculator** - Calculate tips and split bills
- **Discount Calculator** - Compute discounts and final prices
- **BMI Calculator** - Calculate Body Mass Index
- **Percentage Calculator** - Perform percentage calculations

> More tools are being added regularly!

## 🎨 Features in Detail

### Theme Management

The application includes a comprehensive theme system with:

- Persistent theme preference (saved in local storage)
- Smooth transitions between themes
- System preference detection

### Routing

- Dynamic route-based tool loading
- Lazy loading for performance
- 404 error handling
- Admin-only routes

### Performance Optimizations

- Code splitting with React.lazy()
- Optimized bundle sizes
- Fast refresh during development
- Production build optimizations

## 🔧 Development Guide

### Adding a New Tool

1. Create a new folder in `src/Tools/Calculators/YourTool/`
2. Create your tool component: `YourTool.jsx`
3. Register the tool in `src/Pages/ToolPage.jsx`:

   ```javascript
   import YourTool from "../Tools/Calculators/YourTool/YourTool";

   const toolComponents = {
     "your-tool": YourTool,
     // ... other tools
   };
   ```

### Code Style

- Follow React best practices
- Use functional components with hooks
- Maintain consistent file naming
- Add JSDoc comments for complex functions
- Use TailwindCSS for styling

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

**DevToolsB Team**

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- TailwindCSS for the utility-first CSS framework
- All contributors and supporters

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/DevToolsB-Frontend-2.0/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/DevToolsB-Frontend-2.0/discussions)

---

<div align="center">
  Made with ❤️ by DevToolsB Team
  
  ⭐ Star this repo if you find it helpful!
</div>
