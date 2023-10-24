import * as React from "react";
import {
  CheckboxVisibility,
  DetailsList,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../app/store";

interface TableRow {
  description: string;
  costCenter: string;
  date: string;
  glAccount: string;
  qty: string;
  uOM: string;
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
      uOM: "",
      uintprice: "",
      unitpriceper: "",
      totalAmount: 0,
    },
  ]);
  const columns = [
    {
      key: "description",
      name: "Description",
      fieldName: "description",
      onRender: (rowIndex: number) => {
        return <span></span>;
      },
    },
    {
      key: "cost_center",
      name: "Cost Center",
      fieldName: "cost_center",
      onRender: (rowIndex: number) => {
        return <span></span>;
      },
    },
    {
      key: "date_required",
      name: "Date Required",
      fieldName: "date_required",
      onRender: (rowIndex: number) => {
        return <span></span>;
      },
    },
    {
      key: "gl_account",
      name: "GL Account",
      fieldName: "gl_account",
      onRender: (rowIndex: number) => {
        return <span></span>;
      },
    },
    {
      key: "qty",
      name: "Qty",
      fieldName: "qty",
      onRender: (rowIndex: number) => {
        return <span></span>;
      },
    },
    {
      key: "uom",
      name: "UOM",
      fieldName: "uom",
      onRender: (rowIndex: number) => {
        return (
          <>
            <span></span>
          </>
        );
      },
    },
    {
      key: "unit_price",
      name: "Unit Price ($)",
      fieldName: "unit_price",
      onRender: (rowIndex: number) => {
        return <span></span>;
      },
    },
    {
      key: "unit_price_per",
      name: "Unit Price Per",
      fieldName: "unit_price_perom",
      onRender: (rowIndex: number) => {
        return <span></span>;
      },
    },
    {
      key: "total_amount",
      name: "Total Amount ($)",
      fieldName: "total_amount",
      onRender: (rowIndex: number) => {
        return <span></span>;
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
