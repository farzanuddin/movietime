import styled from "styled-components";

import { MenuOutlined as MenuIcon } from "@ant-design/icons";

import user from "../assets/images/user.webp";
import { theme } from "../styles/theme";

export const Header = () => {
  return (
    <Container>
      <MenuButton>
        <MenuIcon style={{ color: theme.text.primary }} />
      </MenuButton>
      <FilterButton>
        <UserImage src={user} />
      </FilterButton>
    </Container>
  );
};

const Container = styled.header`
  padding: 20px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 1024px) {
    display: none;
  }
`;
const MenuButton = styled.button`
  background: none;
`;
const FilterButton = styled.button`
  background: none;
  height: 30px;
  width: 30px;
`;
const UserImage = styled.img`
  border-radius: 50%;
`;
