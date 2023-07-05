// import  thunk  from 'redux-thunk';
import  storage  from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from './AuthSlice'
import note from './NoteSlice'
import quotes from './QuotesSlice'
import { persistReducer, persistStore } from "redux-persist";




// export const store = configureStore({
//     reducer:{
//       auth
//     }
// })

const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer = combineReducers({ 
  auth,
  note,
  quotes
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  // middleware: [thunk]
  middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
