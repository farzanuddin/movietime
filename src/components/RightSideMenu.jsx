import { createElement, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/utils/theme";

import {
  DownOutlined as DownArrow,
  BellOutlined as BellIcon,
  EnvironmentOutlined as EnvironmentIcon,
} from "@ant-design/icons";

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
    margin-right: 10px;
  }
`;
const Logo = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: red;
  margin-right: 10px;
`;
const UserName = () => {
  return (
    <UserNameContainer>
      <Cont>
        <Logo />
        <div>User Name {createElement(DownArrow)}</div>
      </Cont>
      <Cont>
        <EnvironmentIcon />
        <BellIcon />
      </Cont>
    </UserNameContainer>
  );
};

export const RightSideMenu = ({ rightMenuOpen, setRightMenuOpen }) => {
  return (
    <Container rightMenuOpen={rightMenuOpen}>
      <UserName />
    </Container>
  );
};

const Container = styled.aside`
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${theme.section.background};
  right: ${(props) => (props.rightMenuOpen ? "0" : "-100%")};
  transition: right 0.3s ease-in-out;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    position: relative;
    right: 0;
    transition: none;
  }
`;
