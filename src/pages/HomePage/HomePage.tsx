import React, { ReactElement, useCallback, useEffect } from "react";
import styled from "styled-components";

import { useAppStateDispatch, useAppState } from "hooks/useAppState";
import { useWindowDimensions } from "hooks/useWindowDimensions";

import PopularMovie from "components/PopularMovie";
import {
  setByGenres,
  setMovieGenres,
  setTop5PopularMovies,
} from "hooks/useAppState/actionCreators";
import MovieService from "services/MovieService";

const MOVIE_CONTAINER_MARGIN_LENGTH = 8;
const NUMBER_OF_MOVIES_IN_A_ROW = 5;
const CONTAINER_PADDING = 80;
const GRAY_COLOR = "#bbbaba";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  ${({ color }) => color && `background-color: ${color}`}
`;

const CenterContainer = styled.div`
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Top5PopularMoviesHeader = styled.h2`
  margin-left: 20px;
  margin-top: 32px;
`;

const GraySubText = styled.span`
  color: ${GRAY_COLOR};
`;

const GenreSubText = styled.span`
  margin: 0;
  font-weight: 400;
  font-size: 24px;
  color: ${GRAY_COLOR};
`;

const GenreHeader = styled.h2`
  margin: 0;
  font-size: 38px;
  font-weight: 600;
`;

const Genre = styled.a`
  padding: 20px 20px;
`;

function HomePage(): ReactElement {
  const state = useAppState();
  const dispatch = useAppStateDispatch();
  const { width } = useWindowDimensions();

  const fetchMovies = useCallback(async () => {
    const popularMovies = await MovieService.getPopular();
    const top5PopularMovies = popularMovies.slice(0, 5);

    dispatch(setTop5PopularMovies(top5PopularMovies));
  }, [dispatch]);

  const fetchMovieGenres = useCallback(async () => {
    const { movieGenres, byGenres } = await MovieService.getMovieGenres();

    dispatch(setMovieGenres(movieGenres));
    dispatch(setByGenres(byGenres));
  }, [dispatch]);

  useEffect(() => {
    fetchMovies();
    fetchMovieGenres();
  }, [fetchMovies, fetchMovieGenres]);

  const { byGenres, top5PopularMovies, movieGenres } = state;
  const imageWidth =
    (width - (MOVIE_CONTAINER_MARGIN_LENGTH * 4 + CONTAINER_PADDING)) /
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

  const showByGenres = (genres) =>
    genres.map((genre) => <Genre key={genre.id}>{genre.name}</Genre>);

  return (
    <Container>
      <Section>
        <CenterContainer>
          <Top5PopularMoviesHeader>
            <GraySubText>Movies:</GraySubText> Top 5
          </Top5PopularMoviesHeader>
          <FlexContainer>
            {top5PopularMovies && showMovies(top5PopularMovies)}
          </FlexContainer>
        </CenterContainer>
      </Section>
      <Section color="rgb(244, 245, 251)">
        <div>
          <GenreHeader>
            <GenreSubText>Browser</GenreSubText>
            <br />
            by Genre
          </GenreHeader>
          <FlexContainer>{byGenres && showByGenres(byGenres)}</FlexContainer>
        </div>
      </Section>
    </Container>
  );
}

export default HomePage;
