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
import { GlobalStore } from "../../../../app/globalStore";
import { fetchSearchContent } from "../../../../features/reducers/searchSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

// import SupplierModal from "./SupplierModal";
interface ISecondprops {
  buttonContxtSave: () => void;
  buttonContxtBack: () => void;
  isViewMode: boolean;
}
const VendorandShippingComponent: React.FunctionComponent<ISecondprops> = (
  props
) => {
  const { buttonContxtSave, buttonContxtBack, isViewMode } = props;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const vendorandshippingData = useSelector(
    (state: RootState) => state.vendorandshipping
  );
  const lineintemData = useSelector((state: RootState) => state.lineiteminfo);
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
  useEffect(() => {
    (async () => {
      let listDataSupplierAdd = [];

      let shipAddressValue = await restApiCall.getShippingAddress(
        optionGroupData.companyCode.text
      );

      for (let i: number = 0; i < shipAddressValue.length; i++) {
        let newObjSupplierAdd = {
          key: shipAddressValue[i],
          text: shipAddressValue[i],
        };
        listDataSupplierAdd.push(newObjSupplierAdd);
      }
      setshipAddress([...listDataSupplierAdd]);

      //Shipping country ----------------------------------------------

      //Shipping Region ----------------------------------------------
      console.log(
        "This Currency Key ---- ",
        GlobalStore.getTitledata().currencyKey
      );
      //  ConnectPr.getInstance().GetPRCountry().then((PrCountry)=>{
      let PrCountry = await restApiCall.GetCountryUrl();
      let listDataCountry = [];
      for (let i = 0; i < PrCountry.length; i++) {
        let newObjCountry = {
          key: PrCountry[i].CountryKey,
          text: PrCountry[i].Title,
        };
        if (GlobalStore.getTitledata().countryKey === newObjCountry.key) {
          setdefaultCountry(newObjCountry.text);
        }
        listDataCountry.push(newObjCountry);
      }

      setCountryOptions([...listDataCountry]);

      //Shipping Region ----------------------------------------------
      console.log(
        "This Currency Key ---- ",
        GlobalStore.getTitledata().currencyKey
      );

      let PrRegion = await restApiCall.GetRegionUrl(
        GlobalStore.getTitledata().countryKey
      );

      console.log("REGIONNNNNNNNNNNNNNNNNNNNNNNN ---", PrRegion);
      let listDataRegion = [];
      for (let i = 0; i < PrRegion.length; i++) {
        let newObjRegion = {
          key: PrRegion[i].Title + "(" + PrRegion[i].StateKey + ")",
          text: PrRegion[i].Title + "(" + PrRegion[i].StateKey + ")",
        };
        listDataRegion.push(newObjRegion);
      }
      setRegionOptions([...listDataRegion]);
    })();
    //Ship Address to Company Code Compare------------------------------------------------------

    // console.log("optionGroupData.companyCode.text---optionGroupData.companyCode.text",optionGroupData.companyCode.text);
  }, []);
  //Redux save
  // useEffect(() => {
  //   setvendorItem(vendorandshippingData.vendorDetails);
  // }, []);

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

  const [selectedItems, setselectedItems] = useState<{
    [key: string]: IDropdownOption;
  }>({
    regionoption: { key: "", text: "" },
    countryoption: { key: GlobalStore.getTitledata().countryKey, text: "" },
    basedOn: { key: "", text: "" },
  });

  const changeDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
    index: number
  ): void => {
    const { id } = event.target as HTMLDivElement;
    let newSelectedItem: IDropdownOption = { key: "", text: "" };

    newSelectedItem = { key: item?.key as string, text: item?.text as string };

    console.log("newSelectedItem === newSelectedItem", newSelectedItem);
    setselectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: newSelectedItem,
    }));
  };

  const changeshipDropdownOption = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | undefined,
    index?: number | undefined
  ) => {
    console.log("----", option);
    setnewshipAddress(option as IDropdownOption);
  };
  const [defaultCountry, setdefaultCountry] = useState("");
  const [shipAddress, setshipAddress] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);

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
    ShippingAdrress: "",
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

  // const saveVendorandSupplierDetails = () => {
  //   dispatch(
  //     saveVendorandShippingData({
  //       vendorDetails: vendorItem,
  //       vendorOtherDetails: {
  //         justificatiOnOrder: "",
  //         downPaymentDetails: "",
  //       },
  //     })
  //   );
  //   buttonContxtSave();
  // };

  const saveVendorDetails = () => {
    dispatch(
      saveVendorandShippingData({
        vendorDetails: vendorItem,
        vendorOtherDetails: {
          justificatiOnOrder: textvalue.justificatiOnOrder,
          downPaymentDetails: textvalue.downPaymentDetails,
          Name:textvalue.Name,
          HouseNumber:textvalue.HouseNumber,
          StreetName:textvalue.StreetName,
          PostalCode:textvalue.PostalCode,
          City:textvalue.City,
          ContactName:textvalue.ContactName,

        },

        ship_to_address: {
          key: newshipAddress.text,
          text: newshipAddress.text,
        },
        Shipping_Location: {
          key: selectedItems.basedOn.text,
          text: selectedItems["basedOn"].text,
        },
        shipping_region: {
          key: selectedItems.regionoption.text,
          text: selectedItems["regionoption"].text,
        },
      })
    );
    let saveDetails = [
      {
        PKID: GlobalStore.getPrId(),
        ConnectPRID: GlobalStore.getPrId(),
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
        Location: newshipAddress.text,
        IsDeleted: null,
        Special_Instructions: textvalue.downPaymentDetails,
        Shipping_Name: textvalue.Name,
        Shipping_Street: textvalue.StreetName + "#" + textvalue.HouseNumber,
        Shipping_Postal_Code: textvalue.PostalCode + "#" + textvalue.City,
        Shipping_Location: selectedItems.basedOn.text,
        Shipping_Region: selectedItems.regionoption.text,
        Shipping_Country: selectedItems.countryoption.text,
        Shipping_ContactPhone: textvalue.ContactName,
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
        PRId: GlobalStore.getPrId(),
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
    console.log("This is The Second Page Save And Continue ", saveDetails);

    // buttonContxtSave();

    let otherShippingAdd = [
      {
        Title:
          textvalue.Name +
          "(" +
          textvalue.HouseNumber +
          textvalue.StreetName +
          textvalue.PostalCode +
          textvalue.City +
          textvalue.ContactName +
          selectedItems.countryoption.text +
          selectedItems.basedOn.text +
          ")",
        PlantNumber: null,
        StorageLocation: null,
        P2PBuy: null,
        NPIBuy: null,
        IsAvailable: true,
        IsAvlblShpToLocation: true,
        IsAesyntLocation: false,
        Country: selectedItems.countryoption.text,
      },
    ];
    console.log("otherShippingAdd__otherShippingAdd--", otherShippingAdd);
    if (
      lineintemData.Finalpage === "prsubmit" ||
      lineintemData.Finalpage === `edit${GlobalStore.getPrId()}`
    ) {
      restApiCall.insertPlantLoc(otherShippingAdd).then((insPlat) => {
        console.log("insertPlantLoc--------------------", insPlat);
        restApiCall.insertVendorDetails(saveDetails).then((insVen) => {
          console.log("insertPlantLoc--------------------", insVen);

          dispatch(fetchSearchContent("MyOrder"));
          buttonContxtSave();
        });
      });
    } else if (lineintemData.Finalpage === `view${GlobalStore.getPrId()}`) {
      buttonContxtSave();
    }
    // buttonContxtSave();
  };

  useEffect(() => {
    setvendorItem(vendorandshippingData.vendorDetails);
    setnewshipAddress(vendorandshippingData.ship_to_address);

    setselectedItems((prevItems) => ({
      ...prevItems,
      basedOn: vendorandshippingData.Shipping_Location,
      regionoption: vendorandshippingData.shipping_region,
    }));

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

  console.log("This is The Main Content Here ------458", selectedItems);
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
                      disabled={isViewMode ? true : false}
                      value={vendorItem.vendorName}
                      onChange={textContext}
                    />
                    <DefaultButton
                      disabled={isViewMode ? true : false}
                      style={{ minWidth: 0 }}
                      onClick={() => showSupplierSearchModal()}
                    >
                      <Icon iconName="Search" style={{ color: "blue" }} />
                      {openSupplierSearch ? (
                        <SupplierModal
                          isModalOpen={openSupplierSearch}
                          showModal={showSupplierSearchModal}
                          venderItemDatapick={venderItemDatapick}
                          fromLandingpage={false}
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
                      disabled={isViewMode ? true : false}
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
                      disabled={isViewMode ? true : false}
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
                      disabled={isViewMode ? true : false}
                      onChange={changeshipDropdownOption}
                      selectedKey={newshipAddress.key}
                      options={shipAddress}
                      styles={dropdownStyles}
                    />
                    {selectshipAddress ? (
                      <div>
                        <Link
                          disabled={isViewMode ? true : false}
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
                          disabled={isViewMode ? true : false}
                          value={textvalue.Name}
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
                          disabled={isViewMode ? true : false}
                          placeholder={"House No."}
                          onChange={textContext}
                          value={textvalue.HouseNumber}
                          // value={shippingItem.HouseNumber}
                          style={{ width: 100 }}
                        />
                        <span style={{ marginTop: 10 }}>/</span>
                        <TextField
                          id="StreetName"
                          disabled={isViewMode ? true : false}
                          value={textvalue.StreetName}
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
                          disabled={isViewMode ? true : false}
                          placeholder="Postal Code"
                          value={textvalue.PostalCode}
                          onChange={textContext}
                          style={{ width: 100 }}
                        />
                        <span>/</span>
                        <TextField
                          placeholder="City"
                          id="City"
                          disabled={isViewMode ? true : false}
                          value={textvalue.City}
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
                          id="regionoption"
                          disabled={isViewMode ? true : false}
                          onChange={changeDropdownOption}
                          selectedKey={selectedItems["regionoption"]?.key}
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
                          id="countryoption"
                          disabled={isViewMode ? true : false}
                          onChange={changeDropdownOption}
                          selectedKey={selectedItems["countryoption"]?.key}
                          // defaultSelectedKey={defaultCountry}
                          // defaultSelectedKey="US"
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
                          id="basedOn"
                          disabled={isViewMode ? true : false}
                          onChange={changeDropdownOption}
                          selectedKey={selectedItems["basedOn"]?.key}
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
                          disabled={isViewMode ? true : false}
                          value={textvalue.ContactName}
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
