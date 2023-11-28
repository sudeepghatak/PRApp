import * as React from "react";
import { useEffect, useState } from "react";
import {
  Modal,
  IIconProps,
  Stack,
  // TextField,
  DetailsList,
  // Link,
  CheckboxVisibility,
} from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
// import { VendorDetails } from "../../Model/vendor_details";
// import { CipData } from "../../Api/cip_api";
// import { Label } from "@fluentui/react/lib/Label";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { restApiCall } from "../../Api/ApiCall";
import { IprChngCurrency } from "../../Model/IPrChngCurrency";
import { GlobalStore } from "../../../../app/globalStore";
// import { values } from "lodash";
import './File.css';

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  FormCurr:string;
//   companyCode:string;
}
// let Allitems: VendorDetails[] = [];
// let completeDatafetch:boolean=false;
export const TableChangeCurrencyData: React.FunctionComponent<IModalProps > = (props) => {
  const { isModalOpen, showModal,FormCurr} = props;
  const [items, setitems] = useState<IprChngCurrency[]>([]);

useEffect(()=>{
    let ChangeCurrValue:any=[]
    console.log("FormCurr::",GlobalStore.getDefaultCurr(),FormCurr);
    
    restApiCall.GetCurrencyChangeUrl(FormCurr,
    GlobalStore.getDefaultCurr()).then((value)=>{  
        for(let i:number=0;i<value.length;i++){
            let newValue={
                key:value[i],
                To:value[i].ToCurrency,
                From:value[i].FromCurrency,
                Exchange_Rate:value[i].ExchangeRate,
                // Exchange_Rate_Date
            }
            ChangeCurrValue.push(newValue)
        }
        setitems([...ChangeCurrValue])

 })
},[])



let columns = [
    {
      key: "column1",
      name: "From",
      fieldName: "From",
      minWidth: 50,
      maxWidth: 80,
      isResizable: true,
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
      key: "column2",
      name: "To",
      fieldName: "To",
      minWidth: 50,
      maxWidth: 80,
      isResizable: true,
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
      key: "column3",
      name: "Exchange Rate",
      fieldName: "Exchange_Rate",
      minWidth: 150,
      maxWidth: 180,
      isResizable: true,
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
      key: "column4",
      name: "Exchange Rate Date",
      fieldName: "Exchange_Rate_Date",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
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
  ];

//   useEffect(() => {
//     })
//   }, []);

  return (
    <Modal
      styles={{ main: { maxHeight: "unset" } }}
      isOpen={isModalOpen}
      onDismiss={showModal}
      isBlocking={false}
    >
      <Stack
        horizontal
        horizontalAlign="space-between"
        style={{
          backgroundColor: "black",
          border: "3px solid #fff",
        }}
      >
        <span >
        {/* style={{ marginTop: 16, paddingLeft: 15 }}> */}
            <div className="linkFontDesign">Current Exchange Rate</div>
          
        </span>
        <span
          style={{
            marginTop: 15,
            marginRight: 15,
            
          }}
        >
        <div className="linkCrossDesign">
          <IconButton
            iconProps={cancelIcon}
            onClick={showModal}
          />
        </div>
        </span>
      </Stack>
      <div style={{ paddingLeft: 15, paddingRight: 15 }}>
        <div>
          <Stack>
            {(items.length === 0 ) ? (
              <div>
                  <Spinner label="Please wait .." />
              </div>
            ) :
            // (items.length === 0)? 
            // ("No Data Found"):(
              <DetailsList
                items={items}
                columns={columns}
                checkboxVisibility={CheckboxVisibility.hidden}
              />
            // )
            } 
          </Stack>
        </div>
      </div>
    </Modal>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };
