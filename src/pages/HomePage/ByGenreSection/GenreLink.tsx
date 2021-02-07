import React from "react";
import styled from "styled-components";

const Link = styled.a`
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

  &:not(:last-child) {
    margin-right: ${({ marginLength }) => marginLength}px;
  }
`;

interface Genre {
  id: number;
  name: string;
}

interface GenreProps {
  width: number;
  height: number;
  marginLength: number;
  genre: Genre;
}

function GenreLink(props: GenreProps): ReactElement {
  const { width, height, marginLength, genre } = props;

  return (
    <Link width={width} height={height} marginLength={marginLength}>
      {genre.name}
    </Link>
  );
}

export default GenreLink;
