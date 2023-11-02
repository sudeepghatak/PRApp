// import * as React from "react";
// import { useContext, useEffect } from "react";
// import {
//   Dropdown,
//   IDropdownOption,
//   IDropdownStyles,
//   Icon,
//   Stack,
//   DefaultButton,
//   DefaultPalette,
// } from "office-ui-fabric-react";
// // import { useState } from "react";
// import { findIndex, map } from "lodash";
// // import TypeOfPurchase from "./TypeOfPurchase";
// import LineItemTableFormat from "./TypeOfPurchase_TableFormat";
// import { tableBuildContext } from "./MainPage";
// import { RootState } from "../../../../app/store";
// import { useDispatch, useSelector } from "react-redux";
// import { TypeofPurchaseDetail } from "../../Model/TypePurchases/type_purchases_detail";
// import { saveButtonClick } from "../../../../features/reducers/lineitemSlice";
// import { restApiCall } from "../../Api/ApiCall";

// // interface ThirdProps {
// //   [key: string]: React.FunctionComponent[];
// // }
// interface IThirdprops {
//   buttonContxtSave: () => void;
//   buttonContxtBack: () => void;
// }
// interface IAmountProps {
//   id: number;
//   amount: number;
//   completedelete: boolean;
// }
// let listOftotalAmount: IAmountProps[] = [];

// const LineItemComponent: React.FunctionComponent<IThirdprops> = (props) => {
//   const tableContent = useContext(tableBuildContext);
//   const { buttonContxtSave, buttonContxtBack } = props;
// const dispatch = useDispatch();

//   const lineinfoData = useSelector((state: RootState) => state.lineiteminfo);
//   const vendorPKIDData = useSelector((state: RootState) => state.vendorandshipping.PKID);
//   const [selectedItems, setSelectedItems] = React.useState<{
//     [key: string]: IDropdownOption;
//   }>({
//     GlAccount: { key: "", text: "" },
//     UOM: { key: "", text: "" },
//   });
//   const changeDropdownOption = (
//     event: React.FormEvent<HTMLDivElement>,
//     item: IDropdownOption | undefined,
//     index: number
//   ): void => {
//     const { id } = event.target as HTMLDivElement;
//     let newSelectedItem: IDropdownOption = { key: "", text: "" };
//     newSelectedItem = { key: item?.key as string, text: item?.text as string };
//     setSelectedItems((prevSelectedItems) => ({
//       ...prevSelectedItems,
//       [id]: newSelectedItem,
//     }));
//     console.log(selectedItems);
//   };

//   const PrCurrency: IDropdownOption[] = [
//     { key: "1", text: "AED" },
//     { key: "2", text: "AUD" },
//     { key: "2", text: "CAD" },
//     { key: "2", text: "CHF" },
//     { key: "2", text: "USD" },
//   ];

//   // const dropdownStyles: Partial<IDropdownStyles> = {
//   //     dropdown: { width: 200 },
//   //   };
//   const dropdownStyles1: Partial<IDropdownStyles> = {
//     dropdown: { width: 150 },
//   };

//   const [totalAmount, settotalAmount] = React.useState<number>(0);

//   const addTotalAmount = (total: IAmountProps) => {
//     console.log("Jjjjjjjjjjjjjjjj");
//     console.log(total);
//     console.log("Hiii Every One How Are You For Doing This Type Of work Here ");
//     const index = findIndex(listOftotalAmount, (item) => item.id === total.id);
//     if (!total.completedelete) {
//       if (index !== -1) {
//         // Update the existing object
//         listOftotalAmount[index] = total;
//       } else {
//         // Add the new object to the array
//         listOftotalAmount.push(total);
//       }
//     }
//     if (total.completedelete) {
//       listOftotalAmount = listOftotalAmount.filter((item) => item.id != index);
//     }

//     console.log("iiiiiiiiiiiiiiiii");
//     console.log(listOftotalAmount);
//     console.log("oooooooooooooooo");
//     // let totalValue: number = 0;

//     let totalnumber: number = map(listOftotalAmount, "amount").reduce(
//       (acc, curr) => acc + curr,
//       0
//     );

