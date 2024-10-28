import { ThemeProvider } from "styled-components";
import About from "./components/sections/About";
import Header from "./components/common/Header";
import GlobalStyle from "./styles/GlobalStyle";

import { useState } from "react";
import { darkTheme, lightTheme } from "./styles/theme";
import Visual from "./components/sections/Visual";

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
      </main>
    </ThemeProvider>
  );
}

export default App;
