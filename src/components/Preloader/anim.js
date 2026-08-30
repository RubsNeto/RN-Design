export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 0.42, delay: 0.08 },
  },
};

export const slideUp = {
  exit: {
    y: '-115%',
    transition: { duration: 0.58, ease: [0.76, 0, 0.24, 1] },
  },
};
