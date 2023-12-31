import { configureStore } from "@reduxjs/toolkit";
import {Store } from 'redux'
import primaryinfoReducer from '../features/reducers/primaryinfoSlice';
import lineitemReducer from '../features/reducers/lineitemSlice';
import vendorandshippingReducer from "../features/reducers/vendorandshippingSlice";
export const store:Store=configureStore({
    reducer:{
        primaryinfo:primaryinfoReducer,
        lineiteminfo:lineitemReducer,
        vendorandshipping:vendorandshippingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch