import React, { useState } from "react";
import styled from "styled-components";

import MovieImage from "components/MovieImage";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { SORT_OPTIONS, sortMovies } from "utils/sortingMovies";

const GRAY_COLOR = "#bbbaba";
const NUMBER_OF_MOVIES_IN_A_ROW = 5;
const MOVIE_CONTAINER_MARGIN_LENGTH = 16;
const TOTAL_CONTAINER_PADDING = 150;

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

const SectionTitleAndSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

const SectionSubText = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 24px;
  color: ${GRAY_COLOR};
`;

const SectionHeader = styled.h2`
  margin: 0;
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

const SortSelect = styled.select`
  width: 150px;
  height: 32px;
  padding-left: 8px;
`;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: Array<number>;
  popularity: number;
  vote_average: number;
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

const renderOptions = () =>
  SORT_OPTIONS.map((option) => <option>{option}</option>);

function BrowseAllSection(props: BrowseAllSectionProps): ReactElement {
  const { movies } = props;

  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const { width } = useWindowDimensions();

  const sortedMovies = sortMovies(movies, sortBy);

  const chunkMovies = chunkArray(sortedMovies, NUMBER_OF_MOVIES_IN_A_ROW);
  const imageWidth =
    (width - (MOVIE_CONTAINER_MARGIN_LENGTH * 4 + TOTAL_CONTAINER_PADDING)) /
    NUMBER_OF_MOVIES_IN_A_ROW;
  const imageHeight = imageWidth * 1.4;

  const showMovieImages = (movies) =>
    movies.map((movie) => (
      <MovieImageContainer
        key={movie.id}
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
        <SectionTitleAndSortContainer>
          <div>
            <SectionSubText>Movies</SectionSubText>
            <SectionHeader>Browse All</SectionHeader>
          </div>
          <SortForm>
            <SortLabel>Sort by</SortLabel>
            <SortSelect onChange={(e) => setSortBy(e.target.value)}>
              {renderOptions()}
            </SortSelect>
          </SortForm>
        </SectionTitleAndSortContainer>
        <FlexContainer>{showMovies(chunkMovies)}</FlexContainer>
      </CenterContainer>
    </Container>
  );
}

export default BrowseAllSection;
