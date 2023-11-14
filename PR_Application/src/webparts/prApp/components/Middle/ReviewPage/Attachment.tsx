import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxVisibility, DetailsList, IColumn } from "@fluentui/react";
import { useEffect, useState } from "react";
import { RootState } from "../../../../../app/store";
import '../StyleFourthComponent.css';
import { fetchStatusContent } from "../../../../../features/reducers/statusSlice";
import { GlobalStore } from "../../../../../app/globalStore";
import { ThunkDispatch } from "@reduxjs/toolkit";

interface IAttatchment {
  fileName: string;
  fileType: string;
  modifiedBy: string;
  fileModifiedTime: string;
  content: string;
}

const  Attachment: React.FunctionComponent = () => {
  const attatchmentInfo = useSelector(
    (state: RootState) => state.statusreducer.attatchmentInfo
  );

const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(()=>{
  dispatch(fetchStatusContent(GlobalStore.getPrId()));
  
},[])

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
       styles: {
        root: {
          backgroundColor: "green",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "green", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
    },
    {
      key: "fileType",
      name: "Type",
      fieldName: "fileType",
      onRender: (item: IAttatchment, rowIndex: number) => {
        return <span>{attatchmentItem[rowIndex].fileType}</span>;
      },
       styles: {
        root: {
          backgroundColor: "green",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "green", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
    },
    {
      key: "modifiedBy",
      name: "Modified By",
      fieldName: "modifiedBy",
      onRender: (item: IAttatchment, rowIndex: number) => {
        return <span>{attatchmentItem[rowIndex].modifiedBy}</span>;
      },
       styles: {
        root: {
          backgroundColor: "green",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "green", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
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

export default Attachment;