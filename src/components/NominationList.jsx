import React from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// Shopify Polaris Components
import {
  Button,
  Card,
  TextStyle,
  ButtonGroup,
  TextContainer,
} from '@shopify/polaris';

// Custom components & CSS
import './components.css';
import Spacer from './Spacer';

// Icons - React Icons
import { IconContext } from 'react-icons';
import { BiDetail } from 'react-icons/bi';

// Custom animation variant
import { nominationItem } from '../animation/Variants';

const NominationList = ({
  nominationList,
  removeNomination,
  loadMovieDetails,
}) => {
  // Displays an empty state if there are no nominations
  if (nominationList.length === 0) {
    return (
      <Card.Section>
        <div style={{ textAlign: 'center' }}>
          <p>You haven't nominated anything yet</p>
        </div>
      </Card.Section>
    );
  }

  return (
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
                <TextStyle variation='subdued'>({element.Year})</TextStyle>
              </p>
            </TextContainer>

            <Spacer amount={10} />

            <ButtonGroup>
              <Button
                size='slim'
                primary
                onClick={() => loadMovieDetails(element.id)}
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
  );
};

NominationList.propTypes = {
  nominationList: PropTypes.array.isRequired,
};

NominationList.defaultProps = {
  nominationList: [],
};

export default NominationList;
