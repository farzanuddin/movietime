import { useState } from "react";

import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./styles/Global.styled";
import { theme } from "./styles/utils/theme";

import { LeftSideMenu } from "./components/LeftSideMenu";
import { RightSideMenu } from "./components/RightSideMenu";
import { Content } from "./components/Content";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer menuOpen={menuOpen}>
        <LeftSideMenu menuOpen={menuOpen} />
        <Content />
        <RightSideMenu />
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 15% 60% 25%;
`;

export default App;
