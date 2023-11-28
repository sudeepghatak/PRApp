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
import { restApiCall } from "../../Api/ApiCall";
import { useState } from "react";

interface IPDeptUserDetails {
  isDeptUseropen: boolean ;
  showDeptUserModal: ()=> void ;
  pickCostCenter: string;
  pickCompanyCode: string;
}

export const DepartmentUserComponent : React.FunctionComponent<IPDeptUserDetails> = (props) => {

const { isDeptUseropen, showDeptUserModal,pickCostCenter, pickCompanyCode} = props;
const [items,setitems]=useState<any[]>([])
  React.useEffect(()=>{
      let DeptUser:any[]=[]
      
     restApiCall.getUserDeptList(pickCostCenter,pickCompanyCode).then((Value)=>{
       for(let i=0;i<Value.length;i++){
          let newItemExp={
            key: Value[i] ,
            FirstName:Value[i].FirstName+" "+Value[i].LastName,
            ManagerName:Value[i].ManagerName,
            JobLevel : Value[i].JobLevel,
            CostCenter:Value[i].CostCenter,
            DepartmentName:Value[i].DepartmentName,
            CompanyCode:Value[i].CompanyCode
            }
        DeptUser.push(newItemExp)
        }
        setitems([...DeptUser])
    })

  },[]) 
//  console.log("email Dept User :: ");
 
  const columns = [
    {
      key: "column1",
      name: "Employee",
      fieldName: "FirstName",
      minWidth: 150,
      maxWidth: 200,
      // onRender: () => {
      //   // let Title = item.Title as string;
      //   return(
      //    <>
      //     {/* <Link onClick={() => linkClickDeptUserEvent(Title,companyCode)}>{Title}</Link> */}
    
      //   </>)},
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
      name: "Supervisor",
      fieldName: "ManagerName",
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
      key: "column3",
      name: "Job Level",
      fieldName: "JobLevel",
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
      key: "column4",
      name: "Cost Center",
      fieldName: "CostCenter",
      minWidth: 80,
      maxWidth: 120,
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
      name: "Department",
      fieldName: "DepartmentName",
      minWidth: 200,
      maxWidth: 250,
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
      name: "Company Code",
      fieldName: "CompanyCode",
      minWidth: 100,
      maxWidth: 120,
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
        isOpen={isDeptUseropen}
        // onDismiss={showGLAccount}
        isBlocking={false}
      >
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{
            backgroundColor: "black",
            border: "2px solid #fff",
          }}
        >
          <span style={{ marginTop: -5, paddingLeft: 15 }}>
            <h2 style={{ color: "#fff" }}>{pickCostCenter} Department Users </h2>
          </span>
          <span
            style={{
              marginTop: 15,
              marginRight: 15,
              backgroundColor: "#f5f5f5",
              maxHeight: 30,
            }}
          >
            <IconButton
              style={{ color: "black" }}
              iconProps={cancelIcon}
              onClick={showDeptUserModal}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15, width: 900, maxHeight:500 }}>
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



