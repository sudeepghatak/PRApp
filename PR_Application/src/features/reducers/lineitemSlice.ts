import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeofPurchaseDetail } from "../../webparts/prApp/Model/TypePurchases/type_purchases_detail";

interface tableinformation {
  // projectCode:string;
  saveTable:number;
  selectDepartment:string;
  prProjectRadio:string;
  TypeofPurchaseDetailList:TypeofPurchaseDetail[];
  Finalpage:string;
  }
  const initialState: tableinformation = {
    // projectCode:"",
    saveTable:0,
    selectDepartment:"",
    prProjectRadio:"",
    TypeofPurchaseDetailList:[],
    Finalpage:"",

  };

export const lineitemSlice = createSlice({
    name: "lineitemreducers",
    initialState,
    reducers: {
      setlineitemValue(
        state: tableinformation, 
        action: PayloadAction<tableinformation>
      ) {
        // state.projectCode=action.payload.projectCode;
        state.saveTable=action.payload.saveTable;
        state.selectDepartment=action.payload.selectDepartment;
        state.prProjectRadio=action.payload.prProjectRadio;
        state.TypeofPurchaseDetailList=action.payload.TypeofPurchaseDetailList;      
        
      },
      
      
      deletetypePurchases(state: tableinformation, 
        action: PayloadAction<number>){
          state.TypeofPurchaseDetailList=state.TypeofPurchaseDetailList.filter((item:TypeofPurchaseDetail,index:number)=>action.payload !=index);
          
    
      },
      saveButtonClick(state: tableinformation, 
        action: PayloadAction<number>){
          console.log("======= "+action.payload);
          state.saveTable=action.payload
        },
        updateFinalPage(state: tableinformation, 
          action: PayloadAction<string>){
            console.log("Update Fun Here -----  ",action.payload)
            state.Finalpage=action.payload

        }
    },
  });

  export const { setlineitemValue,deletetypePurchases,saveButtonClick,updateFinalPage } = lineitemSlice.actions;

  // It is a convention to export reducer as a default export:
  export default lineitemSlice.reducer;