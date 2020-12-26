import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

// Shopify Polaris Components
import {
  Button,
  Page,
  Layout,
  Card,
  TextField,
  EmptyState,
  TextStyle,
  Banner,
  Modal,
  Frame,
  DisplayText,
  Toast,
  Form,
  FooterHelp,
  Caption,
} from '@shopify/polaris';

// Icons - React Icons
import { IconContext } from 'react-icons';
import { IoSearchOutline } from 'react-icons/io5';

// Custom components & CSS
import '../App.css';
import Spacer from '../components/Spacer';
import MovieList from '../components/MovieList';
import NominationList from '../components/NominationList';
import MovieDetails from '../components/MovieDetails';

// Custom animation components
import { childFadeUp } from '../animation/Variants';
import FadeUpParent from '../animation/FadeUpParent';
import FadeUpChildren from '../animation/FadeUpChildren';

const Main = () => {
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // The 'page' that the api pulls from next
  const [searchPage, setSearchPage] = useState(1);

  // Information provided by the API
  const [searchData, setSearchData] = useState(null); // Search data including number of search results
  const [movieData, setMovieData] = useState(null); // Only the list of movies from the search term
  const [movieDetails, setMovieDetails] = useState(null); // Additional details when the user opens the movie details modal

  // Global errors variable
  const [errors, setErrors] = useState({});

  // Number of searches conducted - only used to show the empty states
  const [count, setCount] = useState(0);

  // Search terms
  const [value, setValue] = useState(''); // This hook is directly used for search and is passed to the API
  const [lastSearched, setLastSearched] = useState(''); // This is used to store the last successful search

  // Stores all nominated movies
  const [nominated, setNominated] = useState([]);

  // Search Bar functions
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  const handleClearButtonClick = useCallback(() => handleChange(''), []);

  // Movie details modal
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  // Toast indicator for completion of nominations
  const [activeToast, setActiveToast] = useState(false);
  const toggleActiveToast = useCallback(
    () => setActiveToast((activeToast) => !activeToast),
    []
  );
  const [toastMessage, setToastMessage] = useState('');

  const toastMarkup = activeToast ? (
    <Toast content={toastMessage} onDismiss={toggleActiveToast} />
  ) : null;

  useEffect(() => {
    if (localStorage.getItem('nominated')) {
      setToastMessage('Loaded previous nominations');
      setNominated(JSON.parse(localStorage.getItem('nominated')));
      toggleActiveToast();
    }
  }, []);

  // Function to search for a movie using the search term
  const searchMovies = async () => {
    setErrors({});
    setIsLoading(true);
    setSearchPage(1);
    setCount(count + 1);

    await axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${value}&type=movie`
      )
      .then((res) => {
        if (res.data.Error) {
          setErrors({ searchError: 'Movie not found' });
          setIsLoading(false);
        } else {
          setSearchData(res.data);
          setMovieData(res.data.Search);
          setIsLoading(false);

          setLastSearched(value);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors({ searchError: 'An error occured' });
      });
  };

  // Function to pull more movies, based on the last successful search term
  const loadMoreMovies = async () => {
    setIsLoadingMore(true);
    console.log(searchPage);
    await axios
      .get(
        `http://www.omdbapi.com/?apikey=${
          process.env.REACT_APP_API_KEY
        }&s=${lastSearched}&page=${searchPage + 1}&type=movie`
      )
      .then((res) => {
        if (res.data.Error) {
          setErrors({ loadError: 'You have reached the end' });
          setIsLoadingMore(false);
        } else {
          movieData.push(...res.data.Search);
          setIsLoadingMore(false);
          setSearchPage(searchPage + 1);
        }
      })
      .catch((err) => {
        setIsLoadingMore(false);
        setErrors({ loadError: 'An error occured' });
      });
  };

  // Function to add a nomination, pushing values from a temporary object
  function addNomination(id, Title, Year, Poster) {
    setErrors({});

    if (nominated.length === 5) {
      setErrors({
        nominationError: 'You can only nominate up to 5 movies.',
      });
    } else {
      const tempNominations = nominated;

      let temp = {
        id: id,
        Title: Title,
        Year: Year,
        Poster: Poster,
      };

      tempNominations.push(temp);

      if (tempNominations.length === 5) {
        setToastMessage('Maximum nominations reached');
        toggleActiveToast();
      }

      setNominated(tempNominations);
      localStorage.setItem('nominated', JSON.stringify(tempNominations));
    }
  }

  // Function to remove a nomination, used slice and new arrays in order to circumvent React's shallow re-rendering
  function removeNomination(index) {
    setErrors({});

    const temp1 = nominated;

    if (index === 0) {
      const ans = temp1.slice(1);

      setNominated(ans);
      localStorage.setItem('nominated', JSON.stringify(ans));
    } else if (index === temp1.length - 1) {
      const ans = temp1.slice(0, index);

      setNominated(ans);
      localStorage.setItem('nominated', JSON.stringify(ans));
    } else {
      const ans1 = temp1.slice(0, index);
      const ans2 = temp1.slice(index + 1, nominated.length);

      setNominated(ans1.concat(ans2));
      localStorage.setItem('nominated', JSON.stringify(ans1.concat(ans2)));
    }

    if (JSON.parse(localStorage.getItem('nominated')).length === 0) {
      localStorage.removeItem('nominated');
    }
  }

  // Function that calls a different API for more details about a movie based on a given IMDb Id
  const loadMovieDetails = async (id) => {
    setErrors({});
    setIsLoadingDetails(true);
    setActive(true);

    await axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`
      )
      .then((res) => {
        if (res.data.Error) {
          setErrors({ detailsError: 'Movie not found' });
          setIsLoadingDetails(false);
        } else {
          setMovieDetails(res.data);
          setIsLoadingDetails(false);
        }
      })
      .catch((err) => {
        setErrors({ detailsError: 'An error has occured. Please try again.' });
        setIsLoadingDetails(false);
      });
  };

  return (
    <Frame>
      {toastMarkup}
      <FadeUpParent keyPass='Main Page Parent'>
        <Page
          title='The Shoppies'
          separator
          breadcrumbs={[{ content: 'Landing', url: '/' }]}
          subtitle='Movie Search'
        >
          <Modal
            large
            title
            open={active}
            onClose={toggleActive}
            secondaryActions={[
              {
                content: 'Close',
                onAction: toggleActive,
              },
            ]}
            instant={false}
          >
            <Modal.Section>
              <MovieDetails
                isLoadingDetails={isLoadingDetails}
                movieDetails={movieDetails}
                errors={errors}
              />
            </Modal.Section>
          </Modal>

          <FadeUpChildren>
            <Layout>
              <Layout.Section>
                <Card>
                  <Card.Section>
                    <Form>
                      <TextField
                        label='Search for a movie title'
                        placeholder='Try Avengers, The Room, or Finding Nemo'
                        value={value}
                        onChange={handleChange}
                        clearButton
                        onClearButtonClick={handleClearButtonClick}
                        error={errors.searchError}
                        prefix={
                          <IconContext.Provider
                            value={{
                              style: { verticalAlign: '-0.1em' },
                            }}
                          >
                            <IoSearchOutline />
                          </IconContext.Provider>
                        }
                        autoFocus={true}
                      />

                      <Spacer amount={10} />

                      <Button
                        primary
                        onClick={() => searchMovies()}
                        loading={isLoading ? true : false}
                        submit={true}
                      >
                        Search
                      </Button>
                    </Form>
                  </Card.Section>
                </Card>
              </Layout.Section>
            </Layout>
          </FadeUpChildren>

          <Spacer />

          {nominated.length === 5 && (
            <FadeUpChildren keyPass='Completed banner'>
              <Banner
                title='Maximum nominations reached'
                status='info'
                action={{ content: 'Continue', url: '/summary' }}
              >
                <p>You've selected your 5 nominations, continue?</p>
              </Banner>
            </FadeUpChildren>
          )}

          <Spacer />

          <FadeUpChildren>
            <Layout>
              <Layout.Section secondary>
                <Card title='Your Nominations'>
                  <FadeUpChildren>
                    <Card.Section>
                      <TextStyle variation='subdued'>
                        Nominate up to 5 movies
                      </TextStyle>
                      {nominated.length === 0 && (
                        <motion.img
                          variants={childFadeUp}
                          src='https://doixzan7hf4ti.cloudfront.net/shopify-2021-challenge/Shoppies-Nomination-Empty-List.svg'
                          style={{
                            maxWidth: '100%',
                            textAlign: 'center',
                          }}
                          alt='Trophy for the Shoppies'
                          layout
                        />
                      )}
                    </Card.Section>
                  </FadeUpChildren>

                  <TextStyle variation='negative'>
                    {errors.nominationError}
                  </TextStyle>

                  <NominationList
                    nominationList={nominated}
                    removeNomination={removeNomination}
                    loadMovieDetails={loadMovieDetails}
                  />
                </Card>

                <motion.div layout key='footer help component'>
                  <FooterHelp>
                    <Caption>
                      <TextStyle variation='subdued'>
                        Nominations are automatically saved
                      </TextStyle>
                    </Caption>
                  </FooterHelp>
                </motion.div>
              </Layout.Section>
              <Layout.Section>
                {count === 0 && (
                  <Card>
                    <Card.Section>
                      <EmptyState
                        heading='Search for a movie to get started'
                        image='https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
                      >
                        <p>
                          Once you find a movie that you like, add it to your
                          nominations
                        </p>
                      </EmptyState>
                    </Card.Section>
                  </Card>
                )}
                {count > 0 && (
                  <>
                    <MovieList
                      isLoading={isLoading}
                      movieData={movieData}
                      searchData={searchData}
                      searchTerm={lastSearched}
                      callback={addNomination}
                      nominationList={nominated}
                      loadMovieDetails={loadMovieDetails}
                    />
                    <Spacer />
                    <Button
                      fullWidth
                      primary
                      loading={isLoadingMore ? true : false}
                      onClick={() => loadMoreMovies()}
                    >
                      Load more
                    </Button>
                    <TextStyle variation='negative'>
                      {errors.loadError}
                    </TextStyle>
                  </>
                )}
              </Layout.Section>
            </Layout>
          </FadeUpChildren>
        </Page>
      </FadeUpParent>
    </Frame>
  );
};

export default Main;
