
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Note } from "../NoteType";
import axios from "axios";


interface NoteData {
    title: string,
    desc: string,
}
interface NoteIntefrace {
    title: string,
    desc: string,
    _id: string
}
interface StateInterface {
      loading: boolean;
      error?: string | unknown;
      notes: Note[] | null |undefined;
      message?:string,
      note:Note |NoteData | null;
}

const initialState:StateInterface = {
    message: "",
    loading:false,
    error:"",
    notes: [],
    note:null
}


export const getNotes = createAsyncThunk('notes/getNotes',async(_,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;

    try {
        const {data} = await axios('http://localhost:5000/note/',{
            headers:{ token: localStorage.getItem("token") } 
        })        
        return data.notes
        
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
})


export const deleteNote = createAsyncThunk('note/deleteNote',async(_id:string,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;
    try {
        const {data} = await axios.delete(`http://localhost:5000/note/${_id}`,{
            headers:{ token: localStorage.getItem("token") } 
        })
        console.log(data);
        
        return _id
        
    } catch (error) {
        return rejectWithValue((error as Error).message);   
    }

})

export const addNote = createAsyncThunk('note/addNote',async(noteData:NoteData,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;
    try {
        const {data} = await axios.post(`http://localhost:5000/note/`,noteData,{
            headers:{ token: localStorage.getItem("token") } 
        })
        console.log(data);
        
        return data.result
    } catch (error) {
        return rejectWithValue((error as Error).message); 
    }
})


export const updateNote = createAsyncThunk('note/updateNote',async(noteData:NoteIntefrace,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;
    try {
        const {data} = await axios.post(`http://localhost:5000/note/${noteData._id}`,noteData,{
            headers:{ token: localStorage.getItem("token") } 
        })
        console.log(data);
        
        return data
    } catch (error) {
        return rejectWithValue((error as Error).message); 
    }
})


const noteSlice =  createSlice({
    name: 'note',
    initialState,
    reducers:{
        selectedNote:(state,action)=>{
          return action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getNotes.pending, (state) =>{
            state.loading = true;
            state.error = "";
        })
        builder.addCase(getNotes.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = "";
            state.notes = action.payload;
        })
        builder.addCase(getNotes.rejected, (state,action) =>{
            state.loading = false;
            // state.error = action.payload;
            state.error = action.error.message;
        })
        //delete note
        builder.addCase(deleteNote.pending, (state) =>{
            state.loading = true;
            state.error = "";
        })
        builder.addCase(deleteNote.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = "";
            const deletedNoteId = action.payload;
            state.notes = state.notes?.filter((note) => note._id !== deletedNoteId);
          
        })
        builder.addCase(deleteNote.rejected, (state,action) =>{
            state.loading = false;
            // state.error = action.payload;
            state.error = action.error.message;
        })
         //add note
         builder.addCase(addNote.pending, (state) =>{
            state.loading = true;
            state.error = "";
        })
        builder.addCase(addNote.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = "";
            const newNote = action.payload;
            state.notes = state.notes ? [...state.notes, newNote] : [newNote];
          
        })
        builder.addCase(addNote.rejected, (state,action) =>{
            state.loading = false;
            // state.error = action.payload;
            state.error = action.error.message;
        })
        //update
        builder.addCase(updateNote.pending, (state) =>{
            state.loading = true;
            state.error = "";
        })
        builder.addCase(updateNote.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = "";
            state.note = action.payload
          
        })
        builder.addCase(updateNote.rejected, (state,action) =>{
            state.loading = false;
            // state.error = action.payload;
            state.error = action.error.message;
        })
    }
})









export default noteSlice.reducer
export const {selectedNote} = noteSlice.actions;