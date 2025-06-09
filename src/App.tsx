import { ThemeProvider } from "styled-components";
import { useState } from "react";
import GlobalStyle from "@styles/globalStyle";
import { darkTheme, lightTheme } from "@styles/theme";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import BluredCirclesBackground from "@components/common/BluredCirclesBackground";
import gsap, { ScrollTrigger, TextPlugin } from "gsap/all";
import Section1 from "@components/sections/Section1";
import Section2 from "@components/sections/Section2";
import { data } from "./assets/data";
import Section3 from "@components/sections/Section3";
import Section4 from "@components/sections/Section4";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectDetailPage from "@components/pages/[projectId]";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BluredCirclesBackground />
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Section1 />
                  <Section2 data={data.experience} />
                  <Section3 data={data.skills} />
                  <Section4 data={data.projects} />
                </>
              }
            />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailPage />}
            />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
