import * as React from "react";
import {
  CheckboxVisibility,
  DetailsList,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../app/store";

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

const BasicInformationContent: React.FunctionComponent = () => {
  const basicInfo = useSelector(
    (state: RootState) => state.statusreducer.basicInfo
  );
  console.log("Basic info ", basicInfo);
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
    if (basicInfo.lineInfoList !== 0) {
      console.log(
        "Here This is The Data Of BasicinformationContent ----",
        basicInfo.lineInfoList
      );
      let lineinfoList = [];
      for (let i = 0; i < basicInfo.lineInfoList.length; i++) {
        console.log(
          "BasicInformationContent --------- -- -- ---- ---- - ---- ---- ---- - - ",
          i
        );
        let newitemLineinfo = {
          description: basicInfo.lineInfoList[i].description,
          costCenter: basicInfo.lineInfoList[i].cost_center,
          date: basicInfo.lineInfoList[i].date_required,
          glAccount: basicInfo.lineInfoList[i].gl_account,
          qty: basicInfo.lineInfoList[i].qty,
          UOM: basicInfo.lineInfoList[i].uom,
          uintprice: basicInfo.lineInfoList[i].unit_price,
          unitpriceper: basicInfo.lineInfoList[i].unit_price_per,
          totalAmount: basicInfo.lineInfoList[i].total_amount,
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
        <div className="basic-status">
          <span>PR Type:</span>
          <span>{basicInfo.PR_Type}</span>
          <span> Total Order Amount:</span>
          <span>{basicInfo.Is_this_Project_Related}</span>
        </div>
        <div className="basic-status back-hover">
          <span>SAP PR / PO Request ID:</span>
          <span>{basicInfo.Is_this_Project_Related}</span>
          <span> Connect PR Request ID:</span>
          <span>{basicInfo.Connect_PR_Request_ID}</span>
        </div>
        <div className="basic-status">
          <span>Status:</span>
          <span>{basicInfo.Status}</span>
          <span>Cost Center:</span>
          <span> {basicInfo.Cost_Center}</span>
        </div>
        <div className="basic-status back-hover">
          <span>Type Of Buy:</span>
          <span> {basicInfo.Type_Of_Buyd}</span>
          <span> Prepaid or Capital buy?:</span>
          <span> {basicInfo.Prepaid_or_Capital_buy}</span>
        </div>
        <div className="basic-status">
          <span>CIP Number:</span>
          <span>{basicInfo.Is_this_Project_Related}</span>
          <span>UFID:</span>
          <span>{basicInfo.Is_this_Project_Related}</span>
        </div>
        <div className="basic-status back-hover">
          <span>Type of Order:</span>
          <span>{basicInfo.Type_of_Order}</span>
          <span>EHS Relevant?:</span>
          <span>{basicInfo.Is_this_Project_Related}</span>
        </div>
        <div className="basic-status">
          <span>Is this Project Related?:</span>
          <span>{basicInfo.Is_this_Project_Related}</span>
          <span>Project Code:</span>
          <span>{basicInfo.Project_Code}</span>
        </div>
        <div>
          <DetailsList
            items={tableItem}
            columns={columns as IColumn[]}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </div>
      </div>
    </>
  );
};

export default BasicInformationContent;
