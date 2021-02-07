import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ImageElement = styled.img`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: ${({ height }) => height}px;
  width: 100%;

  ${({ pointer }) => pointer && `cursor: pointer;`}
`;

interface ImageProps {
  alt: string;
  height: number;
  src: string;
  to: string;
}

function Image(props: ImageProps): ReactElement {
  const { to, ...imageProps } = props;

  if (to === null) {
    return <ImageElement {...imageProps} />;
  }

  return (
    <Link to={to}>
      <Image {...imageProps} pointer />
    </Link>
  );
}

Image.defaultProps = {
  to: null,
};

export default Image;
