import React from "react";
import styled from "styled-components";

import { ReactComponent as LogoSvg } from "assets/logo.svg";

const NAVBAR_HEIGHT = 64;
const LOGO_SIZE = 18;

const Container = styled.div`
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  height: ${NAVBAR_HEIGHT}px;
`;

const LogoContainer = styled.div`
  align-items: center;
  background: blue;
  display: flex;
  height: ${NAVBAR_HEIGHT}px;
  justify-content: center;
  width: ${NAVBAR_HEIGHT * 0.85}px;
`;

const LogoText = styled.h2`
  margin-bottom: 0;
  margin-left: 32px;
  margin-top: 0;
`;

const Logo = styled(LogoSvg)`
  height: ${LOGO_SIZE}px;
  width: ${LOGO_SIZE}px;
`;

function Navbar(): ReactElement {
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <LogoText>Reel Cinema</LogoText>
    </Container>
  );
}

export default Navbar;
