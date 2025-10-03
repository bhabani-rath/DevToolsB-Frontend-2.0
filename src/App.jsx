import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import HomePage from "./Pages/PublicPage/HomePage";
import ToolsPage from "./Pages/PublicPage/sections/ToolsSection/ToolPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route path="/tools" element={<ToolsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
