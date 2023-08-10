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
import { VendorData } from "../../Api/vendorapi";
import { VendorDetails } from "../../Model/vendor_details";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  venderItemDatapick: (vendor: VendorDetails) => void;
  // content?: string;
}
let Allitems: VendorDetails[] = [];

let vendorName: VendorDetails[] = [];
let vendorNumber: VendorDetails[] = [];
let vendorNamestring: string = "";
let vendorNumberstring: string = "";

export const SupplierModal: React.FunctionComponent<IModalProps> = (props) => {
  const { isModalOpen, showModal, venderItemDatapick } = props;
  const [items, setitems] = useState<VendorDetails[]>([]);
  const [selectNumber, setselectNumber] = useState<number>(0);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const sendVendorDetails = (vendorDetails: VendorDetails) => {
    console.log(vendorDetails);
    console.log("I am From SupplierModal .....");
    venderItemDatapick(vendorDetails);
    showModal();
  };

  let columns = [
    {
      key: "column1",
      name: "Supplier Number",
      fieldName: "vendorNumber",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: VendorDetails) => {
        let vendorNumber = item.vendorNumber as string;
        return (
          <Link onClick={() => sendVendorDetails(item)}>{vendorNumber}</Link>
        );
      },
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
      name: "Name",
      fieldName: "vendorName",
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
      key: "column3",
      name: "Street",
      fieldName: "vendorAddress",
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
      key: "column4",
      name: "City",
      fieldName: "vendorCity",
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
      key: "column5",
      name: "State",
      fieldName: "vendorState",
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
      key: "column6",
      name: "Postal Code",
      fieldName: "vendorZip",
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
      key: "column7",
      name: "Country",
      fieldName: "vendorCountry",
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
      key: "column8",
      name: "Company Code",
      fieldName: "venderCompanyCode",
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
  const onFilterName = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ) => {
    const filteredValue = newValue ? newValue.toLowerCase() : "";
    vendorNamestring = filteredValue;
    let result = [];
    if (vendorNumber.length === 0) {
      console.log(vendorNumber);
      console.log(vendorName);
      result = Allitems.filter((item) => {
        const vendorName = item.vendorName; // Access the vendorName property
        return (
          vendorName && vendorName.toLowerCase().indexOf(filteredValue) !== -1
        );
      });
    } else {
      console.log("Enter Second Time ");

      result = vendorNumber.filter((item) => {
        const vendorName = item.vendorName; // Access the vendorName property
        return (
          vendorName && vendorName.toLowerCase().indexOf(filteredValue) !== -1
        );
      });
    }

    if (vendorNamestring === "" && vendorNumberstring === "") {
      result = Allitems;
      // if (vendorName.length == 0) {
      //   result = Allitems;
      // } else {
      //   result = vendorName;
      // }
    } else {
      vendorName = result;
    }
    // if (filteredValue === "") {
    //   if (vendorNumber.length == 0) {
    //     result = Allitems;
    //   } else {
    //     result = vendorNumber;
    //   }
    // } else {

    // }
    // vendorName = result;
    console.log(vendorNumber);
    console.log(vendorName);

    setitems(result);
  };

  const onFilterNumber = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ) => {
    const filteredValue = newValue ? newValue.toLowerCase() : "";
    vendorNumberstring = filteredValue;
    let result = [];
    if (vendorName.length === 0) {

      result = Allitems.filter((item) => {
        const vendorNumber = item.vendorNumber; // Access the vendorName property
        return (
          vendorNumber &&
          vendorNumber.toLowerCase().indexOf(filteredValue) !== -1
        );
      });
    } else {

      result = vendorName.filter((item) => {
        const vendorNumber = item.vendorNumber; // Access the vendorName property
        return (
          vendorNumber &&
          vendorNumber.toLowerCase().indexOf(filteredValue) !== -1
        );
      });
    }
    if (vendorNamestring === "" && vendorNumberstring === "") {
      result = Allitems;
      // if (vendorName.length == 0) {
      //   result = Allitems;
      // } else {
      //   result = vendorName;
      // }
    } else {
      vendorNumber = result;
    }

    console.log(vendorNumber);
    console.log(vendorName);
    setitems(result);
  };

  React.useEffect(() => {
    setselectNumber(items.length);
  }, [items]);

  React.useEffect(() => {
    Allitems = VendorData.fetchVendordetails();
    console.log(Allitems);
    setitems(Allitems);
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
          {!isHovering ? (
            <h1
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              style={{ color: "#fff" }}
            >
              Supplier Search
            </h1>
          ) : null}
          {isHovering && (
            <h1
              style={{ color: "#fff" }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Total {selectNumber} record(s) found
            </h1>
          )}
          {/* {selectNumber === Allitems.length ? (
            <h1 style={{ color: "#fff" }}>Supplier Search</h1>
          ) : (
            <h1 style={{ color: "#fff" }}>
              Total {selectNumber} record(s) found
            </h1>
          )} */}
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
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  marginLeft: " 20px",
                  paddingLeft: "20px",
                }}
              >
                <span style={{ marginTop: "5px" }}>Supplier Name </span>
                <div style={{ marginLeft: "20px" }}>
                  <TextField onChange={onFilterName} />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  marginLeft: " 20px",
                  paddingLeft: "20px",
                }}
              >
                <span style={{ marginTop: "5px" }}>Supplier Number</span>
                <div style={{ marginLeft: "20px" }}>
                  <TextField onChange={onFilterNumber} />
                </div>
              </div>
            </div>
            <DetailsList
              items={items}
              columns={columns}
              checkboxVisibility={CheckboxVisibility.hidden}
            />
          </Stack>
        </div>
      </div>
    </Modal>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };
