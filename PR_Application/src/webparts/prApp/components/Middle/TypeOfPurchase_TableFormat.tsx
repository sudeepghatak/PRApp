// import * as React from "react";
// import { useState, useEffect } from "react";
// import {
//   Stack,
//   DetailsList,
//   IColumn,
//   TextField,
//   CheckboxVisibility,
//   IconButton,
//   DatePicker,
//   Dropdown,
//   IDropdownOption,
//   defaultDatePickerStrings,
//   IDatePicker,
// } from "@fluentui/react";
// import { map } from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../app/store";
// import TypeOfPurchase from "./TypeOfPurchase";
// import { changeCheckbox, setValue } from "../../../../features/reducers/primaryinfoSlice";
// import { deletetypePurchases } from "../../../../features/reducers/lineitemSlice";
// import { TypeLineItem, TypeofPurchaseDetail } from "../../Model/TypePurchases/type_purchases_detail";
// import { restApiCall } from "../../Api/ApiCall";
// import ProjectCodeComponent from "./TableProjectCodeComponent";
// import { IPrProjectCode } from "../../Model/IPrProjectCode";
// // Initialize Fluent UI icons (required)
// interface TableRow {

//   projectCode: string;
//   description: string;
//   costCenter: string;
//   date:string;
//   glAccount:string;
//   qty: string;
//   uOM:string;
//   uintprice: string;
//   unitpriceper: string;
//   totalAmount: number;
// }
// interface IThirdProps {
//   tableviewItem: TypeofPurchaseDetail;
//   id: number;
//   addTotalAmount: (total: any) => void;
// }
// const LineItemTableFormat: React.FC<IThirdProps> = (props) => {
//   const dispatch = useDispatch();
//   const { tableviewItem, id, addTotalAmount } = props;
//   const lineinfoData = useSelector((state: RootState) => state.lineiteminfo);
//   const [tableItem, settableItem] = useState<TableRow[]>([
//     {
//       projectCode: "",
//       description: "",
//       costCenter: "",
//       date:"",
//       glAccount:"",
//       qty: "",
//       uOM:"",
//       uintprice: "",
//       unitpriceper: "",
//       totalAmount: 0,
//     },
//   ]);
//     const [selectedItems, setSelectedItems] = useState<{

//     [key: string]: IDropdownOption;

//   }>({

//     glAccount: { key: "", text: "" },
//     uom: { key: "", text: "" },
//   });

//   const [totalAmount, settotalAmount] = useState<number>(0);

//   const deleteTable = () => {
//     let totalNumber = {
//       id: id,
//       amount: 0,
//       completedelete: true,
//     };
//     dispatch(changeCheckbox(tableviewItem.typeofPurchaseName));
//     dispatch(deletetypePurchases(id));
//     addTotalAmount(totalNumber);
//   };
// //Link for Project Code-------------------------------------

// const [ProCodeItem, setProCodeItem] = useState<IPrProjectCode>(
//     new IPrProjectCode(" ", " ")
//   );
// const ProCodeItemDatapick = (ProCode: IPrProjectCode) => {
//     console.log(ProCode);
//     console.log("ProCode.project_code)---ProCode.project_code)",ProCode.project_code);
//     setProCodeItem(ProCode);
//   };
// // ................................................................

// //Project Code Modal Design Here ...........................
//   const [openProjectCode, setopenProjectCode] = useState<boolean>(false);
//   const showProjectCodeModal = () => {
//     setopenProjectCode(!openProjectCode);
//   };

// //Onclick for ProjectCodeModal
//   const linkClickEvent = () => {
//     // showModal();
//     showProjectCodeModal();
//   };

//   const uom: IDropdownOption[] = [
//     { key: "1", text: "Acre(ACR)" },
//     { key: "2", text: "Activity Unit(AU)" },
//     { key: "1", text: "Bag(BAG)" },
//     { key: "2", text: "Bottle(BT)" },
//   ];

//   const onDropdownChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
//     // setFirstDayOfWeek(option.key as number);
//     console.log(option.key);
//     console.log(setFirstDayOfWeek(option.key as number));

//   }, []);

//   //create new Row in the table
//   const createNewRow = () => {
//     let newRow = {
//       projectCode: tableviewItem.projectCode,
//       description: "",
//       costCenter: tableviewItem.costCenter,
//       date:"",
//       glAccount:"",
//       qty: "",
//       uOM:"",
//       uintprice: "",
//       unitpriceper: "",
//       totalAmount: 0,
//     };
//     const typOfPuchaseCreateNew= new TypeLineItem(newRow.projectCode, newRow.description, newRow.costCenter, newRow.date, newRow.glAccount, newRow.qty, newRow.uOM, newRow.uintprice, newRow.unitpriceper, newRow.totalAmount)
//     tableviewItem.demotypeOfPurchaseInfoList=[...tableviewItem.typeOfPurchaseInfoList,typOfPuchaseCreateNew]

//     settableItem([...tableItem, newRow]);
//   };
//   //delete Row....
//   const deleteRow = (tableRownumber: number) => {
//     tableviewItem.demotypeOfPurchaseInfoList=tableviewItem.demotypeOfPurchaseInfoList.filter((value,index)=>index !=tableRownumber);

//     settableItem(tableItem.filter((value, index) => index !== tableRownumber));
//   };

//   //copy row ....
//   const copyRow = (rowIndex: number) => {
//     let newtableItem = [...tableItem];
//     let copyItem = newtableItem[rowIndex];
//     let newRow = {
//       projectCode: copyItem.projectCode,
//       description: copyItem.description,
//       costCenter: copyItem.costCenter,
//       date: copyItem.date,
//       glAccount:copyItem.glAccount,
//       qty: copyItem.qty,
//       uOM:copyItem.uOM,
//       unitPrice: copyItem.uintprice,
//       unitPricePer: copyItem.unitpriceper,
//       totalAmount: copyItem.totalAmount,
//     };

