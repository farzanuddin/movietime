import { createElement, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/utils/theme";
import user from "../assets/images/user.webp";

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
const UserImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
const UserName = () => {
  return (
    <UserNameContainer>
      <Cont>
        <UserImage src={user} />
        <div>User Name {createElement(DownArrow)}</div>
      </Cont>
      <Cont>
        <EnvironmentIcon />
        <BellIcon />
      </Cont>
    </UserNameContainer>
  );
};

export const RightSideMenu = () => {
  return (
    <Container>
      <UserName />
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
