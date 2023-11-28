import * as React from "react";
import {
  //  useContext,
    useEffect, useState } from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Icon,
  Stack,
  DefaultButton,
  DefaultPalette,
  Link,
} from "office-ui-fabric-react";
import { findIndex, map } from "lodash";
import LineItemTableFormat from "./TypeOfPurchase_TableFormat";
// import { tableBuildContext } from "./MainPage";
import { RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { TypeofPurchaseDetail } from "../../Model/TypePurchases/type_purchases_detail";
import { saveButtonClick } from "../../../../features/reducers/lineitemSlice";
import { restApiCall } from "../../Api/ApiCall";
import { GlobalStore } from "../../../../app/globalStore";
import { fetchSearchContent } from "../../../../features/reducers/searchSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import './StyleFourthComponent.css';
import './File.css';
import { TableChangeCurrencyData } from "./TableChangeCurrencyData";
import { IbackApi } from "../Ibackapi";

// interface ThirdProps {
//   [key: string]: React.FunctionComponent[];
// }
interface IThirdprops {
  buttonContxtSave: () => void;
  buttonContxtBack: () => void;
  isViewMode: boolean;
}
interface IAmountProps {
  id: number;
  amount: number;
  completedelete: boolean;
}
let listOftotalAmount: IAmountProps[] = [];

const LineItemComponent: React.FunctionComponent<IThirdprops> = (props) => {
  // const tableContent = useContext(tableBuildContext);
  const { buttonContxtSave, buttonContxtBack, isViewMode } = props;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const lineinfoData = useSelector((state: RootState) => state.lineiteminfo);
  // const vendorPKIDData = useSelector(
  //   (state: RootState) => state.vendorandshipping.PKID
  // );
  const [selectedItems, setSelectedItems] = React.useState<{
    [key: string]: IDropdownOption;
  }>({
    // GlAccount: { key: "", text: "" },
    UOM: { key: "", text: "" },
    prCurrency: { key: GlobalStore.getTitledata().currencyKey, text: "" },
  });
  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    
    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    console.log("Item::",newSelectedItem.text,selectedItems.prCurrency.text); 
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: newSelectedItem,
    }));
  };
  let currChng=selectedItems.prCurrency.text;

  const PrCurrency: IDropdownOption[] = [
    { key: "AED", text: "AED" },
    { key: "AUD", text: "AUD" },
    { key: "CAD", text: "CAD" },
    { key: "CHF", text: "CHF" },
    { key: "EUR", text: "EUR" },
    { key: "GBP", text: "GBP" },
    { key: "HKD", text: "HKD" },
    { key: "INR", text: "INR" },
    { key: "SGD", text: "SGD" },
    { key: "USD", text: "USD" },
  ];

  // const dropdownStyles: Partial<IDropdownStyles> = {
  //     dropdown: { width: 200 },
  //   };
  const dropdownStyles1: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
  };
 console.log("Change Amount::",selectedItems.prCurrency.key,GlobalStore.getTitledata().currencyKey);
  const [totalAmount, settotalAmount] = React.useState<number>(0);

  const addTotalAmount = (total: IAmountProps) => {
    // console.log(total);
    const index = findIndex(listOftotalAmount, (item) => item.id === total.id);
    if (!total.completedelete) {
      if (index !== -1) {
        // Update the existing object
        listOftotalAmount[index] = total;
      } else {
        // Add the new object to the array
        listOftotalAmount.push(total);
      }
    }
    if (total.completedelete) {
      listOftotalAmount = listOftotalAmount.filter((item) => item.id != index);
    }
    // console.log(listOftotalAmount);
    // let totalValue: number = 0;

    let totalnumber: number = map(listOftotalAmount, "amount").reduce(
      (acc, curr) => acc + curr,
      0
    );
    settotalAmount(totalnumber);
  };