//     const copyTypeOfPurchase= new TypeLineItem(newRow.projectCode, newRow.description, newRow.costCenter, newRow.date, newRow.glAccount, newRow.qty, newRow.uOM, newRow.unitPrice, newRow.unitPricePer, newRow.totalAmount)

//     tableviewItem.demotypeOfPurchaseInfoList=[...tableviewItem.typeOfPurchaseInfoList,copyTypeOfPurchase]

//     newtableItem.splice(rowIndex + 1, 0, copyItem);
//     settableItem(newtableItem);
//   };

// //prProjectRadio is true or false check var
//   let SelectPrProjectRadio= lineinfoData.prProjectRadio;
//   console.log("PrProjectRadio---PrProjectRadio",SelectPrProjectRadio,lineinfoData.selectDepartment);

// // date Format.............................................
// const [value, setValue] = React.useState<Date | undefined>();

//   const datePickerRef = React.useRef<IDatePicker>(null);
//   // const regex = new RegExp(value)
//   // console.log("Date Value",regex) ;

//   const onClick = React.useCallback((): void => {
//     setValue(undefined);

//     datePickerRef.current?.focus();
//   }, []);

// const onFormatDate = (date?: Date): string => {
//   return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);

// };
// console.log("Date ::",onFormatDate) ;

//   //For save ---------------------------------------------------
//   const newhandleInputChange = (
//     e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
//     newValue: string,
//     rowIndex: number
//   ) => {
//     let name: string = (e.target as HTMLInputElement).name;

//     let newItem = tableItem;
//     newItem[rowIndex] = {
//       ...newItem[rowIndex],
//       [name]: newValue,
//     };

//     console.log("pppppppppppppppppppp");
//     console.log(name);
//     console.log(newItem[rowIndex]);
//     console.log("kkkkkkkkkkkkkkk");

//     let qtynumber: number = +newItem[rowIndex].qty;
//     let uintpricenumber: number = +newItem[rowIndex].uintprice;
//     let unitpricepernumber: number = +newItem[rowIndex].unitpriceper;
//     let totalAmount: number = (qtynumber * uintpricenumber) / unitpricepernumber;
//     newItem[rowIndex].totalAmount = totalAmount;

//     const changeTypeOfPurchase=new TypeLineItem(newItem[rowIndex].projectCode, newItem[rowIndex].description, newItem[rowIndex].costCenter, newItem[rowIndex].date, newItem[rowIndex].glAccount, newItem[rowIndex].qty, newItem[rowIndex].uOM, newItem[rowIndex].uintprice, newItem[rowIndex].unitpriceper, newItem[rowIndex].totalAmount)

//      tableviewItem.demotypeOfPurchaseInfoList[rowIndex]=changeTypeOfPurchase;
//     settableItem([...newItem]);
//   };

//   useEffect(() => {
//     let newtableItem = tableItem;
//     let listTotal: number[] = map(newtableItem, "total");
//     let sum: number = listTotal.reduce((acc, curr) => acc + curr, 0);
//     settotalAmount(sum);
//   }, [tableItem]);

//   const changeDropdownOption = (

//     event: React.FormEvent<HTMLDivElement>,

//     item: IDropdownOption | undefined,

//     index: number

//   ): void => {

//     const { id } = event.target as HTMLDivElement;

//     // console.log("------------------");

//     // console.log(id);

//     let newSelectedItem: IDropdownOption = { key: "", text: "" };

//     if (item) {

//     newSelectedItem = { key: item?.key as string, text: item?.text as string };

//     }

//     setSelectedItems((prevSelectedItems) => ({

//       ...prevSelectedItems,

//       [id]: newSelectedItem,

//     }));

//     // console.log(selectedItems);

//   }

//   useEffect(() => {
//   //   restApiCall.getExpenseGLOdrTypeList(tableviewItem.typeofPurchaseName).then((dataOrdertype)=>{
//   //     console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
//   //     console.log(dataOrdertype)
//   //   //   { key: "1", text: "500120(COGS - Semi Finished Good)" },
//   //   // { key: "2", text: "500120(COGS - Finished Good)" }

//   //   for(let i:number=0;i<dataOrdertype.length;i++){
//   //     let item={
//   //       key:dataOrdertype[i].Title.toLowerCase(),
//   //       text:dataOrdertype[i].Title+"("+dataOrdertype[i].Dscription+")"
//   //     }
//   //     tableviewItem.glaccount.push(item);

//   //   }
//   //   });
//   console.log("PrProjectRadio---PrProjectRadio--",lineinfoData.prProjectRadio,lineinfoData.selectDepartment);

//     let simpleList = [];
//     if (lineinfoData.saveTable === 0) {
//       let newRow = {
//         projectCode: tableviewItem.projectCode,
//         description: "",
//         costCenter: tableviewItem.costCenter,
//         date:"",
//         glAccount:"",
//         qty: "",
//         uOM:"",
//         uintprice: "",
//         unitpriceper: "",
//         totalAmount: 0,
//       };
//       const typeItem=new TypeLineItem(newRow.projectCode,newRow.description, newRow.costCenter,newRow.date,newRow.glAccount,newRow.qty,newRow.uOM, newRow.uintprice, newRow.unitpriceper ,newRow.totalAmount)
//       tableviewItem.demotypeOfPurchaseInfoList=[typeItem];
//       simpleList = [newRow];
//     } else {
//       console.log("typeOfPurchaseInfoList");
//       console.log(tableviewItem.typeOfPurchaseInfoList);

