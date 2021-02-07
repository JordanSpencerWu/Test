import React from "react";
import styled from "styled-components";

import imageSrc from "assets/404.png";

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

function NotFoundPage(): ReactElement {
  return <Image src={imageSrc} alt="404" />;
}

export default NotFoundPage;
