import axios from 'axios'
import { apiEndpoint, ApprovalsForApprovalIdUrl, getVendorNameUrl, getProjectCodeResultUrl, postPRAllRequestUrl, getCostCenterUrl, getExpenseGLAccountUrl, updatePRAllRequestUrl, getPlantCodeUrl, getLocPlantUrl, postLineItemUrl, RequestForUrl, CompanyCodeUrl, getCIPUrl, GLAccountUrl, getTypeOfPurGLCodeOdrTypeUrl, getDocItems, insertPlantLocUrl, insertDelegateUrl, getprrequestresultUrl, getsearchprrequestresultUrl, getprrequestiteminforesultUrl, getUserDeptUrl, getRegionUrl, getCountryUrl, getUOMUrl, getCurrencyChangeUrl, getExpenseGLUrl, getManagerDetails, getJobLevel, getVacationLeave, InsertApprovalLog, FinanceApprovallog, DelLineItem, delDocItem, getpaginationURL, prApprovaldelete, getApprovalLimit, EHSapprovalURL, getBlnkCmpVenDetails, getauditTrailURL, getapprovallogURL } from './Config/server_config'
import { EmployeeDetails } from '../Model/employee_details'

export class restApiCall {
    static async rest_apiCall(url: string, body: any) {
        console.log("This is Api EndPont ")
        console.log(` ${apiEndpoint}${url}`)
        console.log(body)
        console.log(body)
        console.log("---- 11", `${apiEndpoint}${url}`, body)
        let res = await axios.post(`${apiEndpoint}${url}`, body);
        console.log(res);
        return res;

    }
    static async vendorDataApi(companyCode: string) {
        let res = await this.rest_apiCall(`${getVendorNameUrl}${companyCode}`, {});
        return res.data;
    }

    static async getProjetCodeList(projectName: string) {
        let res = await this.rest_apiCall(`${getProjectCodeResultUrl}${projectName}`, {});
        return res.data;
    }

    static async getCostCenterList(comCode: string) {
        let res = await this.rest_apiCall(`${getCostCenterUrl}${comCode}`, {});
        return res.data;
    }
    static async getUserDeptList(cost: string, company: string) {
        let res = await this.rest_apiCall(`${getUserDeptUrl}${cost}&company=${company}`, {});
        // console.log("getUserDeptList== ",res);   
        return res.data;
    }
    static async getShipToAddList(comCode: string) {
        let res = await this.rest_apiCall(`${getPlantCodeUrl}${comCode}`, {});
        return res.data;
    }

    static async getPlantLoc(loc: string) {
        let res = await this.rest_apiCall(`${getLocPlantUrl}${loc}`, {});
        return res.data;
    }

    static async getShippingAddress(companyCode: string) {
        let getShippingList = [];
        let companyCodeList = await this.getShipToAddList(companyCode);
        for (let i: number = 0; i < companyCodeList.length; i++) {
            let platList = await this.getPlantLoc(companyCodeList[i].Plant);
            console.log("----------------", companyCodeList[i].plant)
            console.log(platList);
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk")
            for (let j: number = 0; j < platList.length; j++) {
                getShippingList.push(platList[j].Title);
            }

        }
        getShippingList.push("Other Shipping Location");
        return getShippingList;

    }

    static async getExpenseGLList() {
        let res = await this.rest_apiCall(`${getExpenseGLAccountUrl}`, {});
        return res.data;
    }




    // static async getExpenseGLOdrTypeList(odrtype){
    //     let res=await this.rest_apiCall(`${getGLCodeOdrTypeUrl}${odrtype}`,{});
    //     return res.data;
    // }

    static async getRequestFor(empname: string) {
        let res = await this.rest_apiCall(`${RequestForUrl}${empname}`, {});
        return res.data;
    }


    static async getApprovalsForApprovalId(approvalId: string) {
        let res = await this.rest_apiCall(`${ApprovalsForApprovalIdUrl}${approvalId}`, {});
        return res.data;
    }

    static async getGLAccountValue(prtype: string, option: string) {
        let resGL = await this.rest_apiCall(`${GLAccountUrl}${prtype}&option=${option}`, {})
        console.log(resGL.data);
        return resGL.data;
    }

    static async getCompanycode() {

        let resComCode = await this.rest_apiCall(`${CompanyCodeUrl}`, {});
        return resComCode;
    }

    static async GetTypeOfPurGLCodeOdrType(pType: string, option: string, purType: string) {
        let res = await this.rest_apiCall(`${getTypeOfPurGLCodeOdrTypeUrl}${pType}&option=${option}&purType=${purType}`, {})
        return res.data;
    }

    static async getCIPcode(comcode: string) {

        let resCIPcode = await this.rest_apiCall(`${getCIPUrl}${comcode}`, {});
        console.log(resCIPcode);
        return resCIPcode.data;
    }
    static async getDocTypeurl(pID: string) {

        let res = await this.rest_apiCall(`${getDocItems}${pID}&cT=X`, {});
        console.log("getDocTypeurl----", res);
        return res.data;
    }

    static async GetRegionUrl(cKey: string) {

        let res = await this.rest_apiCall(`${getRegionUrl}${cKey}`, {});
        return res.data;
    }
    static async GetCountryUrl() {

        let res = await this.rest_apiCall(`${getCountryUrl}`, {});
        return res.data;
    }

    static async GetUOMUrl() {

        let res = await this.rest_apiCall(`${getUOMUrl}`, {});
        return res.data;
    }
    static async GetCurrencyChangeUrl(fromCurr: string, toCurr: string) {
        let res = await this.rest_apiCall(`${getCurrencyChangeUrl}${fromCurr}&to=${toCurr}`, {});
        return res.data;
    }
    static async GetExpenseGL(pPGL: string) {
        let res = await this.rest_apiCall(`${getExpenseGLUrl}${pPGL}`, {})
        return res.data;
    }

