import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

// Shopify Polaris Components
import { DisplayText } from '@shopify/polaris';

import './animation.css';
import '../components/components.css';

import PosterPlaceholder from '../components/PosterPlaceholder';

const AnimationTrigger = ({ title, year, poster, left }) => {
  const posterVariantsLeft = {
    initial: { opacity: 0, translateY: 100, rotateY: -70 },
    enter: {
      opacity: 1,
      translateY: 0,
      rotateY: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.17, 0.87, 0.92, 1] },
    },
  };

  const posterVariantsRight = {
    initial: { opacity: 0, translateY: 100, rotateY: 70 },
    enter: {
      opacity: 1,
      translateY: 0,
      rotateY: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.17, 0.87, 0.92, 1] },
    },
  };

  const textVariantsLeft = {
    initial: { opacity: 0, translateX: -100 },
    enter: {
      opacity: 1,
      translateX: 0,
      transition: { duration: 0.5, ease: [0.17, 0.87, 0.92, 1] },
    },
  };

  const textVariantsRight = {
    initial: { opacity: 0, translateX: 100 },
    enter: {
      opacity: 1,
      translateX: 0,
      transition: { duration: 0.5, ease: [0.17, 0.87, 0.92, 1] },
    },
  };

  if (left) {
    return (
      <div className='row'>
        <motion.div className='col-50' variants={posterVariantsLeft}>
          {poster === 'N/A' ? (
            <PosterPlaceholder />
          ) : (
            <img
              src={poster}
              alt={`Movie poster for ${title}`}
              style={{ width: '100%' }}
            />
          )}
        </motion.div>
        <motion.div
          variants={textVariantsRight}
          className='col-50 vertical-center'
        >
          <motion.div className='text-card right-card'>
            <DisplayText>{title}</DisplayText>
            <DisplayText size='small'>{year}</DisplayText>
          </motion.div>
        </motion.div>
      </div>
    );
  } else {
    return (
      <div className='row'>
        <motion.div
          variants={textVariantsLeft}
          className='col-50 vertical-center order-1'
        >
          <motion.div className='text-card left-card'>
            <DisplayText>{title}</DisplayText>
            <DisplayText size='small'>{year}</DisplayText>
          </motion.div>
        </motion.div>
        <motion.div className='col-50 order-2' variants={posterVariantsRight}>
          {poster === 'N/A' ? (
            <PosterPlaceholder />
          ) : (
            <img
              src={poster}
              alt={`Movie poster for ${title}`}
              style={{ width: '100%' }}
            />
          )}
        </motion.div>
      </div>
    );
  }
};

AnimationTrigger.propTypes = {
  key: PropTypes.string.isRequired,
};

export default AnimationTrigger;
