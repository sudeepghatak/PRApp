import { ThunkDispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { useDispatch } from "react-redux";
import { fetchStatusContent } from "../../../../features/reducers/statusSlice";
import { StatusModel } from "./Galary/ModelContent/StatusModel";

const GalaryBoxCard: React.FunctionComponent = () => {
  const [showDialogstatus, setshowDialogstatus] =
    React.useState<boolean>(false);

  const showAlertDialogStatus = () => {
    setshowDialogstatus(!showDialogstatus);
  };

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const fetchIdInfo = () => {
    showAlertDialogStatus();
    dispatch(fetchStatusContent());
  };
  return (
    <>
      <div id="main-galary-box">
        <div className="box-card">
          <div>
            <a href="#" onClick={() => fetchIdInfo()}>
              0000027007
            </a>
            {showDialogstatus ? (
              <StatusModel
                isModalOpen={showDialogstatus}
                showModal={showAlertDialogStatus}
                backgroundcolor="#1E3A2E"
                title="General Information"
              />
            ) : null}
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Date: 10/09/2023</span>
        </div>
        <br></br>

        <div className="box-card">
          <span>
            <span>Amount in (USD)</span>
            <br></br>
            <span>$0.00</span>
          </span>
          <a href="#" className="galary-button">
            Draft
          </a>
        </div>
      </div>
    </>
  );
};

export default GalaryBoxCard;
