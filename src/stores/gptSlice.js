import {createSlice} from "@reduxjs/toolkit";

const gptSlice=createSlice({
      name:'gpt',
      initialState:{
        showGptSearch:false,
      },
      reducers:{
        togggleGptSearchView:(state,action)=>{
            state.showGptSearch=!state.showGptSearch;
        },
      }  
})
export const {togggleGptSearchView}=gptSlice.actions;
export default gptSlice.reducer;