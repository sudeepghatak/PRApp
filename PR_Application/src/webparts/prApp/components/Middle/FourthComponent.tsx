import * as React from 'react'
import { IStackStyles, Stack} from '@fluentui/react/lib/Stack';
import { DefaultButton, Icon, IconButton, Link } from '@fluentui/react';
import { mergeStyles,DefaultPalette} from '@fluentui/react/lib/Styling';
import './StyleFourthComponent.css';
import { FuncApprovalLog } from '../../Utils/FuncApprovalLog';
import { GlobalStore } from '../../../../app/globalStore';
import { RootState } from '../../../../app/store';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Type_of_buy } from './ReviewPage/Type_of_buy';
import { SupplierDetails } from './ReviewPage/SupplierDetails';
import { updateFinalPage } from "../../../../features/reducers/lineitemSlice";
import PrimaryInfoComponent from './PrimaryInfoComponent';
import { ITableBuildProps } from './MainPage';
import { ISearchResult, fetchSearchContent } from '../../../../features/reducers/searchSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { restApiCall } from '../../Api/ApiCall';
import { useEffect, useState } from 'react';
import { fetchStatusContent } from '../../../../features/reducers/statusSlice';


interface IFourthprops {
  buttonContxtBack: () => void;
  isViewMode:boolean;
}


const FourthComponent: React.FunctionComponent<IFourthprops> = (props) => {
 

  const basicInfo = useSelector(
    (state: RootState) => state.statusreducer.basicInfo
  );

  const {buttonContxtBack,isViewMode} = props;
    const stackItemStyles = mergeStyles({
        alignItems: 'center',
        background: DefaultPalette.black,
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'flex-start',
        blockSize: "20px"

      });

    const BlockSize: IStackStyles = {
    root: {
        blocksize: "12px",
        fontsize: "10px"
    },
  };

    const col2Style: IStackStyles = {
    root: {
      padding: "0px",
      textAlign: "left",
      width: "70%",
      color:'Black',
      fontsize: "10px",
      marginTop: "10px",
      blocksize: "10px"
    },
  };
   const col1Style: IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "left",
      width: "30%",
      fontsize: "10px",
      color:'green',
      blocksize: "10px"
    },
  };
  const col1StyleSingleLine : IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "left",
      fontsize: "10px",
      marginRight:" 0px",
      color:'green',
      width: "18%"
    },
  };
  const[btnDisable,setbtnDisable]=useState(false)

  const SaveandNext= async ()=>{
   let prEmail =
      GlobalStore.getEmail() == undefined || GlobalStore.getEmail() == null
        ? GlobalStore.getmainEmail()
        : GlobalStore.getEmail();
    setbtnDisable(true);
    await FuncApprovalLog.SaveandContinue(GlobalStore.getTotal(),prEmail)
   let saveLineValueDetails = [
      {
        PKID: GlobalStore.getPrId(),
        ConnectPRID: GlobalStore.getPrId(),
        Type_Of_Buy: null,
        PrepaidOrCapitalEquipment: null,
        EHS: null,
        Title: null,
        RequestFor: null,
        Type_Of_Order: null,
        Order_Amount: null,
        CIP_Number: null,
        UFID: null,
        Supplier_Account_Number: null,
        Supplier_Name: null,
        Supplier_Address: null,
        Supplier_City: null,
        Supplier_State:null,
        Supplier_Zip: null,
        Supplier_Country: null,
        Manager: null,
        Manager1: null,
        Manager2: null,
        Manager3: null,
        GL_Account: null,
        Status: "Approval Routing",
        TaskCreatedFor: null,
        ApprovalInstance: null,
        Comments: null,
        Cost_Center: null,
        Location: null,
        IsDeleted: null,
        Special_Instructions: null,
        Shipping_Name: null ,
        Shipping_Street: null,
        Shipping_Postal_Code: null,
        Shipping_Location: null,
        Shipping_Region: null,
        Shipping_Country: null,
        Shipping_ContactPhone: null,
        OldReqId: null,
        SAPPRId: null,
        LastWorkflowRun: null,
        CurrentApprovalStep: null,
        ManagerLevel: null,
        FinalApprovalDate: null,
        IsOtherCC: null,
        IsCFOApproved: null,
        CFO: null,
        AllApprovers: null,
        CreateDate: null,
        LastStatus: null,
        AllManagers: null,
        JLReminderCount: null,
        FIReminderCount: null,
        AesyntPRType: null,
        PONumber: null,
        IsCompleted: null,
        Company: null,
        ProjectNumber: null,
        ActCostCenter: null,
        CompanyCode: null,
        FromCurrency: null,
        ToCurrency: null,
        RequesterCurrency: null,
        ExchangeRate: null,
        ExchangeRateV: null,
        ExchangeRateDate: null,
        ConvertedDollerAmount: null,
        CountryKey: null,
        HRADCompanyCode: null,
        QuickbookPO: null,
        CCDescription: null,
        IsProjectPR: null,
        ProjectDepartment: null,
        ProjectCode: null,
        Created: null,
        CreatedBy: null,
        Modified: null,
        ModifiedBy: null,
        PRNumber: null,
        DWCreateDate: null,
        PRId: GlobalStore.getPrId(),
        OldAllApprovers: null,
        OldAllManagers: null,
        OldCFO: null,
        OldCreatedBy: null,
        OldManager: null,
        OldManager1: null,
        OldManager2: null,
        OldManager3: null,
        OldModifiedBy: null,
        OldRequestFor: null,
        OldTaskCreatedFor: null,
      },
    ];
    await restApiCall.insertVendorDetails(saveLineValueDetails);
     dispatch(fetchSearchContent("MyOrder"));
    setbtnDisable(true);
    dispatch(updateFinalPage(""));
  }
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(()=>{
    if(!isViewMode){
      dispatch(fetchStatusContent(GlobalStore.getPrId()));
    }
  
},[])
  const PrimaryInfo= (pId: string)=>
  {
    // GlobalStore.storePrId(pId);
    // GlobalStore.changeEnterMainpage(true);
    // GlobalStore.changeviewmodeOn(false);
    // dispatch(updateFinalPage(`edit${pId}`));
  }
  


