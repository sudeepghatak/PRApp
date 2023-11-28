import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { MainPage } from "./MainPage";
import { GalaryMain } from "./Galary/galary_box/GalaryMain";
import "./MainPage.css";
import GalaryDashboard from "./GalaryDashboard";
import { GlobalStore } from "../../../../app/globalStore";

const SetupMainPage: React.FunctionComponent = () => {
  const lineintemData = useSelector((state: RootState) => state.lineiteminfo);



  return (
    <>
      <div id="main-row">
        <div className="main-first-row">
          <GalaryDashboard />
        </div>
        <div className="main-second-row">
          {lineintemData.Finalpage === "" ||
          (lineintemData.Finalpage.includes("view") &&
            !GlobalStore.getEnterMainpage()) ? (
            <GalaryMain />
          ) : (
            <div id="main-page">
              <MainPage isViewMode={false} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SetupMainPage;
