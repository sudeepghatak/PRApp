import { Stack } from "@fluentui/react";
import * as React from "react";
import ComponentHeader from "./ComponentHeader";
import { CapitalExpenseModel } from "../ModelContent/CapitalExpenseModel";
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
              <a href="#" className="getStartanchor">
                View Existing Vendors
              </a>
            </li>
            <li>
              <a href="#" className="getStartanchor">
                Add Vendor – Indirect Supplier
              </a>
            </li>
            <li>
              <a href="#" className="getStartanchor">
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
                href={
                  "https://omnicell.sharepoint.com/sites/ConnectPRDev/_layouts/15/workbench.aspx/src/webparts/prApp/assets/system.docx"
                }
                download="system.docx"
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
