import styled from "styled-components";
import { MenuOutlined as MenuIcon, FilterOutlined as FilterIcon } from "@ant-design/icons";
import { theme } from "../styles/theme";
import PropTypes from "prop-types";

export const Footer = ({ isDrawerOpen, isSecondDrawerOpen }) => {
  return (
    <Container>
      <Button onClick={isDrawerOpen}>
        <MenuIcon />
      </Button>
      <SecondButton onClick={isSecondDrawerOpen}>
        <FilterIcon />
      </SecondButton>
    </Container>
  );
};
Footer.propTypes = {
  isDrawerOpen: PropTypes.boolean.isRequired,
  isSecondDrawerOpen: PropTypes.boolean.isRequired,
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
  color: ${theme.text.primary};
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