//       for (let i: number = 0; i < tableviewItem.typeOfPurchaseInfoList.length; i++) {
//         let newRow = {
//           projectCode: tableviewItem.typeOfPurchaseInfoList[i].projectCode,
//           description: tableviewItem.typeOfPurchaseInfoList[i].des,
//           costCenter: tableviewItem.typeOfPurchaseInfoList[i].CostCenter,
//           date:tableviewItem.typeOfPurchaseInfoList[i].date,
//           glAccount: tableviewItem.typeOfPurchaseInfoList[i].glAccount,
//           qty: tableviewItem.typeOfPurchaseInfoList[i].qty,
//           uOM: tableviewItem.typeOfPurchaseInfoList[i].uOM,
//           uintprice: tableviewItem.typeOfPurchaseInfoList[i].unitPrice,
//           unitpriceper: tableviewItem.typeOfPurchaseInfoList[i].unitPricePer,
//           totalAmount: +tableviewItem.typeOfPurchaseInfoList[i].totalamount,
//         };
//         console.log("newRow");
//         console.log(newRow);

//         simpleList.push(newRow);
//         tableviewItem.demotypeOfPurchaseInfoList[i]=tableviewItem.typeOfPurchaseInfoList[i];
//       }
//     }

//     settableItem(simpleList);
//   }, []);

//   React.useMemo(() => {
//     let totalNumber = {
//       id,
//       amount: totalAmount,
//       completedelete: false,
//     };
//     addTotalAmount(totalNumber);
//   }, [totalAmount]);
//   //------------------------------------------------------
//   const columns = [
//     {
//       key: "copy",
//       name: "Copy",
//       fieldName: "copy",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <IconButton
//             iconProps={{ iconName: "Copy" }}
//             title="Copy"
//             ariaLabel="Copy"
//             onClick={() => copyRow(rowIndex)}
//           />
//         );
//       },
//     },

//     {
//       key: "project_code",
//       name: "Project Code",
//       fieldName: "project_code",
//       minWidth: 200,
//       maxWidth: 300,
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <Stack
//             enableScopedSelectors
//             horizontal
//             horizontalAlign="space-between"
//           >
//             <TextField
//               name="projectCode"
//               value={tableItem[rowIndex].projectCode}
//               onChange={(e, newValue) =>
//                 newhandleInputChange(e, newValue as string, rowIndex)
//               }
//               // value={
//               //   lineinfoData.projectCode[lineinfoData.projectCode.length - 1]
//               // }
//             />
//             <IconButton
//               iconProps={{ iconName: "Add" }}
//               title="Add"
//               ariaLabel="Add"
//               onClick= {linkClickEvent}
//             />
//             {openProjectCode ? (
//               <>
//                  <ProjectCodeComponent
//                     isProjectCodeOpen={openProjectCode}
//                     showProjectCode={showProjectCodeModal}
//                      ProjectCode_title={
//                       lineinfoData.selectDepartment
//                      }
//                      ProCodeItemDatapick={ProCodeItemDatapick}
//                      checkProCode={true}
//                   />
//               </>
//                 ) : null}
//           </Stack>
//         );
//       },
//     },
//     {
//       key: "description",
//       name: "Description",
//       fieldName: "description",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return <TextField />;
//       },
//     },
//     {
//       key: "cost_center",
//       name: "Cost Center",
//       fieldName: "cost_center",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <TextField
//             name="costCenter"
//             value={tableItem[rowIndex].costCenter}
//             onChange={(e, newValue) =>
//               newhandleInputChange(e, newValue as string, rowIndex)
//             }
//             // value={lineinfoData.costCenter[lineinfoData.costCenter.length - 1]}
//           />
//         );
//       },
//     },
//     {
//       key: "date_required",
//       name: "Date Required",
//       fieldName: "date_required",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//         <DatePicker
//           placeholder="MM/DD/YY"
//           strings={defaultDatePickerStrings}
//           formatDate={onFormatDate}
//           value={value}
//           componentRef={datePickerRef}
//           onSelectDate={setValue as (date: Date | null | undefined) => void}

//         />);
//       },
//     },
//     {
//       key: "gl_account",
//       name: "GL Account",
//       fieldName: "gl_account",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <Dropdown
//             placeholder="- Select GL Account -"
//             id="glAccount"
//             options={tableviewItem.glaccount}
//             onChange={changeDropdownOption}
//             // styles={dropdownStyles}
//             selectedKey={selectedItems["glAccount"]?.key}
//             // options={glaccount}
//           />
//         );
//       },
//     },
//     {
//       key: "qty",
//       name: "Qty",
//       fieldName: "qty",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <TextField
//             name="qty"
//             value={tableItem[rowIndex].qty}
//             onChange={(e, newValue) =>
//               newhandleInputChange(e, newValue as string, rowIndex)
//             }
//           />
//         );
//       },
//     },
//     {
//       key: "uom",
//       name: "UOM",
//       fieldName: "uom",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//         <>
//         <Dropdown
//         placeholder="- Select UOM -"
//         id="uom"
//         options={uom}
//         onChange={changeDropdownOption}
//         // styles={dropdownStyles}
//         selectedKey={selectedItems["uom"]?.key}/>;
//         </>)
//       },
//     },
//     {
//       key: "unit_price",
//       name: "Unit Price ($)",
//       fieldName: "unit_price",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <TextField
//             name="uintprice"
//             value={tableItem[rowIndex].uintprice}
//             onChange={(e, newValue) =>
//               newhandleInputChange(e, newValue as string, rowIndex)
//             }
//           />
//         );
//       },
//     },
//     {
//       key: "unit_price_per",
//       name: "Unit Price Per",
//       fieldName: "unit_price_perom",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <TextField
//             name="unitpriceper"
//             value={tableItem[rowIndex].unitpriceper}
//             onChange={(e, newValue) =>
//               newhandleInputChange(e, newValue as string, rowIndex)
//             }
//           />
//         );
//       },
//     },
//     {
//       key: "total_amount",
//       name: "Total Amount ($)",
//       fieldName: "total_amount",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <TextField value={tableItem[rowIndex].totalAmount.toString()} disabled />
//         );
//       },
//     },
//     {
//       key: "add_icon",
//       name: (
//         <IconButton
//           iconProps={{ iconName: "Add" }}
//           title="Add"
//           ariaLabel="Add"
//           onClick={() => createNewRow()}
//         />
//       ),
//       fieldName: "add_icon",
//       onRender: (item: TableRow, rowIndex: number) => {
//         return (
//           <IconButton
//             iconProps={{ iconName: "Delete" }}
//             title="Delete"
//             ariaLabel="Delete"
//             onClick={() => deleteRow(rowIndex)}
//           />
//         );
//       },
//     },
//   ];

