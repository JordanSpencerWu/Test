import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-width: 150px;
  min-height: 210px;
  max-width: 250px;
  max-height: 350px;
`;

interface MovieImageProps {
  alt: string;
  height: number;
  src: string;
  width: number;
}

function MovieImage(props: MovieImageProps): ReactElement {
  return <Image {...props} />;
}

export default MovieImage;
