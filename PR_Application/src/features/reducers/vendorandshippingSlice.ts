import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { VendorDetails } from "../../webparts/prApp/Model/vendor_details";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";


interface otherDetails{
    justificatiOnOrder:string,
    downPaymentDetails:string,
}
interface IdropdownOption{
    key:string,
    text:string
}


interface IvendorDetails{
    PKID:String,
    vendorDetails:VendorDetails,
    vendorOtherDetails:otherDetails,
    ship_to_address:IdropdownOption,
    Shipping_Location:IdropdownOption,
    shipping_region:IdropdownOption
}
interface vendorAllData{
    vendorDetails:VendorDetails,
    vendorOtherDetails:otherDetails,
    ship_to_address:IdropdownOption,
    Shipping_Location:IdropdownOption,
    shipping_region:IdropdownOption
}

const initialState:IvendorDetails={
    PKID:"0",
    vendorDetails: new VendorDetails(0, " ", " ", " ", " ", " ", " ", " ", " "),
    vendorOtherDetails:{
        justificatiOnOrder: "",
        downPaymentDetails: "",
    },
    ship_to_address:{key:"",text:""},
    Shipping_Location:{key:"",text:""},
    shipping_region:{key:"",text:""}
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
            state.ship_to_address=action.payload.ship_to_address;
            state.Shipping_Location=action.payload.Shipping_Location;
            state.shipping_region=action.payload.shipping_region;

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