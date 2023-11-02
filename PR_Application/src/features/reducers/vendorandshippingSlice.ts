import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { VendorDetails } from "../../webparts/prApp/Model/vendor_details";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";


interface otherDetails{
    justificatiOnOrder:string,
    downPaymentDetails:string
}


interface IvendorDetails{
    PKID:String,
    vendorDetails:VendorDetails,
    vendorOtherDetails:otherDetails

}
interface vendorAllData{
    vendorDetails:VendorDetails,
    vendorOtherDetails:otherDetails
}

const initialState:IvendorDetails={
    PKID:"0",
    vendorDetails: new VendorDetails(0, " ", " ", " ", " ", " ", " ", " ", " "),
    vendorOtherDetails:{
        justificatiOnOrder: "",
        downPaymentDetails: ""
    }
}

export const vendorandshippingSlice=createSlice({
    name: "vendorandshippingreducers",
    initialState,
    reducers: {
        saveVendorandShippingData(
            state: IvendorDetails, 
            action: PayloadAction<vendorAllData>
        ){
            state.vendorDetails=action.payload.vendorDetails,
            state.vendorOtherDetails=action.payload.vendorOtherDetails


        },
        savePkid(state: IvendorDetails, 
            action: PayloadAction<any>){
                state.PKID=action.payload

        }
    }

});

export const { saveVendorandShippingData,savePkid} = vendorandshippingSlice.actions;

// It is a convention to export reducer as a default export:
export default vendorandshippingSlice.reducer;