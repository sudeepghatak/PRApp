import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
}
export const UploadFileModal: React.FunctionComponent<IModalProps> = (
  props
) => {
  const { isModalOpen, showModal } = props;
  return (
    <div>
      <Modal isOpen={isModalOpen} onDismiss={showModal} isBlocking={false}>
        <Stack horizontal horizontalAlign="space-between">
          <span>
            <h2>Lorem Ipsum</h2>
          </span>
          <span>
            <IconButton iconProps={cancelIcon} onClick={showModal} />
          </span>
        </Stack>
        <div>
          <p>
            Lorem ipsum dolor sit amet, cons amet, vulputate in leo. Maecenas
            vulputa
          </p>
        </div>
      </Modal>
    </div>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };
