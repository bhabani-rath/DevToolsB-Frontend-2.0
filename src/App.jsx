/**
 * App Component - Root Application Component
 *
 * @description Entry point for the DevToolsB application.
 * Configures routing, lazy loading, theme management, and loading states
 * for the entire application.
 *
 * @component
 * @features
 * - Client-side routing with React Router v6
 * - Code splitting with lazy loading for performance optimization
 * - Global theme management (dark/light mode)
 * - Centralized loading state management
 * - 404 error handling
 *
 * @routes
 * - "/" - Public homepage
 * - "/tools" - Tools showcase page
 * - "/admin" - Admin dashboard panel
 * - "*" - 404 Not Found page
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { ChatbotProvider } from "./context/ChatbotContext";
import NotFound from "./Components/404/NotFound";
import PageLoader from "./Components/Loader/Loader.jsx";

/**
 * Lazy-loaded Route Components
 * Using React.lazy() for code splitting to improve initial load performance
 * Each route is loaded only when needed
 */
const HomePage = lazy(() => import("./Pages/PublicPage/HomePage"));
const ToolsPage = lazy(() =>
  import("./Pages/PublicPage/sections/ToolsSection/ToolPage")
);
const AdminPanel = lazy(() => import("./Pages/Admin/AdminLayout.jsx"));
const DeveloperPanel = lazy(() =>
  import("./Pages/Developer/DeveloperLayout.jsx")
);
const UserPanel = lazy(() => import("./Pages/User/UserLayout.jsx"));
const ToolPage = lazy(() => import("./Pages/ToolPage"));

/**
 * Application Router Configuration
 * Defines all application routes and their corresponding components
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tools",
    element: <ToolsPage />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "/developer",
    element: <DeveloperPanel />,
  },
  {
    path: "/user",
    element: <UserPanel />,
  },
  {
    path: "/tools/:slug",
    element: <ToolPage />,
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <NotFound />,
  },
]);

/**
 * Main App Component
 * Wraps the router with theme provider, chatbot provider, and suspense boundary
 * @returns {JSX.Element} The root application component
 */
function App() {
  return (
    <ThemeProvider>
      <ChatbotProvider>
        {/* Suspense boundary shows PageLoader while lazy components load */}
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ChatbotProvider>
    </ThemeProvider>
  );
}

export default App;
