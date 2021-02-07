import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkComponent = styled(Link)`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  background-image: linear-gradient(
    to right,
    #9a4ced 0%,
    #867fef 40%,
    #7fc7f2 100%
  );
  font-size: 24px;
  border-radius: 4px;
  cursor: pointer;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  min-width: 185px;
  max-width: 312px;
  margin-bottom: 48px;
  text-decoration: none;

  &:not(:last-child) {
    margin-right: ${({ marginlength }) => marginlength}px;
  }
`;

interface Genre {
  name: string;
}

interface GenreProps {
  to: string;
  width: number;
  height: number;
  marginLength: number;
  genre: Genre;
}

function GenreLink(props: GenreProps): ReactElement {
  const { to, width, height, marginLength, genre } = props;

  return (
    <LinkComponent
      to={to}
      width={width}
      height={height}
      marginlength={marginLength}
    >
      {genre.name}
    </LinkComponent>
  );
}

export default GenreLink;
