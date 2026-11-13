import { BrowserRouter } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";
import AnalyticsPageView from "@components/common/AnalyticsPageView";
import CustomCursor from "@components/common/CustomCursor";
import ScrollToTop from "@components/common/ScrollToTop";
import useDarkMode from "@hooks/useDarkMode";
import AppRoutes from "./routes";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <NuqsAdapter>
        <ScrollToTop />
        <AnalyticsPageView />
        <CustomCursor />
        <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <AppRoutes />
      </NuqsAdapter>
    </BrowserRouter>
  );
}

export default App;
