import React from "react";
import styled from "styled-components";

const Image = styled.img`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: ${({ height }) => height}px;
  width: 100%;
  cursor: pointer;
`;

interface MovieImageProps {
  alt: string;
  height: number;
  src: string;
}

function MovieImage(props: MovieImageProps): ReactElement {
  return <Image {...props} />;
}

export default MovieImage;
