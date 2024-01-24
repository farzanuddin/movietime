import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { LeftSideMenu } from "./components/LeftSideMenu";
import { RightSideMenu } from "./components/RightSideMenu";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GlobalStyles } from "./styles/Global.styled";
import { theme } from "./styles/theme";

const App = () => {
  const [activeFilter, setActiveFilter] = useState("now_playing");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <AppContainer>
        <LeftSideMenu />
        <Content activeFilter={activeFilter} />
        <RightSideMenu activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </AppContainer>
      <Footer />
    </ThemeProvider>
  );
};
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
