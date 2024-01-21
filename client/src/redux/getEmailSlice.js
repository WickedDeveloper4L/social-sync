import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    currentUser: "user@gmail",
    contacts: [],
  },
  reducers: {
    addEmail: (state, action) => {
      state.currentUser = action.payload;
    },
    addContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },
});

export const { addEmail, addContacts } = emailSlice.actions;
export default emailSlice.reducer;
