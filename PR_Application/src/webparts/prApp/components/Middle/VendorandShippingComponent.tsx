import * as React from "react";
import { IStackStyles, Stack } from "@fluentui/react/lib/Stack";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { DefaultPalette } from "@fluentui/react/lib/Styling";
import { Icon } from "@fluentui/react/lib/Icon";
import { ITextFieldStyles, TextField } from "@fluentui/react/lib/TextField";
import { useState, useEffect, useMemo } from "react";
// import styles from "../Style/style.scss";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import { Link } from "@fluentui/react";
import { SupplierModal } from "./TableSupplierModal";
import { VendorDetails } from "../../Model/vendor_details";
import { ConnectPr } from "../../Api/api";
import { ShipAddressChecking } from "../../Utils/ShipAddressChecking";
import OtherShippingAddComponent from "./TableOtherShippingComponent";
import { IPROtherShippingLoc } from "../../Model/IPrOtherShippingLoc";
import { saveVendorandShippingData } from "../../../../features/reducers/vendorandshippingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { restApiCall } from "../../Api/ApiCall";
import TooltipShow from "./TooltipShow";
import { insertOtherVendor } from "../../Model/InsertotherVendor";

// import SupplierModal from "./SupplierModal";
interface ISecondprops {
  buttonContxtSave: () => void;
  buttonContxtBack: () => void;
}
const VendorandShippingComponent: React.FunctionComponent<ISecondprops> = (
  props
) => {
  const { buttonContxtSave, buttonContxtBack } = props;
  const dispatch = useDispatch();
  const vendorandshippingData = useSelector(
    (state: RootState) => state.vendorandshipping
  );
  //primary Info companycode
  const optionGroupData = useSelector(
    (state: RootState) => state.primaryinfo.optionGroup
  );

  const [selectshipAddress, setselectshipAddress] = useState<boolean>(false);

  const [openSupplierSearch, setopenSupplierSearch] = useState<boolean>(false);
  const showSupplierSearchModal = () => {
    setopenSupplierSearch(!openSupplierSearch);
  };

  //Other Shipping Location Modal Design Here ...........................
  const [openOtherShipping, setopenOtherShipping] = useState<boolean>(false);
  const showOtherShipping = () => {
    setopenOtherShipping(!openOtherShipping);
  };
  //Redux save
  useEffect(() => {
    setvendorItem(vendorandshippingData.vendorDetails);
  }, []);

  const [vendorItem, setvendorItem] = useState<VendorDetails>(
    new VendorDetails(0, " ", " ", " ", " ", " ", " ", " ", " ")
  );
  //insertOtherVendor api....

  const [otherLocInsert, setotherLocInsert] = useState<insertOtherVendor>(
    new insertOtherVendor(" ", 0, " ", " ", " ", true, true, true, " ")
  );

  const venderItemDatapick = (vendor: VendorDetails) => {
    console.log(vendor);
    console.log(vendor.vendorNumber);
    setvendorItem(vendor);
  };

  const [shippingItem, setShippingItem] = useState<IPROtherShippingLoc>(
    new IPROtherShippingLoc(" ", " ", 0, " ")
  );

  const ShippingDataPick = (otheradd: IPROtherShippingLoc) => {
    console.log(otheradd);
    setShippingItem(otheradd);
  };

  //this is for all dropdown option....................
  const [selectedItemsvendor, setSelectedItemsvendor] = useState<{
    [key: string]: IDropdownOption;
  }>({
    VendorPlantMatch: { key: "", text: "" },
  });

  const [newshipAddress, setnewshipAddress] = useState<IDropdownOption>({
    key: " ",
    text: " ",
  });

  const changeshipDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | undefined,
    index?: number | undefined
  ) => {
    setnewshipAddress(option as IDropdownOption);
  };

  const [shipAddress, setshipAddress] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);

  useEffect(() => {
    //Ship Address to Company Code Compare------------------------------------------------------

    // console.log("optionGroupData.companyCode.text---optionGroupData.companyCode.text",optionGroupData.companyCode.text);

    let listDataSupplierAdd = [];

    restApiCall
      .getShippingAddress(optionGroupData.companyCode.text)
      .then((shipAddressValue) => {
        for (let i: number = 0; i < shipAddressValue.length; i++) {
          let newObjSupplierAdd = {
            key: shipAddressValue[i].toLowerCase(),
            text: shipAddressValue[i],
          };
          listDataSupplierAdd.push(newObjSupplierAdd);
        }
        setshipAddress([...listDataSupplierAdd]);
      });

    //Shipping country ----------------------------------------------

    ConnectPr.getInstance()
      .GetPRCountry()
      .then((PrCountry) => {
        let listDataCountry = [];
        for (let i = 0; i < PrCountry.length; i++) {
          if (PrCountry[i].IsActive == true) {
            let newObjCountry = {
              key: PrCountry[i],
              text: PrCountry[i].Title,
            };
            listDataCountry.push(newObjCountry);
          }
        }
        setCountryOptions([...listDataCountry]);
      });

    //Shipping Region ----------------------------------------------

    ConnectPr.getInstance()
      .GetPRRegion()
      .then((PrRegion) => {
        let listDataRegion = [];
        for (let i = 0; i < PrRegion.length; i++) {
          let newObjRegion = {
            key: PrRegion[i],
            text: PrRegion[i].Title + "(" + PrRegion[i].CountryKey + ")",
          };
          listDataRegion.push(newObjRegion);
        }
        setRegionOptions([...listDataRegion]);
      });
  }, []);

  useEffect(() => {
    if (newshipAddress.text === "Other Shipping Location") {
      setselectshipAddress(() => true);
    } else {
      setselectshipAddress(() => false);
    }
  }, [newshipAddress]);
  //text save fields.............
  const [textvalue, settextvalue] = useState({
    suppliername: "",
    justificatiOnOrder: "",
    downPaymentDetails: "",
    Name: "",
    HouseNumber: "",
    StreetName: "",
    PostalCode: "",
    City: "",
    ContactName: "",
  });

  const textContext = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: Object | undefined
  ) => {
    // console.log("textvalue---textvalue",textvalue);
    //   console.log("text__Name---",textvalue.Name);
    // console.log("text__Comments---",textvalue.justificatiOnOrder,textvalue.downPaymentDetails);
    // console.log("text__HouseNumber---",textvalue.HouseNumber,textvalue.StreetName);
    // console.log("text__PostalCode---",textvalue.PostalCode,textvalue.City);
    // console.log("text__ContactName---",textvalue.ContactName);
    const id = (e.target as HTMLInputElement).id;
    console.log(id);
    settextvalue((prevValue) => ({
      ...prevValue,
      [id]: newValue || " ",
    }));
    console.log(id);
  };

  const saveVendorandSupplierDetails = () => {
    dispatch(
      saveVendorandShippingData({
        vendorDetails: vendorItem,
        vendorOtherDetails: {
          justificatiOnOrder: "",
          downPaymentDetails: "",
        },
      })
    );
    buttonContxtSave();
  };
  const saveVendorDetails = () => {
    dispatch(
      saveVendorandShippingData({
        vendorDetails: vendorItem,
        vendorOtherDetails: {
          justificatiOnOrder: textvalue.justificatiOnOrder,
          downPaymentDetails: textvalue.downPaymentDetails,
        },
      })
    );
    let saveDetails = [
      {
        PKID: vendorandshippingData.PKID,
        ConnectPRID: null,
        Type_Of_Buy: null,
        PrepaidOrCapitalEquipment: null,
        EHS: null,
        Title: null,
        RequestFor: null,
        Type_Of_Order: null,
        Order_Amount: null,
        CIP_Number: null,
        UFID: null,
        Supplier_Account_Number: vendorItem.vendorNumber,
        Supplier_Name: vendorItem.vendorName,
        Supplier_Address: vendorItem.vendorAddress,
        Supplier_City: vendorItem.vendorCity,
        Supplier_State: vendorItem.vendorState,
        Supplier_Zip: vendorItem.vendorZip,
        Supplier_Country: vendorItem.vendorCountry,
        Manager: null,
        Manager1: null,
        Manager2: null,
        Manager3: null,
        GL_Account: null,
        Status: null,
        TaskCreatedFor: null,
        ApprovalInstance: null,
        Comments: textvalue.justificatiOnOrder,
        Cost_Center: null,
        Location: null,
        IsDeleted: null,
        Special_Instructions: textvalue.downPaymentDetails,
        Shipping_Name: null,
        Shipping_Street: null,
        Shipping_Postal_Code: null,
        Shipping_Location: null,
        Shipping_Region: null,
        Shipping_Country: null,
        Shipping_ContactPhone: null,
        OldReqId: null,
        SAPPRId: null,
        LastWorkflowRun: null,
        CurrentApprovalStep: null,
        ManagerLevel: null,
        FinalApprovalDate: null,
        IsOtherCC: null,
        IsCFOApproved: null,
        CFO: null,
        AllApprovers: null,
        CreateDate: null,
        LastStatus: null,
        AllManagers: null,
        JLReminderCount: null,
        FIReminderCount: null,
        AesyntPRType: null,
        PONumber: null,
        IsCompleted: null,
        Company: null,
        ProjectNumber: null,
        ActCostCenter: null,
        CompanyCode: null,
        FromCurrency: null,
        ToCurrency: null,
        RequesterCurrency: null,
        ExchangeRate: null,
        ExchangeRateV: null,
        ExchangeRateDate: null,
        ConvertedDollerAmount: null,
        CountryKey: null,
        HRADCompanyCode: null,
        QuickbookPO: null,
        CCDescription: null,
        IsProjectPR: null,
        ProjectDepartment: null,
        ProjectCode: null,
        Created: null,
        CreatedBy: null,
        Modified: null,
        ModifiedBy: null,
        PRNumber: null,
        DWCreateDate: null,
        PRId: null,
        OldAllApprovers: null,
        OldAllManagers: null,
        OldCFO: null,
        OldCreatedBy: null,
        OldManager: null,
        OldManager1: null,
        OldManager2: null,
        OldManager3: null,
        OldModifiedBy: null,
        OldRequestFor: null,
        OldTaskCreatedFor: null,
      },
    ];
    // restApiCall.insertVendorDetails(saveDetails);
    // buttonContxtSave();

    let otherShippingAdd = [
      {
        Title:
          textvalue.Name +
          textvalue.HouseNumber +
          textvalue.StreetName +
          textvalue.PostalCode +
          textvalue.City +
          textvalue.ContactName,
        PlantNumber: null,
        StorageLocation: null,
        P2PBuy: null,
        NPIBuy: null,
        IsAvailable: true,
        IsAvlblShpToLocation: true,
        IsAesyntLocation: false,
        Country: "India",
      },
    ];
    console.log("otherShippingAdd__otherShippingAdd--", otherShippingAdd);

    // restApiCall.insertPlantLoc(otherShippingAdd);
    buttonContxtSave();
  };

  useEffect(() => {
    setvendorItem(vendorandshippingData.vendorDetails);
    for (
      let i = 0;
      i < Object.keys(vendorandshippingData.vendorOtherDetails).length;
      i++
    ) {
      console.log(
        "Key Key ----",
        Object.keys(vendorandshippingData.vendorOtherDetails)[i],
        vendorandshippingData.vendorOtherDetails[
          Object.keys(vendorandshippingData.vendorOtherDetails)[i]
        ]
      );
      settextvalue((prevValue) => ({
        ...prevValue,
        [Object.keys(vendorandshippingData.vendorOtherDetails)[i]]:
          vendorandshippingData.vendorOtherDetails[
            Object.keys(vendorandshippingData.vendorOtherDetails)[i]
          ] || " ",
      }));
    }
  }, []);

  // where are you based....

  // const basedOptions: IDropdownOption[] = [
  //   { key: "1", text: "US,- Strongsville, OH (STV) plant" },
  //   { key: "2", text: "US, Cranberry" },
  //   { key: "3", text: "US, Field Persons" },
  //   { key: "4", text: "US, HQ-Mountain View, CA (MTV)" },
  //   { key: "5", text: "US, Milpitas, (MIL) Plant" },
  // ];

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
  const hoverStyle: IStackStyles = {
    root: {
      textAlign: "left",
      marginBottom: "-10px",
      marginRight: "3px",
      marginLeft: "2px",
      paddingBottom: "-10px",
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
                  onClick={() => saveVendorDetails()}
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
                <Stack.Item styles={hoverStyle}>
                  <TooltipShow
                    context={
                      "Is my supplier already in SAP?\n\n" +
                      "If we have previously sent the supplier an Omnicell PO, then yes they are in SAP. (Click On Magnifying Glass To Search By VendorName)"
                    }
                  />
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <TextField
                      id="suppliername"
                      value={vendorItem.vendorName}
                      onChange={textContext}
                    />
                    <DefaultButton
                      style={{ minWidth: 0 }}
                      onClick={() => showSupplierSearchModal()}
                    >
                      <Icon iconName="Search" style={{ color: "blue" }} />
                      {openSupplierSearch ? (
                        <SupplierModal
                          isModalOpen={openSupplierSearch}
                          showModal={showSupplierSearchModal}
                          venderItemDatapick={venderItemDatapick}
                        />
                      ) : null}
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
                    <TextField
                      disabled
                      id="suppliernumber "
                      value={vendorItem.vendorNumber}
                      onChange={textContext}
                    />
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

            {/* ____________________________________________________________________ */}

            {buttonState ? (
              <>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Supplier Address: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          disabled
                          value={vendorItem.vendorAddress}
                          styles={textFieldStyles}
                        />
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
                        <TextField
                          disabled
                          value={vendorItem.vendorCity}
                          styles={textFieldStyles}
                        />
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
                        <TextField
                          disabled
                          value={vendorItem.vendorState}
                          styles={textFieldStyles}
                        />
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
                        <TextField
                          disabled
                          value={vendorItem.vendorZip}
                          styles={textFieldStyles}
                        />
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
                        <TextField
                          disabled
                          value={vendorItem.vendorCountry}
                          styles={textFieldStyles}
                        />
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
                <Stack.Item styles={hoverStyle}>
                  <TooltipShow
                    context={
                      "Please provide an explanation for the purchase." +
                      "Note:  Only the first 100 characters will be submitted to SAP and included in all correspondence."
                    }
                  />
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <div style={{ width: "450px" }}>
                    <TextField
                      id="justificatiOnOrder"
                      value={textvalue.justificatiOnOrder}
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
                  <div>Add Special Instructions/Down payment details:</div>
                </Stack.Item>
                <Stack.Item styles={hoverStyle}>
                  <TooltipShow
                    context={
                      "Please provide additional information as needed.\n " +
                      "Note: Only the first 100 characters will be submitted to SAP and included in all correspondence."
                    }
                  />
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <div style={{ width: "450px" }}>
                    <TextField
                      id="downPaymentDetails"
                      value={textvalue.downPaymentDetails}
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
                <Stack.Item styles={hoverStyle}>
                  <TooltipShow context={"Where will the item be delivered?"} />
                </Stack.Item>
                <Stack.Item styles={col2Style}>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <Dropdown
                      placeholder="Select an option"
                      onChange={changeshipDropdownOption}
                      options={shipAddress}
                      styles={dropdownStyles}
                    />
                    {selectshipAddress ? (
                      <div>
                        <Link
                          style={{ color: "blue", marginLeft: 10 }}
                          onClick={showOtherShipping}
                        >
                          Select from existing address list
                        </Link>
                        {openOtherShipping ? (
                          <>
                            <OtherShippingAddComponent
                              isShippingAddOpen={openOtherShipping}
                              showShippingAdd={showOtherShipping}
                              ShippingDataPick={ShippingDataPick}
                            />
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>

            {selectshipAddress ? (
              <>
                <Stack.Item grow={12}>
                  <Stack horizontal horizontalAlign="baseline">
                    <Stack.Item styles={col1Style}>
                      <div>Name: </div>
                    </Stack.Item>
                    <Stack.Item styles={col2Style}>
                      <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <TextField
                          id="Name"
                          placeholder="Provide Company/Recipient Name.Maximum length"
                          style={{ width: 350 }}
                          onChange={textContext}
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
                          id="HouseNumber"
                          placeholder={"House No."}
                          onChange={textContext}
                          // value={shippingItem.HouseNumber}
                          style={{ width: 100 }}
                        />
                        <span style={{ marginTop: 10 }}>/</span>
                        <TextField
                          id="StreetName"
                          placeholder="Street Name"
                          onChange={textContext}
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
                          id="PostalCode"
                          placeholder="Postal Code"
                          onChange={textContext}
                          style={{ width: 100 }}
                        />
                        <span>/</span>
                        <TextField
                          placeholder="City"
                          id="City"
                          style={{ width: 250 }}
                          onChange={textContext}
                        />
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
                          onChange={changeshipDropdownOption}
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
                          onChange={changeshipDropdownOption}
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
                          onChange={changeshipDropdownOption}
                          options={shipAddress}
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
                          id="ContactName"
                          onChange={textContext}
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
function listDataSupplierComCode(): any {
  throw new Error("Function not implemented.");
}
