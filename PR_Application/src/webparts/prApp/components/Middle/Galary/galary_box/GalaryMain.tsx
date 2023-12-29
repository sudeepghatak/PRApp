import * as React from "react";
import { Stack, IStackTokens } from "@fluentui/react";
import GotAnswer from "./GotAnswer";
import GalaryBox from "./GalaryBox";
import GettingStartedBox from "./GettingStartedBox";
import PoliciesProceduresBox from "./PoliciesProceduresBox";
import LegalDocumentBox from "./LegalDocumentBox";
import DelegatePrBox from "./DelegatePrBox";
//import PendingApproval from "./PendingApproval";
import { PendingApprovals } from "../../ReviewPage/PendingApprovals";

const stackTokens: IStackTokens = {
  childrenGap: 5,
};

export const GalaryMain: React.FunctionComponent = () => {
  return (
    <>
      {/* <div 
      // id="main-row"
      > */}
      {/* <div className="main-first-row">
          <GalaryDashboard />
        </div> */}

      {/* <div 
        className="main-second-row"
        > */}
      <div className="d-row">
        <div className="d-col3">
          <Stack tokens={stackTokens}>
            <Stack.Item className="child-stack">
              <GalaryBox title={"Create a Purchase Requistion"} />
            </Stack.Item>
            <Stack.Item className="child-stack">
              <DelegatePrBox/>
              {/* <GalaryBox title={"Create a Purchase Requistion"} /> */}
            </Stack.Item>
            <Stack.Item className="child-stack">
              <PendingApprovals/>
              {/* <GalaryBox title={"Create a Purchase Requistion"} /> */}
            </Stack.Item>
          </Stack>
        </div>

        <div className="d-col3">
          <Stack tokens={stackTokens}>
            <Stack.Item className="child-stack">
              <GettingStartedBox title="Getting Started" />
            </Stack.Item>
            <Stack.Item className="child-stack">
              <PoliciesProceduresBox title="Policies & Procedures" />
            </Stack.Item>
            <Stack.Item className="child-stack">
              <LegalDocumentBox />
            </Stack.Item>
          </Stack>
        </div>

        <div className="d-col4">
          <GotAnswer />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
