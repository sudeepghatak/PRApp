
import { CipNumberDetails } from "../Model/cip_numbers";
import {CIPApi} from "./ApiCall";

// const CIPdata = require('../assets/CIPdata.json');

export class CipData{
    static  async fetchCpiDetails (cipcompanyCode:string){
    let cipDetailsList=[];
    const response = await CIPApi.CIPDataApi(cipcompanyCode);
         // filtercipData=newcipData["default"].filter((cipdata)=>cipdata.CompanyCode ===cipcompanyCode )
         for(let i:number=0;i<response.length;i++)
        {
             console.log(response[i].CompanyCode);
             let cipDetails=new CipNumberDetails(response[i].MainAssetNumber,response[i].Assetdescription,response[i].CompanyCode);
             cipDetailsList.push(cipDetails)
        }
        return(cipDetailsList)
    }

}
