import { configureStore } from "@reduxjs/toolkit";
import {Store } from 'redux'
import primaryinfoReducer from '../features/reducers/primaryinfoSlice';
import lineitemReducer from '../features/reducers/lineitemSlice';
import vendorandshippingReducer from "../features/reducers/vendorandshippingSlice";
import extraReducer from "../features/reducers/extraSlice";
import statusReducer from '../features/reducers/statusSlice';
export const store:Store=configureStore({
    reducer:{
        primaryinfo:primaryinfoReducer,
        lineiteminfo:lineitemReducer,
        vendorandshipping:vendorandshippingReducer,
        extrareducer:extraReducer,
        statusreducer:statusReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch