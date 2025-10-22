import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import NotFound from "./Components/404/NotFound";
import PageLoader from "./Components/Loader/Loader.jsx";

// Lazy loading for routes
const HomePage = lazy(() => import("./Pages/PublicPage/HomePage"));
const ToolsPage = lazy(() =>
  import("./Pages/PublicPage/sections/ToolsSection/ToolPage")
);

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
