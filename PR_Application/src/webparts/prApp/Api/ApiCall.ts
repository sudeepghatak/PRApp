import axios from 'axios'
import { apiEndpoint, getVendorNameUrl,getProjectCodeResultUrl, postPRAllRequestUrl, getCostCenterUrl, getExpenseGLAccountUrl, updatePRAllRequestUrl, getPlantCodeUrl, getLocPlantUrl, postLineItemUrl, getGLCodeOdrTypeUrl } from './Config/server_config'

export class restApiCall {
   static  async rest_apiCall(url,body){
    console.log("This is Api EndPont ")
    console.log(` ${apiEndpoint}${url}`)
    console.log(body)
    console.log(body)
       let res=await axios.post(`${apiEndpoint}${url}`,body);
        return res;

    }
    static async vendorDataApi(companyCode) {
        let res=await this.rest_apiCall(`${getVendorNameUrl}${companyCode}`,{});
        return res.data;
    }

    static async getProjetCodeList(projectName){
        let res=await this.rest_apiCall(`${getProjectCodeResultUrl}${projectName}`,{});
        return res.data;
    }
    
    static async getCostCenterList(comCode){
        let res=await this.rest_apiCall(`${getCostCenterUrl}${comCode}`,{});
        return res.data;
    }

    static async getShipToAddList(comCode){
        let res=await this.rest_apiCall(`${getPlantCodeUrl}${comCode}`,{});
        return res.data;
    }

    static async getPlantLoc(loc){
        let res=await this.rest_apiCall(`${getLocPlantUrl}${loc}`,{});
        return res.data;
    }

    static async getShippingAddress(companyCode){
        let getShippingList=[];
        let companyCodeList=await this.getShipToAddList(companyCode);
        for(let i:number=0;i<companyCodeList.length;i++){
            let platList=await this.getPlantLoc(companyCodeList[i].Plant);
            console.log("----------------",companyCodeList[i].plant)
            console.log(platList);
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk")
           for(let j:number=0;j<platList.length;j++){
            getShippingList.push(platList[j].Title);
           }
            
        }
        getShippingList.push("Other Shipping Location");
        return getShippingList;

    }

    static async getExpenseGLList(){
        let res=await this.rest_apiCall(`${getExpenseGLAccountUrl}`,{});
        return res.data;
    }

    static async getExpenseGLOdrTypeList(odrtype){
        let res=await this.rest_apiCall(`${getGLCodeOdrTypeUrl}${odrtype}`,{});
        return res.data;
    }

    static async insertPrimaryInfoData(body){
        console.log("Data entry .......")
        console.log(body)
        console.log("............")
        
       let res= await this.rest_apiCall(`${postPRAllRequestUrl}`,body);
       console.log("save Data Succefully ---")
       console.log(res.data);
       console.log(res);
       return res.data
       
    }
    static async insertVendorDetails(body){
        
        let res=await this.rest_apiCall(`${updatePRAllRequestUrl}`,body);
        console.log("Modify Success .........")
        console.log(res.data)
        console.log(res)
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    }

    static async insertLineItem(body){
        
        let res=await this.rest_apiCall(`${postLineItemUrl}`,body);
        console.log("Modify Success  insertLineItem Here ...........")
        console.log(res.data)
        console.log(res)
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        
    }
    // static async


}

export class CIPApi {
    static async CIPDataApi(companyCode) {
          
        let res = await axios.get(`https://spdev365api.omnicell.com/api/getPRCIP_Result?compCode=${companyCode}`)
        return res.data
        
    }
}