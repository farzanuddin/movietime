import { useState, useCallback } from "react";
import styled from "styled-components";

import { theme } from "../styles/theme";
import user from "../assets/images/user.webp";

import { getMovies } from "../api";
import { debounce as _debounce } from "lodash";
import {
  BellOutlined as BellIcon,
  EnvironmentOutlined as EnvironmentIcon,
  SearchOutlined as SearchIcon,
  LoadingOutlined as Loader,
} from "@ant-design/icons";

const UserName = () => {
  return (
    <UserNameContainer>
      <Cont>
        <UserImage src={user} />
        <div>Torkia Mahloul</div>
      </Cont>
      <Cont>
        <EnvironmentIcon />
        <BellContainer>
          <BellIcon />
          <NotificationDot />
        </BellContainer>
      </Cont>
    </UserNameContainer>
  );
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    _debounce(async (term) => {
      try {
        setLoading(true);
        const response = await getMovies("/search/movie", term);
        setSearchResults(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
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
      <SearchResultsContainer>
        {searchResults &&
          searchResults.results &&
          searchResults.results.slice(0, 10).map((movie) => (
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
    </>
  );
};
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
  padding: 20px;
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

export const RightSideMenu = () => {
  return (
    <Container>
      <UserName />
      <SearchBar />
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
const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const Cont = styled.div`
  display: flex;
  align-items: center;

  & > span:first-child {
    margin-right: 20px;
  }
`;
const UserImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
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
const BellContainer = styled.div`
  position: relative;
`;
const NotificationDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: ${theme.text.active};
  border-radius: 50%;
`;
