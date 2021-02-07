import React from "react";
import styled from "styled-components";

import PopularMovie from "./PopularMovie";
import { useWindowDimensions } from "hooks/useWindowDimensions";

const GRAY_COLOR = "#bbbaba";
const MOVIE_CONTAINER_MARGIN_LENGTH = 8;
const NUMBER_OF_MOVIES_IN_A_ROW = 5;
const TOTAL_CONTAINER_PADDING = 300;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Top5PopularMoviesHeader = styled.h2`
  margin-left: 20px;
  margin-top: 32px;
`;

const GraySubText = styled.span`
  color: ${GRAY_COLOR};
`;

const CenterContainer = styled.div`
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
`;

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  genre_ids: Array<number>;
}

interface Top5SectionProps {
  movies: Array<Movie>;
  movieGenres: object;
}

function Top5Section(props: Top5SectionProps): ReactElement {
  const { movies, movieGenres } = props;

  const { width } = useWindowDimensions();

  const imageWidth =
    (width - (MOVIE_CONTAINER_MARGIN_LENGTH * 4 + TOTAL_CONTAINER_PADDING)) /
    NUMBER_OF_MOVIES_IN_A_ROW;
  const imageHeight = imageWidth * 1.4;

  const showMovies = (movies) =>
    movies.map((movie) => (
      <PopularMovie
        key={movie.id}
        movie={movie}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        movieGenres={movieGenres}
        marginLength={MOVIE_CONTAINER_MARGIN_LENGTH}
      />
    ));

  return (
    <Container>
      <CenterContainer>
        <Top5PopularMoviesHeader>
          <GraySubText>Movies:</GraySubText> Top 5
        </Top5PopularMoviesHeader>
        <FlexContainer>{showMovies(movies)}</FlexContainer>
      </CenterContainer>
    </Container>
  );
}

export default Top5Section;
