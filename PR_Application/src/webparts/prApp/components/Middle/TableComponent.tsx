import * as React from "react";
import {
  DetailsList,
  IColumn,
  CheckboxVisibility,
} from "@fluentui/react/lib/DetailsList";
import { Icon } from "@fluentui/react/lib/Icon";
import { RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, IDropdownOption, IDropdownStyles, IconButton, Link } from "@fluentui/react";
import { deleteFileDoc, fileInformation, modifyFileData, saveFileDoc } from "../../../../features/reducers/primaryinfoSlice";
import { log } from "sp-pnp-js";

const TableComponent = () => {
  const dispatch = useDispatch();
  const fileData = useSelector(
    (state: RootState) => state.primaryinfo.fileData
  );

const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number,
    fileContent:fileInformation
  ): void => {
    console.log("item++:",item);
    console.log("item++....:",item.text);
    console.log(fileContent);
    let sowDoc={
      "docType":item.text
    }
    let fileProperty={...fileContent,...sowDoc};
    console.log(fileProperty);
    console.log("KKKKKKKKKKKKKKKK")
        dispatch(modifyFileData(fileProperty));
// 
    const { id } = event.target as HTMLDivElement;
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    // let fileData: fileInformation = {
    //   key:randomKey,
    //   fileName: acceptedFiles[0].name,
    //   fileType: acceptedFiles[0].type,
    //   modifiedBy:GlobalStore.getmainName(),
    //   // acceptedFiles[0].type
    //   fileModifiedTime: new Date().toLocaleDateString(),
    //   docType:"SOW",
    //   content:thisbase64String
    // };
    // console.log("Data ---------------------- >> ",fileData)
    
    // dispatch(saveFileDoc(fileData));
  };
  //------------------------------------------


  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

  const DocTypeOption: IDropdownOption[] = [
    { key: "SOW", text: "SOW" },
    { key: "Quote", text: "Quote" },
    { key: "Contract", text: "Contract" },
    { key: "Proposal", text: "Proposal" },
    { key: "Renewal", text: "Renewal" },
    { key: "Other", text: "Other" },
  ];

  console.log();
  
  function openBase64ContentInNewTab(

    base64String: string,

    contentType: string

  ) {
    console.log("Here Content Type is ",contentType,base64String)

    // Create a new window or tab

    let newTab = window.open();

    newTab = newTab as Window;

    // Decode the Base64 string to binary data

    const binaryData = atob(base64String);

 

    // Create a Uint8Array from the binary data

    const uint8Array = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {

      uint8Array[i] = binaryData.charCodeAt(i);

    }

 

    // Create a Blob from the binary data

    const blob = new Blob([uint8Array], { type: contentType });

 

    // Create a URL for the Blob

    const blobURL = URL.createObjectURL(blob);
    // console.log("---------------->>> ", blobURL);
    // console.log(contentType);
    // console.log(contentType.match("image/"))

    // Create an HTML template to display the content

    const htmlTemplate = `

      <!DOCTYPE html>

      <html>
      <body>

          <div>
            ${contentType.match("image/")? (`<img src="${blobURL}" alt="Base64 Content" />`) : ""}
            <pre>${binaryData}</pre>
          </div>
      </body>
      </html>

    `;

 

    // Write the HTML template to the new tab

    newTab.document.open();

    newTab.document.write(htmlTemplate);

    newTab.document.close();

  }

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "File Name",
      fieldName: "column1",
      minWidth: 200,
      maxWidth: 300,
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
      key: "column5",
      name: "Delete",
      fieldName: "column5",
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
      column1: <Link
       onClick={()=>openBase64ContentInNewTab(fileData[i].content,fileData[i].fileType)}
      ><b>
       
        {fileData[i].fileName}</b></Link>,
      // column2: <span>{fileData[i].fileType}</span>,
      column2:<div>
        <Dropdown
          placeholder="- Select Doc Type -"
          id="prOption"                  
          onChange={(  event: React.FormEvent<HTMLDivElement>,
                      item: IDropdownOption | undefined,
                       index: number)=>changeDropdownOption(event,item,index,fileData[i])}
          options={DocTypeOption}
          style={{ width: "150px" }}
          selectedKey={fileData[i].docType}
          styles={dropdownStyles}
                />
      </div>,
      column3: <span>{fileData[i].modifiedBy}</span>,
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
