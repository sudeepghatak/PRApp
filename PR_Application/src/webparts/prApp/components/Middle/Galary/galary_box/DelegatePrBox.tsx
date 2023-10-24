import * as React from "react";
import ComponentHeader from "./ComponentHeader";
import { DelegateModel } from "../ModelContent/DelegateModel";

const DelegatePrBox = () => {
  const [showDialogdelegate, setshowDialogdelegate] =
    React.useState<boolean>(false);

  const showAlertDialogDelegate = () => {
    setshowDialogdelegate(!showDialogdelegate);
  };
  return (
    <>
      <div id="delegate-box">
        <ComponentHeader title="Delegate PR Approval Tasks" />

        <a
          href="#"
          className="getStartanchor"
          onClick={() => showAlertDialogDelegate()}
        >
          Delegate My Task
        </a>
        {showDialogdelegate ? (
          <DelegateModel
            isModalOpen={showDialogdelegate}
            showModal={showAlertDialogDelegate}
            backgroundcolor="#1E3A2E"
            title="Delegate My Task"
          />
        ) : null}
      </div>
    </>
  );
};

export default DelegatePrBox;
