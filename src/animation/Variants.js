// Animation constants for Framer motion

export const parentFadeUp = {
  initial: { opacity: 0, translateY: 0 },
  enter: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.333,
      ease: [0.17, 0.87, 0.92, 1],
      staggerChildren: 0.05,
    },
  },
};

export const parentFadeUpDelayed = {
  initial: { opacity: 0, translateY: 0 },
  enter: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.333,
      ease: [0.17, 0.87, 0.92, 1],
      staggerChildren: 0.2,
      delayChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

export const childFadeUp = {
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.17, 0.87, 0.92, 1] },
  },
};

export const nominationItem = {
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.17, 0.87, 0.92, 1] },
  },
  exit: {
    opacity: 0,
    y: 50,
  },
};

export const floatingLoop = {
  enter: {
    y: [-20, -10, -20],
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};
