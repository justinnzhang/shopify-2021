import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

const AnimationTrigger = ({ children, keyPass }) => {
  const [ref, inView] = useInView({
    rootMargin: '-300px 10px',
    triggerOnce: true,
  });

  const parentFadeIn = {
    initial: { opacity: 0, translateY: 0 },
    enter: {
      opacity: 1,
      translateY: 0,
      transition: { duration: 0.333, ease: 'easeOut', staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={parentFadeIn}
      initial='initial'
      animate={inView ? 'enter' : 'initial'}
      key={keyPass}
    >
      {children}
    </motion.div>
  );
};

AnimationTrigger.propTypes = {
  key: PropTypes.string.isRequired,
};

export default AnimationTrigger;
