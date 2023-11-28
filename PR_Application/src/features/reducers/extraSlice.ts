import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { TypeofPurchaseDetail } from "../../webparts/prApp/Model/TypePurchases/type_purchases_detail";

interface extrainformation {
    siteUrl:string

  }
  const initialState: extrainformation = {
    siteUrl:" "
  };

export const extraSlice = createSlice({
    name: "extrareducer",
    initialState,
    reducers: {
        setsiteURL(
        state: extrainformation, 
        action: PayloadAction<string>
        ){
            console.log("---------------------------- ",action.payload)
            state.siteUrl=action.payload;
            console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx")

        }

    },
  });

  export const {setsiteURL} = extraSlice.actions;

  // It is a convention to export reducer as a default export:
  export default extraSlice.reducer;