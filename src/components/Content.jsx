import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StarFilled } from "@ant-design/icons";
import { Header } from "./Header";
import { getDataFromAPI, getMoviesWithGenres } from "../api";
import { theme } from "../styles/theme";
import { IMAGE_URL_BASE } from "../constants";
import dayjs from "dayjs";

const DiscoverItem = ({ title, average, backgroundImage, genres }) => {
  return (
    <DiscoveredItemContainer style={{ backgroundImage: `url(${backgroundImage})` }}>
      <InformationContainer>
        <TextContainer>
          <p>{title}</p>
          <Genre>{genres?.map((genre) => genre.name).join(", ")}</Genre>
        </TextContainer>
        <StarContainer>
          <StarFilled style={{ color: theme.misc.yellow }} />
          <Average>{average}</Average>
        </StarContainer>
      </InformationContainer>
    </DiscoveredItemContainer>
  );
};
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
    z-index: -1;
  }

  @media (max-width: 1024px) {
    height: 150px;
    min-width: 300px;
    width: 100%;
  }
`;
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

const DiscoveredSection = () => {
  const [discovered, setDiscovered] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMoviesWithGenres("/discover/movie");
        setDiscovered(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <DiscoveredContainer>
      {discovered?.results?.slice(0, 10)?.map((movie) => {
        const { id, title, vote_average, backdrop_path, genres } = movie;
        return (
          <DiscoverItem
            key={id}
            title={title}
            average={vote_average}
            backgroundImage={`${IMAGE_URL_BASE}${backdrop_path}`}
            genres={genres}
          />
        );
      })}
    </DiscoveredContainer>
  );
};
const DiscoveredContainer = styled.div`
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
  margin-bottom: 30px;
`;

const ActiveFilterSection = ({ activeFilter }) => {
  const [activeFilterMovies, setActiveFilterMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getDataFromAPI(`/movie/${activeFilter}`);
        setActiveFilterMovies(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [activeFilter]);

  return (
    <>
      <h2>{activeFilter}</h2>
      <ActiveFilterContainer>
        {activeFilterMovies?.results?.slice(0, 10).map((movie) => {
          const { title, backdrop_path, id, release_date } = movie;
          const backgroundImage = backdrop_path;
          console.log(movie);
          return (
            <ActiveFilterItem
              key={id}
              style={{ backgroundImage: `url(${IMAGE_URL_BASE}${backgroundImage})` }}
            >
              <ActiveFilterItemHover>
                <p>{title}</p>
                <span>{dayjs(release_date).format("MMMM YYYY")}</span>
              </ActiveFilterItemHover>
            </ActiveFilterItem>
          );
        })}
      </ActiveFilterContainer>
    </>
  );
};
const ActiveFilterContainer = styled.div`
  overflow-x: auto;
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;s
  }
  border-radius: 10px;
  margin-bottom: 30px;
  margin-top: 20px;
`;
const ActiveFilterItem = styled.div`
  position: relative;
  height: 250px;
  min-width: 200px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    .hover-text {
      opacity: 1;
    }
  }
`;
const ActiveFilterItemHover = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: ${theme.text.primary};
  padding: 5px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  span {
    font-size: 1rem;
    color: ${theme.text.secondary};
  }
`;

export const Content = ({ activeFilter }) => {
  return (
    <Container>
      <Header />
      <h2>Discovers</h2>
      <DiscoveredSection />
      <ActiveFilterSection activeFilter={activeFilter} />
    </Container>
  );
};
const Container = styled.div`
  padding: 20px;
`;
