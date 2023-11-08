import * as React from "react";
import { BasicInfoObj } from "../../../../../Model/BasicInfoline";
import { useEffect, useState } from "react";
import { CheckboxVisibility, DetailsList, IColumn } from "@fluentui/react";

interface IBasicinfolineitem {
  newlineinfoItem: BasicInfoObj;
}
interface TableRow {
  description: string;
  costCenter: string;
  date: string;
  glAccount: string;
  qty: string;
  UOM: string;
  uintprice: string;
  unitpriceper: string;
  totalAmount: number;
}

const Basicinfolineitem: React.FunctionComponent<IBasicinfolineitem> = (
  props
) => {
  const { newlineinfoItem } = props;
  console.log("I am at Basicinfolineitem here ---", newlineinfoItem);
  const [tableItem, settableItem] = useState<TableRow[]>([
    {
      description: "",
      costCenter: "",
      date: "",
      glAccount: "",
      qty: "",
      UOM: "",
      uintprice: "",
      unitpriceper: "",
      totalAmount: 0,
    },
  ]);
  useEffect(() => {
    if (newlineinfoItem.basicInfoObjList.length !== 0) {
      console.log(
        "Here This is The Data Of BasicinformationContent ----",
        newlineinfoItem.basicInfoObjList
      );
      let lineinfoList = [];
      for (let i = 0; i < newlineinfoItem.basicInfoObjList.length; i++) {
        console.log(
          "BasicInformationContent --------- -- -- ---- ---- - ---- ---- ---- - - ",
          i
        );
        let newitemLineinfo = {
          description: newlineinfoItem.basicInfoObjList[i].description,
          costCenter: newlineinfoItem.basicInfoObjList[i].costCenter,
          date: newlineinfoItem.basicInfoObjList[i].date,
          glAccount: newlineinfoItem.basicInfoObjList[i].glAccount,
          qty: newlineinfoItem.basicInfoObjList[i].qty,
          UOM: newlineinfoItem.basicInfoObjList[i].UOM,
          uintprice: newlineinfoItem.basicInfoObjList[i].uintprice,
          unitpriceper: newlineinfoItem.basicInfoObjList[i].unitpriceper,
          totalAmount: newlineinfoItem.basicInfoObjList[i].totalAmount,
        };

        lineinfoList.push(newitemLineinfo);
      }

      settableItem(lineinfoList);
    }
  }, []);
  const columns = [
    {
      key: "description",
      name: "Description",
      fieldName: "description",
      onRender: (item: TableRow, rowIndex: number) => {
        console.log(
          "Basicinformation Here ------ ",
          tableItem,
          rowIndex,
          tableItem[rowIndex]
        );
        return <span>{tableItem[rowIndex].description}</span>;
      },
    },
    {
      key: "cost_center",
      name: "Cost Center",
      fieldName: "cost_center",
      onRender: (item: TableRow, rowIndex: number) => {
        return <span>{tableItem[rowIndex].costCenter}</span>;
      },
    },
    {
      key: "date_required",
      name: "Date Required",
      fieldName: "date_required",
      onRender: (item: TableRow, rowIndex: number) => {
        return <span>{tableItem[rowIndex].date}</span>;
      },
    },
    {
      key: "gl_account",
      name: "GL Account",
      fieldName: "gl_account",
      onRender: (item: TableRow, rowIndex: number) => {
        return <span>{tableItem[rowIndex].glAccount}</span>;
      },
    },
    {
      key: "qty",
      name: "Qty",
      fieldName: "qty",
      onRender: (item: TableRow, rowIndex: number) => {
        return <span>{tableItem[rowIndex].qty}</span>;
      },
    },
    {
      key: "uom",
      name: "UOM",
      fieldName: "uom",
      onRender: (item: TableRow, rowIndex: number) => {
        return (
          <>
            <span>{tableItem[rowIndex].UOM}</span>
          </>
        );
      },
    },
    {
      key: "unit_price",
      name: "Unit Price ($)",
      fieldName: "unit_price",
      onRender: (item: TableRow, rowIndex: number) => {
        return <span>{tableItem[rowIndex].uintprice}</span>;
      },
    },
    {
      key: "unit_price_per",
      name: "Unit Price Per",
      fieldName: "unit_price_perom",
      onRender: (item: TableRow, rowIndex: number) => {
        return <span>{tableItem[rowIndex].unitpriceper}</span>;
      },
    },
    {
      key: "total_amount",
      name: "Total Amount ($)",
      fieldName: "total_amount",
      onRender: (item: TableRow, rowIndex: number) => {
        return <span>{tableItem[rowIndex].totalAmount}</span>;
      },
    },
  ];
  return (
    <>
      <div>
        <div style={{ display: "flex", alignItems: "start" }}>
          <span>
            {newlineinfoItem.lineObjname === undefined
              ? ""
              : newlineinfoItem.lineObjname}
          </span>
        </div>
        <div>
          <DetailsList
            items={tableItem}
            columns={columns as IColumn[]}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </div>
        <div style={{ float: "right" }}>
          <h3 style={{ float: "left", margin: 0 }}>Total Amount:</h3>
          <span style={{ float: "left", paddingTop: "3px" }}>
            {newlineinfoItem.totalAmount}
          </span>
        </div>
      </div>
    </>
  );
};

export default Basicinfolineitem;
