import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restApiCall } from "../../webparts/prApp/Api/ApiCall";


interface ISupplier{
    "Supplier_Number":string;
    "Supplier_Name":string;
    "Supplier_Address":string;
    "Supplier_City":string;
    "Supplier_State":string;
    "Supplier_Zip":string;
    "Supplier_Country":string;
    "Special_Instructions":string;
    "Justification_Reason_for_Order":string;
    "Shipping_Location":string

}

interface IBasicInfo{
    "PR_Type":string;
    "Total_Order_Amount":string;
    "SAP_PR_PO_Request_ID":string;
    "Connect_PR_Request_ID":string;
    "Status":string;
    "Cost_Center":string;
    "Type_Of_Buy":string;
    "Prepaid_or_Capital_buy":string;
    "CIP_Number":string;
    "UFID":string;
    "Type_of_Order":string;
    "EHS_Relevant":string;
    "Is_this_Project_Related":string;
    "Project_Code":string;

}
interface IAttachments{

}
interface IStatus{
    basicInfo:IBasicInfo;
    supplier:ISupplier;
    isLoading:boolean;
}
const initialState:IStatus={
    basicInfo:{
        PR_Type: "",
        Total_Order_Amount: "",
        SAP_PR_PO_Request_ID: "",
        Connect_PR_Request_ID: "",
        Status: "",
        Cost_Center: "",
        Type_Of_Buy: "",
        Prepaid_or_Capital_buy: "",
        CIP_Number: "",
        UFID: "",
        Type_of_Order: "",
        EHS_Relevant: "",
        Is_this_Project_Related: "",
        Project_Code: ""
    },
    supplier: {
        Supplier_Number: "",
        Supplier_Name: "",
        Supplier_Address: "",
        Supplier_City: "",
        Supplier_State: "",
        Supplier_Zip: "",
        Supplier_Country: "",
        Special_Instructions: "",
        Justification_Reason_for_Order: "",
        Shipping_Location: ""
    },
    isLoading:true
}
export const fetchStatusContent = createAsyncThunk(

    'fetchStatusContent',

    async () => {
            var res=await restApiCall.getPrbasicInfoContent("0000000414");
            console.log("Data Here ",res);
            return res;
     
      }
    

  )
export const statusSlice=createSlice({
    name: "reducers",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchStatusContent.pending, (state) => {
            state.isLoading=true;

            console.log("Pending....")
    
            // state.isLoading = true
    
          })
    
          builder.addCase(fetchStatusContent.fulfilled, (state, action) => {
            state.isLoading=false;
            // state.isLoading = fal
            console.log("Response TOP-----------action.payload ::",action.payload);
            state.basicInfo.UFID=(action.payload.UFID==null)?" ":action.payload.UFID;
            state.basicInfo.Cost_Center=(action.payload.Cost_Center==null)?" ":action.payload.Cost_Center.toString();
            state.basicInfo.Status=(action.payload.Status==null)?" ":action.payload.Status;
            state.basicInfo.CIP_Number=(action.payload.CIP_Number==null)?" ":action.payload.CIP_Number;
            state.basicInfo.Type_of_Order=(action.payload.Type_Of_Order==null)?" ":action.payload.Type_Of_Order;
            state.basicInfo.Project_Code=(action.payload.ProjectCode==null)?" ":action.payload.ProjectCode;
            state.basicInfo.EHS_Relevant=(action.payload.EHS==null)?" ":(action.payload.EHS==false)?"No":"Yes";
            state.basicInfo.Prepaid_or_Capital_buy=(action.payload.PrepaidOrCapitalEquipment==null)?" ":action.payload.PrepaidOrCapitalEquipment;
            state.basicInfo.Type_Of_Buy=(action.payload.Type_Of_Buy==null)?" ":action.payload.Type_Of_Buy;
            state.basicInfo.Connect_PR_Request_ID=(action.payload.ConnectPRID==null)?" ":action.payload.ConnectPRID;
          
        
        })
    
          builder.addCase(fetchStatusContent.rejected, (state, action) => {
            state.isLoading=false;
            // state.isLoading = false
    
          })
    }

});

  // It is a convention to export reducer as a default export:
  export default statusSlice.reducer;