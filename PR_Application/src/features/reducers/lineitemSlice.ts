import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeofPurchaseDetail } from "../../webparts/prApp/Model/TypePurchases/type_purchases_detail";



interface tableinformation {
  selectDepartment:string;
  TypeofPurchaseDetailList:TypeofPurchaseDetail[];
  }
  const initialState: tableinformation = {
    selectDepartment:"",
    TypeofPurchaseDetailList:[]

  };

export const lineitemSlice = createSlice({
    name: "lineitemreducers",
    initialState,
    reducers: {
      setlineitemValue(
        state: tableinformation, 
        action: PayloadAction<tableinformation>
      ) {
        state.selectDepartment=action.payload.selectDepartment;
        state.TypeofPurchaseDetailList=action.payload.TypeofPurchaseDetailList;

      },
      deletetypePurchases(state: tableinformation, 
        action: PayloadAction<number>){
          state.TypeofPurchaseDetailList=state.TypeofPurchaseDetailList.filter((item:TypeofPurchaseDetail,index:number)=>action.payload !=index);
          
    
      }
    },
  });

  export const { setlineitemValue,deletetypePurchases } = lineitemSlice.actions;

  // It is a convention to export reducer as a default export:
  export default lineitemSlice.reducer;