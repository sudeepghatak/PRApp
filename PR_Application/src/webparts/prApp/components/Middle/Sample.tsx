import * as React from "react";
import { useState, useEffect } from "react";
import { Stack, IStackTokens, IStackStyles } from "@fluentui/react/lib/Stack";

import styles from "../PrApp.module.scss";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";

import { ConnectPr } from "../../Api/api";



const col1Style: IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "right",
      width: "30%",
    },
  };
  const col2Style: IStackStyles = {
    root: {
      padding: "0px",
      textAlign: "left",
      width: "70%",
    },
  };

 useEffect(() => {
ConnectPr.getInstance().GetPRCompanyCode();
    
    let listData=[]
      for(let i=0;i<companyCodeOption.length;i++){
        let newObj={
          key:i.toString,text:companyCodeOption[i].MappedCompanyCode
        }
        listData.push(newObj)
      }
      setCompanyCodeOption(listData)

    // })
    setshowDialog(true);
  }, []);



  const [companyCodeOption,setCompanyCodeOption]=useState([])



 const [selectedItems, setSelectedItems] = useState<{
    [key: string]: IDropdownOption;
  }>({
    prOption: { key: "", text: "" },
    companyCode: { key: "", text: "" },
    selectDepartment: { key: "", text: "" },
    projectCode: { key: "", text: "" },
  });

  const [showDialog, setshowDialog] = useState<boolean>(false);

  const showAlertDialog = () => {
    setshowDialog(!showDialog);
  };

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

   const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    console.log("------------------");
    console.log(id);
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    // if (item) {
    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    // }
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: newSelectedItem,
    }));
    if (id === "prOption") {
      setshowDialog(true);
    }
  };

const Sample = () => {
  return (
    <>

    <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Company Code: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <Dropdown
                  placeholder="Select an option"
                  id="companyCode"
                  onChange={changeDropdownOption}
                  selectedKey={selectedItems["companyCode"]?.key}
                  style={{ width: "200px" }}
                  options={companyCodeOption}
                  styles={dropdownStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
      
    </>
  )
}

export default Sample


 