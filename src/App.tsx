import { ThemeProvider } from "styled-components";
import { useState } from "react";
import GlobalStyle from "@styles/globalStyle";
import { darkTheme, lightTheme } from "@styles/theme";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import BluredCirclesBackground from "@components/common/BluredCirclesBackground";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section1 from "@components/Section1";

gsap.registerPlugin(ScrollTrigger);

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
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
