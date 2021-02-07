import React from "react";
import styled from "styled-components";

import { useWindowDimensions } from "hooks/useWindowDimensions";
import GenreLink from "./GenreLink";

const GRAY_COLOR = "#bbbaba";
const NUMBER_OF_GENRES_IN_A_ROW = 4;
const GENRE_CONTAINER_MARGIN_LENGTH = 10;
const CONTAINER_PADDING = 300;

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: rgb(244, 245, 251);
`;

const CenterContainer = styled.div`
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const SectionSubText = styled.span`
  margin: 0;
  font-weight: 400;
  font-size: 24px;
  color: ${GRAY_COLOR};
`;

const SectionHeader = styled.h2`
  margin: 16px 0;
  font-size: 32px;
  font-weight: 600;
  line-height: 1;
`;

interface Genre {
  id: number;
  name: string;
}

interface ByGenreSectionProps {
  genres: Array<Genre>;
}

function ByGenreSection(props: ByGenreSectionProps): ReactElement {
  const { genres } = props;

  const { width } = useWindowDimensions();

  const genreWidth =
    (width - (GENRE_CONTAINER_MARGIN_LENGTH * 3 + CONTAINER_PADDING)) /
    NUMBER_OF_GENRES_IN_A_ROW;
  const genreHeight = genreWidth * 0.4;

  const showGenres = (genres) =>
    genres.map((genre) => (
      <GenreLink
        key={genre.id}
        width={genreWidth}
        height={genreHeight}
        marginLength={GENRE_CONTAINER_MARGIN_LENGTH}
        genre={genre}
      />
    ));

  return (
    <Container>
      <CenterContainer>
        <SectionHeader>
          <SectionSubText>Browser</SectionSubText>
          <br />
          by Genre
        </SectionHeader>
        <FlexContainer>{showGenres(genres)}</FlexContainer>
      </CenterContainer>
    </Container>
  );
}

export default ByGenreSection;