    static async getallEmployeList(empname: string) {
        let employeeDetailsList = [];
        if (empname !== "") {
            let employeList = await this.getRequestFor(empname);
            for (let i = 0; i < employeList.length; i++) {
                let fullName: string = employeList[i].FirstName + " " + employeList[i].LastName;
                let employeeDetail = new EmployeeDetails(employeList[i].EmployeeID, employeList[i].Email, fullName, employeList[i].CompanyCode, employeList[i].CostCenter, employeList[i].LegacyCompany)
                employeeDetailsList.push(employeeDetail)
            }
        }
        return employeeDetailsList;

    }



    static async insertPrimaryInfoData(body: any, type: boolean) {
        console.log("Data entry .......")
        console.log(body)
        console.log("............")
        let inserEndpoint: string = (type) ? `${postPRAllRequestUrl}` : `${postPRAllRequestUrl}?cT=X`

        let res = await this.rest_apiCall(`${inserEndpoint}`, body);
        console.log("save Data Succefully ---")
        console.log(res.data);
        console.log(res);
        return res.data

    }
    static async insertVendorDetails(body: any) {

        let res = await this.rest_apiCall(`${updatePRAllRequestUrl}`, body);
        console.log("Modify Success .........")
        console.log(res.data)
        console.log(res)
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    }

    static async insertLineItem(body: any) {

        let res = await this.rest_apiCall(`${postLineItemUrl}?cT=i`, body);
        console.log("Modify Success  insertLineItem Here ...........")
        console.log(res.data)
        console.log(res)
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    }
    static async updateLineItem(body: any) {
        await this.rest_apiCall(`${postLineItemUrl}?cT=u`, body);
    }
    static async insertPlantLoc(body: any) {
        let res = await this.rest_apiCall(`${insertPlantLocUrl}`, body);
        console.log("PlantLoc---PlantLoc---PlantLoc :::", res, res.data);

    }

    // static async

    static async storeDelegateTask(body: any) {

        let res = await this.rest_apiCall(`${insertDelegateUrl}`, body);
        console.log("Degelate Insert Succefully --- ", res)
        return res;
    }

    static async getPrbasicInfoContent(cId: string) {

        let res = await this.rest_apiCall(`${getprrequestresultUrl}${cId}`, {});
        console.log("This is basicInfo data Here ----", res.data)
        return res.data[0];
    }

    static async getPrlineItemContent(cId: any) {

        let res = await this.rest_apiCall(`${getprrequestiteminforesultUrl}${cId}`, {});
        return res.data;
    }


    static async getsearchByResponse(pid: string, cT: string) {

        let res = await this.rest_apiCall(`${getsearchprrequestresultUrl}?pID=${pid}&cT=${cT}`, {});
        return res.data;
    }

    static async deleteSelectedOrder(pid: string) {

        let res = await this.rest_apiCall(`${postPRAllRequestUrl}?pID=${pid}`, {});
        console.log("Delete -- ", res)
        return res.data;
    }
    //approval log---------------------------------------
    static async GetManagerDetails(emp: string) {
        let res = await this.rest_apiCall(`${getManagerDetails}${emp}`, {})
        return res.data;
    }

    static async GetJobLevelDetails() {
        let res = await this.rest_apiCall(`${getJobLevel}`, {})
        return res.data;
    }

    static async GetVacationLeave() {
        let res = await this.rest_apiCall(`${getVacationLeave}`, {})
        return res.data;
    }
    static async GetempEmail(emp: string) {
        let res = await this.rest_apiCall(`${getVacationLeave}${emp}`, {})
        return res.data;
    }
    static async InsertApprovalLog(body: any) {
        let res = await this.rest_apiCall(`${InsertApprovalLog}`, body);
        console.log("-----253", res, res.data);

    }
    static async FinanceApprovallog() {
        let res = await this.rest_apiCall(`${FinanceApprovallog}`, {});
        return res.data;
    }
    static async DeleleLineItem(body: any) {
        let res = await this.rest_apiCall(`${DelLineItem}`, body)
        return res.data;
    }
    static async deleleDocItem(CnnectPrid: string, flName: string) {
        let res = await this.rest_apiCall(`${delDocItem}${CnnectPrid}&flName=${flName}`, {})
        return res.data;
    }
    //vendor Details
    static async getPaginationData(companyCode: string, offset: number) {

        let res = await this.rest_apiCall(`${getpaginationURL}${companyCode}&offValue=${offset}`, {});
        return res.data;
    }
    //Get blank comCode Vendor Details
    static async GetBlnkCmpVenDetails(offset: number) {
        let res = await this.rest_apiCall(`${getBlnkCmpVenDetails}${offset}`, {});
        return res.data;
    }

    //Approval log delete---
    static async prApprovaldelete(pid: string) {
        await this.rest_apiCall(`${prApprovaldelete}${pid}&cT=d`, {})

    }
    //Approval Limit List-----
    static async getApprovalLimitList() {
        let res = await this.rest_apiCall(`${getApprovalLimit}`, {});
        console.log("approvalLimit List  -- ", res)
        return res.data;
    }
    //Ehs Approval------------
    static async getEHSapproval() {

        let res = await this.rest_apiCall(`${EHSapprovalURL}`, {});
        return res.data;
    }
    static async getApprovalLog(pId: string) {
        let approvalRes = await this.rest_apiCall(`${getapprovallogURL}${pId}&cT=X`, {});
        return approvalRes.data;
    }

    static async getAuditTrail(pId: string) {

        let auditTrailres = await this.rest_apiCall(`${getauditTrailURL}${pId}`, {})
        return auditTrailres.data;
    }


}

