import styled from "styled-components";
import user from "../assets/images/user.webp";
import { Logo } from "./LeftSideMenu";

export const Header = () => {
  return (
    <Container>
      <Logo primary="Mov" secondary=".time" />
      <FilterButton>
        <StyledUserImage src={user} />
      </FilterButton>
    </Container>
  );
};

const Container = styled.header`
  margin: 20px 20px 0 20px;

  display: flex;
  justify-content: space-between;

  @media (min-width: 1024px) {
    display: none;
  }
`;
const StyledUserImage = styled.img`
  border-radius: 50%;
`;
const FilterButton = styled.button`
  background: none;
  height: 30px;
  width: 30px;
`;
