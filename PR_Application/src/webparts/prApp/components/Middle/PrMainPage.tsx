import * as React from "react";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { MainPage } from "./MainPage";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { GettingStarted } from "./GettingStarted";
import { LandingScreen } from "./LandingScreen";
import { Test } from "./test";
import PrimaryInfoComponent from "./PrimaryInfoComponent";
import { CreatePR } from "./CreatePR";

const PrMainPage = () => {
  return (
    <>
      <Provider store={store}>
        <LandingScreen  />
      </Provider>
    </>
  );
};

export default PrMainPage;
