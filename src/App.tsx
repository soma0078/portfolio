import { ThemeProvider } from "styled-components";
import { useState } from "react";
import GlobalStyle from "@styles/globalStyle";
import { darkTheme, lightTheme } from "@styles/theme";
import Header from "@common/Header";
import Footer from "@common/Footer";

import VisualRe from "@sections/VisualRe";
import About from "@sections/About";
import Projects from "@sections/Projects";
import Works from "@sections/Works";
import Contact from "@sections/Contact";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <VisualRe />
        {/* <Visual /> */}
        <About />
        <Projects />
        <Works />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
