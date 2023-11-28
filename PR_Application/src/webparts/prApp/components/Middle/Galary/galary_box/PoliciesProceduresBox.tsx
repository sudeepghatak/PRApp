import { Stack } from "@fluentui/react";
import * as React from "react";
import ComponentHeader from "./ComponentHeader";
import { CapitalExpenseModel } from "../ModelContent/CapitalExpenseModel";
import { VendorSupplierModel } from "../ModelContent/VendorSupplierModel";
import { useState } from "react";
import { SupplierModal } from "../../TableSupplierModal";
interface IPoliciesProceduresProps {
  title: string;
}
const PoliciesProceduresBox: React.FunctionComponent<
  IPoliciesProceduresProps
> = (props) => {
  const { title } = props;
  const [showDialogce, setshowDialogce] = React.useState<boolean>(false);

  const showAlertDialogCE = () => {
    setshowDialogce(!showDialogce);
  };

  const [showDialogvendorIndirect, setshowDialogvendorIndirect] =
    React.useState<boolean>(false);

  const showAlertDialogvendorIndirect = () => {
    setshowDialogvendorIndirect(!showDialogvendorIndirect);
  };
  const [showexistingVendor, setshowexistingVendor] = useState<boolean>(false);
  const viewExistingVendor = () => {
    setshowexistingVendor(!showexistingVendor);
  };
  return (
    <div>
      <Stack>
        <ComponentHeader title={title} />
        <div className="boxaccrodian">
          <ul className="started_box">
            <li>
              <a
                href="https://omnicell.sharepoint.com/sites/OmnicellPolicies/PolicyProcedures/Procure%20to%20Pay%20Policy.pdf"
                target="_blank"
                className="getStartanchor"
              >
                Finance Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showAlertDialogCE()}
                className="getStartanchor"
              >
                Capital Expense
              </a>
              {showDialogce ? (
                <CapitalExpenseModel
                  isModalOpen={showDialogce}
                  showModal={showAlertDialogCE}
                  backgroundcolor="#1E3A2E"
                  title="Contact Info"
                />
              ) : null}
            </li>
            <li>
              <a
                href="https://connectdev.omnicell.com/pr/Pages/PageNotFoundError.aspx?requestUrl=https://connectdev.omnicell.com/pr/Documents/Procure-2-Pay.pptx"
                target="_blank"
                className="getStartanchor"
              >
                P2P Q&A
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => viewExistingVendor()}
                className="getStartanchor"
              >
                View Existing Vendors
              </a>
              {showexistingVendor ? (
                <SupplierModal
                  isModalOpen={showexistingVendor}
                  showModal={viewExistingVendor}
                  fromLandingpage={true}
                />
              ) : // <SupplierModal
              //   isModalOpen={showexistingVendor}
              //   showModal={viewExistingVendor}
              // />
              null}
            </li>
            <li>
              <a
                href="#"
                className="getStartanchor"
                onClick={() => showAlertDialogvendorIndirect()}
              >
                Add Vendor – Indirect Supplier
              </a>
              {showDialogvendorIndirect ? (
                <VendorSupplierModel
                  isModalOpen={showDialogvendorIndirect}
                  showModal={showAlertDialogvendorIndirect}
                  title={"Add Vendor - Indirect Supplier"}
                  backgroundcolor="black"
                />
              ) : null}
            </li>
            <li>
              <a
                href="https://omnicell.sharepoint.com/teams/secure/QA2007archive/QSD/Integrated QMS/Quality Documents/QSP-21/QF-21.10.8.docx"
                target="_blank"
                className="getStartanchor"
              >
                Vendor Add – Direct Supplier
              </a>
            </li>
            <li>
              <a
                href="https://connectdev.omnicell.com/pr/SitePages/MasterData.aspx"
                target="_blank"
                className="getStartanchor"
              >
                Manage Master Data for Finance
              </a>
            </li>
            <li>
              <a
                href="https://connectdev.omnicell.com/pr/SiteAssets/SyteLine%20Vendor%20Add%20and%20Change%20Request%20Form%20060817.docx"
                target="_blank"
                className="getStartanchor"
              >
                SyteLine Vendor Add and Change
              </a>
            </li>
          </ul>
        </div>
      </Stack>
    </div>
  );
};

export default PoliciesProceduresBox;
