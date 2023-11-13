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
interface ICopyComponentModel {
  isModalOpen: boolean;
  hideModal: () => void;
  ConnectprId: string;
}
const CopyComponentModel: React.FunctionComponent<ICopyComponentModel> = (
  props
) => {
  const { isModalOpen, hideModal, ConnectprId } = props;

  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const ConfirmCopy = () => {
    setisLoading(true);
    Functionality.copynewConnetPrId(ConnectprId).then((newConnectprId) => {
      dispatch(fetchSearchContent("MyOrder"));
      dispatch(savePkid(newConnectprId));

      dispatch(updateFinalPage(`edit${newConnectprId}`));
      GlobalStore.storePrId(newConnectprId);
      // GlobalStore.storeconnectPRID(ConnectprId);
      hideModal();
    });
    //condition
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
          {!isLoading ? (
            <>
              <div style={{ paddingLeft: 5 }}>
                <div className="copy-head">
                  <div style={{ paddingTop: 10 }}>
                    <span style={{ fontSize: "x-large" }}>
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
                  <p>Are you sure to copy this request?</p>
                </div>
                <div className="copy-btn">
                  <div style={{ padding: "2px", fontWeight: 200 }}>
                    <DefaultButton
                      style={{
                        background: "#C0293B",
                        color: DefaultPalette.white,
                        height: "35px",
                        borderRadius: "5px",
                      }}
                      onClick={() => ConfirmCopy()}
                    >
                      Confirm
                    </DefaultButton>
                  </div>
                  <div style={{ padding: "2px" }}>
                    <DefaultButton
                      style={{
                        height: "35px",
                        borderRadius: "5px",
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
            </>
          ) : (
            <Spinner
              style={{
                paddingTop: "50px",
              }}
              size={SpinnerSize.large}
              label="please wait..."
            />
          )}
        </Modal>
      </div>
    </>
  );
};
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    minWidth: 400,
    width: 400,
    minHeight: 150,
    height: 150,
    // textAlign: "center",
    // flexFlow: "column nowrap",
    // alignItems: "stretch",
  },
});

export default CopyComponentModel;
