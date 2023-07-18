import { IconButton, Stack } from "@fluentui/react";
import * as React from "react";
import { tableDeleteContext } from "./MainPage";
interface TypeofpurchaseName {
  text: string;
  index: number;
}

const TypeOfPurchase: React.FunctionComponent<TypeofpurchaseName> = (props) => {
  const { text, index } = props;
  const tableDelete = React.useContext(tableDeleteContext);
  // const tableContent = React.useContext(tableBuildContext);
  return (
    <div>
      <Stack horizontal horizontalAlign="space-between">
        <span>{text}</span>
        <span>
          <IconButton
            iconProps={{ iconName: "Delete" }}
            title="Delete"
            ariaLabel="Delete"
            onClick={() => tableDelete?.deleteTable(index)}
          />
        </span>
      </Stack>
    </div>
  );
};

export default TypeOfPurchase;
