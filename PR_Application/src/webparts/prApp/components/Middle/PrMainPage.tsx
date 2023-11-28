import * as React from "react";
import { Provider } from "react-redux";
import {store } from "../../../../app/store";
import SetupMainPage from "./SetupMainPage";

const PrMainPage = () => {
  return (
    <>
      <Provider store={store}>
        <SetupMainPage />
      </Provider>
    </>
  );
};

export default PrMainPage;
