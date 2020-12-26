import React from 'react';
import PropTypes from 'prop-types';

// Shopify Polaris Components
import {
  SkeletonBodyText,
  SkeletonDisplayText,
  Card,
  TextContainer,
  DisplayText,
  TextStyle,
  Banner,
} from '@shopify/polaris';

// Custom components
import Spacer from './Spacer';
import PosterPlaceholder from './PosterPlaceholder';

// Custom animation components
import FadeUpParent from '../animation/FadeUpParent';
import FadeUpChildren from '../animation/FadeUpChildren';

const MovieDetails = ({ movieDetails, isLoadingDetails, errors }) => {
  // loading state - skeleton
  if (isLoadingDetails) {
    return (
      <>
        <div className='row'>
          <div
            className='col-30'
            style={{ paddingRight: '20px', position: 'sticky' }}
          >
            <PosterPlaceholder />
            <Spacer />
          </div>
          <div className='col-70'>
            <SkeletonDisplayText size='small' />

            <Spacer />

            <SkeletonBodyText />

            <Spacer />

            <div className='row'>
              <div className='col-50-s'>
                <Card sectioned>
                  <SkeletonDisplayText size='small' />
                </Card>
              </div>
              <div className='col-50-s'>
                <Card sectioned>
                  <SkeletonDisplayText size='small' />
                </Card>
              </div>
            </div>

            <Spacer />

            <TextContainer spacing='tight'>
              <SkeletonDisplayText size='small' />
              <SkeletonBodyText />
            </TextContainer>

            <Spacer />

            <TextContainer spacing='tight'>
              <SkeletonDisplayText size='small' />
              <SkeletonBodyText />
            </TextContainer>

            <Spacer />

            <TextContainer spacing='tight'>
              <SkeletonDisplayText size='small' />
              <SkeletonBodyText />
            </TextContainer>

            <Spacer />

            <TextContainer spacing='tight'>
              <SkeletonDisplayText size='small' />
              <SkeletonBodyText />
            </TextContainer>
          </div>
        </div>
      </>
    );
  }

  // If there's an error fetching the movie details, display this page.
  if (!isLoadingDetails && errors.detailsError) {
    return (
      <FadeUpParent>
        <TextContainer spacing='tight'>
          <FadeUpChildren>
            <DisplayText size='medium' variation='strong'>
              An error has occured
            </DisplayText>
          </FadeUpChildren>
        </TextContainer>
      </FadeUpParent>
    );
  }

  // Loaded state
  return (
    <FadeUpParent>
      <div className='row'>
        <div className='col-30' style={{ paddingRight: '20px' }}>
          <img
            src={movieDetails.Poster}
            alt={`Movie poster for ${movieDetails.Title}`}
            className='poster'
          />
          <Spacer />
        </div>
        <div className='col-70'>
          <TextContainer spacing='tight'>
            <FadeUpChildren>
              <DisplayText size='extraLarge' variation='strong'>
                {movieDetails.Title}{' '}
                <TextStyle variation='subdued'>({movieDetails.Year})</TextStyle>
              </DisplayText>{' '}
            </FadeUpChildren>
            <FadeUpChildren>
              <DisplayText size='medium'>
                {movieDetails.Rated} | {movieDetails.Runtime}
              </DisplayText>
            </FadeUpChildren>
            <FadeUpChildren>
              <DisplayText size='small'>
                <TextStyle variation='subdued'>
                  {`Genre${movieDetails.Genre.indexOf(',') ? 's:' : ':'} ${
                    movieDetails.Genre
                  }`}
                </TextStyle>
              </DisplayText>
            </FadeUpChildren>
          </TextContainer>

          <Spacer />

          <div className='row'>
            <div className='col-50-s'>
              <FadeUpChildren>
                <Card sectioned>
                  <TextContainer spacing='tight'>
                    <DisplayText size='small'>
                      <TextStyle variation='subdued'>IMBDb Score</TextStyle>
                    </DisplayText>
                    <DisplayText size='large'>
                      {movieDetails.imdbRating} / 10
                    </DisplayText>
                  </TextContainer>
                </Card>
              </FadeUpChildren>
            </div>
            <div className='col-50-s'>
              <FadeUpChildren>
                <Card sectioned>
                  <TextContainer spacing='tight'>
                    <DisplayText size='small'>
                      <TextStyle variation='subdued'>Box Office</TextStyle>
                    </DisplayText>
                    <DisplayText size='large'>
                      {movieDetails.BoxOffice}
                    </DisplayText>
                  </TextContainer>
                </Card>
              </FadeUpChildren>
            </div>
          </div>

          <Spacer />

          {movieDetails.Awards !== 'N/A' && (
            <FadeUpChildren>
              <Banner status='info'>
                <p>{movieDetails.Awards}</p>
              </Banner>
            </FadeUpChildren>
          )}

          <Spacer />

          <FadeUpChildren>
            <Card>
              <Card.Section>
                <DisplayText size='small'>
                  <TextStyle variation='strong'>{`Director${
                    movieDetails.Director.indexOf(',') > -1 ? 's: ' : ': '
                  }`}</TextStyle>
                  {movieDetails.Director}
                </DisplayText>
              </Card.Section>

              <Card.Section>
                <DisplayText size='small'>
                  <TextStyle variation='strong'>{`Writer${
                    movieDetails.Writer.indexOf(',') > -1 ? 's: ' : ': '
                  }`}</TextStyle>{' '}
                  {movieDetails.Writer}
                </DisplayText>
              </Card.Section>
              <Card.Section>
                <DisplayText size='small'>
                  <TextStyle variation='strong'>{`Actor${
                    movieDetails.Actors.indexOf(',') > -1 ? 's: ' : ': '
                  }`}</TextStyle>{' '}
                  {movieDetails.Actors}
                </DisplayText>
              </Card.Section>
            </Card>
          </FadeUpChildren>

          <Spacer />

          <FadeUpChildren>
            <Card sectioned>
              <TextContainer spacing='tight'>
                <DisplayText size='small'>
                  <TextStyle variation='strong'>Plot</TextStyle>
                </DisplayText>
                <DisplayText size='small'>
                  <TextStyle>{movieDetails.Plot}</TextStyle>
                </DisplayText>
              </TextContainer>
            </Card>
          </FadeUpChildren>
        </div>
      </div>
    </FadeUpParent>
  );
};

MovieDetails.propTypes = {
  movieDetails: PropTypes.object,
  errors: PropTypes.object.isRequired,
};

MovieDetails.defaultProps = {
  movieDetails: {},
  errors: {},
};

export default MovieDetails;
