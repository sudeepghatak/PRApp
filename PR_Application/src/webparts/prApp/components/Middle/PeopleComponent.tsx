
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/controls/peoplepicker";
import * as React from "react";

interface IPPeopleComponent {
  context: WebPartContext;
}

const PeopleComponent: React.FunctionComponent<IPPeopleComponent> = (props) => {
  const { context } = props;
  const getPeoplePickerItems = (items: any[]) => {
    console.log(items);
  };
  return (
    <>
      <PeoplePicker
        context={context as any}
        // titleText="People Picker"
        personSelectionLimit={1}
        showtooltip={true}
        required={true}
        disabled={false}
        onChange={getPeoplePickerItems}
        showHiddenInUI={false}
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000}
      />
    </>
  );
};

export default PeopleComponent;