//   let columnss=(SelectPrProjectRadio==="No")?columns.filter((columnsValue)=>columnsValue.name !=="Project Code"):columns
//   return (
//     <div>
//       <div>
//         <Stack horizontal horizontalAlign="space-between">
//           <span>{tableviewItem.typeofPurchaseName}</span>
//           <span>
//             <IconButton
//               iconProps={{ iconName: "Delete" }}
//               title="Delete"
//               ariaLabel="Delete"
//               onClick={() => deleteTable()}
//             />
//           </span>
//         </Stack>
//       </div>
//       <Stack>
//         <Stack.Item>
//           <DetailsList
//             items={tableItem}
//             columns={columnss as IColumn[]}
//             checkboxVisibility={CheckboxVisibility.hidden}
//           />
//         </Stack.Item>

//         <Stack.Item align="end" style={{ display: "flex" }}>
//           <span style={{ marginRight: "5px" }}>Total Amount in (USD): </span>
//           {}
//           <span> ($){totalAmount} </span>
//         </Stack.Item>
//       </Stack>
//     </div>
//   );
// };
// export default LineItemTableFormat;
// function setFirstDayOfWeek(arg0: number) {
//   throw new Error("Function not implemented.");
// }

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Stack,
  DetailsList,
  IColumn,
  TextField,
  CheckboxVisibility,
  IconButton,
  DatePicker,
  Dropdown,
  IDropdownOption,
  defaultDatePickerStrings,
  IDatePicker,
  DayOfWeek,
  mergeStyles,
  IDropdownStyles,
  Checkbox,
  DropdownMenuItemType,
} from "@fluentui/react";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import TypeOfPurchase from "./TypeOfPurchase";
import {
  changeCheckbox,
  setValue,
} from "../../../../features/reducers/primaryinfoSlice";
import { deletetypePurchases } from "../../../../features/reducers/lineitemSlice";
import {
  TypeLineItem,
  TypeofPurchaseDetail,
} from "../../Model/TypePurchases/type_purchases_detail";
import { restApiCall } from "../../Api/ApiCall";
import ProjectCodeComponent from "./TableProjectCodeComponent";
import { IPrProjectCode } from "../../Model/IPrProjectCode";
import TooltipShow from "./TooltipShow";
import {
  // defaultprepaidFromDatePickerStrings,
  // defaultprepaidToDatePickerStrings,
} from "@fluentui/react/lib/DatePicker";
// Initialize Fluent UI icons (required)
interface TableRow {
  CIPNumber: string;
  projectCode: string;
  description: string;
  costCenter: string;
  date: string;
  glAccount: string;
  qty: string;
  uOM: string;
  uintprice: string;
  unitpriceper: string;
  totalAmount: number;
  // glaccount:[]
}
interface IThirdProps {
  tableviewItem: TypeofPurchaseDetail;
  id: number;
  addTotalAmount: (total: any) => void;
}

//date required.....
const rootClass = mergeStyles({
  maxWidth: 300,
  selectors: { "> *": { marginBottom: 15 } },
});
const checkboxStyles = {
  root: {
    marginTop: 2,
  },
};