return (
     <div>
        <Stack>
        <Stack tokens={{ childrenGap: 15 }}>
          <Stack tokens={{ childrenGap: 10 }}>
            <Stack horizontal horizontalAlign="space-between">
              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.whiteTranslucent40,
                    color: DefaultPalette.blue,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  onClick={() => buttonContxtBack()}
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Back" />
                    </span>
                    <span>Back</span>
                  </Stack>
                </DefaultButton>
              </span>
              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.green,
                    color: DefaultPalette.white,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  disabled={isViewMode || btnDisable}
                  onClick={() => SaveandNext()}
                  // FuncApprovalLog.delegateApproval(12000,"sunandap@omnicell.com");
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Save" />
                    </span>
                    <span>Submit for Approval</span>
                  </Stack>
                </DefaultButton>
              </span>
           </Stack>
 {/* ..................................................................................          */}
           <Stack>
              <span className={stackItemStyles}> Review - Order Details <Icon iconName="Question"   styles={{
                root: {
                  borderRadius: '50%',
                  backgroundColor: 'gray',
                  padding: '8px',
                  color:"black"
                },
              }}/> 
             </span>              
          </Stack>
          </Stack>
        <Stack>
          
          <div className='button-border-end ss-btn-border'>
          <Stack horizontal horizontalAlign="space-between"  styles={BlockSize} >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <span>
                      <div  className='heading'>Type of Buy 
                      <IconButton 
                        disabled={isViewMode}
                         iconProps={{ iconName: "Edit" }}
                         title="Edit"
                         ariaLabel="Edit"
                         onClick={() => PrimaryInfo(GlobalStore.getPrId())}
                         styles={{
                            root: {
                              borderRadius: '50%',
                              color:"blue",
                              // backgroundColor: "blue",
                              // padding: '8px',
                            },
                      }}/>
                      </div>
                      </span>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item >
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='heading'>
                        <Link href="" underline>
                          View PR Approvals Needed
                       </Link>
                     </div>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
          </Stack>
        </div>
     {/* ..................................................................................          */}
    <Type_of_buy/>
  
  
  {/* --------------------------------------------------------------------------------- */}
      <div className='button-border-end ss-btn-border'>
          <Stack horizontal horizontalAlign="space-between"  styles={BlockSize} >
             <Stack.Item grow={5}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item >
                      <div  className='heading'>Supplier Details</div>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
          </div>
  {/* --------------------------------------------------------------------------------- */}
  
  <SupplierDetails/>
 {/* ----------------------------------------------------------------------- */}
{/* --------------------------------------------------------------------------------- */}  
      </Stack>
    </Stack>
  </Stack>
{/* ................................................................................. */}

      </div>
  )
}

export default FourthComponent;



