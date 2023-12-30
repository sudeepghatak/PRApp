import * as React from "react";
import styles from "./PrApp.module.scss";
import type { IPrAppProps } from "./IPrAppProps";
//import PrMainPage from "./Middle/PrMainPage";
import * as pnp from "sp-pnp-js";
import { GlobalStore } from "../../../app/globalStore";
//import PrMainPage from "./Middle/PrMainPage";
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

    this.getEmail(siteUrl);

    return (
      <section
        className={`${styles.prApp} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.welcome}>
          <RequestAndApprovalComponent />
        </div>
      </section>
    );
  }
}
