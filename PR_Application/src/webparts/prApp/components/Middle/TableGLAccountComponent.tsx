import {
  Button,
  CheckboxVisibility,
  DetailsList,
  IIconProps,
  IconButton,
  Modal,
  Stack,
} from "@fluentui/react";
import * as React from "react";
import { ConnectPr } from "../../Api/api";
import { BaseButton } from "office-ui-fabric-react";
import { restApiCall } from "../../Api/ApiCall";


interface IPGLAcoountCode {
  isGLAccountOpen: boolean ;
  showGLAccount: ()=> void ;
  // showGLAccount: React.Dispatch<React.SetStateAction<boolean>> |
  GLAccountType: string;
}

export const GLAccountComponent : React.FunctionComponent<IPGLAcoountCode> = (props) => {

  const { isGLAccountOpen, showGLAccount, GLAccountType } = props;
  const [items,setitems]=React.useState([])
  React.useEffect(()=>{
    if( GLAccountType == "Expense" ){
      let expense=[]
      restApiCall.getExpenseGLList().then((expValue)=>{
        // console.log("iiiiiiiiiiiiiiiiShohini .......................")
        // console.log(expValue)
        // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        for(let i=0;i<expValue.length;i++){
          let newItemExp={
            key: expValue[i] ,
            TypeOfPurchase: expValue[i].OrderType,
            GLCode: expValue[i].Title,
            GLCodeDescription: expValue[i].Dscription,
            DocumentsNeeded: "SOW, Quote, Proposal, Other, "
          }
          expense.push(newItemExp)

        }
          setitems([...expense])
    })

    }
   else if( GLAccountType == "Prepaid"){
    ConnectPr.getInstance().GetPRPrepaidGLLoc().then((preValue)=>{
      let prepaid=[]
      for(let i=0;i<preValue.length;i++){
        let newItemPrepaid={
            key: preValue[i] ,
            TypeOfPurchase: preValue[i].Type_of_Purchase,
            GLCode: preValue[i].GL_Code,
            GLCodeDescription: preValue[i].GL_Code_Description,
            DocumentsNeeded: preValue[i].Documents_Needed
          }
          prepaid.push(newItemPrepaid)   
      }
          setitems([...prepaid])

    })

   }


  },[])
  

  const columns = [
    {
      key: "column1",
      name: "Type of Purchase",
      fieldName: "TypeOfPurchase",
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
    {
      key: "column2",
      name: "GL Code",
      fieldName: "GLCode",
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
    },{
      key: "column3",
      name: "GL Code Description",
      fieldName: "GLCodeDescription",
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
    },
    {
      key: "column4",
      name: "Documents Needed",
      fieldName: "DocumentsNeeded",
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
      <Modal
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
      </Modal>
    </div>
  );
};



const cancelIcon: IIconProps = { iconName: "Cancel" };



