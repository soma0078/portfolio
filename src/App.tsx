import { ThemeProvider } from "styled-components";
import About from "./components/sections/About";
import Header from "./components/common/Header";
import GlobalStyle from "./styles/globalStyle";

import { useState } from "react";
import { darkTheme, lightTheme } from "./styles/theme";
import Visual from "./components/sections/Visual";
import Projects from "./components/sections/Projects";
import Works from "./components/sections/Works";
import Contact from "./components/sections/Contact";
import Footer from "./components/common/Footer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Visual />
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
