//Pop Up + Fade In Animation
export const popUp_fadeIn = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.75,
    },
  },
};

//Scroll Animation
export const gameCardReveal = {
  //Added "scale" recently but willing to take it back
  hidden: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

//Line Animation
export const lineAnim = {
  hidden: {
    width: "0%",
  },
  show: {
    width: "100%",
    transition: { duration: 2 },
  },
};

export const opacityOnOff = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export const titleAnim = {
  hidden: {
    y: 200,
  },
  show: {
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

export const ratingAnim = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

export const parent = {
  hidden: {},
  show: {
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};

export const platformAnim = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.75 },
  },
};
