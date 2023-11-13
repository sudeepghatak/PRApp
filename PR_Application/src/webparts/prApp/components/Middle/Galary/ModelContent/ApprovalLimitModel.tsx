import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack, mergeStyleSets } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import ApprovalLimitComponent from "./ApprovalLimitComponent";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
}
export const ApprovalLimitModel: React.FunctionComponent<IModalProps> = (
  props
) => {
  const { isModalOpen, showModal, backgroundcolor } = props;
  const background_color = backgroundcolor as string;
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
            <h2 style={{ color: "#fff" }}>Job Level Approval Details</h2>
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
          <ApprovalLimitComponent />
        </div>
      </Modal>
    </div>
  );
};
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    minWidth: 500,
    width: 500,
    minHeight: 600,
    height: 600,
  },
});
const cancelIcon: IIconProps = { iconName: "Cancel" };
