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
} from "@fluentui/react";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import TypeOfPurchase from "./TypeOfPurchase";
import { changeCheckbox } from "../../../../features/reducers/primaryinfoSlice";
import { deletetypePurchases } from "../../../../features/reducers/lineitemSlice";
import { TypeofPurchaseDetail } from "../../Model/TypePurchases/type_purchases_detail";
// Initialize Fluent UI icons (required)
interface TableRow {
  projectCode: string;
  description: string;
  costCenter: string;
  qty: string;
  uintprice: string;
  unitpriceper: string;
  total: number;
}
interface IThirdProps {
  tableviewItem: TypeofPurchaseDetail;
  id: number;
  addTotalAmount: (total: any) => void;
}
const LineItemTableFormat: React.FC<IThirdProps> = (props) => {
  const dispatch = useDispatch();
  const { tableviewItem, id, addTotalAmount } = props;
  const lineinfoData = useSelector((state: RootState) => state.lineiteminfo);
  console.log("Hello How Are You --------------------------");
  console.log(lineinfoData);
  console.log("Doing this type of work here -----------------------");
  const [tableItem, settableItem] = useState<TableRow[]>([
    {
      projectCode: "",
      description: "",
      costCenter: "",
      qty: "",
      uintprice: "",
      unitpriceper: "",
      total: 0,
    },
  ]);
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
  const glaccount: IDropdownOption[] = [
    { key: "1", text: "500120(COGS - Semi Finished Good)" },
    { key: "2", text: "500120(COGS - Finished Good)" },
  ];
  const uom: IDropdownOption[] = [
    { key: "1", text: "Acre(ACR)" },
    { key: "2", text: "Activity Unit(AU)" },
    { key: "1", text: "Bag(BAG)" },
    { key: "2", text: "Bottle(BT)" },
  ];

  //create new Row in the table
  const createNewRow = () => {
    let newRow = {
      projectCode: "",
      description: "",
      costCenter: "",
      qty: "",
      uintprice: "",
      unitpriceper: "",
      total: 0,
    };

    settableItem([...tableItem, newRow]);
  };
  //delete Row....
  const deleteRow = (tableRownumber: number) => {
    settableItem(tableItem.filter((value, index) => index !== tableRownumber));
  };

  //copy row ....
  const copyRow = (rowIndex: number) => {
    let newtableItem = [...tableItem];
    let copyItem = newtableItem[rowIndex];
    newtableItem.splice(rowIndex + 1, 0, copyItem);
    settableItem(newtableItem);
  };
  //---------------------------------------------------
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
    let total: number = (qtynumber * uintpricenumber) / unitpricepernumber;
    newItem[rowIndex].total = total;
    settableItem([...newItem]);
  };

  useEffect(() => {
    let newtableItem = tableItem;
    let listTotal: number[] = map(newtableItem, "total");
    let sum: number = listTotal.reduce((acc, curr) => acc + curr, 0);
    settotalAmount(sum);
  }, [tableItem]);

  useEffect(() => {
    // lineinfoData
    let newRow = {
      projectCode: tableviewItem.fetchProjectCodelastIndex(
        lineinfoData.selectDepartment
      ),
      description: "",
      costCenter: tableviewItem.costCenterlastIndex(),
      qty: "",
      uintprice: "",
      unitpriceper: "",
      total: 0,
    };

    settableItem([newRow]);
  }, []);

  React.useMemo(() => {
    let totalNumber = {
      id,
      amount: totalAmount,
      completedelete: false,
    };
    addTotalAmount(totalNumber);
  }, [totalAmount]);
  //------------------------------------------------------
  const columns = [
    {
      key: "copy",
      name: "Copy",
      fieldName: "copy",
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
    },
    {
      key: "project_code",
      name: "Project Code",
      fieldName: "project_code",
      minWidth: 200,
      maxWidth: 300,
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <Stack
            enableScopedSelectors
            horizontal
            horizontalAlign="space-between"
          >
            <TextField
              value={tableItem[rowIndex].projectCode}
              // value={
              //   lineinfoData.projectCode[lineinfoData.projectCode.length - 1]
              // }
            />
            <IconButton
              iconProps={{ iconName: "Add" }}
              title="Add"
              ariaLabel="Add"
              onClick={() => console.log("Addition here ......")}
            />
            <span></span>
          </Stack>
        );
      },
    },
    {
      key: "description",
      name: "Description",
      fieldName: "description",
      onRender: (item: TableRow, rowIndex: number) => {
        return <TextField />;
      },
    },
    {
      key: "cost_center",
      name: "Cost Center",
      fieldName: "cost_center",
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <TextField
            value={tableItem[rowIndex].costCenter}
            // value={lineinfoData.costCenter[lineinfoData.costCenter.length - 1]}
          />
        );
      },
    },
    {
      key: "date_required",
      name: "Date Required",
      fieldName: "date_required",
      onRender: (item: TableRow, rowIndex: number) => {
        return <DatePicker />;
      },
    },
    {
      key: "gl_account",
      name: "GL Account",
      fieldName: "gl_account",
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <Dropdown
            placeholder="- Select GL Account -"
            id="GlAccount"
            options={glaccount}
            // onChange={changeDropdownOption}
            // styles={dropdownStyles}
            // selectedKey={selectedItems["GlAccount"]?.key}
            // options={glaccount}
          />
        );
      },
    },
    {
      key: "qty",
      name: "Qty",
      fieldName: "qty",
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
      onRender: (item: TableRow, rowIndex: number) => {
        return <Dropdown placeholder="- Select UOM -" id="UOM" options={uom} />;
      },
    },
    {
      key: "unit_price",
      name: "Unit Price ($)",
      fieldName: "unit_price",
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
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <TextField value={tableItem[rowIndex].total.toString()} disabled />
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
    },
  ];
  return (
    <div>
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
      <Stack>
        <Stack.Item>
          <DetailsList
            items={tableItem}
            columns={columns as IColumn[]}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </Stack.Item>

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
