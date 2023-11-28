import {
  CheckboxVisibility,
  DetailsList,
  IIconProps,
  IconButton,
  Link,
  Modal,
  Stack,
} from "@fluentui/react";
import * as React from "react";
import { restApiCall } from "../../Api/ApiCall";
import { CostCenterDetails } from "../../Model/IPrCostCenter";
import { useState } from "react";

import { DepartmentUserComponent } from "./TableDepartmentUser";
import './Page.css';


interface IPCostCenter {
  isCostCenterOpen: boolean ;
  showCostCenter: ()=> void ;
//   CostCenterDatapick:(CostCenterValue: CostCenterDetails)=>void;
//    GlPRType:string | number;
  companyCode: string;
 
}

export const CostCenterComponent : React.FunctionComponent<IPCostCenter> = (props) => {

  const { isCostCenterOpen, showCostCenter, companyCode} = props;
  const [items,setitems]=useState<any[]>([])
  const [pickCostCenter,setpickCostCenter]=useState("")
  const [pickCompanyCode,setpickCompanyCode]=useState("")
    
 const [openDeptUser, setopenDeptUser] = useState<boolean>(false);
  const showDeptUserModal = () => {
    setopenDeptUser(!openDeptUser);
  };
  //Onclick for Dept User
  const linkClickDeptUserEvent = (Title:string,companyCode:string) => {
    // showModal();
    setpickCostCenter(Title);
    setpickCompanyCode(companyCode);
    showDeptUserModal();

  };

  React.useEffect(()=>{
      let costcenter:any[]=[]
    //   let newGlPRType=GlPRType as string;
      restApiCall.getCostCenterList(companyCode).then((Value)=>{
      
        for(let i=0;i<Value.length;i++){
          let newItemExp={
            key: Value[i] ,
            Title: Value[i].Title,
            CostCenterType: Value[i].CostCenterType,
            Details: Value[i].Details,
            CompanyCode: Value[i].CompanyCode     
          }
        costcenter.push(newItemExp)
        }
      setitems([...costcenter])
    })

  },[]) 
 
  const columns = [
    {
      key: "column1",
      name: "Cost Center",
      fieldName: "Title",
      minWidth: 70,
      maxWidth: 120,
      
     onRender: (item: CostCenterDetails) => {
        let Title = item.Title as string;
        let CCType=item.CostCenterType as string ;
        return(
         <>
        {(CCType == "Department")?
          <div className="SelectItemstyle">
            <Link onClick={() => linkClickDeptUserEvent(Title,companyCode)}>{Title}</Link>
          </div>
        :Title
        }   
        {openDeptUser?
        (<DepartmentUserComponent
            isDeptUseropen={openDeptUser}
            showDeptUserModal={showDeptUserModal}
            pickCostCenter={pickCostCenter}
            pickCompanyCode={pickCompanyCode}
        />):null}
         
         </>
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
      name: "Finance Approver",
      fieldName: "FinanceApprover",
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
      key: "column3",
      name: "Cost Center Type",
      fieldName: "CostCenterType",
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
      name: "Description",
      fieldName: "Details",
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
      key: "column5",
      name: "Company Code",
      fieldName: "CompanyCode",
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
    }
  ];

  return (
    <div>
      <Modal
        isOpen={isCostCenterOpen}
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
            <h2 style={{ color: "#fff" }}>  All Cost Center </h2>
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
              onClick={showCostCenter}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15, width: 900 }}>
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



