import { Stack } from "@fluentui/react";
import * as React from "react";
import ComponentHeader from "./ComponentHeader";

const LegalDocumentBox: React.FunctionComponent = () => {
  return (
    <div>
      <Stack>
        <ComponentHeader title={"Legal Documents"} />
        <div>
          <p id="legal-doc">
            For assistance with Omnicell vendor related contracts including
            Non-Disclosure Agreements, SOW's, Supplier Agreements, Amendments,
            Consulting Agreements, please contact the Legal Team at
            <a href="mailto:VendorAgreementRequest@Omnicell.com">
              VendorAgreementRequest@Omnicell.com
            </a>{" "}
            Please note that any Consulting Agreements conducted on Omnicell
            premises regardless of dollar amount require a Consulting and/or
            Services Agreement per HR guidelines.
          </p>
        </div>
      </Stack>
    </div>
  );
};

export default LegalDocumentBox;
