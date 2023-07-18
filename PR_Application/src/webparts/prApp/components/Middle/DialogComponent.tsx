import * as React from "react";
import { Dialog } from "@fluentui/react/lib/Dialog";

const modalPropsStyles = { main: { maxWidth: 20 } };
const dialogContentProps = {
  // type: DialogType.close,
  title: "Purchase Requestg Error  ",
  subText: "Sorry, Shohini Chatterjee ",
};
interface IDialogBlock {
  hideDialog: boolean;
  toggleHideDialog: () => void;
}
export const DialogComponent: React.FunctionComponent<IDialogBlock> = (
  props
) => {
  const { hideDialog, toggleHideDialog } = props;
  console.log(
    "I want to Add Something Here For Doing This Type Of Work Here Noq"
  );
  console.log(hideDialog);
  return (
    <>
      <Dialog
        hidden={!hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        styles={modalPropsStyles}
      ></Dialog>
    </>
  );
};
