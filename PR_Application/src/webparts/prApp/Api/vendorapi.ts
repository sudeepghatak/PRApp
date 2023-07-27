import { VendorDetails } from '../Model/vendor_details';
const vendordata = require('../assets/vendordata.json');
export class VendorData{

    static  fetchVendordetails (){
        let vendorDetailsList=[];
        for(let i:number=0;i<vendordata.length;i++){

            let vendorDetails=new VendorDetails(vendordata[i].VendorID,vendordata[i].VdrNumber,vendordata[i].VdrName,vendordata[i].VdrStreet,vendordata[i].VdrCity, vendordata[i].VdrRegion,vendordata[i].VdrPostalCode,vendordata[i].VdrCountry," ");
            
            if(vendordata[i].VendorID !==0){
            vendorDetailsList.push(vendorDetails)
            }

        }
        return vendorDetailsList;

    }

}