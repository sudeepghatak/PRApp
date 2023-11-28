import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restApiCall } from "../../webparts/prApp/Api/ApiCall";
// import { fileInformation } from "./primaryinfoSlice";
// import { BasicInfoObj, basicInfoitem } from "../../webparts/prApp/Model/BasicInfoline";


interface IApprovalHistory{
    task:string;
    modified:string;
}

interface IApprovalFlow{
    level:string;
    approver:string;
    approver_status:string;
    approver_date:string;

}
interface IStatus{
    approvalHistory:IApprovalHistory[];
    approvalFlow:IApprovalFlow[];
    isLoading:boolean;
}
const initialState:IStatus={
    approvalHistory:[],
    approvalFlow: [],
    isLoading:true
}
export const fetchAuditTrailContent = createAsyncThunk(

    'fetchAuditTrailContent',

    async (pID:string) => {
            let approvalres=await restApiCall.getApprovalLog(pID);
            console.log("Data Here StatusSlice File 113",approvalres);
            let auditres= await restApiCall.getAuditTrail(pID)
            console.log("auditRes Here --- ",auditres)
            let approvalinfo={
                "approvalres":approvalres
            }
            let auditinfo={
                "auditres":auditres
            }
            let res={...approvalinfo,...auditinfo}
            console.log("This is The Whole Data Here --- ",res);
            return res;
     
      }
    

  )
export const AuditTrailSlice=createSlice({
    name: "reducers",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchAuditTrailContent.pending, (state) => {
            state.isLoading=true;

            console.log("Pending....")
    
            // state.isLoading = true
    
          })
    
          builder.addCase(fetchAuditTrailContent.fulfilled, (state, action) => {
            state.isLoading=false;
            console.log("This is The response Here 68 68 68 68 68",action.payload)
            if(action.payload.auditres.length !==0){
                for(let i=0;i<action.payload.auditres.length;i++){
                    let date=new Date(action.payload.auditres[i].Modified)
                    
                    let approvalhistoryItem:IApprovalHistory={
                        "task":action.payload.auditres[i].ContentText,
                        "modified":`${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                    }
                    state.approvalHistory.push(approvalhistoryItem)
                }

            }
            if(action.payload.approvalres.length !==0){
                for(let j=0;j<action.payload.approvalres.length;j++){
                    let date=new Date(action.payload.approvalres[j].ApprovalDate)
                    let approvalItem:IApprovalFlow={
                        level: `[${action.payload.approvalres[j].ApprovalLevel}][${action.payload.approvalres[j].ApprovalType}]`,
                        approver: `${action.payload.approvalres[j].ApproverName}`,
                        approver_status: `${action.payload.approvalres[j].ApprovalStatus}`,
                        approver_date:`${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                    };
                    state.approvalFlow.push(approvalItem)
                }

            }
            console.log("This is The response Here 68 68 68 68 68",action.payload,action.payload.auditres)
            // state.isLoading = fa        
        })
    
          builder.addCase(fetchAuditTrailContent.rejected, (state, action) => {
            state.isLoading=false;
            // state.isLoading = false
    
          })
    }

});

  // It is a convention to export reducer as a default export:
  export default AuditTrailSlice.reducer;