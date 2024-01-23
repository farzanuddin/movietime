import * as styled from "styled-components";
import { device } from "./utils/theme";

export const GlobalStyles = styled.createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    line-height: 1.4;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
    min-height: 100vh;
    padding: 0 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text.primary};

    @media ${device.tablet} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  a,
  button {
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-family: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  ul,
  li {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input {
    font-family: inherit;
  }

  p,
  li,
  h1,
  h2,
  h3,
  h4 {
    overflow-wrap: break-word;
    hyphens: auto;
  }
`;
