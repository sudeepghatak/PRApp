import { ThunkDispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { useDispatch } from "react-redux";
import { fetchStatusContent } from "../../../../features/reducers/statusSlice";
import { StatusModel } from "./Galary/ModelContent/StatusModel";
import { ISearchResult } from "../../../../features/reducers/searchSlice";
import { IconButton } from "@fluentui/react/lib/Button";
import { GlobalStore } from "../../../../app/globalStore";
import { updateFinalPage } from "../../../../features/reducers/lineitemSlice";
import CopyComponentModel from "./Galary/ModelContent/CopyComponentModel";
import { useState } from "react";
import DeleteComponentModel from "./Galary/ModelContent/DeleteComponentModel";
interface IGBoxCard {
  cardItem: ISearchResult;
}
const statusDoc = {
  Draft: {
    backgroundColor: "#E46a53",
    color: "#fff",
    isShow: true,
  },
  "In SAP": {
    backgroundColor: "#F9cd31",
    color: "#000",
    isShow: false,
  },
  "Approval Routing": {
    backgroundColor: "#3080e3",
    color: "#fff",
    isShow: false,
  },
};
const GalaryBoxCard: React.FunctionComponent<IGBoxCard> = (props) => {
  const { cardItem } = props;
  // console.log(
  //   "i am Here of CardItem In GalaryBoxCard",
  //   cardItem,
  //   cardItem.ConnectPRID
  // );
  const [showDialogstatus, setshowDialogstatus] =
    React.useState<boolean>(false);

  const showAlertDialogStatus = () => {
    setshowDialogstatus(!showDialogstatus);
  };

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const fetchIdInfo = (pId: string) => {
    showAlertDialogStatus();
    dispatch(fetchStatusContent(pId));
  };
  const galaryEdit = (pId: string) => {
    GlobalStore.storePrId(pId);
    GlobalStore.changeEnterMainpage(true);
    GlobalStore.changeviewmodeOn(false);
    //
    dispatch(updateFinalPage(`edit${pId}`));
  };
  const [isModalOpencopy, setisModalOpencopy] = useState(false);
  const hideModal = () => {
    setisModalOpencopy(!isModalOpencopy);
  };
  const copyConnectprId = () => {
    GlobalStore.changeEnterMainpage(true);
    setisModalOpencopy(true);
  };
  const [isModalOpendelete, setisModalOpendelete] = useState(false);
  const deletehideModal = () => {
    setisModalOpendelete(!isModalOpendelete);
  };

  const deleteConnectprId = () => {
    setisModalOpendelete(true);
  };

  return (
    <>
      <div id="main-galary-box">
        <div className="box-card">
          <div>
            <a href="#" onClick={() => fetchIdInfo(cardItem.ConnectPRID)}>
              {cardItem.ConnectPRID}
            </a>
            {showDialogstatus ? (
              <StatusModel
                isModalOpen={showDialogstatus}
                showModal={showAlertDialogStatus}
                backgroundcolor="#1E3A2E"
                title={`[${cardItem.ConnectPRID}] Request Details (Status - ${cardItem.Status})`}
                connectprID={`${cardItem.ConnectPRID}`}
              />
            ) : null}
            {statusDoc[cardItem.Status] !== undefined &&
            statusDoc[cardItem.Status].isShow ? (
              <span>
                <IconButton
                  iconProps={{ iconName: "Edit" }}
                  title="Edit"
                  ariaLabel="Edit"
                  onClick={() => galaryEdit(cardItem.ConnectPRID)}
                />
              </span>
            ) : null}
            {statusDoc[cardItem.Status] !== undefined &&
            statusDoc[cardItem.Status].isShow ? (
              <span>
                <IconButton
                  iconProps={{ iconName: "Delete" }}
                  title="Delete"
                  ariaLabel="Delete"
                  onClick={() => deleteConnectprId()}
                />
                {isModalOpendelete ? (
                  <>
                    <DeleteComponentModel
                      isModalOpen={isModalOpendelete}
                      hideModal={deletehideModal}
                      ConnectprId={cardItem.ConnectPRID}
                    />
                  </>
                ) : null}
              </span>
            ) : null}
            {/* {statusDoc[cardItem.Status] !== undefined &&
            statusDoc[cardItem.Status].isShow ? ( */}
            <span>
              <IconButton
                iconProps={{ iconName: "Copy" }}
                title="Copy"
                ariaLabel="Copy"
                onClick={() => copyConnectprId()}
              />
              {isModalOpencopy ? (
                <>
                  <CopyComponentModel
                    isModalOpen={isModalOpencopy}
                    hideModal={hideModal}
                    ConnectprId={cardItem.ConnectPRID}
                  />
                </>
              ) : null}
            </span>
            {/* ) : null} */}
          </div>
          <span>Date: {cardItem.date}</span>
        </div>
        <br></br>

        <div className="box-card">
          <div id="sup_name_ammount">
            <div>{cardItem.supplierName}</div>
            <span>
              <span>Amount in (USD)</span>
              <br></br>
              <span>${cardItem.ammount}</span>
            </span>
          </div>
          <div>
            <a
              href="#"
              className="galary-button"
              style={{
                backgroundColor:
                  statusDoc[cardItem.Status] !== undefined
                    ? statusDoc[cardItem.Status].backgroundColor
                    : "",
                color:
                  statusDoc[cardItem.Status] !== undefined
                    ? statusDoc[cardItem.Status].color
                    : "",
              }}
            >
              {cardItem.Status}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalaryBoxCard;
