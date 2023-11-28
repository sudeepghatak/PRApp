import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restApiCall } from "../../webparts/prApp/Api/ApiCall";
import { fileInformation } from "./primaryinfoSlice";
import { BasicInfoObj, basicInfoitem } from "../../webparts/prApp/Model/BasicInfoline";


interface ISupplier{
    "Supplier_Number":string;
    "Supplier_Name":string;
    "Supplier_Address":string;
    "Supplier_City":string;
    "Supplier_State":string;
    "Supplier_Zip":string;
    "Supplier_Country":string;
    "Special_Instructions":string;
    "Justification_Reason_for_Order":string;
    // "Shipping_Location":string;
    "Location":string;
    "Shipping_Name":string;
    "Shipping_Street":string;
"Shipping_Postal_Code":string;
"Shipping_Region":string;
"Shipping_Country":string;
"Shipping_Location":string;
"Shipping_ContactPhone":string;

}

// interface ILineItemInfo{
//     "description":string;
//     "prepaid_to_date":string;
//     "prepaid_from_date":string;
//     "cost_center":string;
//     "date_required":string;
//     "gl_account":string;
//     "qty":string;
//     "uom":string;
//     "unit_price":string;
//     "unit_price_per":string;
//     "total_amount":string;
// }
interface IBasicInfo{
    "PR_Type":string;
    "Total_Order_Amount":string;
    "SAP_PR_PO_Request_ID":string;
    "Connect_PR_Request_ID":string;
    "Status":string;
    "Cost_Center":string;
    "Type_Of_Buy":string;
    "Prepaid_or_Capital_buy":string;
    "CIP_Number":string;
    "UFID":string;
    "Type_of_Order":string;
    "EHS_Relevant":string;
    "Is_this_Project_Related":string;
    "Project_Code":string;
    "lineInfoList":BasicInfoObj[]
}

interface IStatus{
    statusTitle:string;
    basicInfo:IBasicInfo;
    supplier:ISupplier;
    attatchmentInfo:fileInformation[];
    isLoading:boolean;
}
const initialState:IStatus={
    statusTitle:"",
    basicInfo:{
        PR_Type: "",
        Total_Order_Amount: "",
        SAP_PR_PO_Request_ID: "",
        Connect_PR_Request_ID: "",
        Status: "",
        Cost_Center: "",
        Type_Of_Buy: "",
        Prepaid_or_Capital_buy: "",
        CIP_Number: "",
        UFID: "",
        Type_of_Order: "",
        EHS_Relevant: "",
        Is_this_Project_Related: "",
        Project_Code: "",
        lineInfoList:[]
    },
    supplier: {
        Supplier_Number: "",
        Supplier_Name: "",
        Supplier_Address: "",
        Supplier_City: "",
        Supplier_State: "",
        Supplier_Zip: "",
        Supplier_Country: "",
        Special_Instructions: "",
        Justification_Reason_for_Order: "",
        // Shipping_Location: "",
        Location:"",
        Shipping_Name:"",
        Shipping_Street:"",
    Shipping_Postal_Code:"",
    Shipping_Region:"",
    Shipping_Country:"",
    Shipping_Location:"",
    Shipping_ContactPhone:"",
    },
    attatchmentInfo:[],
    isLoading:true
}
export const fetchStatusContent = createAsyncThunk(

    'fetchStatusContent',

    async (pID:string) => {
            let res=await restApiCall.getPrbasicInfoContent(pID);
            console.log("Data Here StatusSlice File 113",res);
            let lineinfo= await restApiCall.getPrlineItemContent(pID)
           let attatchmentData=await restApiCall.getDocTypeurl(
            pID
          );
        
          console.log("Atatchment 118 --- Data Here ",attatchmentData)

         
          let attatchmentDataList=[];
          if (attatchmentData.length !== 0) {
            for (let i: number = 0; i < attatchmentData.length; i++) {
            
                let getfileData:fileInformation = {
                  key: attatchmentData[i].ConnectPRID,
                  fileName: attatchmentData[i].Filename,
                  fileType: "file",
                  modifiedBy: attatchmentData[i].Modified_By,
                  fileModifiedTime: attatchmentData[i].Modified_Date,
                  docType: attatchmentData[i].Doc_Type,
                  content: attatchmentData[i].Content,
                };
                attatchmentDataList.push(getfileData);
                console.log(
                  " get Doc type Data ---------------------- >> ",
                  getfileData
                );
              
            }


          }
          console.log("Attatchment Data For Whole Content ---143",attatchmentDataList)

            let attatchmentDatainfo={
                attatchmentDataList:attatchmentDataList
            }
            let listLineinfo={
                "lineinfo":lineinfo
            }
            res={...res,...listLineinfo,...attatchmentDatainfo}
            console.log("This is The Whole Data Here --- ",res);
            return res;
     
      }
    

  )
