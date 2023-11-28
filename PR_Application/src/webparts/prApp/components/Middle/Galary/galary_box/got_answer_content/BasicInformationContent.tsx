import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../app/store";
import Basicinfolineitem from "./Basicinfolineitem";
import { BasicInfoObj } from "../../../../../Model/BasicInfoline";

const BasicInformationContent: React.FunctionComponent = () => {
  const basicInfo = useSelector(
    (state: RootState) => state.statusreducer.basicInfo
  );
  console.log("Basic info ", basicInfo);
  return (
    <>
      <div>
        <div className="basic-status">
          <span>PR Type:</span>
          <span>{basicInfo.PR_Type}</span>
          <span> Total Order Amount:</span>
          <span>{basicInfo.Total_Order_Amount}</span>
        </div>
        <div className="basic-status back-hover">
          <span>SAP PR / PO Request ID:</span>
          <span>{basicInfo.SAP_PR_PO_Request_ID}</span>
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
          <span> {basicInfo.Type_Of_Buy}</span>
          <span> Prepaid or Capital buy?:</span>
          <span> {basicInfo.Prepaid_or_Capital_buy}</span>
        </div>
        <div className="basic-status">
          <span>CIP Number:</span>
          <span>{basicInfo.CIP_Number}</span>
          <span>UFID:</span>
          <span>{basicInfo.UFID}</span>
        </div>
        <div className="basic-status back-hover">
          <span>Type of Order:</span>
          <span>{basicInfo.Type_of_Order}</span>
          <span>EHS Relevant?:</span>
          <span>{basicInfo.EHS_Relevant}</span>
        </div>
        <div className="basic-status">
          <span>Is this Project Related?:</span>
          <span>{basicInfo.Is_this_Project_Related}</span>
          <span>Project Code:</span>
          <span>{basicInfo.Project_Code}</span>
        </div>
        <div>
          {basicInfo.lineInfoList.length !== 0 ? (
            <>
              {basicInfo.lineInfoList.map((lineinfoItem: BasicInfoObj) => {
                console.log("oooooooo  ---- 60 60 60 60", lineinfoItem);
                return (
                  <Basicinfolineitem
                    newlineinfoItem={lineinfoItem}
                    isPrepaidorExpense={basicInfo.Prepaid_or_Capital_buy}
                  />
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BasicInformationContent;
