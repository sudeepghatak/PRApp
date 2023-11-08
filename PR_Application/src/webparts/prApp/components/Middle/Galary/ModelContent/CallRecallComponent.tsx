import * as React from "react";
import {
  IIconProps,
  getTheme,
  IconButton,
  Spinner,
  SpinnerSize,
  mergeStyleSets,
  FontWeights,
  DefaultButton,
  DefaultPalette,
} from "@fluentui/react";
import { Modal } from "@fluentui/react/lib/Modal";
import { useState } from "react";
// import "./Accrodian.css";
import { Functionality } from "../../../../Utils/Functionality";
import { fetchSearchContent } from "../../../../../../features/reducers/searchSlice";
import { savePkid } from "../../../../../../features/reducers/vendorandshippingSlice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { updateFinalPage } from "../../../../../../features/reducers/lineitemSlice";
import { GlobalStore } from "../../../../../../app/globalStore";
import { RecallComponentModel } from "./RecallComponentModel";
interface ICallRecallComponent {
  isModalOpen: boolean;
  hideModal: () => void;
  ConnectprId: string;
}
const CallRecallComponent: React.FunctionComponent<ICallRecallComponent> = (
  props
) => {
  const { isModalOpen, hideModal, ConnectprId } = props;

  const [openNewRecall, setopenNewRecall] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const ConfirmRecall = () => {
    setopenNewRecall(!openNewRecall);
  };

  console.log("-------------Copy --- ");
  const cancelIcon: IIconProps = { iconName: "Cancel" };
  return (
    <>
      <div>
        <Modal
          isOpen={isModalOpen}
          onDismiss={hideModal}
          // isModeless={true}
          isBlocking={false}
          containerClassName={contentStyles.container}
        >
          <>
            <div style={{ paddingLeft: 5 }}>
              <div className="copy-head">
                <div style={{ paddingTop: 10 }}>
                  <span>
                    <b>Confirm!</b>
                  </span>
                </div>
                <div>
                  <IconButton iconProps={cancelIcon} onClick={hideModal} />
                </div>
              </div>
              <div
                style={{
                  fontSize: 15,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p>Are you sure to recall the approval process?</p>
              </div>
              <div className="copy-btn">
                <div style={{ padding: "2px", fontWeight: 200 }}>
                  <DefaultButton
                    style={{
                      background: "#C0293B",
                      color: DefaultPalette.white,
                      height: "20px",
                    }}
                    onClick={() => ConfirmRecall()}
                  >
                    Confirm
                  </DefaultButton>
                </div>
                <div style={{ padding: "2px" }}>
                  <DefaultButton
                    style={{
                      height: "20px",
                      background: "#DDDDDD",
                      color: DefaultPalette.black,
                    }}
                    onClick={() => hideModal()}
                  >
                    Cancel
                  </DefaultButton>
                </div>
              </div>
            </div>
            {openNewRecall ? (
              <>
                <RecallComponentModel
                  isModalOpen={openNewRecall}
                  showModal={ConfirmRecall}
                  backgroundcolor="black"
                  title={"Reason for Recall"}
                  ConnectprId={ConnectprId}
                />
              </>
            ) : null}
          </>
        </Modal>
      </div>
    </>
  );
};

const contentStyles = mergeStyleSets({
  container: {
    minWidth: 300,
    width: 300,
    minHeight: 150,
    height: 150,
    // textAlign: "center",
    // flexFlow: "column nowrap",
    // alignItems: "stretch",
  },
});

export default CallRecallComponent;
