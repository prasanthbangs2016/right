import { createSlice } from "@reduxjs/toolkit";
export const GetDropDownValues = createSlice({
  name: "GetDropdwon",
  initialState: {
    stateId: 0,
    countryId: 0,
    cityId: 0,
    countyId: 0,
  },
  reducers: {
    GetId: (state, value) => {
      state[value.payload.type] = value.payload.id;
    },
  },
});
export default GetDropDownValues.reducer;
export const { GetId } = GetDropDownValues.actions;
