import { BrowserRouter } from "react-router-dom";
import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";
import useDarkMode from "@hooks/useDarkMode";
import AppRoutes from "./routes";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
