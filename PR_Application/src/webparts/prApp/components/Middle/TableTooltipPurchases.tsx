import {
  // Button,
  CheckboxVisibility,
  DetailsList,
  // IIconProps,
  // IconButton,
  // Modal,
  // Stack,
} from "@fluentui/react";
import * as React from "react";
// import { ConnectPr } from "../../Api/api";
// import { BaseButton } from "office-ui-fabric-react";
// import { restApiCall } from "../../Api/ApiCall";
// import { useDispatch } from "react-redux";
// import { tableToolinterface, toolTipUpdate } from "../../../../features/reducers/primaryinfoSlice";
// import { IPRPrepaidGLLoc } from "../../Model/IPrGLAccountLoc";



interface InterTableTooltip{
    store:[]
}

const TableTooltipPurchases  : React.FunctionComponent<InterTableTooltip> = (props) => {
    const {store}=props;

//   const {prType,ebuy,toolName  } = props;
//   console.log(data)
//   console.log("====================>> ",toolName)
  //  const dispatch = useDispatch();
//   const [items,setitems]=React.useState([])
  React.useEffect(()=>{
    // console.log("In sert Here -------------------------",prType,ebuy,toolName)


  },[])
  

  const columns = [
    
    {
      key: "column1",
      name: "GL Code",
      fieldName: "GL_Code",
      minWidth: 50,
      maxWidth: 70,
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
    },{
      key: "column2",
      name: "GL Code Description",
      fieldName: "GL_Code_Description",
      minWidth: 100,
      maxWidth: 140,
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
      name: "Documents Needed",
      fieldName: "Documents_Needed",
      minWidth: 150,
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
    }
  ];
  return (
    <div>
       <div style={{ paddingLeft: 15, paddingRight: 15, width: 500}}>
          <DetailsList
            items={store}
            columns={columns}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </div>
        {/* <p>{prType}</p>
        <p>{toolName}</p> */}
      {/* <Modal
        isOpen={isGLAccountOpen}
        // onDismiss={showGLAccount}
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
            <h2 style={{ color: "#fff" }}> {GLAccountType} GL Accounts </h2>
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
              style={{ color: "black" }}
              iconProps={cancelIcon}
              onClick={showGLAccount}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15, width: 1000 }}>
          <DetailsList
            items={items}
            columns={columns}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </div>
      </Modal> */}
    </div>
  );
};



// const cancelIcon: IIconProps = { iconName: "Cancel" };

export default TableTooltipPurchases
