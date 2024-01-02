import * as React from "react";
import styles from "./PrApp.module.scss";
import type { IPrAppProps } from "./IPrAppProps";
//import PrMainPage from "./Middle/PrMainPage";
import * as pnp from "sp-pnp-js";
import { GlobalStore } from "../../../app/globalStore";
import PrMainPage from "./Middle/PrMainPage";
import { RequestAndApprovalComponent } from "./Middle/ReviewPage/RequestAndApprovalComponent";


export default class PrApp extends React.Component<IPrAppProps, {}> {
  public async getEmail(siteURL: string) {
    const web = new pnp.Web(siteURL);
    const useDetails = await web.currentUser.get();
    GlobalStore.storeEmail(useDetails.Email, true);
    GlobalStore.storeName(useDetails.Title, true);
    console.log(useDetails.Email);
    console.log(useDetails.Title);
    console.log(useDetails.Id);
    console.log("HHHHHHHHHHHHHHH");
  }
  public render(): React.ReactElement<IPrAppProps> {
    const { hasTeamsContext, siteUrl } = this.props;
    let connectPrId:string, approvalId:string, isModalOpen:boolean=true
 
    const showModal = () => {
      isModalOpen = !isModalOpen;
    };
    this.getEmail(siteUrl);
    const queryString = window.location.search;

    // Parse the query string using URLSearchParams
    const params = new URLSearchParams(queryString);

    // Get the value of a specific parameter
    const queryStrPRId = params.get('PRId');
    const queryStrApprId = params.get('ApprId');
    if (queryStrPRId !== null) {
      // Call function when the parameter has a value
      connectPrId = queryStrPRId;
    } else {
      // Call function when the parameter is null
       connectPrId = "-1";
    }
    if (queryStrApprId !== null) {
      // Call function when the parameter has a value
      approvalId = queryStrApprId;
    } else {
      // Call function when the parameter is null
      approvalId ="-1";
    }

    // Log the parameter value to the console
    console.log('Query String PRId:', connectPrId);
    console.log('Query String ApprovalId:', approvalId);

    return (
      <section
        className={`${styles.prApp} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.welcome}>
          <PrMainPage/>
          {(approvalId !== "-1" || connectPrId !== "-1") &&<RequestAndApprovalComponent isModalOpen={isModalOpen} showModal={showModal} ApprovalId={approvalId} PrId={connectPrId}/> }
        </div>
        
      </section>
    );
  }
}
