import { CheckboxVisibility, DetailsList, IColumn } from "@fluentui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../app/store";

interface IApproval {
  task: string;
  modified: string;
}

const ApprovalTaskHistory: React.FunctionComponent = () => {

  const apprvaltaskHistory = useSelector(
    (state: RootState) => state.auditreducer.approvalHistory
  );

  const columns = [
    {
      key: "task",
      name: "Task",
      fieldName: "task",
      onRender: (item: IApproval, rowIndex: number) => {
        return <span>{item.task}</span>;
      },
    },
    {
      key: "modified",
      name: "Modified",
      fieldName: "modified",
      onRender: (item: IApproval, rowIndex: number) => {
        return <span>{item.modified}</span>;
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DetailsList
        items={apprvaltaskHistory}
        columns={columns as IColumn[]}
        checkboxVisibility={CheckboxVisibility.hidden}
      />
    </div>
  );
};

export default ApprovalTaskHistory;
