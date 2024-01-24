import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import user from "../assets/images/user.webp";
import { getDataFromAPI, mapActorDetails } from "../api";
import { debounce as _debounce, isEmpty as _isEmpty } from "lodash";
import {
  BellOutlined as BellIcon,
  EnvironmentOutlined as EnvironmentIcon,
  SearchOutlined as SearchIcon,
  LoadingOutlined as Loader,
} from "@ant-design/icons";
import { FILTERS, LOGGED_IN_USER } from "../constants";

const UserName = () => {
  return (
    <UserNameContainer>
      <UserNameSection>
        <UserNameImage src={user} />
        <div>{LOGGED_IN_USER}</div>
      </UserNameSection>
      <UserNameSection>
        <EnvironmentIcon />
        <BellContainer>
          <BellIcon />
          <NotificationDot />
        </BellContainer>
      </UserNameSection>
    </UserNameContainer>
  );
};
const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;
const UserNameSection = styled.div`
  display: flex;
  align-items: center;

  & > span:first-child {
    margin-right: 20px;
  }
`;
const UserNameImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
const BellContainer = styled.div`
  position: relative;
`;
const NotificationDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: ${theme.misc.blue};
  border-radius: 50%;
`;

const SearchBar = ({ searchResults, setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    _debounce(async (term) => {
      try {
        setLoading(true);
        const response = await getDataFromAPI("/search/movie", term);
        setSearchResults(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (!newSearchTerm) {
      setSearchResults([]);
      return;
    }

    debouncedSearch(newSearchTerm);
  };

  return (
    <>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchIconContainer>{loading ? <Loader /> : <SearchIcon />}</SearchIconContainer>
      </SearchContainer>
      {!_isEmpty(searchResults) && (
        <SearchResultsContainer>
          {searchResults?.results?.slice(0, 10).map((movie) => (
            <SearchResultsItem key={movie.id}>
              <SearchItemImage
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                }}
              />
              <SearchItemInformation>
                <SearchItemTitle>{movie.title}</SearchItemTitle>
                <SearchItemText>{movie.overview}</SearchItemText>
              </SearchItemInformation>
            </SearchResultsItem>
          ))}
        </SearchResultsContainer>
      )}
    </>
  );
};

const FilterButton = ({ filter, activeFilter, onFilterClick }) => {
  const isActive = filter === activeFilter;

  return (
    <FilterItem data-active={isActive} onClick={() => onFilterClick(filter)}>
      {filter}
    </FilterItem>
  );
};

const FilterButtons = ({ activeFilter, onFilterClick }) => {
  return (
    <FilterContainer>
      {Object.entries(FILTERS)?.map(([filter, path]) => (
        <FilterButton
          key={filter}
          filter={filter}
          activeFilter={activeFilter}
          onFilterClick={onFilterClick}
        />
      ))}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;
const FilterItem = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) =>
    props["data-active"] ? theme.button.active : theme.button.inactive};
  color: ${(props) => (props["data-active"] ? theme.text.primary : theme.text.secondary)};
  margin-right: 10px;
`;

const PopularPinned = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await getDataFromAPI("/movie/popular");
        setPopular(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularMovies();
  }, []);
  return (
    <PopularContainer>
      {popular?.results?.slice(0, 2)?.map((movie) => {
        return (
          <SearchResultsItem key={movie.id}>
            <SearchItemImage
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
              }}
            />
            <SearchItemInformation>
              <SearchItemTitle>{movie.title}</SearchItemTitle>
              <SearchItemText>{movie.overview}</SearchItemText>
            </SearchItemInformation>
          </SearchResultsItem>
        );
      })}
    </PopularContainer>
  );
};

const PopularContainer = styled.div`
  padding: 0 20px;
  h4 {
    margin-bottom: 5px;
  }
`;

const Actor = ({ image, name, origin, popularity }) => {
  return (
    <ActorContainer>
      <ActorImage
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${image}')`,
        }}
      />

      <ActorDetails>
        <Details>
          <b>{name}</b>
          <p>{origin}</p>
        </Details>
        <Details>
          <b>{popularity}</b>
          <p>Followers</p>
        </Details>
      </ActorDetails>
    </ActorContainer>
  );
};

const ActorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const ActorDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;
const ActorImage = styled.div`
  height: 50px;
  width: 50px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-right: 10px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;

  p {
    color: ${theme.text.secondary};
  }
`;
const PopularActors = () => {
  const [actors, setActors] = useState([]);
  useEffect(() => {
    const fetchPopularActors = async () => {
      try {
        const response = await getDataFromAPI("/person/popular");
        if (response && response.results) {
          const actorsWithDetails = await Promise.all(
            response?.results?.slice(0, 3).map(async (actor) => {
              const actorDetails = await mapActorDetails(actor.id);
              return { ...actor, details: actorDetails };
            })
          );

          setActors(actorsWithDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularActors();
  }, []);
  return (
    <PopularActorsContainer>
      {actors?.map((actor) => {
        return (
          <Actor
            key={actor.id}
            name={actor.name}
            origin={actor.details.birth}
            popularity={actor.details.popularity}
            image={actor.details.profile}
          />
        );
      })}
    </PopularActorsContainer>
  );
};

const PopularActorsContainer = styled.div`
  padding: 0 20px;
`;

export const RightSideMenu = () => {
  const [activeFilter, setActiveFilter] = useState("Now Playing");
  const [searchResults, setSearchResults] = useState([]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };
  return (
    <Container>
      <UserName />
      <SearchBar searchResults={searchResults} setSearchResults={setSearchResults} />
      {_isEmpty(searchResults) && (
        <FilterButtons activeFilter={activeFilter} onFilterClick={handleFilterClick} />
      )}
      {_isEmpty(searchResults) && <PopularPinned />}
      {_isEmpty(searchResults) && <PopularActors />}
    </Container>
  );
};

const Container = styled.aside`
  height: 100%;
  width: 100%;
  background: ${theme.section.background};

  @media (max-width: 1024px) {
    display: none;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  position: relative;
`;
const SearchInput = styled.input`
  padding: 20px;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  flex: 1;
  color: ${theme.text.primary};
  background: ${theme.section.active};
`;
const SearchIconContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${theme.text.secondary};
`;
const SearchItemInformation = styled.div`
  flex-grow: 1;
  padding: 10px;
  font-size: 1.2rem;
`;
const SearchItemText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  max-height: 50px;
  color: ${theme.text.secondary};
`;
const SearchItemTitle = styled.p`
  display: flex;
  margin-bottom: 10px;
  font-weight: 800;
`;
const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  max-height: 500px;
  overflow-y: auto;
`;
const SearchItemImage = styled.div`
  min-width: 150px;
  border-radius: 10px;
  border: none;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const SearchResultsItem = styled.div`
  display: flex;
  background: ${theme.section.active};
  border-radius: 10px;
  margin-bottom: 10px;
`;
