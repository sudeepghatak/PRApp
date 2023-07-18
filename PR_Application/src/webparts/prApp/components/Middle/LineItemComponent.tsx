import * as React from "react";
import { useContext } from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Icon,
  Stack,
  DefaultButton,
  DefaultPalette,
} from "office-ui-fabric-react";
// import { useState } from "react";
import { findIndex, map } from "lodash";
import TypeOfPurchase from "./TypeOfPurchase";
import LineItemTableFormat from "./TypeOfPurchase_TableFormat";
import { tableBuildContext } from "./MainPage";

// interface ThirdProps {
//   [key: string]: React.FunctionComponent[];
// }
interface IThirdprops {
  buttonContxtSave: () => void;
  buttonContxtBack: () => void;
}
interface IAmountProps {
  id: number;
  amount: number;
}
let listOftotalAmount: IAmountProps[] = [];
const LineItemComponent: React.FunctionComponent<IThirdprops> = (props) => {
  const tableContent = useContext(tableBuildContext);
  const { buttonContxtSave, buttonContxtBack } = props;
  const [selectedItems, setSelectedItems] = React.useState<{
    [key: string]: IDropdownOption;
  }>({
    GlAccount: { key: "", text: "" },
    UOM: { key: "", text: "" },
  });
  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: newSelectedItem,
    }));
    console.log(selectedItems);
  };

  const PrCurrency: IDropdownOption[] = [
    { key: "1", text: "AED" },
    { key: "2", text: "AUD" },
    { key: "2", text: "CAD" },
    { key: "2", text: "CHF" },
    { key: "2", text: "USD" },
  ];

  // const dropdownStyles: Partial<IDropdownStyles> = {
  //     dropdown: { width: 200 },
  //   };
  const dropdownStyles1: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
  };

  const [totalAmount, settotalAmount] = React.useState<number>(0);

  const addTotalAmount = (total: IAmountProps) => {
    const index = findIndex(listOftotalAmount, (item) => item.id === total.id);
    if (index !== -1) {
      // Update the existing object
      listOftotalAmount[index] = total;
    } else {
      // Add the new object to the array
      listOftotalAmount.push(total);
    }
    console.log("iiiiiiiiiiiiiiiii");
    console.log(listOftotalAmount);
    console.log("oooooooooooooooo");
    // let totalValue: number = 0;

    let totalnumber: number = map(listOftotalAmount, "amount").reduce(
      (acc, curr) => acc + curr,
      0
    );

    settotalAmount(totalnumber);
  };
  return (
    <>
      <div>
        <Stack>
          <Stack tokens={{ childrenGap: 10 }}>
            <Stack horizontal horizontalAlign="space-between">
              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.whiteTranslucent40,
                    color: DefaultPalette.blue,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  onClick={() => buttonContxtBack()}
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Back" />
                    </span>
                    <span>Back</span>
                  </Stack>
                </DefaultButton>
              </span>

              <span>
                <DefaultButton
                  style={{
                    background: DefaultPalette.green,
                    color: DefaultPalette.white,
                    borderRadius: 5,
                    height: "40px",
                  }}
                  onClick={() => buttonContxtSave()}
                >
                  <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <Icon iconName="Save" />
                    </span>
                    <span>Save & Continue</span>
                  </Stack>
                </DefaultButton>
              </span>
            </Stack>
          </Stack>
          <Stack>
            <Stack.Item align="start" style={{ display: "flex" }}>
              <span style={{ marginRight: "10px" }}>Select Currency: </span>
              <Dropdown
                placeholder="Select Currency"
                id="prCurrency"
                onChange={changeDropdownOption}
                options={PrCurrency}
                selectedKey={selectedItems["prCurrency"]?.key}
                styles={dropdownStyles1}
              />
            </Stack.Item>

            <Stack.Item align="end" style={{ display: "flex" }}>
              <span style={{ marginRight: "10px" }}>
                Total Order Amount in (USD):{" "}
              </span>
              <span> ($){totalAmount}</span>
            </Stack.Item>
          </Stack>

          <Stack.Item>
            {tableContent ? (
              <>
                {tableContent.map((tableValue: any, index: number) => (
                  <>
                    <TypeOfPurchase text={tableValue.name} index={index} />
                    <LineItemTableFormat
                      id={index}
                      addTotalAmount={addTotalAmount}
                    />
                  </>
                ))}
              </>
            ) : (
              <span></span>
            )}
          </Stack.Item>
        </Stack>
      </div>
    </>
  );
};

export default LineItemComponent;
