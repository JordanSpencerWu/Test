import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import path from "utils/path";
import Image from "components/Image";
import { ReactComponent as StarSvg } from "assets/star.svg";

const STAR_SIZE = 12;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width}px;
  min-width: 150px;
  max-width: 250px;
  padding: 18px;
  margin-bottom: 32px;
  justify-content: space-between;

  &:not(:last-child) {
    margin-right: ${({ marginLength }) => marginLength}px;
  }

  &:hover {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
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

const RatingText = styled.p`
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

const DetailButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  padding: 10px;
  color: white;
  background-color: #2245e1;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  border: 0;

  visibility: ${({ hover }) => (hover ? "visible" : "hidden")};
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

  const [hover, setHover] = useState(false);

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
    <MovieContainer
      width={imageWidth}
      marginLength={marginLength}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        <Image
          to={path.toDetail(id)}
          alt={title}
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
      </div>
      <Link to={path.toDetail(id)}>
        <DetailButton hover={hover}>View Details</DetailButton>
      </Link>
    </MovieContainer>
  );
}

export default PopularMovie;
