import { ThemeProvider } from "styled-components";
import React from "react";
import GlobalStyle from "@styles/globalStyle";
import { darkTheme, lightTheme } from "@styles/theme";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import BluredCirclesBackground from "@components/common/BluredCirclesBackground";
import gsap, { ScrollTrigger, TextPlugin, ScrollSmoother } from "gsap/all";
import Section1 from "@components/sections/Section1";
import Section2 from "@components/sections/Section2";
import { data } from "./assets/data";
import Section3 from "@components/sections/Section3";
import Section4 from "@components/sections/Section4";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectDetailPage from "@components/pages/[projectId]";
import Section5 from "@components/sections/Section5";
import { useGSAP } from "@gsap/react";
import ProjectPage from "@components/pages/projects";

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollSmoother);

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      smoothTouch: 0.1,
      effects: false,
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      smoother?.kill();
    };
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BluredCirclesBackground />
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
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
                      <Section5 />
                    </>
                  }
                />
                <Route
                  path="/projects"
                  element={<ProjectPage data={data.projects} />}
                />
                <Route
                  path="/projects/:projectId"
                  element={<ProjectDetailPage />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
