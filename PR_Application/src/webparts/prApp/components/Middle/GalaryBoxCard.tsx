import { ThunkDispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { useDispatch } from "react-redux";
import { fetchStatusContent } from "../../../../features/reducers/statusSlice";
import { StatusModel } from "./Galary/ModelContent/StatusModel";
import { ISearchResult } from "../../../../features/reducers/searchSlice";
import { IconButton } from "@fluentui/react/lib/Button";
import { GlobalStore } from "../../../../app/globalStore";
import { updateFinalPage } from "../../../../features/reducers/lineitemSlice";

interface IGBoxCard {
  cardItem: ISearchResult;
}
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
    GlobalStore.storeconnectPRID(pId);
    GlobalStore.changeviewmodeOn(false)
    //
    dispatch(updateFinalPage(`edit${pId}`));
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
            <span>
              <IconButton
                iconProps={{ iconName: "Edit" }}
                title="Edit"
                ariaLabel="Edit"
                onClick={() => galaryEdit(cardItem.ConnectPRID)}
              />
            </span>
            <span>
              <IconButton
                iconProps={{ iconName: "Delete" }}
                title="Delete"
                ariaLabel="Delete"
                // onClick={() => copyRow(rowIndex)}
              />
            </span>
            <span>
              <IconButton
                iconProps={{ iconName: "Copy" }}
                title="Copy"
                ariaLabel="Copy"
                // onClick={() => copyRow(rowIndex)}
              />
            </span>
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

          <a href="#" className="galary-button">
            {cardItem.Status}
          </a>
        </div>
      </div>
    </>
  );
};

export default GalaryBoxCard;
