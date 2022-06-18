import { createSlice } from "@reduxjs/toolkit";
export const Reducers = createSlice({
  name: "Reducers",
  initialState: {
    header: "",
    loader: { Loader: false, Error: false },
    ID: "",
  },
  reducers: {
    Headers: (state, value) => {
      state.header = value.payload;
    },
    Loaders: (state, value) => {
      state.loader.Loader = value.payload.Loader;
      state.loader.Error = value.payload.Error;
    },
    CurrentID: (state, value) => {
      state.ID = value.payload;
    },
  },
});
export const { Headers, Loaders, CurrentID } = Reducers.actions;
export default Reducers.reducer;
