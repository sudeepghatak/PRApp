import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { MainPage } from "./MainPage";
import { GalaryMain } from "./Galary/galary_box/GalaryMain";
import "./MainPage.css";
import GalaryDashboard from "./GalaryDashboard";
const SetupMainPage: React.FunctionComponent = () => {
  const lineintemData = useSelector((state: RootState) => state.lineiteminfo);
  console.log("Call Here For Update ----- 10 -- SetupMainPage");
  return (
    <>
      <div id="main-row">
        <div className="main-first-row">
          <GalaryDashboard />
        </div>
        <div className="main-second-row">
          {lineintemData.Finalpage === "" ? (
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
