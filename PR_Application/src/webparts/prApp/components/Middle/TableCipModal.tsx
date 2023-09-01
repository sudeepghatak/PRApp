import * as React from "react";
import { useState } from "react";
import {
  Modal,
  IIconProps,
  Stack,
  TextField,
  DetailsList,
  Link,
  CheckboxVisibility,
} from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { VendorDetails } from "../../Model/vendor_details";
import { CipData } from "../../Api/cip_api";
import { Label } from "@fluentui/react/lib/Label";
import { Spinner } from "@fluentui/react/lib/Spinner";
interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  companyCode:string;
}
let Allitems: VendorDetails[] = [];
let completeDatafetch:boolean=false;
export const CipModal: React.FunctionComponent<IModalProps> = (props) => {
  const { isModalOpen, showModal,companyCode } = props;
  const [items, setitems] = useState<VendorDetails[]>([]);
  // const [dataStatus, setdataStatus] = useState<boolean>(false);




  let columns = [
    {
      key: "column1",
      name: "CIP Number",
      fieldName: "cipNumber",
      minWidth: 100,
      maxWidth: 200,
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
      name: "Description",
      fieldName: "details",
      minWidth: 400,
      maxWidth: 600,
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
      name: "Company Code",
      fieldName: "companycode",
      minWidth: 100,
      maxWidth: 200,
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

  React.useEffect(() => {
    CipData.fetchCpiDetails(companyCode).then((Allitems) => {
      completeDatafetch=true;
      setitems(Allitems);

    });
  }, []);

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
        <span style={{ marginTop: -5, paddingLeft: 15 }}>
          <h2 style={{ color: "#fff" }}>All Valid CIP Numbers</h2>
        </span>
        <span
          style={{
            marginTop: 15,
            marginRight: 15,
            backgroundColor: "whitesmoke",
            maxHeight: 30,
          }}
        >
          <IconButton
            style={{ color: "red" }}
            iconProps={cancelIcon}
            onClick={showModal}
          />
        </span>
      </Stack>
      <div style={{ paddingLeft: 15, paddingRight: 15 }}>
        <div>
          <Stack>
            {! completeDatafetch ? (
              <div>
                  <Spinner label="Please wait .." />
              </div>
            ) :
            (items.length == 0)? 
            ("No Data Found"):(
              <DetailsList
                items={items}
                columns={columns}
                checkboxVisibility={CheckboxVisibility.hidden}
              />
            )
            }
          </Stack>
        </div>
      </div>
    </Modal>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };
