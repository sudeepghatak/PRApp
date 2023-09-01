import { VendorDetails } from '../Model/vendor_details';
import {VendorApi} from './ApiCall'


// const vendordata = require('../assets/vendordata.json');
export class VendorData{

    static  async fetchVendordetails (CompanyCode:string){
        let vendorDetailsList=[];
        const response = await VendorApi .vendorDataApi(CompanyCode);
        for(let i:number=0;i<response.length;i++){

            let vendorDetails=new VendorDetails(response[i].VendorID,response[i].VdrNumber,response[i].VdrName,response[i].VdrStreet,response[i].VdrCity, response[i].VdrRegion,response[i].VdrPostalCode,response[i].VdrCountry,CompanyCode);
            
            
            vendorDetailsList.push(vendorDetails)
            
        }
        return vendorDetailsList;

    }

}