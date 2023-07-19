import * as React from "react";
import { useState, useEffect } from "react";
import { Stack, IStackTokens, IStackStyles } from "@fluentui/react/lib/Stack";

import { DefaultButton, IconButton } from "@fluentui/react/lib/Button";
import { Icon } from "@fluentui/react/lib/Icon";
import { DefaultPalette } from "@fluentui/react/lib/Styling";
import styles from "../PrApp.module.scss";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { Checkbox, TextField } from "@fluentui/react";

import TableComponent from "./TableComponent";
import { Link } from "@fluentui/react";
import { ModalComponent } from "./ModalComponent";
import { FilePickModal } from "./FilePickModal";
import { ITableBuildProps } from "./MainPage";
import ProjectCodeComponent from "./ProjectCodeComponent";
import { any } from "prop-types";
interface IFirstProps {
  buttonContxtSave: () => void;
  setTableCreate: (value: ITableBuildProps) => void;
}

const PrimaryInfoComponent: React.FunctionComponent<IFirstProps> = (props) => {
  const { buttonContxtSave, setTableCreate } = props;
  //use for Modal Show ...........
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setisModalOpen(!isModalOpen);
  };

  // React.useEffect(()=>{
  //   console.log("hello");
    
  //   setTableCreate({});

  // },[])
  //Project Code Modal Design Here ...........................
  const [openProjectCode, setopenProjectCode] = useState<boolean>(false);
  const showProjectCodeModal = () => {
    setopenProjectCode(!openProjectCode);
  };
  //this use state for Dialog is visible or not
  const [showDialog, setshowDialog] = useState<boolean>(false);

  const showAlertDialog = () => {
    setshowDialog(!showDialog);
  };

  //--------------------   -------

  const sectionStackTokens: IStackTokens = { childrenGap: 15 };

  useEffect(() => {
    setshowDialog(true);
  }, []);
  //this is for all radio option
  const [selectRadioItems, setSelectRadioItems] = useState<{
    [key: string]: IChoiceGroupOption;
  }>({
    prRadio: { key: "", text: "" },
    constCenterRadio: { key: "", text: "" },
    prProjectRadio: { key: "", text: "" },
    buyRadio: { key: "", text: "" },
    prepaidcapitalRadio: { key: "", text: "" },
    ehsRadio: { key: "", text: "" },
  });

  const [isPrepaidCapitalbuy, setisPrepaidCapitalbuy] =
    useState<boolean>(false);

  const [isPrProject, setisPrProject] = useState<boolean>(false);

  const [isBlanketPrSelect, setisBlanketPrSelect] = useState<boolean>(false);

  const [isAlternetCostcenterSelect, setisAlternetCostcenterSelect] =
    useState<boolean>(false);

  const prOption: IChoiceGroupOption[] = [
    { key: "yes", text: "Yes" },
    { key: "no", text: "No" },
  ];

  const constCenterOption: IChoiceGroupOption[] = [
    { key: "department", text: "Department" },
    { key: "alternatecostcenter", text: "Alternate Cost Center" },
  ];

  const prProjectOption: IChoiceGroupOption[] = [
    { key: "yes", text: "Yes" },
    { key: "no", text: "No" },
  ];

  const buyOption: IChoiceGroupOption[] = [
    { key: "expense_buy", text: "Expense Buy" },
    { key: "blanket_pr", text: "Blanket PR" },
  ];

  const prepaidcapitalOption: IChoiceGroupOption[] = [
    { key: "expense", text: "Expense" },
    { key: "prepaid", text: "Prepaid" },
    // { key: "capitalequipmentasset", text: "Capital Equipment / Asset" },
    // { key: "lease", text: "Lease" },
  ];

  const newprepaidcapitalOption: IChoiceGroupOption[] = [
    { key: "expense", text: "Expense" },
    { key: "prepaid", text: "Prepaid" },
    { key: "capitalequipmentasset", text: "Capital Equipment / Asset" },
    { key: "lease", text: "Lease" },
  ];

  const ehsOption: IChoiceGroupOption[] = [
    { key: "yes", text: "Yes" },
    { key: "no", text: "No" },
  ];

  const choiceGroupStyles = {
    label: {
      display: "inline",
    },
    flexContainer: {
      columnGap: "1em",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  };

  const radioOnChange = (
    ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    option?: IChoiceGroupOption | undefined
  ) => {
    const { name } = ev?.target as HTMLInputElement;
    console.log(name);
    let newSelectedItem: IChoiceGroupOption = { key: "", text: "" };
    // if (option) {
    newSelectedItem = {
      key: option?.key as string,
      text: option?.text as string,
    };
    // }
    console.log(newSelectedItem);
    setSelectRadioItems((prevSelectRadioItems) => ({
      ...prevSelectRadioItems,
      [name]: newSelectedItem, // Update the specific option state key
    }));
    console.log(isPrepaidCapitalbuy);
    console.log(selectRadioItems);
  };

  useEffect(() => {
    if (selectRadioItems.constCenterRadio.text == "Alternate Cost Center") {
      setisAlternetCostcenterSelect(true);
    } else {
      setisAlternetCostcenterSelect(false);
    }
    if (selectRadioItems.buyRadio.text == "Blanket PR") {
      setisBlanketPrSelect(true);
    } else {
      setisBlanketPrSelect(false);
    }
    if (selectRadioItems.prProjectRadio.text == "Yes") {
      setisPrProject(true);
    } else {
      setisPrProject(false);
    }

    if (
      selectRadioItems.prepaidcapitalRadio.text === "Capital Equipment / Asset"
    ) {
      setisPrepaidCapitalbuy(true);
    } else {
      setisPrepaidCapitalbuy(false);
    }
  }, [selectRadioItems]);

  //this is for all dropdown option....................
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: IDropdownOption;
  }>({
    prOption: { key: "", text: "" },
    companyCode: { key: "", text: "" },
    selectDepartment: { key: "", text: "" },
    projectCode: { key: "", text: "" },
  });

  const companyCodeOption: IDropdownOption[] = [
    { key: "1", text: "OM01" },
    { key: "2", text: "OM06" },
    { key: "3", text: "OM31" },
  ];
  const selectDepartmentOption: IDropdownOption[] = [
    { key: "engineering", text: "Engineering" },
    { key: "marketing", text: "Marketing" },
  ];
  const projectCodeOption: IDropdownOption[] = [
    { key: "1", text: "ACP.ICV" },
    { key: "2", text: "ACP.DAP" },
    { key: "3", text: "ACP.OCP" },
  ];

  const PrOption: IDropdownOption[] = [
    { key: "sap", text: "SAP(Omnicell)" },
    { key: "hsri", text: "HSRI" },
    { key: "3408", text: "3408" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    console.log("------------------");
    console.log(id);
    let newSelectedItem: IDropdownOption = { key: "", text: "" };
    // if (item) {
    newSelectedItem = { key: item?.key as string, text: item?.text as string };
    // }
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: newSelectedItem,
    }));
    console.log(selectedItems);
    if (id === "prOption") {
      setshowDialog(true);
    }
  };

  //......................................

  //for file upload .........................

  const SaveandContinue = () => {
    alert(
      `${selectRadioItems.prRadio.text} -- ${selectRadioItems.constCenterRadio.text} -- ${selectRadioItems.prProjectRadio.text} ---- ${selectRadioItems.buyRadio.text} ---- ${selectRadioItems.prepaidcapitalRadio.text} and ---- ${selectedItems.prOption.text} -- ${selectedItems.companyCode.text} -- ${selectedItems.selectDepartment.text} ---- ${selectedItems.projectCode.text} ---- `
    );
    buttonContxtSave();
  };
  //select checkBox.............
  // const []=useState({

  // })

  const changeChakeBox = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    checked?: boolean | undefined
  ) => {
    const id = (ev?.target as HTMLInputElement).id;
    let newTablename: ITableBuildProps = {
      name: id,
    };
    setTableCreate(newTablename);
  };

  //handle file change ....

  //file upload modal open
  const [fileUploadModal, setfileUploadModal] = useState<boolean>(false);
  const showfileUploadModal = () => {
    setfileUploadModal(!fileUploadModal);
  };
  const handleFileChange = () => {
    showfileUploadModal();
    // const inputElement = inputRef.current;
    // if (inputElement) {
    //   inputElement.click();
    // }
  };

  // const fileuploadhandleClick = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const fileObj = event?.target.files && event?.target.files[0];
  //   if (!fileObj) {
  //     return;
  //   }
  //   event.target.value = "";
  //   console.log(fileObj.name);
  // };

  //
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
  const [] = useState<boolean>();

  const linkClickEvent = () => {
    // showModal();
    showProjectCodeModal();
  };

  return (
    <>
      {showDialog ? (
        <ModalComponent
          isModalOpen={showDialog}
          showModal={showAlertDialog}
          backgroundcolor="#750800"
          title="Purchase Request Error"
        />
      ) : null}

      <Stack tokens={sectionStackTokens}>
        {/* Button */}
        <Stack>
          <Stack.Item align="end">
            <DefaultButton
              style={{
                background: DefaultPalette.green,
                color: DefaultPalette.white,
                borderRadius: 5,
                height: "40px",
              }}
              onClick={SaveandContinue}
            >
              <Stack horizontal>
                <span style={{ marginRight: 10, marginTop: 2 }}>
                  <Icon iconName="Save" />
                </span>
                <span>Save & Continue</span>
              </Stack>
            </DefaultButton>
          </Stack.Item>
        </Stack>
        {/* Select Option */}

        <Stack tokens={sectionStackTokens}>
          {/* Pr Drop down option  */}
          {/* ----------------------------------------- */}
          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item
                styles={col1Style}
                // style={{ border: "1px solid black" }}
              >
                <div>What type of PR want to create?: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <Dropdown
                  placeholder="Select an option"
                  id="prOption"
                  onChange={changeDropdownOption}
                  options={PrOption}
                  selectedKey={selectedItems["prOption"]?.key}
                  style={{ width: "200px" }}
                  styles={dropdownStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Are you submitting PR for yourself?:</div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prRadio"
                  options={prOption}
                  onChange={radioOnChange}
                  required={true}
                  selectedKey={selectRadioItems["prRadio"]?.key}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* ----------------------------------- */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Company Code: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <Dropdown
                  placeholder="Select an option"
                  id="companyCode"
                  onChange={changeDropdownOption}
                  selectedKey={selectedItems["companyCode"]?.key}
                  style={{ width: "200px" }}
                  options={companyCodeOption}
                  styles={dropdownStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Are you submitting for the requestors cost center?: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <ChoiceGroup
                    name="constCenterRadio"
                    options={constCenterOption}
                    onChange={radioOnChange}
                    selectedKey={selectRadioItems["constCenterRadio"]?.key}
                    required={true}
                    styles={choiceGroupStyles}
                  />
                  <Link
                    style={{ color: "blue", marginLeft: 15, marginTop: 10 }}
                    onClick={linkClickEvent}
                  >
                    View All Cost Center Details
                  </Link>
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* ------------------------------------------------------ */}
          {isAlternetCostcenterSelect ? (
            <>
              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>Select Other Cost Center: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <Dropdown
                      placeholder="---Select Other Cost Center---"
                      // id="selectDepartment"
                      // onChange={changeDropdownOption}
                      // style={{ width: "150px" }}
                      // selectedKey={selectedItems["selectDepartment"]?.key}
                      options={selectDepartmentOption}
                      styles={dropdownStyles}
                    />
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            </>
          ) : null}

          {/* jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Is this PR related to a Project?: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prProjectRadio"
                  options={prProjectOption}
                  onChange={radioOnChange}
                  selectedKey={selectRadioItems["prProjectRadio"]?.key}
                  required={true}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

          {isPrProject ? (
            <>
              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>Select Department and Project Code?: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <Stack
                      horizontal
                      tokens={{ childrenGap: 5 }}
                      style={{ marginTop: 15 }}
                    >
                      <Dropdown
                        placeholder="Select an option"
                        id="selectDepartment"
                        onChange={changeDropdownOption}
                        style={{ width: "150px" }}
                        selectedKey={selectedItems["selectDepartment"]?.key}
                        options={selectDepartmentOption}
                        styles={dropdownStyles}
                      />
                      <Dropdown
                        placeholder="Select an option"
                        id="projectCode"
                        onChange={changeDropdownOption}
                        style={{ width: "200px" }}
                        selectedKey={selectedItems["projectCode"]?.key}
                        options={projectCodeOption}
                        styles={dropdownStyles}
                      />
                      <Link
                        style={{ color: "blue", marginLeft: 15 }}
                        onClick={linkClickEvent}
                      >
                        Need help?
                      </Link>
                      {openProjectCode ? (
                        <>
                          <ProjectCodeComponent
                            isProjectCodeOpen={openProjectCode}
                            showProjectCode={showProjectCodeModal}
                            ProjectCode_title={
                              selectedItems.selectDepartment.text
                            }
                          />
                        </>
                      ) : null}
                    </Stack>
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            </>
          ) : null}

          {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Type of Buy: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="buyRadio"
                  options={buyOption}
                  onChange={radioOnChange}
                  required={true}
                  selectedKey={selectedItems["buyRadio"]?.key}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {/* -------------------------------------------------------------------------- */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Is this Prepaid or Capital Equipment buy?: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="prepaidcapitalRadio"
                  options={
                    isBlanketPrSelect
                      ? prepaidcapitalOption
                      : newprepaidcapitalOption
                  }
                  onChange={radioOnChange}
                  selectedKey={selectRadioItems["prepaidcapitalRadio"]?.key}
                  required={true}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {isPrepaidCapitalbuy ? (
            <>
              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>CIP Number: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                      <div style={{ width: 350 }}>
                        <TextField placeholder="Provide a valid CIP number" />
                      </div>
                      <Link>View All CIP Numbers</Link>
                    </Stack>
                  </Stack.Item>
                </Stack>
              </Stack.Item>

              <Stack.Item grow={12}>
                <Stack horizontal horizontalAlign="baseline">
                  <Stack.Item styles={col1Style}>
                    <div>UFID: </div>
                  </Stack.Item>
                  <Stack.Item styles={col2Style}>
                    <div style={{ width: 350 }}>
                      <TextField placeholder="Provide UFID number" />
                    </div>
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            </>
          ) : null}

          {/* ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Type of Purchase: </div>
              </Stack.Item>
              <Stack.Item style={{ marginTop: 5 }} styles={col2Style}>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Stack.Item align="start">
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Consulting"
                        id="Consulting"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Engineering"
                        id="Engineering"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Field Services"
                        id="Field Services"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Manufacturing"
                        id="Manufacturing"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Office Supply and Equipment"
                        id="Office Supply and Equipment"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="GAAP"
                        id="GAAP"
                        onChange={changeChakeBox}
                      />
                    </div>
                  </Stack.Item>
                  <Stack.Item align="start">
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Corporate"
                        id="Corporate"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Facilities or Lease"
                        id="Facilities or Lease"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Computer Equipment"
                        id="Computer Equipment"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Marketing"
                        id="Marketing"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Software"
                        id="Software"
                        onChange={changeChakeBox}
                      />
                    </div>
                    <div className={styles.checkboxgroup}>
                      <Checkbox
                        label="Benefits"
                        id="Benefits"
                        onChange={changeChakeBox}
                      />
                    </div>
                  </Stack.Item>
                  <Link style={{ color: "blue" }} onClick={linkClickEvent}>
                    View All GL Accounts
                  </Link>
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div> Is this EHS relevant?: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                <ChoiceGroup
                  name="ehsRadio"
                  options={ehsOption}
                  onChange={radioOnChange}
                  required={true}
                  selectedKey={selectRadioItems["ehsRadio"]?.key}
                  styles={choiceGroupStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>

          {/* kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}

          <Stack.Item grow={12}>
            <Stack horizontal horizontalAlign="baseline">
              <Stack.Item styles={col1Style}>
                <div>Upload Important Documents: </div>
              </Stack.Item>
              <Stack.Item styles={col2Style}>
                {/* <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={fileuploadhandleClick}
                /> */}
                <IconButton
                  iconProps={{ iconName: "Upload" }}
                  title="Upload"
                  ariaLabel="Upload"
                  onClick={handleFileChange}
                />
                {fileUploadModal ? (
                  <FilePickModal
                    isModalOpen={fileUploadModal}
                    showModal={showfileUploadModal}
                  />
                ) : null}
              </Stack.Item>
            </Stack>
          </Stack.Item>
          {/* lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll */}
        </Stack>

        <TableComponent />
      </Stack>
      {isModalOpen ? (
        <ModalComponent isModalOpen={isModalOpen} showModal={showModal} />
      ) : null}
    </>
  );
};

export default PrimaryInfoComponent;
