
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Note } from "../NoteType";
import axios from "axios";


interface NoteData {
    title: string,
    desc: string,
}
interface NoteIntefrace {

    _id: string,
    value: string
}
interface StateInterface {
      loading: boolean;
      error?: boolean;
      notes: Note[] | null |undefined;
      message?:string,
      note:Note |NoteData | null;
}

const initialState:StateInterface = {
    message: "",
    loading:false,
    error:false,
    notes: [],
    note:null
}

export const getNotes = createAsyncThunk('notes/getNotes',async(_,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;

    try {
        const {data} = await axios('https://note-node-js.vercel.app/note/',{
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
        const {data} = await axios.delete(`https://note-node-js.vercel.app/note/${_id}`,{
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
        const {data} = await axios.post(`https://note-node-js.vercel.app/note/`,noteData,{
            headers:{ token: localStorage.getItem("token") } 
        })        
        return data.result
    } catch (error) {
        return rejectWithValue((error as Error).message); 
    }
})


export const updateNote = createAsyncThunk('note/updateNote',async(noteData:NoteIntefrace,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;
    try {
        const {data} = await axios.post(`https://note-node-js.vercel.app/note/${noteData._id}`,noteData.value,{
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
            state.note = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getNotes.pending, (state) =>{
            state.loading = true;
            state.error = false;
        })
        builder.addCase(getNotes.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = false;
            state.notes = action.payload;
        })
        builder.addCase(getNotes.rejected, (state,action) =>{
            state.loading = false;
            state.error = true;
        })
        //delete note
        builder.addCase(deleteNote.pending, (state) =>{
            state.loading = true;
            state.error = false;
        })
        builder.addCase(deleteNote.fulfilled, (state,action) =>{
            state.loading = false;
            state.error =false;
            const deletedNoteId = action.payload;
            state.notes = state.notes?.filter((note) => note._id !== deletedNoteId);
          
        })
        builder.addCase(deleteNote.rejected, (state,action) =>{
            state.loading = false;
            state.error = true;
        })
         //add note
         builder.addCase(addNote.pending, (state) =>{
            state.loading = true;
            state.error = false;
        })
        builder.addCase(addNote.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = false;
            const newNote = action.payload;
            state.notes = state.notes ? [...state.notes, newNote] : [newNote];
          
        })
        builder.addCase(addNote.rejected, (state,action) =>{
            state.loading = false;
            state.error = true;
        })
        //update
        builder.addCase(updateNote.pending, (state) =>{
            state.loading = true;
            state.error = false;
        })
        builder.addCase(updateNote.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = false;
            state.note = action.payload
          
        })
        builder.addCase(updateNote.rejected, (state,action) =>{
            state.loading = false;
            state.error = true;
        })
    }
})









export default noteSlice.reducer
export const {selectedNote} = noteSlice.actions;