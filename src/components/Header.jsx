import { useState } from "react";
import { MenuOutlined as MenuIcon } from "@ant-design/icons";
import user from "../assets/images/user.webp";
import styled from "styled-components";
import { theme } from "../styles/utils/theme";

export const Header = () => {
  const [leftMenuVisible, setLeftMenuVisible] = useState(false);
  const [rightMenuVisible, setRightMenuVisible] = useState(false);

  const toggleMenuVisibility = (menu) => {
    if (menu === "left") {
      setLeftMenuVisible((prevLeftMenuVisible) => !prevLeftMenuVisible);
      setRightMenuVisible(false);
    } else if (menu === "right") {
      setRightMenuVisible((prevRightMenuVisible) => !prevRightMenuVisible);
      setLeftMenuVisible(false);
    }
  };

  return (
    <Container>
      <MenuButton onClick={() => toggleMenuVisibility("left")}>
        <MenuIcon
          style={{ color: theme.text.primary }}
          onClick={() => toggleMenuVisibility("left")}
        />
      </MenuButton>
      <FilterButton onClick={() => toggleMenuVisibility("right")}>
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
