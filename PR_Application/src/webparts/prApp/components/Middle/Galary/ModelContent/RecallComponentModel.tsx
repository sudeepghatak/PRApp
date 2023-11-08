import * as React from "react";
// import { useState } from "react";
import {
  Modal,
  IIconProps,
  Stack,
  mergeStyleSets,
  TextField,
} from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { GlobalStore } from "../../../../../../app/globalStore";
import { restApiCall } from "../../../../Api/ApiCall";
import { fetchSearchContent } from "../../../../../../features/reducers/searchSlice";
import { updateFinalPage } from "../../../../../../features/reducers/lineitemSlice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
  ConnectprId: string;
}
export const RecallComponentModel: React.FunctionComponent<IModalProps> = (
  props
) => {
  const { isModalOpen, showModal, backgroundcolor, title, ConnectprId } = props;
  const background_color = backgroundcolor as string;
  const modal_title = title as string;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const RecallSubmit = () => {
    let saveprimayData = [
      {
        PKID: ConnectprId,
        ConnectPRID: ConnectprId,
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
        Supplier_State: null,
        Supplier_Zip: null,
        Supplier_Country: null,
        Manager: null,
        Manager1: null,
        Manager2: null,
        Manager3: null,
        GL_Account: null,
        Status: "Recalled",
        TaskCreatedFor: null,
        ApprovalInstance: null,
        Comments: null,
        Cost_Center: null,
        Location: null,
        IsDeleted: null,
        Special_Instructions: null,
        Shipping_Name: null,
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
        PRId: null,
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
    restApiCall.insertVendorDetails(saveprimayData).then((_) => {
      dispatch(fetchSearchContent("MyOrder"));
      dispatch(updateFinalPage(""));
      showModal();
    });
  };
  return (
    <div style={{ maxWidth: 500 }}>
      <Modal
        isOpen={isModalOpen}
        onDismiss={showModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{
            backgroundColor: `${background_color}`,
            border: "3px solid #fff",
          }}
        >
          <span style={{ marginTop: -5, paddingLeft: 15 }}>
            <h2 style={{ color: "#fff" }}>{modal_title}</h2>
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
              onClick={showModal}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          <div>
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "25%" }}>
                <p>Comment * : </p>
              </div>
              <div style={{ width: "75%" }}>
                <TextField multiline rows={5} />
              </div>
            </div>
            <div style={{ height: "30px" }}></div>
            <hr />
            <div className="delegate-date-id">
              <div>
                <button onClick={() => RecallSubmit()} className="delegate-btn">
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={showModal}
                  className="delegate-btn"
                  style={{ backgroundColor: "#fff", color: "#000" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    minWidth: 450,
    width: 450,
    minHeight: 300,
    height: 300,
    textAlign: "center",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
});

const cancelIcon: IIconProps = { iconName: "Cancel" };
