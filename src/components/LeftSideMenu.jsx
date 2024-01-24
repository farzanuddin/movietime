import { createElement, useState } from "react";
import styled from "styled-components";
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
import { theme } from "../styles/theme";
import { LIST_ITEMS } from "../constants";

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

export const Logo = ({ primary, secondary }) => {
  return (
    <LogoContainer>
      <LogoSpan>{primary}</LogoSpan>
      <p>{secondary}</p>
    </LogoContainer>
  );
};
const LogoContainer = styled.div`
  display: flex;
  font-size: 2rem;

  @media (min-width: 1024px) {
    padding: 20px;
  }
`;
const LogoSpan = styled.span`
  color: ${theme.text.active};
`;

const List = ({ category, items, activeTab, onTabClick }) => {
  return (
    <div key={category}>
      <ListTitle>{category.toUpperCase()}</ListTitle>
      <ul>
        {items?.map((item, index) => {
          return (
            <ListItem key={index} onClick={() => onTabClick(item)} data-active={activeTab === item}>
              {createElement(iconMapping[item])}
              {item}
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
};
const ListTitle = styled.p`
  color: ${theme.text.secondary};
  padding: 20px;
  font-size: 12px;
`;
const ListItem = styled.li`
  color: ${(props) => (props["data-active"] ? theme.text.active : theme.text.secondary)};
  font-size: 13px;
  text-transform: capitalize;
  padding: 20px;
  cursor: pointer;

  & svg {
    margin-right: 20px;
  }

  ${(props) =>
    props["data-active"] &&
    `
      color: ${theme.text.active};
      background: ${theme.section.active};
      border-left: 3px solid ${theme.text.active};
    `}
`;

const Options = ({ activeTab, onTabClick }) => {
  return Object.entries(LIST_ITEMS)?.map(([category, items]) => {
    return (
      <List
        key={category}
        category={category}
        items={items}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />
    );
  });
};

export const LeftSideMenu = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Logo primary="Mov" secondary=".time" />
      <Options activeTab={activeTab} onTabClick={handleTabClick} />
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
