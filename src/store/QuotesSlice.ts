import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ouote } from "../NoteType";
import axios from "axios";



interface StateInterface {
    loading: boolean;
    error?: boolean;
    quotes: Ouote[] | null ;
    message?:string,
    quote:Ouote | null;
}

const initialState:StateInterface = {
  message: "",
  loading:false,
  error:false,
  quotes: [],
  quote:null
}

export const getQuotes = createAsyncThunk('quotes/getQuotes',async(_,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;
    try {
        const {data} = await axios('https://api.api-ninjas.com/v1/quotes?category=hope&limit=10',
        {
            headers: { 'X-Api-Key': 'FbhIWEursfjhxOLa1TAzIQ==Yorfo3JjXnTqpZ5E'},
        })
        console.log(data);
        
        return data
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
})




const quotesSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getQuotes.pending, (state) =>{
                state.loading = true;
                state.error = false;
            })
            builder.addCase(getQuotes.fulfilled, (state,action) =>{
                state.loading = false;
                state.error = false;
                state.quotes = action.payload;
            })
            builder.addCase(getQuotes.rejected, (state,action) =>{
                state.loading = false;
                state.error = true;
            })
        }

})





export default quotesSlice.reducer