export const statusSlice=createSlice({
    name: "reducers",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchStatusContent.pending, (state) => {
            state.isLoading=true;

            console.log("Pending....")
    
            // state.isLoading = true
    
          })
    
          builder.addCase(fetchStatusContent.fulfilled, (state, action) => {
            state.isLoading=false;
            // state.isLoading = fal
            console.log("Response TOP-----------action.payload173s ::",action.payload);
            state.statusTitle=(action.payload.Title==null)?" ":action.payload.Title;
            state.basicInfo.PR_Type=(action.payload.Company===null)?"":action.payload.Company;
            state.basicInfo.Total_Order_Amount=(action.payload.Order_Amount===null)?0.0:action.payload.Order_Amount;
            state.basicInfo.UFID=(action.payload.UFID==null)?" ":action.payload.UFID;
            state.basicInfo.Cost_Center=(action.payload.Cost_Center==null)?" ":action.payload.Cost_Center.toString();
            state.basicInfo.Status=(action.payload.Status==null)?" ":action.payload.Status;
            state.basicInfo.CIP_Number=(action.payload.CIP_Number==null)?" ":action.payload.CIP_Number;
            state.basicInfo.Type_of_Order=(action.payload.Type_Of_Order==null)?" ":action.payload.Type_Of_Order;
            state.basicInfo.Project_Code=(action.payload.ProjectCode==null)?" ":action.payload.ProjectCode;
            state.basicInfo.EHS_Relevant=(action.payload.EHS==null)?" ":(action.payload.EHS==false)?"No":"Yes";
            state.basicInfo.Prepaid_or_Capital_buy=(action.payload.PrepaidOrCapitalEquipment==null)?" ":action.payload.PrepaidOrCapitalEquipment;
            state.basicInfo.Type_Of_Buy=(action.payload.Type_Of_Buy==null)?" ":action.payload.Type_Of_Buy;
            state.basicInfo.Connect_PR_Request_ID=(action.payload.ConnectPRID==null)?" ":action.payload.ConnectPRID;
            state.basicInfo.Is_this_Project_Related=(action.payload.IsProjectPR==null)?"":(action.payload.IsProjectPR==false)?"No":"Yes";

            state.basicInfo.lineInfoList=[]
            if(action.payload.lineinfo.length!==0){
            for(let i=0;i<action.payload.lineinfo.length;i++){
                console.log("I DO THIS HERE ------------->>> ",action.payload.lineinfo[i],action.payload.lineinfo[i].TypeOfOrder)
               
                let lineinfoData:basicInfoitem={
                    description:action.payload.lineinfo[i].ItemDescription,
                    prepaid_to_date:action.payload.lineinfo[i].PrepaidToDate,
                    prepaid_from_date:action.payload.lineinfo[i].PrepaidFromDate,
                    costCenter: action.payload.lineinfo[i].Cost_Center,
                    date:action.payload.lineinfo[i].DateRequired,
                    glAccount: action.payload.lineinfo[i].GL_Account,
                    qty:action.payload.lineinfo[i].Qty,
                    UOM:action.payload.lineinfo[i].UOM,
                    uintprice:action.payload.lineinfo[i].Unit_Price,
                    unitpriceper:action.payload.lineinfo[i].UnitPricePer,
                    totalAmount:action.payload.lineinfo[i].Amount
                }
                
                let baiscItem
                // :BasicInfoObj
                ;

                if(state.basicInfo.lineInfoList.length ===0){
                    baiscItem=new BasicInfoObj(action.payload.lineinfo[i].TypeOfOrder)
                    ;
                    baiscItem.totalAmount=baiscItem.totalAmount+lineinfoData.totalAmount;
                    baiscItem.basicInfoObjList.push(lineinfoData)
                }else{

                    let onebasicinfoitem=state.basicInfo.lineInfoList.filter((newbasicItem:BasicInfoObj)=>newbasicItem.lineObjname ===action.payload.lineinfo[i].TypeOfOrder)
                    if(onebasicinfoitem.length ===0){
                        baiscItem=new BasicInfoObj(action.payload.lineinfo[i].TypeOfOrder)
                        ;
                        baiscItem.totalAmount=baiscItem.totalAmount+lineinfoData.totalAmount;
                        baiscItem.basicInfoObjList.push(lineinfoData)

                    }else{
                        onebasicinfoitem[0].totalAmount=onebasicinfoitem[0].totalAmount+lineinfoData.totalAmount;
                        onebasicinfoitem[0].basicInfoObjList.push(lineinfoData)
                    }


                }
               if(baiscItem !==undefined){
                state.basicInfo.lineInfoList.push(baiscItem)
               }


            }
        }


            state.supplier.Supplier_Number=(action.payload.Supplier_Account_Number ==null)?"":action.payload.Supplier_Account_Number

            state.supplier.Supplier_Name=(action.payload.Supplier_Name==null)?"":action.payload.Supplier_Name

            state.supplier.Supplier_Address=(action.payload.Supplier_Address==null)?"":action.payload.Supplier_Address

            state.supplier.Supplier_Zip=(action.payload.Supplier_Zip==null)?"":action.payload.Supplier_Zip

            state.supplier.Supplier_Country=(action.payload.Supplier_Country==null)?"":action.payload.Supplier_Country

            state.supplier.Supplier_State=(action.payload.Supplier_State==null)?"":action.payload.Supplier_Stat

            state.supplier.Supplier_City=(action.payload.Supplier_City==null)?"":action.payload.Supplier_City
            state.supplier.Special_Instructions=(action.payload.Comments==null)?"":action.payload.Comments

            state.supplier.Justification_Reason_for_Order=(action.payload.Special_Instructions==null)?"":action.payload.Special_Instructions




            state.supplier.Location=(action.payload.Location===null)?"":action.payload.Location

            state.supplier.Shipping_Name=(action.payload.Shipping_Name===null)?"":action.payload.Shipping_Name

            state.supplier.Shipping_Street=(action.payload.Shipping_Street===null)?"":action.payload.Shipping_Street

            state.supplier.Shipping_Postal_Code=(action.payload.Shipping_Postal_Code===null)?"":action.payload.Shipping_Postal_Code


            state.supplier.Shipping_Region=(action.payload.Shipping_Region===null)?"":action.payload.Shipping_Region

            state.supplier.Shipping_Country=(action.payload.Shipping_Country===null)?"":action.payload.Shipping_Country

            state.supplier.Shipping_Location=(action.payload.Shipping_Location===null)?"":action.payload.Shipping_Location

            state.supplier.Shipping_ContactPhone=(action.payload.Shipping_ContactPhone===null)?"":action.payload.Shipping_ContactPhone

            //attatchment data store 
            console.log("This is The Attatchment Data Here ==== ",action.payload.attatchmentDataList)

            state.attatchmentInfo=action.payload.attatchmentDataList;

            
            
        
        })
    
          builder.addCase(fetchStatusContent.rejected, (state, action) => {
            state.isLoading=false;
            // state.isLoading = false
    
          })
    }

});

  // It is a convention to export reducer as a default export:
  export default statusSlice.reducer;