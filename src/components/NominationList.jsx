import React from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import PropTypes from 'prop-types';

// Shopify Polaris Components
import {
  Button,
  Card,
  TextStyle,
  DisplayText,
  ButtonGroup,
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
          <p>You haven't added anything yet</p>
        </div>
      </Card.Section>
    );
  }

  return (
    <>
      <AnimateSharedLayout>
        {nominationList.map((element, index) => (
          <motion.div
            layout
            variants={nominationItem}
            initial='initial'
            animate='enter'
            exit='exit'
            key={element.Title + element.Year}
          >
            <Card.Section>
              <DisplayText size='small'>{element.Title}</DisplayText>
              <DisplayText size='small'>
                <TextStyle variation='subdued'>{element.Year}</TextStyle>
              </DisplayText>

              <Spacer amount={10} />

              <ButtonGroup>
                <Button
                  size='slim'
                  primary
                  onClick={() => loadMovieDetails(element.id)}
                  icon={
                    <IconContext.Provider
                      value={{ style: { verticalAlign: '-0.1em' } }}
                    >
                      <BiDetail />
                    </IconContext.Provider>
                  }
                >
                  More details
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
            </Card.Section>
          </motion.div>
        ))}
      </AnimateSharedLayout>
    </>
  );
};

NominationList.propTypes = {
  nominationList: PropTypes.array.isRequired,
};

NominationList.defaultProps = {
  nominationList: [],
};

export default NominationList;
