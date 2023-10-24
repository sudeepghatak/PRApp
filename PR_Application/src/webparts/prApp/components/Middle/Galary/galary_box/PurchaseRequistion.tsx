import * as React from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Icon } from "@fluentui/react/lib/Icon";
import { DefaultPalette, Stack } from "@fluentui/react";
const PurchaseRequistion: React.FunctionComponent = () => {
  return (
  
      <div>
        <div>
          <p>
            Create a new purchase<br></br> requisition in just a few steps
          </p>
        </div>
        <Stack.Item align="end">
          <div>
            <span style={{ marginRight: 10, marginTop: 2 }}>
              <Icon iconName="Save" />
            </span>
            <DefaultButton
              style={{
                background: DefaultPalette.green,
                color: DefaultPalette.white,
                borderRadius: 5,
                height: "40px",
              }}
              onClick={() => console.log("Hello")}
            >
              <Stack horizontal>
                <span style={{ marginRight: 10, marginTop: 2 }}>
                  Hiiiiiii
                  {/* <Icon iconName="Save" /> */}
                </span>
                <span>Start your PR</span>
              </Stack>
            </DefaultButton>
          </div>
        </Stack.Item>
      </div>
 
  );
};

export default PurchaseRequistion;