//Change Currency Value----------------------------------
 const[chngCurrData,setchngCurrData]  = useState<boolean>(false);
 const PopupchngCurrData=()=>{
  setchngCurrData(!chngCurrData);
 }
 const linkClickData=()=>{
    PopupchngCurrData();
 };

  const [CurrChange, setCurrChange] = useState<string>("");
  console.log("CurrChange::", CurrChange);

  let changenum: number = +CurrChange;
  if (changenum < 0) {
    changenum = -(totalAmount / changenum);
  } else if (changenum > 0) {
    changenum = totalAmount * changenum;
  }
  let changeCurrencyValue=(selectedItems.prCurrency.key !== GlobalStore.getDefaultCurr()) 
                          ?changenum:0.00

  console.log("changeCurrencyValue--",changeCurrencyValue);
//------------------------------------------------------------------------  

  useEffect(() => {
    let changeCurrVal = [];
    restApiCall
      .GetCurrencyChangeUrl(
        (selectedItems.prCurrency.key as string),
        GlobalStore.getDefaultCurr()
      )
      .then((value) => {
        // console.log("tableviewItem.typeofPurchaseOption---tableviewItem.typeofPurchaseOption",tableviewItem.typeofPurchaseOption,tableviewItem.typeofPurchaseName);
        for (let i: number = 0; i < value.length; i++) {
          let newOption = {
            key: value[i],
            text: value[i].ExchangeRate,
          };
          changeCurrVal.push(newOption);
          setCurrChange(newOption.text);
        }
      });
  }, [selectedItems.prCurrency.key]);
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
//  console.log("GlobalStore:GlobalStore::",totalAmount,currChng,changeCurrencyValue);
//  console.log("this DefaultCurr currency ::",GlobalStore.getDefaultCurr());
 
