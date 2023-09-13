import { CipNumberDetails } from "../Model/cip_numbers";
import {CIPApi, restApiCall} from "./ApiCall";

// const CIPdata = require('../assets/CIPdata.json');

export class CostCenterData{
    static  async fetchCostCenterDetails (cc_comCode:string){
    let CostCenterList=[];
    const response = await restApiCall.getCostCenterList(cc_comCode);
         for(let i:number=0;i<response.length;i++)
        {
             console.log(response[i].cc_comCode);
             let CostCenterDetails=new CipNumberDetails(response[i].MainAssetNumber,response[i].Assetdescription,response[i].CompanyCode);
             CostCenterList.push(CostCenterDetails)
        }
        return(CostCenterList)
    }

}