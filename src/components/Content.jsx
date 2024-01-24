import styled from "styled-components";
import { Header } from "./Header";

export const Content = ({ discovered }) => {
  return (
    <Container>
      <Header />
      <button onClick={() => console.log(discovered)}>Test Me</button>
    </Container>
  );
};

const Container = styled.div``;
