import { DefaultPalette, Stack } from "@fluentui/react";
import * as React from "react";
import ComponentHeader from "./ComponentHeader";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Icon } from "@fluentui/react/lib/Icon";
import { useDispatch } from "react-redux";
import { updateFinalPage } from "../../../../../../features/reducers/lineitemSlice";
import { GlobalStore } from "../../../../../../app/globalStore";
interface IGalaryProps {
  title: string;
}
const GalaryBox: React.FunctionComponent<IGalaryProps> = (props) => {
  const { title } = props;
  const dispatch = useDispatch();
  const setUpApiFun = () => {
    GlobalStore.changeviewmodeOn(false);
    dispatch(updateFinalPage("prsubmit"));
  };
  return (
    <div>
      <Stack>
        <ComponentHeader title={title} />

        <div>
          <p>
            Create a new purchase<br></br> requisition in just a few steps
          </p>
        </div>
        <Stack.Item align="end">
          <div>
            <DefaultButton
              style={{
                background: DefaultPalette.green,
                color: DefaultPalette.white,
                borderRadius: 3,
                height: "30px",
              }}
              onClick={setUpApiFun}
            >
              {/* <span className="collapsible">Start your PR</span> */}
              <Stack horizontal>
                <span style={{ marginRight: 3 }}>
                  {<Icon iconName="Add" />}
                </span>
                <span>Start your PR</span>
              </Stack>
            </DefaultButton>
          </div>
        </Stack.Item>
      </Stack>
    </div>
  );
};

export default GalaryBox;
