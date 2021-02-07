import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useAppStateDispatch, useAppState } from "hooks/useAppState";
import path from "utils/path";
import { ReactComponent as BackArrowSvg } from "assets/back-arrow.svg";
import { setMovieDetail } from "hooks/useAppState/actionCreators";
import MovieService from "services/MovieService";
import MovieImage from "components/MovieImage";
import { ReactComponent as StarSvg } from "assets/star.svg";

const CONTAINER_PADDING = 32;
const TOTAL_CONTAINER_PADDING = CONTAINER_PADDING * 2;
const MARGIN_LENGTH = 32;
const STAR_SIZE = 24;
const GRAY_COLOR = "#bbbaba";
const DARK_GRAY_COLOR = "#63727d";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: ${CONTAINER_PADDING}px 75px;
`;

const MoviesHeader = styled.h2`
  margin: 0;
`;

const GraySubText = styled.span`
  color: ${GRAY_COLOR};
`;

const BackSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const DetailSection = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  width: ${({ width }) => width}px;
  margin-right: ${({ marginLength }) => marginLength}px;
`;

const DetailContainer = styled.div`
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
  color: ${GRAY_COLOR};
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
  color: ${GRAY_COLOR};
  font-size: 48px;
  font-weight: 200;
`;

const MovieGenreText = styled.p`
  margin: 0;
  font-size: 24px;
  color: ${DARK_GRAY_COLOR};
`;

const MovieOverviewText = styled.p`
  font-size: 20;
  font-weight: normal;
  line-height: 18px;
  color: ${DARK_GRAY_COLOR};
`;

const BackArrow = styled(BackArrowSvg)`
  color: %{GRAY_COLOR};
  margin-right: 16px;
`;

function MovieDetailPage(props): ReactElement {
  const state = useAppState();
  const dispatch = useAppStateDispatch();
  const { movieId } = useParams();
  const { width } = useWindowDimensions();

  const { movieDetailLookUp } = state;

  const movieDetail = movieDetailLookUp[movieId];

  const fetchMovieDetail = useCallback(async () => {
    const detail = await MovieService.getMovieDetail(movieId);

    dispatch(setMovieDetail(detail));
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movieDetailLookUp === {}) {
      fetchMovieDetail();
    }

    if (movieDetailLookUp && movieDetailLookUp[movieId] === undefined) {
      fetchMovieDetail();
    }
  }, [fetchMovieDetail, movieDetailLookUp, movieId]);

  if (movieDetail === undefined) {
    return <div>Fetching...</div>;
  }

  const {
    title,
    poster_path,
    vote_average,
    release_date,
    genres,
    overview,
  } = movieDetail;

  const sideDetailWidth = (width - TOTAL_CONTAINER_PADDING) * 0.72;
  const imageWidth =
    width - TOTAL_CONTAINER_PADDING - MARGIN_LENGTH - sideDetailWidth;
  const imageHeight = imageWidth * 1.4;

  const year = release_date.split("-")[0];
  const rating = vote_average.toFixed(1);
  const genreText = genres.map((genre) => genre.name).join(", ");

  console.log(movieDetail);

  return (
    <Container>
      <BackSection>
        <Link to={path.toHome()}>
          <BackArrow />
        </Link>
        <MoviesHeader>
          <GraySubText>Movies:</GraySubText> Top 5
        </MoviesHeader>
      </BackSection>
      <DetailSection>
        <ImageContainer width={imageWidth} marginLength={MARGIN_LENGTH}>
          <MovieImage
            alt={title}
            height={imageHeight}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          />
        </ImageContainer>
        <DetailContainer>
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
          <MovieOverviewText>{overview}</MovieOverviewText>
        </DetailContainer>
      </DetailSection>
    </Container>
  );
}

export default MovieDetailPage;
