import styled, { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./styles/Global.styled";
import { theme } from "./styles/theme";

import { LeftSideMenu } from "./components/LeftSideMenu";
import { RightSideMenu } from "./components/RightSideMenu";
import { Content } from "./components/Content";
import { useEffect, useState } from "react";
import { getMovies } from "./api";

export const App = () => {
  const [discovered, setDiscovered] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies("/discover/movie");
        setDiscovered(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <LeftSideMenu />
        <Content discovered={discovered} />
        <RightSideMenu />
      </AppContainer>
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
