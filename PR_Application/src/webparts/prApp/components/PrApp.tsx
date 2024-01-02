import * as React from "react";
import styles from "./PrApp.module.scss";
import type { IPrAppProps } from "./IPrAppProps";
import * as pnp from "sp-pnp-js";
import { GlobalStore } from "../../../app/globalStore";
import PrMainPage from "./Middle/PrMainPage";
import { RequestAndApprovalComponent } from "./Middle/ReviewPage/RequestAndApprovalComponent";

interface IPrAppState {
  connectPrId: string;
  approvalId: string;
  isModalOpen: boolean;
  userEmail: string; // New state to store user email
}

export default function PrApp(props: IPrAppProps): React.ReactElement<IPrAppProps> {
  const [state, setState] = React.useState<IPrAppState>({
    connectPrId: "-1",
    approvalId: "-1",
    isModalOpen: true,
    userEmail: "", // Initialize userEmail state
  });

  React.useEffect(() => {
    const fetchData = async () => {
      await getEmail(props.siteUrl);

      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);

      const queryStrPRId = params.get('PRId') || "-1";
      const queryStrApprId = params.get('ApprId') || "-1";

      setState((prevState) => ({
        ...prevState,
        connectPrId: queryStrPRId,
        approvalId: queryStrApprId,
        isModalOpen: true,
      }));

      console.log('Query String PRId:', queryStrPRId);
      console.log('Query String ApprovalId:', queryStrApprId);
    };

    fetchData();
  }, [props.siteUrl]);

  const getEmail = async (siteURL: string) => {
    const web = new pnp.Web(siteURL);
    const useDetails = await web.currentUser.get();
    GlobalStore.storeEmail(useDetails.Email, true);
    GlobalStore.storeName(useDetails.Title, true);

    setState((prevState) => ({
      ...prevState,
      userEmail: useDetails.Email, // Update userEmail state
    }));

    console.log(useDetails.Email);
    console.log(useDetails.Title);
    console.log(useDetails.Id);
    console.log("HHHHHHHHHHHHHHH");
  };

  const showModal = () => {
    setState((prevState) => ({ ...prevState, isModalOpen: !prevState.isModalOpen }));
  };

  const { hasTeamsContext } = props;
  const { connectPrId, approvalId, isModalOpen, userEmail } = state;

  return (
    <section className={`${styles.prApp} ${hasTeamsContext ? styles.teams : ""}`}>
      <div className={styles.welcome}>
        <PrMainPage />
        {(approvalId !== "-1" || connectPrId !== "-1") && (
          <RequestAndApprovalComponent
            isModalOpen={isModalOpen}
            showModal={showModal}
            ApprovalId={approvalId}
            PrId={connectPrId}
            userEmail={userEmail} // Pass userEmail as a prop
          />
        )}
      </div>
    </section>
  );
}
