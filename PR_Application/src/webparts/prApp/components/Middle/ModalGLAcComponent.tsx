import * as React from "react";
import { Modal, IIconProps, Stack } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";

interface IModalProps {
  isGLModalOpen: boolean;
  showGLModal: () => void;
  backgroundcolor?: string;
  title?: string;
  content?: string;
}
export const ModalComponent: React.FunctionComponent<IModalProps> = (props) => {
  const { isGLModalOpen, showGLModal, backgroundcolor, title } = props;
  const background_color = backgroundcolor as string;
  const modal_title = title as string;
  return (
    <div style={{ maxWidth: 400 , maxHeight: 120}}>
      <Modal isOpen={isGLModalOpen} onDismiss={showGLModal} isBlocking={false}>
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
               marginTop: 5,
               marginBottom: 5,
               marginLeft: 990,
               backgroundColor: "whitesmoke",
               maxHeight: 30
            }}
          >
            <IconButton
              style={{ color: "red" }}
              iconProps={cancelIcon}
              onClick={showGLModal}
            />
          </span>
        </Stack>
       
      </Modal>
    </div>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };