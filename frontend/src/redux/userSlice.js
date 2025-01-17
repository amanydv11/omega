import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    logInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart:(state)=>{
      state.loading =true;
      state.error =null;
    },
    updateSuccess:(state,action)=>{
      state.currentUser =action.payload;
      state.loading=false;
      state.error=null;
    },
    updateFailure:(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    deletUserStart:(state)=>{
      state.loading =true;
      state.error =null;
    },
    deleteUserSuccess:(state)=>{
      state.currentUser =null;
      state.loading=false;
      state.error=null;
    },
    deleteUserFailure:(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess:(state) =>{
      state.currentUser =null;
      state.loading=false;
      state.error=null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
}
})

export const {logInStart,logInFailure,logInSuccess,
  updateStart,updateSuccess,updateFailure,
deletUserStart,deleteUserSuccess,deleteUserFailure,signoutSuccess,signInSuccess} =userSlice.actions;
export default userSlice.reducer;