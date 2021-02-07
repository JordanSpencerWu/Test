import React from "react";
import styled from "styled-components";

import MovieImage from "components/MovieImage";
import { useWindowDimensions } from "hooks/useWindowDimensions";

const GRAY_COLOR = "#bbbaba";
const NUMBER_OF_MOVIES_IN_A_ROW = 5;
const MOVIE_CONTAINER_MARGIN_LENGTH = 16;
const CONTAINER_PADDING = 150;

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 32px;
`;

const CenterContainer = styled.div`
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const Row = styled.div`
  display: flex;
`;

const MovieImageContainer = styled.div`
  width: ${({ width }) => width}px;
  min-width: 150px;
  max-width: 275px;
  margin-bottom: 8px;

  &:not(:last-child) {
    margin-right: ${({ marginLength }) => marginLength}px;
  }
`;

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  genre_ids: Array<number>;
}

interface BrowseAllSectionProps {
  movies: Array<Movie>;
}

const chunkArray = (array, chunkSize) => {
  const chunkArray = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunkArray.push(array.slice(i, i + chunkSize));
  }

  return chunkArray;
};

function BrowseAllSection(props: BrowseAllSectionProps): ReactElement {
  const { movies } = props;

  const { width } = useWindowDimensions();

  const chunkMovies = chunkArray(movies, NUMBER_OF_MOVIES_IN_A_ROW);
  const imageWidth =
    (width - (MOVIE_CONTAINER_MARGIN_LENGTH * 4 + CONTAINER_PADDING)) /
    NUMBER_OF_MOVIES_IN_A_ROW;
  const imageHeight = imageWidth * 1.4;

  const showMovieImages = (movies) =>
    movies.map((movie) => (
      <MovieImageContainer
        marginLength={MOVIE_CONTAINER_MARGIN_LENGTH}
        width={imageWidth}
      >
        <MovieImage
          alt={movie.title}
          height={imageHeight}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
      </MovieImageContainer>
    ));

  const showMovies = (chunkMovies) =>
    chunkMovies.map((movies, index) => (
      <Row key={index}>{showMovieImages(movies)}</Row>
    ));

  return (
    <Container>
      <CenterContainer>
        <div>
          <SectionHeader>
            <SectionSubText>Movies</SectionSubText>
            <br />
            Browse All
          </SectionHeader>
          <input />
        </div>
        <FlexContainer>{showMovies(chunkMovies)}</FlexContainer>
      </CenterContainer>
    </Container>
  );
}

export default BrowseAllSection;
