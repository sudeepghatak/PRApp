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
  const isLoading = useSelector(
    (state: RootState) => state.statusreducer.isLoading
  );
  console.log("-------------------");
  console.log(isLoading);
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
            {!isLoading ? (
              <>
                <div className="status-model">
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
