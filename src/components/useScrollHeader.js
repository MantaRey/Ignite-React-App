import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion"; // Use this to tell an element when to become animated (after initial rendering occurs). On CLick, etc...

export const useScrollHeader = () => {
  const controls = useAnimation();
  const [element, view] = useInView({ threshold: 0.05 });
  // useInView({ threshold: 0.333, triggerOnce: true })
  if (view) {
    controls.start("show");
  } else {
    controls.start("hidden");
  }
  return [element, controls];
};
