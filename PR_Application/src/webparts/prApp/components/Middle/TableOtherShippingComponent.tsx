import {
  CheckboxVisibility,
  DetailsList,
  IIconProps,
  IconButton,
  // Link,
  Modal,
  Stack,
} from "@fluentui/react";
import * as React from "react";
// import { ConnectPr } from "../../Api/api";

interface IPROtherShippingLoc {
  isShippingAddOpen: boolean;
  showShippingAdd: () => void;
  ShippingDataPick: any;
}

const OtherShippingAddComponent: React.FunctionComponent<
  IPROtherShippingLoc
> = (props) => {
  const { isShippingAddOpen, showShippingAdd, ShippingDataPick } = props;
  const [shippingitems, setShippingitems] = React.useState<any[]>([]);

  const otherSelectItem = (item: IPROtherShippingLoc) => {
    console.log("data enter...");
    ShippingDataPick(item);
    showShippingAdd();
    console.log(item);
  };

  React.useEffect(() => {
    // let OtherShippingLoc: any[] = [];
    // ConnectPr.getInstance().GetPROtherShippingLoc().then((OtherShippingLocValue)=>{
    //   console.log(OtherShippingLocValue)
    //   for(let i=0;i<OtherShippingLocValue.length;i++){
    //     let newItemOtherShippingLoc={
    //       key:i,
    //       Title:OtherShippingLocValue[i].Title,
    //       HouseNumber:OtherShippingLocValue[i].HouseNumber,
    //       PostalCode:OtherShippingLocValue[i].PostalCode,
    //       City:OtherShippingLocValue[i].City,
    //       // Region:OtherShippingLocValue[i].Region
    //     }
    //     OtherShippingLoc.push(newItemOtherShippingLoc)
    //   }
    //    setShippingitems([...OtherShippingLoc])
    // }
    // )
    setShippingitems([]);
  }, []);

  const columns = [
    {
      key: "column1",
      name: "Street",
      fieldName: "Title",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
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
      name: "House Number",
      fieldName: "HouseNumber",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
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
      name: "Postal Code",
      fieldName: "PostalCode",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
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
      name: "City",
      fieldName: "City",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
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
      name: "Region",
      fieldName: "Region",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
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
      key: "column6",
      name: " ",
      fieldName: " ",
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
      onRender: (item: any) => {
        return <button onClick={() => otherSelectItem(item)}>Select</button>;
      },
    },
  ];
  return (
    <div>
      <Modal
        isOpen={isShippingAddOpen}
        onDismiss={showShippingAdd}
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
          <span
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 990,
              backgroundColor: "whitesmoke",
              maxHeight: 30,
            }}
          >
            {/* <span> 
             button= {{
              cursor: "pointer",
              color: "white",
              background: "green",
              BorderRadius: 5,
             }}
         </span> */}
            <IconButton
              style={{ color: "black" }}
              iconProps={cancelIcon}
              onClick={showShippingAdd}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15, width: 1000 }}>
          <DetailsList
            items={shippingitems}
            columns={columns}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </div>
      </Modal>
    </div>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };

export default OtherShippingAddComponent;
