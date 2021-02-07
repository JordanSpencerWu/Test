import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import path from "utils/path";

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
  id: number;
}

function MovieImage(props: MovieImageProps): ReactElement {
  const { id, ...imageProps } = props;

  return (
    <Link to={path.toDetail(id)}>
      <Image {...imageProps} />
    </Link>
  );
}

export default MovieImage;
