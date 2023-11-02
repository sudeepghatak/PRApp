import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack, mergeStyleSets } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { MainPage } from "../../MainPage";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
}
export const ViewContentModel: React.FunctionComponent<IModalProps> = (
  props
) => {
  const { isModalOpen, showModal, backgroundcolor, title } = props;
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
              style={{ color: "black" }}
              iconProps={cancelIcon}
              onClick={showModal}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          <MainPage isViewMode={true} />
        </div>
      </Modal>
    </div>
  );
};

const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    minWidth: 900,
    width: 900,
    minHeight: 600,
    height: 600,
    textAlign: "center",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
});

const cancelIcon: IIconProps = { iconName: "Cancel" };