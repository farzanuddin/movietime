import { useState, useEffect } from "react";
import styled from "styled-components";
import { LoadingOutlined, StarFilled } from "@ant-design/icons";
import { getDataFromAPI, getMoviesWithGenres } from "../api";
import { theme } from "../styles/theme";
import { FILTER_MAPPING, IMAGE_URL_BASE } from "../constants";
import dayjs from "dayjs";

const DiscoverItem = ({ title, average, backgroundImage, genres }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const image = new Image();
    image.src = backgroundImage;
    image.onload = handleImageLoad;

    return () => {
      image.onload = null;
    };
  }, [backgroundImage]);

  return (
    <DiscoveredItemContainer
      style={{ backgroundImage: imageLoaded ? `url(${backgroundImage})` : "none" }}
    >
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

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
    z-index: 1;
    border-radius: 10px;
  }

  @media (max-width: 1024px) {
    height: 200px;
    min-width: 300px;
    width: 100%;
  }
`;
const Genre = styled.p`
  color: ${theme.text.secondary};
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`;
const StarContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  width: auto;
  position: relative;
  z-index: 2;
`;
const Average = styled.p`
  color: ${theme.misc.yellow};
  margin-left: 10px;
`;
const TextContainer = styled.div`
  position: relative;
  z-index: 2;
`;
const InformationContainer = styled.div`
  display: flex;
  align-self: flex-end;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
`;

const DiscoveredSection = ({ setLoading }) => {
  const [discovered, setDiscovered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await getMoviesWithGenres("/discover/movie", page);
      return response.results;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    const nextPage = currentPage + 1;

    try {
      const newMovies = await fetchMovies(nextPage);
      setDiscovered((prevMovies) => [...prevMovies, ...newMovies]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadInitialMovies = async () => {
      const initialMovies = await fetchMovies(currentPage);
      setDiscovered((prevMovies) => [...prevMovies, ...initialMovies]);
    };

    loadInitialMovies();
  }, [currentPage]);

  const handleIntersection = async (entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      await loadMoreMovies();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const targetNode = document.getElementById("intersection-trigger");
    if (targetNode) {
      observer.observe(targetNode);
    }

    return () => observer.disconnect();
  }, [discovered]);

  return (
    <DiscoveredContainer>
      {discovered?.map((movie) => {
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
      <div id="intersection-trigger" style={{ height: "10px" }} />
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
  margin: 30px 0;
`;

const ActiveFilterSection = ({ activeFilter, setFilterLoading }) => {
  const [activeFilterMovies, setActiveFilterMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async () => {
    setFilterLoading(true);
    try {
      const response = await getDataFromAPI(`/movie/${activeFilter}`);
      setActiveFilterMovies(response);
    } catch (error) {
      console.error(error);
    } finally {
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [activeFilter]);

  return (
    <ActiveFilterContainer>
      {activeFilterMovies?.results?.map((movie) => {
        const { title, backdrop_path, id, release_date } = movie;
        const backgroundImage = backdrop_path;
        return (
          <ActiveFilterItem
            key={id}
            loading="lazy"
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
  );
};
const ActiveFilterContainer = styled.div`
  overflow-x: auto;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 20px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 10px;
  margin-top: 20px;

  @media (min-width: 1024px) {
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;
const ActiveFilterItem = styled.div`
  display: flex;
  position: relative;
  height: 250px;
  min-width: 200px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    .hover-text {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    height: 230px;
    min-width: 250px;
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
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  return (
    <Container>
      <TitleContainer>
        <h2>Discover Movies</h2>
        {loading && <LoadingOutlined />}
      </TitleContainer>
      <DiscoveredSection loading={loading} setLoading={setLoading} />
      <TitleContainer>
        <h2>{FILTER_MAPPING[activeFilter]}</h2>
        {filterLoading && <LoadingOutlined />}
      </TitleContainer>
      <ActiveFilterSection activeFilter={activeFilter} setFilterLoading={setFilterLoading} />
    </Container>
  );
};
const Container = styled.div`
  padding: 20px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h2 {
    margin-right: 10px;
  }
`;
