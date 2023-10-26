import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restApiCall } from "../../webparts/prApp/Api/ApiCall";


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
        let searchRes=await restApiCall.getsearchByResponse("Lisa.Jordan@omnicell.com",cT)
       
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
            console.log("Response TOP-----------action.payload ::",action.payload);
            if(action.payload.length !==0){
                for(let i=0;i<action.payload.length;i++){
                    var dateString = "Feb  9 2017 12:00AM";
                    var correctedDateString = dateString.replace(/(\d{1,2}:\d{2})([APM]+)$/, "$1 $2");
                    var date = new Date(correctedDateString);

                   

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
                        ammount: action.payload[i].ConvertedDollerAmount
                    }
                state.listSearchResult.push(searchResultItem)
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