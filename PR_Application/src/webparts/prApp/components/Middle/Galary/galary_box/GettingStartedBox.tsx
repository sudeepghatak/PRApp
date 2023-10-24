import { Stack } from "@fluentui/react";
import * as React from "react";
import ComponentHeader from "./ComponentHeader";
import { GeneralInformationModel } from "../ModelContent/GeneralInformationModel";
import { ContactInfoModel } from "../ModelContent/ContactInfoModel";

interface IGettingStartedProps {
  title: string;
}

const GettingStartedBox: React.FunctionComponent<IGettingStartedProps> = (
  props
) => {
  const { title } = props;

  const [showDialoggi, setshowDialoggi] = React.useState<boolean>(false);

  const showAlertDialogGI = () => {
    setshowDialoggi(!showDialoggi);
  };

  const [showDialogci, setshowDialogci] = React.useState<boolean>(false);

  const showAlertDialogCI = () => {
    setshowDialogci(!showDialogci);
  };

  return (
    <div>
      <Stack>
        <ComponentHeader title={title} />
        <div className="boxaccrodian">
          <ul className="started_box">
            <li>
              <a
                href="#"
                onClick={() => showAlertDialogGI()}
                className="getStartanchor"
              >
                General Information
              </a>
              {showDialoggi ? (
                <GeneralInformationModel
                  isModalOpen={showDialoggi}
                  showModal={showAlertDialogGI}
                  backgroundcolor="#1E3A2E"
                  title="General Information"
                />
              ) : null}
            </li>
            <li>
              <a
                href="#"
                onClick={() => showAlertDialogCI()}
                className="getStartanchor"
              >
                Contact Info
              </a>

              {showDialogci ? (
                <ContactInfoModel
                  isModalOpen={showDialogci}
                  showModal={showAlertDialogCI}
                  backgroundcolor="#1E3A2E"
                  title="Contact Info"
                />
              ) : null}
            </li>
            <li>
              <a href="#" className="getStartanchor">
                Locate your Financial Analyst
              </a>
            </li>
            <li>
              <a href="#" className="getStartanchor">
                View PR Approval Levels
              </a>
            </li>
            <li>
              <a
                href="https://omnicell.sharepoint.com/:w:/r/sites/ITProjects/_layouts/15/Doc.aspx?sourcedoc=%7B4F7A5458-4542-404B-8584-6BB9420EC3EC%7D&file=Connect%20PR-%20User%20Training-Create-change.docx&action=default&mobileredirect=true"
                target="_blank"
                className="getStartanchor"
              >
                Create a PR
              </a>
            </li>
            <li>
              <a
                href="https://omnicell.sharepoint.com/:w:/r/sites/ITProjects/_layouts/15/Doc.aspx?sourcedoc=%7B1A7B9032-F35F-4BCD-A224-E20948955F28%7D&file=Connect%20PR%20Approval_and%20cost%20center%20Training.docx&action=default&mobileredirect=true"
                target="_blank"
                className="getStartanchor"
              >
                Approve a PR
              </a>
            </li>
          </ul>
        </div>
      </Stack>
    </div>
  );
};

export default GettingStartedBox;
