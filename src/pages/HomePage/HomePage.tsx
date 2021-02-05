import React, { ReactElement, useCallback, useEffect } from "react";
import styled from "styled-components";

import { useAppStateDispatch, useAppState } from "hooks/useAppState";
import { useWindowDimensions } from "hooks/useWindowDimensions";

import MovieImage from "components/MovieImage";
import { setTop5PopularMovies } from "hooks/useAppState/actionCreators";
import MovieService from "services/MovieService";

const CONTAINER_MARGIN_LENGTH = 32;
const MOVIE_CONTAINER_MARGIN_LENGTH = 12;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 ${CONTAINER_MARGIN_LENGTH}px;
`;

const MoviesContainer = styled.div`
  display: flex;
`;

const MovieContainer = styled.div`
  display: flex;
  margin: 0 ${MOVIE_CONTAINER_MARGIN_LENGTH}px;
`;

const Top5PopularMoviesHeader = styled.h2``;

const GraySubText = styled.span`
  color: #d0d0d0;
`;

function HomePage(): ReactElement {
  const state = useAppState();
  const dispatch = useAppStateDispatch();
  const { width } = useWindowDimensions();
  console.log(width);

  const fetchMovies = useCallback(async () => {
    const popularMovies = await MovieService.getPopular();
    const top5PopularMovies = popularMovies.slice(0, 5);

    dispatch(setTop5PopularMovies(top5PopularMovies));
  }, [dispatch]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const { top5PopularMovies } = state;

  const showMovies = (movies) =>
    movies.map((movie) => {
      const { id, title, vote_average, poster_path } = movie;
      return (
        <MovieContainer>
          <MovieImage
            alt={title}
            width={120}
            height={180}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          />
        </MovieContainer>
      );
    });

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
