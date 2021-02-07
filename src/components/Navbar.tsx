import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import path from "utils/path";

import { ReactComponent as LogoSvg } from "assets/logo.svg";

const NAVBAR_HEIGHT = 64;
const LOGO_SIZE = 18;

const Container = styled.div`
  background-color: white;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  height: ${NAVBAR_HEIGHT}px;
  width: 100%;
  z-index: 6000;
  position: fixed;
`;

const NonFixedContainer = styled.div`
  width: 100%;
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

const LogoLink = styled(Link)`
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0;
  margin-left: 32px;
  margin-top: 0;
  text-decoration: none;
  color: black;
`;

const Logo = styled(LogoSvg)`
  height: ${LOGO_SIZE}px;
  width: ${LOGO_SIZE}px;
`;

function Navbar(): ReactElement {
  const title = "Reel Cinema";

  return (
    <>
      <Container>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <LogoLink to={path.toHome()}>{title}</LogoLink>
      </Container>
      <NonFixedContainer />
    </>
  );
}

export default Navbar;