//     settotalAmount(totalnumber);
//   };
//   const saveIntoTable = () => {
//     // lineinfoData.saveTable =1
//     // saveButtonClick()
//     dispatch(saveButtonClick());
//     let saveList=[];
//     for (
//       let i: number = 0;
//       i < lineinfoData.TypeofPurchaseDetailList.length;
//       i++
//     ) {
//       console.log(lineinfoData.TypeofPurchaseDetailList[i].demotypeOfPurchaseInfoList);
//       lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList=[...lineinfoData.TypeofPurchaseDetailList[i].demotypeOfPurchaseInfoList];
//       // lineinfoData.TypeofPurchaseDetailList[i].projectCodeList = [
//       //   ...lineinfoData.TypeofPurchaseDetailList[i].demoprojectCodeList,
//       // ];

//       // lineinfoData.TypeofPurchaseDetailList[i].costCenterList = [
//       //   ...lineinfoData.TypeofPurchaseDetailList[i].democostCenterList,
//       // ];
//       //       lineinfoData.TypeofPurchaseDetailList[i].description = [
//       //   ...lineinfoData.TypeofPurchaseDetailList[i].demodescription,
//       // ];

//       // lineinfoData.TypeofPurchaseDetailList[i].QtyList = [
//       //   ...lineinfoData.TypeofPurchaseDetailList[i].demoQtyList,
//       // ];
//       //       lineinfoData.TypeofPurchaseDetailList[i].unitPriceList = [
//       //   ...lineinfoData.TypeofPurchaseDetailList[i].demounitPriceList,
//       // ];

//       // lineinfoData.TypeofPurchaseDetailList[i].unitPricePerList = [
//       //   ...lineinfoData.TypeofPurchaseDetailList[i].demounitPricePerList,
//       // ];

//       for(let j:number=0;j<lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList.length;j++){
//         let bodyItem={
//            "PKID":vendorPKIDData ,
//            "ConnectPRID": vendorPKIDData,
//            "DateRequired": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].date,
//            "Qty": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].qty,
//            "UOM": null,
//            "Plant": null,
//            "Amount": null,
//            "Cost_Center":lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].costCenter,
//            "GL_Account": null,
//            "Unit_Price": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].unitPrice,
//            "Requester_Name": null,
//            "Requester_LoginName": null,
//            "TypeOfOrder": null,
//            "ItemDescription": null,
//            "Manager1": null,
//            "Manager2": null,
//            "Manager3": null,
//            "Manager4": null,
//            "PrepaidFromDate": null,
//            "PrepaidToDate": null,
//            "OverallLimit": null,
//            "AssetNbr": null,
//            "UnitPricePer": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].unitPricePer,
//            "OtherTypeOfOrder": null,
//            "ExpenseGL": null,
//            "IsDeleted": null,
//            "ProjCode": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].projectCode,
//            "Created": null,
//            "CreatedBy": null,
//            "Modified": null,
//            "ModifiedBy": null
// };
// saveList.push(bodyItem);

//       }


//     }
//     restApiCall.insertLineItem(saveList);
//     buttonContxtSave();
//   };
//   return (
//     <>
//       <div>
//         <Stack>
//           <Stack tokens={{ childrenGap: 10 }}>
//             <Stack horizontal horizontalAlign="space-between">
//               <span>
//                 <DefaultButton
//                   style={{
//                     background: DefaultPalette.whiteTranslucent40,
//                     color: DefaultPalette.blue,
//                     borderRadius: 5,
//                     height: "40px",
//                   }}
//                   onClick={() => buttonContxtBack()}
//                 >
//                   <Stack horizontal>
//                     <span style={{ marginRight: 10, marginTop: 2 }}>
//                       <Icon iconName="Back" />
//                     </span>
//                     <span>Back</span>
//                   </Stack>
//                 </DefaultButton>
//               </span>

