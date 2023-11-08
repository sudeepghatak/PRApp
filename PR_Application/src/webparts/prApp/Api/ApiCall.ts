import axios from 'axios'
import { apiEndpoint, getVendorNameUrl,getProjectCodeResultUrl, postPRAllRequestUrl, getCostCenterUrl, getExpenseGLAccountUrl, updatePRAllRequestUrl, getPlantCodeUrl, getLocPlantUrl, postLineItemUrl, RequestForUrl, CompanyCodeUrl, getCIPUrl, GLAccountUrl, getTypeOfPurGLCodeOdrTypeUrl, getDocItems, insertPlantLocUrl, insertDelegateUrl, getprrequestresultUrl, getsearchprrequestresultUrl, getprrequestiteminforesultUrl, getUserDeptUrl, getRegionUrl, getCountryUrl, getUOMUrl, getCurrencyChangeUrl, getExpenseGLUrl } from './Config/server_config'
import { EmployeeDetails } from '../Model/employee_details'

export class restApiCall {
   static  async rest_apiCall(url,body){
    console.log("This is Api EndPont ")
    console.log(` ${apiEndpoint}${url}`)
    console.log(body)
    console.log(body)
       let res=await axios.post(`${apiEndpoint}${url}`,body);
       console.log(res);
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
    static async getUserDeptList(cost:string,company:string){
        let res=await this.rest_apiCall(`${getUserDeptUrl}${cost}&company=${company}`,{});
        // console.log("getUserDeptList== ",res);   
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

    // static async getExpenseGLOdrTypeList(odrtype){
    //     let res=await this.rest_apiCall(`${getGLCodeOdrTypeUrl}${odrtype}`,{});
    //     return res.data;
    // }
    
    static async getRequestFor(empname:string){
        let res=await this.rest_apiCall(`${RequestForUrl}${empname}`,{});
        return res.data;
    }

    static async getGLAccountValue(prtype:string,option:string){
        let resGL= await this.rest_apiCall(`${GLAccountUrl}${prtype}&option=${option}`,{})
        console.log(resGL.data);   
        return resGL.data;
    }

    static async getCompanycode(){
        
        let resComCode=await this.rest_apiCall(`${CompanyCodeUrl}`,{});
        return resComCode;
    }

    static async GetTypeOfPurGLCodeOdrType(pType:string,option:string,purType:string){
        let res=await this.rest_apiCall(`${getTypeOfPurGLCodeOdrTypeUrl}${pType}&option=${option}&purType=${purType}`,{})
        return res.data;
    }

    static async getCIPcode(comcode){
        
        let resCIPcode=await this.rest_apiCall(`${getCIPUrl}${comcode}`,{});
        console.log(resCIPcode);
        return resCIPcode.data;
    }
     static async getDocTypeurl(pID){
        
        let res=await this.rest_apiCall(`${getDocItems}${pID}&cT=X`,{});
        console.log("getDocTypeurl----",res);
        return res.data;
    }

    static async GetRegionUrl(cKey){
        
        let res=await this.rest_apiCall(`${getRegionUrl}${cKey}`,{});
        return res.data;
    }    
     static async GetCountryUrl(){
        
        let res=await this.rest_apiCall(`${getCountryUrl}`,{});
        return res.data;
    }

    static async GetUOMUrl(){
        
        let res=await this.rest_apiCall(`${getUOMUrl}`,{});
        return res.data;
    }
     static async GetCurrencyChangeUrl(fromCurr,toCurr){
        let res=await this.rest_apiCall(`${getCurrencyChangeUrl}${fromCurr}&to=${toCurr}`,{});
        return res.data;
    }
    static async GetExpenseGL(pPGL:string){
        let res=await this.rest_apiCall(`${getExpenseGLUrl}${pPGL}`,{})
        return res.data;
    }

    static async getallEmployeList(empname:string){
        let employeeDetailsList=[];
        if(empname!==""){
        let employeList=await this.getRequestFor(empname);
        for(let i=0;i<employeList.length;i++){
            let fullName: string = employeList[i].FirstName + " " + employeList[i].LastName;
        let employeeDetail=new EmployeeDetails(employeList[i].EmployeeID,employeList[i].Email,fullName,employeList[i].CompanyCode,employeList[i].CostCenter,employeList[i].LegacyCompany)
         employeeDetailsList.push(employeeDetail)
        }
    }
         return employeeDetailsList;
 
    }



    static async insertPrimaryInfoData(body,type:boolean){
        console.log("Data entry .......")
        console.log(body)
        console.log("............")
        let inserEndpoint:string=(type)?`${postPRAllRequestUrl}`:`${postPRAllRequestUrl}?cT=X`
        
       let res= await this.rest_apiCall(`${inserEndpoint}`,body);
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
    static async insertPlantLoc(body){
        let res= await this.rest_apiCall(`${insertPlantLocUrl}`,body);
        console.log("PlantLoc---PlantLoc---PlantLoc :::",res,res.data);
        
    }
    // static async

    static async storeDelegateTask(body){
        
        let res=await this.rest_apiCall(`${insertDelegateUrl}`,body);
        console.log("Degelate Insert Succefully --- ",res)
        return res;
    }

    static async getPrbasicInfoContent(cId){
    
        let res=await this.rest_apiCall(`${getprrequestresultUrl}${cId}`,{});
        console.log("This is basicInfo data Here ----",res.data)
        return res.data[0];
    }

    static async getPrlineItemContent(cId){
        
        let res=await this.rest_apiCall(`${getprrequestiteminforesultUrl}${cId}`,{});
        return res.data;
    }


    static async getsearchByResponse(pid:string,cT:string){
        
        let res=await this.rest_apiCall(`${getsearchprrequestresultUrl}?pID=${pid}&cT=${cT}`,{});
        return res.data;
    }

    static async deleteSelectedOrder(pid:string){
        
        let res=await this.rest_apiCall(`${postPRAllRequestUrl}?pID=${pid}`,{});
       console.log("Delete -- ",res)
        return res.data;
    }




}

