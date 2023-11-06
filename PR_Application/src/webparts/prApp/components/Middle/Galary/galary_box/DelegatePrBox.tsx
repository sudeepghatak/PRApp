import * as React from "react";
import ComponentHeader from "./ComponentHeader";
import { DelegateModel } from "../ModelContent/DelegateModel";
import { Icon } from "@fluentui/react/lib/Icon";

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
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "40px",
              color: "blue",
              paddingTop: "5px",
              paddingBottom: "3px",
            }}
          >
            <Icon iconName="Switch" />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="#"
              className="getStartanchor"
              onClick={() => showAlertDialogDelegate()}
            >
              Delegate My Task
            </a>
          </div>
        </div>

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
