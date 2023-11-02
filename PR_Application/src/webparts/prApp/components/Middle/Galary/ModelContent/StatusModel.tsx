import BoxAccrodion from "../galary_box/BoxAccrodian";
import BasicInformationContent from "../galary_box/got_answer_content/BasicInformationContent";
import SupplierInformationContent from "../galary_box/got_answer_content/SupplierInformationContent";
import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack, mergeStyleSets } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../app/store";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { ViewContentModel } from "./ViewContentModel";
import { GlobalStore } from "../../../../../../app/globalStore";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { updateFinalPage } from "../../../../../../features/reducers/lineitemSlice";
import AttatchmentContent from "../galary_box/got_answer_content/AttatchmentContent";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
  connectprID: string;
}
export const StatusModel: React.FunctionComponent<IModalProps> = (props) => {
  const { isModalOpen, showModal, backgroundcolor, title, connectprID } = props;
  const statusInfo = useSelector((state: RootState) => state.statusreducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [showDialogview, setshowDialogview] = React.useState<boolean>(false);

  const showAlertDialogView = () => {
    setshowDialogview(!showDialogview);
  };

  const viewContent = () => {
    GlobalStore.storeconnectPRID(connectprID);
    GlobalStore.changeviewmodeOn(true);
    //
    dispatch(updateFinalPage(`view${connectprID}`));
    showAlertDialogView();
  };
  console.log("-------------------");
  console.log(statusInfo.isLoading);
  console.log(statusInfo.statusTitle);
  console.log("llllllllllllllllllllll");
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
            {!statusInfo.isLoading ? (
              <>
                <div className="status-model">
                  <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "60%", textAlign: "left" }}>
                      <span>{statusInfo.statusTitle}</span>
                    </div>
                    <div style={{ width: "40%", textAlign: "right" }}>
                      <span>
                        <IconButton
                          iconProps={{ iconName: "View" }}
                          title="View"
                          ariaLabel="View"
                          onClick={() => viewContent()}
                          // onClick={() => copyRow(rowIndex)}
                        />
                        {showDialogview ? (
                          <ViewContentModel
                            isModalOpen={showDialogview}
                            showModal={showAlertDialogView}
                            backgroundcolor="#DEDBDE"
                            title={`[${connectprID}] Request Details (Read Only)`}
                          />
                        ) : null}
                      </span>
                      <span>
                        <IconButton
                          iconProps={{ iconName: "Edit" }}
                          title="Edit"
                          ariaLabel="Edit"
                          // onClick={() => copyRow(rowIndex)}
                        />
                      </span>
                      <span>
                        <IconButton
                          iconProps={{ iconName: "Delete" }}
                          title="Delete"
                          ariaLabel="Delete"
                          // onClick={() => copyRow(rowIndex)}
                        />
                      </span>
                      <span>
                        <IconButton
                          iconProps={{ iconName: "Copy" }}
                          title="Copy"
                          ariaLabel="Copy"
                          // onClick={() => copyRow(rowIndex)}
                        />
                      </span>
                    </div>
                  </div>
                  <BoxAccrodion
                    buttonName={"Basic Information"}
                    collapseContent={BasicInformationContent}
                  />
                  <BoxAccrodion
                    buttonName={"Attachments"}
                    collapseContent={AttatchmentContent}
                  />
                  <BoxAccrodion
                    buttonName={"Supplier Information"}
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
