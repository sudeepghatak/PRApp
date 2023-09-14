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
import { TableCostCenterMapping } from "./TableCostCenterMapping";
import { Link } from "@fluentui/react";

const PrMainPage = () => {

  const [openCipNumberModal, setopenCipNumberModal] = React.useState<boolean>(false);
  const showCipNumberModal = () => {

    setopenCipNumberModal(!openCipNumberModal);

  };
  return (
    
      // <div>
      //                      <Link onClick={() => showCipNumberModal()}>
      //                    View All CIP Numbers
      //                 </Link>
      //                 {openCipNumberModal ? (
      //                   <>
      //                     <TableCostCenterMapping
      //                       isModalOpen={openCipNumberModal}
      //                       showModal={showCipNumberModal}
      //                       companyCode={"selectedItems.companyCode.text"}
      //                     />
      //                </>
      //                 ) : null}
      //                </div>
      <LandingScreen/>
   
  );
};

export default PrMainPage;
