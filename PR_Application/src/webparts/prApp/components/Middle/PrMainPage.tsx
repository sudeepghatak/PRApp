import * as React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../../app/store";
import { MainPage } from "./MainPage";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { setsiteURL } from "../../../../features/reducers/extraSlice";

const PrMainPage = (props) => {
  const {siteURL}=props;
  console.log(siteURL);
//   const dispatch=useDispatch();

//   React.useEffect(()=>{
// dispatch(setsiteURL(siteURL));
//   },[]);
  return (
    <>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </>
  );
};

export default PrMainPage;
