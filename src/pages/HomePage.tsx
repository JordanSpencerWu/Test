import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

import { useAppStateDispatch, useAppState } from "hooks/useAppState";

import {
  setByGenres,
  setMovieGenres,
  setPopularMovies,
  setTop5PopularMovies,
} from "hooks/useAppState/actionCreators";
import MovieService from "services/MovieService";
import Top5Section from "./HomePage/Top5Section";
import ByGenreSection from "./HomePage/ByGenreSection";
import BrowseAllSection from "./HomePage/BrowseAllSection";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

function HomePage(): ReactElement {
  const state = useAppState();
  const dispatch = useAppStateDispatch();

  const { byGenres, popularMovies, top5PopularMovies, movieGenres } = state;

  const fetchMovies = useCallback(async () => {
    const popularMovies = await MovieService.getPopular();
    const top5PopularMovies = popularMovies.slice(0, 5);

    dispatch(setPopularMovies(popularMovies));
    dispatch(setTop5PopularMovies(top5PopularMovies));
  }, [dispatch]);

  const fetchMovieGenres = useCallback(async () => {
    const { movieGenres, byGenres } = await MovieService.getMovieGenres();

    dispatch(setMovieGenres(movieGenres));
    dispatch(setByGenres(byGenres));
  }, [dispatch]);

  useEffect(() => {
    if (popularMovies === null) {
      fetchMovies();
    }

    if (movieGenres === null) {
      fetchMovieGenres();
    }
  }, [fetchMovies, fetchMovieGenres, popularMovies, movieGenres]);

  return (
    <Container>
      {top5PopularMovies && (
        <Top5Section movies={top5PopularMovies} movieGenres={movieGenres} />
      )}
      {byGenres && <ByGenreSection genres={byGenres} />}
      {popularMovies && <BrowseAllSection movies={popularMovies} />}
    </Container>
  );
}

export default HomePage;
