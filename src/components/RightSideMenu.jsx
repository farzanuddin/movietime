import { createElement, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/utils/theme";

import {
  DownOutlined as DownArrow,
  BellOutlined as Bell,
  EnvironmentOutlined as Environment,
} from "@ant-design/icons";

const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Cont = styled.div`
  display: flex;
  align-items: center;
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
        <div>{createElement(Environment)}</div>
        <div>{createElement(Bell)}</div>
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

const Container = styled.div`
  background: ${theme.section.background};
  padding: 20px;

  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;
