import styled, { keyframes } from "styled-components";
import { MenuOutlined as MenuIcon, FilterOutlined as FilterIcon } from "@ant-design/icons";
import { theme } from "../styles/theme";
import { createElement, useState } from "react";

const Drawer = ({ side, isOpen, onClose, children }) => {
  return (
    <DrawerContainer side={side} isOpen={isOpen}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {children}
    </DrawerContainer>
  );
};
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;
const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;
const DrawerContainer = styled.div`
  position: fixed;
  bottom: 0;
  ${(props) => (props.side === "left" ? "left: 0;" : "right: 0;")}
  width: 100vw;
  height: 100vh;
  background: ${theme.section.background};
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: transform 0.3s ease;

  animation: ${(props) => (props.isOpen ? slideIn : slideOut)} 0.3s ease;
  transform: ${(props) => props.isOpen && "translateX(0)"};
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
`;

export const Footer = ({ leftSideMenu, rightSideMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Container>
      <Button>
        <MenuIcon onClick={toggleMenu} />
      </Button>
      <SecondButton>
        <FilterIcon onClick={toggleFilter} />
      </SecondButton>

      {isMenuOpen && <Drawer side="left" isOpen={isMenuOpen} onClose={toggleMenu}></Drawer>}
      {isFilterOpen && <Drawer side="right" isOpen={isFilterOpen} onClose={toggleFilter}></Drawer>}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  padding: 10px;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Button = styled.button`
  background: ${theme.button.inactive};
  border-radius: 50%;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
`;

const SecondButton = styled(Button)`
  right: 20px;
`;
