import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { VendorDetails } from "../../webparts/prApp/Model/vendor_details";


interface IvendorDetails{
    PKID:number,
    vendorDetails:VendorDetails

}

const initialState:IvendorDetails={
    PKID:0,
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


        },
        savePkid(state: IvendorDetails, 
            action: PayloadAction<number>){
                state.PKID=action.payload

        }
    }

});

export const { saveVendorandShippingData,savePkid} = vendorandshippingSlice.actions;

// It is a convention to export reducer as a default export:
export default vendorandshippingSlice.reducer;