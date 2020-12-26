import React from 'react';
import PropTypes from 'prop-types';

import { childFadeUp } from './Variants';

import { motion } from 'framer-motion';

const FadeUpParent = ({ children, keyPass }) => {
  return (
    <motion.div variants={childFadeUp} key={keyPass}>
      {children}
    </motion.div>
  );
};

FadeUpParent.propTypes = {
  key: PropTypes.string.isRequired,
};

export default FadeUpParent;
