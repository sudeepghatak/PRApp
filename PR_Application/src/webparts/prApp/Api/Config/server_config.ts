import { elementContains } from "@fluentui/react";

export const apiEndpoint="https://spdev365api.omnicell.com/api/";

export const getProjectCodeResultUrl="getProjectCode_Result?pCategory=";
export const getVendorNameUrl="getVendorName_Result?compCode=";
export const getExpenseGLAccountUrl= "getGLAccount_Result";
export const getCostCenterUrl="getCostCenter_Result?compCode=";
export const getUserDeptUrl="getDepCompEmp_Result?cost=";
export const getCIPUrl="getPRCIP_Result?compCode=";

export const getEmpDetailsUrl="getEmployees_Result?eName=";
export const getLocPlantUrl="getPlantLocation_Result?pLocation=";
export const getPlantCodeUrl="getPlantCode_Result?compCode=";
// export const getGLCodeOdrTypeUrl="getGLAccount_Result?ordType=";
export const postLineItemUrl="postRequestItem_Values";

export const postPRAllRequestUrl="postPRRequest_Values";
export const updatePRAllRequestUrl= "modifyPRRequest_Values";
export const RequestForUrl= "getEmployees_Result?eName=";
export const CompanyCodeUrl= "getCompanyCode_Result";

export const GLAccountUrl="getGLAccount_Result?pType=";
export const getTypeOfPurGLCodeOdrTypeUrl="getGLAccount_Result?pType=";

export const getDocItems="getPRRequest_Result?pID=";
export const insertPlantLocUrl="getPlantLocation_Result";

export const insertDelegateUrl="postPRVacation_Result";

export const getprrequestresultUrl="getPRRequest_Result?pID=";
export const getprrequestiteminforesultUrl="get_PR_Request_Items_info_Result?pID=";
export const getsearchprrequestresultUrl="getPRRequest_Result";

export const getRegionUrl="getState_Result?cKey=";
export const getCountryUrl="getCountry_Result"

export const getUOMUrl="getUOM_Result";
export const getCurrencyChangeUrl="usp_pr_currency_exchange_Result?from=";
export const getExpenseGLUrl="getPrepaidExpenseGL_Result?pPGL=";


export const getManagerDetails="getManagers_Result?emp=";
export const getJobLevel="getApprovalLimit_Result";
export const getVacationLeave="getPRVacation_Result";
export const getempEmail="getEmployees_Result?ename="
//vendor Details
export const getpaginationURL="getVendorName_Result?compCode="
// LineItem Approval
export const InsertApprovalLog="getPR_Approval_Log_Result?cT=i"
// Finance Approval
export const FinanceApprovallog="getOtherCCApprovalMapping_Result?cType=Finance Approval"
//Delete Line Item
export const DelLineItem="delPR_RequestItemsinfo";
//Delete DocItem :
export const delDocItem="postPRRequest_Values?pID=";
//Approval log Delete
export const prApprovaldelete="getPR_Approval_Log_Result?pID=";
//Approval Limit List
export const getApprovalLimit="getApprovalLimit_Result";
//Ehs Approval
export const EHSapprovalURL="getPRApprovers_Result?aType=EHS";

