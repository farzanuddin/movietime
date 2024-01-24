import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { StarFilled } from "@ant-design/icons";
import { getMovieGenres } from "../api";
import { theme } from "../styles/theme";

const DiscoverItem = ({ title, genres, average, backgroundImage }) => {
  return (
    <DiscoveredItemContainer style={{ backgroundImage: `url(${backgroundImage})` }}>
      <InformationContainer>
        <TextContainer>
          <Title>{title}</Title>
          <Genre>{genres.join(", ")}</Genre>
        </TextContainer>
        <StarContainer>
          <StarFilled style={{ color: theme.misc.yellow }} />
          <Average>{average}</Average>
        </StarContainer>
      </InformationContainer>
    </DiscoveredItemContainer>
  );
};

export const Content = ({ discovered }) => {
  const items = discovered && discovered.results.slice(0, 10);
  const [genreNames, setGenreNames] = useState([]);

  const fetchGenreNames = async (genreIds) => {
    const genreNames = await getMovieGenres(genreIds);
    return genreNames || [];
  };

  const fetchAllGenreNames = async () => {
    if (items) {
      const genrePromises = items.map((item) => fetchGenreNames(item.genre_ids));
      const genreNamesArray = await Promise.all(genrePromises);
      setGenreNames(genreNamesArray);
    }
  };

  useEffect(() => {
    fetchAllGenreNames();
  }, [items]);

  return (
    <Container>
      <Header />
      <h2>Discovers</h2>
      <DiscoveredSection>
        {items &&
          items.map((item, index) => (
            <DiscoverItem
              key={item.id}
              title={item.title}
              genres={genreNames[index] || []}
              average={item.vote_average}
              backgroundImage={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            />
          ))}
      </DiscoveredSection>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;
const DiscoveredSection = styled.div`
  overflow-x: auto;
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;s
  }
  border-radius: 10px;
`;
const DiscoveredItemContainer = styled.div`
  display: flex;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 250px;
  padding: 20px;
  min-width: 500px;
  border-radius: 10px;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    z-index: -1; /* Place the pseudo-element behind the content */
  }

  @media (max-width: 1024px) {
    height: 150px;
    min-width: 300px;
    width: 100%;
  }
`;
const Title = styled.p``;
const Genre = styled.p`
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`;
const StarContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 5px;
  padding: 5px;
  width: auto;
  f
`;
const Average = styled.p`
  color: ${theme.misc.yellow};
  margin-left: 10px;
`;
const InformationContainer = styled.div`
  display: flex;
  align-self: flex-end;
  z-index: 1;
`;
const TextContainer = styled.div`
  z-index: 1;
`;
