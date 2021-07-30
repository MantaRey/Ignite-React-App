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
