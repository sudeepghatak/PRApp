import BoxAccrodion from "../galary_box/BoxAccrodian";
import BasicInformationContent from "../galary_box/got_answer_content/BasicInformationContent";
import SupplierInformationContent from "../galary_box/got_answer_content/SupplierInformationContent";
import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../app/store";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
}
export const StatusModel: React.FunctionComponent<IModalProps> = (props) => {
  const { isModalOpen, showModal, backgroundcolor, title } = props;
  const statusInfo = useSelector((state: RootState) => state.statusreducer);
  console.log("-------------------");
  console.log(statusInfo.isLoading);
  console.log(statusInfo.statusTitle);
  console.log("llllllllllllllllllllll");
  const background_color = backgroundcolor as string;
  const modal_title = title as string;
  return (
    <div style={{ maxWidth: 500 }}>
      <Modal isOpen={isModalOpen} onDismiss={showModal} isBlocking={false}>
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
                  <div>
                    <span>{statusInfo.statusTitle}</span>
                    <span>
                      {" "}
                      <IconButton
                        iconProps={{ iconName: "View" }}
                        title="View"
                        ariaLabel="View"
                        // onClick={() => copyRow(rowIndex)}
                      />
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
                  <BoxAccrodion
                    buttonName={"Basic Information"}
                    collapseContent={BasicInformationContent}
                  />
                  <BoxAccrodion
                    buttonName={"Attachments"}
                    collapseContent={BasicInformationContent}
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

const cancelIcon: IIconProps = { iconName: "Cancel" };
