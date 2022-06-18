import { configureStore } from "@reduxjs/toolkit";
import Reducers from "./Reducers/reducers";
import GetDropDownValues from "./Reducers/dropdownValues";
export default configureStore({
  reducer: {
    reduceR: Reducers,
    getDropDownValues: GetDropDownValues,
  },
});
