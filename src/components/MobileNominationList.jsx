import React, { useState, useCallback } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// Shopify Polaris Components
import {
  Button,
  Card,
  TextStyle,
  ButtonGroup,
  TextContainer,
  Modal,
} from '@shopify/polaris';

// Custom components & CSS
import './components.css';
import Spacer from './Spacer';

// Icons - React Icons
import { IconContext } from 'react-icons';
import { BiDetail } from 'react-icons/bi';
import { IoIosTrophy } from 'react-icons/io';

// Custom animation variant
import {
  nominationItem,
  childFadeUp,
  nominationButton,
} from '../animation/Variants';
import FadeUpChildren from '../animation/FadeUpChildren';

const MobileNominationList = ({
  nominationList,
  removeNomination,
  loadMovieDetails,
  errors,
  detailsActive,
}) => {
  // Used for the modal settings
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const activator = !active && !detailsActive && (
    <motion.div
      onClick={handleChange}
      className='mobile-nomination-list'
      variants={nominationButton}
    >
      <IconContext.Provider
        value={{
          style: {
            fontSize: '2em',
            verticalAlign: '-0.85em',
            marginLeft: '0.29em',
          },
        }}
        title='Nomination List'
      >
        <IoIosTrophy />
      </IconContext.Provider>
    </motion.div>
  );

  // Displays an empty state if there are no nominations
  if (nominationList.length === 0) {
    return (
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title='Your Nominations'
        primaryAction={{
          content: 'Close',
          onAction: handleChange,
        }}
      >
        <Modal.Section>
          <FadeUpChildren>
            <TextStyle variation='subdued'>
              Nominate up to 5 movies, all selections are saved to your browser
            </TextStyle>
            {nominationList.length === 0 && (
              <motion.img
                variants={childFadeUp}
                src='https://doixzan7hf4ti.cloudfront.net/shopify-2021-challenge/Shoppies-Nomination-Empty-List.svg'
                style={{
                  maxWidth: '100%',
                  textAlign: 'center',
                }}
                alt='Trophy for the Shoppies'
              />
            )}

            <div style={{ textAlign: 'center' }}>
              <p>You haven't nominated anything yet</p>
            </div>
          </FadeUpChildren>
        </Modal.Section>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title='Your Nominations'
        primaryAction={{
          content: 'Close',
          onAction: handleChange,
        }}
      >
        <Modal.Section>
          <FadeUpChildren>
            <Card.Section>
              <TextStyle variation='subdued'>
                Nominate up to 5 movies, all selections are saved to your
                browser
              </TextStyle>
              {nominationList.length === 0 && (
                <motion.img
                  variants={childFadeUp}
                  src='https://doixzan7hf4ti.cloudfront.net/shopify-2021-challenge/Shoppies-Nomination-Empty-List.svg'
                  style={{
                    maxWidth: '100%',
                    textAlign: 'center',
                  }}
                  alt='Trophy for the Shoppies'
                />
              )}
            </Card.Section>
          </FadeUpChildren>

          <TextStyle variation='negative'>{errors.nominationError}</TextStyle>
          <motion.div layout>
            <AnimatePresence exitBeforeEnter>
              <AnimateSharedLayout>
                {nominationList.map((element, index) => (
                  <motion.div
                    layout
                    variants={nominationItem}
                    initial='initial'
                    animate='enter'
                    exit='exit'
                    key={element.Title + element.Year}
                    className='nominatedCard'
                  >
                    <TextContainer>
                      <p>
                        {element.Title}{' '}
                        <TextStyle variation='subdued'>
                          ({element.Year})
                        </TextStyle>
                      </p>
                    </TextContainer>

                    <Spacer amount={10} />

                    <ButtonGroup>
                      <Button
                        size='slim'
                        primary
                        onClick={() => {
                          handleChange();
                          loadMovieDetails(element.id);
                        }}
                        icon={
                          <IconContext.Provider
                            value={{ style: { verticalAlign: '-0.15em' } }}
                          >
                            <BiDetail />
                          </IconContext.Provider>
                        }
                      >
                        Info
                      </Button>
                      <Button
                        size='slim'
                        plain
                        destructive
                        onClick={() => removeNomination(index)}
                      >
                        Remove
                      </Button>
                    </ButtonGroup>
                  </motion.div>
                ))}
              </AnimateSharedLayout>
            </AnimatePresence>
          </motion.div>
        </Modal.Section>
      </Modal>
    </>
  );
};

MobileNominationList.propTypes = {
  nominationList: PropTypes.array.isRequired,
};

MobileNominationList.defaultProps = {
  nominationList: [],
};

export default MobileNominationList;
