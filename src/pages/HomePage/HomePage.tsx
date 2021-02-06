import React, { ReactElement, useCallback, useEffect } from "react";
import styled from "styled-components";

import { useAppStateDispatch, useAppState } from "hooks/useAppState";
import { useWindowDimensions } from "hooks/useWindowDimensions";

import MovieImage from "components/MovieImage";
import PopularMovie from "components/PopularMovie";
import {
  setTop5PopularMovies,
  setMovieGenres,
} from "hooks/useAppState/actionCreators";
import MovieService from "services/MovieService";

const MOVIE_CONTAINER_MARGIN_LENGTH = 24;
const CONTAINER_PADDING = 80;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoviesContainer = styled.div`
  display: flex;
`;

const Top5PopularMoviesHeader = styled.h2``;

const GraySubText = styled.span`
  color: #d0d0d0;
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
    const movieGenres = await MovieService.getMovieGenres();

    dispatch(setMovieGenres(movieGenres));
  }, [dispatch]);

  useEffect(() => {
    fetchMovies();
    fetchMovieGenres();
  }, [fetchMovies, fetchMovieGenres]);

  const { top5PopularMovies, movieGenres } = state;

  const showMovies = (movies) => {
    const imageWidth =
      (width - (MOVIE_CONTAINER_MARGIN_LENGTH * 4 + CONTAINER_PADDING)) /
      top5PopularMovies.length;
    const imageHeight = imageWidth * 1.4;

    return movies.map((movie) => (
      <PopularMovie
        movie={movie}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        movieGenres={movieGenres}
        marginLength={MOVIE_CONTAINER_MARGIN_LENGTH}
      />
    ));
  };

  return (
    <Container>
      <Top5PopularMoviesHeader>
        <GraySubText>Movies:</GraySubText> Top 5
      </Top5PopularMoviesHeader>
      <MoviesContainer>
        {top5PopularMovies ? showMovies(top5PopularMovies) : <div>loading</div>}
      </MoviesContainer>
    </Container>
  );
}

export default HomePage;
