import storage  from 'redux-persist/lib/storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';



export interface Person {
  name: string;
  password: string;
  email: string;
  phone: string;
  message?: string;
}

export interface LogUser {
  password: string;
  email: string;
  message?: string;
  token?: string;
}
export interface StateInterface {
loading: boolean;
error?: string | unknown;
authUser: Person |LogUser | null
}

const initialState: StateInterface = {
    loading: false,
    error: "",
    authUser:null
}

const gotologin =()=>{
  window.location.href = "/login";
}
const gotoHome =()=>{
  window.location.href = "/";
}

export const addUser = createAsyncThunk('auth/addUser',async(user:Person,thunkAPI)=>{
    const { rejectWithValue } = thunkAPI;
try {
    const { data } = await axios.post<Person>(
        "https://note-node-js.vercel.app/user/",
        user
      ); 
      console.log(data);
      
      const { message } = data;
      if (message === "successfully") {
        await Swal.fire({
          icon: "success",
          text: "Register is saved!",
          showConfirmButton: false,
          timer: 1500,
        });
        gotologin()
      }
      return data;
} catch (error) {
  await Swal.fire({
    icon: "error",
    text: "email is already registered",
  });
    return  rejectWithValue((error))
}
})


export const loginUser = createAsyncThunk('auth/loginUser',async(user2:LogUser,thunkAPI)=>{
  const { rejectWithValue } = thunkAPI;

  try {
    const { data } = await axios.post<LogUser>(
      "https://note-node-js.vercel.app/user/login",
      user2
    );     
    const { message,token} = data;
    if (message === "login success") {
      console.log(token);
      localStorage.setItem("token", `Gogy${token}`);
      await Swal.fire({
        icon: "success",
        text: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
      gotoHome()
    }
    return data;
  } catch (error) {
    await Swal.fire({
      icon: "error",
      text: "Invalid password or email",
    });
    return rejectWithValue((error as Error).message);
  }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
      logOut:(state)=>{
        storage.removeItem('persist:root')
        localStorage.removeItem('token')
        state.authUser = null
      }
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.pending, (state) => {
          state.loading = true;
          state.error = "";
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
          state.loading = false;
          state.error = "";
          state.authUser = action.payload;
        });
        builder.addCase(addUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
        builder.addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = "";
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.error = "";
          state.authUser = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
      }, 
})













export default authSlice.reducer;
export const {logOut} = authSlice.actions;