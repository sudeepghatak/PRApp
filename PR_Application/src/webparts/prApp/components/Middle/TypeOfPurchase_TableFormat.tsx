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
import { GlobalStore } from "../../../../app/globalStore";
// import { defaultprepaidFromDatePickerStrings, defaultprepaidToDatePickerStrings } from "@fluentui/react/lib/DatePicker";
// Initialize Fluent UI icons (required)
interface TableRow {
  PKID:string;
  CIPNumber: string;
  projectCode: string;
  description: string;
  costCenter: string;
  date: string;
  glAccount: string;
  expensegl: string;
  qty: string;
  uOM: string;
  uintprice: string;
  unitpriceper: string;
  totalAmount: number;
  prepaid_to_date: string;
  prepaid_from_date: string;
  // glaccount:[]
}
interface IThirdProps {
  tableviewItem: TypeofPurchaseDetail;
  id: number;
  addTotalAmount: (total: any) => void;
  isViewMode: boolean;
  AmountCurr:string;
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
  const { tableviewItem, id, addTotalAmount, isViewMode , AmountCurr } = props;
  //date Required....
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  // console.log("-----------------Id ------ ",id)
  const lineinfoData = useSelector((state: RootState) => state.lineiteminfo);
  const [tableItem, settableItem] = useState<TableRow[]>([
    {
      PKID:null,
      CIPNumber: "",
      projectCode: "",
      description: "",
      costCenter: "",
      date: new Date().toString(),
      glAccount: "",
      expensegl: "",
      qty: "",
      uOM: "",
      uintprice: "",
      unitpriceper: "",
      totalAmount: 0,
      prepaid_to_date: new Date().toString(),
      prepaid_from_date: new Date().toString(),
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
  //Link for Project Code Pick particular value-------------------------------------

  const [ProCodeItem, setProCodeItem] = useState<IPrProjectCode>(
    new IPrProjectCode(" ", " ")
  );
  const ProCodeItemDatapick = (ProCode: IPrProjectCode) => {
    console.log("ProCode:::", ProCode.project_code);
    setProCodeItem(ProCode);
  };
  console.log("ProCodeItem::", ProCodeItem.project_code);

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
 console.log("tableviewItem.costCenter--",tableviewItem.costCenter,tableviewItem.projectCode);
 
  //create new Row in the table
  const createNewRow = () => {
    let newRow = {
      PKID: null,
      CIPNumber: tableviewItem.CFID,
      projectCode: tableviewItem.projectCode,
      description: "",
      costCenter: tableviewItem.costCenter,
      date: new Date().toString(),
      glAccount: "",
      expensegl: "",
      qty: "",
      uOM: "",
      uintprice: "",
      unitpriceper: "",
      totalAmount: 0,
      prepaid_to_date: new Date().toString(),
      prepaid_from_date: new Date().toString(),
      // glaccount:[]
    };
    const typOfPuchaseCreateNew = new TypeLineItem(
      newRow.CIPNumber,
      newRow.projectCode,
      newRow.description,
      newRow.costCenter,
      newRow.date,
      newRow.glAccount,
      newRow.expensegl,
      newRow.qty,
      newRow.uOM,
      newRow.uintprice,
      newRow.unitpriceper,
      newRow.totalAmount,
      newRow.prepaid_to_date,
      newRow.prepaid_from_date
    );
    typOfPuchaseCreateNew.PKID=newRow.PKID;
    tableviewItem.demotypeOfPurchaseInfoList = [
      ...tableviewItem.typeOfPurchaseInfoList,
      typOfPuchaseCreateNew,
    ];
    settableItem([...tableItem, newRow]);
  };

  //delete Row....----------------------------------------

  const deleteRow = (tableRownumber: number) => {
    if(tableItem[tableRownumber].PKID!==null)
    {
      let delLineItem=[
        {
          "PKID":tableItem[tableRownumber].PKID
        }
      ]
      restApiCall.DeleleLineItem(delLineItem);
   }
    tableviewItem.demotypeOfPurchaseInfoList = 
      tableviewItem.demotypeOfPurchaseInfoList.filter(
        (value, index) => index != tableRownumber
      );
    settableItem(tableItem.filter((value, index) => index !== tableRownumber));

    // tableviewItem.demotypeOfPurchaseInfoList =
    //   tableviewItem.demotypeOfPurchaseInfoList.filter(
    //     (value, index) => index != tableRownumber
    //   );

    // settableItem(tableItem.filter((value, index) => index !== tableRownumber));
  };

  //copy row ....
  const copyRow = (rowIndex: number) => {
    let newtableItem = [...tableItem];
    let copyItem = newtableItem[rowIndex];
    let newRow = {
      PKID:null,
      CIPNumber: copyItem.CIPNumber,
      projectCode: copyItem.projectCode,
      description: copyItem.description,
      costCenter: copyItem.costCenter,
      date: copyItem.date,
      glAccount: copyItem.glAccount,
      expensegl: copyItem.expensegl,
      qty: copyItem.qty,
      uOM: copyItem.uOM,
      unitPrice: copyItem.uintprice,
      unitPricePer: copyItem.unitpriceper,
      totalAmount: copyItem.totalAmount,
      prepaid_to_date: copyItem.prepaid_to_date,
      prepaid_from_date: copyItem.prepaid_from_date,
    };
    const copyTypeOfPurchase = new TypeLineItem(
      newRow.CIPNumber,
      newRow.projectCode,
      newRow.description,
      newRow.costCenter,
      newRow.date,
      newRow.glAccount,
      newRow.expensegl,
      newRow.qty,
      newRow.uOM,
      newRow.unitPrice,
      newRow.unitPricePer,
      newRow.totalAmount,
      newRow.prepaid_to_date,
      newRow.prepaid_from_date
    );
    copyTypeOfPurchase.PKID=newRow.PKID;
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
  console.log("Date ::", onFormatDate());

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
    let qtynumber: number = +newItem[rowIndex].qty;
    let uintpricenumber: number = +newItem[rowIndex].uintprice;
    let unitpricepernumber: number = +newItem[rowIndex].unitpriceper;
    let totalAmount: number =
      (qtynumber * uintpricenumber) / unitpricepernumber;
    newItem[rowIndex].totalAmount = totalAmount;
    // newItem[rowIndex].prepaid_to_date=

    const changeTypeOfPurchase = new TypeLineItem(
      newItem[rowIndex].CIPNumber,
      newItem[rowIndex].projectCode,
      newItem[rowIndex].description,
      newItem[rowIndex].costCenter,
      newItem[rowIndex].date,
      newItem[rowIndex].glAccount,
      newItem[rowIndex].expensegl,
      newItem[rowIndex].qty,
      newItem[rowIndex].uOM,
      newItem[rowIndex].uintprice,
      newItem[rowIndex].unitpriceper,
      newItem[rowIndex].totalAmount,
      newItem[rowIndex].prepaid_to_date,
      newItem[rowIndex].prepaid_from_date
    );
    changeTypeOfPurchase.PKID=newItem[rowIndex].PKID;
    tableviewItem.demotypeOfPurchaseInfoList[rowIndex] = changeTypeOfPurchase;
    settableItem([...newItem]);
  };

  const pickDate = (date, index: number, name) => {
    let newItem = tableItem;
    newItem[index] = {
      ...newItem[index],
      [name]: date.toString(),
    };
    //Date Onselect------------------------------
    const changeTypeOfPurchase = new TypeLineItem(
      newItem[index].CIPNumber,
      newItem[index].projectCode,
      newItem[index].description,
      newItem[index].costCenter,
      newItem[index].date,
      newItem[index].glAccount,
      newItem[index].expensegl,
      newItem[index].qty,
      newItem[index].uOM,
      newItem[index].uintprice,
      newItem[index].unitpriceper,
      newItem[index].totalAmount,
      newItem[index].prepaid_to_date,
      newItem[index].prepaid_from_date
    );
    changeTypeOfPurchase.PKID=newItem[index].PKID;
    tableviewItem.demotypeOfPurchaseInfoList[index] = changeTypeOfPurchase;
    // newItem[index].glAccount = newSelectedItem.key as string;
    settableItem([...newItem]);

    console.log("Date Here ", date);
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

    let newItem = tableItem;
    newItem[index] = {
      ...newItem[index],
      [id]: newSelectedItem.key,
    };
    const changeTypeOfPurchase = new TypeLineItem(
      newItem[index].CIPNumber,
      newItem[index].projectCode,
      newItem[index].description,
      newItem[index].costCenter,
      newItem[index].date,
      newItem[index].glAccount,
      newItem[index].expensegl,
      newItem[index].qty,
      newItem[index].uOM,
      newItem[index].uintprice,
      newItem[index].unitpriceper,
      newItem[index].totalAmount,
      newItem[index].prepaid_to_date,
      newItem[index].prepaid_from_date
    );
    changeTypeOfPurchase.PKID=newItem[index].PKID;
    tableviewItem.demotypeOfPurchaseInfoList[index] = changeTypeOfPurchase;
    // newItem[index].glAccount = newSelectedItem.key as string;
    settableItem([...newItem]);

    console.log(
      "AAAAAAAAAAAAAAAAAAAAAARRRRRRRRRRRRRRRRRRRRRRRR-----------------",
      id,
      newItem[index].glAccount,
      index,
      newItem
    );
  };
  //GL account Details---------------------------------------
  // console.log("selectedItems[expenseGL]?.key",selectedItems["expensegl"]?.key,selectedItems["glAccount"]?.key);

  const [glaccountOption, setglaccountOption] = useState([]);
  const [UOMOption, setUOMOption] = useState([]);
  useEffect(() => {
    (async () => {
      let listglacc = [];
      let GLList = await restApiCall.GetTypeOfPurGLCodeOdrType(
        tableviewItem.prType,
        tableviewItem.typeofPurchaseOption,
        tableviewItem.typeofPurchaseName
      );
      // .then((GLList) => {
      // console.log("tableviewItem.typeofPurchaseOption---tableviewItem.typeofPurchaseOption",tableviewItem.typeofPurchaseOption,tableviewItem.typeofPurchaseName);
      for (let i = 0; i < GLList.length; i++) {
        let newOption = {
          key: GLList[i].GL_Code.toString(),
          text: GLList[i].GL_Code + " (" + GLList[i].Dscription + ") ",
        };
        listglacc.push(newOption);
      }
      setglaccountOption(listglacc);
      // });

      let listUOM = [];
      let uomValue = await restApiCall.GetUOMUrl();
      // .then((Value) => {
      // console.log("tableviewItem.typeofPurchaseOption---tableviewItem.typeofPurchaseOption",tableviewItem.typeofPurchaseOption,tableviewItem.typeofPurchaseName);
      for (let i = 0; i < uomValue.length; i++) {
        let newUOMOption = {
          key: uomValue[i].Title,
          text: uomValue[i].UnitText + " ( " + uomValue[i].Title + " ) ",
        };
        listUOM.push(newUOMOption);
      }
      setUOMOption(listUOM);
      // });
    })();
  }, []);

  useEffect(() => {
    tableviewItem.glaccount = glaccountOption;
  }, [glaccountOption]);

  console.log("gl Account Find HEre 483 483 483", glaccountOption, tableItem);
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
        setExpenseGlOption(listExpGl);
      });
    },
    // }
    [glPickID]
  );
  // ---------------------------------------------------------------

  useEffect(() => {
    let simpleList = [];
    // console.log("tableviewItem==",tableviewItem);
    // if (lineinfoData.saveTable === 0) {
    //   let newRow = {
    //     CIPNumber: tableviewItem.CFID,
    //     projectCode: tableviewItem.projectCode,
    //     description: "",
    //     costCenter: tableviewItem.costCenter,
    //     date: "04/18/2017",
    //     glAccount: "",
    //     qty: "",
    //     uOM: " ",
    //     uintprice: "",
    //     unitpriceper: "",
    //     totalAmount: 0,
    //     prepaid_to_date: "",
    //     prepaid_from_date: "",
    //   };
    //   const typeItem = new TypeLineItem(
    //     newRow.CIPNumber,
    //     newRow.projectCode,
    //     newRow.description,
    //     newRow.costCenter,
    //     newRow.date,
    //     newRow.glAccount,
    //     newRow.qty,
    //     newRow.uOM,
    //     newRow.uintprice,
    //     newRow.unitpriceper,
    //     newRow.totalAmount,
    //     newRow.prepaid_to_date,
    //     newRow.prepaid_from_date
    //   );
    //   tableviewItem.demotypeOfPurchaseInfoList = [typeItem];
    //   simpleList = [newRow];
    //   // console.log("if NewRow===",newRow);
    // } else {
    // console.log("typeOfPurchaseInfoList");
    // console.log(tableviewItem.typeOfPurchaseInfoList);
    for (
      let i: number = 0;
      i < tableviewItem.typeOfPurchaseInfoList.length;
      i++
    ) {
      let newRow = {
        PKID: tableviewItem.typeOfPurchaseInfoList[i].PKID,
        CIPNumber: tableviewItem.typeOfPurchaseInfoList[i].CFID,
        projectCode: tableviewItem.typeOfPurchaseInfoList[i].projectCode,
        description: tableviewItem.typeOfPurchaseInfoList[i].des,
        costCenter: tableviewItem.typeOfPurchaseInfoList[i].CostCenter,
        date: tableviewItem.typeOfPurchaseInfoList[i].date,
        glAccount: tableviewItem.typeOfPurchaseInfoList[i].glAccount,
        expensegl: tableviewItem.typeOfPurchaseInfoList[i].expensegl,
        qty: tableviewItem.typeOfPurchaseInfoList[i].qty,
        uOM: tableviewItem.typeOfPurchaseInfoList[i].uOM,
        uintprice: tableviewItem.typeOfPurchaseInfoList[i].unitPrice,
        unitpriceper: tableviewItem.typeOfPurchaseInfoList[i].unitPricePer,
        totalAmount: +tableviewItem.typeOfPurchaseInfoList[i].totalamount,
        prepaid_to_date:
          tableviewItem.typeOfPurchaseInfoList[i].prepaid_to_date,
        prepaid_from_date:
          tableviewItem.typeOfPurchaseInfoList[i].prepaid_from_date,
      };
      console.log("newRow --1132 1132", newRow);

      simpleList.push(newRow);
      tableviewItem.demotypeOfPurchaseInfoList[i] =
        tableviewItem.typeOfPurchaseInfoList[i];
    }
    // }

    settableItem(simpleList);
  }, []);
  // const pickDate = (date) => {
  //   console.log("Date Here ", date);
  // };
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
            disabled={isViewMode}
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
              disabled={isViewMode}
              checked={isPickerRemove}
              onChange={onCheckedButtonClick}
              styles={checkboxStyles}
            />
            {isPickerRemove === true ? (
              <TextField
                disabled={isViewMode}
                name="CIPNumber"
                value={tableItem[rowIndex].CIPNumber}
              />
            ) : (
              <TextField disabled={isViewMode} name="CIPNumber" value="" />
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
              disabled={isViewMode}
              firstDayOfWeek={firstDayOfWeek}
              firstWeekOfYear={1}
              placeholder="MM/DD/YY"
              // strings={defaultprepaidFromDatePickerStrings}
              formatDate={onFormatDate}
              showMonthPickerAsOverlay={true}
              value={
                tableItem[rowIndex].date === ""
                  ? new Date()
                  : new Date(tableItem[rowIndex].prepaid_from_date)
              }
              // PrepaidFromvalue

              componentRef={datePickerRef}
              // onSelectDate={
              //   setPrepaidFromvalue as (date: Date | null | undefined) => void
              // }
              onSelectDate={(date) =>
                pickDate(date, rowIndex, "prepaid_from_date")
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
              disabled={isViewMode}
              firstWeekOfYear={1}
              placeholder="MM/DD/YY"
              // strings={defaultprepaidToDatePickerStrings}
              formatDate={onFormatDate}
              showMonthPickerAsOverlay={true}
              value={
                tableItem[rowIndex].date === ""
                  ? new Date()
                  : new Date(tableItem[rowIndex].prepaid_to_date)
              }
              // PrepaidTovalue

              componentRef={datePickerRef}
              // onSelectDate={
              //   setPrepaidTovalue as (date: Date | null | undefined) => void
              // }
              onSelectDate={(date) =>
                pickDate(date, rowIndex, "prepaid_to_date")
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
              disabled={isViewMode}
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
        return (
          <TextField
            name="description"
            disabled={isViewMode}
            value={tableItem[rowIndex].description}
            onChange={(e, newValue) =>
              newhandleInputChange(e, newValue as string, rowIndex)
            }
          />
        );
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
              disabled={isViewMode}
              firstDayOfWeek={firstDayOfWeek}
              firstWeekOfYear={1}
              placeholder="MM/DD/YY"
              strings={defaultDatePickerStrings}
              formatDate={onFormatDate}
              showMonthPickerAsOverlay={true}
              value={
                tableItem[rowIndex].date === ""
                  ? new Date()
                  : new Date(tableItem[rowIndex].date)
              }
              componentRef={datePickerRef}
              // onSelectDate={
              //   (date) => pickDate(date)
              // setValue as (date: Date | null | undefined) => void }
              onSelectDate={(date) => pickDate(date, rowIndex, "date")}
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
                disabled={isViewMode}
                id="glAccount"
                onChange={(
                  event: React.FormEvent<HTMLDivElement>,
                  option?: IDropdownOption<any>,
                  index?: number
                ) => changeDropdownOption(event, option, rowIndex)}
                selectedKey={tableItem[rowIndex].glAccount}
                options={tableviewItem.glaccount}
                // options={glaccountOption}
                styles={dropdownStyles}
              />
            ) : tableviewItem.typeofPurchaseOption !==
              "capitalequipmentasset" ? (
              <Dropdown
                placeholder="- Select GL Account -"
                id="glAccount"
                disabled={isViewMode}
                onChange={(
                  event: React.FormEvent<HTMLDivElement>,
                  option?: IDropdownOption<any>,
                  index?: number
                ) => changeDropdownOption(event, option, rowIndex)}
                selectedKey={tableItem[rowIndex].glAccount}
                options={tableviewItem.glaccount}
                // options={glaccountOption}
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
            disabled={isViewMode}
            id="expensegl"
            onChange={(
              event: React.FormEvent<HTMLDivElement>,
              option?: IDropdownOption<any>,
              index?: number
            ) => changeDropdownOption(event, option, rowIndex)}
            selectedKey={tableItem[rowIndex].expensegl}
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
            disabled={isViewMode}
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
        console.log(
          "UOM UOM UOM 1688",
          UOMOption,
          tableItem[rowIndex].uOM,
          rowIndex
        );
        return (
          <>
            <Dropdown
              placeholder="- Select UOM -"
              id="uOM"
              disabled={isViewMode}
              options={UOMOption}
              onChange={(
                event: React.FormEvent<HTMLDivElement>,
                option?: IDropdownOption<any>,
                index?: number
              ) => changeDropdownOption(event, option, rowIndex)}
              styles={dropdownStyles}
              selectedKey={
                tableItem[rowIndex].uOM
                // selectedItems["uom"]?.key
              }
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
            disabled={isViewMode}
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
            disabled={isViewMode}
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
          disabled={isViewMode}
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
            disabled={isViewMode}
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

  let MainColumn;
  if (tableviewItem.typeofPurchaseOption === "expense") {
    MainColumn = columns.filter(
      (columnsVal) =>
        columnsVal.name !== "Prepaid To Date" &&
        columnsVal.name !== "Prepaid From Date" &&
        columnsVal.name !== "Expense GL" &&
        columnsVal.name !== "CIPCheck" &&
        columnsVal.key !== "CIPNumber"
    );
  } else if (tableviewItem.typeofPurchaseOption === "prepaid") {
    MainColumn = columns.filter(
      (columnsVal) =>
        columnsVal.name !== "CIPCheck" && columnsVal.key !== "CIPNumber"
    );
  } else if (tableviewItem.typeofPurchaseOption === "capitalequipmentasset") {
    MainColumn = columns.filter(
      (columnsVal) =>
        columnsVal.name !== "Prepaid To Date" &&
        columnsVal.name !== "Prepaid From Date" &&
        columnsVal.name !== "Expense GL"
    );
  }
  if (SelectPrProjectRadio === "No") {
    MainColumn = MainColumn.filter((value) => value.name !== "Project Code");
  }

  return (
    <div key={id}>
      <div>
        <Stack horizontal horizontalAlign="space-between">
          <span>{tableviewItem.typeofPurchaseName}</span>
          <span>
            <IconButton
              iconProps={{ iconName: "Delete" }}
              disabled={isViewMode}
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
          <span style={{ marginRight: "5px" }}>Total Amount in ({AmountCurr}): </span>
          {}
          <span> ($){totalAmount} </span>
        </Stack.Item>
      </Stack>
    </div>
  );
};
export default LineItemTableFormat;
