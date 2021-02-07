import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import {
  setByGenres,
  setMovieGenres,
  setMoviesByGenre,
} from "hooks/useAppState/actionCreators";
import MovieService from "services/MovieService";
import { useAppStateDispatch, useAppState } from "hooks/useAppState";
import { ReactComponent as BackArrowSvg } from "assets/back-arrow.svg";
import SelectInput from "components/SelectInput";
import { SORT_OPTIONS, sortMovies } from "utils/sortMovies";

const CONTAINER_PADDING = 32;
const GRAY_COLOR = "#bbbaba";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${CONTAINER_PADDING}px 75px;
`;

const BackAndSortSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackArrow = styled(BackArrowSvg)`
  color: %{GRAY_COLOR};
  cursor: pointer;
  margin-right: 16px;
`;

const MoviesHeader = styled.h2`
  margin: 0;
`;

const GraySubText = styled.span`
  color: ${GRAY_COLOR};
`;

const SortForm = styled.form`
  display: flex;
  align-items: flex-end;
`;

const SortLabel = styled.label`
  font-size: 18px;
  color: ${GRAY_COLOR};
  margin-right: 12px;
  line-height: 1.8;
`;

function DiscoverPage(): ReactElement {
  const { moviesByGenre, movieGenres } = useAppState();
  const dispatch = useAppStateDispatch();
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const history = useHistory();

  const fetchMovieGenres = useCallback(async () => {
    const { movieGenres, byGenres } = await MovieService.getMovieGenres();

    dispatch(setMovieGenres(movieGenres));
    dispatch(setByGenres(byGenres));
  }, [dispatch]);

  const fetchMoviesByGenres = useCallback(async () => {
    const movies = await MovieService.getMoviesByGenre();

    dispatch(setMoviesByGenre(movies));
  }, [dispatch]);

  useEffect(() => {
    if (movieGenres === null) {
      fetchMovieGenres();
    }

    if (moviesByGenre === null) {
      fetchMoviesByGenres();
    }
  }, [fetchMovieGenres, fetchMoviesByGenres, movieGenres, moviesByGenre]);

  if (movieGenres === null || moviesByGenre === null) return null;

  const genreId = queryString.get("genreId");
  const genreText = movieGenres[genreId];

  return (
    <Container>
      <BackAndSortSection>
        <MoviesHeader>
          <BackArrow onClick={() => history.goBack()} />
          <GraySubText>Movies:</GraySubText> {genreText}
        </MoviesHeader>
        <SortForm>
          <SortLabel>Sort by</SortLabel>
          <SelectInput options={SORT_OPTIONS} />
        </SortForm>
      </BackAndSortSection>
    </Container>
  );
}

export default DiscoverPage;
