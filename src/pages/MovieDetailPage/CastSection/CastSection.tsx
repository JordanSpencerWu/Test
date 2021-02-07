import React from "react";
import styled from "styled-components";

import chunkArray from "utils/chunkArray";
import Image from "components/Image";
import { ReactComponent as AvatarSvg } from "assets/avatar.svg";

const AVATAR_SIZE = 42;
const NUMBER_OF_CAST_IN_A_ROW = 6;
const GRAY_COLOR = "#bbbaba";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CastContainer = styled.div`
  width: ${({ width }) => width}px;
  min-width: 120px;
  margin-bottom: 8px;

  &:not(:last-child) {
    margin-right: ${({ marginLength }) => marginLength}px;
  }
`;

const ImageContainer = styled.div`
  height: ${({ height }) => height}px;

  ${({ avatar }) =>
    avatar &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2245e1;
  `}
`;

const AvatarImage = styled(AvatarSvg)`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
`;

const CastText = styled.h2`
  margin: 32px 0 24px 0;
  font-size: 28px;
`;

const Row = styled.div`
  display: flex;
`;

const CastNameText = styled.p`
  margin: 12px 0 0 0;
  font-size: 14px;
  font-weight: 600;
`;

const CastCharacterText = styled.p`
  margin: 4px 0 0 0;
  font-size 14px;
  color: ${GRAY_COLOR};
`;

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface CastSectionProps {
  cast: Array<Cast>;
  imageHeight: number;
  imageWidth: number;
  marginLeft: number;
}

function CastSection(props: CastSectionProps): ReactElement {
  const { cast, imageHeight, imageWidth, marginLeft } = props;

  const chunkedCasts = chunkArray(cast, NUMBER_OF_CAST_IN_A_ROW);

  const showCast = (casts) =>
    casts.map((cast) => {
      return (
        <CastContainer
          key={cast.id}
          width={imageWidth}
          marginLength={marginLeft}
        >
          <ImageContainer height={imageHeight} avatar>
            {cast.profile_path ? (
              <Image
                alt={cast.name}
                height={imageHeight}
                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
              />
            ) : (
              <AvatarImage />
            )}
          </ImageContainer>
          <CastNameText>{cast.name}</CastNameText>
          <CastCharacterText>{cast.character}</CastCharacterText>
        </CastContainer>
      );
    });

  const showCasts = (chunkedCasts) =>
    chunkedCasts.map((casts, index) => (
      <Row key={index}>{showCast(casts)}</Row>
    ));

  return (
    <Container>
      <CastText>Cast</CastText>
      {showCasts(chunkedCasts)}
    </Container>
  );
}

export default CastSection;
