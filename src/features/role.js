import { createSlice } from "@reduxjs/toolkit";

const roleReducer = createSlice({
  name: "role",
  initialState: "default",
  reducers: {
    addRole: (state, action) => {
      return action.payload;
    },
    removeRole: (state, action) => {
      return "default";
    },
  },
});

export default roleReducer.reducer;
export const { addRole, removeRole } = roleReducer.actions;
