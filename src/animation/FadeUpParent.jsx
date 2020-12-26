import React from 'react';
import PropTypes from 'prop-types';

import { parentFadeUp, parentFadeUpDelayed } from './Variants';

import { motion } from 'framer-motion';

const FadeUpParent = ({ children, keyPass, delayed }) => {
  if (delayed) {
    return (
      <motion.div
        variants={parentFadeUpDelayed}
        initial='initial'
        animate='enter'
        exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
        key={keyPass}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={parentFadeUp}
      initial='initial'
      animate='enter'
      exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
      key={keyPass}
    >
      {children}
    </motion.div>
  );
};

FadeUpParent.propTypes = {
  key: PropTypes.string.isRequired,
  delayed: PropTypes.bool,
};

export default FadeUpParent;
