import * as React from "react";
import { Spinner, SpinnerSize, mergeStyleSets } from "@fluentui/react";
import { Modal } from "@fluentui/react/lib/Modal";
import { useState } from "react";

const LoadingBox = () => {
  const [isModalOpen, setisModalOpen] = useState(true);
  const hideModal = () => {
    setisModalOpen(!isModalOpen);
  };
  return (
    <>
      <div>
        <Modal
          isOpen={isModalOpen}
          onDismiss={hideModal}
          isModeless={true}
          containerClassName={contentStyles.container}
        >
          <div>
            <Spinner
              style={{ paddingTop: 10 }}
              size={SpinnerSize.large}
              label="please wait..."
            />
          </div>
        </Modal>
      </div>
    </>
  );
};
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    minWidth: 40,
    width: 100,
    minHeight: 20,
    height: 80,
    textAlign: "center",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
});
export default LoadingBox;
