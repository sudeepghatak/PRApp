import * as React from "react";
import { IStackStyles, Stack } from "@fluentui/react/lib/Stack";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { DefaultPalette } from "@fluentui/react/lib/Styling";
import { Icon } from "@fluentui/react/lib/Icon";
import { ITextFieldStyles, TextField } from "@fluentui/react/lib/TextField";
import { useState, useEffect } from "react";

// import styles from "../Style/style.scss";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import { Link } from "@fluentui/react";
interface ISecondprops {
  buttonContxtSave: () => void;
  buttonContxtBack: () => void;
}
const VendorandShippingComponent: React.FunctionComponent<ISecondprops> = (
  props
) => {
  const { buttonContxtSave, buttonContxtBack } = props;
  const [textvalue, settextvalue] = useState({
    suppliername: " ",
    justificationorder: " ",
    downpayment: " ",
  });

  const [newshipAddress, setnewshipAddress] = useState<IDropdownOption>({
    key: " ",
    text: " ",
  });

  const [selectshipAddress, setselectshipAddress] = useState<boolean>(false);
  // const [selectexistAddress, setselectexistAddress] = useState<boolean>(false);
  // const showExistAddressList = () => {
  //   setselectexistAddress(!selectexistAddress);
  // };
  const changeshipDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | undefined,
    index?: number | undefined
  ) => {
    setnewshipAddress(option as IDropdownOption);
  };
  useEffect(() => {
    if (newshipAddress.text === "Other Shipping Location") {
      setselectshipAddress(() => true);
    } else {
      setselectshipAddress(() => false);
    }
  }, [newshipAddress]);
  const textContext = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: Object | undefined
  ) => {
    console.log(textvalue);
    console.log(e.target);
    const id = (e.target as HTMLInputElement).id;
    console.log(id);
    settextvalue((prevValue) => ({
      ...prevValue,
      [id]: newValue || " ",
    }));
    console.log(id);
  };
  //ship Address
  const shipAddress: IDropdownOption[] = [
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "otherlocation", text: "Other Shipping Location" },
  ];

  //region Options ...
  const regionOptions: IDropdownOption[] = [
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "otherlocation", text: "Other Shipping Location" },
  ];

  //Country options...
  const countryOptions: IDropdownOption[] = [
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "otherlocation", text: "Other Shipping Location" },
  ];
  //where are you based....

  const basedOptions: IDropdownOption[] = [
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "otherlocation", text: "Other Shipping Location" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
  };
  const col1Style: IStackStyles = {
    root: {
      padding: "10px",
      textAlign: "right",
      width: "30%",
    },
  };
  const col2Style: IStackStyles = {
    root: {
      padding: "0px",
      textAlign: "left",
      width: "70%",
    },
  };
  const [buttonState, setbuttonState] = useState<boolean>(false);
  const iconButtonClick = () => {
    console.log("hi every one ");
    setbuttonState(!buttonState);
  };
  const textFieldStyles: Partial<ITextFieldStyles> = {
    field: { width: "450px" },
  };
  return (
    <>
      <div>
        <Stack tokens={{ childrenGap: 15 }}>
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
          <Stack tokens={{ childrenGap: 10 }}>
            {/* _______________________________ */}
            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item styles={col1Style}>
                  <div>Supplier Name: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <TextField id="suppliername" onChange={textContext} />
                    <DefaultButton
                      style={{ minWidth: 0 }}
                      onClick={() => console.log("Hello")}
                    >
                      <Icon iconName="Search" style={{ color: "blue" }} />
                    </DefaultButton>
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item
                  styles={col1Style}
                  // style={{ border: "1px solid black" }}
                >
                  <div>Supplier Number: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <TextField id="suppliernumber " onChange={textContext} />
                    {/* (buttonState)? */}
                    {buttonState ? (
                      <DefaultButton
                        style={{ minWidth: 0 }}
                        onClick={iconButtonClick}
                      >
                        <Icon iconName="ChevronUp" style={{ color: "blue" }} />
                      </DefaultButton>
                    ) : (
                      <DefaultButton
                        style={{ minWidth: 0 }}
                        onClick={iconButtonClick}
                      >
                        <Icon
                          iconName="ChevronDown"
                          style={{ color: "blue" }}
                        />
                      </DefaultButton>
                    )}
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>

            {/* ______________________________________________________ */}
            {buttonState ? (
              <>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier Address: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField disabled styles={textFieldStyles} />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier City: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField disabled styles={textFieldStyles} />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier State: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField disabled styles={textFieldStyles} />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier Zip: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField disabled styles={textFieldStyles} />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier Country: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField disabled styles={textFieldStyles} />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </>
            ) : null}
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item
                  styles={col1Style}
                  // style={{ border: "1px solid black" }}
                >
                  <div>Justification/Reason for Order: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <div style={{ width: "450px" }}>
                    <TextField
                      id="justificationorder"
                      onChange={textContext}
                      multiline
                      rows={2}
                    />
                  </div>
                </Stack.Item>
              </Stack>
            </Stack.Item>

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item
                  styles={col1Style}
                  // style={{ border: "1px solid black" }}
                >
                  <div>Add Special Instructions/Down payment details:</div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <div style={{ width: "450px" }}>
                    <TextField
                      id="downpayment"
                      onChange={textContext}
                      multiline
                      rows={2}
                    />
                  </div>
                </Stack.Item>
              </Stack>
            </Stack.Item>
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <Stack.Item grow={12}>
              <Stack horizontal horizontalAlign="baseline">
                <Stack.Item
                  styles={col1Style}
                  // style={{ border: "1px solid black" }}
                >
                  <div>Ship To Address: </div>
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <Dropdown
                      placeholder="Select an option"
                      onChange={changeshipDropdownOption}
                      options={shipAddress}
                      styles={dropdownStyles}
                    />
                    <div>
                      <Link style={{ color: "blue", marginLeft: 10 }}>
                        Select from existing address list
                      </Link>
                    </div>
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>

            {selectshipAddress ? (
              <>
                (
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Name: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          placeholder="Provide Company/Recipient Name.Maximum length"
                          style={{ width: 350 }}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>House Number/Street: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          placeholder="House No."
                          style={{ width: 100 }}
                        />
                        <span style={{ marginTop: 10 }}>/</span>
                        <TextField
                          placeholder="Street Name"
                          style={{ width: 300 }}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Postal Code/City: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          placeholder="Postal Code"
                          style={{ width: 100 }}
                        />
                        <span>/</span>
                        <TextField placeholder="City" style={{ width: 250 }} />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Region: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <Dropdown
                          placeholder="Select an option"
                          // onChange={changeshipDropdownOption}
                          options={regionOptions}
                          styles={dropdownStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Country: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <Dropdown
                          placeholder="Select an option"
                          // onChange={changeshipDropdownOption}
                          options={countryOptions}
                          styles={dropdownStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Where are you based?: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <Dropdown
                          placeholder="Select an option"
                          // onChange={changeshipDropdownOption}
                          options={basedOptions}
                          styles={dropdownStyles}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Contact Name and Phone Number: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          placeholder="Maximum length is 50 characters"
                          style={{ width: 300 }}
                        />
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </>
            ) : null}

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default VendorandShippingComponent;
