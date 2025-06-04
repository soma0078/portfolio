import { ThemeProvider } from "styled-components";
import { useState } from "react";
import GlobalStyle from "@styles/globalStyle";
import { darkTheme, lightTheme } from "@styles/theme";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import BluredCirclesBackground from "@components/common/BluredCirclesBackground";
import gsap, { ScrollTrigger, TextPlugin } from "gsap/all";
import Section1 from "@components/Section1";
import Section2 from "@components/Section2";
import { data } from "./assets/data";
import Section3 from "@components/Section3";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BluredCirclesBackground />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Section1 />
        <Section2 data={data.experience} />
        <Section3 />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
