export const parentFadeUp = {
  initial: { opacity: 0, translateY: 0 },
  enter: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 0.333, ease: 'easeInOut', staggerChildren: 0.05 },
  },
};

export const parentFadeUpDelayed = {
  initial: { opacity: 0, translateY: 0 },
  enter: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.333,
      ease: 'easeInOut',
      staggerChildren: 0.2,
      delayChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

export const childFadeUp = {
  initial: { opacity: 0, y: 30 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const nominationItem = {
  intial: { opacity: 0, x: -50 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    x: 50,
  },
};