//               <span>
//                 <DefaultButton
//                   style={{
//                     background: DefaultPalette.green,
//                     color: DefaultPalette.white,
//                     borderRadius: 5,
//                     height: "40px",
//                   }}
//                   onClick={() => saveIntoTable()}
//                 >
//                   <Stack horizontal>
//                     <span style={{ marginRight: 10, marginTop: 2 }}>
//                       <Icon iconName="Save" />
//                     </span>
//                     <span>Save & Continue</span>
//                   </Stack>
//                 </DefaultButton>
//               </span>
//             </Stack>
//           </Stack>
//           <Stack>
//             <Stack.Item align="start" style={{ display: "flex" }}>
//               <span style={{ marginRight: "10px" }}>Select Currency: </span>
//               <Dropdown
//                 placeholder="Select Currency"
//                 id="prCurrency"
//                 onChange={changeDropdownOption}
//                 options={PrCurrency}
//                 selectedKey={selectedItems["prCurrency"]?.key}
//                 styles={dropdownStyles1}
//               />
//             </Stack.Item>

//             <Stack.Item align="end" style={{ display: "flex" }}>
//               <span style={{ marginRight: "10px" }}>
//                 Total Order Amount in (USD):{" "}
//               </span>
//               <span> ($){totalAmount}</span>
//             </Stack.Item>
//           </Stack>

//           <Stack.Item>
//             {lineinfoData.TypeofPurchaseDetailList ? (
//               <>
//                 {lineinfoData.TypeofPurchaseDetailList.map(
//                   (tableValueItem: TypeofPurchaseDetail, index: number) => (
//                     <>
//                       <LineItemTableFormat
//                         tableviewItem={tableValueItem}
//                         id={index}
//                         addTotalAmount={addTotalAmount}
//                       />
//                     </>
//                   )
//                 )}
//               </>
//             ) : (
//               <span></span>
//             )}
//           </Stack.Item>
//         </Stack>
//       </div>
//     </>
//   );
// };

