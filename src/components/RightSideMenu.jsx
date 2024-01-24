import { createElement, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import user from "../assets/images/user.webp";

import {
  BellOutlined as BellIcon,
  EnvironmentOutlined as EnvironmentIcon,
  SearchOutlined as SearchIcon,
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <SearchIconContainer>
        <SearchIcon />
      </SearchIconContainer>
    </SearchContainer>
  );
};

const FilterBar = () => {
  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (buttonLabel) => {
    setActiveButton(buttonLabel === activeButton);
  };
  return (
    <ButtonsContainer>
      <Button>Amazon Prime</Button>
      <Button>Apple TV</Button>
      <Button>Disney+</Button>
      <Button>Hulu</Button>
      <Button>Youtube</Button>
    </ButtonsContainer>
  );
};

export const RightSideMenu = () => {
  return (
    <Container>
      <UserName />
      <SearchBar />
      <FilterBar />
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
  color: ${theme.text.secondary}; /* Add a color to the icon */
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
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
`;
const Button = styled.button`
  padding: 15px;
  border-radius: 10px;
  background: ${theme.button.inactive};
  color: ${theme.text.primary};
  margin-bottom: 10px;
  margin-right: 10px;
`;
