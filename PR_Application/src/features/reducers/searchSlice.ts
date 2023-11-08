import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restApiCall } from "../../webparts/prApp/Api/ApiCall";
import { GlobalStore } from "../../app/globalStore";


export interface ISearchResult{
    "ConnectPRID":string,
    "Status":string,
    "date":string,
    "supplierName":string,
    "ammount":string
}

const initialState={
    listSearchResult:[],
    isLoading:false
}
export const fetchSearchContent = createAsyncThunk(

    'fetchSearchContent',

    async (cT:string) => {
        while(true){
            console.log("---Email -- ",GlobalStore.getmainEmail())
           
            if(GlobalStore.getmainEmail()!==undefined){
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        let searchRes=await restApiCall.getsearchByResponse(
            GlobalStore.getmainEmail()
        //    "Lisa.Jordan@omnicell.com"
            ,cT)
       
        return searchRes;
     
      }
    

  )

export const searchSlice=createSlice({
    name: "reducers",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchSearchContent.pending, (state) => {
            state.isLoading=true;

            console.log("Pending....")
    
            // state.isLoading = true
    
          })
    
          builder.addCase(fetchSearchContent.fulfilled, (state, action) => {
            state.isLoading=false;
            // state.isLoading = fal
            console.log("Response TOP-----------action.payload  61 searchSlice::",action.payload);
            
            state.listSearchResult=[];
            if(action.payload.length !==0){
                for(let i=0;i<action.payload.length;i++){
                    var dateString = action.payload[i].Created!==null?action.payload[i].Created :new Date();
                    // var correctedDateString = dateString.replace(/(\d{1,2}:\d{2})([APM]+)$/, "$1 $2");
                    console.log("Data --- ",dateString)
                    var date = new Date(dateString);

                   

// Get the month, day, and year.
        const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
// Convert the date to a string in the format "MM/DD/YYYY".
        const formattedDate = `${month}/${day}/${year}`;
       
                    let searchResultItem:ISearchResult={
                        ConnectPRID: action.payload[i].ConnectPRID,
                        Status: action.payload[i].Status ,
                        date: formattedDate,
                        supplierName:action.payload[i].Supplier_Name,
                        ammount: action.payload[i].ConvertedDollerAmount===null?0.00:action.payload[i].ConvertedDollerAmount
                    }
                state.listSearchResult.splice(0,0,searchResultItem)
                }

            }
            
          
        
        })
    
          builder.addCase(fetchSearchContent.rejected, (state, action) => {
            state.isLoading=false;
            // state.isLoading = false
    
          })
    }

});

  // It is a convention to export reducer as a default export:
  export default searchSlice.reducer;