const saveIntoTable = async () => {
    // lineinfoData.saveTable =1
    // saveButtonClick()
    GlobalStore.setTotal(totalAmount);
    GlobalStore.setChngCurr(currChng);
    GlobalStore.setChangCurrTotalAmount(changenum);
    console.log("GlobalStore:GlobalStore save::",totalAmount,currChng,changenum);
    
    dispatch(saveButtonClick(1));

        let saveLineValueDetails:IbackApi[] = [
      {
        PKID: GlobalStore.getPrId(),
        ConnectPRID: GlobalStore.getPrId(),
        Type_Of_Buy: null,
        PrepaidOrCapitalEquipment: null,
        EHS: null,
        Title: null,
        RequestFor: null,
        Type_Of_Order: null,
        Order_Amount: totalAmount,
        CIP_Number: null,
        UFID: null,
        Supplier_Account_Number: null,
        Supplier_Name: null,
        Supplier_Address: null,
        Supplier_City: null,
        Supplier_State:null,
        Supplier_Zip: null,
        Supplier_Country: null,
        Manager: null,
        Manager1: null,
        Manager2: null,
        Manager3: null,
        GL_Account: null,
        Status: null,
        TaskCreatedFor: null,
        ApprovalInstance: null,
        Comments: null,
        Cost_Center: null,
        Location: null,
        IsDeleted: null,
        Special_Instructions: null,
        Shipping_Name: null ,
        Shipping_Street: null,
        Shipping_Postal_Code: null,
        Shipping_Location: null,
        Shipping_Region: null,
        Shipping_Country: null,
        Shipping_ContactPhone: null,
        OldReqId: null,
        SAPPRId: null,
        LastWorkflowRun: null,
        CurrentApprovalStep: null,
        ManagerLevel: null,
        FinalApprovalDate: null,
        IsOtherCC: null,
        IsCFOApproved: null,
        CFO: null,
        AllApprovers: null,
        CreateDate: null,
        LastStatus: null,
        AllManagers: null,
        JLReminderCount: null,
        FIReminderCount: null,
        AesyntPRType: null,
        PONumber: null,
        IsCompleted: null,
        Company: null,
        ProjectNumber: null,
        ActCostCenter: null,
        CompanyCode: null,
        FromCurrency: null,
        ToCurrency: null,
        RequesterCurrency: null,
        ExchangeRate: null,
        ExchangeRateV: null,
        ExchangeRateDate: null,
        ConvertedDollerAmount: null,
        CountryKey: null,
        HRADCompanyCode: null,
        QuickbookPO: null,
        CCDescription: null,
        IsProjectPR: null,
        ProjectDepartment: null,
        ProjectCode: null,
        Created: null,
        CreatedBy: null,
        Modified: null,
        ModifiedBy: null,
        PRNumber: null,
        DWCreateDate: null,
        PRId: GlobalStore.getPrId(),
        OldAllApprovers: null,
        OldAllManagers: null,
        OldCFO: null,
        OldCreatedBy: null,
        OldManager: null,
        OldManager1: null,
        OldManager2: null,
        OldManager3: null,
        OldModifiedBy: null,
        OldRequestFor: null,
        OldTaskCreatedFor: null,
      },
    ];
    await restApiCall.insertVendorDetails(saveLineValueDetails);
 
    let saveList = [];
    let copySaveList = [];
    for (
      let i: number = 0;
      i < lineinfoData.TypeofPurchaseDetailList.length;
      i++
    ) {
      console.log(
        lineinfoData.TypeofPurchaseDetailList[i].demotypeOfPurchaseInfoList
      );
      lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList = [
        ...lineinfoData.TypeofPurchaseDetailList[i].demotypeOfPurchaseInfoList,
      ];
 
      let notnulltypeOfPurchaseInfoList = lineinfoData.TypeofPurchaseDetailList[
        i
      ].typeOfPurchaseInfoList.filter(
        (childtypeofPurchases:any) => childtypeofPurchases.PKID != null
      );
 
      let nulltypeOfPurchaseInfoList = lineinfoData.TypeofPurchaseDetailList[
        i].typeOfPurchaseInfoList.filter(
        (childtypeofPurchases:any) => childtypeofPurchases.PKID == null
      );
 
      for (let k: number = 0; k < notnulltypeOfPurchaseInfoList.length; k++) {
        let dateofItem = new Date(notnulltypeOfPurchaseInfoList[k].date);
        let itemdate: string =
          (dateofItem.getMonth() + 1).toString() +
          "/" +
          dateofItem.getDate().toString() +
          "/" +
          dateofItem.getFullYear().toString();
 
        let prepaidtodateofItem = new Date(
          notnulltypeOfPurchaseInfoList[k].prepaid_to_date
        );
        let prepaidtoitemdate: string =
          (prepaidtodateofItem.getMonth() + 1).toString() +
          "/" +
          prepaidtodateofItem.getDate().toString() +
          "/" +
          prepaidtodateofItem.getFullYear().toString();
 
        let prepaidfromdateofItem = new Date(
          notnulltypeOfPurchaseInfoList[k].prepaid_from_date
        );
        let prepaidfromitemdate: string =
          (prepaidfromdateofItem.getMonth() + 1).toString() +
          "/" +
          prepaidfromdateofItem.getDate().toString() +
          "/" +
          prepaidfromdateofItem.getFullYear().toString();
 
        console.log(
          "SKKKKKKKKKKKKKKK 524 524 524 ",
          itemdate,
          prepaidtoitemdate,
          prepaidfromitemdate
        );
        let bodyItem = {
          PKID: notnulltypeOfPurchaseInfoList[k].PKID,
          ConnectPRID: GlobalStore.getPrId(),
          DateRequired: itemdate,
          Qty: notnulltypeOfPurchaseInfoList[k].qty,
          UOM: notnulltypeOfPurchaseInfoList[k].uOM,
          Plant: null,
          Amount: notnulltypeOfPurchaseInfoList[k].totalamount,
          Cost_Center:lineinfoData.TypeofPurchaseDetailList[i].CostCenter,
          GL_Account: notnulltypeOfPurchaseInfoList[k].glAccount,
          Unit_Price: notnulltypeOfPurchaseInfoList[k].unitPrice,
          Requester_Name: GlobalStore.getName(),
          Requester_LoginName: GlobalStore.getEmail(),
          TypeOfOrder:
            lineinfoData.TypeofPurchaseDetailList[i].typeofPurchaseName,
          ItemDescription: notnulltypeOfPurchaseInfoList[k].des,
          Manager1: null,
          Manager2: null,
          Manager3: null,
          Manager4: null,
          PrepaidFromDate: prepaidfromitemdate,
          PrepaidToDate: prepaidtoitemdate,
          OverallLimit: notnulltypeOfPurchaseInfoList[k].prepaid_,
          AssetNbr: notnulltypeOfPurchaseInfoList[k].CFID,
          UnitPricePer: notnulltypeOfPurchaseInfoList[k].unitPricePer,
          OtherTypeOfOrder: null,
          ExpenseGL: notnulltypeOfPurchaseInfoList[k].expensegl,
          IsDeleted: 0,
          ProjCode: notnulltypeOfPurchaseInfoList[k].projectCode,
          Created: currentDate,
          CreatedBy: GlobalStore.getmainEmail(),
          Modified: null,
          ModifiedBy: null,
        };
        copySaveList.push(bodyItem);
      }
 
      for (let j: number = 0; j < nulltypeOfPurchaseInfoList.length; j++) {
       let dateofItem = new Date(nulltypeOfPurchaseInfoList[j].date);
        let itemdate: string =
          (dateofItem.getMonth() + 1).toString() +
          "/" +
          dateofItem.getDate().toString() +
          "/" +
          dateofItem.getFullYear().toString();
 
        let prepaidtodateofItem = new Date(
          nulltypeOfPurchaseInfoList[j].prepaid_to_date
        );
        let prepaidtoitemdate: string =
          (prepaidtodateofItem.getMonth() + 1).toString() +
          "/" +
          prepaidtodateofItem.getDate().toString() +
          "/" +
          prepaidtodateofItem.getFullYear().toString();
 
        let prepaidfromdateofItem = new Date(
          nulltypeOfPurchaseInfoList[j].prepaid_from_date
        );
        let prepaidfromitemdate: string =
          (prepaidfromdateofItem.getMonth() + 1).toString() +
          "/" +
          prepaidfromdateofItem.getDate().toString() +
          "/" +
          prepaidfromdateofItem.getFullYear().toString();
 
        // console.log(
        //   "Date-----",
        //   dateofItem,
        //   prepaidtoitemdate,
        //   prepaidfromitemdate
        // );
        console.log("cost center SAVE::",lineinfoData.TypeofPurchaseDetailList[i].CostCenter);
        
        let bodyItem = {
          PKID: GlobalStore.getPrId(),
          ConnectPRID: GlobalStore.getPrId(),
          DateRequired: itemdate,
          Qty: nulltypeOfPurchaseInfoList[j].qty,
          UOM: nulltypeOfPurchaseInfoList[j].uOM,
          Plant: null,
          Amount: nulltypeOfPurchaseInfoList[j].totalamount,
          Cost_Center: lineinfoData.TypeofPurchaseDetailList[i].CostCenter,
          GL_Account: nulltypeOfPurchaseInfoList[j].glAccount,
          Unit_Price: nulltypeOfPurchaseInfoList[j].unitPrice,
          Requester_Name: GlobalStore.getName(),
          Requester_LoginName: GlobalStore.getEmail(),
          TypeOfOrder:lineinfoData.TypeofPurchaseDetailList[i].typeofPurchaseName,
          ItemDescription: nulltypeOfPurchaseInfoList[j].des,
          Manager1: null,
          Manager2: null,
          Manager3: null,
          Manager4: null,
          PrepaidFromDate: prepaidfromitemdate,
          PrepaidToDate: prepaidtoitemdate,
          OverallLimit: nulltypeOfPurchaseInfoList[j].prepaid_,
          AssetNbr: nulltypeOfPurchaseInfoList[j].CFID,
          UnitPricePer: nulltypeOfPurchaseInfoList[j].unitPricePer,
          OtherTypeOfOrder: null,
          ExpenseGL: nulltypeOfPurchaseInfoList[j].expensegl,
          IsDeleted: 0,
          ProjCode: nulltypeOfPurchaseInfoList[j].projectCode,
          Created: currentDate,
          CreatedBy: GlobalStore.getmainEmail(),
          Modified: null,
          ModifiedBy: null,
        };
        saveList.push(bodyItem);
      }
    }
    console.log("Line item data Here 481", GlobalStore.getPrId(), saveList);
    if (lineinfoData.Finalpage === `view${GlobalStore.getPrId()}`) {
      console.log("-----Update --- lineinfo data 554");
      buttonContxtSave();
    } else if (lineinfoData.Finalpage === `edit${GlobalStore.getPrId()}${GlobalStore.getRandomNumber()}`) {
      console.log("-----Update --- lineinfo data 557,", saveList, copySaveList);
      if (saveList.length !== 0) {
        console.log("Insert Here 668 557", saveList);
        await restApiCall.insertLineItem(saveList);
      }
      if (copySaveList.length !== 0) {
        console.log("Insert Here 671 557", copySaveList);
        await restApiCall.updateLineItem(copySaveList);
      }
      dispatch(fetchSearchContent("MyOrder"));
      buttonContxtSave();

    } else if (lineinfoData.Finalpage === "prsubmit") {
      console.log("-----Insert lineinfo data 559");
      await restApiCall.insertLineItem(saveList);
      dispatch(fetchSearchContent("MyOrder"));
      buttonContxtSave();
    }
  };
  return (
    <>
      <div>
        <Stack>
          <Stack tokens={{ childrenGap: 10 }}>
            <Stack horizontal horizontalAlign="space-between">
              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.whiteTranslucent40,
                    color: DefaultPalette.blue,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  onClick={() => buttonContxtBack()}
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Back" />
                    </span>
                    <span>Back</span>
                  </Stack>
                </DefaultButton>
              </span>

              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.green,
                    color: DefaultPalette.white,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  onClick={() => saveIntoTable()}
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Save" />
                    </span>
                    <span>Save & Continue</span>
                  </Stack>
                </DefaultButton>
              </span>
            </Stack>
          </Stack>
          <Stack>
            <Stack.Item align="start" style={{ display: "flex" }}>
              <span style={{ marginRight: "10px" }}>Select Currency: </span>
              
              <Dropdown
                disabled={isViewMode}
                id="prCurrency"
                placeholder="Select Currency"
                onChange={changeDropdownOption}
                options={PrCurrency}
                selectedKey={selectedItems["prCurrency"]?.key}
                styles={dropdownStyles1}
              />
            </Stack.Item>
          </Stack>
{/* //currency value-------------------------------------- */}
  <div className='button-border-end '>
    <div className='borderline'>
      <Stack horizontal horizontalAlign="space-between" 
      style={{marginBottom: "30px",marginTop: "10px"}} >
        <Stack.Item  >
          <Stack horizontal horizontalAlign="baseline">    
            {selectedItems.prCurrency.key !== GlobalStore.getDefaultCurr() ? (
              <Stack.Item align="end" style={{ display: "flex" }}>
                <Link  style={{ color: "blue" }}
                      onClick={linkClickData}
                >
                <span style={{ marginRight: "10px" }}>
                  Total Order Amount in (
                  {GlobalStore.getDefaultCurr()}):{" "}
                </span>
                <span> {changeCurrencyValue}</span>
              </Link>
              {chngCurrData?
                <div className="linkChngcurrPopup">
                  <TableChangeCurrencyData 
                    isModalOpen={chngCurrData} 
                    showModal={PopupchngCurrData}  
                    FormCurr={selectedItems.prCurrency.key as string}   
                  />
                </div>:null}
              </Stack.Item>
            ) : null}
          </Stack>
        </Stack.Item>
      <Stack.Item >
        <Stack horizontal horizontalAlign="baseline">
            <Stack.Item align="end" style={{ display: "flex" }}>
              <span style={{ marginRight: "10px" }}>
                Total Order Amount in ({selectedItems.prCurrency.key}):{" "}
              </span>
              <span> {totalAmount}</span>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    </div>
  </div>
       <Stack.Item>
            {lineinfoData.TypeofPurchaseDetailList ? (
              <>
                {lineinfoData.TypeofPurchaseDetailList.map(
                  (tableValueItem: TypeofPurchaseDetail, index: number) => (
                    <>
                      <LineItemTableFormat
                        tableviewItem={tableValueItem}
                        id={index}
                        addTotalAmount={addTotalAmount}
                        isViewMode={isViewMode}
                        AmountCurr={selectedItems.prCurrency.key as string}
                      />
                    </>
                  )
                )}
              </>
            ) : (
              <span></span>
            )}
          </Stack.Item>
        </Stack>
      </div>
    </>
  );
};

export default LineItemComponent;