// export default LineItemComponent;
import * as React from "react";
import { useContext, useEffect } from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Icon,
  Stack,
  DefaultButton,
  DefaultPalette,
} from "office-ui-fabric-react";
// import { useState } from "react";
import { findIndex, map } from "lodash";
// import TypeOfPurchase from "./TypeOfPurchase";
import LineItemTableFormat from "./TypeOfPurchase_TableFormat";
import { tableBuildContext } from "./MainPage";
import { RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { TypeofPurchaseDetail } from "../../Model/TypePurchases/type_purchases_detail";
import { saveButtonClick } from "../../../../features/reducers/lineitemSlice";
import { restApiCall } from "../../Api/ApiCall";
import { GlobalStore } from "../../../../app/globalStore";

// interface ThirdProps {
//   [key: string]: React.FunctionComponent[];
// }
interface IThirdprops {
  buttonContxtSave: () => void;
  buttonContxtBack: () => void;
}
interface IAmountProps {
  id: number;
  amount: number;
  completedelete: boolean;
}
let listOftotalAmount: IAmountProps[] = [];

const LineItemComponent: React.FunctionComponent<IThirdprops> = (props) => {
  const tableContent = useContext(tableBuildContext);
  const { buttonContxtSave, buttonContxtBack} = props;
const dispatch = useDispatch();

  const lineinfoData = useSelector((state: RootState) => state.lineiteminfo);
  const vendorPKIDData = useSelector((state: RootState) => state.vendorandshipping.PKID);
  const [selectedItems, setSelectedItems] = React.useState<{
    [key: string]: IDropdownOption;
  }>({
    // GlAccount: { key: "", text: "" },
    UOM: { key: "", text: "" },
    prCurrency:{key: "", text: ""}
  });
  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: newSelectedItem,
    }));
    // console.log("LineItem selectedItems::",selectedItems);
  };

  useEffect(()=>{
    console.log("GlobalStore.getTitledata().currencyKey:: ",GlobalStore.getTitledata().currencyKey) ;
    console.log("selectedItems--",selectedItems.prCurrency.key,selectedItems["prCurrency"]?.key);
    
  },[])

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
    { key: "USD",text: "USD" },
  ];

  // const dropdownStyles: Partial<IDropdownStyles> = {
  //     dropdown: { width: 200 },
  //   };
  const dropdownStyles1: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
  };

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
      (acc, curr) => acc + curr,0);
      settotalAmount(totalnumber);
  };
 
 const saveIntoTable = () => {
    // lineinfoData.saveTable =1
    // saveButtonClick()
    dispatch(saveButtonClick());
    let saveList=[];
    for (
      let i: number = 0;
      i < lineinfoData.TypeofPurchaseDetailList.length;
      i++
    ) {
      console.log(lineinfoData.TypeofPurchaseDetailList[i].demotypeOfPurchaseInfoList);
      lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList=[...lineinfoData.TypeofPurchaseDetailList[i].demotypeOfPurchaseInfoList];
      // lineinfoData.TypeofPurchaseDetailList[i].projectCodeList = [
      //   ...lineinfoData.TypeofPurchaseDetailList[i].demoprojectCodeList,
      // ];

      // lineinfoData.TypeofPurchaseDetailList[i].costCenterList = [
      //   ...lineinfoData.TypeofPurchaseDetailList[i].democostCenterList,
      // ];
      //       lineinfoData.TypeofPurchaseDetailList[i].description = [
      //   ...lineinfoData.TypeofPurchaseDetailList[i].demodescription,
      // ];

      // lineinfoData.TypeofPurchaseDetailList[i].QtyList = [
      //   ...lineinfoData.TypeofPurchaseDetailList[i].demoQtyList,
      // ];
      //       lineinfoData.TypeofPurchaseDetailList[i].unitPriceList = [
      //   ...lineinfoData.TypeofPurchaseDetailList[i].demounitPriceList,
      // ];

      // lineinfoData.TypeofPurchaseDetailList[i].unitPricePerList = [
      //   ...lineinfoData.TypeofPurchaseDetailList[i].demounitPricePerList,
      // ];

      for(let j:number=0;j<lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList.length;j++){
        let bodyItem={
           "PKID":vendorPKIDData ,
           "ConnectPRID": vendorPKIDData,
           "DateRequired": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].date,
           "Qty": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].qty,
           "UOM": null,
           "Plant": null,
           "Amount": null,
           "Cost_Center":lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].costCenter,
           "GL_Account": null,
           "Unit_Price": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].unitPrice,
           "Requester_Name": null,
           "Requester_LoginName": null,
           "TypeOfOrder": null,
           "ItemDescription": null,
           "Manager1": null,
           "Manager2": null,
           "Manager3": null,
           "Manager4": null,
           "PrepaidFromDate": null,
           "PrepaidToDate": null,
           "OverallLimit": null,
           "AssetNbr": null,
           "UnitPricePer": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].unitPricePer,
           "OtherTypeOfOrder": null,
           "ExpenseGL": null,
           "IsDeleted": null,
           "ProjCode": lineinfoData.TypeofPurchaseDetailList[i].typeOfPurchaseInfoList[j].projectCode,
           "Created": null,
           "CreatedBy": null,
           "Modified": null,
           "ModifiedBy": null
        };
          saveList.push(bodyItem);
      }
    }
    // restApiCall.insertLineItem(saveList);
    buttonContxtSave();
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
                placeholder="Select Currency"
                id="prCurrency"
                onChange={changeDropdownOption}
                options={PrCurrency}
                selectedKey={selectedItems["prCurrency"]?.key}
                // defaultSelectedKey={selectedItems["prCurrency"]?.key}
                // defaultSelectedKey={GlobalStore.getTitledata().currencyKey}
                styles={dropdownStyles1}
              />
             </Stack.Item>

            {(selectedItems.prCurrency.key!==GlobalStore.getTitledata().currencyKey)?
              <Stack.Item align="end" style={{ display: "flex" }}>
                <span style={{ marginRight: "10px" }}>
                  Total Order Amount in ({GlobalStore.getTitledata().currencyKey}):{" "}
                </span>
                <span> ($){totalAmount}</span>
              </Stack.Item>
            :null}

            <Stack.Item align="end" style={{ display: "flex" }}>
              <span style={{ marginRight: "10px" }}>
                Total Order Amount in ({selectedItems.prCurrency.key}):{" "}
              </span>
              <span> ($){totalAmount}</span>
            </Stack.Item>
          </Stack>

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

