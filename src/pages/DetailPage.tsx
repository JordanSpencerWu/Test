import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import MovieService from "services/MovieService";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useAppStateDispatch, useAppState } from "hooks/useAppState";
import {
  setMovieDetail,
  setMovieCredit,
} from "hooks/useAppState/actionCreators";

import { ReactComponent as BackArrowSvg } from "assets/back-arrow.svg";
import Image from "components/Image";
import MovieDetailSection from "./DetailPage/MovieDetailSection";
import CastSection from "./DetailPage/CastSection";

const CONTAINER_PADDING = 32;
const TOTAL_CONTAINER_PADDING = CONTAINER_PADDING * 2;
const MOVIE_IMAGE_MARGIN_LENGTH = 32;
const CAST_IMAGE_MARGIN_LENGTH = 12;
const GRAY_COLOR = "#bbbaba";
const NUMBER_OF_CAST_IN_A_ROW = 6;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  width: 100%;
`;

const ImageContainer = styled.div`
  width: ${({ width }) => width}px;
  margin-right: ${({ marginLength }) => marginLength}px;
`;

const BackArrow = styled(BackArrowSvg)`
  color: %{GRAY_COLOR};
  cursor: pointer;
  margin-right: 16px;
`;

function DetailPage(): ReactElement {
  const { movieDetailLookUp, movieCreditLookUp } = useAppState();
  const dispatch = useAppStateDispatch();
  const history = useHistory();
  const { movieId } = useParams();
  const { width } = useWindowDimensions();

  const movieDetail = movieDetailLookUp[movieId];
  const movieCredit = movieCreditLookUp[movieId];

  const fetchMovieDetail = useCallback(async () => {
    const detail = await MovieService.getMovieDetail(movieId);

    dispatch(setMovieDetail(detail));
  }, [dispatch, movieId]);

  const fetchMovieCredit = useCallback(async () => {
    const { id, cast, crew } = await MovieService.getMovieCredit(movieId);

    dispatch(setMovieCredit(id, cast, crew));
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movieDetailLookUp === {} || movieDetail === undefined) {
      fetchMovieDetail();
    }

    if (movieCreditLookUp === {} || movieCredit === undefined) {
      fetchMovieCredit();
    }
  }, [
    fetchMovieDetail,
    fetchMovieCredit,
    movieDetailLookUp,
    movieCreditLookUp,
    movieDetail,
    movieCredit,
    movieId,
  ]);

  if (movieDetail === undefined || movieCredit === undefined) {
    return null;
  }

  const { title, poster_path } = movieDetail;
  const { cast, crew } = movieCredit;

  const sideDetailWidth = (width - TOTAL_CONTAINER_PADDING) * 0.6;
  const movieImageWidth =
    width -
    TOTAL_CONTAINER_PADDING -
    MOVIE_IMAGE_MARGIN_LENGTH -
    sideDetailWidth;
  const movieImageHeight = movieImageWidth * 1.025;

  const castImageWidth =
    (width -
      (TOTAL_CONTAINER_PADDING +
        CAST_IMAGE_MARGIN_LENGTH * (NUMBER_OF_CAST_IN_A_ROW - 1) +
        105)) /
    NUMBER_OF_CAST_IN_A_ROW;
  const castImageHeight = castImageWidth * 1.04;

  return (
    <Container>
      <BackSection>
        <BackArrow onClick={() => history.goBack()} />
        <MoviesHeader>
          <GraySubText>Movies:</GraySubText> Top 5
        </MoviesHeader>
      </BackSection>
      <DetailSection>
        <ImageContainer
          width={movieImageWidth}
          marginLength={MOVIE_IMAGE_MARGIN_LENGTH}
        >
          <Image
            alt={title}
            height={movieImageHeight}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          />
        </ImageContainer>
        <MovieDetailSection movieDetail={movieDetail} crew={crew} />
      </DetailSection>
      <CastSection
        cast={cast}
        imageHeight={castImageHeight}
        imageWidth={castImageWidth}
        marginLeft={CAST_IMAGE_MARGIN_LENGTH}
      />
    </Container>
  );
}

export default DetailPage;
