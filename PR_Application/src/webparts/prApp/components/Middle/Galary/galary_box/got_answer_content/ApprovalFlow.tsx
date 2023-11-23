import { CheckboxVisibility, DetailsList, IColumn } from "@fluentui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../app/store";

interface IApprovalFlow {
  level: "";
  approver: "";
  approver_status: "";
  approver_date: "";
}

const ApprovalFlow: React.FunctionComponent = () => {
  const apprvalProcessFlow = useSelector(
    (state: RootState) => state.auditreducer.approvalFlow
  );

  const columns = [
    {
      key: "level",
      name: "Level",
      minWidth: 200,
      maxWidth: 300,
      fieldName: "level",
      onRender: (item: IApprovalFlow, rowIndex: number) => {
        return <span>{item.level}</span>;
      },
    },
    {
      key: "approver",
      name: "Approver",
      minWidth: 200,
      maxWidth: 300,
      fieldName: "approver",
      onRender: (item: IApprovalFlow, rowIndex: number) => {
        return <span>{item.approver}</span>;
      },
    },
    {
      key: "approval_status",
      name: "Approval Status",
      minWidth: 200,
      maxWidth: 300,
      fieldName: "approval_status",
      onRender: (item: IApprovalFlow, rowIndex: number) => {
        return <span>{item.approver_status}</span>;
      },
    },
    {
      key: "approval_date",
      name: "Approval Date",
      fieldName: "approval_date",
      onRender: (item: IApprovalFlow, rowIndex: number) => {
        return <span>{item.approver_date}</span>;
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DetailsList
        items={apprvalProcessFlow}
        columns={columns as IColumn[]}
        checkboxVisibility={CheckboxVisibility.hidden}
      />
    </div>
  );
};

export default ApprovalFlow;
