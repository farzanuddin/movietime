import styled from "styled-components";
import { MenuOutlined as MenuIcon } from "@ant-design/icons";
import { theme } from "../styles/theme";
import user from "../assets/images/user.webp";

export const Header = () => {
  return (
    <Container>
      <MenuButton>
        <StyledMenuIcon />
      </MenuButton>
      <FilterButton>
        <StyledUserImage src={user} />
      </FilterButton>
    </Container>
  );
};

const Container = styled.header`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 1024px) {
    display: none;
  }
`;
const StyledMenuIcon = styled(MenuIcon)`
  color: ${theme.text.primary};
`;
const MenuButton = styled.button`
  background: none;
`;
const StyledUserImage = styled.img`
  border-radius: 50%;
`;
const FilterButton = styled.button`
  background: none;
  height: 30px;
  width: 30px;
`;
