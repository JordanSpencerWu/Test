import React, { useState } from "react";
import styled from "styled-components";

import { useWindowDimensions } from "hooks/useWindowDimensions";
import { SORT_OPTIONS, sortMovies } from "utils/sortMovies";
import chunkArray from "utils/chunkArray";
import path from "utils/path";
import { LIGHT_GRAY_COLOR } from "utils/colors";

import Image from "components/Image";
import SelectInput from "components/SelectInput";

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

const MoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleAndSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

const SectionSubText = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 24px;
  color: ${LIGHT_GRAY_COLOR};
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

const ImageContainer = styled.div`
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
  color: ${LIGHT_GRAY_COLOR};
  margin-right: 12px;
  line-height: 1.8;
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

function BrowseAllSection(props: BrowseAllSectionProps): ReactElement {
  const { movies } = props;

  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const { width } = useWindowDimensions();

  const sortedMovies = sortMovies(movies, sortBy);
  const chunkedMovies = chunkArray(sortedMovies, NUMBER_OF_MOVIES_IN_A_ROW);
  const imageWidth =
    (width - (MOVIE_CONTAINER_MARGIN_LENGTH * 4 + TOTAL_CONTAINER_PADDING)) /
    NUMBER_OF_MOVIES_IN_A_ROW;
  const imageHeight = imageWidth * 1.4;

  const showMovieImages = (movies) =>
    movies.map((movie) => (
      <ImageContainer
        key={movie.id}
        marginLength={MOVIE_CONTAINER_MARGIN_LENGTH}
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

  const showMovies = (chunkedMovies) =>
    chunkedMovies.map((movies, index) => (
      <Row key={index}>{showMovieImages(movies)}</Row>
    ));

  return (
    <Container>
      <CenterContainer>
        <TitleAndSortContainer>
          <div>
            <SectionSubText>Movies</SectionSubText>
            <SectionHeader>Browse All</SectionHeader>
          </div>
          <SortForm>
            <SortLabel>Sort by</SortLabel>
            <SelectInput
              onChange={(e) => setSortBy(e.target.value)}
              options={SORT_OPTIONS}
            />
          </SortForm>
        </TitleAndSortContainer>
        <MoviesContainer>{showMovies(chunkedMovies)}</MoviesContainer>
      </CenterContainer>
    </Container>
  );
}

export default BrowseAllSection;
