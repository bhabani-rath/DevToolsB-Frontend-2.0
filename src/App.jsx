import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import NotFound from "./Components/404/NotFound";
import PageLoader from "./Components/Loader/Loader.jsx";

// Lazy loading for public routes
const HomePage = lazy(() => import("./Pages/PublicPage/HomePage"));
const ToolsPage = lazy(() =>
  import("./Pages/PublicPage/sections/ToolsSection/ToolPage")
);

// Lazy loading for admin routes
const AdminLayout = lazy(() => import("./Pages/Admin/AdminLayout.jsx"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard.jsx"));
const UsersManagement = lazy(() => import("./Pages/Admin/UserManagement.jsx"));
const ToolsManagement = lazy(() => import("./Pages/Admin/ToolsManagement.jsx"));
const Analytics = lazy(() => import("./Pages/Admin/Analytics.jsx"));
const Settings = lazy(() => import("./Pages/Admin/Settings.jsx"));

// Router configuration
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
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UsersManagement />,
      },
      {
        path: "tools",
        element: <ToolsManagement />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
