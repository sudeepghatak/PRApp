import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { VendorDetails } from "../../webparts/prApp/Model/vendor_details";


interface IvendorDetails{
    vendorDetails:VendorDetails

}

const initialState:IvendorDetails={
    vendorDetails: new VendorDetails(0, " ", " ", " ", " ", " ", " ", " ", " ")
}

export const vendorandshippingSlice=createSlice({
    name: "vendorandshippingreducers",
    initialState,
    reducers: {
        saveVendorandShippingData(
            state: IvendorDetails, 
            action: PayloadAction<VendorDetails>
        ){
            state.vendorDetails=action.payload


        }
    }

});

export const { saveVendorandShippingData} = vendorandshippingSlice.actions;

// It is a convention to export reducer as a default export:
export default vendorandshippingSlice.reducer;