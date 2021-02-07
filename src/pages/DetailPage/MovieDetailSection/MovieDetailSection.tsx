import React from "react";
import styled from "styled-components";

import { LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from "utils/colors";

import { ReactComponent as StarSvg } from "assets/star.svg";

const STAR_SIZE = 24;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RatingText = styled.p`
  margin: 8px 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  color: blue;
`;

const RatingSubText = styled.span`
  color: ${LIGHT_GRAY_COLOR};
  font-size: 18px;
  font-weight: 400;
  margin-left: 4px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;s
`;

const Star = styled(StarSvg)`
  height: ${STAR_SIZE}px;
  width: ${STAR_SIZE}px;
  margin-right: 4px;
`;

const MovieTitleText = styled.h1`
  font-size: 42px;
  font-weight: 600;
  margin: 12px 0;
`;

const MovieYearSubText = styled.span`
  color: ${LIGHT_GRAY_COLOR};
  font-size: 48px;
  font-weight: 200;
`;

const MovieGenreText = styled.p`
  margin: 0;
  font-size: 24px;
  color: ${DARK_GRAY_COLOR};
`;

const MovieDirectorText = styled.p`
  margin: 42px 0 10px 0;
  font-size: 16;
  font-weight: 600;
`;

const MovieOverviewText = styled.p`
  margin: 0;
  font-size: 20;
  font-weight: normal;
  line-height: 18px;
  color: ${DARK_GRAY_COLOR};
`;

interface Genre {
  id: number;
  name: string;
}

interface MovieDetail {
  title: string;
  vote_average: number;
  release_date: string;
  genres: Array<Genre>;
  overview: string;
}

interface Crew {
  job: string;
  name: string;
}

interface MovieDetailSectionProps {
  movieDetail: MovieDetail;
  crew: Array<Crew>;
}

function MovieDetailSection(props: MovieDetailSectionProps): ReactElement {
  const { movieDetail, crew } = props;

  const { title, vote_average, release_date, genres, overview } = movieDetail;

  const year = release_date.split("-")[0];
  const rating = vote_average.toFixed(1);
  const genreText = genres.map((genre) => genre.name).join(", ");
  const director = crew.find((c) => c.job === "Director");

  return (
    <Container>
      <RatingContainer>
        <Star />
        <RatingText>
          {rating}
          <RatingSubText>/10</RatingSubText>
        </RatingText>
      </RatingContainer>
      <MovieTitleText>
        {title} <MovieYearSubText>{`(${year})`}</MovieYearSubText>
      </MovieTitleText>
      <MovieGenreText>{genreText}</MovieGenreText>
      <MovieDirectorText>Dicector: {director.name}</MovieDirectorText>
      <MovieOverviewText>{overview}</MovieOverviewText>
    </Container>
  );
}

export default MovieDetailSection;
