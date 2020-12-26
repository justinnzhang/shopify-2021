import React from 'react';
import PropTypes from 'prop-types';

// Shopify Polaris Components
import {
  Button,
  Card,
  TextStyle,
  DisplayText,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonThumbnail,
  ButtonGroup,
  Badge,
  MediaCard,
} from '@shopify/polaris';

// Icons - React Icons
import { IconContext } from 'react-icons';
import { BiDetail } from 'react-icons/bi';
import { IoIosAddCircleOutline } from 'react-icons/io';

// Custom components & CSS
import './components.css';
import Spacer from './Spacer';

// Custom animation components
import FadeUpParent from '../animation/FadeUpParent';
import FadeUpChildren from '../animation/FadeUpChildren';

const MovieList = ({
  movieData,
  searchData,
  searchTerm,
  isLoading,
  nominationList,
  callback,
  loadMovieDetails,
}) => {
  // Checks to see if a movie as been nominated, returns true or false
  function movieExists(id) {
    return nominationList.some(function (el) {
      return el.id === id;
    });
  }

  // Loading state - skeleton
  if (isLoading) {
    return (
      <>
        <SkeletonDisplayText size='small' />
        <Spacer />
        <Card>
          <Card.Section>
            <div className='row'>
              <div className='col-25'>
                <SkeletonThumbnail size='medium' />
              </div>
              <div className='col-75'>
                <SkeletonBodyText />
              </div>
            </div>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <div className='row'>
              <div className='col-25'>
                <SkeletonThumbnail size='medium' />
              </div>
              <div className='col-75'>
                <SkeletonBodyText />
              </div>
            </div>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <div className='row'>
              <div className='col-25'>
                <SkeletonThumbnail size='medium' />
              </div>
              <div className='col-75'>
                <SkeletonBodyText />
              </div>
            </div>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <div className='row'>
              <div className='col-25'>
                <SkeletonThumbnail size='medium' />
              </div>
              <div className='col-75'>
                <SkeletonBodyText />
              </div>
            </div>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <div className='row'>
              <div className='col-25'>
                <SkeletonThumbnail size='medium' />
              </div>
              <div className='col-75'>
                <SkeletonBodyText />
              </div>
            </div>
          </Card.Section>
        </Card>
      </>
    );
  }

  // Loaded state
  return (
    <FadeUpParent>
      <DisplayText size='small'>
        Found {parseInt(searchData.totalResults)} results for "{searchTerm}"
      </DisplayText>
      <Spacer />
      {movieData.map((element, key) => (
        <Card key={`${element.Title} - Display Card @ ${key}`}>
          <FadeUpChildren>
            <Card.Section>
              <div className='row'>
                <div className='col-25'>
                  <img
                    src={element.Poster}
                    className='poster'
                    alt={`Movie poster for ${element.Title}`}
                  />
                </div>
                <div className='col-75 p-2'>
                  <TextStyle variation='positive'>
                    {movieExists(element.imdbID) ? (
                      <Badge status='success'>Nominated</Badge>
                    ) : (
                      ''
                    )}
                  </TextStyle>
                  <DisplayText size='medium' variation='strong'>
                    {element.Title}
                  </DisplayText>
                  <DisplayText size='small'>
                    <TextStyle variation='subdued'>{element.Year}</TextStyle>
                  </DisplayText>

                  <Spacer />

                  <ButtonGroup>
                    <Button
                      primary
                      onClick={() => loadMovieDetails(element.imdbID)}
                      icon={
                        <IconContext.Provider
                          value={{ style: { verticalAlign: '-0.2em' } }}
                        >
                          <BiDetail />
                        </IconContext.Provider>
                      }
                    >
                      Info
                    </Button>
                    <Button
                      onClick={() =>
                        callback(
                          element.imdbID,
                          element.Title,
                          element.Year,
                          element.Poster
                        )
                      }
                      disabled={
                        movieExists(element.imdbID) ||
                        nominationList.length === 5
                          ? true
                          : false
                      }
                      icon={
                        <IconContext.Provider
                          value={{ style: { verticalAlign: '-0.2em' } }}
                        >
                          <IoIosAddCircleOutline />
                        </IconContext.Provider>
                      }
                    >
                      Nominate
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card.Section>
          </FadeUpChildren>
        </Card>
      ))}
    </FadeUpParent>
  );
};

MovieList.propTypes = {
  total: PropTypes.number.isRequired,
  movieData: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  nominationList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

MovieList.defaultProps = {
  total: 0,
  movieData: [],
  searchTerm: 'N/A',
  nominationList: [],
  isLoading: true,
};

export default MovieList;
