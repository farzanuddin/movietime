import styled from "styled-components";
import { MenuOutlined as MenuIcon, FilterOutlined as FilterIcon } from "@ant-design/icons";
import { theme } from "../styles/theme";

export const Footer = () => {
  return (
    <Container>
      <Button>
        <MenuIcon />
      </Button>
      <SecondButton>
        <FilterIcon />
      </SecondButton>
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

const Button = styled.div`
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
