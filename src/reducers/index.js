import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailsReducer from "./detailsReducer";
import metaDataReducer from "./metaDataReducer";

const rootReducer = combineReducers({
  meta: metaDataReducer,
  games: gamesReducer,
  details: detailsReducer,
});

export default rootReducer;
