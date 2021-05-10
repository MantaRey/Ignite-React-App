import axios from "axios";
import { gameDetailsURL } from "../api";

export const loadDetails = (id, screenshots) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAILS",
  });
  //Fetch Axios
  const details = await axios.get(gameDetailsURL(id));
  dispatch({
    type: "GET_DETAILS",
    payload: {
      game: details.data,
      screenshots: screenshots,
      // screen: screenshots.data.results,
    },
  });
};
