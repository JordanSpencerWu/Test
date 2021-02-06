import React from "react";
import styled from "styled-components";

import MovieImage from "components/MovieImage";
import { ReactComponent as StarSvg } from "assets/star.svg";

const STAR_SIZE = 12;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width}px;
  min-width: 150px;
  max-width: 250px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: ${({ marginLength }) => marginLength}px;
  }
`;

const TitleAndRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleAndGenreContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const MoveTitleText = styled.h3`
  font-size: 1.25em;
  front-weight: 600;
  margin: 8px 0;
  line-height: 1;
`;

const RatingText = styled.span`
  margin: 8px 0;
  color: blue;
`;

const GenreSubText = styled.p`
  color: #a0a0a0;
  font-size: 15px;
  font-weight: 200;
  margin: 0;
`;

const Star = styled(StarSvg)`
  height: ${STAR_SIZE}px;
  width: ${STAR_SIZE}px;
  margin-right: 4px;
`;

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  genre_ids: Array<number>;
}

interface PopularMovieProps {
  movie: Movie;
  imageWidth: number;
  imageHeight: number;
  movieGenres: object;
  marginLength: number;
}

function PopularMovie(props: PopularMovieProps): ReactElement {
  const { movieGenres, marginLength, movie, imageHeight, imageWidth } = props;
  const { id, title, vote_average, poster_path, genre_ids } = movie;
  const rating = vote_average.toFixed(1);
  const genreText = genre_ids
    .map((id) => {
      if (movieGenres) {
        return movieGenres[id] || "";
      }

      return "";
    })
    .join(", ");

  return (
    <MovieContainer width={imageWidth} marginLength={marginLength} key={id}>
      <MovieImage
        alt={title}
        width={imageWidth}
        height={imageHeight}
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
      />
      <TitleAndRatingContainer>
        <TitleAndGenreContainer>
          <MoveTitleText>{title}</MoveTitleText>
          <GenreSubText>{genreText}</GenreSubText>
        </TitleAndGenreContainer>
        <RatingText>
          <Star />
          {rating}
        </RatingText>
      </TitleAndRatingContainer>
    </MovieContainer>
  );
}

export default PopularMovie;
