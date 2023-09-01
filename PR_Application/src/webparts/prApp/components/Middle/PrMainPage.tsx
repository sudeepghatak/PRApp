import * as React from "react";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { MainPage } from "./MainPage";
import { WebPartContext } from "@microsoft/sp-webpart-base";

const PrMainPage = () => {
  return (
    <>
      <Provider store={store}>
        <MainPage  />
      </Provider>
    </>
  );
};

export default PrMainPage;
