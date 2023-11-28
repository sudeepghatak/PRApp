import BoxAccrodion from "../galary_box/BoxAccrodian";
// import BasicInformationContent from "../galary_box/got_answer_content/BasicInformationContent";
import SupplierInformationContent from "../galary_box/got_answer_content/SupplierInformationContent";
import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack, mergeStyleSets } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { RootState } from "../../../../../../app/store";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";

// import { ThunkDispatch } from "@reduxjs/toolkit";
// import AttatchmentContent from "../galary_box/got_answer_content/AttatchmentContent";
// import { useState } from "react";
import ApprovalTaskHistory from "../galary_box/got_answer_content/ApprovalTaskHistory";
import ApprovalFlow from "../galary_box/got_answer_content/ApprovalFlow";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
  connectprID: string;
}
export const AuditTrailComponent: React.FunctionComponent<IModalProps> = (
  props
) => {
  const {
    isModalOpen,
    showModal,
    backgroundcolor,
    title,

    // connectprID
  } = props;
  const auditInfo = useSelector((state: RootState) => state.auditreducer);
  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  // const [showDialogview, setshowDialogview] = React.useState<boolean>(false);

  // const showAlertDialogView = () => {
  //   setshowDialogview(!showDialogview);
  // };

  const background_color = backgroundcolor as string;
  const modal_title = title as string;
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
              style={{ color: "red" }}
              iconProps={cancelIcon}
              onClick={showModal}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          <div>
            {!auditInfo.isLoading ? (
              <>
                <div className="status-model">
                  <BoxAccrodion
                    buttonName={
                      "Purchase Request Approval Task Process History"
                    }
                    collapseContent={ApprovalTaskHistory}
                  />
                  <BoxAccrodion
                    buttonName={"Purchase Request Approval Process Flow"}
                    collapseContent={ApprovalFlow}
                  />
                  <BoxAccrodion
                    buttonName={"Purchase Request SAP Transaction History"}
                    collapseContent={SupplierInformationContent}
                  />
                </div>
              </>
            ) : (
              <div>
                <Spinner label="Please wait .." />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    minWidth: 800,
    width: 800,
    minHeight: 400,
    height: 500,
    textAlign: "center",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
});
const cancelIcon: IIconProps = { iconName: "Cancel" };
