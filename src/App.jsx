import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./styles/Global.styled";
import { theme } from "./styles/utils/theme";

import { LeftSideMenu } from "./components/LeftSideMenu";
import { RightSideMenu } from "./components/RightSideMenu";
import { Content } from "./components/Content";
import { Header } from "./components/Header";

function App() {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);

  const handleLeftMenu = () => {
    setLeftMenuOpen(!leftMenuOpen);
  };

  const handleRightMenu = () => {
    setRightMenuOpen(!rightMenuOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header setLeftMenuOpen={handleLeftMenu} setRightMenuOpen={handleRightMenu} />
        <LeftSideMenu leftMenuOpen={leftMenuOpen} setLeftMenuOpen={handleLeftMenu} />
        <Content />
        <RightSideMenu rightMenuOpen={rightMenuOpen} setRightMenuOpen={handleRightMenu} />
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 15% 60% 25%;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

export default App;