const LineItemTableFormat: React.FC<IThirdProps> = (props) => {
  // const{Title}=props;
  const dispatch = useDispatch();
  const { tableviewItem, id, addTotalAmount } = props;
  //date Required....
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  // console.log("-----------------Id ------ ",id)
  const lineinfoData = useSelector((state: RootState) => state.lineiteminfo);
  const [tableItem, settableItem] = useState<TableRow[]>([
    {
      CIPNumber: "",
      projectCode: "",
      description: "",
      costCenter: "",
      date: "",
      glAccount: "",
      qty: "",
      uOM: "",
      uintprice: "",
      unitpriceper: "",
      totalAmount: 0,
      // glaccount:[]
    },
  ]);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: IDropdownOption;
  }>({
    glAccount: { key: "", text: "" },
    expensegl: { key: "", text: "" },
    uom: { key: "", text: "" },
  });

  const [totalAmount, settotalAmount] = useState<number>(0);

  const deleteTable = () => {
    let totalNumber = {
      id: id,
      amount: 0,
      completedelete: true,
    };
    dispatch(changeCheckbox(tableviewItem.typeofPurchaseName));
    dispatch(deletetypePurchases(id));
    addTotalAmount(totalNumber);
  };
  //Link for Project Code-------------------------------------

  const [ProCodeItem, setProCodeItem] = useState<IPrProjectCode>(
    new IPrProjectCode(" ", " ")
  );
  const ProCodeItemDatapick = (ProCode: IPrProjectCode) => {
    setProCodeItem(ProCode);
  };
  // ................................................................

  //Project Code Modal Design Here ...........................
  const [openProjectCode, setopenProjectCode] = useState<boolean>(false);
  const showProjectCodeModal = () => {
    setopenProjectCode(!openProjectCode);
  };

  //Onclick for ProjectCodeModal
  const linkClickEvent = () => {
    // showModal();
    showProjectCodeModal();
  };

  const onDropdownChange = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
      // setFirstDayOfWeek(option.key as number);
      console.log(option.key);
      console.log(setFirstDayOfWeek(option.key as number));
    },
    []
  );

  //cip num visibility -----------------------------------------------------

  const [isPickerRemove, setIsPickerRemove] = React.useState(true);
  const onCheckedButtonClick = (): void => {
    setIsPickerRemove(!isPickerRemove);
  };

  //create new Row in the table
  const createNewRow = () => {
    let newRow = {
      CIPNumber: tableviewItem.CFID,
      projectCode: tableviewItem.projectCode,
      description: "",
      costCenter: tableviewItem.costCenter,
      date: "",
      glAccount: "",
      qty: "",
      uOM: "",
      uintprice: "",
      unitpriceper: "",
      totalAmount: 0,
      // glaccount:[]
    };
    const typOfPuchaseCreateNew = new TypeLineItem(
      newRow.CIPNumber,
      newRow.projectCode,
      newRow.description,
      newRow.costCenter,
      newRow.date,
      newRow.glAccount,
      newRow.qty,
      newRow.uOM,
      newRow.uintprice,
      newRow.unitpriceper,
      newRow.totalAmount
    );
    tableviewItem.demotypeOfPurchaseInfoList = [
      ...tableviewItem.typeOfPurchaseInfoList,
      typOfPuchaseCreateNew,
    ];
    settableItem([...tableItem, newRow]);
  };

  //delete Row....----------------------------------------

  const deleteRow = (tableRownumber: number) => {
    tableviewItem.demotypeOfPurchaseInfoList =
      tableviewItem.demotypeOfPurchaseInfoList.filter(
        (value, index) => index != tableRownumber
      );

    settableItem(tableItem.filter((value, index) => index !== tableRownumber));
  };

  //copy row ....
  const copyRow = (rowIndex: number) => {
    let newtableItem = [...tableItem];
    let copyItem = newtableItem[rowIndex];
    let newRow = {
      CIPNumber: copyItem.CIPNumber,
      projectCode: copyItem.projectCode,
      description: copyItem.description,
      costCenter: copyItem.costCenter,
      date: copyItem.date,
      glAccount: copyItem.glAccount,
      qty: copyItem.qty,
      uOM: copyItem.uOM,
      unitPrice: copyItem.uintprice,
      unitPricePer: copyItem.unitpriceper,
      totalAmount: copyItem.totalAmount,
    };
    const copyTypeOfPurchase = new TypeLineItem(
      newRow.CIPNumber,
      newRow.projectCode,
      newRow.description,
      newRow.costCenter,
      newRow.date,
      newRow.glAccount,
      newRow.qty,
      newRow.uOM,
      newRow.unitPrice,
      newRow.unitPricePer,
      newRow.totalAmount
    );
    tableviewItem.demotypeOfPurchaseInfoList = [
      ...tableviewItem.typeOfPurchaseInfoList,
      copyTypeOfPurchase,
    ];
    newtableItem.splice(rowIndex + 1, 0, copyItem);
    settableItem(newtableItem);
  };

  //prProjectRadio is true or false check var
  let SelectPrProjectRadio = lineinfoData.prProjectRadio;
  // console.log("PrProjectRadio---PrProjectRadio",SelectPrProjectRadio,lineinfoData.selectDepartment);

  // date Format.............................................
  const [value, setValue] = React.useState<Date | undefined>();
  const [PrepaidTovalue, setPrepaidTovalue] = React.useState<
    Date | undefined
  >();
  const [PrepaidFromvalue, setPrepaidFromvalue] = React.useState<
    Date | undefined
  >();

  const datePickerRef = React.useRef<IDatePicker>(null);
  // const regex = new RegExp(value)
  // console.log("Date Value",regex) ;

  const onClick = React.useCallback((): void => {
    setValue(undefined);
    setPrepaidTovalue(undefined);
    setPrepaidFromvalue(undefined);
    datePickerRef.current?.focus();
  }, []);
  //dropdown style.................
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
  };

  //Date format ----------------------
  const onFormatDate = (date?: Date): string => {
    return !date
      ? ""
      : date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          (date.getFullYear() % 100);
  };
  console.log("Date ::", onFormatDate);

  //For save ---------------------------------------------------
  const newhandleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string,
    rowIndex: number
  ) => {
    let name: string = (e.target as HTMLInputElement).name;

    let newItem = tableItem;
    newItem[rowIndex] = {
      ...newItem[rowIndex],
      [name]: newValue,
    };
    // console.log("rowIndex--");
    // console.log(name);
    // console.log(newItem[rowIndex]);
    // console.log("kkkkkkkkkkkkkkk");
    let qtynumber: number = +newItem[rowIndex].qty;
    let uintpricenumber: number = +newItem[rowIndex].uintprice;
    let unitpricepernumber: number = +newItem[rowIndex].unitpriceper;
    let totalAmount: number =
      (qtynumber * uintpricenumber) / unitpricepernumber;
    newItem[rowIndex].totalAmount = totalAmount;

    const changeTypeOfPurchase = new TypeLineItem(
      newItem[rowIndex].CIPNumber,
      newItem[rowIndex].projectCode,
      newItem[rowIndex].description,
      newItem[rowIndex].costCenter,
      newItem[rowIndex].date,
      newItem[rowIndex].glAccount,
      newItem[rowIndex].qty,
      newItem[rowIndex].uOM,
      newItem[rowIndex].uintprice,
      newItem[rowIndex].unitpriceper,
      newItem[rowIndex].totalAmount
    );
    tableviewItem.demotypeOfPurchaseInfoList[rowIndex] = changeTypeOfPurchase;
    settableItem([...newItem]);
  };

  useEffect(() => {
    let newtableItem = tableItem;
    let listTotal: number[] = map(newtableItem, "totalAmount");
    let sum: number = listTotal.reduce((acc, curr) => acc + curr, 0);
    console.log("sum:: ", sum);
    settotalAmount(sum);
  }, [tableItem]);

  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    if (item) {
      newSelectedItem = {
        key: item?.key as string,
        text: item?.text as string,
      };
      console.log(
        "glPickID--glPickID",
        newSelectedItem.key,
        newSelectedItem.text
      );
      setglPickID(newSelectedItem.key as string);
    }
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: newSelectedItem,
    }));
  };
  //GL account Details---------------------------------------
  // console.log("selectedItems[expenseGL]?.key",selectedItems["expensegl"]?.key,selectedItems["glAccount"]?.key);

  const [glaccountOption, setglaccountOption] = useState([]);
  const [UOMOption, setUOMOption] = useState([]);
  useEffect(() => {
    let listglacc = [];
    restApiCall
      .GetTypeOfPurGLCodeOdrType(
        tableviewItem.prType,
        tableviewItem.typeofPurchaseOption,
        tableviewItem.typeofPurchaseName
      )
      .then((GLList) => {
        // console.log("tableviewItem.typeofPurchaseOption---tableviewItem.typeofPurchaseOption",tableviewItem.typeofPurchaseOption,tableviewItem.typeofPurchaseName);
        for (let i = 0; i < GLList.length; i++) {
          let newOption = {
            key: GLList[i].GL_Code,
            text: GLList[i].GL_Code + " (" + GLList[i].Dscription + ") ",
          };
          listglacc.push(newOption);
        }
        setglaccountOption(listglacc);
      });

    let listUOM = [];
    restApiCall.GetUOMUrl().then((Value) => {
      // console.log("tableviewItem.typeofPurchaseOption---tableviewItem.typeofPurchaseOption",tableviewItem.typeofPurchaseOption,tableviewItem.typeofPurchaseName);
      for (let i = 0; i < Value.length; i++) {
        let newUOMOption = {
          key: Value[i],
          text: Value[i].UnitText + " ( " + Value[i].Title + " ) ",
        };
        listUOM.push(newUOMOption);
      }
      setUOMOption(listUOM);
    });
  }, []);

  useEffect(() => {
    tableviewItem.glaccount = glaccountOption;
  }, [glaccountOption]);
  // ---------------------------------------------------------------
  const [glPickID, setglPickID] = useState("");

  //Expense Gl Details-------------------------------------------
  const [ExpenseGlOption, setExpenseGlOption] = useState([]);

  useEffect(
    () => {
      let listExpGl = [];
      //  if(tableviewItem.typeofPurchaseOption==="prepaid"){
      // console.log("glPickID---",glPickID);
      restApiCall.GetExpenseGL(glPickID).then((GLList) => {
        for (let i = 0; i < GLList.length; i++) {
          let newOption = {
            key: GLList[i].ExpenseGL,
            text:
              GLList[i].ExpenseGL +
              " ( " +
              GLList[i].ExpenseGLDescription +
              " ) ",
          };
          listExpGl.push(newOption);
        }
        setExpenseGlOption(() => listExpGl);
      });
    },
    // }
    [glPickID]
  );
  // ---------------------------------------------------------------

  useEffect(() => {
    let simpleList = [];
    // console.log("tableviewItem==",tableviewItem);
    if (lineinfoData.saveTable === 0) {
      let newRow = {
        CIPNumber: tableviewItem.CFID,
        projectCode: tableviewItem.projectCode,
        description: "",
        costCenter: tableviewItem.costCenter,
        date: "",
        glAccount: "",
        qty: "",
        uOM: " ",
        uintprice: "",
        unitpriceper: "",
        totalAmount: 0,
      };
      const typeItem = new TypeLineItem(
        newRow.CIPNumber,
        newRow.projectCode,
        newRow.description,
        newRow.costCenter,
        newRow.date,
        newRow.glAccount,
        newRow.qty,
        newRow.uOM,
        newRow.uintprice,
        newRow.unitpriceper,
        newRow.totalAmount
      );
      tableviewItem.demotypeOfPurchaseInfoList = [typeItem];
      simpleList = [newRow];
      // console.log("if NewRow===",newRow);
    } else {
      // console.log("typeOfPurchaseInfoList");
      // console.log(tableviewItem.typeOfPurchaseInfoList);
      for (
        let i: number = 0;
        i < tableviewItem.typeOfPurchaseInfoList.length;
        i++
      ) {
        let newRow = {
          CIPNumber: tableviewItem.typeOfPurchaseInfoList[i].CFID,
          projectCode: tableviewItem.typeOfPurchaseInfoList[i].projectCode,
          description: tableviewItem.typeOfPurchaseInfoList[i].des,
          costCenter: tableviewItem.typeOfPurchaseInfoList[i].CostCenter,
          date: tableviewItem.typeOfPurchaseInfoList[i].date,
          glAccount: tableviewItem.typeOfPurchaseInfoList[i].glAccount,
          qty: tableviewItem.typeOfPurchaseInfoList[i].qty,
          uOM: tableviewItem.typeOfPurchaseInfoList[i].uOM,
          uintprice: tableviewItem.typeOfPurchaseInfoList[i].unitPrice,
          unitpriceper: tableviewItem.typeOfPurchaseInfoList[i].unitPricePer,
          totalAmount: +tableviewItem.typeOfPurchaseInfoList[i].totalamount,
        };
        // console.log("newRow --",newRow);

        simpleList.push(newRow);
        tableviewItem.demotypeOfPurchaseInfoList[i] =
          tableviewItem.typeOfPurchaseInfoList[i];
      }
    }

    settableItem(simpleList);
  }, []);

  React.useMemo(() => {
    let totalNumber = {
      id,
      amount: totalAmount,
      completedelete: false,
    };
    addTotalAmount(totalNumber);
  }, [totalAmount]);
  //----------------------------------------------------------
  const columns = [
    {
      key: "copy",
      name: "Copy",
      fieldName: "copy",
      minWidth: 50,
      maxWidth: 100,
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <IconButton
            iconProps={{ iconName: "Copy" }}
            title="Copy"
            ariaLabel="Copy"
            onClick={() => copyRow(rowIndex)}
          />
        );
      },
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
    },
    {
      key: "CIPNumber",
      name: "CIP/Asset Number",
      fieldName: "cip_number",
      minWidth: 130,
      maxWidth: 150,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <Stack
            enableScopedSelectors
            horizontal
            horizontalAlign="space-between"
          >
            <Checkbox
              name="CIPCheck"
              checked={isPickerRemove}
              onChange={onCheckedButtonClick}
              styles={checkboxStyles}
            />
            {isPickerRemove === true ? (
              <TextField
                name="CIPNumber"
                value={tableItem[rowIndex].CIPNumber}
              />
            ) : (
              <TextField name="CIPNumber" value="" />
            )}
          </Stack>
        );
      },
    },
    {
      key: "Prepaid_From_Date",
      // name: <>Prepaid
      //         From Date<br/>
      //         <TooltipShow  context={"Please upload files"}/>
      //         </>,
      name: "Prepaid From Date",
      fieldName: "Prepaid_From_Date",
      minWidth: 80,
      maxWidth: 100,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <div className={rootClass}>
            <DatePicker
              firstDayOfWeek={firstDayOfWeek}
              firstWeekOfYear={1}
              placeholder="MM/DD/YY"
              strings={defaultDatePickerStrings}
              formatDate={onFormatDate}
              showMonthPickerAsOverlay={true}
              value={PrepaidFromvalue}
              componentRef={datePickerRef}
              onSelectDate={
                setPrepaidFromvalue as (date: Date | null | undefined) => void
              }
            />
          </div>
        );
      },
    },
    {
      key: "Prepaid_To_Date",
      name: "Prepaid To Date",
      fieldName: "Prepaid_To_Date",
      minWidth: 80,
      maxWidth: 100,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <div className={rootClass}>
            <DatePicker
              firstDayOfWeek={firstDayOfWeek}
              firstWeekOfYear={1}
              placeholder="MM/DD/YY"
              strings={defaultDatePickerStrings}
              formatDate={onFormatDate}
              showMonthPickerAsOverlay={true}
              value={PrepaidTovalue}
              componentRef={datePickerRef}
              onSelectDate={
                setPrepaidTovalue as (date: Date | null | undefined) => void
              }
            />
          </div>
        );
      },
    },
    {
      key: "project_code",
      name: "Project Code",
      fieldName: "project_code",
      minWidth: 150,
      maxWidth: 200,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <Stack
            enableScopedSelectors
            horizontal
            horizontalAlign="space-between"
          >
            <TextField
              disabled
              name="projectCode"
              value={tableItem[rowIndex].projectCode}
              // procodeDetails.project_code
              onChange={(e, newValue) =>
                newhandleInputChange(e, newValue as string, rowIndex)
              }
              // value={
              //   lineinfoData.projectCode[lineinfoData.projectCode.length - 1]
              // }
            />
            <IconButton
              iconProps={{ iconName: "Add" }}
              title="Add"
              ariaLabel="Add"
              onClick={linkClickEvent}
            />
            {openProjectCode ? (
              <>
                <ProjectCodeComponent
                  isProjectCodeOpen={openProjectCode}
                  showProjectCode={showProjectCodeModal}
                  ProjectCode_title={lineinfoData.selectDepartment}
                  ProCodeItemDatapick={ProCodeItemDatapick}
                  checkProCode={true}
                />
              </>
            ) : null}
          </Stack>
        );
      },
    },
    {
      key: "description",
      name: "Description",
      fieldName: "description",
      minWidth: 200,
      maxWidth: 250,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return <TextField />;
      },
    },
    {
      key: "cost_center",
      fieldName: "cost_center",
      name: "Cost Center",
      minWidth: 150,
      maxWidth: 200,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <TextField
            disabled
            name="costCenter"
            value={tableItem[rowIndex].costCenter}
            onChange={(e, newValue) =>
              newhandleInputChange(e, newValue as string, rowIndex)
            }
            // value={lineinfoData.costCenter[lineinfoData.costCenter.length - 1]}
          />
        );
      },
    },
    {
      key: "date_required",
      name: "Date Required",
      fieldName: "date_required",
      minWidth: 120,
      maxWidth: 150,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <div className={rootClass}>
            <DatePicker
              firstDayOfWeek={firstDayOfWeek}
              firstWeekOfYear={1}
              placeholder="MM/DD/YY"
              strings={defaultDatePickerStrings}
              formatDate={onFormatDate}
              showMonthPickerAsOverlay={true}
              value={value}
              componentRef={datePickerRef}
              onSelectDate={setValue as (date: Date | null | undefined) => void}
            />
          </div>
        );
      },
    },
    {
      key: "gl_account",
      name: "GL Account",
      fieldName: "gl_account",
      minWidth: 140,
      maxWidth: 160,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <>
            {tableviewItem.typeofPurchaseOption === "capitalequipmentasset" &&
            isPickerRemove === false ? (
              <Dropdown
                placeholder="- Select GL Account -"
                id="glAccount"
                onChange={changeDropdownOption}
                selectedKey={tableItem[rowIndex].glAccount}
                options={tableviewItem.glaccount}
                styles={dropdownStyles}
              />
            ) : tableviewItem.typeofPurchaseOption !==
              "capitalequipmentasset" ? (
              <Dropdown
                placeholder="- Select GL Account -"
                id="glAccount"
                onChange={changeDropdownOption}
                selectedKey={tableItem[rowIndex].glAccount}
                options={tableviewItem.glaccount}
                // options={}
                styles={dropdownStyles}
              />
            ) : null}
          </>
        );
      },
    },
    {
      key: "expense_gl",
      name: "Expense GL",
      fieldName: "expense_gl",
      minWidth: 140,
      maxWidth: 160,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <Dropdown
            placeholder="- Select Expense GL -"
            id="expensegl"
            onChange={changeDropdownOption}
            selectedKey={selectedItems["expensegl"]?.key}
            options={ExpenseGlOption}
            styles={dropdownStyles}
          />
        );
      },
    },
    {
      key: "qty",
      name: "Qty",
      fieldName: "qty",
      minWidth: 100,
      maxWidth: 150,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <TextField
            name="qty"
            value={tableItem[rowIndex].qty}
            onChange={(e, newValue) =>
              newhandleInputChange(e, newValue as string, rowIndex)
            }
          />
        );
      },
    },
    {
      key: "uom",
      name: "UOM",
      fieldName: "uom",
      minWidth: 150,
      maxWidth: 200,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },

      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <>
            <Dropdown
              placeholder="- Select UOM -"
              id="uom"
              options={UOMOption}
              onChange={changeDropdownOption}
              styles={dropdownStyles}
              selectedKey={selectedItems["uom"]?.key}
            />
          </>
        );
      },
    },
    {
      key: "unit_price",
      name: "Unit Price ($)",
      fieldName: "unit_price",
      minWidth: 100,
      maxWidth: 150,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <TextField
            name="uintprice"
            value={tableItem[rowIndex].uintprice}
            onChange={(e, newValue) =>
              newhandleInputChange(e, newValue as string, rowIndex)
            }
          />
        );
      },
    },
    {
      key: "unit_price_per",
      name: "Unit Price Per",
      fieldName: "unit_price_perom",
      minWidth: 80,
      maxWidth: 130,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <TextField
            name="unitpriceper"
            value={tableItem[rowIndex].unitpriceper}
            onChange={(e, newValue) =>
              newhandleInputChange(e, newValue as string, rowIndex)
            }
          />
        );
      },
    },
    {
      key: "total_amount",
      name: "Total Amount ($)",
      fieldName: "total_amount",
      minWidth: 100,
      maxWidth: 150,
      styles: {
        root: {
          backgroundColor: "#1e3a2e",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "#1e3a2e", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <TextField
            value={tableItem[rowIndex].totalAmount.toString()}
            disabled
          />
        );
      },
    },
    {
      key: "add_icon",
      name: (
        <IconButton
          iconProps={{ iconName: "Add" }}
          title="Add"
          ariaLabel="Add"
          onClick={() => createNewRow()}
        />
      ),
      fieldName: "add_icon",
      minWidth: 30,
      maxWidth: 50,
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <IconButton
            iconProps={{ iconName: "Delete" }}
            title="Delete"
            ariaLabel="Delete"
            onClick={() => deleteRow(rowIndex)}
          />
        );
      },
      styles: {
        root: {
          backgroundColor: "#ddd4d2",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          borderRadius: "20px",
          selectors: {
            ":hover": {
              backgroundColor: "#ddd4d2", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
    },
  ];
  console.log(
    "------------------- SelectPrProjectRadio---- ",
    SelectPrProjectRadio,
    tableviewItem.typeofPurchaseOption
  );
  // let columnss=(SelectPrProjectRadio==="No")?columns.filter((columnsValue)=>columnsValue.name !=="Project Code"):columns
  // let columnssPrepaid=(tableviewItem.typeofPurchaseOption!=="prepaid")?
  // columnss.filter((columnsVal)=>(columnsVal.name !=="Prepaid To Date" &&
  // columnsVal.key !== "Prepaid_From_Date" && columnsVal.key !=="expense_gl"))
  // :columnss
  // let columnssCapital=(tableviewItem.typeofPurchaseOption!=="capitalequipmentasset")
  // ?columnss.filter((columnsVal)=>(columnsVal.name !=="CIPCheck" && columnsVal.key !== "CIPNumber"))
  // :columnssPrepaid

  let MainColumn;

  if (SelectPrProjectRadio === "No") {
    MainColumn = columns.filter(
      (columnsValue) => columnsValue.name !== "Project Code"
    );
    if (tableviewItem.typeofPurchaseOption === "expense") {
      MainColumn = MainColumn.filter(
        (columnsVal) =>
          columnsVal.name !== "Prepaid To Date" &&
          columnsVal.name !== "Prepaid From Date" &&
          columnsVal.name !== "Expense GL" &&
          columnsVal.name !== "CIPCheck" &&
          columnsVal.key !== "CIPNumber"
      );
    }
    // if(tableviewItem.typeofPurchaseOption==="capitalequipmentasset"){
    //   MainColumn= columns.filter((columnsVal)=>(columnsVal.name ==="CIPCheck" && columnsVal.key === "CIPNumber"))
    // }
  }

  return (
    <div key={id}>
      <div>
        <Stack horizontal horizontalAlign="space-between">
          <span>{tableviewItem.typeofPurchaseName}</span>
          <span>
            <IconButton
              iconProps={{ iconName: "Delete" }}
              title="Delete"
              ariaLabel="Delete"
              onClick={() => deleteTable()}
            />
          </span>
        </Stack>
      </div>
      <Stack key={id}>
        <Stack.Item>
          <DetailsList
            items={tableItem}
            columns={MainColumn as IColumn[]}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </Stack.Item>
        {/* <Stack.Item>
          <DetailsList
            items={tableItem}
            columns={col as IColumn[]}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </Stack.Item> */}

        <Stack.Item align="end" style={{ display: "flex" }}>
          <span style={{ marginRight: "5px" }}>Total Amount in (USD): </span>
          {}
          <span> ($){totalAmount} </span>
        </Stack.Item>
      </Stack>
    </div>
  );
};
export default LineItemTableFormat;
function setFirstDayOfWeek(arg0: number) {
  throw new Error("Function not implemented.");
}
