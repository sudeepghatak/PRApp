import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../app/store";
import { CheckboxVisibility, DetailsList, IColumn } from "@fluentui/react";
import { useEffect, useState } from "react";

interface IAttatchment {
  fileName: string;
  fileType: string;
  modifiedBy: string;
  fileModifiedTime: string;
  content: string;
}

const AttatchmentContent: React.FunctionComponent = () => {
  const attatchmentInfo = useSelector(
    (state: RootState) => state.statusreducer.attatchmentInfo
  );

  const [attatchmentItem, setattatchmentItem] = useState<IAttatchment[]>([
    {
      fileName: "",
      fileType: "",
      modifiedBy: "",
      fileModifiedTime: "",
      content: "",
    },
  ]);
  useEffect(() => {
    let attatchmentList = [];
    console.log("Attatchment data --- ", attatchmentInfo);
    if (attatchmentInfo.length !== 0) {
      for (let i = 0; i < attatchmentInfo.length; i++) {
        let newitemLineinfo = {
          fileName: attatchmentInfo[i].fileName,
          fileType: attatchmentInfo[i].docType,
          modifiedBy: attatchmentInfo[i].modifiedBy,
          fileModifiedTime: attatchmentInfo[i].fileModifiedTime,
          content: attatchmentInfo[i].content,
        };

        attatchmentList.push(newitemLineinfo);
      }
      console.log(
        "This is Whole Attatchment Of This Content Here ---45",
        attatchmentList
      );
      setattatchmentItem(attatchmentList);
    }
  }, []);

  console.log(
    "This is Whole Attatchment Of This Content Here ---53",
    attatchmentItem
  );
  const columns = [
    {
      key: "fileName",
      name: "File Name",
      fieldName: "fileName",
      onRender: (item: IAttatchment, rowIndex: number) => {
        console.log(
          "Attatchment Data ------------53 for fileName",
          attatchmentItem,
          rowIndex
        );
        return <span>{attatchmentItem[rowIndex].fileName}</span>;
      },
    },
    {
      key: "fileType",
      name: "Type",
      fieldName: "fileType",
      onRender: (item: IAttatchment, rowIndex: number) => {
        return <span>{attatchmentItem[rowIndex].fileType}</span>;
      },
    },
    {
      key: "modifiedBy",
      name: "Modified By",
      fieldName: "modifiedBy",
      onRender: (item: IAttatchment, rowIndex: number) => {
        return <span>{attatchmentItem[rowIndex].modifiedBy}</span>;
      },
    },
    {
      key: "fileModifiedTime",
      name: "Modified Date",
      fieldName: "fileModifiedTime",
      onRender: (item: IAttatchment, rowIndex: number) => {
        return <span>{attatchmentItem[rowIndex].fileModifiedTime}</span>;
      },
    },
  ];
  return (
    <>
      <DetailsList
        items={attatchmentItem}
        columns={columns as IColumn[]}
        checkboxVisibility={CheckboxVisibility.hidden}
      />
    </>
  );
};

export default AttatchmentContent;
