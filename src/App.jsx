import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { LeftSideMenu } from "./components/LeftSideMenu";
import { RightSideMenu } from "./components/RightSideMenu";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GlobalStyles } from "./styles/Global.styled";
import { theme } from "./styles/theme";

const App = () => {
  const [activeFilter, setActiveFilter] = useState("now_playing");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <AppContainer>
        {!isMobile && <LeftSideMenu />}
        <Content activeFilter={activeFilter} />
        <RightSideMenu activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </AppContainer>
      <Footer handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        open={isDrawerOpen}
        onClose={handleDrawerOpen}
        direction="right"
        lockBackgroundScroll="true"
        size="90vw"
      >
        <LeftSideMenu />
      </Drawer>
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
