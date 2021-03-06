import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import {
  setByGenres,
  setMovieGenres,
  setMoviesByGenre,
} from "hooks/useAppState/actionCreators";
import MovieService from "services/MovieService";
import { useAppStateDispatch, useAppState } from "hooks/useAppState";
import { SORT_OPTIONS, sortMovies } from "utils/sortMovies";
import chunkArray from "utils/chunkArray";
import path from "utils/path";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { LIGHT_GRAY_COLOR } from "utils/colors";

import { ReactComponent as BackArrowSvg } from "assets/back-arrow.svg";
import SelectInput from "components/SelectInput";
import Image from "components/Image";

const CONTAINER_PADDING = 32;
const TOTAL_CONTAINER_PADDING = CONTAINER_PADDING * 2;
const NUMBER_OF_MOVIES_IN_A_ROW = 5;
const MARGIN_LENGTH = 16;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${CONTAINER_PADDING}px 75px;
`;

const BackAndSortSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackArrow = styled(BackArrowSvg)`
  color: ${LIGHT_GRAY_COLOR};
  cursor: pointer;
  margin-right: 16px;
`;

const MoviesHeader = styled.h2`
  margin: 0;
`;

const GraySubText = styled.span`
  color: ${LIGHT_GRAY_COLOR};
`;

const SortForm = styled.form`
  display: flex;
  align-items: flex-end;
`;

const SortLabel = styled.label`
  font-size: 18px;
  color: ${LIGHT_GRAY_COLOR};
  margin-right: 12px;
  line-height: 1.8;
`;

const Row = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  width: ${({ width }) => width}px;
  min-width: 150px;
  max-width: 350px;
  margin-bottom: 8px;

  &:not(:last-child) {
    margin-right: ${({ marginLength }) => marginLength}px;
  }
`;

function DiscoverPage(): ReactElement {
  const { moviesByGenreLookUp, movieGenres } = useAppState();
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const dispatch = useAppStateDispatch();
  const location = useLocation();
  const history = useHistory();
  const { width } = useWindowDimensions();

  const queryString = new URLSearchParams(location.search);
  const genreId = queryString.get("genreId");
  const moviesByGenre = moviesByGenreLookUp[genreId];
  const fetchMovieGenres = useCallback(async () => {
    const { movieGenres, byGenres } = await MovieService.getMovieGenres();

    dispatch(setMovieGenres(movieGenres));
    dispatch(setByGenres(byGenres));
  }, [dispatch]);

  const fetchMoviesByGenres = useCallback(async () => {
    const movies = await MovieService.getMoviesByGenre(genreId);

    dispatch(setMoviesByGenre(genreId, movies));
  }, [dispatch, genreId]);

  useEffect(() => {
    if (movieGenres === null) {
      fetchMovieGenres();
    }

    if (moviesByGenre === undefined) {
      fetchMoviesByGenres();
    }
  }, [fetchMovieGenres, fetchMoviesByGenres, movieGenres, moviesByGenre]);

  if (movieGenres === null || moviesByGenre === undefined) return null;

  const genreText = movieGenres[genreId];
  const sortedMovies = sortMovies(moviesByGenre, sortBy);
  const chunkMovies = chunkArray(sortedMovies, NUMBER_OF_MOVIES_IN_A_ROW);

  const imageWidth =
    (width - (MARGIN_LENGTH * 4 + TOTAL_CONTAINER_PADDING + 105)) /
    NUMBER_OF_MOVIES_IN_A_ROW;
  const imageHeight = imageWidth * 1.4;

  const showMovieImages = (movies) =>
    movies.map((movie) => (
      <ImageContainer
        key={movie.id}
        marginLength={MARGIN_LENGTH}
        width={imageWidth}
      >
        <Image
          to={path.toDetail(movie.id)}
          alt={movie.title}
          height={imageHeight}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
      </ImageContainer>
    ));

  const showMovies = (chunkMovies) =>
    chunkMovies.map((movies, index) => (
      <Row key={index}>{showMovieImages(movies)}</Row>
    ));

  return (
    <Container>
      <BackAndSortSection>
        <MoviesHeader>
          <BackArrow onClick={() => history.goBack()} />
          <GraySubText>Movies:</GraySubText> {genreText}
        </MoviesHeader>
        <SortForm>
          <SortLabel>Sort by</SortLabel>
          <SelectInput
            options={SORT_OPTIONS}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </SortForm>
      </BackAndSortSection>
      <MoviesContainer>{showMovies(chunkMovies)}</MoviesContainer>
    </Container>
  );
}

export default DiscoverPage;
