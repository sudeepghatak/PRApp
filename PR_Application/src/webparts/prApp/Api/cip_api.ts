import { CipNumberDetails } from "../Model/cip_numbers";
import { restApiCall } from "./ApiCall";

// const CIPdata = require('../assets/CIPdata.json');

export class CipData{
    static  async fetchCpiDetails (cipcompanyCode:string){
    let cipDetailsList=[];
    const response= await restApiCall.getCIPcode(cipcompanyCode);
    console.log("response CIPData:::   ",response);
 
      for(let i:number=0; i<response.length; i++)
        {
            
             let cipDetails=new CipNumberDetails(response[i].MainAssetNumber,response[i].Assetdescription,response[i].CompanyCode);
             console.log("AAAAAAAAAAAAAA------",cipDetails,response[i])
             cipDetailsList.push(cipDetails)
        }
        console.log("bbbbbbbbbbbbbbbbbbb",cipDetailsList)
        return cipDetailsList
    }

}
