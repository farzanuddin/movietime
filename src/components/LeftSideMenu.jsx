import { createElement, useState } from "react";
import styled from "styled-components";

import { theme } from "../styles/utils/theme";

import {
  HomeOutlined as Home,
  BookOutlined as Favorite,
  WalletOutlined as Purchase,
  ClockCircleOutlined as Reminder,
  FileOutlined as Playlist,
  PlayCircleOutlined as Live,
  SaveOutlined as Bookmarks,
  SettingOutlined as Settings,
} from "@ant-design/icons";

const listItems = {
  menu: ["home", "favorite", "purchase", "reminder"],
  other: ["playlist", "live", "bookmarks", "settings"],
};

const iconMapping = {
  home: Home,
  favorite: Favorite,
  purchase: Purchase,
  reminder: Reminder,
  playlist: Playlist,
  live: Live,
  bookmarks: Bookmarks,
  settings: Settings,
};

const Logo = ({ primary, secondary }) => {
  return (
    <LogoContainer>
      <LogoSpan>{primary}</LogoSpan>
      {secondary}
    </LogoContainer>
  );
};

const List = ({ category, items, activeTab, onTabClick }) => {
  return (
    <ListContainer key={category}>
      <ListTitle>{category.toUpperCase()}</ListTitle>
      <ul>
        {items.map((item, index) => (
          <ListItem key={index} onClick={() => onTabClick(item)} isActive={activeTab === item}>
            {createElement(iconMapping[item])}
            {item}
          </ListItem>
        ))}
      </ul>
    </ListContainer>
  );
};

const LeftSideMenuOptions = ({ activeTab, onTabClick }) => {
  return Object.entries(listItems).map(([category, items]) => (
    <List
      key={category}
      category={category}
      items={items}
      activeTab={activeTab}
      onTabClick={onTabClick}
    />
  ));
};

export const LeftSideMenu = ({ menuOpen }) => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Logo primary="Mov" secondary=".time" />
      <LeftSideMenuOptions activeTab={activeTab} onTabClick={handleTabClick} />
    </Container>
  );
};

const LogoContainer = styled.p`
  display: flex;
  padding: 20px;
`;
const LogoSpan = styled.span`
  color: ${theme.text.active};
`;
const Container = styled.aside`
  height: 100%;
  width: 100%;
  background: ${theme.section.background};
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;
const ListContainer = styled.div``;
const ListTitle = styled.p`
  color: ${theme.text.secondary};
  padding: 20px;
  font-size: 12px;
`;
const ListItem = styled.li`
  color: ${theme.text.secondary};
  font-size: 13px;
  text-transform: capitalize;
  padding: 20px;
  cursor: pointer;
  & svg {
    margin-right: 20px;
  }
  &:hover {
    background: ${theme.section.active};
  }

  ${(props) => props.isActive && `color: ${theme.text.active};`}
  ${(props) => props.isActive && `border-left: 3px solid ${theme.text.active};`}
`;
