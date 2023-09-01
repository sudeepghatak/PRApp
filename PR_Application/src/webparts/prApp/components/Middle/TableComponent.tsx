import * as React from "react";
import {
  DetailsList,
  IColumn,
  CheckboxVisibility,
} from "@fluentui/react/lib/DetailsList";
import { Icon } from "@fluentui/react/lib/Icon";
import { RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@fluentui/react";
import { deleteFileDoc } from "../../../../features/reducers/primaryinfoSlice";

const TableComponent = () => {
  const dispatch = useDispatch();
  const fileData = useSelector(
    (state: RootState) => state.primaryinfo.fileData
  );
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "File Name",
      fieldName: "column1",
      minWidth: 50,
      maxWidth: 100,
      styles: {
        root: {
          backgroundColor: "green", // Replace with your desired color
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid", // Replace with your desired text color
        },
      },
    },
    {
      key: "column2",
      name: "Document Type",
      fieldName: "column2",
      minWidth: 100,
      maxWidth: 200,
      styles: {
        root: {
          backgroundColor: "green", // Replace with your desired color
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid", // Replace with your desired text color
        },
      },
    },
    {
      key: "column3",
      name: "Modified By",
      fieldName: "column3",
      minWidth: 150,
      maxWidth: 200,
      styles: {
        root: {
          backgroundColor: "green", // Replace with your desired color
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid", // Replace with your desired text color
        },
      },
    },
    {
      key: "column4",
      name: "Modified Date",
      fieldName: "column4",
      minWidth: 100,
      maxWidth: 200,
      styles: {
        root: {
          backgroundColor: "green", // Replace with your desired color
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid", // Replace with your desired text color
        },
      },
    },
    {
      key: "column5",
      name: "Delete",
      fieldName: "column5",
      minWidth: 100,
      maxWidth: 200,
      styles: {
        root: {
          backgroundColor: "green", // Replace with your desired color
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid", // Replace with your desired text color
        },
      },
    },
  ];

  const items = [
    // {
    //   key: "item1",
    //   column1: <span>PR 30928 copy of 220322.....</span>,
    //   column2: <span>Hi</span>,
    //   column3: <span>Brett smith</span>,
    //   column4: <span>3/28/2022 5:52:42 PM</span>,
    //   column5: <Icon iconName="CompassNW" />,
    // },
    // Add more items as needed
  ];
  // const items=
  for (let i = 0; i < fileData.length; i++) {
    let newItem = {
      key: fileData[i].key,
      column1: <span>{fileData[i].fileName}</span>,
      column2: <span>{fileData[i].fileType}</span>,
      column3: <span>Brett smith</span>,
      column4: <span>{fileData[i].fileModifiedTime}</span>,
      column5: (
        <IconButton
          iconProps={{ iconName: "Delete" }}
          title="Delete"
          ariaLabel="Delete"
          onClick={() => dispatch(deleteFileDoc(fileData[i].key))}
        />
      ),
    };
    items.push(newItem);
  }

  return (
    <DetailsList
      items={items}
      columns={columns}
      checkboxVisibility={CheckboxVisibility.hidden}
    />
  );
};

export default TableComponent;
