import * as React from "react";
import {
  CheckboxVisibility,
  DetailsList,
  IColumn,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import { restApiCall } from "../../../../Api/ApiCall";

interface IApprovalLimit {
  [x: string]: any;
  JobLavel: string;
  ApprovalLimit: string;
}

const ApprovalLimitComponent: React.FunctionComponent = () => {
  const [isLoading, setisLoading] = useState(true);
  const [approvalItem, setapprovalItem] = useState<IApprovalLimit[]>([
    {
      JobLavel: "",
      ApprovalLimit: "",
    },
  ]);
  useEffect(() => {
    restApiCall.getApprovalLimitList().then((approvalLimitResult) => {
      console.log(
        "This is The approvalLimitResult here for find This Here 27 in ApprovalLimitComponent file ",
        approvalLimitResult
      );
      let approvalList: IApprovalLimit[] = [];
      for (let i = 0; i < approvalLimitResult.length; i++) {
        let itemapprovalItem: IApprovalLimit = {
          JobLavel: approvalLimitResult[i].JobName,
          ApprovalLimit:
            approvalLimitResult[i].Amount === null
              ? 0
              : approvalLimitResult[i].Amount,
        };
        console.log("itemapprovalItem::", itemapprovalItem);

        approvalList.push(itemapprovalItem);
      }

      let itemName = {
        JobLavel: "EHS Department (only if PR is relevant to EHS)",
        ApprovalLimit: "0",
      };
      //   approvalList.splice(0, 0, itemName);
      let itemName1 = { JobLavel: "FP&A - All PR", ApprovalLimit: "0" };
      approvalList.splice(0, 0, itemName, itemName1);
      setisLoading(false);
      setapprovalItem(approvalList);
    });
  }, []);

  const columns = [
    {
      key: "JobLavel",
      name: "Job Level",
      fieldName: "JobLavel",
      onRender: (item: IApprovalLimit, rowIndex: number) => {
        return <span>{item.JobLavel == undefined ? "" : item.JobLavel}</span>;
      },
    },
    {
      key: "ApprovalLimit",
      name: "Approval Limit",
      fieldName: "ApprovalLimit",
      onRender: (item: IApprovalLimit, rowIndex: number) => {
        return (
          <span>
            $ {item.ApprovalLimit == undefined ? "" : item.ApprovalLimit}
          </span>
        );
      },
    },
  ];
  return (
    <>
      <div>
        {!isLoading ? (
          <div>
            <DetailsList
              items={approvalItem}
              columns={columns as IColumn[]}
              checkboxVisibility={CheckboxVisibility.hidden}
            />
          </div>
        ) : (
          <div>
            <Spinner
              style={{ paddingTop: 10 }}
              size={SpinnerSize.medium}
              label="please wait..."
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ApprovalLimitComponent;
