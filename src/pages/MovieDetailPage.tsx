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

const CONTAINER_PADDING = 32;
const TOTAL_CONTAINER_PADDING = CONTAINER_PADDING * 2;

const GRAY_COLOR = "#bbbaba";

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
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
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

  const sideDetailWidth = (width - TOTAL_CONTAINER_PADDING) * 0.6;
  const imageWidth = width - TOTAL_CONTAINER_PADDING - sideDetailWidth;

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
        <ImageContainer width={imageWidth}>
          <MovieImage
            alt={movieDetail.title}
            height={490}
            src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
          />
        </ImageContainer>
        <DetailContainer></DetailContainer>
      </DetailSection>
    </Container>
  );
}

export default MovieDetailPage;