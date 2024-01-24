import { useState } from "react";
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
